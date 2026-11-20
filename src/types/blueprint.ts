export type ValidationStatus =
  | 'CONFIRMED IN PROJECT DISCUSSION'
  | 'SOURCE DOCUMENT PROPOSAL'
  | 'PROPOSED DESIGN'
  | 'UNKNOWN / NEEDS VERIFICATION'
  | 'ILLUSTRATIVE SIMULATION';

export type RolePerspective = 'WORKER' | 'SUPERVISOR' | 'MANAGEMENT';

export type VisualMode = 'PICTURE' | '2D_CAD' | '3D_SPATIAL';

export interface LightboxImageInfo {
  src: string;
  title: string;
  caption: string;
  classification: string;
}

export type ModuleId =
  | 'overview'
  | 'blueprint'
  | 'handbook'
  | 'checklists'
  | 'risks'
  | 'scenarios'
  | 'traceability'
  | 'atlas'
  | 'kpis'
  | 'questions';

export type ProcessStateType = 'CURRENT' | 'PROPOSED' | 'HYBRID';

export interface GovernanceMetadata {
  status: ValidationStatus;
  sourceDocument: string;
  pageOrRef: string;
  validationOwner: string;
  validationDate: string;
  approvalStatus: 'Approved Baseline' | 'Pending Validation' | 'Draft Proposal' | 'Unresolved';
  revisionHistory: { version: string; date: string; note: string }[];
  processState: ProcessStateType;
}

export interface WorkerActivityDetail {
  id: string;
  title: string;
  whoPerforms: string;
  whatTheyDo: string;
  equipmentUsed: string;
  whatToInspect: string;
  whatToRecord: string;
  ifItFails: string;
  whoApprovesNext: string;
  whatIsHandedOver: string;
  status: ValidationStatus;
}

export interface WorkflowStep {
  stepNo: string;
  action: string;
  owner: string;
  gateType: 'ACTION' | 'DECISION' | 'QC_GATE' | 'HANDOVER';
  status: ValidationStatus;
  note?: string;
}

export interface DecisionBranch {
  condition: string;
  outcome: 'PASS' | 'HOLD' | 'REWORK' | 'DOWNGRADE' | 'REJECT' | 'ESCALATE';
  nextStep: string;
  owner: string;
  status: ValidationStatus;
}

export interface DecisionGate {
  id: string;
  gateTitle: string;
  question: string;
  branches: DecisionBranch[];
}

export interface ChecklistItem {
  id: string;
  phase: 'BEFORE' | 'DURING' | 'AFTER';
  instruction: string;
  required: boolean;
  assignedRole: string;
  supervisorRole: string;
  mandatoryReadingLabel?: string;
  mandatoryReadingUnit?: string;
  qrRequired?: boolean;
  evidenceRequired?: boolean;
  status: ValidationStatus;
}

export interface EscalationTier {
  level: string;
  trigger: string;
  notifyRole: string;
  responseTarget: string;
  authority: string;
  status: ValidationStatus;
}

export interface KpiDefinition {
  id: string;
  name: string;
  formula: string;
  unit: string;
  dataSource: string;
  frequency: string;
  owner: string;
  target: string;
  status: ValidationStatus;
}

export interface MilestoneData {
  id: string; // 'M01'..'M11'
  number: string; // '01'..'11'
  code: string;
  title: string;
  shortTitle: string;
  facilityZone: string;
  primaryOwner: string;
  has3DContext?: 'farm' | 'cooler-packaging' | 'warehouse-transport';
  stationTelemetry: {
    targetTemp: string;
    cycleWindow: string;
    qrAnchor: string;
    keyOutput: string;
  };
  governance: GovernanceMetadata;

  // All 26 Standard Milestone Detail Sections
  sec01_processOverview: string;
  sec02_purposeAndImportance: string;
  sec03_entryConditions: string[];
  sec04_inputsAndMaterials: { item: string; spec: string; status: ValidationStatus }[];
  sec05_equipmentAndTools: { name: string; purpose: string; status: ValidationStatus }[];
  sec06_workerActivities: WorkerActivityDetail[];
  sec07_stepByStepWorkflow: WorkflowStep[];
  sec08_supervisorResponsibilities: string[];
  sec09_qcResponsibilities: string[];
  sec10_requiredDataAndRecords: { field: string; format: string; status: ValidationStatus }[];
  sec11_qrBarcodeInteractions: { scanEvent: string; idLevel: string; direction: string; status: ValidationStatus }[];
  sec12_decisionGates: DecisionGate[];
  sec13_acceptanceCriteria: { parameter: string; criterion: string; sampling: string; failureAction: string; status: ValidationStatus }[];
  sec14_failureAndExceptions: { mode: string; trigger: string; impact: string; status: ValidationStatus }[];
  sec15_preventiveControls: string[];
  sec16_correctiveActions: string[];
  sec17_escalationMatrix: EscalationTier[];
  sec18_workerChecklist: ChecklistItem[];
  sec19_supervisorChecklist: { id: string; check: string; signOffCriteria: string; status: ValidationStatus }[];
  sec20_handoverRequirements: { fromRole: string; toRole: string; physicalItem: string; digitalRecord: string; acknowledgement: string; status: ValidationStatus };
  sec21_outputs: string[];
  sec22_dependencies: { upstream: string[]; downstream: string[]; crossCutting: string[] };
  sec23_kpis: KpiDefinition[];
  sec24_improvementOpportunities: string[];
  sec25_openQuestions: string[];
  sec26_sourceReferences: { source: string; excerpt: string; status: ValidationStatus; conflictNote?: string }[];
}

