import { MilestoneData } from '../types/blueprint';

export const MILESTONES_PART_2: MilestoneData[] = [
  {
    id: 'M07',
    number: '07',
    code: 'M07-RCV',
    title: 'MIDC Receiving, QC & Inventory',
    shortTitle: 'MIDC Receiving',
    facilityZone: 'Andheri MIDC Cold Warehouse Hub (Mumbai)',
    primaryOwner: 'MIDC Warehouse Supervisor, Receiving Staff & QC Inspector (Proposed)',
    has3DContext: 'warehouse-transport',
    stationTelemetry: {
      targetTemp: 'Cold Room (~5°C Envelope)',
      cycleWindow: 'Immediate Unload & Triage',
      qrAnchor: 'SHP-ID → RCV-ID → INV-TXN',
      keyOutput: '4 Physically Segregated Buckets',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 8, 9',
      validationOwner: 'Andheri MIDC Warehouse & Food Safety Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: '6 mandatory receiving checks & 4 physically separated inventory buckets captured; food-safety limits & approval matrix marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Executes structured unloading, 6-point mandatory receiving QC and batch-level put-away at the Andheri MIDC hub. Stock is classified and moved into four physically separated inventory buckets (Sellable, Reshuffling Buffer, Value-Addition, Scrap/Waste) governed by FIFO, FEFO and batch-wise allocation.',
    sec02_purposeAndImportance:
      'Acts as the Mumbai firewall protecting B2B and D2C customers from transit damage, thermal excursions or quantity variances while preserving recovery value through controlled reshuffling and value-addition buckets.',
    sec03_entryConditions: [
      'M06 Shipment arrived at Andheri MIDC receiving bay.',
      'Receiving staff, QC inspector and Warehouse Supervisor present (exact staffing unconfirmed).',
      'Four segregated physical inventory zones cleared and labelled.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Incoming Linehaul Shipment', spec: 'Master crates/cartons + insulated boxes + temp logger', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Digital Dispatch Manifest', spec: 'Expected Batch/Punnet/Carton QR list from M06', status: 'PROPOSED DESIGN' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Receiving QR / Barcode Scanner', purpose: 'Reconcile arriving crates against Shipment Manifest', status: 'PROPOSED DESIGN' },
      { name: 'Temperature Logger Reader & IR/Probe Thermometer', purpose: 'Download transit thermal log & spot-check berry temp', status: 'PROPOSED DESIGN' },
      { name: 'QC Inspection Bench & Calibration Scale', purpose: 'Inspect packaging damage, berry condition & defects', status: 'PROPOSED DESIGN' },
      { name: '4 Segregated Cold Zone Racks/Bins', purpose: 'Physical separation of Sellable, Reshuffle, Value-Add, Scrap', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M07-ACT-1',
        title: 'Dock Unloading & 6-Point Receiving Verification',
        whoPerforms: 'Receiving Staff unload, QC Inspector checks, Warehouse Supervisor oversees (Proposed)',
        whatTheyDo: 'Execute the 6 mandatory checks: (1) QR & batch verification, (2) Arrival time & vehicle details, (3) Temperature log/spot check, (4) Packaging damage check, (5) Quantity reconciliation, (6) Strawberry condition & visible defects.',
        equipmentUsed: 'QR scanner, logger reader, dock scale, QC inspection checklist',
        whatToInspect: 'QR match, transit duration, thermal curve, wet/crushed cartons, count shortages, mould/bruising.',
        whatToRecord: 'MIDC Receiving Record ID (RCV-ID), arrival timestamp, temp status, discrepancy notes, bucket splits.',
        ifItFails: 'Hold discrepant cartons in Quarantine Staging; alert Supervisor & M2Labo Ops before booking into Sellable.',
        whoApprovesNext: 'MIDC QC Inspector + Warehouse Supervisor (Approval matrix unconfirmed)',
        whatIsHandedOver: 'Verified stock physically routed to one of the 4 inventory buckets.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M07-ACT-2',
        title: '4-Bucket Put-Away & FIFO/FEFO Inventory Tagging',
        whoPerforms: 'Receiving Staff & Inventory Controller',
        whatTheyDo: 'Move inspected crates into physically separated zones: (1) Sellable Stock, (2) Reshuffling Buffer, (3) Value-Addition Stock, or (4) Scrap/Waste; scan bin location to enforce FIFO/FEFO and batch-wise allocation.',
        equipmentUsed: 'Zone QR tags, pallet/crate jacks, inventory ledger',
        whatToInspect: 'Physical zone boundary integrity (zero mixed buckets on one rack), intact batch IDs.',
        whatToRecord: 'Inventory Transaction ID (INV-TXN), zone/bucket, kg, FEFO expiry/harvest rank.',
        ifItFails: 'Lock misplaced bin digitally and relocate physically immediately.',
        whoApprovesNext: 'MIDC Warehouse Supervisor',
        whatIsHandedOver: 'Live bucket-segregated inventory available for M08 Order Picking.',
        status: 'PROPOSED DESIGN',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '7.1', action: 'Record vehicle arrival time, seal/vehicle details & unload into chilled dock.', owner: 'Receiving Staff', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '7.2', action: 'Download/inspect transit temperature logger & verify QR/batch match.', owner: 'Receiving + QC', gateType: 'QC_GATE', status: 'PROPOSED DESIGN' },
      { stepNo: '7.3', action: 'Reconcile carton/punnet quantities & inspect packaging damage + fruit condition.', owner: 'QC Inspector', gateType: 'QC_GATE', status: 'PROPOSED DESIGN' },
      { stepNo: '7.4', action: 'Classify & physically segregate into 4 inventory buckets (Sellable, Reshuffle, Value-Add, Scrap).', owner: 'QC + Supervisor', gateType: 'DECISION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '7.5', action: 'Apply FIFO / FEFO / batch-wise slot rank & post Inventory Transaction ID.', owner: 'Warehouse Supervisor', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Ensure physical segregation between the 4 inventory buckets is strictly maintained at all times.',
      'Validate cross-bucket movement approvals (formal approval matrix pending validation).',
      'Report receiving shortages or >15% QC failure immediately to HiMedia & Operations.',
    ],
    sec09_qcResponsibilities: [
      'Complete all 6 mandatory receiving checks before any stock enters Sellable Stock.',
      'Ensure damaged/mouldy fruit never contaminates healthy punnets during reshuffling.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'MIDC Receiving Record (RCV-ID)', format: '6-point inspection record linked to SHP-ID', status: 'PROPOSED DESIGN' },
      { field: '4-Bucket Inventory Ledger', format: 'Sellable / Reshuffling / Value-Add / Scrap kg & QR list', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { field: 'Food-Safety Criteria & Approval Matrix', format: 'Bucket movement authorization rules (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Receiving & Bucket Assignment Scan', idLevel: 'SHP-ID / CRT-ID → RCV-ID → INV-TXN', direction: 'Links incoming crates to physical MIDC zone and FEFO priority.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M07-1',
        gateTitle: 'MIDC 6-Point Receiving & Bucket Triage Gate',
        question: 'Does the received lot pass QR, thermal, packaging, quantity and berry condition checks?',
        branches: [
          { condition: 'All 6 checks pass clean', outcome: 'PASS', nextStep: 'Route to Zone 1: Sellable Stock (FIFO/FEFO tracked).', owner: 'QC + Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Localized berry damage within otherwise sound punnet', outcome: 'REWORK', nextStep: 'Route to Zone 2: Reshuffling Buffer for controlled repacking (criteria UNKNOWN).', owner: 'QC Inspector', status: 'PROPOSED DESIGN' },
          { condition: 'Soft/overripe fruit safe for processing', outcome: 'DOWNGRADE', nextStep: 'Route to Zone 3: Value-Addition Stock.', owner: 'QC + Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Mould, severe excursion or contamination (SCN-15/17)', outcome: 'REJECT', nextStep: 'Route to Zone 4: Scrap/Waste; lock QR permanently from sellable pool.', owner: 'QC Inspector', status: 'CONFIRMED IN PROJECT DISCUSSION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: '6 Mandatory Receiving Checks', criterion: 'QR/batch, arrival/vehicle, temp, packaging, qty, fruit condition all recorded', sampling: '100% of shipments', failureAction: 'Hold unverified cartons in quarantine', status: 'PROPOSED DESIGN' },
      { parameter: 'Food-Safety Disposition Limits', criterion: 'UNKNOWN / NEEDS VERIFICATION (exact mould/excursion rules unconfirmed)', sampling: 'Batch sample', failureAction: 'Quarantine & escalate to QA Lead (OQ-17)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'FIFO / FEFO Tie-Break Rule', criterion: 'UNKNOWN / NEEDS VERIFICATION (final inventory rule unconfirmed)', sampling: 'All put-away slots', failureAction: 'Supervisor sets manual FEFO batch sequence', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Shipment arrives with missing cartons (SCN-14)', trigger: 'Farm misload or en-route loss', impact: 'Order fulfilment deficit at MIDC', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: '15% of received stock fails QC (SCN-15)', trigger: 'Transit heat or vibration bruising', impact: 'Triggers M01/M08 shortage reallocation', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'QR code does not match physical inventory (SCN-16)', trigger: 'Mislabelled carton at M05 packhouse', impact: 'Traceability break until reconciled', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Rejected fruit enters Sellable accidentally (SCN-17)', trigger: 'Weak zone barrier or missed scan', impact: 'Severe food-safety & brand failure', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Physical colour-coded zone tape and signage separating the 4 MIDC inventory buckets.',
      'Digital QR lock preventing Sellable allocation for non-Zone-1 inventory IDs.',
    ],
    sec16_correctiveActions: [
      'Trigger immediate physical recount and batch freeze whenever QR mismatch occurs.',
      'Recall any orders picked from a batch found contaminated post-receiving.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Minor count variance (1–2 cartons) or localized reshuffle need', notifyRole: 'MIDC Warehouse Supervisor', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Log variance & notify Farm Dispatch', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: '>10% QC fail, thermal excursion or cross-bucket mixup', notifyRole: 'M2Labo Ops Head & Quality Lead', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Quarantine shipment & trigger customer allocation', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M07-CHK-1', phase: 'BEFORE', instruction: 'Confirm MIDC cold room setpoint and clear physical separation of all 4 inventory zones.', required: true, assignedRole: 'Receiving Staff', supervisorRole: 'MIDC Supervisor', mandatoryReadingLabel: 'MIDC Cold Room Temp', mandatoryReadingUnit: '°C', status: 'PROPOSED DESIGN' },
      { id: 'M07-CHK-2', phase: 'DURING', instruction: 'Execute all 6 mandatory receiving checks (QR, arrival/vehicle, temp, pack damage, qty, fruit condition).', required: true, assignedRole: 'Receiving + QC', supervisorRole: 'MIDC Supervisor', qrRequired: true, mandatoryReadingLabel: 'Arrival Logger Temp', mandatoryReadingUnit: '°C', status: 'PROPOSED DESIGN' },
      { id: 'M07-CHK-3', phase: 'AFTER', instruction: 'Put away stock into exact segregated bucket (Sellable / Reshuffle / Value-Add / Scrap) and record INV-TXN.', required: true, assignedRole: 'Receiving Staff', supervisorRole: 'MIDC Supervisor', qrRequired: true, status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M07-SUP-1', check: 'Audit physical segregation of 4 inventory buckets and verify zero unlabelled crates.', signOffCriteria: '100% bucket boundary compliance', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M07-SUP-2', check: 'Sign off receiving discrepancy & QC split before releasing Zone 1 to M08 Picking.', signOffCriteria: 'RCV-ID closed & FEFO order posted', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'MIDC Receiving & QC Team',
      toRole: 'MIDC Order Fulfilment & Packing Team (M08)',
      physicalItem: 'Zone 1 Sellable Stock staged by FEFO / Grade (2L/L/M/S)',
      digitalRecord: 'Approved RCV-ID + INV-TXN Ledger + FEFO Batch Sequence',
      acknowledgement: 'Warehouse Supervisor Stock Release',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'MIDC Receiving Inspection Report',
      'Segregated 4-Bucket Inventory Balances',
      'FEFO / Batch-Allocated Sellable Pool',
    ],
    sec22_dependencies: {
      upstream: ['M06 Delivered Shipment & Thermal Log'],
      downstream: ['M08 Order Picking & Packing', 'M10 Returns Quarantine Interface'],
      crossCutting: ['OQ-16: MIDC layout', 'OQ-17: QC acceptance criteria', 'OQ-18: Cross-bucket approval matrix'],
    },
    sec23_kpis: [
      { id: 'M07-K1', name: 'Receiving Discrepancy Rate', formula: 'Shipments with Qty/QR/QC Variance / Total Received × 100', unit: '%', dataSource: 'RCV Logs', frequency: 'Weekly', owner: 'MIDC Supervisor', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M07-K2', name: 'Warehouse Shrinkage %', formula: '(Scrap kg + Unexplained Loss kg) / Received kg × 100', unit: '%', dataSource: '4-Bucket Ledger', frequency: 'Weekly', owner: 'Warehouse Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Finalize Andheri MIDC floor zoning CAD and cold-room temperature alarms.',
      'Define strict authority matrix for moving fruit from Reshuffling Buffer back to Sellable.',
    ],
    sec25_openQuestions: ['OQ-16: MIDC floor layout', 'OQ-17: Receiving QC thresholds', 'OQ-18: Inventory movement approvals'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 8, 9)', excerpt: 'Receiving staff unload, QC checks, supervisor oversees; 6 mandatory checks; 4 inventory buckets; FIFO/FEFO/batch direction; final rules unconfirmed.', status: 'PROPOSED DESIGN' },
    ],
  },
  {
    id: 'M08',
    number: '08',
    code: 'M08-FUL',
    title: 'Order Picking & Customer-Specific Packing',
    shortTitle: 'Order Fulfilment',
    facilityZone: 'Andheri MIDC Fulfilment & Staging Bay',
    primaryOwner: 'MIDC Fulfilment Picker & Dispatch Checker (Proposed)',
    has3DContext: 'warehouse-transport',
    stationTelemetry: {
      targetTemp: 'Chilled Packing Bay (~5°C)',
      cycleWindow: 'Pre-Dispatch Morning Wave',
      qrAnchor: 'INV-TXN → ORD-ID',
      keyOutput: 'Verified Customer Order + Staging',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 9',
      validationOwner: 'MIDC Fulfilment Supervisor',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: '8-step picking, QR verification & B2B/B2C pack check captured; detailed workflow & roles noted as not yet finalized.' },
      ],
    },
    sec01_processOverview:
      'Translates central customer orders into MIDC picking lists, allocates specific FEFO batches and grades (2L/L/M/S), verifies QR identity, prepares distinct B2B vs B2C customer packaging, performs final quantity/quality checks and stages orders for last-mile dispatch.',
    sec02_purposeAndImportance:
      'Prevents grade swaps, mispicked B2B/B2C formats and unverified cold-chain handoffs before orders leave the controlled MIDC facility.',
    sec03_entryConditions: [
      'Central customer order finalized with channel (B2B vs B2C) and grade specification.',
      'Zone 1 Sellable Stock released by M07 Supervisor with FEFO priority.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Central Customer Orders & Picking Lists', spec: 'Order ID, Customer Segment, Grade, Pack Type', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Zone 1 Sellable Punnet/Carton Inventory', spec: 'From M07 FEFO racks', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Customer-Specific Inserts & Seals', spec: 'B2C branding slips vs B2B order labels', status: 'PROPOSED DESIGN' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Picking List Terminal / Tablet', purpose: 'Direct picker to exact FEFO batch & grade rack', status: 'PROPOSED DESIGN' },
      { name: 'QR Scanner & Order Label Printer', purpose: 'Bind Punnet/Carton QR to Customer Order ID', status: 'PROPOSED DESIGN' },
      { name: 'Chilled Dispatch Staging Racks', purpose: 'Hold completed orders sorted by delivery route cluster', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M08-ACT-1',
        title: 'FEFO Batch Picking & QR Verification',
        whoPerforms: 'MIDC Order Picker (Final role workflow unestablished)',
        whatTheyDo: 'Follow central picking list, retrieve allocated grade (2L/L/M/S) strictly from Zone 1 Sellable racks by FEFO order, and scan punnet/carton QRs against Customer Order ID.',
        equipmentUsed: 'Picking list, QR scanner, picking trolley',
        whatToInspect: 'Exact grade match (2L/L/M/S), zero damaged boxes, Zone 1 source verification.',
        whatToRecord: 'Order ID, picked Batch/Punnet QR IDs, picker name, pick timestamp.',
        ifItFails: 'Halt if QR mismatches or belongs to non-Sellable zone; escalate to Supervisor.',
        whoApprovesNext: 'Fulfilment Checker / Supervisor',
        whatIsHandedOver: 'Picked units moved to customer-specific packing bench.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M08-ACT-2',
        title: 'B2B/B2C Packing, Final Count Check & Dispatch Staging',
        whoPerforms: 'Packing Operator & Final QC Verifier',
        whatTheyDo: 'Confirm distinct B2C (2×250 g black boxes in 500 g carton) vs B2B (cavity tray/crate) presentation, verify exact unit count & condition, seal order and place in route-sorted cold dispatch staging.',
        equipmentUsed: 'Packing bench, check scale, route staging rack',
        whatToInspect: 'B2B vs B2C packaging correctness, intact seals, order label legibility, zero condensation damage.',
        whatToRecord: 'Final verification sign-off, total weight/unit count, staging bay slot.',
        ifItFails: 'Re-pick defective or wrong-grade unit immediately before staging.',
        whoApprovesNext: 'MIDC Fulfilment Supervisor',
        whatIsHandedOver: 'Verified, cold-staged Customer Orders ready for M09 Last-Mile Loading.',
        status: 'PROPOSED DESIGN',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '8.1', action: 'Receive Central Customer Order & generate Picking List.', owner: 'MIDC Desk', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '8.2', action: 'Select Batch & Grade (2L/L/M/S) per FEFO / batch allocation rule.', owner: 'Order Picker', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '8.3', action: 'Scan & verify QR against Order ID.', owner: 'Order Picker', gateType: 'QC_GATE', status: 'PROPOSED DESIGN' },
      { stepNo: '8.4', action: 'Apply B2B vs B2C specific outer packaging & customer documentation.', owner: 'Packing Operator', gateType: 'ACTION', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '8.5', action: 'Execute Quantity Check & Final Verification, then stage cold for M09 dispatch.', owner: 'Dispatch Checker', gateType: 'HANDOVER', status: 'PROPOSED DESIGN', note: 'Final picking & approval workflow not yet finalized.' },
    ],
    sec08_supervisorResponsibilities: [
      'Enforce strict separation between B2B hospitality crate orders and B2C retail carton orders.',
      'Validate picking accuracy and authorize batch substitutions only with Commercial approval.',
    ],
    sec09_qcResponsibilities: [
      'Perform final pre-seal visual check on sample/high-priority hospitality orders.',
      'Ensure staged orders do not sit in unchilled ambient staging areas.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Order-to-Batch Link', format: 'ORD-ID mapped to CRT-ID / PUN-ID / LOT-ID', status: 'PROPOSED DESIGN' },
      { field: 'Final Packing & Approval Sign-Off', format: 'Checker ID + Timestamp (workflow unfinalized)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Pick & Pack Binding Scan', idLevel: 'PUN-ID / CRT-ID → ORD-ID', direction: 'Blocks accidental scan of Reshuffling, Value-Add or Scrap IDs.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M08-1',
        gateTitle: 'Pre-Dispatch Order Verification Gate',
        question: 'Do picked grade, QR batch, B2B/B2C packaging format and unit quantity match the customer order 100%?',
        branches: [
          { condition: '100% match + intact packaging + valid FEFO', outcome: 'PASS', nextStep: 'Approve & move to Cold Dispatch Staging for M09.', owner: 'Dispatch Checker', status: 'PROPOSED DESIGN' },
          { condition: 'Wrong customer order or wrong grade picked (SCN-18)', outcome: 'REWORK', nextStep: 'Reject at staging gate; re-pick correct batch/grade immediately.', owner: 'Order Picker + Supervisor', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'Insufficient Zone 1 stock to complete order', outcome: 'ESCALATE', nextStep: 'Hold partial order; escalate to M01 Planner for customer notice or approved substitution.', owner: 'MIDC Supervisor', status: 'PROPOSED DESIGN' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Picking & Grade Accuracy', criterion: '100% grade & pack-type match to Customer Order ID', sampling: '100% QR scan gate', failureAction: 'Block dispatch; immediate re-pick', status: 'PROPOSED DESIGN' },
      { parameter: 'Final Approval Authority', criterion: 'UNKNOWN / NEEDS VERIFICATION (detailed workflow unfinalized)', sampling: 'Per order', failureAction: 'MIDC Supervisor co-signs orders until finalized (OQ-19)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Wrong customer order or wrong grade picked (SCN-18)', trigger: 'Adjacent rack mixup or skipped QR scan', impact: 'B2B chef receives S instead of 2L or B2C receives wrong pack', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Mandatory QR scan match before order label can print.',
      'Physically separated B2B vs B2C packing stations.',
    ],
    sec16_correctiveActions: [
      'Hold mispicked unit prior to rider handoff; trigger instant re-pick from Zone 1.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Single-order stock gap or minor repack', notifyRole: 'MIDC Fulfilment Supervisor', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Allocate next FEFO lot', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Systemic shortage blocking Tier-1 Hospitality wave', notifyRole: 'Commercial & Ops Head', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Authorize split delivery or priority override', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M08-CHK-1', phase: 'BEFORE', instruction: 'Print/open Central Picking List and verify picking cart cleanliness & staging bay temperature.', required: true, assignedRole: 'Order Picker', supervisorRole: 'Fulfilment Supervisor', status: 'PROPOSED DESIGN' },
      { id: 'M08-CHK-2', phase: 'DURING', instruction: 'Pick strictly from Zone 1 Sellable by FEFO, scan QR to Order ID, and apply exact B2B or B2C pack format.', required: true, assignedRole: 'Picker / Packer', supervisorRole: 'Fulfilment Supervisor', qrRequired: true, status: 'PROPOSED DESIGN' },
      { id: 'M08-CHK-3', phase: 'AFTER', instruction: 'Complete final quantity check, seal carton/crate and stage in chilled route bay for M09.', required: true, assignedRole: 'Dispatch Checker', supervisorRole: 'Fulfilment Supervisor', status: 'PROPOSED DESIGN' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M08-SUP-1', check: 'Audit picked orders against route wave before M09 rider check-in.', signOffCriteria: '100% QR + Qty verified', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'MIDC Fulfilment & Staging Team',
      toRole: 'Last-Mile Delivery Rider / Partner (M09)',
      physicalItem: 'Sealed Customer Orders in B2B/B2C packaging + pre-chilled insulated bags/coolants',
      digitalRecord: 'Order IDs + Route Manifest + Verified Batch QRs',
      acknowledgement: 'M09 Rider Dispatch Scan',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Order-Picked & QR-Bound Customer Packages',
      'Dispatch Staging Manifest by Delivery Wave',
    ],
    sec22_dependencies: {
      upstream: ['M07 Zone 1 Sellable Stock', 'M01 Customer Orders'],
      downstream: ['M09 Last-Mile Delivery'],
      crossCutting: ['OQ-19: Detailed picking & approval workflow'],
    },
    sec23_kpis: [
      { id: 'M08-K1', name: 'Order Picking Accuracy', formula: 'Error-Free Orders / Total Picked Orders × 100', unit: '%', dataSource: 'Dispatch Check & M10 Claims', frequency: 'Daily', owner: 'Fulfilment Supervisor', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M08-K2', name: 'Order Cycle Time', formula: 'Staged TS - Pick Release TS', unit: 'mins', dataSource: 'Fulfilment Log', frequency: 'Daily', owner: 'Fulfilment Supervisor', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Define formal split-role vs combined picker-checker staffing model at MIDC.',
      'Implement scan-enforced dispatch validation to eliminate wrong-order dispatches.',
    ],
    sec25_openQuestions: ['OQ-19: Picking & dispatch role workflow', 'OQ-11: Order-level QR scan enforcement'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 9)', excerpt: 'Central order, picking list, batch/grade selection, QR check, B2B/B2C packing, final check, staging; final workflow not yet finalized.', status: 'PROPOSED DESIGN' },
    ],
  },
  {
    id: 'M09',
    number: '09',
    code: 'M09-LMD',
    title: 'Last-Mile Delivery',
    shortTitle: 'Last-Mile Delivery',
    facilityZone: 'Mumbai Metropolitan Delivery Routes (From Andheri MIDC)',
    primaryOwner: 'Last-Mile Dispatch Coordinator & Delivery Rider/Partner (Model Unconfirmed)',
    stationTelemetry: {
      targetTemp: 'Insulated Bag + Coolant',
      cycleWindow: 'Route Cluster Priority',
      qrAnchor: 'DEL-ID → POD-ID',
      keyOutput: 'Digital POD + Temp Handover',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 9',
      validationOwner: 'Last-Mile Logistics Lead',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: '4 candidate transport modes, insulated bag protection & 5 dispatch priority criteria captured; final capacities & temp limits marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Delivers fulfilled B2B and D2C strawberry orders across Mumbai from Andheri MIDC using hybrid delivery modes under consideration (two-wheelers, public transport for suitable nearby deliveries, dedicated vans, third-party partners). Orders travel inside insulated delivery bags with ice packs/coolant bottles and conclude with QR-linked Digital Proof of Delivery (POD).',
    sec02_purposeAndImportance:
      'Preserves fragile fruit structure and cold-chain stability through Mumbai traffic to the customer’s doorstep, capturing indisputable delivery acceptance evidence.',
    sec03_entryConditions: [
      'Staged, verified customer orders released from M08.',
      'Route cluster prioritized by location, promised delivery, priority, shelf life and route economics.',
      'Insulated bags and frozen ice packs/coolant bottles pre-conditioned.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Verified B2B & B2C Packages', spec: 'Tagged with Order ID from M08', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Insulated Delivery Bags & Ice/Coolant Bottles', spec: 'Configured by delivery mode & order size (capacities UNKNOWN)', status: 'SOURCE DOCUMENT PROPOSAL' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Hybrid Delivery Fleet Options', purpose: 'Two-wheelers, public transport (nearby), dedicated vans, 3PL partners (final model UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { name: 'Insulated Thermal Bags + Coolant Packs', purpose: 'Prevent ambient heat ingress during Mumbai drops', status: 'SOURCE DOCUMENT PROPOSAL' },
      { name: 'Mobile POD App / Scanner + Probe', purpose: 'Scan QR, capture handover temp, customer condition check & Digital POD', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M09-ACT-1',
        title: 'Route Prioritization & Thermal Bag Packing',
        whoPerforms: 'Last-Mile Dispatch Coordinator & Rider (Proposed)',
        whatTheyDo: 'Cluster orders by location, delivery commitment, customer priority, shelf life and economics; select delivery mode; pack orders upright into insulated bags with required coolant packs.',
        equipmentUsed: 'Insulated bag, pre-frozen coolant bottles, route manifest',
        whatToInspect: 'Coolant pack frozen solidity, upright package orientation (never crushed), barrier preventing direct ice contact with retail box.',
        whatToRecord: 'Delivery ID (DEL-ID), assigned mode, rider/partner ID, dispatch timestamp, bag initial temp.',
        ifItFails: 'Do NOT dispatch with thawed gel packs or unstable vertical stacking on two-wheelers.',
        whoApprovesNext: 'Last-Mile Dispatch Supervisor',
        whatIsHandedOver: 'Thermal-protected delivery bag dispatched on prioritized route.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M09-ACT-2',
        title: 'Customer Handover & Digital POD Capture',
        whoPerforms: 'Delivery Rider / Van Driver & Customer Receiver',
        whatTheyDo: 'At customer doorstep/kitchen dock: scan Order QR, verify unit quantity, support customer product condition check, record delivery temperature and obtain digital customer acknowledgement (POD).',
        equipmentUsed: 'Rider mobile POD interface & thermometer',
        whatToInspect: 'Package seal integrity, zero visible leakage/crushing, customer presence.',
        whatToRecord: 'POD ID, handover timestamp, delivery temperature, quantity confirmed, customer sign/OTP, any immediate complaint flag.',
        ifItFails: 'If customer unavailable (SCN-19) or rejects order (SCN-21), log reason immediately in CRM/POD app, keep fruit inside insulated bag and contact Ops for return/redelivery authorization.',
        whoApprovesNext: 'Customer Acknowledgement (POD) / Ops Lead on exception',
        whatIsHandedOver: 'Delivered ICHIGO® order to Customer; Digital POD + any return cargo back to M10/M11.',
        status: 'PROPOSED DESIGN',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '9.1', action: 'Prioritize dispatch wave (location, commitment, priority, shelf life, economics).', owner: 'Dispatch Coordinator', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '9.2', action: 'Select delivery mode & pack into insulated bag + coolant packs.', owner: 'Dispatch + Rider', gateType: 'ACTION', status: 'SOURCE DOCUMENT PROPOSAL' },
      { stepNo: '9.3', action: 'Scan Delivery ID & execute prioritized route.', owner: 'Rider / 3PL', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '9.4', action: 'Perform handover: QR scan, qty check, condition check, temp recording, Digital POD.', owner: 'Rider + Customer', gateType: 'HANDOVER', status: 'PROPOSED DESIGN', note: 'Final delivery mode & doorstep procedure unfinalized.' },
      { stepNo: '9.5', action: 'If rejected/failed: log complaint immediately in delivery app & keep sealed cool for M10.', owner: 'Rider + Ops', gateType: 'DECISION', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Balance two-wheeler vibration risk vs dedicated van capacity for fragile B2B chef trays and VIP orders.',
      'Monitor active deliveries for Mumbai traffic delays threatening coolant hold duration.',
    ],
    sec09_qcResponsibilities: [
      'Audit coolant pack rotation so thawed packs never enter outbound bags.',
      'Review doorstep temperature logs to identify thermally vulnerable delivery zones.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Delivery ID & Mode Assignment', format: 'DEL-ID + Vehicle/Rider Mode', status: 'PROPOSED DESIGN' },
      { field: 'Digital Proof of Delivery (POD)', format: 'Timestamp + QR + Qty + Temp + Customer Ack', status: 'PROPOSED DESIGN' },
      { field: 'Bag Capacities & Doorstep Temp Limit', format: 'Thermal hold validation (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Dispatch & Doorstep POD Scan', idLevel: 'ORD-ID → DEL-ID → POD-ID', direction: 'Closes physical custody chain upon customer handover.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M09-1',
        gateTitle: 'Customer Doorstep Acceptance Gate',
        question: 'Does the customer verify quantity, condition and temperature and accept the order?',
        branches: [
          { condition: 'Order accepted cleanly', outcome: 'PASS', nextStep: 'Capture Digital POD & feed M11 Financial Closure.', owner: 'Rider + Customer', status: 'PROPOSED DESIGN' },
          { condition: 'Customer unavailable (SCN-19)', outcome: 'HOLD', nextStep: 'Hold inside sealed insulated bag; follow wait/redeliver/return call protocol with Ops.', owner: 'Rider + Ops Desk', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'Partial or full doorstep rejection (SCN-21)', outcome: 'REJECT', nextStep: 'Log delivery-person complaint entry + QR scan; return sealed fruit to M10 Quarantine QC.', owner: 'Rider + CRM/Ops', status: 'ILLUSTRATIVE SIMULATION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Doorstep Delivery Temp', criterion: 'UNKNOWN / NEEDS VERIFICATION (awaiting Mumbai ambient thermal bag validation)', sampling: 'Per delivery handover', failureAction: 'Flag excursion to Ops & M10 if rejected (OQ-21)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { parameter: 'Mode Selection Rules', criterion: 'UNKNOWN / NEEDS VERIFICATION (2W vs Public Transport vs Van vs 3PL)', sampling: 'Per dispatch wave', failureAction: 'Dispatch Supervisor assigns safest mode per fragile order (OQ-20)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Customer unavailable at doorstep (SCN-19)', trigger: 'Wrong slot or uncontactable receiver', impact: 'Perishable exposure in traffic & failed drop cost', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Insulated bag/coolant fails (SCN-20)', trigger: 'Under-frozen ice pack or >2h route delay', impact: 'Berry softening prior to chef/D2C opening', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Customer rejects partial order (SCN-21)', trigger: 'Visible bruising or wrong count', impact: 'Triggers M10 return & M11 credit note', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Confirm customer delivery availability via automated pre-dispatch alert.',
      'Pre-freeze coolant bottles strictly for validated hours before route load.',
    ],
    sec16_correctiveActions: [
      'Authorize immediate replacement dispatch from MIDC for Tier-1 hospitality rejections.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Customer unreachable for >10 mins at doorstep', notifyRole: 'Last-Mile Dispatch Coordinator', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Call alternate contact or reschedule', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Coolant failure or VIP B2B rejection at handover', notifyRole: 'M2Labo Operations Lead', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Authorize urgent replacement or refund', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M09-CHK-1', phase: 'BEFORE', instruction: 'Confirm pre-frozen ice/coolant packs, insulated bag cleanliness and prioritized route list.', required: true, assignedRole: 'Rider / Driver', supervisorRole: 'Dispatch Coordinator', mandatoryReadingLabel: 'Bag Starting Temp', mandatoryReadingUnit: '°C', status: 'SOURCE DOCUMENT PROPOSAL' },
      { id: 'M09-CHK-2', phase: 'DURING', instruction: 'Keep insulated bag zippered shut between drops and avoid direct sun or tilting cartons.', required: true, assignedRole: 'Rider / Driver', supervisorRole: 'Dispatch Coordinator', status: 'PROPOSED DESIGN' },
      { id: 'M09-CHK-3', phase: 'AFTER', instruction: 'Scan Order QR, verify qty & condition with customer, record temp and capture Digital POD.', required: true, assignedRole: 'Rider + Customer', supervisorRole: 'Dispatch Coordinator', qrRequired: true, mandatoryReadingLabel: 'Handover Temp', mandatoryReadingUnit: '°C', status: 'PROPOSED DESIGN' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M09-SUP-1', check: 'Reconcile all returned/undelivered parcels and Digital POD exceptions at shift close.', signOffCriteria: '100% Delivery IDs closed or handed to M10', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Last-Mile Rider / Partner',
      toRole: 'End Customer (Normal) OR M10 Quarantine Returns Desk (Exceptions)',
      physicalItem: 'Insulated-delivered ICHIGO® order',
      digitalRecord: 'Digital POD ID + Handover Temp + Customer Ack (or Exception Flag)',
      acknowledgement: 'Customer Digital Signature/OTP',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Digital Proof of Delivery (POD-ID)',
      'Doorstep Temperature & Condition Log',
      'Immediate Exception / Return Initiation (if rejected)',
    ],
    sec22_dependencies: {
      upstream: ['M08 Staged Orders'],
      downstream: ['M10 Reverse Logistics (on exception)', 'M11 Financial Closure'],
      crossCutting: ['OQ-20: Last-mile modes', 'OQ-21: Thermal bag/temp limits', 'OQ-22: Rejection policy'],
    },
    sec23_kpis: [
      { id: 'M09-K1', name: 'Cost per Delivery', formula: 'Last-Mile Fleet & Coolant Cost / Completed Deliveries', unit: 'INR/drop', dataSource: 'Dispatch & Finance', frequency: 'Weekly', owner: 'Logistics Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M09-K2', name: 'On-Time Delivery %', formula: 'Drops Within Promised Window / Total Drops × 100', unit: '%', dataSource: 'POD Timestamps', frequency: 'Daily', owner: 'Dispatch Coordinator', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Validate thermal hold duration of insulated bags + coolant bottles across Mumbai seasonal peaks.',
      'Benchmark damage rates across two-wheelers vs dedicated vans before locking last-mile mix.',
    ],
    sec25_openQuestions: ['OQ-20: Hybrid delivery mode split', 'OQ-21: Delivery temp threshold', 'OQ-22: Customer rejection rules'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 9)', excerpt: '2-wheelers, public transport, vans, 3PL considered; insulated bags + ice packs; POD concept with QR, qty, condition, temp; details unfinalized.', status: 'PROPOSED DESIGN' },
    ],
  },
  {
    id: 'M10',
    number: '10',
    code: 'M10-REV',
    title: 'Reverse Logistics & Customer Complaints',
    shortTitle: 'Reverse Logistics',
    facilityZone: 'CRM Desk + MIDC Quarantine Returns Inspection Zone',
    primaryOwner: 'Operations Lead, CRM Desk & MIDC Return QC (Proposed)',
    has3DContext: 'warehouse-transport',
    stationTelemetry: {
      targetTemp: 'Quarantine Hold (Never Auto-Sellable)',
      cycleWindow: 'Same-Day Triage & Decision',
      qrAnchor: 'ORD-ID + BATCH-QR → CMP-ID',
      keyOutput: 'QC Reclassification + Refund/Replace',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 9',
      validationOwner: 'Food Safety Lead & Operations Head',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Non-negotiable rule enforced: Returned fruit must NEVER automatically re-enter Sellable Stock.' },
      ],
    },
    sec01_processOverview:
      'Manages customer complaints, delivery-person exception logs and physical product returns from CRM intake through order/batch QR linking, operations assessment, return pickup (if required), quarantined QC inspection, non-sellable inventory reclassification, replacement/refund authorization and financial adjustment.',
    sec02_purposeAndImportance:
      'Protects consumer food safety by enforcing a strict quarantine lock so returned fruit NEVER automatically re-enters Sellable Stock, while resolving customer issues quickly to protect repeat B2B/D2C retention.',
    sec03_entryConditions: [
      'Customer submits complaint via CRM/channel OR Delivery Rider logs rejection/damage at M09 handover.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Complaint / Return Record', spec: 'Linked to Order ID & Shipment/Batch QR', status: 'PROPOSED DESIGN' },
      { item: 'Returned Physical Berries (if collected)', spec: 'Delivered strictly to MIDC Quarantine Zone', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'Central CRM Ticket System', purpose: 'Log customer & rider complaints linked to Batch/Order QR', status: 'PROPOSED DESIGN' },
      { name: 'MIDC Quarantine Return QC Bench', purpose: 'Separate inspection area away from Zone 1 Sellable Stock', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M10-ACT-1',
        title: 'CRM Intake, QR Trace Link & Ops Assessment',
        whoPerforms: 'CRM Coordinator / Delivery Rider + Operations Lead',
        whatTheyDo: 'Create CRM ticket linked to Order ID and Shipment/Batch/Punnet QR; attach customer or rider photos; assess whether physical return collection is required and issue replacement/refund track.',
        equipmentUsed: 'CRM workspace, Order Traceability lookup',
        whatToInspect: 'Order ID, underlying Farm Batch QR, delivery POD timestamp & temperature, complaint photos.',
        whatToRecord: 'Complaint ID (CMP-ID), root batch ID, pickup decision, customer resolution choice.',
        ifItFails: 'Do NOT leave unlinked complaints orphaned without Batch ID — escalate missing QR traces.',
        whoApprovesNext: 'Operations Manager',
        whatIsHandedOver: 'Return Collection Order (if collected) OR direct Replacement/Refund Instruction.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M10-ACT-2',
        title: 'Quarantined Return QC & Non-Sellable Reclassification',
        whoPerforms: 'MIDC Return QC Inspector & Supervisor',
        whatTheyDo: 'Receive returned stock strictly at Quarantine Bench (BLOCKED from Zone 1 Sellable), inspect fruit condition & thermal history, classify strictly into Value-Addition or Scrap/Waste, and trigger Finance Credit Note.',
        equipmentUsed: 'Quarantine scale, QC log, QR scanner',
        whatToInspect: 'Return thermal continuity, mould/fermentation, packaging breach.',
        whatToRecord: 'Return QC disposition, inventory reclassification transaction, closure note.',
        ifItFails: 'If temperature history is unreliable or missing (SCN-22), automatically condemn to Scrap/Waste.',
        whoApprovesNext: 'QC Lead + Operations Head',
        whatIsHandedOver: 'Financial adjustment trigger (Credit Note / Refund approval) to M11 Finance.',
        status: 'CONFIRMED IN PROJECT DISCUSSION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '10.1', action: 'Capture Customer Complaint or Delivery-Person Entry in Central CRM.', owner: 'CRM / Rider', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '10.2', action: 'Link ticket directly to Order ID & Shipment/Batch QR.', owner: 'CRM / Ops', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
      { stepNo: '10.3', action: 'Operations assesses root cause & decides if physical return collection is required.', owner: 'Operations Lead', gateType: 'DECISION', status: 'PROPOSED DESIGN' },
      { stepNo: '10.4', action: 'Returned fruit bypasses Zone 1 Sellable completely → enters Quarantine QC Inspection.', owner: 'MIDC Return QC', gateType: 'QC_GATE', status: 'CONFIRMED IN PROJECT DISCUSSION', note: 'Returned fruit MUST NOT auto re-enter sellable stock.' },
      { stepNo: '10.5', action: 'Reclassify to Value-Add or Scrap; authorize Replacement/Refund & link Financial Adjustment.', owner: 'Ops + Finance', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
      { stepNo: '10.6', action: 'Confirm customer closure & archive full root-cause audit.', owner: 'CRM Desk', gateType: 'HANDOVER', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Physically enforce zero contact between returned parcels and Zone 1 Sellable Stock.',
      'Trigger upstream batch checks at MIDC / Farm if multiple complaints cite the same Farm Batch ID.',
    ],
    sec09_qcResponsibilities: [
      'Inspect all physically returned fruit and downgrade any thermally unverified return straight to Scrap.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Complaint / Return ID (CMP-ID)', format: 'CRM ticket linked to ORD-ID + FB-BATCH-ID', status: 'PROPOSED DESIGN' },
      { field: 'Return Disposition & Food-Safety Rule', format: 'Detailed QA test policy (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Reverse Custody Quarantine Scan', idLevel: 'ORD-ID / PUN-ID → CMP-ID', direction: 'Traces defective punnet backwards to farm lot while permanently blocking Zone 1 re-entry.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M10-1',
        gateTitle: 'Returned Fruit Quarantine & Disposition Gate',
        question: 'Can returned berries pass strict food-safety verification for Value-Addition, or must they be scrapped?',
        branches: [
          { condition: 'Automatically blocked from Sellable Stock (Mandatory Rule)', outcome: 'HOLD', nextStep: 'Route 100% of returns to Quarantine QC Bench.', owner: 'MIDC Receiving', status: 'CONFIRMED IN PROJECT DISCUSSION' },
          { condition: 'Verified sound thermal chain + approved QA processing safety', outcome: 'DOWNGRADE', nextStep: 'Reclassify to Zone 3 Value-Addition Stock (criteria UNKNOWN).', owner: 'QC + Ops Lead', status: 'UNKNOWN / NEEDS VERIFICATION' },
          { condition: 'No reliable thermal history / bruised / mouldy (SCN-22)', outcome: 'REJECT', nextStep: 'Condemn to Zone 4 Scrap/Waste; witness disposal.', owner: 'QC Inspector', status: 'ILLUSTRATIVE SIMULATION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Sellable Re-Entry Prohibition', criterion: '0% of returned fruit may automatically re-enter Sellable Stock', sampling: '100% of returns', failureAction: 'System lock + physical quarantine audit', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { parameter: 'Food-Safety Criteria for Value-Add vs Scrap', criterion: 'UNKNOWN / NEEDS VERIFICATION', sampling: 'Every returned batch', failureAction: 'Default safely to Scrap/Waste until QA criteria signed (OQ-23)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Returned fruit has no reliable temperature history (SCN-22)', trigger: 'Broken seal or prolonged non-cooled transit return', impact: 'Food-safety risk if reused; mandatory Scrap', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'System rule locking any QR linked to POD delivery or Complaint ID against Zone 1 put-away.',
    ],
    sec16_correctiveActions: [
      'Investigate upstream Farm Batch / Linehaul Trip whenever ≥2 complaints hit one batch.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Isolated single-punnet quality complaint', notifyRole: 'CRM & Ops Coordinator', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Standard replacement/credit review', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Multi-customer batch failure or food-safety allegation', notifyRole: 'Operations Head & QA Lead', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Halt sales on entire Farm Batch ID', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M10-CHK-1', phase: 'BEFORE', instruction: 'Ensure Quarantine Return Zone is empty, labelled and physically separate from Zone 1 Sellable racks.', required: true, assignedRole: 'MIDC Return QC', supervisorRole: 'MIDC Supervisor', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { id: 'M10-CHK-2', phase: 'DURING', instruction: 'Log complaint in CRM, link Order ID + Batch QR, inspect return condition & thermal record.', required: true, assignedRole: 'CRM / Return QC', supervisorRole: 'Operations Lead', qrRequired: true, evidenceRequired: true, status: 'PROPOSED DESIGN' },
      { id: 'M10-CHK-3', phase: 'AFTER', instruction: 'Confirm return is routed ONLY to Value-Add or Scrap (never Sellable), trigger Finance adjustment & close CRM ticket.', required: true, assignedRole: 'Return QC + Ops', supervisorRole: 'Ops Lead', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M10-SUP-1', check: 'Audit daily return log: zero returned units entered Zone 1 Sellable.', signOffCriteria: '100% quarantine compliance', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Operations & Return QC',
      toRole: 'Finance Reconciliation Team (M11) & Customer',
      physicalItem: 'Reclassified stock (Scrap disposal or Value-Add) OR Replacement Order dispatched via M08/M09',
      digitalRecord: 'CMP-ID + QC Disposition + Approved Replacement/Refund/Credit Note Authorization',
      acknowledgement: 'Customer Closure Confirmation + Finance Adjustment Reference',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Linked CRM Complaint Record',
      'Quarantined Return QC Disposition',
      'Authorized Replacement / Refund / Credit Note Instruction',
    ],
    sec22_dependencies: {
      upstream: ['M09 Delivery / POD Exceptions', 'M07 Inventory Zones'],
      downstream: ['M11 Financial Closure & Credit Notes', 'M08 Replacement Fulfilment'],
      crossCutting: ['OQ-22: Customer rejection policy', 'OQ-23: Returns food-safety criteria'],
    },
    sec23_kpis: [
      { id: 'M10-K1', name: 'Complaint Resolution Time', formula: 'Avg(Closure TS - CRM Created TS)', unit: 'hours', dataSource: 'CRM Log', frequency: 'Weekly', owner: 'CRM & Ops Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
      { id: 'M10-K2', name: 'Customer Complaint Rate', formula: 'Orders with Complaint / Total Orders × 100', unit: '%', dataSource: 'CRM & Dispatch', frequency: 'Weekly', owner: 'Ops & CX Lead', target: 'UNKNOWN', status: 'PROPOSED DESIGN' },
    ],
    sec24_improvementOpportunities: [
      'Define objective food-safety tests for safe Value-Addition recovery vs mandatory Scrap.',
      'Build automated batch-recall alert when repeat complaints hit a single Farm Batch ID.',
    ],
    sec25_openQuestions: ['OQ-22: Customer rejection policy', 'OQ-23: Returns food-safety checks'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 9)', excerpt: 'Central CRM linked to order/batch QR; delivery-person complaint entry; returned fruit must NOT automatically re-enter sellable stock.', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
  },
  {
    id: 'M11',
    number: '11',
    code: 'M11-FIN',
    title: 'Financial Closure & Performance Analytics',
    shortTitle: 'Financial Closure',
    facilityZone: 'M2Labo Finance, Reconciliation & Executive Analytics',
    primaryOwner: 'Finance Controller & Operations Analyst (Proposed)',
    stationTelemetry: {
      targetTemp: 'Digital Ledger Close',
      cycleWindow: 'Daily Recon / Weekly P&L',
      qrAnchor: 'POD-ID + CMP-ID → INV/CN',
      keyOutput: 'Reconciled P&L & Unit Economics',
    },
    governance: {
      status: 'PROPOSED DESIGN',
      sourceDocument: 'M2Labo_Interactive_Blueprint_Master_Build_Brief.pdf',
      pageOrRef: 'pp. 3, 9',
      validationOwner: 'Finance Controller & Executive Leadership',
      validationDate: 'Pending Validation',
      approvalStatus: 'Pending Validation',
      processState: 'PROPOSED',
      revisionHistory: [
        { version: '1.0', date: '2026-11-20', note: 'Operations-to-Finance handoff, invoice/CN/refund reconciliation and 9-domain analytics structure captured; ERP details marked UNKNOWN.' },
      ],
    },
    sec01_processOverview:
      'Reconciles operational delivery records (PODs, returns, replacements and transport/delivery costs) with financial accounting records (invoices, payments, refunds and credit notes), and generates unit economics and end-to-end supply chain KPIs.',
    sec02_purposeAndImportance:
      'Prevents revenue leakage from unrecorded doorstep rejections or unlinked refunds, quantifies true cold-chain cost/kg and shrinkage, and drives continuous profitability improvement across B2B and D2C channels.',
    sec03_entryConditions: [
      'Completed M09 Digital POD records and delivery trip cost sheets.',
      'M10 approved replacements, refunds and return disposition records.',
      'HiMedia farm supply & linehaul invoices submitted.',
    ],
    sec04_inputsAndMaterials: [
      { item: 'Operations Records', spec: 'Delivery/return logs, PODs, replacements, trip & delivery costs', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { item: 'Finance Documents', spec: 'Customer invoices, gateway/bank payments, refunds, credit notes', status: 'CONFIRMED IN PROJECT DISCUSSION' },
    ],
    sec05_equipmentAndTools: [
      { name: 'ERP / Accounting Integration Layer (Proposed)', purpose: 'Link operational POD/Return IDs with Invoices & Credit Notes (platform UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
      { name: 'Unit Economics & KPI Analytics Workbook', purpose: 'Compute Net Realized Revenue, Cost/kg, Shrinkage & Contribution Margin', status: 'PROPOSED DESIGN' },
    ],
    sec06_workerActivities: [
      {
        id: 'M11-ACT-1',
        title: '3-Way Delivery, Invoice & Credit-Note Reconciliation',
        whoPerforms: 'Operations Analyst (feeds ops data) & Finance Reconciliation Officer',
        whatTheyDo: 'Match every Customer Invoice against M09 Digital POD quantity and M10 Credit Note/Refund approvals; reconcile linehaul, last-mile trip cost and packaging spend.',
        equipmentUsed: 'Finance Ledger / ERP (Proposed)',
        whatToInspect: 'Invoice vs POD quantity discrepancies, unapproved refunds lacking Credit Notes, missing trip cost allocations.',
        whatToRecord: 'Reconciled Invoice ID, Credit Note ID, Net Realized Revenue, payment status.',
        ifItFails: 'Freeze payout/close on unmatched invoices or unlinked refunds (SCN-23/24); route to Ops + Finance variance review.',
        whoApprovesNext: 'Finance Controller',
        whatIsHandedOver: 'Closed daily financial ledger & validated unit-economics feed.',
        status: 'PROPOSED DESIGN',
      },
      {
        id: 'M11-ACT-2',
        title: 'End-to-End KPI & Contribution Margin Reporting',
        whoPerforms: 'Finance & Operations Analytics Lead',
        whatTheyDo: 'Calculate Net Realized Revenue, Cost/kg, Cost per delivery, Trip cost, Shrinkage, Packaging cost, Value-Addition recovery and Contribution Margin across all 9 KPI domains.',
        equipmentUsed: 'Analytics Dashboard (All dashboard metrics currently ILLUSTRATIVE)',
        whatToInspect: 'Batch-to-batch shrinkage trends, transport option cost variance (Option A vs B), B2B vs D2C margin.',
        whatToRecord: 'Weekly Executive KPI Pack & Process Improvement Action Log.',
        ifItFails: 'Flag missing operational cost capture or undefined KPI formulas to department owners.',
        whoApprovesNext: 'Executive Leadership',
        whatIsHandedOver: 'Actionable feedback loop into M01 Pricing/Allocation and M06/M09 Route Economics.',
        status: 'ILLUSTRATIVE SIMULATION',
      },
    ],
    sec07_stepByStepWorkflow: [
      { stepNo: '11.1', action: 'Operations submits daily Delivery, POD, Return, Replacement & Trip Cost records.', owner: 'Operations Desk', gateType: 'HANDOVER', status: 'CONFIRMED IN PROJECT DISCUSSION' },
      { stepNo: '11.2', action: 'Finance matches Invoice Qty vs POD Qty & links Refunds to formal Credit Notes.', owner: 'Finance Officer', gateType: 'QC_GATE', status: 'PROPOSED DESIGN' },
      { stepNo: '11.3', action: 'Resolve mismatches (SCN-23 / SCN-24) prior to payment/period close.', owner: 'Finance + Ops', gateType: 'DECISION', status: 'ILLUSTRATIVE SIMULATION' },
      { stepNo: '11.4', action: 'Compute Net Realized Revenue, Cost/kg, Shrinkage, Value-Add Recovery & Contribution Margin.', owner: 'Finance Analyst', gateType: 'ACTION', status: 'PROPOSED DESIGN' },
    ],
    sec08_supervisorResponsibilities: [
      'Ensure zero refunds leave Finance without an M10-approved complaint reference and Credit Note.',
      'Audit all POD quantity adjustments monthly.',
    ],
    sec09_qcResponsibilities: [
      'Provide verified Shrinkage & Value-Addition mass-balance figures from M05, M07 and M10.',
    ],
    sec10_requiredDataAndRecords: [
      { field: 'Invoice / Payment / Credit Note Ledger', format: 'Linked to ORD-ID, POD-ID and CMP-ID', status: 'PROPOSED DESIGN' },
      { field: 'ERP Integration Architecture', format: 'Platform & API spec (UNKNOWN)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec11_qrBarcodeInteractions: [
      { scanEvent: 'Financial Closure Audit Trail', idLevel: 'POD-ID / CMP-ID → FIN-INV / FIN-CN', direction: 'Traces every rupee of revenue, shrinkage and credit note back to physical batch custody.', status: 'PROPOSED DESIGN' },
    ],
    sec12_decisionGates: [
      {
        id: 'DG-M11-1',
        gateTitle: '3-Way Financial Reconciliation Gate',
        question: 'Do Invoice Quantity, Digital POD Quantity and Approved Credit Notes balance 100%?',
        branches: [
          { condition: 'Invoice = POD + Approved CN/Refunds', outcome: 'PASS', nextStep: 'Close financial record & update Net Realized Revenue.', owner: 'Finance Officer', status: 'PROPOSED DESIGN' },
          { condition: 'Refund issued without Credit Note (SCN-23)', outcome: 'HOLD', nextStep: 'Freeze adjustment, link M10 CRM ticket, issue retrospective Credit Note & audit approval.', owner: 'Finance Controller', status: 'ILLUSTRATIVE SIMULATION' },
          { condition: 'Invoice Qty != POD Qty (SCN-24)', outcome: 'ESCALATE', nextStep: 'Verify M09 doorstep rejection/shortage log before billing B2B account.', owner: 'Finance + Ops Desk', status: 'ILLUSTRATIVE SIMULATION' },
        ],
      },
    ],
    sec13_acceptanceCriteria: [
      { parameter: 'Invoice-to-POD Match', criterion: '100% reconciliation prior to B2B statement dispatch', sampling: 'All invoices', failureAction: 'Hold billing; verify M09 POD & M10 claim', status: 'PROPOSED DESIGN' },
      { parameter: 'ERP & KPI Target Definitions', criterion: 'UNKNOWN / NEEDS VERIFICATION (targets & ERP platform unfinalized)', sampling: 'Period close', failureAction: 'Label all sample analytics ILLUSTRATIVE SIMULATION (OQ-24, OQ-25)', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec14_failureAndExceptions: [
      { mode: 'Refund issued without corresponding Credit Note (SCN-23)', trigger: 'Ad-hoc customer refund outside ERP', impact: 'Tax/GST mismatch & overstated realized revenue', status: 'ILLUSTRATIVE SIMULATION' },
      { mode: 'Invoice quantity does not match POD (SCN-24)', trigger: 'Unrecorded partial doorstep rejection', impact: 'B2B customer disputes & delayed collections', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec15_preventiveControls: [
      'Enforce mandatory M10 Complaint ID + Approval tag before Finance executes any refund.',
    ],
    sec16_correctiveActions: [
      'Run automated daily exception report flagging unmatched POD vs Invoice quantities.',
    ],
    sec17_escalationMatrix: [
      { level: 'L1', trigger: 'Single POD vs Invoice quantity discrepancy', notifyRole: 'Finance Reconciliation Officer & Ops', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Verify signed POD & adjust', status: 'PROPOSED DESIGN' },
      { level: 'L2', trigger: 'Unreconciled refund > threshold or recurring batch shrinkage', notifyRole: 'Finance Controller & Executive Head', responseTarget: 'UNKNOWN / NEEDS VERIFICATION', authority: 'Audit controls & adjust channel pricing', status: 'UNKNOWN / NEEDS VERIFICATION' },
    ],
    sec18_workerChecklist: [
      { id: 'M11-CHK-1', phase: 'BEFORE', instruction: 'Confirm all M09 POD logs, M10 return authorizations and trip cost sheets are received from Operations.', required: true, assignedRole: 'Finance Officer', supervisorRole: 'Finance Controller', status: 'PROPOSED DESIGN' },
      { id: 'M11-CHK-2', phase: 'DURING', instruction: 'Reconcile invoices, gateway payments, refunds and credit notes against POD and complaint IDs.', required: true, assignedRole: 'Finance Officer', supervisorRole: 'Finance Controller', qrRequired: true, status: 'PROPOSED DESIGN' },
      { id: 'M11-CHK-3', phase: 'AFTER', instruction: 'Publish Net Realized Revenue, Cost/kg, Shrinkage, Value-Add Recovery and Contribution Margin summary.', required: true, assignedRole: 'Finance Analyst', supervisorRole: 'Finance Controller', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec19_supervisorChecklist: [
      { id: 'M11-SUP-1', check: 'Approve all Credit Notes and verify zero unlinked refunds exist.', signOffCriteria: '100% 3-way match', status: 'PROPOSED DESIGN' },
    ],
    sec20_handoverRequirements: {
      fromRole: 'Finance Controller & Analytics Lead',
      toRole: 'Executive Leadership & M01 Demand Planning (Feedback Loop)',
      physicalItem: 'None (Closed Financial & Analytics Reporting Package)',
      digitalRecord: 'Reconciled P&L, Net Realized Revenue, Cost/kg, Shrinkage & 9-Domain KPI Pack',
      acknowledgement: 'Executive Period Close Sign-off',
      status: 'PROPOSED DESIGN',
    },
    sec21_outputs: [
      'Reconciled Invoices, Payments & Credit Notes',
      'Unit Economics (Cost/kg, Cost/Delivery, Trip Cost)',
      'Net Realized Revenue, Shrinkage & Contribution Margin Analytics',
    ],
    sec22_dependencies: {
      upstream: ['M09 POD & Delivery Costs', 'M10 Returns, Replacements & Refunds', 'M06 Linehaul Costs'],
      downstream: ['M01 Customer Profitability Weighting & Pricing'],
      crossCutting: ['OQ-24: ERP integration', 'OQ-25: Approved KPI targets'],
    },
    sec23_kpis: [
      { id: 'M11-K1', name: 'Net Realized Revenue', formula: 'Gross Sales - Credit Notes - Refunds', unit: 'INR', dataSource: 'ERP / Finance', frequency: 'Weekly', owner: 'Finance Controller', target: 'UNKNOWN', status: 'ILLUSTRATIVE SIMULATION' },
      { id: 'M11-K2', name: 'Contribution Margin %', formula: '(Net Revenue - COGS - Packaging - Cold-Chain Logistics) / Net Revenue × 100', unit: '%', dataSource: 'Finance & Ops', frequency: 'Weekly', owner: 'Executive / Finance', target: 'UNKNOWN', status: 'ILLUSTRATIVE SIMULATION' },
      { id: 'M11-K3', name: 'End-to-End Cost/kg & Value-Add Recovery', formula: 'Total Supply Chain Cost / Sold kg', unit: 'INR/kg', dataSource: 'Finance & MIDC', frequency: 'Weekly', owner: 'Finance Analyst', target: 'UNKNOWN', status: 'ILLUSTRATIVE SIMULATION' },
    ],
    sec24_improvementOpportunities: [
      'Select & integrate lightweight ERP/accounting workflow connecting Order ID → POD → Credit Note automatically.',
      'Quantify exact Value-Addition revenue recovery to turn downgraded stock into margin.',
    ],
    sec25_openQuestions: ['OQ-24: ERP/Accounting integration', 'OQ-25: Final KPI definitions & targets'],
    sec26_sourceReferences: [
      { source: 'Master Build Brief (pp. 3, 9)', excerpt: 'Operations records delivery/returns/POD/costs; Finance reconciles invoices/payments/refunds/credit notes; ERP integration & KPI targets unfinalized.', status: 'PROPOSED DESIGN' },
    ],
  },
];
