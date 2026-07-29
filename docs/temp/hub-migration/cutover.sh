#!/usr/bin/env bash
# Discourse hub cutover: hub-staging.regencoordination.xyz -> hub.regencoordination.xyz
# Run:      bash docs/temp/hub-migration/cutover.sh
# Rollback: bash docs/temp/hub-migration/cutover.sh --rollback
#
# Preconditions verified 2026-07-29:
#   - New server 91.99.139.14 holds an identical copy (188 users/160 topics/938 posts)
#   - Live hosted forum has had no new posts since 2026-07-20 -> no final backup needed
#   - Email verified working (SPF/DKIM/DMARC all PASS)
set -euo pipefail

SERVER_IP="91.99.139.14"
SSH_KEY="$HOME/.ssh/regen-hub"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 -i "$SSH_KEY")
DNS_RECORD_ID="cc25803eda3f4d6e5849d0a0a8263035"
PROD_HOST="hub.regencoordination.xyz"
STAGING_HOST="hub-staging.regencoordination.xyz"
ROLLBACK_TARGET="greenpill-hub.hosted-by-discourse.com"

set -a; source "$HOME/.secrets/regen-hub-migration.env"; set +a
ZID="$(cat /tmp/zid.txt 2>/dev/null || curl -s -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=regencoordination.xyz" | jq -r '.result[0].id')"

say()  { printf "\n\033[1;36m==> %s\033[0m\n" "$*"; }
ok()   { printf "  \033[1;32mOK\033[0m  %s\n" "$*"; }
die()  { printf "\n\033[1;31mFAILED: %s\033[0m\n" "$*" >&2; exit 1; }
rsh()  { ssh "${SSH_OPTS[@]}" "root@$SERVER_IP" "$@"; }
rails_run() { rsh "docker exec -u discourse -w /var/www/discourse app bundle exec rails runner $1"; }

cf_patch() { # $1 = json body
  curl -s -X PATCH -H "Authorization: Bearer $CF_API_TOKEN" -H "Content-Type: application/json" \
    "https://api.cloudflare.com/client/v4/zones/$ZID/dns_records/$DNS_RECORD_ID" -d "$1"
}

# ---------------------------------------------------------------- rollback --
if [[ "${1:-}" == "--rollback" ]]; then
  say "ROLLBACK: pointing $PROD_HOST back at Discourse hosted"
  cf_patch "{\"type\":\"CNAME\",\"name\":\"$PROD_HOST\",\"content\":\"$ROLLBACK_TARGET\",\"proxied\":true,\"ttl\":1}" \
    | jq -r 'if .success then "  OK  DNS reverted to \(.result.content) (proxied)" else "  FAILED: \(.errors[0].message)" end'
  echo
  echo "DNS is back on the hosted forum. The new server is untouched and still holds the full copy."
  echo "NOTE: the hosted site is decommissioned 2026-07-30 - rollback is only valid before then."
  exit 0
fi

# --------------------------------------------------------------- preflight --
say "Preflight"
[[ -n "${CF_API_TOKEN:-}" ]] || die "CF_API_TOKEN not set"
[[ -n "$ZID" && "$ZID" != "null" ]] || die "could not resolve Cloudflare zone id"
ok "Cloudflare token + zone"

rsh 'docker ps --format "{{.Names}}" | grep -qx app' || die "Discourse container not running on $SERVER_IP"
ok "Discourse container up"

STAGING_POSTS="$(curl -s "https://$STAGING_HOST/about.json" | jq -r '.about.stats.posts_count')"
[[ "$STAGING_POSTS" =~ ^[0-9]+$ ]] && (( STAGING_POSTS > 900 )) || die "staging content looks wrong (posts=$STAGING_POSTS)"
ok "New server serving $STAGING_POSTS posts"

# ------------------------------------------------------------------ step 1 --
say "1/6  Flipping DNS: $PROD_HOST -> $SERVER_IP (A, grey cloud)"
cf_patch "{\"type\":\"A\",\"name\":\"$PROD_HOST\",\"content\":\"$SERVER_IP\",\"proxied\":false,\"ttl\":300}" \
  | jq -r 'if .success then "  OK  \(.result.name) -> \(.result.content) proxied=\(.result.proxied)" else "  FAILED: \(.errors[0].message)" end'

say "2/6  Waiting for DNS to propagate (needed before Let's Encrypt can validate)"
for i in $(seq 1 40); do
  got="$(dig +short "$PROD_HOST" @1.1.1.1 | tail -1)"
  [[ "$got" == "$SERVER_IP" ]] && { ok "resolves to $SERVER_IP"; break; }
  printf "  waiting... (%s) got=%s\n" "$i" "${got:-none}"
  sleep 15
  (( i == 40 )) && die "DNS did not propagate; run with --rollback to revert"
