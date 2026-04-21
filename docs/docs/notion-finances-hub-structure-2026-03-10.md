---
id: "notion-finances-hub-structure-2026-03-10"
type: notion-structure
date: "2026-03-10"
title: "ReFi BCN Finances Management Hub — Notion Structure Proposal"
owners:
  - did:refibcn:luiz-fernando
source_refs:
  - data/finances.yaml
  - data/pending-payouts.yaml
  - https://www.notion.so/Finances-Management-2fc6ed0845cb80be8a08e51edffb8b6a
---

# ReFi BCN Finances Management Hub — Notion Structure

## Overview
This document proposes a comprehensive structure for the Notion Finances Management page, designed to mirror and complement the local OS finance registry (`data/finances.yaml`, `data/pending-payouts.yaml`).

**Principle:** Notion = operational workspace for active tracking; Local OS = canonical registry + historical record.

---

## Page Structure

```
Finances Management (Hub Page)
├── 📊 Dashboard (Overview + Key Metrics)
├── 💰 Transactions Ledger (Database)
├── 🎫 Credits Register (Database)
├── 📈 Cash Flow Tracker (Database + Views)
├── 📋 Project Financial Agreements (Database)
├── 🏦 Treasury State (Sync from Safe)
└── 📑 Resources & References
```

---

## 1. Dashboard (Overview)

**Purpose:** At-a-glance financial health snapshot

**Content Blocks:**
- **Monthly Burn Rate** (auto-calculated from transactions)
- **Treasury Balance** (manual update from Safe)
- **Pending Payouts Total** (roll-up from Credits Register)
- **Next 30 Days Cash Position** (projection)
- **Action Items** (linked from Credits Register — status = pending/approved)

**Key Metrics to Display:**
| Metric | Source | Update Frequency |
|--------|--------|------------------|
| Current Treasury Balance | Safe / manual | Weekly |
| Outstanding Reimbursements | Transactions Ledger | Real-time |
| Pending Payouts | Credits Register | Real-time |
| Monthly Operational Costs | Cash Flow Tracker | Monthly |
| Coop Constitution Progress | Manual | As needed |

---

## 2. Transactions Ledger (Database)

**Purpose:** All financial movements — expenses, income, transfers

**Database Schema:**
| Field | Type | Options/Notes |
|-------|------|---------------|
| Date | Date | Transaction date |
| Type | Select | Expense / Income / Transfer / Reimbursement |
| Category | Select | Fixed costs / Program funding / Operations / Reimbursement / Other |
| Subcategory | Select | Obsidian / Notion / Domain / Grant / Partner contribution / etc. |
| Project | Relation | Link to Projects database |
| Counterparty | Text | Who paid or received |
| Description | Text | What the transaction was for |
| Amount (Original) | Number | Amount in original currency |
| Currency | Select | EUR / USD / XDAI / etc. |
| FX Rate | Number | To EUR (if applicable) |
| Amount (EUR) | Formula | Calculated EUR equivalent |
| Payment Method | Select | Card / Transfer / Safe / Crypto |
| Status | Select | Cleared / Pending / Expected / Disputed |
| Paid By | Select | Luiz personal / Giulio personal / Cooperative treasury / Other |
| Reimbursement Status | Select | N/A / To be reimbursed / Reimbursed |
| Receipt/Doc Ref | Text | Link to receipt or document |
| Invoice # | Text | For accounting |
| Notes | Text | Additional context |
| Estimated? | Checkbox | Is this a projected amount? |
| Source File | Text | Link to local registry entry |

**Views:**
- All Transactions (table)
- By Month (calendar)
- By Project (board)
- Pending Reimbursements (filter: Reimbursement Status = To be reimbursed)
- Expected/Projected (filter: Estimated? = checked)
- Disputed Items (filter: Status = Disputed)

---

## 3. Credits Register (Database)

**Purpose:** Track credits issued, pending payouts, and allocation decisions

**Database Schema:**
| Field | Type | Options/Notes |
|-------|------|---------------|
| Credit ID | Title | Auto-generated or manual (e.g., CR-2026-001) |
| Date Issued | Date | When credit was established |
| Beneficiary | Select | Luizfernando / Giulio / Andrea / Cooperative / External |
| Amount | Number | Credit amount |
| Currency | Select | EUR / USD |
| Project | Relation | Link to Projects database |
| Type | Select | Historical compensation / Project allocation / Reimbursement / Disputed |
| Status | Select | Draft / Pending approval / Approved / Rejected / Executed / Disputed |
| Rationale | Text | Why this credit exists |
| Source Meeting | Text | Which meeting established this (e.g., 260205) |
| Dependencies | Text | What's needed to resolve (verification, decision, etc.) |
| Due Date | Date | When this should be resolved |
| Owner | Select | Who is responsible for resolving |
| Related Transactions | Relation | Link to Transactions Ledger when executed |
| Local Registry ID | Text | Link to data/pending-payouts.yaml entry |

**Views:**
- All Credits (table)
- By Status (board: Draft → Pending → Approved → Executed)
- By Beneficiary (table)
- Disputed Items (filter: Status = Disputed)
- Ready to Execute (filter: Status = Approved)
- Overdue (filter: Due Date < today AND Status ≠ Executed)

