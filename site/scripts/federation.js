import { loadSnapshot, setText } from './data-loader.js';

async function boot() {
  const data = await loadSnapshot();
  const f = data.federation;

  setText('fName', f.identity?.name || 'Regen Coordination OS');
  setText('fNetwork', f.network || 'regen-coordination');
  setText('fHub', f.hub || 'n/a');
  setText('fDecisionModel', f.governance?.decision_model || 'consensus');

  const down = document.getElementById('downstreamList');
  if (down) {
    down.innerHTML = (f.downstream || []).map((d) => `
      <tr>
        <td>${d.name}</td>
        <td>${d.type}</td>
        <td>${d.trust || '-'}</td>
        <td><a href="https://${d.repo}" target="_blank">${d.repo}</a></td>
      </tr>
    `).join('');
  }

  const domains = document.getElementById('domainList');
  if (domains) {
    domains.innerHTML = (f['knowledge-commons']?.['shared-domains'] || [])
      .map((d) => `<span class="badge">${d}</span>`)
      .join(' ');
  }
}

boot().catch(console.error);
