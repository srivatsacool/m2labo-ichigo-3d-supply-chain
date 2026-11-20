import { OperationalStation } from '../data/types';

export const OVERVIEW_CAMERA = {
  position: [-7, 62, 83] as [number, number, number],
  target: [-6, 1.5, -3.0] as [number, number, number],
};

export const OPERATIONAL_STATIONS: OperationalStation[] = [
  {
    id: 'ST-01',
    number: '01',
    title: 'Farm-to-M2Labo Custody Handover',
    shortTitle: 'Custody Handover',
    zoneLabel: 'Farm Boundary Gate & Empty-Crate Receipt Bay',
    custodyBanner: 'M2LABO CUSTODY BEGINS HERE',
    position3D: [-56.0, 0, -14.0],
    cameraPos3D: [-49.5, 13.5, 2.5],
    cameraLookAt3D: [-56.0, 1.8, -14.0],
    explorerWaypoint3D: [-47.5, 0, -8.5],
    explorerLookAt3D: [-56.0, 1.5, -14.0],
    firstPersonSpawn3D: [-48.0, 1.68, -9.5],
    firstPersonLookAt3D: [-56.0, 1.4, -14.0],
    heroCloseUpPos3D: [-52.8, 4.2, -9.8],
    heroCloseUpTarget3D: [-56.2, 1.15, -14.2],
    summary:
      'Physical and legal custody boundary where pre-packed fresh strawberries from the upstream farm counterparty pass into M2Labo operational responsibility, and where returning empty reusable crates from MIDC (Flow A) are received and accounted for. Upstream farming, harvesting, blast cooling and farm grading remain strictly outside M2Labo operational control.',
    visualAssetsList: [
      'Upstream Strawberry Farm Boundary & Collection Barn (Outside Custody)',
      'Custody Handover Archway: "M2LABO CUSTODY BEGINS HERE"',
      'Fresh Strawberry Crates & Supporting Yellow ICBOX Transport Containers',
      'North Empty-Crate Return Receipt Bay (Flow A Loop Closure)',
      'M2Labo Receiving Representative & Farm Dispatch Counterparty',
      'Pedestal QR Scanner & Digital Acceptance Terminal',
    ],
    materialMovement: {
      inputs: [
        'Pre-graded & pre-packed fresh strawberry master crates/cartons presented by Farm Counterparty (2L / L / M / S in 250g punnets)',
        'Flow A Reverse Return: Consolidated empty reusable crates returning from MIDC via Line-Haul truck',
      ],
      actions: [
        'Physical count of strawberry crates & supporting ICBOX units against declared farm dispatch manifest',
        'Visual inspection of outer packaging condition and fresh strawberry presentation',
        'Optional intake temperature check / farm thermal evidence review if supplied',
        'Receive and reconcile returned empty reusable crates arriving from MIDC on reverse truck leg',
      ],
      outputs: [
        'Accepted fresh strawberry crates cleared across the custody threshold for outbound Line-Haul loading',
        'Held/rejected packages returned to Farm Counterparty prior to M2Labo custody transfer',
        'Returned empty crates accounted and released back into farm packing circulation',
      ],
      assetsInvolved: [
        'Fresh Strawberry Master Crates',
        'Supporting Yellow ICBOX Insulated Containers',
        'Handover Loading Dock & Empty-Crate Receipt Bay',
        'QR Scanning Device & Digital Acceptance Kiosk',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'SHP-ID (Shipment) + FB-BATCH-ID (Upstream Batch Ref)',
      erpEvents: [
        'Custody Handover Initiated & Accepted / Held / Rejected',
        'Declared vs Physical Strawberry Count Reconciled',
        'Flow A Empty-Crate Return Receipt & Crate Balance Posted',
      ],
      crmEvents: [
        'Links incoming confirmed farm strawberry supply volume against consolidated Mumbai channel demand allocation',
      ],
      scanAnchors: ['Farm Batch QR → Crate/Carton QR → M2Labo Shipment ID'],
    },
    operationalRoles: [
      {
        role: 'Farm Dispatch Counterparty',
        responsibility: 'Presents packed strawberry shipment, declared manifest count and any farm thermal evidence; co-signs custody release and empty-crate return receipt.',
        status: 'Confirmed Concept',
      },
      {
        role: 'M2Labo Receiving Representative',
        responsibility: 'Performs physical count, condition/packaging check, QR scan, acceptance decision and empty-crate return reconciliation.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Shipment Identity', sampleValue: 'SHP-MUM-20261120-01 (Conceptual)', category: 'SOURCE_DEFINED' },
      { label: 'Upstream Batch Identity', sampleValue: 'FB-HM-20261120-A / Grades 2L, L, M, S', category: 'SOURCE_DEFINED' },
      { label: 'Package Count', sampleValue: '24 Master Crates / Cartons', category: 'SOURCE_DEFINED' },
      { label: 'Declared vs Counted Qty', sampleValue: '131.0 kg Declared vs 131.0 kg Physical', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Visible & Packaging Condition', sampleValue: 'Dry cartons, intact seals, fresh bright berries', category: 'SOURCE_DEFINED' },
      { label: 'Supplied Temperature Evidence', sampleValue: '5.3°C Farm Dispatch Log (if supplied)', category: 'PROPOSED_DEVELOPMENT', note: 'Sensor verification method pending validation' },
      { label: 'Empty-Crate Return Receipt (Flow A)', sampleValue: 'Empty Reusable Crates Reconciled at Farm Bay', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Handover Decision', sampleValue: 'ACCEPTED / HOLD / REJECTED', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Farm Supply Fulfilment Variance %',
        formula: '(Physically Accepted kg − Declared / Planned Supply kg) ÷ Planned kg × 100',
        decisionValue: 'Quantifies upstream farm delivery reliability at the exact moment M2Labo takes financial/custody risk.',
      },
      {
        metricName: 'Reusable Crate Return Cycle Balance',
        formula: 'Empty Crates Received at Farm ÷ Outbound Crates Dispatched × 100',
        decisionValue: 'Tracks Flow A crate circulation efficiency between MIDC and Farm.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Exact temperature tolerance & acceptable visible defect limit allowing M2Labo representative to reject at farm gate.',
      'PROCESS DECISION REQUIRED: Formal sign-off authority & digital acknowledgement workflow between HiMedia dispatch and M2Labo representative.',
    ],
  },
  {
    id: 'ST-02',
    number: '02',
    title: 'Line-Haul Transport & Empty-Crate Return',
    shortTitle: 'Line-Haul',
    zoneLabel: 'Dual-Lane Farm ↔ MIDC Highway Corridor (~4–5 Hrs)',
    position3D: [-28.0, 0, -16.0],
    cameraPos3D: [-28.0, 15.5, 4.0],
    cameraLookAt3D: [-28.0, 1.6, -19.5],
    explorerWaypoint3D: [-28.0, 0, -9.0],
    explorerLookAt3D: [-28.0, 1.4, -16.5],
    firstPersonSpawn3D: [-28.0, 1.68, -9.8],
    firstPersonLookAt3D: [-28.0, 1.6, -16.0],
    heroCloseUpPos3D: [-24.0, 5.2, -9.5],
    heroCloseUpTarget3D: [-28.0, 1.8, -15.6],
    summary:
      'Inter-city dual-lane cold-chain corridor (~4–5 hours planned transit). Outbound lane (Green) transports fresh strawberries in crates & supporting ICBOX units via Option A (Refrigerated Van) or Option B (Normal Van + insulated containers/coolants) to Andheri MIDC. Reverse lane (Flow A — Turquoise) returns consolidated empty crates from MIDC back to the Farm.',
    visualAssetsList: [
      'Outbound Refrigerated Line-Haul Truck Loaded with Strawberry Crates',
      'Flow A Reverse Return Truck Carrying Stacked Empty Crates (Zero Strawberries)',
      'Dual-Carriageway Highway with Median Divider & Telemetry Gantry',
      'GPS & Thermal Monitoring Beacon Pillars',
      'Roadside Thermal Check Lay-by with Supporting Yellow ICBOX Reference',
    ],
    materialMovement: {
      inputs: [
        'Outbound: Accepted fresh strawberry crates & supporting ICBOX units from Station 01',
        'Flow A Return: Consolidated empty reusable transport crates staged at MIDC Station 03',
      ],
      actions: [
        'Pre-cool cargo bay or condition insulated containers and place temperature logger',
        'Execute ~4–5 hour outbound highway transit preserving fresh strawberry cold envelope',
        'Flow A Reverse Leg: Load empty reusable crates at MIDC and haul back to Farm receipt bay',
      ],
      outputs: [
        'Sealed chilled strawberry shipment arriving at Andheri MIDC Inbound Receiving Dock',
        'Empty reusable crates returned to Farm (ST-01) for reuse accounting',
      ],
      assetsInvolved: [
        'Refrigerated Van / Normal Van + Supporting ICBOX Containers',
        'Reusable Transport Crates (Outbound Filled / Return Empty)',
        'GPS & Temperature Logger',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'TRP-ID (Line-Haul Trip) + Empty-Crate Return Dispatch Ref',
      erpEvents: [
        'Transport Mode Assigned (Option A Reefer vs Option B Insulated)',
        'Outbound Strawberry Dispatch & Driver Acknowledged',
        'GPS Ping & Temperature Telemetry / Excursion Logged',
        'Flow A Empty-Crate Return Trip Dispatched (MIDC → Farm)',
      ],
      crmEvents: [
        'Early ETA delay notice propagated to downstream B2B/D2C dispatch planning if > buffer',
      ],
      scanAnchors: ['SHP-ID + Logger ID + Vehicle Plate → Driver Dispatch Scan'],
    },
    operationalRoles: [
      {
        role: 'Farm Dispatch / M2Labo Transport Coordinator',
        responsibility: 'Jointly decides Option A vs Option B based on volume & economics; activates logger, logs outbound dispatch and tracks empty-crate return.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Line-Haul Driver',
        responsibility: 'Acknowledges strawberry load count/condition, maintains thermal seal en route, and executes Flow A empty-crate return haul to Farm.',
        status: 'Confirmed Concept',
      },
    ],
    keyDataShown: [
      { label: 'Trip Identity', sampleValue: 'TRP-LH-20261120-01 (Conceptual)', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Vehicle & Mode', sampleValue: 'Option A Reefer Van (vs Option B Insulated)', category: 'SOURCE_DEFINED', note: 'Volume breakeven threshold unconfirmed' },
      { label: 'Driver Identity', sampleValue: 'Assigned Line-Haul Driver + Mobile ID', category: 'SOURCE_DEFINED' },
      { label: 'Dispatch / Planned / Actual Arrival', sampleValue: '14:00 IST → ~18:35 IST (~4–5h est.)', category: 'SOURCE_DEFINED' },
      { label: 'Temperature Logger Events', sampleValue: '4.9°C → 5.5°C conceptual curve', category: 'SOURCE_DEFINED', note: 'IoT live vs USB logger hardware unconfirmed' },
      { label: 'Flow A Return Load', sampleValue: 'Empty Reusable Crates Only (MIDC → Farm)', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Transport Cost Reference', sampleValue: 'Per-trip freight + coolant cost', category: 'DERIVED_METRIC' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Line-Haul Cost per Delivered kg',
        formula: 'Total Trip Freight & Coolant Cost ÷ Net Received Weight at MIDC (kg)',
        decisionValue: 'Establishes the exact kg breakeven between Option A Refrigerated Van and Option B Insulated Boxes.',
      },
      {
        metricName: 'Transit Thermal Stability & Delay Impact',
        formula: 'Correlation of Transit Duration (hrs) vs MIDC Receiving QC Reject %',
        decisionValue: 'Quantifies highway delay risk and justifies standby rescue vehicle SLAs.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Exact kg/carton volume threshold & approval authority choosing Option A Refrigerated Van vs Option B Insulated Van.',
      'PROCESS DECISION REQUIRED: Temperature logger hardware choice (live cellular alert vs post-arrival USB read) and highway breakdown rescue SOP.',
    ],
  },
  {
    id: 'ST-03',
    number: '03',
    title: 'Andheri MIDC Receiving and QC',
    shortTitle: 'MIDC Receiving & QC',
    zoneLabel: 'Andheri MIDC Inbound Dock, QC Lab & Empty-Crate Bay',
    position3D: [-4.0, 0, -16.0],
    cameraPos3D: [-5.5, 13.5, 0.5],
    cameraLookAt3D: [-4.0, 1.6, -16.5],
    explorerWaypoint3D: [-4.0, 0, -8.0],
    explorerLookAt3D: [-4.0, 1.4, -16.0],
    firstPersonSpawn3D: [-4.2, 1.68, -8.8],
    firstPersonLookAt3D: [-3.2, 1.35, -16.0],
    heroCloseUpPos3D: [-0.8, 4.4, -10.8],
    heroCloseUpTarget3D: [-1.6, 1.25, -15.6],
    summary:
      'Mumbai urban hub intake gate. Receiving staff unload strawberry shipments, separate fresh strawberry punnets from emptied reusable transport crates (consolidating empty crates at the North Bay for Flow A return to Farm), verify all 6 mandatory receiving checks, weigh samples, and execute QC triage.',
    visualAssetsList: [
      'MIDC Warehouse Inbound Receiving Dock & Rollers',
      'Fresh Strawberry QC Inspection Benches & Graded Sample Trays',
      'North Empty-Crate Consolidation & Return Loading Bay (Flow A)',
      'Pedestal QR Scanner Gate & Precision Digital Weighing Scale',
      'Supporting Yellow ICBOX Insulated Transport Containers',
      'Receiving Staff, QC Inspector & Warehouse Supervisor',
    ],
    materialMovement: {
      inputs: [
        'Incoming Line-Haul fresh strawberry crates + supporting ICBOX units + physical temperature logger from Station 02',
      ],
      actions: [
        'Unload strawberry crates into chilled receiving bay and scan every incoming package QR',
        'Separate fresh strawberries from reusable crates and consolidate empty crates in North Return Bay for Flow A truck reload',
        'Download/verify arrival temperature evidence and conduct precision weighing + fresh strawberry QC inspection',
        'Classify defects (bruising, mould, softening, weight shortfall) into disposition paths',
      ],
      outputs: [
        'Cleared fresh strawberries routed to Full Sellable Stock (Station 04 Zone 1)',
        'Recoverable damaged units routed to Reshuffling Buffer (Zone 2); soft ripe berries to Value-Add (Zone 3); mouldy units locked in Scrap (Zone 4)',
        'Consolidated empty reusable crates loaded onto returning Line-Haul truck (Flow A → Farm)',
      ],
      assetsInvolved: [
        'Fresh Strawberry Inspection Trays',
        'Empty Reusable Crate Consolidation Bay',
        'QR Scanner & Precision Weighing Scale',
        'QC Inspection Lab Bench & Temperature Logger Reader',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'RCV-ID (MIDC Receiving Record)',
      erpEvents: [
        '6 Mandatory Receiving Checks Logged (QR, Arrival/Vehicle, Temp, Pack Damage, Qty, Fruit QC)',
        'Manifest Discrepancy & Missing/Damaged Package Recorded',
        'QC Disposition Split Posted (Accepted / Reshuffling / Value-Add / Scrap / Hold)',
        'Empty Crates Consolidated & Checked Out for Flow A Return Truck',
      ],
      crmEvents: [
        'Available-to-promise supply shortfall flag emitted to Order Desk if receiving yield drops below commitment',
      ],
      scanAnchors: ['SHP-ID + CRT-ID Scan → RCV-ID Creation'],
    },
    operationalRoles: [
      {
        role: 'MIDC Receiving Staff',
        responsibility: 'Unloads vehicle, captures arrival timestamp/vehicle details, executes QR scans and consolidates empty crates for Farm return.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'MIDC QC Inspector',
        responsibility: 'Verifies arrival temperature evidence, packaging damage, checkweights and strawberry defect classification.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'MIDC Warehouse Supervisor',
        responsibility: 'Oversees receiving reconciliation, approves Hold/Quarantine exceptions and authorizes put-away.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Incoming Package Scans', sampleValue: '24/24 Master Crate QRs Reconciled', category: 'SOURCE_DEFINED' },
      { label: 'Manifest Reconciliation', sampleValue: 'Declared 131.0 kg vs Received 131.0 kg', category: 'SOURCE_DEFINED' },
      { label: 'Empty Crates Staged (Flow A)', sampleValue: 'Consolidated Empty Crates → Return Truck', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Arrival Temperature Evidence', sampleValue: '5.5°C Arrival Logger Trace', category: 'SOURCE_DEFINED' },
      { label: 'QC Defect Classification', sampleValue: 'Bruising 1.9% | Softening 1.1% | Mould 0.4%', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Disposition Decision', sampleValue: 'Accepted / Reshuffling / Value-Add / Scrap / Hold', category: 'SOURCE_DEFINED' },
    ],
    analysisOpportunities: [
      {
        metricName: 'MIDC Receiving Discrepancy & Defect Rate',
        formula: '(Shortage kg + QC Failed kg) ÷ Line-Haul Dispatched kg × 100',
        decisionValue: 'Pinpoints whether quality loss stems from upstream packing or line-haul thermal/vibration stress (ST-02).',
      },
      {
        metricName: 'First-Pass Receiving Yield %',
        formula: 'Direct Full Sellable kg ÷ Total Received kg × 100',
        decisionValue: 'Measures net ready-to-sell strawberry volume entering Mumbai inventory.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Exact sampling %, defect tolerances and food-safety cutoffs separating Accepted, Reshuffling, Value-Add and Scrap.',
      'PROCESS DECISION REQUIRED: Confirmed staffing & final sign-off authority across Receiving Staff, QC Inspector and Supervisor.',
    ],
  },
  {
    id: 'ST-04',
    number: '04',
    title: 'Inventory and Reshuffling',
    shortTitle: 'Inventory & Buckets',
    zoneLabel: 'MIDC 4-Bucket Cold Storage & Ledger',
    position3D: [18.0, 0, -16.0],
    cameraPos3D: [18.0, 16.5, 2.5],
    cameraLookAt3D: [18.0, 1.6, -16.0],
    explorerWaypoint3D: [18.0, 0, -7.2],
    explorerLookAt3D: [18.0, 1.5, -16.0],
    firstPersonSpawn3D: [18.0, 1.68, -7.8],
    firstPersonLookAt3D: [18.0, 1.5, -16.5],
    heroCloseUpPos3D: [13.5, 5.0, -11.5],
    heroCloseUpTarget3D: [13.4, 1.4, -19.0],
    summary:
      'Physically segregated 4-bucket cold-room inventory management governed by FIFO / FEFO and batch-wise stock ledger transactions. Enforces a hard architectural lock so quarantined, rejected or scrap strawberries NEVER appear as available customer inventory.',
    visualAssetsList: [
      'Zone 1 (Green): Full Sellable Fresh Strawberry Racks with Visible FIFO Lanes',
      'Zone 2 (Cyan): Reshuffling Buffer Stock & Selective Strawberry Sorting Bench',
      'Zone 3 (Amber): Value Addition Strawberry Stock Zone',
      'Zone 4 (Red — Walled/Locked): Scrap / Waste Containment Zone',
      'Chilled Evaporator Units & Zone QR Scanning Stations',
    ],
    materialMovement: {
      inputs: ['QC-triaged fresh strawberry crates/punnets from Station 03 receiving'],
      actions: [
        'Put away clean fresh strawberries into Zone 1 Full Sellable Stock sequenced by FIFO arrival & batch age',
        'Isolate partially damaged punnets in Zone 2 Reshuffling Buffer for selective sound-berry repacking',
        'Segregate soft/ripe processing strawberries into Zone 3 Value Addition Stock',
        'Lock condemned/mouldy fruit inside walled Zone 4 Scrap / Waste for witnessed disposal',
      ],
      outputs: [
        'FIFO-ordered Full Sellable Strawberries released exclusively to Station 05 Order Picking',
        'Reworked punnets (subject to QC/Supervisor approval) or Value-Add/Scrap disposal balances',
      ],
      assetsInvolved: [
        'Cold-Storage Strawberry Shelving Racks',
        'FIFO Lane Markers',
        'Zone QR Scanning Stations',
        'Segregated Pallets & Bins',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'INV-TXN-ID (Stock-Ledger Transaction) + Bucket Code',
      erpEvents: [
        'Bucket Put-Away Posted (Sellable / Reshuffling / Value-Add / Scrap)',
        'FIFO / FEFO Batch Rank Assigned',
        'Cross-Bucket Reclassification Logged (Requires Approval Gate)',
        'Zero-Leakage Guardrail Enforced on Non-Sellable Buckets',
      ],
      crmEvents: [
        'Exposes ONLY Bucket 1 (Full Sellable Stock) balance as Available-to-Promise to Sales/Order channels',
      ],
      scanAnchors: ['CRT-ID / PUN-ID + Zone Bin QR → INV-TXN-ID'],
    },
    operationalRoles: [
      {
        role: 'MIDC Inventory Controller',
        responsibility: 'Executes bin scans, enforces FIFO lane rotation and reconciles physical vs digital bucket balances.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'MIDC Warehouse Supervisor & QC Lead',
        responsibility: 'Authorizes any cross-bucket reclassification (e.g., Reshuffling Buffer → Sellable or Scrap write-off).',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Bucket 1 — Full Sellable Stock', sampleValue: '126.5 kg (Available-to-Promise, FIFO)', category: 'SOURCE_DEFINED' },
      { label: 'Bucket 2 — Reshuffling Buffer Stock', sampleValue: '2.5 kg (Held for Repack)', category: 'SOURCE_DEFINED' },
      { label: 'Bucket 3 — Value Addition Stock', sampleValue: '1.5 kg (Processing Channel)', category: 'SOURCE_DEFINED' },
      { label: 'Bucket 4 — Scrap / Waste Stock', sampleValue: '0.5 kg (Locked / Zero ATP)', category: 'SOURCE_DEFINED' },
      { label: 'Stock-Ledger Transaction', sampleValue: 'INV-TXN-20261120-089 (Batch FIFO)', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Hard Segregation Rule', sampleValue: 'Quarantine/Reject/Scrap NEVER Sellable', category: 'SOURCE_DEFINED' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Inventory Ageing & FIFO Compliance %',
        formula: 'Batches Picked in Strict Oldest-Harvest Order ÷ Total Picks × 100',
        decisionValue: 'Prevents premature spoilage by ensuring oldest cold-room strawberry stock ships first.',
      },
      {
        metricName: 'Reshuffling Recovery & Shrinkage Yield',
        formula: 'Recovered Sellable kg from Zone 2 ÷ Total Zone 2 Input kg × 100',
        decisionValue: 'Measures labour vs margin efficiency of repacking vs routing directly to Value-Add.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Cross-bucket approval matrix authorizing movement from Reshuffling Buffer back to Full Sellable Stock.',
      'PROCESS DECISION REQUIRED: Exact tie-break rule combining FIFO (arrival order), FEFO (remaining shelf life) and batch-wise allocation.',
    ],
  },
  {
    id: 'ST-05',
    number: '05',
    title: 'Customer Order, Picking and Packing',
    shortTitle: 'Order & Packing',
    zoneLabel: 'MIDC Strawberry Packing & Black-Bag Dispatch Bay',
    position3D: [20.0, 0, 10.0],
    cameraPos3D: [20.0, 14.0, 27.0],
    cameraLookAt3D: [20.0, 1.5, 10.0],
    explorerWaypoint3D: [11.5, 0, 10.0],
    explorerLookAt3D: [20.0, 1.4, 10.0],
    firstPersonSpawn3D: [12.0, 1.68, 10.2],
    firstPersonLookAt3D: [20.2, 1.35, 10.0],
    heroCloseUpPos3D: [21.5, 4.4, 15.8],
    heroCloseUpTarget3D: [20.2, 1.2, 10.2],
    summary:
      'Converts consolidated B2B and D2C customer orders into FIFO-verified picking lists from Full Sellable Strawberries, binds Punnet/Carton QRs to Customer Order IDs, applies channel-specific B2C/B2B packing, and transfers packed orders into reusable black insulated delivery bags (Flow B) with frozen coolant inserts.',
    visualAssetsList: [
      'FIFO Strawberry Picking Shelves (Zone 1 Feed)',
      'Strawberry Packing Tables with B2C Black 250g/500g Cartons & B2B Cavity Trays',
      'Black Insulated Delivery Bag Staging & Transfer Racks (Flow B)',
      'Frozen Coolant Insert Pool & Dispatch Verification QR Arch',
      'Pickers, Packing Operators & Dispatch Verifier',
    ],
    materialMovement: {
      inputs: [
        'Reserved Full Sellable Strawberries (2L, L, M, S grades in 250g punnets) from Station 04',
        'Sanitized reusable black insulated delivery bags & pre-frozen coolant packs from Station 07 pool',
      ],
      actions: [
        'Allocate oldest qualifying strawberry batch (FIFO verification) to customer order lines',
        'Pick grade-specific strawberry punnets and scan QR codes to Customer Order ID',
        'Apply B2C (2 × 250g black boxes in 500g carton) or B2B protective cavity tray packing',
        'Transfer packed strawberries + frozen coolants into serialized black insulated delivery bag for rider pickup',
      ],
      outputs: [
        'QR-verified strawberry orders packed inside black insulated delivery bags ready for Last-Mile Dispatch (Flow B)',
      ],
      assetsInvolved: [
        'Fresh Graded Strawberries (2L / L / M / S)',
        'B2C Black Cartons & B2B Cavity Trays',
        'Reusable Black Insulated Delivery Bags & Coolant Packs',
        'Packing Benches & Dispatch Verification Arch',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'ORD-ID (Customer Order) + PCK-ID (Pick/Pack Manifest)',
      erpEvents: [
        'Batch Allocated & Full Sellable Strawberry Stock Reserved',
        'FIFO Sequence Verified & Picked Quantities Scanned',
        'B2C / B2B Packaging Format Confirmed',
        'Black Insulated Delivery Bag & Coolant Asset ID Bound to Order for Flow B Return Tracking',
      ],
      crmEvents: [
        'CRM Customer Order Lines (Hospitality / Chef / Patisserie / Retail / D2C) synced to MIDC Picking Desk',
        'Order Status transitions: Confirmed → Picked → Packed → Dispatch Ready',
      ],
      scanAnchors: ['PUN-ID / CRT-ID → ORD-ID + BLACK-BAG-ID'],
    },
    operationalRoles: [
      {
        role: 'MIDC Order Picker',
        responsibility: 'Retrieves exact strawberry grade (2L/L/M/S) strictly from Zone 1 Sellable racks following FIFO queue.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Packing Operator & Dispatch Checker',
        responsibility: 'Verifies B2C vs B2B pack integrity, confirms exact unit count, packs black insulated delivery bag + coolants and approves rider handover.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Customer Order & Lines', sampleValue: 'ORD-MUM-20261120-412 (2 × 500g B2C Grade 2L)', category: 'SOURCE_DEFINED' },
      { label: 'Batch & Stock Reservation', sampleValue: 'LOT-2L-01 Reserved from Zone 1 Sellable', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'FIFO Verification', sampleValue: 'Earliest Release Batch Verified (Pass)', category: 'SOURCE_DEFINED' },
      { label: 'Pick & Quantity Verification', sampleValue: '4 × 250g Strawberry Punnets QR-Verified', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'B2C vs B2B Pack Format', sampleValue: 'B2C Black 500g Carton vs B2B Cavity Tray', category: 'SOURCE_DEFINED' },
      { label: 'Black Delivery Bag Allocation', sampleValue: 'BAG-MUM-014 (Black Insulated) + 2 Coolants', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Order Picking & Grade Accuracy %',
        formula: 'Orders Passed Final Dispatch Check Error-Free ÷ Total Picked Orders × 100',
        decisionValue: 'Eliminates wrong-grade or B2C/B2B format mixups before leaving the warehouse.',
      },
      {
        metricName: 'Fulfilment Cycle Time (Pick → Stage)',
        formula: 'Dispatch Staging Timestamp − Order Release Timestamp',
        decisionValue: 'Optimizes morning cut-off waves ahead of Mumbai peak traffic.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Final split vs combined role workflow and checker approval authority for Order Fulfilment.',
      'PROCESS DECISION REQUIRED: Standardized coolant-pack count and black insulated bag capacity matrix by ambient season and drop duration.',
    ],
  },
  {
    id: 'ST-06',
    number: '06',
    title: 'Last-Mile Delivery',
    shortTitle: 'Last-Mile Delivery',
    zoneLabel: 'Mumbai Urban Delivery District & Customer Drop',
    position3D: [52.0, 0, 10.0],
    cameraPos3D: [47.5, 15.5, 28.0],
    cameraLookAt3D: [52.0, 1.8, 10.0],
    explorerWaypoint3D: [42.5, 0, 10.0],
    explorerLookAt3D: [52.0, 1.8, 10.0],
    firstPersonSpawn3D: [43.0, 1.68, 10.5],
    firstPersonLookAt3D: [52.0, 1.6, 10.0],
    heroCloseUpPos3D: [47.2, 4.6, 14.5],
    heroCloseUpTarget3D: [51.2, 1.25, 10.0],
    summary:
      'Final cold-chain delivery leg across Mumbai. Two-wheeler delivery riders carry packed fresh strawberries securely inside reusable black insulated delivery bags with coolants (alongside vans / hybrid modes under evaluation), conclude with temperature check & Digital POD, and retain the empty black delivery bag for Flow B return to MIDC.',
    visualAssetsList: [
      'Two-Wheeler Delivery Rider with Black Insulated Delivery Bag',
      'Customer Handover Presentation of Fresh Packed Strawberry Boxes',
      'B2B Luxury Hospitality & Patisserie Drop + D2C Residential Tower',
      'Urban Delivery Avenue, Crosswalks & Streetscape',
    ],
    materialMovement: {
      inputs: ['Sealed B2C/B2B strawberry orders packed inside black insulated delivery bags + coolant packs from Station 05'],
      actions: [
        'Dispatch rider/vehicle on route prioritized by location, delivery commitment, priority, shelf life and economics',
        'Maintain zipped thermal containment in black insulated delivery bag throughout urban transit',
        'Hand over fresh strawberry punnets/cartons, check condition & temperature, capture POD, and retain empty black bag for return',
      ],
      outputs: [
        'Accepted fresh strawberry order delivered to B2B or D2C customer',
        'Flow B Reverse Return: Rider carries empty reusable black insulated delivery bag back to MIDC (ST-07)',
      ],
      assetsInvolved: [
        'Delivery Two-Wheeler & Rider',
        'Reusable Black Insulated Delivery Bag (NOT ICBOX)',
        'Coolant Packs & Mobile POD Terminal',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'DEL-ID (Last-Mile Trip) → POD-ID (Proof of Delivery)',
      erpEvents: [
        'Last-Mile Trip Dispatched (Mode, Rider, Black Bag ID, Timestamp)',
        'Customer Arrival & Handover Temperature Logged',
        'Accepted vs Rejected Strawberry Qty Recorded on Digital POD',
        'Flow B Reusable Black Delivery Bag Marked for MIDC Return',
      ],
      crmEvents: [
        'Customer Delivery Status updated (Delivered / Partial Rejection / Failed Drop)',
        'Immediate doorstep complaint/rejection trigger emitted to CRM when Accepted < Dispatched',
      ],
      scanAnchors: ['ORD-ID + BLACK-BAG-ID → POD-ID (Customer Sign / OTP)'],
    },
    operationalRoles: [
      {
        role: 'Last-Mile Dispatch Coordinator',
        responsibility: 'Prioritizes route clusters and assigns delivery mode (2W with black insulated bag, van, nearby public transport, or 3PL).',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Delivery Rider & Customer Receiver',
        responsibility: 'Executes thermal strawberry handover from black insulated bag, captures handover temperature, Digital POD and returns reusable black bag to MIDC.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Last-Mile Trip & Rider', sampleValue: 'LMD-MUM-20261120-19 | Mode: 2W Black Bag', category: 'SOURCE_DEFINED', note: 'Final fleet mix unconfirmed' },
      { label: 'Order & Dispatch / Arrival Time', sampleValue: 'ORD-412 | 07:35 → 08:48 IST', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Handover Temperature Reading', sampleValue: '5.9°C Bag/Doorstep Check', category: 'PROPOSED_DEVELOPMENT', note: 'Doorstep threshold unconfirmed' },
      { label: 'Digital Proof of Delivery (POD)', sampleValue: 'POD-MUM-20261120-19 (OTP/Sign)', category: 'SOURCE_DEFINED' },
      { label: 'Accepted vs Rejected Quantity', sampleValue: 'Accepted: 4 Punnets | Rejected: 0', category: 'SOURCE_DEFINED' },
      { label: 'Flow B Black Bag Return', sampleValue: 'BAG-MUM-014 Returning with Rider → MIDC', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Last-Mile Cost per Drop & Mode Damage Rate',
        formula: 'Total Last-Mile Cost ÷ Delivered Orders; Rejection % segmented by Delivery Mode',
        decisionValue: 'Determines whether two-wheelers with black insulated bags or vans yield better net margin after claims.',
      },
      {
        metricName: 'First-Attempt On-Time Delivery %',
        formula: 'Clean PODs Within Promised Window ÷ Total Dispatched Drops × 100',
        decisionValue: 'Tracks customer SLA reliability across Mumbai zones.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Final last-mile operating model across two-wheelers, public transport (nearby), vans and 3PL partners.',
      'PROCESS DECISION REQUIRED: Maximum permissible doorstep handover temperature and waiting/redelivery policy when customer is unavailable.',
    ],
  },
  {
    id: 'ST-07',
    number: '07',
    title: 'Returns, Black-Bag Intake & Quarantine',
    shortTitle: 'Returns & Quarantine',
    zoneLabel: 'Flow B Rider Bag Return Intake & MIDC Quarantine Firewall',
    position3D: [-4.0, 0, 14.0],
    cameraPos3D: [-5.5, 14.5, 30.5],
    cameraLookAt3D: [-4.0, 1.5, 14.0],
    explorerWaypoint3D: [4.5, 0, 15.5],
    explorerLookAt3D: [-4.0, 1.4, 14.0],
    firstPersonSpawn3D: [4.2, 1.68, 16.5],
    firstPersonLookAt3D: [-4.0, 1.35, 14.0],
    heroCloseUpPos3D: [0.5, 4.6, 20.5],
    heroCloseUpTarget3D: [-2.0, 1.2, 14.5],
    summary:
      'Receives and records reusable black insulated delivery bags returned by last-mile riders (Flow B — strictly separate from Flow A Farm empty-crate truck returns), and manages quarantined customer complaints/rejections behind a mandatory food-safety firewall: returned strawberries MUST NEVER automatically re-enter Full Sellable Stock.',
    visualAssetsList: [
      'Flow B Returning Rider Lane & Black Insulated Delivery Bag Intake Rack',
      'Physically Walled Quarantine Receiving Station (Zero Auto-Sellable)',
      'Returned Black Bag Inspection, Sanitization & Coolant Re-Freeze Bay',
      'Quarantined Strawberry Return QC Inspection Bench',
    ],
    materialMovement: {
      inputs: [
        'Flow B: Empty reusable black insulated delivery bags & thawed coolants returned by riders from Station 06',
        'Rejected/returned strawberry punnets from Station 06 (when return pickup authorized)',
      ],
      actions: [
        'Receive, scan and record returned black insulated delivery bags from riders; route to cleaning & coolant re-freeze',
        'Route any returned strawberry packages strictly into walled Quarantine Bay (physically blocked from Zone 1)',
        'Inspect returned fruit condition and thermal continuity; condemn unverified returns to Scrap/Waste',
        'Pick and dispatch authorized replacement order via Express Fulfilment lane when approved',
      ],
      outputs: [
        'Clean reusable black insulated delivery bags & re-frozen coolants returned to Station 05 Dispatch Pool',
        'Returned fruit disposed via Zone 4 Scrap/Waste OR approved Value-Addition (NEVER auto-sellable)',
      ],
      assetsInvolved: [
        'Returning Rider & Empty Black Insulated Delivery Bags',
        'Quarantine Receiving Bench & QR Scanner',
        'Bag Sanitization & Coolant Re-Freeze Rack',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'CMP-ID (Complaint Case) + BAG-RET-ID / RET-QRN-ID',
      erpEvents: [
        'Flow B Black Delivery Bag Return Recorded & Condition Checked',
        'Mandatory Quarantine Scan (System Lock Against Zone 1 Sellable)',
        'Return QC Final Disposition Recorded (Value-Add or Scrap Only)',
        'Replacement Order & Credit Note Authorization Sent to Station 08 Finance',
      ],
      crmEvents: [
        'Complaint Case Logged (Central CRM or Delivery-Rider Entry)',
        'Linked to Customer, Order ID, Punnet/Batch QR and Rejection Reason',
        'Return Authorization & Customer Closure Status Recorded',
      ],
      scanAnchors: ['BLACK-BAG-ID → BAG-RET | ORD-ID + BATCH-QR → CMP-ID → QRN-SCAN'],
    },
    operationalRoles: [
      {
        role: 'CRM Coordinator / Delivery Rider',
        responsibility: 'Returns black delivery bag at MIDC intake; captures complaint details, photos, rejection reason and links record directly to Order + Batch QR.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Operations Lead & Return QC Inspector',
        responsibility: 'Authorizes return pickup or replacement run; records reusable black bag recovery and issues final non-sellable fruit disposition.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Flow B Black Bag Return Record', sampleValue: 'BAG-MUM-014 Received & Sanitized at MIDC', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Complaint Case & Customer', sampleValue: 'CMP-MUM-20261120-03 | Account #MUM-8841', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Order & Batch Traceability', sampleValue: 'ORD-412 → PUN-0084 → FB-HM-20261120-A', category: 'SOURCE_DEFINED' },
      { label: 'Quarantine Scan & Inspection', sampleValue: 'QRN-SCAN (Blocked from Sellable Inventory)', category: 'SOURCE_DEFINED' },
      { label: 'Final Disposition', sampleValue: 'Scrap / Waste (or Value-Add if verified)', category: 'SOURCE_DEFINED' },
      { label: 'Credit Note & Replacement Run', sampleValue: 'CN-03 Triggered | Express Replacement Dispatched', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Root-Batch Complaint Clustering Rate',
        formula: 'Complaints per Farm Batch ID ÷ Total Punnets Shipped from Batch × 100',
        decisionValue: 'Detects upstream harvest, cooling, or line-haul issues across multiple Mumbai customers immediately.',
      },
      {
        metricName: 'Black Insulated Bag & Coolant Recovery Rate',
        formula: 'Black Bags Returned Intact to MIDC ÷ Bags Dispatched × 100',
        decisionValue: 'Prevents silent loss of reusable last-mile delivery bags and coolant assets (Flow B).',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Food-safety inspection policy defining whether any returned product may safely enter Value-Addition vs mandatory Scrap.',
      'PROCESS DECISION REQUIRED: Customer return/replacement vs refund threshold policy across B2B hospitality and D2C channels.',
    ],
  },
  {
    id: 'ST-08',
    number: '08',
    title: 'Financial Reconciliation',
    shortTitle: 'Finance Nexus',
    zoneLabel: 'Digital ERP / Ledger Information Pavilion',
    isDigitalStation: true,
    position3D: [-32.0, 0, 14.0],
    cameraPos3D: [-32.0, 14.0, 29.5],
    cameraLookAt3D: [-32.0, 2.0, 14.0],
    explorerWaypoint3D: [-24.0, 0, 14.5],
    explorerLookAt3D: [-32.0, 1.8, 14.0],
    firstPersonSpawn3D: [-24.5, 1.68, 15.0],
    firstPersonLookAt3D: [-32.0, 2.0, 14.0],
    heroCloseUpPos3D: [-27.5, 5.2, 21.0],
    heroCloseUpTarget3D: [-32.0, 2.4, 14.0],
    summary:
      'Digital information hub (not a physical production facility) connecting physical custody events—delivered strawberry POD quantities, returns, shrinkage, crate & bag asset balances, and logistics trips—with invoices, credit notes, payments and unit-economics margin.',
    visualAssetsList: [
      'Digital Reconciliation Operations Pavilion & Plinth',
      'Holographic Financial Pillars (Orders, POD, Invoices, Credit Notes, Costs, Margin)',
      'Elevated Digital ERP/CRM Conduit Network Linking Stations 01–07',
    ],
    materialMovement: {
      inputs: ['Digital station only — receives physical mass-balance totals, POD deliveries, crate/bag recovery records and return dispositions digitally'],
      actions: [
        '3-way reconcile Customer Orders, Delivered Quantities (Digital POD) and Issued Invoices',
        'Bind approved Credit Notes and Gateway/Bank Refunds to authorized Complaint IDs',
        'Aggregate Line-Haul costs, Last-Mile costs, Packaging costs, Shrinkage and Value-Add recovery',
      ],
      outputs: ['Reconciled P&L ledger, Net Realized Revenue and Contribution Margin per channel/batch'],
      assetsInvolved: ['Digital Financial Telemetry Plinth (Conceptual ERP/Accounting Interface)'],
    },
    informationFlowSummary: {
      primaryEntityId: 'FIN-INV-ID / FIN-CN-ID (3-Way Matched Financial Document)',
      erpEvents: [
        'Invoice Matched to Signed POD Delivered Quantity',
        'Credit Note Linked to CRM Complaint Disposition',
        'Payment / Refund Settlement Reconciled',
        'Logistics, Packaging & Shrinkage Cost Allocation Closed',
      ],
      crmEvents: [
        'Feeds customer-level net profitability & dispute history back to B2B/D2C account management',
      ],
      scanAnchors: ['ORD-ID + POD-ID + CMP-ID → FIN-INV / FIN-CN'],
    },
    operationalRoles: [
      {
        role: 'Operations Analyst / Coordinator',
        responsibility: 'Submits verified delivery logs, POD adjustments, return authorizations and trip/delivery cost sheets.',
        status: 'Confirmed Concept',
      },
      {
        role: 'Finance Controller / Reconciliation Officer',
        responsibility: 'Executes invoice/payment/credit-note matching, locks unauthorized refunds and reports Contribution Margin.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Orders & Delivered Qty (POD)', sampleValue: 'ORD-412 ↔ POD-19 (3-Way Matched)', category: 'SOURCE_DEFINED' },
      { label: 'Invoices, Credit Notes & Payments', sampleValue: 'FIN-INV-412 | FIN-CN-03 | Settled', category: 'SOURCE_DEFINED' },
      { label: 'Line-Haul & Last-Mile Costs', sampleValue: 'Trip + Drop Fleet Costs Logged', category: 'SOURCE_DEFINED' },
      { label: 'Packaging Cost Allocation', sampleValue: 'B2C 500g Carton vs B2B Tray Cost', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Shrinkage & Value-Add Recovery', sampleValue: 'Scrap Loss vs Zone 3 Recovery Credit', category: 'DERIVED_METRIC' },
      { label: 'Contribution Margin', sampleValue: 'Net Revenue − COGS − Pack − Cold Logistics', category: 'DERIVED_METRIC' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Net Realized Revenue & Contribution Margin %',
        formula: '(Gross Sales − Credit Notes − Refunds − COGS − Packaging − Logistics) ÷ Net Revenue × 100',
        decisionValue: 'Reveals true unit profitability across B2B hotels, restaurants, retailers and D2C households.',
      },
      {
        metricName: 'End-to-End Cold-Chain Cost per Sold kg',
        formula: '(Line-Haul + MIDC Storage + Packaging + Last-Mile + Shrinkage) ÷ Net Delivered kg',
        decisionValue: 'Guides pricing floors and transport mode selection.',
      },
    ],
    unresolvedDecisions: [
      'PROCESS DECISION REQUIRED: Target ERP / accounting system integration architecture and automated invoice-to-POD sync cadence.',
      'PROCESS DECISION REQUIRED: Approved KPI target thresholds across Cost/kg, Shrinkage % and Contribution Margin %.',
    ],
  },
];

export function getStationById(id: string): OperationalStation {
  return OPERATIONAL_STATIONS.find((s) => s.id === id) ?? OPERATIONAL_STATIONS[0];
}
