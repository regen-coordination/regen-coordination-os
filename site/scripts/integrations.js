import { loadSnapshot } from './data-loader.js';

const REQUIRED = [
  'Coop',
  'Green Goods',
  'Bloom Network',
  'Karma GAP',
  'Common Approach',
  'Region Atlas',
  'OpenClaw',
  'gitcoin_co_30'
];

async function boot() {
  await loadSnapshot();
  const el = document.getElementById('integrationMatrix');
  if (!el) return;

  el.innerHTML = REQUIRED.map((name) => `
    <tr>
      <td>${name}</td>
      <td>${getPurpose(name)}</td>
      <td>${getStatus(name)}</td>
      <td>${getReference(name)}</td>
    </tr>
  `).join('');
}

function getPurpose(name) {
  const map = {
    'Coop': 'Browser knowledge commons + capture layer',
    'Green Goods': 'Funding + governance + reputation workflows',
    'Bloom Network': 'Network interoperability and chapter coordination',
    'Karma GAP': 'Impact/activity reporting infrastructure',
    'Common Approach': 'Impact data standards (CIDS alignment)',
    'Region Atlas': 'Node and chapter visualization',
    'OpenClaw': 'Agent runtime and automation layer',
    'gitcoin_co_30': 'Reference model for structured content/directory patterns'
  };
  return map[name] || '-';
}

function getStatus(name) {
  const map = {
    'Coop': '🟡 bootstrapping',
    'Green Goods': '🟢 active',
    'Bloom Network': '🟢 active',
    'Karma GAP': '🟢 active',
    'Common Approach': '🟢 active',
    'Region Atlas': '🟡 mapping',
    'OpenClaw': '🟢 active',
    'gitcoin_co_30': '🟢 archived reference'
  };
  return map[name] || 'unknown';
}

function getReference(name) {
  const map = {
    'Coop': '<a href="../../integrations/profiles/coop-integration.md" target="_blank">profile</a>',
    'Green Goods': '<a href="../../docs/260311 RC Website - Reference + Integration Archive.md" target="_blank">reference</a>',
    'Bloom Network': '<a href="../../260206 Regen Coordination Council Sync.md" target="_blank">meeting context</a>',
    'Karma GAP': '<a href="../../260101 Regen Coordination/Regen Coordination - Karma Activities Report.md" target="_blank">report</a>',
    'Common Approach': '<a href="../../260101 Regen Coordination/Regen Coordination - Karma Activities Report.md" target="_blank">report</a>',
    'Region Atlas': '<a href="../../260206 Regen Coordination Council Sync.md" target="_blank">decision note</a>',
    'OpenClaw': '<a href="../../integrations/profiles/openclaw-integration.md" target="_blank">profile</a>',
    'gitcoin_co_30': '<a href="../../integrations/profiles/gitcoin-co30-integration.md" target="_blank">integration profile</a>'
  };
  return map[name] || '-';
}

boot().catch(console.error);
