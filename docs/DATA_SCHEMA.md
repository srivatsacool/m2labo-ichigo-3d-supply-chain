# Data Schema Reference (`src/data/types.ts`)

## Operational Stations (`OperationalStation`)
Represents the 8 downstream operational stations (`ST-01` through `ST-08`):
- `ST-01`: Farm-to-M2Labo Custody Handover (`custodyBanner: 'M2LABO CUSTODY BEGINS HERE'`)
- `ST-02`: Line-Haul Transport (Option A Reefer vs Option B Normal Van + Insulated Boxes)
- `ST-03`: Andheri MIDC Receiving and QC (6 mandatory checks)
- `ST-04`: Inventory and Reshuffling (4 physically segregated buckets + FIFO)
- `ST-05`: Customer Order, Picking and Packing (B2C black 250g/500g vs B2B cavity trays + insulated bags/coolants)
- `ST-06`: Last-Mile Delivery (hybrid modes + Digital POD + reusable bag return)
- `ST-07`: Returns and Complaints (CRM linkage + Quarantine QC + never auto-sellable)
- `ST-08`: Financial Reconciliation (`isDigitalStation: true`)

## ERP & CRM Field Schema (`ErpCrmEventField`)
Every digital data field captures all 10 required attributes:
1. `eventName`
2. `eventTrigger`
3. `fieldName` (plus descriptive `fieldKey`)
4. `dataType`
5. `requiredStatus` (`'Required' | 'Optional' | 'Conditional'`)
6. `captureMethod`
7. `systemOwnership` (`ERP (...)`, `CRM (...)`, or `'Shared ERP ↔ CRM'`)
8. `relatedEntity`
9. `analyticalPurpose`
10. `validationRules`

Classified strictly by `category`:
- `'SOURCE_DEFINED'`
- `'PROPOSED_DEVELOPMENT'`
- `'DERIVED_METRIC'`

## Exception Branch Schema (`ExceptionBranch`)
Encodes 19 downstream process exceptions (`EXC-01`..`EXC-19`), including `trigger`, `affectedEntity`, `dataToCapture`, `responsibleRole`, `currentProcessStatus`, `requiredDecision`, `decisionDefinedInSource`, `processDecisionNote`, `resolutionRecord`, and `anchor3DOffset`. Whenever `decisionDefinedInSource === false`, UI views render the mandatory **`PROCESS DECISION REQUIRED`** badge.
