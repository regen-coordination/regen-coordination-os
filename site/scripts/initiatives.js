import { loadSnapshot, pillStatus } from './data-loader.js';

async function boot() {
  const data = await loadSnapshot();
  const list = data.initiatives || [];
  const grid = document.getElementById('initiativeGrid');

  if (!grid) return;
  grid.innerHTML = list.map((i) => `
    <div class="glass card">
      <div class="badge">${(i.networks || []).join(', ') || 'network'}</div>
      <h3>${i.name}</h3>
      <p>${i.description || ''}</p>
      <small>${pillStatus(i.status)}</small>
    </div>
  `).join('');
}

boot().catch(console.error);
