export interface VisualPictureAsset {
  key: string;
  src: string;
  title: string;
  caption: string;
  classification: 'AI-GENERATED CONCEPTUAL VISUAL' | 'TECHNICAL CONCEPTUAL RENDER';
}

export const STATION_PICTURE_ASSETS: Record<string, VisualPictureAsset> = {
  M01: {
    key: 'M01',
    src: '/images/m01-demand-planning.jpg',
    title: '01 · Demand Planning & Customer Orders',
    caption: 'Conceptual engineering command desk consolidating 4 sales channels into 1 HiMedia harvest instruction.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M02: {
    key: 'M02',
    src: '/images/m02-farm-readiness.jpg',
    title: '02 · Farm Readiness & Crop Inspection',
    caption: 'Conceptual greenhouse readiness check (Brix, maturity colour, photo report); does not depict actual HiMedia bays.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M03: {
    key: 'M03',
    src: '/images/m03-robot-harvesting.jpg',
    title: '03 · Robot-Assisted Harvesting',
    caption: 'Conceptual semi-automated AI harvesting under human supervision; actual robot model remains UNKNOWN.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M04: {
    key: 'M04',
    src: '/images/m04-blast-cooling.jpg',
    title: '04 · Blast Cooling & Temperature Control',
    caption: 'Conceptual blast-cooling cutaway chilling crates toward stated 5°C target (5h cycle, strictly NOT freezing).',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M05: {
    key: 'M05',
    src: '/images/m05-grading-packaging.jpg',
    title: '05 · Sorting, Grading, QC & Packaging',
    caption: 'Conceptual 2L/L/M/S grading line feeding separate 250g B2C black boxes and B2B cavity trays.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M06: {
    key: 'M06',
    src: '/images/m06-transport.jpg',
    title: '06 · Farm-to-MIDC Transportation',
    caption: 'Conceptual comparison of Option A Refrigerated Van vs Option B Normal Van + Insulated Boxes & Coolant Packs.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M07: {
    key: 'M07',
    src: '/images/m07-midc-receiving.jpg',
    title: '07 · MIDC Receiving, QC & Inventory',
    caption: 'Conceptual Andheri MIDC dock showing 6-point QC and 4 physically separated inventory buckets.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M08: {
    key: 'M08',
    src: '/images/m08-order-fulfilment.jpg',
    title: '08 · Order Picking & Customer-Specific Packing',
    caption: 'Conceptual QR-verified FEFO order picking and channel-specific B2B/B2C packing station.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M09: {
    key: 'M09',
    src: '/images/m09-last-mile.jpg',
    title: '09 · Last-Mile Delivery',
    caption: 'Conceptual Mumbai insulated thermal bag + coolant delivery with Digital POD QR & doorstep temp check.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M10: {
    key: 'M10',
    src: '/images/m10-reverse-logistics.jpg',
    title: '10 · Reverse Logistics & Customer Complaints',
    caption: 'Conceptual Quarantine Return QC bench isolated strictly from Zone 1 Sellable Stock.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  M11: {
    key: 'M11',
    src: '/images/m11-financial-closure.jpg',
    title: '11 · Financial Closure & Performance Analytics',
    caption: 'Conceptual reconciliation desk linking PODs, invoices, credit notes, shrinkage & cost/kg analytics.',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
};

export const PACKAGING_PICTURE_ASSETS: Record<'B2C' | 'B2B', VisualPictureAsset> = {
  B2C: {
    key: 'B2C',
    src: '/images/pkg-b2c-black-box.jpg',
    title: 'B2C Retail Pack — 2 × 250g Black Boxes in 500g Carton',
    caption: 'Conceptual visual based on confirmed project description (black branded boxes w/ moulded berry cavities, separate from EPS).',
    classification: 'AI-GENERATED CONCEPTUAL VISUAL',
  },
  B2B: {
    key: 'B2B',
    src: '/images/pkg-b2b-cavity-tray.svg',
    title: 'B2B Culinary Pack — Protective Cavity Sheet/Mould + Crate',
    caption: 'Technical studio render of thin protective sheet/mould with individual berry holes packed into transport crates.',
    classification: 'TECHNICAL CONCEPTUAL RENDER',
  },
};
