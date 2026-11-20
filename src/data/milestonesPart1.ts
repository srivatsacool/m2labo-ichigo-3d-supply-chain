import { MilestoneData } from '../types/blueprint';

export const MILESTONES_PART_1: MilestoneData[] = [
  {
    id: 'M01',
    number: '01',
    code: 'M01-DEM',
    title: 'Demand Planning & Customer Orders',
    shortTitle: 'Demand Planning',
    facilityZone: 'M2Labo Central Commercial & Planning Desk (Mumbai Launch Hub)',
    primaryOwner: 'Central Demand Planner (Proposed)',
    stationTelemetry: {
      targetTemp: 'Digital / Pre-Harvest',
      cycleWindow: 'Weekly + 3–7 Day Rolling',
      qrAnchor: 'DEM-ID → HARV-INST-ID',
      keyOutput: '1 Consolidated Harvest Instruction',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8',
      validationOwner: 'M2Labo Commercial & Operations Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Baseline process architecture captured from Master Build Brief.' },
      ],
    },
    sec01_processOverview:
      'Consolidates confirmed, recurring and estimated demand across four planned sales channels (Direct B2B, Website/E-Commerce, Distributors/Sales Partners, Online Marketplaces) for five premium customer segments, translating them into a single grade-wise and quantity-wise harvest instruction for HiMedia.',
    sec02_purposeAndImportance:
      'Prevents fragmented farm orders, aligns scarce perishable harvest supply with high-priority Mumbai hospitality and D2C commitments, and enables structured shortfall allocation when HiMedia harvest yield falls below forecast.',
    sec03_entryConditions: [
      'Weekly demand planning window opens (3–7 days advance horizon) with daily adjustment cut-off.',
      'Customer segments onboarded across Hotels/Hospitality, Fine-Dining Chefs, Patisseries/Bakeries, Premium Fruit Retailers and D2C Households.',
      'Prior day HiMedia readiness & crop forecast update received.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Confirmed B2B & D2C Orders', spec: 'Grade (2L/L/M/S), punnet count (250 g base), delivery window', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Recurring Standing Commitments', spec: 'Hotel/patisserie recurring schedules', status: 'SOURCE DOCUMENT PROPOSAL' },
      { item: 'Estimated Future Demand', spec: '3–7 day rolling market forecast', status: 'SOURCE DOCUMENT PROPOSAL' },
      { item: 'HiMedia Harvest Availability Update', spec: 'Independent farm estimate based on crop readiness', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Central Order Consolidator Sheet / ERP Module', purpose: 'Aggregates all 4 sales channels into one grade-wise view', status: 'PROPOSED DESIGN' },
      { name: 'Shortfall Priority Allocation Matrix', purpose: 'Scores orders on time, segment, profitability and SLA', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec06_workerActivities: [
      {
        id: 'M01-ACT-1',
        title: 'Channel Demand Aggregation',
        whoPerforms: 'Channel Sales Coordinators & Central Demand Planner (Proposed)',
        whatTheyDo: 'Collect confirmed orders, recurring commitments and 3–7 day demand estimates from Direct B2B, Website, Distributors and Marketplaces into the central consolidator.',
        equipmentUsed: 'Central Order Consolidator workspace & CRM order feed (Proposed)',
        whatToInspect: 'Duplicate entries, ambiguous grade requests (2L/L/M/S), impossible same-day delivery promises.',
        whatToRecord: 'Demand ID, channel source, customer segment, grade-wise kg, requested delivery date.',
        ifItFails: 'Hold ambiguous order; contact channel owner before daily consolidation freeze.',
        whoApprovesNext: 'Central Demand Planner / Commercial Lead (Unconfirmed final authority)',
        whatIsHandedOver: 'Consolidated Demand Pool ready for farm feasibility comparison.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M01-ACT-2',
        title: 'Shortfall Allocation & Harvest Instruction Issue',
        whoPerforms: 'Central Demand Planner & Operations Lead (Proposed)',
        whatTheyDo: 'Compare consolidated demand against HiMedia independently confirmed harvest availability; if short, allocate supply by order time, category, profitability and commitment; issue one consolidated harvest instruction.',
        equipmentUsed: 'Allocation Scorecard (Weighting Unknown) & Dispatch Messaging Template',
        whatToInspect: 'Total requested kg vs HiMedia confirmed kg across grades 2L, L, M, S.',
        whatToRecord: 'Harvest Instruction ID, grade-wise kg target, shortfall allocation rationale.',
        ifItFails: 'Escalate to Commercial Head to negotiate partial splits, grade substitutions or delayed delivery dates.',
        whoApprovesNext: 'Commercial & Operations Lead (Proposed)',
        whatIsHandedOver: 'Single Consolidated Grade-Wise & Quantity-Wise Harvest Instruction to HiMedia Farm.',
        status: 'SOURCE DOCUMENT PROPOSAL',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '1.1', action: 'Ingest orders from Direct B2B, Website/E-Commerce, Distributors & Online Marketplaces.', owner: 'Channel Teams', gateType: 'ACTION', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '1.2', action: 'Update 3–7 day weekly rolling forecast with daily demand adjustments.', owner: 'Central Demand Planner', gateType: 'ACTION', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '1.3', action: 'Receive HiMedia independent crop harvest quantity capacity.', owner: 'HiMedia Farm Lead', gateType: 'HANDOVER', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '1.4', action: 'Check Supply >= Demand? If short, execute priority allocation across 4 criteria.', owner: 'Operations & Commercial', gateType: 'DECISION', status: 'UNKNOWN / NEEDS VERIFICATION', note: 'Exact priority weighting is not yet defined.' },
      { stepNo: '1.5', action: 'Generate & transmit ONE consolidated grade-wise & quantity-wise Harvest Instruction ID.', owner: 'Central Demand Planner', gateType: 'HANDOVER', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec08_supervisorResponsibilities: [
      'Enforce daily order cut-off discipline across all 4 sales channels so HiMedia never receives conflicting requests.',
      'Review shortfall allocation decisions when HiMedia supply is lower than booked orders.',
      'Verify commercial commitments match Mumbai Andheri MIDC hub cold-room capacity.',
    ],
    sec09_qcResponsibilities: [
      'Confirm customer grade expectations (2L/L/M/S) align with current farm crop grade mix.',
      'Flag shelf-life sensitivity for distant hospitality vs local D2C orders.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Demand ID & Consolidated Demand Register', format: 'Unique ID + Channel Breakdown JSON/Table', status: 'PROPOSED DESIGN' },
      { field: 'Harvest Instruction ID', format: 'Grade-wise kg (2L, L, M, S) + B2B/B2C split', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { field: 'Shortfall Allocation Weighting Formula', format: 'Policy matrix (currently undefined)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Digital Parent ID Creation', idLevel: 'Demand ID → Harvest Instruction ID', direction: 'Generated centrally before farm harvest begins; no physical scan yet.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M01-1',
        gateTitle: 'Supply-to-Demand Balance & Shortfall Allocation Gate',
        question: 'Does HiMedia confirmed harvest availability cover 100% of consolidated demand by grade?',
        branches: [
          { condition: 'Supply >= Demand across all grades', outcome: 'PASS', nextStep: 'Issue single consolidated Harvest Instruction directly to HiMedia.', owner: 'Central Demand Planner', status: 'PROPOSED DESIGN' },
          { condition: 'Supply < Demand (Shortfall)', outcome: 'ESCALATE', nextStep: 'Apply 4-factor prioritization (order time, category, profitability, delivery commitment) & notify impacted customers.', owner: 'Commercial Lead (Weighting Unknown)', status: 'UNKNOWN / NEEDS VERIFICATION' },
          { condition: 'Grade mismatch (e.g., 2L short, L surplus)', outcome: 'REWORK', nextStep: 'Offer grade substitution to B2B/D2C accounts or adjust B2C/B2B mix.', owner: 'Channel Sales Lead', status: 'PROPOSED DESIGN' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Single Farm Instruction', criterion: 'Exactly one consolidated grade-wise & quantity-wise harvest instruction transmitted per cycle', sampling: '100% of harvest cycles', failureAction: 'Block duplicate farm messages; reconcile centrally', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { parameter: 'Shortfall Allocation Weighting', criterion: 'Exact numerical weights across 4 factors', sampling: 'Every shortfall event', failureAction: 'Manual Commercial Lead sign-off required', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Conflicting channel orders sent directly to farm', trigger: 'Bypassing central consolidator', impact: 'Over-harvesting or wrong grade packing', status: 'PROPOSED DESIGN' },
      { mode: 'HiMedia supplies 30% less than forecast (SCN-01)', trigger: 'Weather/crop readiness drop', impact: 'Unfulfilled tier-1 hospitality or D2C orders', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Hard rule: HiMedia acts ONLY on the single Central Harvest Instruction ID.',
      'Maintain 3–7 day rolling visibility window shared with HiMedia agronomy team.',
    ],
    sec16_correctiveActions: [
      'Freeze new same-day marketplace/D2C slots immediately upon shortfall notice.',
      'Issue proactive customer reschedule or grade-substitution notice prior to dispatch.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Daily demand change >10% after cut-off', notifyRole: 'Central Demand Planner', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Adjust non-committed buffer', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Supply shortfall impacting Tier-1 Hospitality', notifyRole: 'M2Labo Commercial & Ops Lead', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Approve allocation override & customer comms', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M01-CHK-1', phase: 'BEFORE', instruction: 'Confirm all 4 channels (Direct B2B, Website, Distributors, Marketplaces) submitted orders prior to cut-off.', required: true, assignedRole: 'Demand Planner', supervisorRole: 'Commercial Lead', status: 'PROPOSED DESIGN' },
      { id: 'M01-CHK-2', phase: 'DURING', instruction: 'Reconcile customer grades (2L/L/M/S) and B2B vs B2C pack counts against HiMedia supply estimate.', required: true, assignedRole: 'Demand Planner', supervisorRole: 'Commercial Lead', mandatoryReadingLabel: 'Total Consolidated Demand', mandatoryReadingUnit: 'kg', status: 'PROPOSED DESIGN' },
      { id: 'M01-CHK-3', phase: 'AFTER', instruction: 'Verify single Harvest Instruction ID is acknowledged by HiMedia Farm Supervisor.', required: true, assignedRole: 'Demand Planner', supervisorRole: 'Operations Lead', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M01-SUP-1', check: 'Audit shortfall allocation rationale if confirmed supply < demand.', signOffCriteria: 'Zero unapproved Tier-1 SLA breaches', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { id: 'M01-SUP-2', check: 'Confirm only ONE consolidated instruction was issued to HiMedia.', signOffCriteria: 'Single Harvest Instruction ID logged', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'M2Labo Central Demand Consolidator',
      toRole: 'HiMedia Farm Supervisor (M02)',
      physicalItem: 'None (Digital planning handover)',
      digitalRecord: 'Harvest Instruction ID with grade-wise kg & B2B/B2C pack targets',
      acknowledgement: 'HiMedia receipt confirmation logged before M02 crop inspection',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Consolidated Demand Register (4 channels, 5 segments)',
      'Single Grade-Wise & Quantity-Wise Harvest Instruction (HARV-INST-ID)',
      'Shortfall Allocation Decision Log (when applicable)',
    ],
    sec22_dependencies: {
      upstream: ['Historical order patterns', 'Customer SLA agreements', 'HiMedia 3–7 day crop estimate'],
      downstream: ['M02 Farm Readiness Inspection', 'M05 Packaging Split (B2B vs B2C)', 'M08 Order Allocation'],
      crossCutting: ['Launch geography: Pan-India starting with Mumbai / Andheri MIDC'],
    },
    sec23_kpis: [
      { id: 'M01-K1', name: 'Demand Forecast Accuracy', formula: '1 - |Actual Confirmed Demand - 3-Day Forecast| / Actual', unit: '%', dataSource: 'Order Consolidator', frequency: 'Weekly', owner: 'Central Demand Planner', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M01-K2', name: 'Demand-to-Supply Fill Rate', formula: 'Confirmed Harvest Allocated kg / Requested Customer kg', unit: '%', dataSource: 'M01/M02 Logs', frequency: 'Per Harvest', owner: 'Commercial Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Formalize mathematical weighting across order time, customer tier, margin and SLA.',
      'Automate API order ingestion from website e-commerce and marketplace portals.',
    ],
    sec25_openQuestions: ['OQ-01: Demand planning ownership & cut-off', 'OQ-02: Shortfall allocation priority weights'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (p. 3, p. 8)', excerpt: 'Demand-generation not yet established; 4 channels feed central consolidator; HiMedia independently determines actual harvest quantity.', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
  },
  {
    id: 'M02',
    number: '02',
    code: 'M02-FRM',
    title: 'Farm Readiness & Crop Inspection',
    shortTitle: 'Farm Readiness',
    facilityZone: 'HiMedia Greenhouse Bays',
    primaryOwner: 'HiMedia Farm Supervisor & QC Person (Proposed Pairing)',
    has3DContext: 'farm',
    stationTelemetry: {
      targetTemp: 'Greenhouse Ambient',
      cycleWindow: '~4 Harvests / Week (Prop.)',
      qrAnchor: 'HARV-INST-ID → BAY-MAP',
      keyOutput: 'Daily Readiness Report + Photos',
    },
    governance: {
      status: 'SOURCE DOCUMENT PROPOSAL',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8',
      validationOwner: 'HiMedia Farm Operations Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'HYBRID',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Inspection parameters and HiMedia role pairing documented; thresholds marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Physical pre-harvest inspection of HiMedia greenhouse bays by the Farm Supervisor and QC Person (proposed pairing) to evaluate strawberry maturity, grade mix, Brix, defects and growing conditions, producing photographic readiness updates and a daily readiness report.',
    sec02_purposeAndImportance:
      'Ensures only genuinely ripe, undamaged ICHIGO® berries are cleared for picking while unready fruit remains on the plant for subsequent passes (~4 harvests/week proposed), giving M2Labo realistic supply visibility before harvest dispatch.',
    sec03_entryConditions: [
      'Consolidated Harvest Instruction (HARV-INST-ID) received from M01.',
      'Scheduled pre-harvest inspection window prior to picking pass.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Harvest Instruction (HARV-INST-ID)', spec: 'Target grade mix & quantity', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Greenhouse Crop Rows', spec: 'HiMedia strawberry plants across active bays', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Refractometer (Brix testing)', purpose: 'Check strawberry sweetness/Brix (exact cutoff UNKNOWN)', status: 'SOURCE DOCUMENT PROPOSAL' },
      { name: 'Digital Camera / Mobile Tablet', purpose: 'Capture photographic readiness updates for M2Labo', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { name: 'Thermometer / Greenhouse Environmental Sensor', purpose: 'Record fruit/bay temperature & growing conditions', status: 'SOURCE DOCUMENT PROPOSAL' },
      { name: 'Sizing Ring / Gauge', purpose: 'Estimate anticipated 2L/L/M/S grade split (limits UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec06_workerActivities: [
      {
        id: 'M02-ACT-1',
        title: 'Physical Bay Walkthrough & Readiness Sampling',
        whoPerforms: 'HiMedia Farm Supervisor & QC Person (Proposed role pairing)',
        whatTheyDo: 'Walk active greenhouse rows, inspect colour/maturity, size/grade, physical damage, bruising/disease, sweetness/Brix, temperature and growing conditions; tag bays ready vs unready.',
        equipmentUsed: 'Refractometer, inspection tablet, thermometer, sizing ring',
        whatToInspect: 'Colour & maturity, size/grade potential, physical damage, bruising & disease, Brix, ambient/berry temperature, growing conditions.',
        whatToRecord: 'Estimated harvestable kg, estimated 2L/L/M/S mix, Brix readings, bay condition photos.',
        ifItFails: 'Do NOT clear unready bays; leave unready fruit on plant for subsequent inspection and alert M2Labo of expected shortfall.',
        whoApprovesNext: 'HiMedia Farm Supervisor + QC Person (Actual role validation needed)',
        whatIsHandedOver: 'Daily Readiness Report + Photographic Evidence + Confirmed Harvestable Bay List.',
        status: 'SOURCE DOCUMENT PROPOSAL',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '2.1', action: 'Review M01 Harvest Instruction target grades & quantities.', owner: 'HiMedia Farm Supervisor', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '2.2', action: 'Conduct 7-point physical crop inspection (colour, size, damage, bruising/disease, Brix, temp, growing conditions).', owner: 'Farm Supervisor + QC Person', gateType: 'QC_GATE', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '2.3', action: 'Mark ready plants/zones; confirm unready fruit remains on plant.', owner: 'QC Person', gateType: 'DECISION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '2.4', action: 'Capture photographic readiness updates & compile Daily Readiness Report with estimated qty/grade mix.', owner: 'Farm Supervisor', gateType: 'HANDOVER', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec08_supervisorResponsibilities: [
      'Coordinate pre-harvest walkthrough prior to every harvest pass (~4 times/week alternate-day direction).',
      'Sign off estimated harvestable volume and communicate deviations promptly to M2Labo Central Demand Planner.',
    ],
    sec09_qcResponsibilities: [
      'Perform Brix, disease/pest and bruising spot checks across greenhouse rows.',
      'Prevent premature picking of under-coloured or immature berries.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Daily Readiness Report', format: 'Estimated total kg + 2L/L/M/S grade forecast', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { field: 'Photographic Readiness Updates', format: 'Timestamped greenhouse row & berry photos', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { field: '7-Point Inspection Log', format: 'Colour, size, defects, Brix, temp, growing conditions', status: 'SOURCE DOCUMENT PROPOSAL' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Bay-to-Instruction Mapping', idLevel: 'HARV-INST-ID linked to Bay/Zone IDs', direction: 'Digital tag binding planned harvest zone to M01 instruction.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M02-1',
        gateTitle: 'Crop Maturity & Readiness Release Gate',
        question: 'Does the inspected crop zone meet readiness criteria without active disease or heat stress?',
        branches: [
          { condition: 'Ready berries confirmed in target zone', outcome: 'PASS', nextStep: 'Release bay to M03 Selective Robot-Assisted Harvesting.', owner: 'Farm Supervisor + QC', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Crop immature / colour insufficient (SCN-02)', outcome: 'HOLD', nextStep: 'Leave unready fruit on plant; reschedule to next alternate-day inspection; notify M2Labo.', owner: 'Farm Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Localized disease/mould or pest pocket', outcome: 'REJECT', nextStep: 'Quarantine affected rows from harvest pass; log agronomy intervention.', owner: 'QC Person', status: 'PROPOSED DESIGN' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Colour / Maturity %', criterion: 'UNKNOWN / NEEDS VERIFICATION (awaiting cultivar chart)', sampling: 'Per bay walkthrough', failureAction: 'Leave unready berries on plant', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Sweetness (Brix)', criterion: 'UNKNOWN / NEEDS VERIFICATION (no invented Brix floor)', sampling: 'Representative sample', failureAction: 'Hold harvest or flag to M2Labo', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Disease / Bruising', criterion: 'Zero visible mould or soft rot cleared for harvest', sampling: 'Visual bay scan', failureAction: 'Isolate diseased plants; exclude from harvest', status: 'PROPOSED DESIGN' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Crop maturity delayed (SCN-02)', trigger: 'Low sunlight / greenhouse temperature variance', impact: 'Harvest shortfall against M01 demand instruction', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Unready berries accidentally cleared for harvest', trigger: 'Rushed visual inspection without QC verification', impact: 'Robot/crew picks sour fruit leading to high packhouse rejection', status: 'PROPOSED DESIGN' },
    ],
    sec15_preventiveControls: [
      'Joint Farm Supervisor + QC walkthrough checklist before every harvest shift.',
      'Visual maturity reference cards placed at greenhouse bay entrances.',
    ],
    sec16_correctiveActions: [
      'Adjust harvest cadence around the ~4 harvests/week direction based on actual readiness.',
      'Trigger immediate M01 shortfall reallocation if readiness report is >15% below instruction.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Estimated readiness 10–20% below Harvest Instruction', notifyRole: 'M2Labo Central Demand Planner', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Rebalance channel allocation', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Disease outbreak or >25% crop delay', notifyRole: 'HiMedia Lead & M2Labo Operations Head', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Suspend bays / emergency sourcing review', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M02-CHK-1', phase: 'BEFORE', instruction: 'Calibrate refractometer and inspect greenhouse bay temperature/humidity logs.', required: true, assignedRole: 'QC Person', supervisorRole: 'Farm Supervisor', mandatoryReadingLabel: 'Bay Ambient Temp', mandatoryReadingUnit: '°C', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M02-CHK-2', phase: 'DURING', instruction: 'Inspect colour, size, physical damage, bruising/disease, Brix and growing conditions across rows.', required: true, assignedRole: 'Farm Supervisor + QC', supervisorRole: 'HiMedia Farm Lead', evidenceRequired: true, status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M02-CHK-3', phase: 'AFTER', instruction: 'Upload photographic readiness update and submit Daily Readiness Report with grade estimates.', required: true, assignedRole: 'Farm Supervisor', supervisorRole: 'M2Labo Ops Lead', evidenceRequired: true, status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M02-SUP-1', check: 'Verify unready bays are clearly excluded so selective harvest skips immature berries.', signOffCriteria: 'Zone tags & readiness map verified', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M02-SUP-2', check: 'Confirm photographic readiness report reached M2Labo before picking starts.', signOffCriteria: 'Timestamped submission logged', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'HiMedia Farm Supervisor & QC Person',
      toRole: 'HiMedia Harvest Automation & Crew Lead (M03) + M2Labo Planner',
      physicalItem: 'Physically tagged/cleared greenhouse bays (unready fruit left on plant)',
      digitalRecord: 'Daily Readiness Report + Photographic Updates + Estimated Qty/Grade Mix',
      acknowledgement: 'M03 Harvest Shift Start Sign-off',
      status: 'CONFIRMED IN PROJECT DISCUSSION',
    },
    sec21_outputs: [
      'Daily Readiness Report',
      'Photographic Readiness Updates',
      'Estimated Quantity & 2L/L/M/S Grade Mix',
      'Cleared Greenhouse Bay Harvest Map',
    ],
    sec22_dependencies: {
      upstream: ['M01 Consolidated Harvest Instruction'],
      downstream: ['M03 Robot-Assisted Harvesting', 'M01 Dynamic Shortfall Adjustment'],
      crossCutting: ['Cultivar maturity rules (OQ-05)', 'HiMedia role confirmation (OQ-03)'],
    },
    sec23_kpis: [
      { id: 'M02-K1', name: 'Readiness Estimate Accuracy', formula: '1 - |Actual Harvest kg - Readiness Report Estimate kg| / Estimate kg', unit: '%', dataSource: 'M02 Report vs M03 Batch Weight', frequency: 'Per Harvest', owner: 'HiMedia Farm Supervisor', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Define quantitative Brix and RGB/colour maturity thresholds per ICHIGO® cultivar.',
      'Standardize photo angles and lighting cards for objective readiness comparison.',
    ],
    sec25_openQuestions: ['OQ-03: Confirmed HiMedia role titles', 'OQ-05: Crop maturity & Brix limits', 'OQ-06: Fixed vs dynamic 4x/week frequency'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (p. 3, p. 8)', excerpt: 'HiMedia coordination, physical inspection, photo readiness updates, daily report, 7 inspection factors, ~4 harvests weekly direction.', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
  },
  {
    id: 'M03',
    number: '03',
    code: 'M03-HRV',
    title: 'Robot-Assisted Harvesting',
    shortTitle: 'Robot Harvesting',
    facilityZone: 'HiMedia Active Greenhouse Rows',
    primaryOwner: 'HiMedia Harvest Robot Operator & Human Supervisor (Unconfirmed Detail)',
    has3DContext: 'farm',
    stationTelemetry: {
      targetTemp: 'Field Ambient (Pre-Cool)',
      cycleWindow: 'Early Morning Harvest Window',
      qrAnchor: 'FB-HM-BATCH-ID',
      keyOutput: 'Tagged Temp Containers + Batch ID',
    },
    governance: {
      status: 'UNKNOWN / NEEDS VERIFICATION',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8',
      validationOwner: 'HiMedia Agri-Tech / Robotics Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Unresolved',
      processState: 'CURRENT',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Explicitly marks robot mechanism & collection method as UNKNOWN; avoids claiming complete autonomy.' },
      ],
    },
    sec01_processOverview:
      'Selective harvesting of ready strawberries using AI-assisted fruit identification and robotic picking under continuous human supervision. Fruit is collected into temporary harvest containers tagged with a Farm Batch ID for rapid transfer to blast cooling.',
    sec02_purposeAndImportance:
      'Executes selective picking without damaging delicate berry skins or picking unready fruit, while establishing the first physical Batch ID anchor in the digital traceability chain.',
    sec03_entryConditions: [
      'M02 Daily Readiness Report & cleared greenhouse bays confirmed.',
      'Harvest robot pre-shift calibration, sanitation & battery checks passed.',
      'Clean temporary harvest containers staged with blank/pre-printed Batch ID tags.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Cleared Ready Strawberry Rows', spec: 'Only mature berries targeted; unready berries stay on plant', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Temporary Harvest Containers', spec: 'Exact container capacity & liner spec UNKNOWN', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'AI-Assisted Harvesting Robot (Semi-Automated)', purpose: 'AI fruit identification & robotic picking (exact vendor/gripper UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { name: 'Temporary Harvest Containers', purpose: 'Receive picked berries before blast cooling', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { name: 'Batch ID Tags / Mobile Scanner', purpose: 'Bind greenhouse zone & harvest time to Farm Batch ID', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M03-ACT-1',
        title: 'Robot Setup, AI Supervision & Container Handling',
        whoPerforms: 'Human Harvest Supervisor & Field Workers (HiMedia)',
        whatTheyDo: 'Position AI-assisted robot along cleared rows, monitor fruit identification & picking quality in real time, swap filled temporary harvest containers, and attach Farm Batch ID tags.',
        equipmentUsed: 'Semi-automated harvesting robot (spec unknown), temporary harvest containers, batch labels',
        whatToInspect: 'Robot cutting/gripping precision, false-positive picking of green/immature berries, berry bruising, container fill height.',
        whatToRecord: 'Farm Batch ID, greenhouse bay IDs, harvest start/end time, container count, robot fault/intervention log.',
        ifItFails: 'Pause robot immediately on misidentification or mechanical fault; isolate suspect container and switch to supervised manual selective picking if needed.',
        whoApprovesNext: 'HiMedia Harvest Supervisor',
        whatIsHandedOver: 'Tagged temporary harvest containers transferred immediately toward M04 Blast Cooling.',
        status: 'UNKNOWN / NEEDS VERIFICATION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '3.1', action: 'Verify robot vision calibration & sanitize end-effector before row entry (exact mechanism UNKNOWN).', owner: 'Robot Operator / Tech', gateType: 'ACTION', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { stepNo: '3.2', action: 'Run AI-assisted identification & robotic picking under continuous human supervision.', owner: 'Robot + Human Supervisor', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '3.3', action: 'Verify selective harvest accuracy: unready berries stay on plant; no crushed fruit in containers.', owner: 'Human Field Worker / QC', gateType: 'QC_GATE', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '3.4', action: 'Assign Farm Batch ID to temporary harvest containers & log gross weight/count.', owner: 'Harvest Crew Lead', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Maintain continuous human supervision over semi-automated robotic picking (never operate unattended).',
      'Authorize immediate switch to manual selective harvest backup if robot malfunctions.',
      'Prevent sun/heat exposure of filled containers by enforcing rapid dispatch to M04 Blast Cooling.',
    ],
    sec09_qcResponsibilities: [
      'Audit temporary harvest containers for immature berries, stem tears or mechanical grip bruising.',
      'Verify damaged/overripe fruit is never mixed into prime harvest containers.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Farm Batch ID (FB-HM-YYYYMMDD-X)', format: 'Links back to Harvest Instruction ID', status: 'PROPOSED DESIGN' },
      { field: 'Robot Telemetry / Fault Log', format: 'Hours active, fault codes, manual intervention count (Proposed)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Batch Birth Scan', idLevel: 'HARV-INST-ID → FB-BATCH-ID', direction: 'Links temporary container batch labels to the central Harvest Instruction.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M03-1',
        gateTitle: 'Robot Picking Quality & Fault Gate',
        question: 'Is the robot accurately picking only mature fruit without bruising or mechanical stall?',
        branches: [
          { condition: 'Picking clean, zero immature fruit or stem damage', outcome: 'PASS', nextStep: 'Continue semi-automated pass & batch-tag filled containers.', owner: 'Human Supervisor', status: 'PROPOSED DESIGN' },
          { condition: 'AI misidentifying immature berries (SCN-04)', outcome: 'HOLD', nextStep: 'Halt row pass, segregate affected container for manual sort, recalibrate vision threshold.', owner: 'Harvest Supervisor + QC', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'Robot mechanical/power failure (SCN-03)', outcome: 'ESCALATE', nextStep: 'Log robot downtime, deploy standby manual selective harvest crew, alert HiMedia tech.', owner: 'Farm Supervisor', status: 'ILLUSTRATIVE SIMULATION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Immature Fruit Picked %', criterion: 'UNKNOWN / NEEDS VERIFICATION (awaiting tolerance definition)', sampling: 'Periodic container visual audit', failureAction: 'Pause robot; remove green berries manually', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Mechanical Bruising Rate', criterion: 'UNKNOWN / NEEDS VERIFICATION', sampling: 'Container surface & bottom check', failureAction: 'Inspect robot gripper & container cushion', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Robot fails mid-harvest (SCN-03)', trigger: 'Actuator/sensor/battery fault', impact: 'Delayed field heat removal & missed linehaul window', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'AI picks immature berries (SCN-04)', trigger: 'Lighting glare or vision model drift', impact: 'Waste of fruit + extra grading labour', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Pre-shift vision test on colour calibration card before starting greenhouse rows.',
      'Standby manual picking crates and trained workers kept on standby.',
    ],
    sec16_correctiveActions: [
      'Segregate containers harvested during a vision/gripper fault from standard batches.',
      'Dispatch filled containers to M04 Blast Cooling in rolling sub-batches rather than waiting for full shift end.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Minor gripper jam or single-row pause', notifyRole: 'HiMedia Robot Operator', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Reset & inspect end-effector', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Robot outage >30 mins threatening cooling/transport schedule', notifyRole: 'HiMedia Farm Lead & M2Labo Ops', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Activate full manual harvest contingency', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M03-CHK-1', phase: 'BEFORE', instruction: 'Confirm bay clearance from M02 and verify clean, tagged temporary harvest containers.', required: true, assignedRole: 'Harvest Crew', supervisorRole: 'Harvest Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M03-CHK-2', phase: 'DURING', instruction: 'Monitor AI robot picking accuracy continuously; ensure unready berries stay on plant.', required: true, assignedRole: 'Robot Monitor', supervisorRole: 'Harvest Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M03-CHK-3', phase: 'AFTER', instruction: 'Bind Farm Batch ID QR/tag to each temporary container and log container count.', required: true, assignedRole: 'Harvest Crew Lead', supervisorRole: 'Harvest Supervisor', qrRequired: true, status: 'PROPOSED DESIGN' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M03-SUP-1', check: 'Verify robot maintenance/calibration log & human supervision presence.', signOffCriteria: 'Zero unsupervised robot operation', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M03-SUP-2', check: 'Confirm elapsed time from pick to blast-cooler arrival is minimized.', signOffCriteria: 'Timestamp handoff logged', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'HiMedia Harvest Crew & Supervisor',
      toRole: 'Farm Blast Cooling Operator (M04)',
      physicalItem: 'Filled temporary harvest containers (never over-stacked)',
      digitalRecord: 'Farm Batch ID + container count + field harvest timestamp',
      acknowledgement: 'Cooler intake scan & timestamp',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Harvested berries in temporary harvest containers',
      'Farm Batch ID (FB-BATCH-ID) birth record',
      'Robot performance & exception log',
    ],
    sec22_dependencies: {
      upstream: ['M02 Cleared Bays & Readiness Report'],
      downstream: ['M04 Blast Cooling & Temperature Control'],
      crossCutting: ['Discrepancy DSC-01: Automatic vs AI-assisted semi-automated robot details (OQ-04)'],
    },
    sec23_kpis: [
      { id: 'M03-K1', name: 'Robot Uptime %', formula: 'Productive Robot Hours / Scheduled Harvest Hours × 100', unit: '%', dataSource: 'Robot Log', frequency: 'Per Shift', owner: 'HiMedia Tech Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M03-K2', name: 'Harvest Damage Rate', formula: 'Damaged Berries Sampled / Total Picked × 100', unit: '%', dataSource: 'QC Sample', frequency: 'Per Batch', owner: 'QC Person', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Document exact HiMedia robot hardware specs, gripper contact material and vision accuracy.',
      'Standardize cushioned temporary harvest containers to avoid compression bruising.',
    ],
    sec25_openQuestions: ['OQ-04: Robot mechanism & workflow specifications', 'OQ-08: Temporary container dimensions'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (p. 3, p. 8)', excerpt: 'AI-assisted identification, automated picking, human supervision; exact robot mechanism & container handling unknown.', status: 'UNKNOWN / NEEDS VERIFICATION', conflictNote: 'DSC-01: User noted automatic harvesting robots vs brief description of AI-assisted semi-automated operation.' },
    ],
  },
  {
    id: 'M04',
    number: '04',
    code: 'M04-CLD',
    title: 'Blast Cooling & Temperature Control',
    shortTitle: 'Blast Cooling',
    facilityZone: 'HiMedia Farm Blast Cooling Chamber',
    primaryOwner: 'Farm Cold-Room Operator & QC Person (Proposed)',
    has3DContext: 'cooler-packaging',
    stationTelemetry: {
      targetTemp: '5°C Target (User-Provided)',
      cycleWindow: '5-Hour Cycle (Pending Valid.)',
      qrAnchor: 'FB-BATCH-ID + THERMAL-LOG',
      keyOutput: '5°C Released Batch for Grading',
    },
    governance: {
      status: 'SOURCE DOCUMENT PROPOSAL',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 7, 8',
      validationOwner: 'Cold-Chain Engineering Consultant & HiMedia',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'HYBRID',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: '5-hour / 5°C parameters marked as project-owner-provided information pending technical validation; NOT freezing.' },
      ],
    },
    sec01_processOverview:
      'Rapidly removes field heat from freshly harvested strawberries inside temporary harvest containers. Uses project-owner-provided parameters of a 5-hour blast-cooling cycle targeting 5°C (strictly chilling, NEVER freezing), followed by QC/supervisor verification before batch release.',
    sec02_purposeAndImportance:
      'Field heat rapidly accelerates strawberry respiration, moisture loss and mould growth. Controlled chilling toward 5°C stabilizes berry firmness before mechanical grading and 4–5 hour transport to Mumbai.',
    sec03_entryConditions: [
      'Temporary harvest containers received from M03 with valid Farm Batch ID.',
      'Blast cooler pre-cooled and defrost/compressor health verified.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Field-Warm Strawberry Batches', spec: 'Inside temporary harvest containers with Farm Batch ID', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Temperature Probes / Loggers', spec: 'Sensor method & placement point UNKNOWN / NEEDS VERIFICATION', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Farm Blast Cooling Unit', purpose: 'Chills batch toward 5°C target over stated 5-hour cycle (NOT freezing)', status: 'SOURCE DOCUMENT PROPOSAL' },
      { name: 'Racking / Airflow Baffles', purpose: 'Ensure uniform air passage across containers (layout UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { name: 'Calibrated Temperature Logger / Probe', purpose: 'Record cooling start, trend and completion temperature', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M04-ACT-1',
        title: 'Container Loading & Cycle Initiation',
        whoPerforms: 'Farm Cold-Room Operator (Role confirmation needed)',
        whatTheyDo: 'Receive Farm Batch ID containers, load onto cooler racks preserving air channels, attach/position temperature sensor (point to be validated), close chamber and log cooling start time.',
        equipmentUsed: 'Blast cooler racks, temperature sensor/logger, batch scan device',
        whatToInspect: 'Container vent alignment, absence of crushed berries, cooler door seal and evaporator frost state.',
        whatToRecord: 'Farm Batch ID, arrival timestamp, loading zone, cooling start time, initial temperature.',
        ifItFails: 'If cooler setpoint fails to drop within initial check window, alert maintenance immediately and transfer batch to backup cold storage.',
        whoApprovesNext: 'Cooler Operator logs start; QC Person approves final release',
        whatIsHandedOver: 'Batch sealed inside active 5-hour cooling cycle.',
        status: 'SOURCE DOCUMENT PROPOSAL',
      },
      {
        id: 'M04-ACT-2',
        title: 'Cycle Monitoring & Release Verification',
        whoPerforms: 'QC Person & Farm Supervisor (Proposed)',
        whatTheyDo: 'Verify elapsed 5-hour cycle and 5°C target readout (measurement point pending validation), check for condensation or freeze-burn damage, and sign Batch Release or Hold.',
        equipmentUsed: 'Calibrated probe / chamber telemetry display',
        whatToInspect: 'Cycle completion temperature (5°C target), zero sub-zero freeze spots, berry turgidity.',
        whatToRecord: 'Completion timestamp, verified temperature, Release/Hold decision, QC signature.',
        ifItFails: 'Do NOT release warm (>target) or freeze-damaged batch to packing; hold for extended cooling or QC segregation.',
        whoApprovesNext: 'QC Person + Farm Supervisor',
        whatIsHandedOver: 'Thermally stabilized, released Farm Batch delivered directly to M05 Packhouse.',
        status: 'UNKNOWN / NEEDS VERIFICATION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '4.1', action: 'Log batch arrival from M03 & verify Farm Batch ID count.', owner: 'Cooler Operator', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '4.2', action: 'Load temporary containers into blast cooler following airflow spacing.', owner: 'Cooler Operator', gateType: 'ACTION', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { stepNo: '4.3', action: 'Initiate stated 5-hour blast-cooling cycle targeting 5°C (NOT freezing); log start temperature.', owner: 'Cooler Operator', gateType: 'ACTION', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '4.4', action: 'Monitor temperature curve across cycle; flag anomalies.', owner: 'Cooler Operator / QC', gateType: 'QC_GATE', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { stepNo: '4.5', action: 'At 5h mark, perform QC/Supervisor verification & issue Release or Hold decision.', owner: 'QC + Supervisor', gateType: 'DECISION', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec08_supervisorResponsibilities: [
      'Ensure cooling chamber is never overloaded beyond airflow capacity.',
      'Authorize contingency actions if blast cooler fails mid-cycle or misses the 5°C target at 5 hours.',
    ],
    sec09_qcResponsibilities: [
      'Verify thermal records prior to releasing any batch to M05 Sorting & Packaging.',
      'Check strictly against sub-zero overcooling/freezing damage (process is chilling, NOT freezing).',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Cooling Start & End Timestamps', format: 'Linked to Farm Batch ID', status: 'SOURCE DOCUMENT PROPOSAL' },
      { field: 'Time-Series Temperature Curve', format: 'Air vs Pulp sensor method currently UNKNOWN', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { field: 'Batch Release / Hold Certificate', format: 'QC + Supervisor digital sign-off', status: 'PROPOSED DESIGN' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Cooler Intake & Release Scan', idLevel: 'FB-BATCH-ID', direction: 'Updates batch state from FIELD_PICKED → COOLING → COOLED_RELEASED (or HELD).', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M04-1',
        gateTitle: 'Post-Cooling Thermal Release Gate',
        question: 'Has the batch achieved the project-stated 5°C target after the 5-hour cycle without freezing injury?',
        branches: [
          { condition: 'Target 5°C verified & no freeze/condensation damage', outcome: 'PASS', nextStep: 'Release Farm Batch to M05 Grading & Packaging.', owner: 'QC + Supervisor', status: 'SOURCE DOCUMENT PROPOSAL' },
          { condition: 'Temp > target at 5h mark (SCN-06)', outcome: 'HOLD', nextStep: 'Extend controlled cooling & investigate airflow/door seal; reassess shelf life.', owner: 'Cold-Room Lead + QC', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'Sub-zero ice crystal / freeze injury observed', outcome: 'REJECT', nextStep: 'Segregate damaged fruit immediately; do not enter fresh B2C/B2B flow.', owner: 'QC Person', status: 'PROPOSED DESIGN' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Cycle Duration & Target Temp', criterion: '5 hours to 5°C (Project-owner-provided parameter pending validation; strictly NOT freezing)', sampling: 'Per batch cycle', failureAction: 'Hold batch; do not pack warm berries', status: 'SOURCE DOCUMENT PROPOSAL' },
      { parameter: 'Sensor Method & Measurement Point', criterion: 'UNKNOWN / NEEDS VERIFICATION (pulp probe vs return air undefined)', sampling: 'UNKNOWN', failureAction: 'Require engineering validation trial (OQ-07)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Blast cooler mechanical/power failure mid-cycle (SCN-05)', trigger: 'Compressor trip or grid outage', impact: 'Batch stalls above 5°C, shortening shelf life', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Target 5°C not reached after 5 hours (SCN-06)', trigger: 'Overloading, blocked vents or warm initial load', impact: 'Delays M05 packing & M06 van dispatch', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Pre-cool chamber before harvest arrival.',
      'Ensure backup generator coverage and chamber door alarm.',
    ],
    sec16_correctiveActions: [
      'Re-stack tightly packed containers to restore forced-air flow if temperature lags.',
      'Tag thermally stressed batches for shorter shelf-life / value-addition monitoring.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Cooling lag at 3-hour midpoint check', notifyRole: 'Farm Supervisor & Maintenance', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Inspect coils/airflow/seals', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Equipment failure or missed target threatening M06 dispatch', notifyRole: 'HiMedia Farm Lead & M2Labo Ops', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Delay dispatch or divert stock', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M04-CHK-1', phase: 'BEFORE', instruction: 'Confirm blast cooler pre-chill state, clean evaporator drain and calibrated sensor readiness.', required: true, assignedRole: 'Cooler Operator', supervisorRole: 'Farm Supervisor', mandatoryReadingLabel: 'Chamber Pre-Cool Temp', mandatoryReadingUnit: '°C', status: 'PROPOSED DESIGN' },
      { id: 'M04-CHK-2', phase: 'DURING', instruction: 'Log batch arrival, load temporary containers cleanly, record cooling start timestamp & monitor toward 5°C (NOT freezing).', required: true, assignedRole: 'Cooler Operator', supervisorRole: 'Farm Supervisor', qrRequired: true, mandatoryReadingLabel: 'Mid-Cycle Temp', mandatoryReadingUnit: '°C', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M04-CHK-3', phase: 'AFTER', instruction: 'Record 5-hour completion temperature and obtain QC/Supervisor Release or Hold sign-off.', required: true, assignedRole: 'QC Person', supervisorRole: 'Farm Supervisor', mandatoryReadingLabel: 'Release Temp (5°C target)', mandatoryReadingUnit: '°C', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M04-SUP-1', check: 'Audit cooling curve & verify no sub-zero freeze damage occurred.', signOffCriteria: 'Confirmed 5°C chilling without freezing', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M04-SUP-2', check: 'Confirm released batch moves immediately into chilled M05 packhouse.', signOffCriteria: 'Zero warm dock staging delay', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Farm Blast Cooling Operator & QC',
      toRole: 'Farm Grading & Packaging Lead (M05)',
      physicalItem: 'Cooled temporary harvest containers at stated 5°C target',
      digitalRecord: 'Farm Batch ID + 5h Cooling Log + QC Release Stamp',
      acknowledgement: 'M05 Packhouse Intake Scan',
      status: 'SOURCE DOCUMENT PROPOSAL',
    },
    sec21_outputs: [
      'Cooled Strawberry Batch (5°C target)',
      'Temperature & Cycle Compliance Log',
      'Batch Release / Hold Decision Record',
    ],
    sec22_dependencies: {
      upstream: ['M03 Harvested Temporary Containers'],
      downstream: ['M05 Sorting, Grading, QC & Packaging'],
      crossCutting: ['DSC-02 / OQ-07: Sensor placement & release criteria validation'],
    },
    sec23_kpis: [
      { id: 'M04-K1', name: 'Time to 5°C Target', formula: 'Cooling Complete TS - Cooling Start TS', unit: 'hours', dataSource: 'Cooler Log', frequency: 'Per Batch', owner: 'Cooler Lead', target: '5 hrs (pending validation)', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M04-K2', name: 'Cooling Cycle Compliance %', formula: 'Batches Passing Gate / Total Batches × 100', unit: '%', dataSource: 'QC Release Log', frequency: 'Weekly', owner: 'QC Person', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Conduct thermal mapping study to finalize pulp-probe placement and exact release tolerances.',
      'Install automated IoT chamber logger streaming directly to Batch ID.',
    ],
    sec25_openQuestions: ['OQ-07: Cooling duration & sensor measurement point', 'OQ-08: Container airflow layout'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 7, 8)', excerpt: 'Stated 5-hour blast-cooling cycle and 5°C target labelled as user-provided info pending validation; never describe as freezing.', status: 'SOURCE DOCUMENT PROPOSAL', conflictNote: 'DSC-02: Exact sensor method, measurement point, loading pattern & release criteria remain UNKNOWN.' },
    ],
  },
  {
    id: 'M05',
    number: '05',
    code: 'M05-PKG',
    title: 'Sorting, Grading, QC & Packaging',
    shortTitle: 'Grading & Packing',
    facilityZone: 'HiMedia Farm Packhouse (Primary Location)',
    primaryOwner: 'Farm Packhouse & QC Lead (Proposed)',
    has3DContext: 'cooler-packaging',
    stationTelemetry: {
      targetTemp: 'Chilled Packhouse (~5°C)',
      cycleWindow: 'Post-Cool Same-Day Pack',
      qrAnchor: 'LOT → PUNNET → CARTON',
      keyOutput: '250g Punnets (B2C 500g / B2B)',
    },
    governance: {
      status: 'CONFIRMED IN PROJECT DISCUSSION',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8',
      validationOwner: 'M2Labo Quality & Packaging Lead',
      validationDate: 'Pending Threshold Validation',
      approvalStatus: 'Pending Validation',
      processState: 'HYBRID',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Grades 2L/L/M/S, 250g punnets, B2C black boxes (2x250g=500g carton) & B2B moulded trays confirmed; gram/mm cutoffs marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Combines automated and manual QC grading by weight and diameter into four distinct grades (2L, L, M, S). Every grade is packed separately into 250 g punnets, branching into two strictly separate packaging formats: B2C black branded boxes (2 × 250 g per 500 g carton) and B2B plastic/thin protective cavity sheets/moulds in crates/cartons.',
    sec02_purposeAndImportance:
      'Enforces visual and weight consistency demanded by luxury hotels, fine-dining chefs and D2C buyers while shielding individual berries from contact bruising using channel-specific cavity packaging.',
    sec03_entryConditions: [
      'Released cooled Farm Batch from M04.',
      'M01 Harvest Instruction allocation split (B2B vs B2C quantities by grade 2L/L/M/S).',
      'Clean packaging inventory verified (B2C black 250g boxes + 500g cartons; B2B cavity trays + crates).',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Released Cooled Strawberries', spec: 'From M04 temporary harvest containers', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'B2C Packaging', spec: 'Black branded 250g boxes w/ internal moulded cavities; 2 boxes = 500g carton (NOT EPS)', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'B2B Packaging', spec: 'Plastic/thin protective sheet or mould w/ individual berry cavities + crates/cartons', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Weight & Diameter Grading Line + Checkweigher', purpose: 'Classify 2L/L/M/S and verify 250 g punnet net weight', status: 'SOURCE DOCUMENT PROPOSAL' },
      { name: 'Manual QC Inspection Table', purpose: 'Visual sorting for defects, calyx integrity & grade purity', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { name: 'QR Label Printer & Scanner', purpose: 'Assign Grade Lot ID, Punnet ID & Carton/Crate ID', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M05-ACT-1',
        title: 'Sorting, 2L/L/M/S Grading & Defect Removal',
        whoPerforms: 'Grading Line Operators & QC Sorters',
        whatTheyDo: 'Feed cooled berries onto grading station, measure weight & diameter (automated + manual QC), separate into 2L, L, M and S streams, and divert bruised/undersized berries.',
        equipmentUsed: 'Optical/weight grader (calibration checked), sizing rings, checkweigher',
        whatToInspect: 'Size/diameter consistency, weight accuracy, bruising, cuts, rot, calyx freshness.',
        whatToRecord: 'Grade Lot IDs per 2L/L/M/S, gross input kg, graded output kg, rejected kg.',
        ifItFails: 'Stop line on calibration drift or mixed grades; re-sort affected tray manually.',
        whoApprovesNext: 'Packhouse QC Lead',
        whatIsHandedOver: 'Sorted, single-grade berry trays ready for 250 g punnet packing.',
        status: 'CONFIRMED IN PROJECT DISCUSSION',
      },
      {
        id: 'M05-ACT-2',
        title: 'Channel-Separated B2C vs B2B Packing & QR Unitization',
        whoPerforms: 'B2C & B2B Packing Operators',
        whatTheyDo: 'Pack each grade separately to 250 g net weight. For B2C: seat berries in black branded 250 g box moulded cavities and pair 2 boxes into a 500 g carton. For B2B: place berries in protective moulded cavity sheets/trays inside order crates/cartons.',
        equipmentUsed: '250 g checkweigher, B2C black boxes/500 g cartons, B2B trays/crates, QR printer',
        whatToInspect: 'Exact 250 g target net weight, zero grade mixing, cavity fitment without berry squashing, intact QR labels.',
        whatToRecord: 'Punnet IDs, 500 g Carton / B2B Crate IDs, grade label, pack timestamp.',
        ifItFails: 'Re-weigh underweight punnets; replace crushed cartons; hold mixed-grade packs.',
        whoApprovesNext: 'Packhouse Supervisor & QC Lead',
        whatIsHandedOver: 'Packed, QR-labelled B2C cartons & B2B crates staged in chilled dispatch bay for M06.',
        status: 'CONFIRMED IN PROJECT DISCUSSION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '5.1', action: 'Verify sorter & checkweigher calibration before batch start.', owner: 'Packhouse Tech / QC', gateType: 'QC_GATE', status: 'PROPOSED DESIGN' },
      { stepNo: '5.2', action: 'Grade berries via automated + manual QC by weight & diameter into 2L, L, M, S.', owner: 'Grading Team', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '5.3', action: 'Assign Grade Lot IDs; pack every grade separately into 250 g punnets.', owner: 'Packing Team', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '5.4', action: 'Branch B2C (2 × 250 g black boxes in 500 g carton) vs B2B (protective moulded sheet/tray in crates/cartons).', owner: 'Channel Packers', gateType: 'DECISION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '5.5', action: 'Print & scan Punnet → Carton/Crate parent-child QR hierarchy & stage cold.', owner: 'Packhouse Clerk', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Verify strict line clearance between 2L, L, M and S runs so grades never commingle.',
      'Track packaging stock levels (black 250g B2C boxes vs B2B trays) prior to shift.',
    ],
    sec09_qcResponsibilities: [
      'Audit random 250 g punnets for net weight compliance (flag underweight immediately).',
      'Inspect individual cavity seating so top lids never compress delicate crowns.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Grade Lot Weight Output', format: 'Net kg per 2L / L / M / S', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { field: 'Gram & Millimetre Grade Brackets', format: 'Threshold specification table (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { field: 'Pack Configuration Log', format: 'B2C 500 g cartons vs B2B crates count', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Lot → Punnet → Carton Binding', idLevel: 'LOT-ID → PUN-ID → CRT-ID', direction: 'Parent-child QR aggregation scan before pallet/crate staging.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M05-1',
        gateTitle: 'Grade Calibration & Weight Verification Gate',
        question: 'Are grades 2L/L/M/S separated cleanly and all punnets >= 250 g net without packaging defects?',
        branches: [
          { condition: 'Single-grade verified + 250 g checkweigh pass', outcome: 'PASS', nextStep: 'Seal B2C 500g carton / B2B crate, affix QR, stage for M06.', owner: 'Packhouse QC', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Underweight punnet or mixed grade detected (SCN-08)', outcome: 'REWORK', nextStep: 'Open punnet, rebalance single-grade berries on scale, re-verify.', owner: 'Packing Operator', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'B2C black box stock depleted (SCN-09)', outcome: 'ESCALATE', nextStep: 'Hold B2C packing; consult M2Labo Commercial on approved temporary substitute or B2B reallocation.', owner: 'Packhouse Supervisor + M2Labo Ops', status: 'ILLUSTRATIVE SIMULATION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Punnet Net Weight', criterion: '250 g per punnet (tolerance bounds UNKNOWN / NEEDS VERIFICATION)', sampling: '100% checkweigh or statistical sample', failureAction: 'Rebalance punnet prior to cartonization', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { parameter: 'Grade Diameter & Weight Rules (2L/L/M/S)', criterion: 'UNKNOWN / NEEDS VERIFICATION', sampling: 'Per lot start', failureAction: 'Halt packing until M2Labo grade sheet confirmed (OQ-09)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Channel Separation', criterion: 'B2C black boxes (2x250g in 500g carton) strictly separate from B2B cavity crates', sampling: '100% order line', failureAction: 'Repack immediately; never merge B2C box with EPS shell design', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Grading machine calibration drifts (SCN-07)', trigger: 'Load-cell or camera drift', impact: 'Incorrect grade distribution & underweight punnets', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Wrong grade enters B2C/B2B packaging (SCN-08)', trigger: 'Missed line clearance between runs', impact: 'Customer rejection & brand credibility damage', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'B2C black packaging unavailable (SCN-09)', trigger: 'Vendor stockout at farm', impact: 'B2C orders blocked from dispatch', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Line clearance checklist and colour-coded bins between 2L, L, M and S runs.',
      'Daily calibrated test weights run on checkweighers before first batch.',
    ],
    sec16_correctiveActions: [
      'Quarantine entire lot packed since last passing calibration check when drift is detected.',
      'Keep emergency safety buffer of B2C 250g boxes and B2B cavity inserts at HiMedia.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Single checkweigher variance or minor print jam', notifyRole: 'Packhouse Supervisor', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Pause station & recalibrate', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'B2C packaging shortage or >10% packhouse rejection', notifyRole: 'M2Labo Operations & Packaging Lead', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Approve channel reallocation', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M05-CHK-1', phase: 'BEFORE', instruction: 'Run checkweigher test weight and confirm clean line separation for B2C vs B2B packaging.', required: true, assignedRole: 'Packhouse Operator', supervisorRole: 'Packhouse Supervisor', mandatoryReadingLabel: 'Test Weight Reading', mandatoryReadingUnit: 'g', status: 'PROPOSED DESIGN' },
      { id: 'M05-CHK-2', phase: 'DURING', instruction: 'Verify each grade (2L/L/M/S) packs separately into 250 g punnets (B2C black cavity box vs B2B protective mould).', required: true, assignedRole: 'Packing Crew', supervisorRole: 'Packhouse QC', mandatoryReadingLabel: 'Punnet Net Weight', mandatoryReadingUnit: 'g', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M05-CHK-3', phase: 'AFTER', instruction: 'Confirm 2×250g = 500g B2C cartons & B2B crates carry scanned parent-child QR labels.', required: true, assignedRole: 'Packhouse Clerk', supervisorRole: 'Packhouse Supervisor', qrRequired: true, status: 'PROPOSED DESIGN' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M05-SUP-1', check: 'Audit mass balance: M04 released kg = Packed kg + Packhouse Reject/Value-Add kg.', signOffCriteria: '100% weight reconciliation', status: 'PROPOSED DESIGN' },
      { id: 'M05-SUP-2', check: 'Confirm finished cartons are held chilled until M06 vehicle loading.', signOffCriteria: 'Cold staging verified', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Farm Packhouse & QC Lead',
      toRole: 'Farm Dispatch & Linehaul Driver (M06)',
      physicalItem: 'Chilled master crates/cartons (B2C 500g cartons & B2B cavity crates)',
      digitalRecord: 'Packing Manifest with Grade Lot → Punnet → Carton QR tree & net kg',
      acknowledgement: 'M06 Dispatch QR Scan & Count Sign-off',
      status: 'CONFIRMED IN PROJECT DISCUSSION',
    },
    sec21_outputs: [
      'Graded 250 g Punnets (2L, L, M, S separate)',
      'B2C 500 g Cartons (2 × 250 g black boxes)',
      'B2B Moulded Cavity Crates/Cartons',
      'Packhouse Yield & Rejection Mass Balance',
    ],
    sec22_dependencies: {
      upstream: ['M04 Blast Cooled Batch Release', 'M01 Channel Split'],
      downstream: ['M06 Farm-to-MIDC Transport'],
      crossCutting: ['OQ-09: Grade 2L/L/M/S cutoffs', 'OQ-10: Packaging CAD dimensions'],
    },
    sec23_kpis: [
      { id: 'M05-K1', name: 'Packhouse Yield %', formula: 'Net Packed kg / Cooled Input kg × 100', unit: '%', dataSource: 'Packhouse Scale Log', frequency: 'Per Batch', owner: 'Packhouse Supervisor', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M05-K2', name: '250g Weight Compliance', formula: 'Punnets Within Spec / Total Audited Punnets × 100', unit: '%', dataSource: 'Checkweigher Log', frequency: 'Per Lot', owner: 'QC Person', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Publish formal gram/mm calibration cards for 2L, L, M and S.',
      'Embed QR thermal label printing directly inline with checkweigher pass trigger.',
    ],
    sec25_openQuestions: ['OQ-09: Grading thresholds', 'OQ-10: B2B/B2C packaging dimensions', 'OQ-11: QR printing hierarchy'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 7, 8)', excerpt: 'Grades 2L, L, M, S packed separately in 250 g punnets; B2C black 250g boxes (2=500g carton); B2B protective sheet/mould with individual cavities.', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
  },
  {
    id: 'M06',
    number: '06',
    code: 'M06-TRN',
    title: 'Farm-to-MIDC Transportation',
    shortTitle: 'Farm-to-MIDC',
    facilityZone: 'Highway Linehaul Corridor (Farm → Andheri MIDC Hub)',
    primaryOwner: 'Farm Dispatch Lead & Transport Driver (Proposed)',
    has3DContext: 'warehouse-transport',
    stationTelemetry: {
      targetTemp: 'Cold Maintained (~5°C)',
      cycleWindow: '~4–5 Hrs Est. (Traffic Var.)',
      qrAnchor: 'SHP-ID + LOGGER-ID',
      keyOutput: 'Sealed Cold Shipment at MIDC',
    },
    governance: {
      status: 'SOURCE DOCUMENT PROPOSAL',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8',
      validationOwner: 'M2Labo Logistics & Cold-Chain Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Option A (Refrigerated Van) vs Option B (Normal Van + Insulated Boxes + Cooling Packs) captured; numerical threshold & recovery SOP marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Executes the ~4–5 hour highway cold-chain transfer from HiMedia Farm to Andheri MIDC Hub in Mumbai. Selects between Option A (Refrigerated Van for high harvest/demand) and Option B (Normal Van with insulated/thermocol boxes and ice/cooling packs for lower volume), supported by GPS, temperature loggers, QR scans and driver acknowledgement.',
    sec02_purposeAndImportance:
      'Protects post-cooled strawberries across variable Maharashtra highway traffic and ambient heat, bridging farm packhouse quality directly to the Mumbai urban distribution hub.',
    sec03_entryConditions: [
      'M05 packed cartons/crates staged cold with Shipment Manifest.',
      'Joint transport option decision made (Option A vs Option B; threshold unknown).',
      'Vehicle pre-cooled (Option A) or insulated boxes pre-conditioned with coolant packs (Option B).',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Packed B2C & B2B Master Cartons/Crates', spec: 'QR-labelled from M05', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Option A: Refrigerated Van', spec: 'Used for high harvest/demand volumes', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Option B: Normal Van + Insulated/Thermocol Boxes + Ice/Cooling Packs', spec: 'Used for lower harvest volumes (exact threshold UNKNOWN)', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Refrigerated Van OR Insulated Box System', purpose: 'Maintain cold-chain envelope during 4–5h transit', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { name: 'GPS Vehicle Tracker & Driver Live Location', purpose: 'Real-time transit route & ETA monitoring', status: 'PROPOSED DESIGN' },
      { name: 'Temperature Logger', purpose: 'Continuous thermal audit across trip (IoT vs USB UNKNOWN)', status: 'PROPOSED DESIGN' },
      { name: 'Dispatch QR Scanner', purpose: 'Capture crate loading, dispatch timestamp & driver sign-off', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M06-ACT-1',
        title: 'Transport Mode Selection, Pre-Chill & Dispatch Handover',
        whoPerforms: 'Farm Dispatch Lead & Linehaul Driver (Joint selection authority unknown)',
        whatTheyDo: 'Confirm Option A vs Option B based on volume/economics, verify vehicle or insulated box temperature, scan all crates into Shipment ID, activate logger and record driver acknowledgement.',
        equipmentUsed: 'Reefer pre-cool gauge / insulated boxes + coolant packs, temp logger, QR scanner',
        whatToInspect: 'Vehicle box cleanliness, reefer setpoint / ice-pack freeze state, carton count, door seals.',
        whatToRecord: 'Shipment ID, vehicle number, driver name, logger ID, dispatch timestamp, starting temp, crate count.',
        ifItFails: 'Do NOT load warm van or unconditioned insulated boxes; pre-chill or replace packs before dispatch.',
        whoApprovesNext: 'Farm Dispatch Lead + Driver Acknowledgement',
        whatIsHandedOver: 'Sealed shipment with active GPS, logger and digital Shipment Manifest en route to MIDC.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M06-ACT-2',
        title: 'In-Transit Monitoring & Exception Escalation',
        whoPerforms: 'Driver & M2Labo Operations Monitor',
        whatTheyDo: 'Track 4–5h route via GPS & live location; respond immediately to automated temperature alerts, breakdowns or severe traffic delays.',
        equipmentUsed: 'Driver mobile GPS, temperature alert dashboard (Proposed)',
        whatToInspect: 'Live transit ETA, cabin/box thermal alert status, route blockages.',
        whatToRecord: 'Exception timestamps, driver call log, arrival confirmation at MIDC gate.',
        ifItFails: 'Trigger driver escalation + automated alert to M2Labo Ops (recovery SOP unfinalized).',
        whoApprovesNext: 'M2Labo Operations Lead (Proposed)',
        whatIsHandedOver: 'Arrived shipment + continuous thermal log + sealed crates to M07 MIDC Receiving.',
        status: 'UNKNOWN / NEEDS VERIFICATION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '6.1', action: 'Determine Option A (Reefer Van) vs Option B (Normal Van + Insulated Boxes/Packs).', owner: 'Joint Ops/Farm (Threshold Unknown)', gateType: 'DECISION', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { stepNo: '6.2', action: 'Pre-cool vehicle or condition insulated boxes + ice packs; place Temperature Logger.', owner: 'Farm Dispatch Crew', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '6.3', action: 'Execute Dispatch Handover: QR scan, qty/condition check, temp record, driver acknowledgement & timestamp.', owner: 'Dispatch Lead + Driver', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
      { stepNo: '6.4', action: 'Execute 4–5h transit with GPS + live location tracking.', owner: 'Linehaul Driver', gateType: 'ACTION', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '6.5', action: 'On excursion/breakdown/delay: automated alert + driver escalation to M2Labo Ops.', owner: 'Driver + M2Labo Ops', gateType: 'QC_GATE', status: 'PROPOSED DESIGN', note: 'Breakdown & prolonged traffic recovery procedures not finalized.' },
    ],
    sec08_supervisorResponsibilities: [
      'Verify Option A vs Option B loading integrity (crushed boxes prohibited; straps secured).',
      'Monitor active shipment ETAs and lead contingency dispatch if breakdown/traffic exceeds buffer.',
    ],
    sec09_qcResponsibilities: [
      'Verify logger activation and initial cargo temperature before doors seal.',
      'Ensure Option B ice/coolant packs do not directly touch bare berries or wet outer cardboard.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Shipment ID & Crate Manifest', format: 'Parent-child link SHP-ID → CRT-IDs', status: 'PROPOSED DESIGN' },
      { field: 'Dispatch Timestamp & Driver Acknowledgement', format: 'Digital/signed handover record', status: 'PROPOSED DESIGN' },
      { field: 'Option A vs Option B Numerical Threshold', format: 'Volume/cost cutoff (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Dispatch Load Scan', idLevel: 'CRT-ID → SHP-ID', direction: 'Scans every crate/carton onto Shipment ID at farm gate; arrival scan closes trip at M07.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M06-1',
        gateTitle: 'Transport Mode & Pre-Dispatch Gate',
        question: 'Does the selected vehicle/box option meet thermal hold capacity for current harvest volume?',
        branches: [
          { condition: 'High volume → Option A Refrigerated Van pre-cooled', outcome: 'PASS', nextStep: 'Load crates, activate logger, capture driver sign-off & dispatch.', owner: 'Dispatch Lead', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Low volume → Option B Normal Van + Insulated Boxes + Coolant Packs', outcome: 'PASS', nextStep: 'Seal insulated boxes with pre-frozen packs & dispatch (threshold unknown).', owner: 'Dispatch Lead', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Reefer pre-cool fails or logger missing', outcome: 'HOLD', nextStep: 'Hold loading; switch to backup Option B insulated boxes or repair reefer.', owner: 'Farm Supervisor', status: 'PROPOSED DESIGN' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Transit Window Estimate', criterion: '4–5 hours planned duration (variable with traffic & road conditions)', sampling: '100% of trips', failureAction: 'Trigger traffic delay alert to MIDC receiving & customer dispatch desk', status: 'SOURCE DOCUMENT PROPOSAL' },
      { parameter: 'Option A vs B Threshold', criterion: 'UNKNOWN / NEEDS VERIFICATION', sampling: 'Per trip dispatch', failureAction: 'Joint Ops/Farm decision required (OQ-12)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Breakdown & Excursion Recovery SOP', criterion: 'UNKNOWN / NEEDS VERIFICATION (procedures not finalized)', sampling: 'All exceptions', failureAction: 'Immediate driver call + automated alert to M2Labo Ops', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Transport vehicle breaks down (SCN-10)', trigger: 'Mechanical/tire failure en route', impact: 'Loss of active refrigeration / stalled thermal hold', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: '3-hour traffic delay (SCN-11)', trigger: 'Highway accident or monsoon bottleneck', impact: 'Coolant exhaustion & missed MIDC morning dispatch wave', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Temperature logger detects excursion (SCN-12)', trigger: 'Door ajar, reefer fault or warm ice packs', impact: 'Accelerated fruit softening & potential MIDC downgrade', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Driver becomes unreachable (SCN-13)', trigger: 'Dead phone/network blackout', impact: 'Blind cold-chain custody window', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Dual driver contact + cellular GPS + pre-trip vehicle mechanical check.',
      'Pre-departure thermal stabilization verified before vehicle leaves farm gate.',
    ],
    sec16_correctiveActions: [
      'Escalate immediately to M2Labo Operations upon any excursion or >30 min unscheduled stop.',
      'Pre-alert MIDC QC team to prioritize rapid thermal triage upon late arrival.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'ETA slippage >30 mins or minor traffic delay', notifyRole: 'M2Labo Transport Desk & MIDC Supervisor', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Reschedule MIDC dock slot', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Vehicle breakdown, unreachable driver or thermal excursion', notifyRole: 'M2Labo Head of Operations', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Deploy standby rescue vehicle / emergency cold store', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M06-CHK-1', phase: 'BEFORE', instruction: 'Confirm Option A (Reefer) or Option B (Normal Van + Insulated Boxes/Cooling Packs) and check pre-chill temperature.', required: true, assignedRole: 'Farm Dispatch Lead', supervisorRole: 'Farm Supervisor', mandatoryReadingLabel: 'Pre-Load Van/Box Temp', mandatoryReadingUnit: '°C', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M06-CHK-2', phase: 'DURING', instruction: 'Scan all crate QRs onto Shipment ID, place temperature logger, verify carton condition and record driver acknowledgement.', required: true, assignedRole: 'Dispatch Lead + Driver', supervisorRole: 'Farm Supervisor', qrRequired: true, status: 'PROPOSED DESIGN' },
      { id: 'M06-CHK-3', phase: 'AFTER', instruction: 'Confirm GPS & live tracking active, record dispatch timestamp and trigger arrival alert upon reaching MIDC.', required: true, assignedRole: 'Driver', supervisorRole: 'M2Labo Ops', status: 'PROPOSED DESIGN' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M06-SUP-1', check: 'Confirm driver signed Shipment Manifest and understands immediate excursion alert escalation.', signOffCriteria: 'Signed dispatch + active GPS verified', status: 'PROPOSED DESIGN' },
      { id: 'M06-SUP-2', check: 'Audit transit logger trace immediately upon arrival at Andheri MIDC.', signOffCriteria: 'Continuous thermal curve archived', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Linehaul Driver & Farm Dispatch',
      toRole: 'Andheri MIDC Receiving Staff & QC (M07)',
      physicalItem: 'Sealed Shipment (Cartons/Crates + Insulated Boxes if Option B) + Physical Logger',
      digitalRecord: 'Shipment ID + GPS Route Log + Dispatch/Arrival Timestamps + Driver Ack',
      acknowledgement: 'MIDC Gate Arrival Confirmation & Receiving Scan',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Delivered Shipment at Andheri MIDC Dock',
      'Continuous Transit Temperature & GPS Trace',
      'Signed Dispatch & Arrival Handover Log',
    ],
    sec22_dependencies: {
      upstream: ['M05 Packed Cartons & Crates'],
      downstream: ['M07 MIDC Receiving, QC & Inventory'],
      crossCutting: ['OQ-12: Option A vs B threshold', 'OQ-14: IoT vs USB logger', 'OQ-15: Breakdown recovery SLA'],
    },
    sec23_kpis: [
      { id: 'M06-K1', name: 'Transit Time', formula: 'MIDC Arrival TS - Farm Dispatch TS', unit: 'hours', dataSource: 'GPS / Handover Log', frequency: 'Per Trip', owner: 'Logistics Lead', target: '4–5 hrs estimate', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M06-K2', name: 'Linehaul Cost per kg', formula: 'Trip Cost / Delivered Net kg', unit: 'INR/kg', dataSource: 'Transport & Finance', frequency: 'Per Trip', owner: 'Finance & Logistics', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Quantify the exact kg/carton breakeven between Refrigerated Van and Insulated Box transport.',
      'Draft contracted standby vehicle rescue SLAs along the farm-to-Mumbai highway.',
    ],
    sec25_openQuestions: ['OQ-12: Transport threshold', 'OQ-13: Vehicle capacity & corridor', 'OQ-14: Logger telemetry spec', 'OQ-15: Breakdown recovery SOP'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 8)', excerpt: 'Option A refrigerated van vs Option B normal van + insulated boxes/cooling packs; 4–5h transit estimate; threshold & breakdown SOP unknown.', status: 'SOURCE DOCUMENT PROPOSAL', conflictNote: 'DSC-03: Exact numerical threshold & decision authority for Option A vs Option B remain unresolved.' },
    ],
  },
];
