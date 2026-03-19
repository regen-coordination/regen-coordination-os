#!/usr/bin/env node
/**
 * Build Network Snapshot
 * 
 * Parses canonical YAML source files and generates a unified JSON snapshot
 * for the website to consume. Run this before building/deploying the site.
 * 
 * Usage: node scripts/build-snapshot.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function loadYaml(filename) {
  try {
    const content = readFileSync(join(ROOT, filename), 'utf8');
    return yaml.load(content);
  } catch (err) {
    console.warn(`Warning: Could not load ${filename}: ${err.message}`);
    return null;
  }
}

function computeStats(data) {
  const stats = {
    nodeCount: 0,
    activeNodes: 0,
    bootstrappingNodes: 0,
    fundCount: 0,
    activeFunds: 0,
    programCount: 0,
    initiativeCount: 0,
    networks: new Set(),
    countries: new Set(),
    lastUpdated: new Date().toISOString()
  };

  // Count nodes
  if (data.nodes?.nodes) {
    stats.nodeCount = data.nodes.nodes.length;
    data.nodes.nodes.forEach(node => {
      if (node.status === 'active') stats.activeNodes++;
      if (node.status === 'bootstrapping') stats.bootstrappingNodes++;
      if (node.network) stats.networks.add(node.network);
      if (node.location) {
        const country = node.location.split(',').pop()?.trim();
        if (country) stats.countries.add(country);
      }
    });
  }

  // Count funds
  if (data.funds?.funds) {
    stats.fundCount = data.funds.funds.length;
    stats.activeFunds = data.funds.funds.filter(f => f.status === 'active').length;
  }

  // Count programs
  if (data.programs?.programs) {
    const allPrograms = [
      ...(data.programs.programs.funding || []),
      ...(data.programs.programs.coordination || [])
    ];
    stats.programCount = allPrograms.length;
  }

  // Count initiatives
  if (data.initiatives?.initiatives) {
    stats.initiativeCount = data.initiatives.initiatives.length;
  }

  return {
    ...stats,
    networks: Array.from(stats.networks),
    countries: Array.from(stats.countries),
    networkCount: stats.networks.size,
    countryCount: stats.countries.size
  };
}

function buildSnapshot() {
  console.log('🔧 Building network snapshot...');

  // Load all source files
  const sources = {
    federation: loadYaml('federation.yaml'),
    nodes: loadYaml('data/nodes.yaml'),
    funds: loadYaml('data/funds.yaml'),
    programs: loadYaml('data/programs.yaml'),
    initiatives: loadYaml('data/initiatives.yaml'),
    channels: loadYaml('data/channels.yaml'),
    fundingOpportunities: loadYaml('data/funding-opportunities.yaml')
  };

  // Validate critical sources
  if (!sources.federation) {
    console.error('❌ federation.yaml is required but could not be loaded');
    process.exit(1);
  }

  // Build snapshot
  const snapshot = {
    meta: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      sourceFiles: [
        'federation.yaml',
        'data/nodes.yaml',
        'data/funds.yaml',
        'data/programs.yaml',
        'data/initiatives.yaml',
        'data/channels.yaml',
        'data/funding-opportunities.yaml'
      ]
    },
    federation: sources.federation,
    nodes: sources.nodes?.nodes || [],
    funds: sources.funds?.funds || [],
    programs: sources.programs?.programs || { funding: [], coordination: [] },
    initiatives: sources.initiatives?.initiatives || [],
    channels: sources.channels?.channels || [],
    fundingOpportunities: sources.fundingOpportunities?.funding_opportunities || [],
    domainPools: sources.fundingOpportunities?.domain_pools || null,
    stats: computeStats(sources)
  };

  // Write snapshot
  const outputPath = join(ROOT, 'site', 'data', 'networkSnapshot.json');
  writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));

  console.log('✅ Snapshot built successfully!');
  console.log(`📊 Stats:`);
  console.log(`   • Nodes: ${snapshot.stats.nodeCount} (${snapshot.stats.activeNodes} active, ${snapshot.stats.bootstrappingNodes} bootstrapping)`);
  console.log(`   • Funds: ${snapshot.stats.fundCount} (${snapshot.stats.activeFunds} active)`);
  console.log(`   • Programs: ${snapshot.stats.programCount}`);
  console.log(`   • Initiatives: ${snapshot.stats.initiativeCount}`);
  console.log(`   • Networks: ${snapshot.stats.networkCount} (${snapshot.stats.networks.join(', ')})`);
  console.log(`   • Countries: ${snapshot.stats.countryCount}`);
  console.log(`\n📁 Output: ${outputPath}`);

  return snapshot;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSnapshot();
}

export { buildSnapshot };