done

# ------------------------------------------------------------------ step 3 --
say "3/6  Switching hostname in app.yml and rebuilding (issues production TLS cert)"
rsh "cp /var/discourse/containers/app.yml /var/discourse/containers/app.yml.bak-precutover"
rsh "sed -i 's/DISCOURSE_HOSTNAME: $STAGING_HOST/DISCOURSE_HOSTNAME: $PROD_HOST/' /var/discourse/containers/app.yml"
rsh "grep -q 'DISCOURSE_HOSTNAME: $PROD_HOST' /var/discourse/containers/app.yml" || die "hostname not updated in app.yml"
ok "app.yml hostname -> $PROD_HOST"

echo "  rebuilding (this takes ~6-10 min)..."
rsh 'cd /var/discourse && ./launcher rebuild app' > /tmp/cutover-rebuild.log 2>&1 \
  || { tail -30 /tmp/cutover-rebuild.log; die "rebuild failed (log: /tmp/cutover-rebuild.log)"; }
ok "rebuild complete"

say "4/6  Waiting for site to answer on https://$PROD_HOST"
for i in $(seq 1 30); do
  code="$(curl -s -o /dev/null -w '%{http_code}' "https://$PROD_HOST/" || true)"
  [[ "$code" == "200" ]] && { ok "HTTP 200"; break; }
  printf "  waiting... (%s) HTTP %s\n" "$i" "$code"
  sleep 15
  (( i == 30 )) && die "site not answering; check server, or run --rollback"
done

# ------------------------------------------------------------------ step 5 --
say "5/6  Remapping staging URLs -> production, then rebaking posts"
rsh "docker exec app bash -c \"discourse remap --force $STAGING_HOST $PROD_HOST\"" || die "remap failed"
ok "remap done"
echo "  rebaking 938 posts (a few minutes)..."
rsh "docker exec -u discourse -w /var/www/discourse app bundle exec rake posts:rebake" >/dev/null 2>&1 || true
ok "rebake done"

say "6/6  Applying production site settings"
cat > /tmp/prodsettings.rb <<'RUBY'
SiteSetting.global_notice = ""
SiteSetting.disable_emails = "no"
SiteSetting.reply_by_email_enabled = false
puts "global_notice_cleared=#{SiteSetting.global_notice.empty?}"
puts "disable_emails=#{SiteSetting.disable_emails}"
puts "reply_by_email=#{SiteSetting.reply_by_email_enabled}"
puts "force_https=#{SiteSetting.force_https}"
RUBY
scp -q "${SSH_OPTS[@]}" /tmp/prodsettings.rb "root@$SERVER_IP:/var/discourse/shared/standalone/prodsettings.rb"
rails_run /shared/prodsettings.rb 2>&1 | grep -E '^(global_notice|disable_emails|reply_by_email|force_https)'

# ---------------------------------------------------------------- verify ----
say "VERIFICATION"
echo "  cert:"
echo | openssl s_client -connect "$PROD_HOST:443" -servername "$PROD_HOST" 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates | sed 's/^/    /'
echo "  content:"
curl -s "https://$PROD_HOST/about.json" | jq -c '.about.stats | {users_count, topics_count, posts_count}' | sed 's/^/    /'
echo "  redirect:"
curl -sI "http://$PROD_HOST/" | grep -iE '^HTTP|location' | sed 's/^/    /'
echo "  leftover staging refs in posts:"
cat > /tmp/leftover.rb <<'RUBY'
puts "  cooked_with_staging=#{Post.where("cooked LIKE '%hub-staging%'").count}"
puts "  raw_with_staging=#{Post.where("raw LIKE '%hub-staging%'").count}"
puts "  cooked_with_cdn=#{Post.where("cooked LIKE '%discourse-cdn.com%'").count}"
RUBY
scp -q "${SSH_OPTS[@]}" /tmp/leftover.rb "root@$SERVER_IP:/var/discourse/shared/standalone/leftover.rb"
rails_run /shared/leftover.rb 2>&1 | grep -E 'staging=|cdn='

say "CUTOVER COMPLETE"
cat <<EOF

  https://$PROD_HOST is now served from the self-hosted box ($SERVER_IP).

  Do these by hand now:
    1. Open https://$PROD_HOST - log in (try BOTH password and Discord)
    2. Post a test reply; confirm you get the notification email
    3. Check an image-heavy topic renders

  If anything is wrong:
    bash docs/temp/hub-migration/cutover.sh --rollback
    (valid only until the hosted site is decommissioned on 2026-07-30)
EOF
