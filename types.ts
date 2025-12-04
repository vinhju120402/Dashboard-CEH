
export interface BerthPlanFormData {
  shipCode: string;
  shipName: string;
  shippingLine: string;
  imo: string;
  berth: string;
  importVoyage: string;
  exportVoyage: string;
  fromBitt: string;
  toBitt: string;
  inboundVoyage: string;
  agent: string;
  side: 'left' | 'right';
  eta: string;
  etw: string;
  etd: string;
  etb: string;
  etc: string;
  notes: string;
}

export type TabType = 
  | 'BERTH' 
  | 'SHIP_OPS' 
  | 'TALLY' 
  | 'WEIGH'
  | 'GATE_OPS'
  | 'YARD_OPS'
  | 'STORAGE_SHIP'
  | 'STORAGE_MIXED'
  | 'TALLY_SHIP_YARD'
  | 'CARGO_DIST';
