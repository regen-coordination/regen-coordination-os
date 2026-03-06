# Coop Integration

System: Coop  
Source repo: `03 Libraries/coop` / `https://github.com/regen-coordination/coop`  
Status: active

---

## Purpose

Coop is the browser-native knowledge commons product under Regen Coordination.

It provides the capture and coordination layer for local communities using:

- tab-first and voice-first input;
- shared processing workflows for impact, coordination, governance, and capital;
- anchor-assisted agent operations for members without dedicated node infrastructure.

---

## Architecture

### 1) Three-layer storage model

1. **Local layer**: IndexedDB / device-local storage for participant data capture.
2. **Shared membrane layer**: peer synchronization between coop members.
3. **Cold storage layer**: Storacha/Filecoin archival for long-term persistence.

### 2) Compute and agent model

- **Standard nodes**: capture, summarize, and sync community context.
- **Anchor node**: handles stronger inference workloads, API key-backed tasks, and outbound posting/integration actions.

### 3) On-chain coordination model

- Coop membership and discoverability map to on-chain registry patterns (`CoopRegistry.sol`).
- Account abstraction integration path uses Pimlico-compatible smart account/session key model.

---

## Shared Skill Surface

Coop workflows align with Regen Coordination's shared skill stack:

- `impact-reporting`
- `coordination`
- `governance-assistant`
- `capital-flow`
- `meeting-processor`
- `knowledge-curator`

---

## Organizational Context

- Launch context: Luiz × Afo sync (2026-03-05) and council alignment.
- Founding build team for initial cycle: Afolabi Aiyeloja, Luiz Fernando, Antonio.
- Operating model: equal-share co-op structure under Regen Coordination.
- Initial delivery cycle: PL Genesis hackathon prototype window (first prototype target: March 9, 2026).

---

## Integration Points in Regen Coordination OS

- `federation.yaml` → listed as active `tools` integration and downstream `product-node`.
- `MEMBERS.md` and `data/nodes.yaml` → represented as a bootstrapping product node.
- `data/programs.yaml` → tracked as an active coordination program in prototype phase.

---

## Near-Term Coordination Needs

- Keep Coop architecture and runtime assumptions synchronized between `regen-coordination-os` and `coop` repo docs.
- Track which capabilities are extension-native vs anchor-node-only to avoid mismatched expectations.
- Maintain interoperability with OpenClaw runtime conventions and RC knowledge commons publishing paths.
