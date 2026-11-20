import { OperationalStation } from '../data/types';

export const OVERVIEW_CAMERA = {
  position: [0, 25, 31] as [number, number, number],
  target: [0, 0.5, 0] as [number, number, number],
};

export const OPERATIONAL_STATIONS: OperationalStation[] = [
  {
    id: 'ST-01',
    number: '01',
    title: 'Farm-to-M2Labo Custody Handover',
    shortTitle: 'Custody Handover',
    zoneLabel: 'Upstream Origin Boundary Gate',
    custodyBanner: 'M2LABO CUSTODY BEGINS HERE',
    position3D: [-20.5, 0, -4.0],
    cameraPos3D: [-18.5, 8.2, 6.2],
    cameraLookAt3D: [-20.5, 1.4, -4.0],
    summary:
      'Physical and legal custody boundary where pre-packed strawberries from the upstream farm counterparty pass into M2Labo operational responsibility. Upstream farming, harvesting, blast cooling and farm grading remain strictly outside M2Labo operational control.',
    visualAssetsList: [
      'Upstream Farm Counterparty Facade (Boundary Only)',
      'Custody Handover Gantry: "M2LABO CUSTODY BEGINS HERE"',
      'Raised Handover Dock Platform',
      'Product Crates (B2C Black 250g/500g Cartons & B2B Cavity Crates)',
      'M2Labo Receiving Representative & Farm Dispatch Counterparty',
      'Pedestal QR Scanner & Digital Acceptance Terminal',
    ],
    materialMovement: {
      inputs: [
        'Pre-graded & pre-packed strawberry master crates/cartons presented by Farm Counterparty (2L / L / M / S in 250g punnets)',
        'B2C cartons (2 × 250g black branded boxes = 500g) and B2B protective cavity trays/crates',
      ],
      actions: [
        'Physical count of master packages against declared farm dispatch manifest',
        'Visual inspection of outer packaging condition and visible berry presentation',
        'Optional intake temperature check / farm thermal evidence review if supplied',
        'Custody acceptance, conditional hold, or gate rejection decision',
      ],
      outputs: [
        'Accepted shipment crates cleared across the custody threshold for Line-Haul loading',
        'Held/rejected packages returned to Farm Counterparty prior to M2Labo custody transfer',
      ],
      assetsInvolved: [
        'Handover Platform',
        'QR Scanning Device',
        'Digital Acceptance Kiosk',
        'Master Crates & Cartons',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'SHP-ID (Shipment) + FB-BATCH-ID (Upstream Batch Reference)',
      erpEvents: [
        'Custody Handover Initiated',
        'Declared vs Physical Count Reconciled',
        'Handover Acceptance / Hold / Rejection Recorded',
      ],
      crmEvents: [
        'Links incoming confirmed farm supply volume against consolidated Mumbai channel demand allocation',
      ],
      scanAnchors: ['Farm Batch QR → Carton/Crate QR → M2Labo Shipment ID'],
    },
    operationalRoles: [
      {
        role: 'Farm Dispatch Counterparty',
        responsibility: 'Presents packed shipment, declared manifest count and any farm thermal evidence; co-signs custody release.',
        status: 'Confirmed Concept',
      },
      {
        role: 'M2Labo Receiving Representative',
        responsibility: 'Performs physical count, condition/packaging check, QR scan and acceptance/hold/rejection decision.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Shipment Identity', sampleValue: 'SHP-MUM-20261120-01 (Conceptual)', category: 'SOURCE_DEFINED' },
      { label: 'Upstream Batch Identity', sampleValue: 'FB-HM-20261120-A / Grades 2L, L, M, S', category: 'SOURCE_DEFINED' },
      { label: 'Package Count', sampleValue: '24 Master Crates / Cartons', category: 'SOURCE_DEFINED' },
      { label: 'Declared vs Counted Qty', sampleValue: '131.0 kg Declared vs 131.0 kg Physical', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Visible & Packaging Condition', sampleValue: 'Dry cartons, intact seals, zero crush', category: 'SOURCE_DEFINED' },
      { label: 'Supplied Temperature Evidence', sampleValue: '5.3°C Farm Dispatch Log (if supplied)', category: 'PROPOSED_DEVELOPMENT', note: 'Sensor verification method pending validation' },
      { label: 'Sender & Receiver', sampleValue: 'Farm Counterparty → M2Labo Rep', category: 'SOURCE_DEFINED' },
      { label: 'Handover Decision', sampleValue: 'ACCEPTED / HOLD / REJECTED', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Farm Supply Fulfilment Variance %',
        formula: '(Physically Accepted kg − Declared / Planned Supply kg) ÷ Planned kg × 100',
        decisionValue: 'Quantifies upstream farm delivery reliability at the exact moment M2Labo takes financial/custody risk.',
      },
      {
        metricName: 'At-Gate Rejection Rate',
        formula: 'Packages Rejected at Handover ÷ Total Packages Presented × 100',
        decisionValue: 'Prevents damaged or warm product from entering M2Labo cold-chain transport.',
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
    title: 'Line-Haul Transport',
    shortTitle: 'Line-Haul',
    zoneLabel: 'Farm-to-MIDC Highway Corridor (~4–5 Hrs)',
    position3D: [-11.0, 0, -5.2],
    cameraPos3D: [-10.5, 8.2, 6.2],
    cameraLookAt3D: [-11.0, 1.2, -5.2],
    summary:
      'Inter-city cold-chain highway leg (~4–5 hours planned transit) transporting accepted strawberry shipments from the handover gate to Andheri MIDC Hub via Option A (Refrigerated Van) or Option B (Normal Van with insulated/thermocol boxes and cooling packs).',
    visualAssetsList: [
      'Low-Poly Line-Haul Transport Van (Option A Reefer / Option B Insulated)',
      'Low-Poly Transport Driver',
      'Stacked Strawberry Shipment Crates',
      'Connected Highway Network & Route Kilometre Markers',
      'GPS & Thermal Monitoring Beacon Pillars',
    ],
    materialMovement: {
      inputs: [
        'Accepted shipment crates/cartons from Station 01',
        'Pre-cooled refrigerated van (Option A) OR insulated/thermocol boxes + frozen cooling packs (Option B)',
      ],
      actions: [
        'Pre-cool cargo bay or condition insulated boxes and place temperature logger',
        'Load crates without crushing delicate punnets and verify driver dispatch acknowledgement',
        'Execute ~4–5 hour highway transit with active thermal preservation and GPS monitoring',
      ],
      outputs: [
        'Sealed cold-chain shipment arriving at Andheri MIDC Receiving Dock',
        'Continuous trip temperature trace and incident log',
      ],
      assetsInvolved: [
        'Refrigerated Van / Normal Van + Insulated Boxes',
        'Ice / Cooling Packs',
        'GPS & Temperature Logger',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'TRP-ID (Line-Haul Trip) linked to SHP-ID',
      erpEvents: [
        'Transport Mode Assigned (Option A vs Option B)',
        'Vehicle Dispatched & Driver Acknowledged',
        'GPS Ping & Temperature Telemetry / Excursion Logged',
        'Highway Arrival Timestamp Recorded',
      ],
      crmEvents: [
        'Early ETA delay notice propagated to downstream B2B/D2C dispatch planning if > buffer',
      ],
      scanAnchors: ['SHP-ID + Logger ID + Vehicle Plate → Driver Dispatch Scan'],
    },
    operationalRoles: [
      {
        role: 'Farm Dispatch / M2Labo Transport Coordinator',
        responsibility: 'Jointly decides Option A vs Option B based on volume & economics; activates logger and logs dispatch.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Line-Haul Driver',
        responsibility: 'Acknowledges shipment count/condition, drives route, maintains thermal seal and reports delays/excursions.',
        status: 'Confirmed Concept',
      },
    ],
    keyDataShown: [
      { label: 'Trip Identity', sampleValue: 'TRP-LH-20261120-01 (Conceptual)', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Vehicle & Mode', sampleValue: 'Option A Reefer Van (vs Option B Insulated)', category: 'SOURCE_DEFINED', note: 'Volume breakeven threshold unconfirmed' },
      { label: 'Driver Identity', sampleValue: 'Assigned Line-Haul Driver + Mobile ID', category: 'SOURCE_DEFINED' },
      { label: 'Dispatch / Planned / Actual Arrival', sampleValue: '14:00 IST → ~18:35 IST (~4–5h est.)', category: 'SOURCE_DEFINED' },
      { label: 'GPS & Live Location Events', sampleValue: 'Corridor telemetry waypoints', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Temperature Logger Events', sampleValue: '4.9°C → 5.5°C conceptual curve', category: 'SOURCE_DEFINED', note: 'IoT live vs USB logger hardware unconfirmed' },
      { label: 'Route Changes / Delays / Incidents', sampleValue: 'Traffic / Breakdown flags', category: 'PROPOSED_DEVELOPMENT' },
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
    zoneLabel: 'Andheri MIDC Inbound Dock & QC Lab',
    position3D: [-1.5, 0, -4.5],
    cameraPos3D: [-2.8, 8.0, 4.8],
    cameraLookAt3D: [-1.5, 1.2, -4.5],
    summary:
      'Mumbai urban hub intake gate. Receiving staff unload line-haul shipments, verify all 6 mandatory receiving checks, weigh samples, reconcile crate manifests and execute QC triage before stock enters any inventory bucket.',
    visualAssetsList: [
      'MIDC Warehouse West Receiving Dock',
      'Pedestal & Handheld QR Scanner Gate',
      'Cold-Storage Airlock Entrance',
      'QC Inspection Table & Berry Sample Trays',
      'Precision Digital Weighing Scale',
      'Low-Poly Receiving Staff, QC Inspector & Warehouse Supervisor',
    ],
    materialMovement: {
      inputs: [
        'Incoming Line-Haul Shipment crates/cartons + physical temperature logger from Station 02',
      ],
      actions: [
        'Unload shipment into chilled receiving bay and scan every incoming package QR',
        'Reconcile physical count against dispatch manifest (flag missing or damaged packages)',
        'Download/verify arrival temperature evidence and conduct precision weighing + QC fruit inspection',
        'Classify defects (bruising, mould, softening, weight shortfall) into disposition paths',
      ],
      outputs: [
        'Cleared crates routed to Full Sellable Stock (Station 04 Zone 1)',
        'Recoverable damaged units routed to Reshuffling Buffer (Zone 2)',
        'Soft/overripe sound berries routed to Value-Addition Stock (Zone 3)',
        'Mouldy/contaminated units quarantined into Scrap / Waste (Zone 4)',
      ],
      assetsInvolved: [
        'Receiving Dock',
        'QR Scanner',
        'Precision Weighing Scale',
        'QC Inspection Table',
        'Temperature Logger Reader',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'RCV-ID (MIDC Receiving Record)',
      erpEvents: [
        '6 Mandatory Receiving Checks Logged (QR, Arrival/Vehicle, Temp, Pack Damage, Qty, Fruit QC)',
        'Manifest Discrepancy & Missing/Damaged Package Recorded',
        'QC Disposition Split Posted (Accepted / Reshuffling / Value-Add / Scrap / Hold)',
      ],
      crmEvents: [
        'Available-to-promise supply shortfall flag emitted to Order Desk if receiving yield drops below commitment',
      ],
      scanAnchors: ['SHP-ID + CRT-ID Scan → RCV-ID Creation'],
    },
    operationalRoles: [
      {
        role: 'MIDC Receiving Staff',
        responsibility: 'Unloads vehicle, captures arrival timestamp/vehicle details and executes package QR scans.',
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
      { label: 'Missing / Damaged Packages', sampleValue: '0 Missing | 1 Corner-Crushed Carton', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Arrival Temperature Evidence', sampleValue: '5.5°C Arrival Logger Trace', category: 'SOURCE_DEFINED' },
      { label: 'QC Defect Classification', sampleValue: 'Bruising 1.9% | Softening 1.1% | Mould 0.4%', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Disposition Decision', sampleValue: 'Accepted / Reshuffling / Value-Add / Scrap / Hold', category: 'SOURCE_DEFINED' },
    ],
    analysisOpportunities: [
      {
        metricName: 'MIDC Receiving Discrepancy & Defect Rate',
        formula: '(Shortage kg + QC Failed kg) ÷ Line-Haul Dispatched kg × 100',
        decisionValue: 'Pinpoints whether quality loss stems from upstream packing (M05) or line-haul thermal/vibration stress (ST-02).',
      },
      {
        metricName: 'First-Pass Receiving Yield %',
        formula: 'Direct Full Sellable kg ÷ Total Received kg × 100',
        decisionValue: 'Measures net ready-to-sell volume entering Mumbai inventory.',
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
    position3D: [4.5, 0, -4.5],
    cameraPos3D: [4.5, 9.8, 5.2],
    cameraLookAt3D: [4.5, 1.0, -4.5],
    summary:
      'Physically segregated 4-bucket cold-room inventory management governed by FIFO / FEFO and batch-wise stock ledger transactions. Enforces a hard architectural lock so quarantined, rejected or scrap stock NEVER appears as available customer inventory.',
    visualAssetsList: [
      'Zone 1 (Green): Full Sellable Stock Shelving with Visible FIFO Lane Arrows',
      'Zone 2 (Cyan): Reshuffling Buffer Stock & Repack Bench',
      'Zone 3 (Amber): Value Addition Stock Zone',
      'Zone 4 (Red — Walled/Locked): Scrap / Waste Containment Zone',
      'Strawberry Punnet Pallets & Zone QR Scanning Stations',
    ],
    materialMovement: {
      inputs: [
        'QC-triaged strawberry crates/punnets from Station 03 receiving',
      ],
      actions: [
        'Put away clean stock into Zone 1 Full Sellable Stock sequenced by FIFO arrival & batch age',
        'Isolate partially damaged punnets in Zone 2 Reshuffling Buffer for selective sound-berry repacking',
        'Segregate soft/ripe processing fruit into Zone 3 Value Addition Stock',
        'Lock condemned/mouldy fruit inside walled Zone 4 Scrap / Waste for witnessed disposal',
      ],
      outputs: [
        'FIFO-ordered Full Sellable Stock released exclusively to Station 05 Order Picking',
        'Reworked punnets (subject to QC/Supervisor approval) or Value-Add/Scrap disposal balances',
      ],
      assetsInvolved: [
        'Cold-Storage Shelving Racks',
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
        decisionValue: 'Prevents premature spoilage by ensuring oldest cold-room stock ships first.',
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
    zoneLabel: 'MIDC Order Fulfilment & Staging Hall',
    position3D: [4.5, 0, 3.2],
    cameraPos3D: [4.5, 8.6, 12.6],
    cameraLookAt3D: [4.5, 1.1, 3.2],
    summary:
      'Converts consolidated B2B and D2C customer orders into FIFO-verified picking lists from Full Sellable Stock, binds Punnet/Carton QRs to Customer Order IDs, applies channel-specific B2C/B2B packing and loads orders into pre-conditioned insulated delivery bags with coolant assets.',
    visualAssetsList: [
      'Order Processing Terminal & Dispatch Staging Zone',
      'FIFO Picking Shelves (Zone 1 Feed)',
      'Low-Poly Pickers, Packers & Dispatch Verifier',
      'Packing Tables with B2C Black 250g/500g Cartons & B2B Cavity Trays',
      'Insulated Delivery Bags & Frozen Coolant Packs',
    ],
    materialMovement: {
      inputs: [
        'Reserved Full Sellable Stock (2L, L, M, S grades in 250g punnets) from Station 04',
        'Pre-frozen coolant packs and sanitized insulated delivery bags',
      ],
      actions: [
        'Allocate oldest qualifying batch (FIFO verification) to customer order lines',
        'Pick grade-specific punnets/cartons and scan QR codes to Customer Order ID',
        'Perform quantity verification and apply B2C (2 × 250g black boxes in 500g carton) or B2B cavity tray packing',
        'Allocate serialized insulated delivery bag + frozen coolant packs and stage in chilled dispatch bay',
      ],
      outputs: [
        'Customer-specific, QR-verified, thermally protected orders staged for Last-Mile Dispatch',
      ],
      assetsInvolved: [
        'Picking Shelves',
        'Packing Tables',
        'B2C Black Cartons & B2B Cavity Crates',
        'Insulated Delivery Bags & Coolant Assets',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'ORD-ID (Customer Order) + PCK-ID (Pick/Pack Manifest)',
      erpEvents: [
        'Batch Allocated & Full Sellable Stock Reserved',
        'FIFO Sequence Verified & Picked Quantities Scanned',
        'B2C / B2B Packaging Format Confirmed',
        'Insulated Bag & Coolant Asset ID Bound to Order for Return Tracking',
      ],
      crmEvents: [
        'CRM Customer Order Lines (Hospitality / Chef / Patisserie / Retail / D2C) synced to MIDC Picking Desk',
        'Order Status transitions: Confirmed → Picked → Packed → Dispatch Ready',
      ],
      scanAnchors: ['PUN-ID / CRT-ID → ORD-ID + BAG-ASSET-ID'],
    },
    operationalRoles: [
      {
        role: 'MIDC Order Picker',
        responsibility: 'Retrieves exact grade (2L/L/M/S) strictly from Zone 1 Sellable racks following FIFO queue.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Packing Operator & Dispatch Checker',
        responsibility: 'Verifies B2C vs B2B pack integrity, confirms exact unit count, packs insulated bag + coolants and approves dispatch readiness.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Customer Order & Lines', sampleValue: 'ORD-MUM-20261120-412 (2 × 500g B2C Grade 2L)', category: 'SOURCE_DEFINED' },
      { label: 'Batch & Stock Reservation', sampleValue: 'LOT-2L-01 Reserved from Zone 1 Sellable', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'FIFO Verification', sampleValue: 'Earliest Release Batch Verified (Pass)', category: 'SOURCE_DEFINED' },
      { label: 'Pick & Quantity Verification', sampleValue: '4 × 250g Punnets QR-Verified', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'B2C vs B2B Pack Format', sampleValue: 'B2C Black 500g Carton vs B2B Cavity Tray', category: 'SOURCE_DEFINED' },
      { label: 'Bag & Coolant Allocation', sampleValue: 'BAG-MUM-014 + 2 Frozen Coolant Packs', category: 'PROPOSED_DEVELOPMENT' },
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
      'PROCESS DECISION REQUIRED: Standardized coolant-pack count and bag capacity matrix by ambient season and drop duration.',
    ],
  },
  {
    id: 'ST-06',
    number: '06',
    title: 'Last-Mile Delivery',
    shortTitle: 'Last-Mile Delivery',
    zoneLabel: 'Mumbai Urban Delivery Corridor & Customer Drop',
    position3D: [18.5, 0, 3.2],
    cameraPos3D: [16.8, 9.0, 12.8],
    cameraLookAt3D: [18.5, 1.6, 3.2],
    summary:
      'Final cold-chain delivery leg across Mumbai using hybrid transport modes under evaluation (two-wheelers, nearby public transport, vans, or third-party partners) carrying insulated bags with coolants, concluding with temperature verification and Digital Proof of Delivery (POD).',
    visualAssetsList: [
      'Low-Poly Two-Wheeler Delivery Rider & Compact Last-Mile Van',
      'Insulated Delivery Bags with Coolant Inserts',
      'Customer Destination Buildings (B2B Hotel/Restaurant & B2C Residence)',
      'Urban Delivery Route Path & Handover Characters',
    ],
    materialMovement: {
      inputs: [
        'Sealed B2C/B2B orders packed inside pre-chilled insulated bags + coolant packs from Station 05',
      ],
      actions: [
        'Dispatch rider/vehicle on route prioritized by location, delivery commitment, priority, shelf life and economics',
        'Maintain zipped thermal containment throughout urban transit to customer destination',
        'Hand over ordered punnets/cartons, check condition & temperature, and recover empty insulated bags/coolants',
      ],
      outputs: [
        'Accepted order delivered to B2B or D2C customer',
        'Reusable insulated delivery bags & coolant packs returning to MIDC (or rejected items routed to Station 07)',
      ],
      assetsInvolved: [
        'Delivery Scooter / Van',
        'Insulated Delivery Bag',
        'Coolant Packs',
        'Mobile POD Terminal',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'DEL-ID (Last-Mile Trip) → POD-ID (Proof of Delivery)',
      erpEvents: [
        'Last-Mile Trip Dispatched (Mode, Rider/Driver, Timestamp)',
        'Customer Arrival & Handover Temperature Logged',
        'Accepted vs Rejected Qty Recorded on Digital POD',
        'Reusable Bag & Coolant Asset Return Status Updated',
      ],
      crmEvents: [
        'Customer Delivery Status updated (Delivered / Partial Rejection / Failed Drop)',
        'Immediate doorstep complaint/rejection trigger emitted to CRM when Accepted < Dispatched',
      ],
      scanAnchors: ['ORD-ID + BAG-ASSET-ID → POD-ID (Customer Sign / OTP)'],
    },
    operationalRoles: [
      {
        role: 'Last-Mile Dispatch Coordinator',
        responsibility: 'Prioritizes route clusters and assigns delivery mode (2W, van, nearby public transport, or 3PL).',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Delivery Rider / Driver & Customer Receiver',
        responsibility: 'Executes thermal handover, captures handover temperature, Digital POD and returns reusable bag/coolant assets.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Last-Mile Trip & Driver', sampleValue: 'LMD-MUM-20261120-19 | Mode: 2W / Van', category: 'SOURCE_DEFINED', note: 'Final fleet mix unconfirmed' },
      { label: 'Order & Dispatch / Arrival Time', sampleValue: 'ORD-412 | 07:35 → 08:48 IST', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Handover Temperature Reading', sampleValue: '5.9°C Bag/Doorstep Check', category: 'PROPOSED_DEVELOPMENT', note: 'Doorstep threshold unconfirmed' },
      { label: 'Digital Proof of Delivery (POD)', sampleValue: 'POD-MUM-20261120-19 (OTP/Sign)', category: 'SOURCE_DEFINED' },
      { label: 'Accepted vs Rejected Quantity', sampleValue: 'Accepted: 4 Punnets | Rejected: 0', category: 'SOURCE_DEFINED' },
      { label: 'Reusable Bag / Coolant Return', sampleValue: 'BAG-MUM-014 Marked for MIDC Return', category: 'PROPOSED_DEVELOPMENT' },
    ],
    analysisOpportunities: [
      {
        metricName: 'Last-Mile Cost per Drop & Mode Damage Rate',
        formula: 'Total Last-Mile Cost ÷ Delivered Orders; Rejection % segmented by Delivery Mode',
        decisionValue: 'Determines whether two-wheelers or vans yield better net margin after vibration/thermal claims.',
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
    title: 'Returns and Complaints',
    shortTitle: 'Returns & Quarantine',
    zoneLabel: 'CRM Complaint Desk & MIDC Quarantine Bay',
    position3D: [-1.5, 0, 4.2],
    cameraPos3D: [-2.8, 8.6, 13.6],
    cameraLookAt3D: [-1.5, 1.1, 4.2],
    summary:
      'Manages customer complaints, doorstep rejections, quarantined reverse pickups, reusable asset recovery and replacement runs. Enforces a mandatory food-safety firewall: returned product MUST NEVER automatically re-enter Full Sellable Stock.',
    visualAssetsList: [
      'Returning Delivery Rider / Return Vehicle Lane',
      'Physically Walled Quarantine Receiving Station',
      'Returned Package & Reusable Bag Sanitization Rack',
      'Return QC Inspection Bench',
      'Replacement Dispatch Staging Bay',
    ],
    materialMovement: {
      inputs: [
        'Rejected/returned strawberry punnets from Station 06 (when pickup authorized)',
        'Empty reusable insulated bags & thawed coolant bottles returning from routes',
      ],
      actions: [
        'Route returning packages strictly into Quarantine Receiving Bay (physically blocked from Zone 1)',
        'Log reusable bag & coolant pack return condition and dispatch to cleaning/re-freezing',
        'Inspect returned fruit condition and thermal continuity; condemn unverified returns to Scrap/Waste',
        'Pick and dispatch authorized replacement order via Express Fulfilment lane when approved',
      ],
      outputs: [
        'Returned fruit disposed via Zone 4 Scrap/Waste OR approved Value-Addition (NEVER auto-sellable)',
        'Clean reusable insulated bags/coolants returned to Station 05 pool; Replacement orders dispatched',
      ],
      assetsInvolved: [
        'Return Rider / Vehicle',
        'Quarantine Receiving Table',
        'Quarantine QR Scanner',
        'Sanitization & Coolant Re-Freeze Rack',
      ],
    },
    informationFlowSummary: {
      primaryEntityId: 'CMP-ID (Complaint Case) + RET-QRN-ID (Quarantine Inspection)',
      erpEvents: [
        'Mandatory Quarantine Scan (System Lock Against Zone 1 Sellable)',
        'Return QC Final Disposition Recorded (Value-Add or Scrap Only)',
        'Replacement Order Triggered & Reusable Bag Return Reconciled',
        'Credit Note Authorization Sent to Station 08 Finance',
      ],
      crmEvents: [
        'Complaint Case Logged (Central CRM or Delivery-Person Entry)',
        'Linked to Customer, Order ID, Punnet/Batch QR and Rejection Reason',
        'Return Authorization & Customer Closure Status Recorded',
      ],
      scanAnchors: ['ORD-ID + BATCH-QR → CMP-ID → QRN-SCAN (Zone 1 Locked)'],
    },
    operationalRoles: [
      {
        role: 'CRM Coordinator / Delivery Rider',
        responsibility: 'Captures complaint details, photos, rejection reason and links record directly to Order + Batch QR.',
        status: 'Proposed Role — Validation Required',
      },
      {
        role: 'Operations Lead & Return QC Inspector',
        responsibility: 'Authorizes return pickup or replacement run; performs quarantined inspection and issues final non-sellable disposition.',
        status: 'Proposed Role — Validation Required',
      },
    ],
    keyDataShown: [
      { label: 'Complaint Case & Customer', sampleValue: 'CMP-MUM-20261120-03 | Account #MUM-8841', category: 'PROPOSED_DEVELOPMENT' },
      { label: 'Order & Batch Traceability', sampleValue: 'ORD-412 → PUN-0084 → FB-HM-20261120-A', category: 'SOURCE_DEFINED' },
      { label: 'Rejection Reason & Return Auth', sampleValue: 'Top-layer bruising | Return Pickup Authorized', category: 'SOURCE_DEFINED' },
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
        metricName: 'Reusable Bag & Coolant Recovery Rate',
        formula: 'Bags Returned Intact ÷ Bags Dispatched × 100',
        decisionValue: 'Prevents silent loss of insulated delivery bags and coolant assets in last-mile transit.',
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
    zoneLabel: 'Compact Digital ERP / Ledger Information Station',
    isDigitalStation: true,
    position3D: [-12.5, 0, 5.5],
    cameraPos3D: [-12.5, 7.6, 13.6],
    cameraLookAt3D: [-12.5, 1.4, 5.5],
    summary:
      'Compact digital information station (not a physical production facility) connecting physical custody events—delivered POD quantities, returns, shrinkage and logistics trips—with invoices, credit notes, payments and unit-economics margin.',
    visualAssetsList: [
      'Compact Digital Reconciliation Plinth',
      'Holographic Financial Pillars (Orders, POD, Invoices, Credit Notes, Costs, Margin)',
      'Digital Conduit Traces Linking Stations 01–07 into Ledger',
    ],
    materialMovement: {
      inputs: [
        'Digital station only — receives physical mass-balance totals, POD deliveries and return dispositions as digital records',
      ],
      actions: [
        '3-way reconcile Customer Orders, Delivered Quantities (Digital POD) and Issued Invoices',
        'Bind approved M10 Credit Notes and Gateway/Bank Refunds to authorized Complaint IDs',
        'Aggregate Line-Haul costs, Last-Mile costs, Packaging costs, Shrinkage and Value-Add recovery',
      ],
      outputs: [
        'Reconciled P&L ledger, Net Realized Revenue and Contribution Margin per channel/batch',
      ],
      assetsInvolved: [
        'Digital Financial Telemetry Plinth (Conceptual ERP/Accounting Interface)',
      ],
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
