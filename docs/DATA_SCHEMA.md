# Data Schema Reference (`src/types/blueprint.ts`)

## Validation Governance
Every record uses `ValidationStatus`:
- `'CONFIRMED IN PROJECT DISCUSSION'`
- `'SOURCE DOCUMENT PROPOSAL'`
- `'PROPOSED DESIGN'`
- `'UNKNOWN / NEEDS VERIFICATION'`
- `'ILLUSTRATIVE SIMULATION'`

## Milestone Schema (`MilestoneData`)
Each of the 11 milestones populates all 26 required standard sections:
- `sec01_processOverview` (`string`)
- `sec02_purposeAndImportance` (`string`)
- `sec03_entryConditions` (`string[]`)
- `sec04_inputsAndMaterials` (`{ item, spec, status }[]`)
- `sec05_equipmentAndTools` (`{ name, purpose, status }[]`)
- `sec06_workerActivities` (`WorkerActivityDetail[]` — answering *Who, What, Equipment, Inspect, Record, Failure, Approval, Handover*)
- `sec07_stepByStepWorkflow` (`WorkflowStep[]`)
- `sec08_supervisorResponsibilities` (`string[]`)
- `sec09_qcResponsibilities` (`string[]`)
- `sec10_requiredDataAndRecords` (`{ field, format, status }[]`)
- `sec11_qrBarcodeInteractions` (`{ scanEvent, idLevel, direction, status }[]`)
- `sec12_decisionGates` (`DecisionGate[]`)
- `sec13_acceptanceCriteria` (`{ parameter, criterion, sampling, failureAction, status }[]`)
- `sec14_failureAndExceptions` (`{ mode, trigger, impact, status }[]`)
- `sec15_preventiveControls` (`string[]`)
- `sec16_correctiveActions` (`string[]`)
- `sec17_escalationMatrix` (`EscalationTier[]`)
- `sec18_workerChecklist` (`ChecklistItem[]` — Before / During / After)
- `sec19_supervisorChecklist` (`{ id, check, signOffCriteria, status }[]`)
- `sec20_handoverRequirements` (`{ fromRole, toRole, physicalItem, digitalRecord, acknowledgement, status }`)
- `sec21_outputs` (`string[]`)
- `sec22_dependencies` (`{ upstream, downstream, crossCutting }`)
- `sec23_kpis` (`KpiDefinition[]`)
- `sec24_improvementOpportunities` (`string[]`)
- `sec25_openQuestions` (`string[]`)
- `sec26_sourceReferences` (`{ source, excerpt, status, conflictNote? }[]`)

## Scenario Simulation Schema (`ScenarioSimulation`)
Every scenario (`SCN-01` through `SCN-24`) encodes an 8-phase `sequence` (`TRIGGER` → `DETECTION` → `IMMEDIATE_ACTION` → `NOTIFICATION` → `ASSESSMENT` → `DECISION` → `RECOVERY` → `CLOSURE`) plus an interactive branching `decisionTree`.