export interface FmeaRiskRecord {
  id: string;
  milestoneId: string;
  milestoneTitle: string;
  failureMode: string;
  trigger: string;
  cause: string;
  potentialEffect: string;
  detectionMethod: string;
  probability: string;
  severity: string;
  detectability: string;
  riskPriorityLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNSCORED';
  preventiveControl: string;
  immediateAction: string;
  recoveryProcedure: string;
  escalationOwner: string;
  requiredRecords: string;
  closureCriteria: string;
  status: ValidationStatus;
}

export interface ScenarioStep {
  phase: 'TRIGGER' | 'DETECTION' | 'IMMEDIATE_ACTION' | 'NOTIFICATION' | 'ASSESSMENT' | 'DECISION' | 'RECOVERY' | 'CLOSURE';
  actor: string;
  action: string;
  recordOrEvidence: string;
}

export interface ScenarioDecisionNode {
  id: string;
  question: string;
  options: {
    label: string;
    consequence: string;
    recoveryPath: string;
    nextNodeId?: string;
    finalOutcome?: string;
  }[];
}

export interface ScenarioSimulation {
  id: string; // 'SCN-01'..'SCN-24'
  title: string;
  milestoneId: string;
  linkedMilestones: string[];
  severityBand: 'CRITICAL' | 'HIGH' | 'MODERATE';
  overview: string;
  trigger: string;
  initialWarning: string;
  observableSymptoms: string[];
  sequence: ScenarioStep[];
  decisionTree: ScenarioDecisionNode[];
  responsibleRole: string;
  responseTimeTarget: string;
  requiredEvidence: string[];
  recoveryOptions: string[];
  customerCommunication: string;
  financialImpact: string;
  closureCriteria: string;
  status: ValidationStatus; // Always 'ILLUSTRATIVE SIMULATION' until validated
}

export interface TraceabilityStageNode {
  stageOrder: number;
  idType: string;
  sampleId: string;
  parentStage?: string;
  childStage?: string;
  milestoneId: string;
  timestamp: string;
  responsibleRole: string;
  location: string;
  tempReading: string;
  quantityReconciliation: string;
  inventoryBucket?: string;
  customerAllocation?: string;
  qrPayloadSchema: string;
  status: ValidationStatus;
}

export interface PackagingSpec {
  id: 'B2C' | 'B2B';
  title: string;
  channel: string;
  unitWeight: string;
  packConfiguration: string;
  visualStyle: string;
  cavityProtection: string;
  outerContainer: string;
  dimensions: string;
  imageClassification: 'PROJECT REFERENCE SPECIFICATION' | 'TECHNICAL DIAGRAM';
  notes: string[];
  status: ValidationStatus;
}

export interface EquipmentAssetEntry {
  id: string;
  name: string;
  category: 'Facility' | 'Automation' | 'Cold Chain' | 'Packaging' | 'Transport' | 'Warehouse';
  milestones: string[];
  assetClassification: 'Actual Project Reference' | 'Technical Diagram' | 'Conceptual 3D Model (Polyfork CC BY 4.0)' | 'Procedural Engineering Model';
  description: string;
  knownSpecs: string;
  unknownSpecs: string;
  status: ValidationStatus;
  polyforkAssetId?: string;
  polyforkGlbUrl?: string;
  polyforkLicense?: string;
  polyforkCredit?: string;
  triangles?: number;
  dimensionsM?: { x: number; y: number; z: number };
}

export interface KpiSectionGroup {
  domain: 'Farm' | 'Harvesting' | 'Cold Chain' | 'Transport' | 'Warehouse' | 'Fulfilment' | 'Last-Mile' | 'Customer' | 'Finance';
  milestoneIds: string[];
  metrics: {
    id: string;
    name: string;
    formula: string;
    unit: string;
    illustrativeValue: string;
    illustrativeTrend: number[];
    trendLabels: string[];
    owner: string;
    targetStatus: string;
    status: ValidationStatus;
  }[];
}

export interface OpenQuestionRecord {
  id: string;
  category: string;
  milestoneIds: string[];
  question: string;
  whyItMatters: string;
  questionOwner: string;
  priority: 'P0 - Critical' | 'P1 - High' | 'P2 - Medium';
  currentStatus: 'OPEN' | 'IN REVIEW' | 'RESOLVED';
  proposedDefault: string;
  answer: string;
  evidenceAttachmentNote: string;
  decision: string;
  approvalStatus: 'Pending Sign-off' | 'Approved' | 'Rejected';
  dueDate: string;
  discrepancyNote?: string;
  status: ValidationStatus;
}

export interface DiscrepancyRecord {
  id: string;
  topic: string;
  statementA: { source: string; text: string };
  statementB: { source: string; text: string };
  resolutionOwner: string;
  linkedQuestionId: string;
  status: 'UNRESOLVED';
}

export interface ChecklistInteractionState {
  checked: boolean;
  timestamp?: string;
  readingValue?: string;
  qrScanned?: string;
  evidenceNote?: string;
  failed?: boolean;
  escalated?: boolean;
  supervisorSignedOff?: boolean;
  supervisorName?: string;
}