**Initial Entries to Create:**
1. Cycles project — $1,350 to Giulio (Approved)
2. Cycles project — $150 to coop (Approved)
3. Empenta confirmed — €1,800 to Giulio (Approved)
4. Empenta confirmed — €200 to coop (Approved)
5. Empenta uncertain — €1,300 (Verification needed)
6. Reimbursements — €700+ to Luiz (Verification needed)
7. BioFi credit — €500 to Giulio (Verification needed)
8. Digital Catalonia — €5,000 (Disputed — needs resolution)

---

## 4. Cash Flow Tracker (Database + Views)

**Purpose:** Monthly inflow/outflow tracking + 3-6 month projection

**Database Schema:**
| Field | Type | Options/Notes |
|-------|------|---------------|
| Month | Title | Format: 2026-01, 2026-02, etc. |
| Period Start | Date | First day of month |
| Period End | Date | Last day of month |
| Opening Balance | Number | EUR at start of month |
| Total Income | Rollup | Sum of Income type transactions |
| Total Expenses | Rollup | Sum of Expense type transactions |
| Net Cash Flow | Formula | Income - Expenses |
| Closing Balance | Formula | Opening + Net Cash Flow |
| Projected Income | Number | Expected incoming |
| Projected Expenses | Number | Expected outgoing |
| Variance Notes | Text | Explanation of differences |
| Status | Select | Closed / Open / Projected |

**Views:**
- Monthly Overview (table)
- Cash Flow Chart (timeline/graph view if available)
- 6-Month Projection (filter: Status = Projected)
- Variance Analysis (table with variance notes)

**Linked View:**
- Embedded table from Transactions Ledger filtered by month

---

## 5. Project Financial Agreements (Database)

**Purpose:** One record per project with allocation rules and financial agreements

**Database Schema:**
| Field | Type | Options/Notes |
|-------|------|---------------|
| Project | Title | Project name |
| Project Link | Relation | Link to Projects database |
| Total Budget | Number | Agreed project budget |
| Currency | Select | EUR / USD |
| Allocation Rule | Text | How funds are split (e.g., 10% coop, 90% lead) |
| Lead Contributor | Select | Primary project lead |
| Secondary Contributors | Multi-select | Other contributors |
| Agreement Date | Date | When allocation was agreed |
| Agreement Source | Text | Meeting reference (e.g., 260205) |
| Amount Received | Rollup | From Transactions Ledger |
| Amount Distributed | Rollup | From Credits Register (Executed) |
| Amount Pending | Rollup | From Credits Register (Draft + Pending + Approved) |
| Remaining Balance | Formula | Received - Distributed |
| Status | Select | Active / Closed / Disputed |
| Notes | Text | Special conditions or disputes |

**Views:**
- All Projects (table)
- By Status (board)
- With Disputes (filter: Status = Disputed)
- Closed Projects (filter: Status = Closed)

**Initial Entries:**
1. Regenerant Catalunya 2025
2. Cycles
3. Empenta
4. BioFi Barcelona (disputed)
5. Digital Catalonia / Regional Catalonia (disputed)

---

## 6. Treasury State (Page/Sync)

**Purpose:** Current Safe and wallet balances

**Content:**
- **Last Updated:** Date of last balance check
- **Safe Balances:**
  - Regenerant Catalunya Safe: [Amount] USD/EUR
  - ReFi BCN Treasury (refibcn.eth): [Amount]
- **Wallet Balances:**
  - Brickell Personas: ~$1k USD
  - Individual project wallets (if any)
- **Pending Safe Transactions:** List of pending multi-sig transactions

**Update Process:**
- Manual update before each Weekly Ops Sync
- Or: Agent pulls from Safe API and suggests updates

---

## 7. Resources & References (Page)

**Purpose:** Links and documentation

**Content:**
- **Cash Flow Spreadsheet:** Link to master spreadsheet (Zettelkasten)
- **Local Registry:** `data/finances.yaml`
- **Pending Payouts:** `data/pending-payouts.yaml`
- **Meeting Notes:** Links to finance-related meetings (260205, 260211, etc.)
- **Accountant Contact:** Details
- **Safe URLs:** Links to Safe interfaces
- **Reimbursement Policy:** Documented rules

---

## Sync Protocol: Notion ↔ Local OS

**Daily/Weekly:**
1. Agent queries Notion Transactions Ledger for new entries
2. Agent updates `data/finances.yaml` with confirmed transactions
3. Agent updates `data/pending-payouts.yaml` with credit status changes
4. Agent posts summary to Telegram/Weekly Ops prep

**Monthly:**
1. Reconcile Notion Cash Flow Tracker with local registry
2. Generate monthly finance report from local data
3. Update Notion Dashboard metrics

**Triggered:**
- When Credits Register status changes to "Approved" → Alert in HEARTBEAT for payout execution
- When Disputed item is resolved → Update both systems

---

## Implementation Steps

1. **Create databases** in Notion with schemas above
2. **Import initial data** from `data/pending-payouts.yaml` into Credits Register
3. **Import transactions** from cash flow CSV into Transactions Ledger
4. **Set up views** as specified
5. **Create Dashboard** with linked views and metrics
6. **Document sync process** in Resources & References
7. **Test sync** with one transaction end-to-end

---

## Success Criteria

- [ ] All 8 pending credits from `data/pending-payouts.yaml` in Credits Register
- [ ] All recent transactions (RC ops payments) in Transactions Ledger
- [ ] Dashboard shows current metrics accurately
- [ ] Weekly Ops can reference Notion for financial status
- [ ] Local OS remains canonical with source-of-truth entries
