export type StationId =
  | 'ST-01'
  | 'ST-02'
  | 'ST-03'
  | 'ST-04'
  | 'ST-05'
  | 'ST-06'
  | 'ST-07'
  | 'ST-08';

export type FlowLayerMode = 'MATERIAL' | 'INFORMATION' | 'COMBINED';

export type CameraMode = 'FIRST_PERSON' | 'THIRD_PERSON' | 'OVERVIEW';

export type ReverseLoopId = 'LOOP_A_CRATES' | 'LOOP_B_BAGS';

export type RouteKind =
  | 'FORWARD_STRAWBERRY'
  | 'RETURN_EMPTY_CRATES'
  | 'RETURN_BLACK_BAG'
  | 'DIGITAL_ERP';

export type ICBOXVariant =
  | 'closed'
  | 'open'
  | 'empty'
  | 'strawberries'
  | 'secured'
  | 'handling'
  | 'returned'
  | 'quarantine';

export type DeliveryBagVariant = 'closed' | 'open_strawberries' | 'empty_return';

export type NavTabId =
  | 'JOURNEY'
  | 'INFORMATION_FLOW'
  | 'EXCEPTIONS'
  | 'DATA_ARCHITECTURE';

export type FieldCategory =
  | 'SOURCE_DEFINED'
  | 'PROPOSED_DEVELOPMENT'
  | 'DERIVED_METRIC';

export type SystemOwnership =
  | 'ERP (Receiving & WMS)'
  | 'ERP (Transport & TMS)'
  | 'ERP (Inventory Ledger)'
  | 'ERP (Order Fulfilment)'
  | 'ERP (Finance & Billing)'
  | 'CRM (Orders & Customers)'
  | 'CRM (Complaints & Returns)'
  | 'Shared ERP ↔ CRM';

export interface SelectedWorldObject {
  id: string;
  label: string;
  category: 'STRAWBERRIES' | 'EMPTY_CRATES' | 'BLACK_BAG' | 'ICBOX' | 'VEHICLE' | 'STATION';
  stationId: StationId;
  summary: string;
  recordRef: string;
}

export interface ErpCrmEventField {
  id: string;
  stationId: StationId;
  eventName: string;
  eventTrigger: string;
  fieldName: string;
  fieldKey: string;
  dataType: string;
  requiredStatus: 'Required' | 'Optional' | 'Conditional';
  captureMethod: string;
  systemOwnership: SystemOwnership;
  relatedEntity: string;
  analyticalPurpose: string;
  validationRules: string;
  category: FieldCategory;
  sourceNote: string;
}

export interface ExceptionBranch {
  id: string;
  stationId: StationId;
  title: string;
  severity: 'WARNING' | 'CRITICAL';
  trigger: string;
  affectedEntity: string;
  dataToCapture: string[];
  responsibleRole: string;
  currentProcessStatus: string;
  requiredDecision: string;
  decisionDefinedInSource: boolean;
  processDecisionNote: string;
  resolutionRecord: string;
  anchor3DOffset: [number, number, number];
}

export interface OperationalStation {
  id: StationId;
  number: string;
  title: string;
  shortTitle: string;
  zoneLabel: string;
  isDigitalStation?: boolean;
  custodyBanner?: string;
  position3D: [number, number, number];
  cameraPos3D: [number, number, number];
  cameraLookAt3D: [number, number, number];
  explorerWaypoint3D?: [number, number, number];
  explorerLookAt3D?: [number, number, number];
  firstPersonSpawn3D?: [number, number, number];
  firstPersonLookAt3D?: [number, number, number];
  heroCloseUpPos3D?: [number, number, number];
  heroCloseUpTarget3D?: [number, number, number];
  summary: string;
  visualAssetsList: string[];
  materialMovement: {
    inputs: string[];
    actions: string[];
    outputs: string[];
    assetsInvolved: string[];
  };
  informationFlowSummary: {
    primaryEntityId: string;
    erpEvents: string[];
    crmEvents: string[];
    scanAnchors: string[];
  };
  operationalRoles: {
    role: string;
    responsibility: string;
    status: 'Confirmed Concept' | 'Proposed Role — Validation Required';
  }[];
  keyDataShown: {
    label: string;
    sampleValue: string;
    category: FieldCategory;
    note?: string;
  }[];
  analysisOpportunities: {
    metricName: string;
    formula: string;
    decisionValue: string;
  }[];
  unresolvedDecisions: string[];
}

export interface JourneySubStep {
  id: string;
  index: number;
  stationId: StationId;
  title: string;
  description: string;
  physicalAction: string;
  digitalEvent: string;
  progressStart: number;
  progressEnd: number;
  focusCameraPos: [number, number, number];
  focusTarget: [number, number, number];
  reverseLoop?: ReverseLoopId;
  cinematicCloseUp?: boolean;
}

export interface MaterialFlowSegment {
  id: string;
  fromStation: StationId;
  toStation: StationId;
  label: string;
  assetType: string;
  routeKind: RouteKind;
  points3D: [number, number, number][];
  isReverseLoop?: boolean;
  reverseLoopId?: ReverseLoopId;
  isDigitalOnly?: boolean;
}

export interface DataEntityNode {
  id: string;
  entityName: string;
  identifierPrefix: string;
  ownerSystem: SystemOwnership;
  stationId: StationId;
  parentEntityIds: string[];
  childEntityIds: string[];
  coreAttributes: string[];
  analyticalOutputs: string[];
  guardrailNote?: string;
}
