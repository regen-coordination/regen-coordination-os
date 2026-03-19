import { loadSnapshot, setText } from './data-loader.js';

async function boot() {
  try {
    const data = await loadSnapshot();
    const s = data.stats;

    setText('kpiNodeCount', s.nodeCount);
    setText('kpiNetworkCount', s.networkCount);
    setText('kpiFundCount', s.fundCount);
    setText('kpiInitiativeCount', s.initiativeCount);

    setText('kpiActiveNodes', s.activeNodes);
    setText('kpiActiveFunds', s.activeFunds);
    setText('kpiProgramCount', s.programCount);

    const latest = document.getElementById('latestUpdated');
    if (latest) latest.textContent = new Date(data.meta.generatedAt).toLocaleString();

    const preview = document.getElementById('nodesPreview');
    if (preview) {
      const top = data.nodes.slice(0, 6);
      preview.innerHTML = top.map((n) => `
        <div class="glass card">
          <div class="badge">${n.network || 'network'}</div>
          <h3>${n.name}</h3>
          <p>${n.location || 'Location TBD'}</p>
          <small>${n.status || 'unknown'}</small>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

boot();
