import { loadSnapshot, statusClass, pillStatus } from './data-loader.js';

async function boot() {
  const data = await loadSnapshot();
  const tbody = document.getElementById('nodesTableBody');
  const filter = document.getElementById('networkFilter');

  const nodes = data.nodes || [];
  const networks = [...new Set(nodes.map((n) => n.network).filter(Boolean))].sort();

  if (filter) {
    filter.innerHTML = '<option value="">All networks</option>' + networks.map((n) => `<option value="${n}">${n}</option>`).join('');
    filter.addEventListener('change', () => render(filter.value));
  }

  function render(network = '') {
    const rows = nodes
      .filter((n) => !network || n.network === network)
      .map((n) => `
        <tr>
          <td>${n.name}</td>
          <td>${n.location || '-'}</td>
          <td>${n.network || '-'}</td>
          <td class="${statusClass(n.status)}">${pillStatus(n.status)}</td>
          <td>${n.type || '-'}</td>
          <td>${n.repo ? `<a href="https://${n.repo}" target="_blank">repo</a>` : '-'}</td>
        </tr>
      `)
      .join('');
    tbody.innerHTML = rows;
  }

  render('');
}

boot().catch(console.error);
