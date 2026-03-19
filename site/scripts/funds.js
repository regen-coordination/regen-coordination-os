import { loadSnapshot, pillStatus } from './data-loader.js';

async function boot() {
  const data = await loadSnapshot();
  const funds = data.funds || [];
  const programs = [...(data.programs?.funding || []), ...(data.programs?.coordination || [])];

  const fundGrid = document.getElementById('fundGrid');
  if (fundGrid) {
    fundGrid.innerHTML = funds.map((f) => `
      <div class="glass card">
        <div class="badge">${f.type || 'fund'}</div>
        <h3>${f.name}</h3>
        <p>${f.notes || ''}</p>
        <small>${pillStatus(f.status)}</small>
      </div>
    `).join('');
  }

  const programGrid = document.getElementById('programGrid');
  if (programGrid) {
    programGrid.innerHTML = programs.map((p) => `
      <div class="glass card">
        <h3>${p.name}</h3>
        <p>${p.notes || ''}</p>
        <small>${pillStatus(p.status)}</small>
      </div>
    `).join('');
  }
}

boot().catch(console.error);
