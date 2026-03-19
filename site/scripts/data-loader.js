export async function loadSnapshot() {
  const res = await fetch('../data/networkSnapshot.json').catch(() => null);
  if (!res || !res.ok) throw new Error('Could not load networkSnapshot.json');
  return res.json();
}

export function byId(id) {
  return document.getElementById(id);
}

export function setText(id, value) {
  const el = byId(id);
  if (el) el.textContent = value;
}

export function statusClass(status = '') {
  const s = status.toLowerCase();
  if (s === 'active') return 'status-active';
  if (s === 'bootstrapping') return 'status-bootstrapping';
  if (s === 'observer') return 'status-observer';
  return '';
}

export function pillStatus(status = '') {
  const s = status.toLowerCase();
  if (s === 'active') return '🟢 active';
  if (s === 'bootstrapping') return '🟡 bootstrapping';
  if (s === 'observer') return '👀 observer';
  return status || 'unknown';
}
