import { JourneySubStep } from '../data/types';

export const JOURNEY_SUB_STEPS: JourneySubStep[] = [
  {
    id: 'STEP-01',
    index: 0,
    stationId: 'ST-01',
    title: 'Fresh Strawberries Accepted at Custody Handover Gate',
    description:
      'Pre-packed farm strawberry crates cross the M2LABO CUSTODY BEGINS HERE boundary; M2Labo representative inspects berry quality, verifies crate count, scans QRs and records custody acceptance.',
    physicalAction: 'Fresh strawberries in vented crates & supporting ICBOX units inspected and cleared across custody boundary.',
    digitalEvent: 'ERP Custody Handover Record (SHP-ID) created; Upstream Farm Batch Reference linked.',
    progressStart: 0.0,
    progressEnd: 0.08,
    focusCameraPos: [-51.5, 8.8, -4.0],
    focusTarget: [-56.0, 1.4, -14.0],
    cinematicCloseUp: true,
  },
  {
    id: 'STEP-02',
    index: 1,
    stationId: 'ST-01',
    title: 'Strawberry Crates Loaded into Line-Haul Truck',
    description:
      'Accepted crates brimming with fresh strawberries and supporting insulated ICBOX containers are stacked carefully into the pre-cooled line-haul vehicle before highway dispatch.',
    physicalAction: 'Loaded strawberry crates secured inside chilled truck cargo bay; driver signs off dispatch.',
    digitalEvent: 'Line-Haul Trip ID (TRP-ID) initialized with transport mode and logger pairing.',
    progressStart: 0.08,
    progressEnd: 0.16,
    focusCameraPos: [-43.5, 9.5, -5.5],
    focusTarget: [-49.0, 1.6, -15.0],
  },
  {
    id: 'STEP-03',
    index: 2,
    stationId: 'ST-02',
    title: 'Outbound Line-Haul Transports Strawberries to MIDC',
    description:
      'The outbound cold-chain truck carries fresh strawberries along the green Farm-to-MIDC highway lane (~4–5 hours planned transit) under GPS and temperature logger tracking.',
    physicalAction: 'Outbound truck loaded with fresh strawberry crates moving east toward Andheri MIDC.',
    digitalEvent: 'TMS logs GPS waypoints, thermal checkpoints and ETA status.',
    progressStart: 0.16,
    progressEnd: 0.27,
    focusCameraPos: [-28.0, 14.0, 1.0],
    focusTarget: [-28.0, 1.5, -15.6],
  },
  {
    id: 'STEP-04',
    index: 3,
    stationId: 'ST-03',
    title: 'Strawberries Unloaded & Separated from Reusable Crates',
    description:
      'At Andheri MIDC Receiving Dock, strawberry-filled crates are unloaded onto dock rollers; fresh strawberry punnets move to QC inspection while emptied reusable crates are consolidated for return.',
    physicalAction: 'Strawberry crates unloaded; berries separated from empty reusable transport crates.',
    digitalEvent: 'MIDC Receiving Record (RCV-ID) opened; crate manifest reconciled.',
    progressStart: 0.27,
    progressEnd: 0.35,
    focusCameraPos: [-10.0, 9.5, -4.0],
    focusTarget: [-6.5, 1.4, -16.0],
  },
  {
    id: 'STEP-05',
    index: 4,
    stationId: 'ST-03',
    title: 'Fresh Strawberry QC Inspection & Precision Weighing',
    description:
      'QC Inspector opens incoming trays under bright inspection lighting, checkweighs samples and triages fresh strawberries by grade and condition into disposition paths.',
    physicalAction: 'Close-up strawberry quality inspection (bruising, firmness, calyx freshness) and sample weighing.',
    digitalEvent: '6 mandatory receiving checks recorded; QC disposition split posted to ERP.',
    progressStart: 0.35,
    progressEnd: 0.43,
    focusCameraPos: [-1.2, 6.2, -7.2],
    focusTarget: [-2.2, 1.35, -15.8],
    cinematicCloseUp: true,
  },
  {
    id: 'STEP-06',
    index: 5,
    stationId: 'ST-02',
    title: 'FLOW A — Truck Returns Consolidated Empty Crates to Farm',
    description:
      'LOOP 1 (Truck & Empty Crates): Consolidated empty reusable crates (zero strawberries) are loaded back onto the truck at MIDC and transported along the reverse highway lane back to the Farm Empty Crate Receipt Bay.',
    physicalAction: 'Returning truck carries stacked EMPTY crates west from MIDC to Farm receipt bay for accounting.',
    digitalEvent: 'Empty-Crate Return Dispatch & Farm Receipt Reconciliation logged in ERP.',
    progressStart: 0.43,
    progressEnd: 0.52,
    focusCameraPos: [-30.0, 15.5, -39.5],
    focusTarget: [-30.0, 1.5, -24.2],
    reverseLoop: 'LOOP_A_CRATES',
  },
  {
    id: 'STEP-07',
    index: 6,
    stationId: 'ST-04',
    title: 'Strawberries Allocated Across 4-Bucket Cold Storage (FIFO)',
    description:
      'Approved fresh strawberries enter Zone 1 Full Sellable FIFO racks; localized damage enters Reshuffling Buffer (Zone 2), ripe fruit enters Value-Add (Zone 3), and condemned units lock in Scrap (Zone 4).',
    physicalAction: 'Strawberry stock segregated strictly across Zones 1–4; FIFO lanes sequence oldest sellable batches first.',
    digitalEvent: 'Stock-Ledger Transactions (INV-TXN) posted; only Zone 1 exposed as Available-to-Promise.',
    progressStart: 0.52,
    progressEnd: 0.61,
    focusCameraPos: [18.0, 16.5, 2.0],
    focusTarget: [18.0, 1.5, -16.0],
  },
  {
    id: 'STEP-08',
    index: 7,
    stationId: 'ST-05',
    title: 'Order Picking & Strawberry Packing (B2C & B2B)',
    description:
      'Customer orders reserve Zone 1 FIFO strawberries; pickers scan 250g punnets (2L/L/M/S) and packers assemble matte-black B2C boxes or B2B protective cavity trays.',
    physicalAction: 'Fresh graded strawberries visibly packed into B2C 250g/500g black cartons and B2B trays.',
    digitalEvent: 'Customer Order (ORD-ID) & Pick/Pack Manifest (PCK-ID) bound to Punnet QRs.',
    progressStart: 0.61,
    progressEnd: 0.69,
    focusCameraPos: [20.5, 7.4, 18.2],
    focusTarget: [20.2, 1.25, 10.2],
    cinematicCloseUp: true,
  },
  {
    id: 'STEP-09',
    index: 8,
    stationId: 'ST-05',
    title: 'Packed Strawberries Loaded into Black Insulated Delivery Bag',
    description:
      'Verified strawberry orders are placed upright inside the reusable black insulated fabric delivery bag with pre-frozen coolant inserts and handed over to the last-mile rider.',
    physicalAction: 'Packed strawberry order transferred into black insulated delivery bag; rider secures bag to scooter rack.',
    digitalEvent: 'Reusable Black Delivery Bag ID & Coolant Assets bound to Last-Mile Dispatch record.',
    progressStart: 0.69,
    progressEnd: 0.76,
    focusCameraPos: [27.5, 6.8, 17.8],
    focusTarget: [25.0, 1.2, 10.0],
    cinematicCloseUp: true,
  },
  {
    id: 'STEP-10',
    index: 9,
    stationId: 'ST-06',
    title: 'Rider Transports Black Insulated Delivery Bag to Customer',
    description:
      'Two-wheeler delivery rider carries the zipped black insulated delivery bag along the Mumbai urban delivery avenue to B2B hospitality and D2C residential customers.',
    physicalAction: 'Delivery rider travels east along urban corridor with black insulated strawberry delivery bag.',
    digitalEvent: 'Last-Mile Trip (DEL-ID) active with route dispatch timestamp.',
    progressStart: 0.76,
    progressEnd: 0.83,
    focusCameraPos: [40.0, 12.5, 24.5],
    focusTarget: [40.5, 1.4, 10.0],
  },
  {
    id: 'STEP-11',
    index: 10,
    stationId: 'ST-06',
    title: 'Customer Strawberry Handover & Digital POD',
    description:
      'Rider opens the black insulated bag at the customer doorstep, hands over fresh strawberry punnets, logs condition and captures Digital Proof of Delivery (POD).',
    physicalAction: 'Customer receives fresh packed strawberries; rider retains empty reusable black delivery bag.',
    digitalEvent: 'Digital POD (POD-ID) confirms accepted vs rejected qty in CRM & ERP.',
    progressStart: 0.83,
    progressEnd: 0.89,
    focusCameraPos: [46.5, 8.2, 18.5],
    focusTarget: [52.0, 1.5, 10.0],
    cinematicCloseUp: true,
  },
  {
    id: 'STEP-12',
    index: 11,
    stationId: 'ST-07',
    title: 'FLOW B — Rider Returns Empty Black Bag to MIDC & Quarantine Bay',
    description:
      'LOOP 2 (Rider & Black Bag): Rider rides back along the amber return lane carrying the empty black insulated delivery bag to MIDC for return recording & sanitization. Any rejected fruit stays behind the Quarantine Firewall (never auto-sellable).',
    physicalAction: 'Rider returns empty black insulated delivery bag to MIDC intake; bag enters sanitization & reuse pool.',
    digitalEvent: 'Reusable Bag Return Receipt logged; any complaint/rejection routed to Quarantine QC (CMP-ID).',
    progressStart: 0.89,
    progressEnd: 0.95,
    focusCameraPos: [-4.0, 13.5, 30.5],
    focusTarget: [-4.0, 1.4, 14.5],
    reverseLoop: 'LOOP_B_BAGS',
  },
  {
    id: 'STEP-13',
    index: 12,
    stationId: 'ST-08',
    title: 'Digital Financial Reconciliation & Closed-Loop Margin',
    description:
      'Digital ERP Finance Nexus executes 3-way reconciliation across Customer Orders, Signed POD quantities, Invoices, Credit Notes, Line-Haul & Last-Mile logistics costs, and Shrinkage.',
    physicalAction: 'Digital information hub only — reconciles physical flows, crate/bag recoveries and POD deliveries.',
    digitalEvent: '3-Way Match Invoice (FIN-INV), Credit Notes (FIN-CN) & Contribution Margin finalized.',
    progressStart: 0.95,
    progressEnd: 1.0,
    focusCameraPos: [-32.0, 13.0, 29.0],
    focusTarget: [-32.0, 2.0, 14.0],
  },
];

export function getSubStepByProgress(progress: number): JourneySubStep {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = JOURNEY_SUB_STEPS.length - 1; i >= 0; i--) {
    if (clamped >= JOURNEY_SUB_STEPS[i].progressStart) {
      return JOURNEY_SUB_STEPS[i];
    }
  }
  return JOURNEY_SUB_STEPS[0];
}
