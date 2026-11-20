import React, { useState } from 'react';
import { QrCode, ArrowRight, Thermometer, Layers, User, MapPin } from 'lucide-react';
import { TRACEABILITY_CHAIN_DEMO, TRACEABILITY_TEMPERATURE_TIMELINE } from '../../data/traceabilityData';
import { StatusBadge } from '../layout/StatusBadge';
import { useBlueprint } from '../../context/BlueprintContext';

export const TraceabilityExplorer: React.FC = () => {
  const { openMilestoneWorkspace } = useBlueprint();
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const activeNode =
    TRACEABILITY_CHAIN_DEMO.find((n) => n.stageOrder === selectedStage) || TRACEABILITY_CHAIN_DEMO[0];

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 lg:px-6">
      {/* Header & Conceptual Simulation Disclaimer */}
      <div className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/10 px-4 py-2.5 text-xs text-[#F5C57B]">
        <strong>SIMULATED DIGITAL TRACEABILITY ARCHITECTURE:</strong> All sample identifiers (`DEM-2026-...`, `FB-HM-...`, `PUN-2L-...`, `POD-...`) and thermal readings are illustrative demonstration data only. This explorer models the proposed parent-child QR hierarchy without claiming live ERP or GPS integrations.
      </div>

      {/* Interactive 14-Stage Parent-Child Identifier Chain */}
      <section className="rounded border border-[#42C7E8]/30 bg-[#102A43] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#42C7E8]">
              <QrCode className="h-4 w-4" />
              <span>14-STAGE CONNECTED IDENTIFIER MODEL (PARENT → CHILD GENEALOGY)</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-[#F5FAFC]">
              Demand ID → Farm Batch → Punnet → Carton → Shipment → MIDC → POD → Credit Note
            </h2>
          </div>
          <StatusBadge status="ILLUSTRATIVE SIMULATION" />
        </div>

        <div className="flex items-stretch gap-2 overflow-x-auto pb-3">
          {TRACEABILITY_CHAIN_DEMO.map((node, idx) => {
            const selected = node.stageOrder === selectedStage;
            return (
              <React.Fragment key={node.sampleId}>
                <button
                  type="button"
                  onClick={() => setSelectedStage(node.stageOrder)}
                  className={`flex w-44 shrink-0 flex-col justify-between rounded border p-3 text-left transition-all ${
                    selected
                      ? 'border-[#42C7E8] bg-[#173B57] shadow-[0_0_12px_rgba(66,199,232,0.2)]'
                      : 'border-[#42C7E8]/20 bg-[#0B1F33] hover:border-[#42C7E8]/50'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="font-bold text-[#42C7E8]">#{String(node.stageOrder).padStart(2, '0')}</span>
                    <span className="text-[#9BB4C5]">{node.milestoneId}</span>
                  </div>
                  <div className="mt-1.5 text-xs font-bold text-[#F5FAFC]">{node.idType}</div>
                  <div className="mt-1 truncate font-mono text-[10px] text-[#7AE0B3]">{node.sampleId}</div>
                </button>
                {idx < TRACEABILITY_CHAIN_DEMO.length - 1 && (
                  <div className="flex items-center text-[#42C7E8]/60">
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Node Detailed Inspector */}
        <div className="grid gap-4 rounded border border-[#42C7E8]/40 bg-[#0B1F33] p-5 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#42C7E8] px-2 py-0.5 font-mono text-xs font-bold text-[#0B1F33]">
                STAGE {String(activeNode.stageOrder).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-[#F5FAFC]">{activeNode.idType}</h3>
              <button
                type="button"
                onClick={() => openMilestoneWorkspace(activeNode.milestoneId)}
                className="font-mono text-xs text-[#42C7E8] underline"
              >
                Open {activeNode.milestoneId} SOP →
              </button>
            </div>

            <div className="rounded border border-[#3CA77A]/35 bg-[#12334D] p-3 font-mono text-xs text-[#7AE0B3]">
              DEMO IDENTIFIER: {activeNode.sampleId}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-[#42C7E8] shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">RESPONSIBLE PERSON</div>
                  <div className="text-[#F5FAFC]">{activeNode.responsibleRole}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#42C7E8] shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">LOCATION & TIMESTAMP</div>
                  <div className="text-[#F5FAFC]">{activeNode.location}</div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">{activeNode.timestamp}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Thermometer className="h-4 w-4 text-[#42C7E8] shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">TEMPERATURE RECORD</div>
                  <div className="text-[#86E1F7]">{activeNode.tempReading}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="h-4 w-4 text-[#42C7E8] shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-[#9BB4C5]">QTY RECONCILIATION</div>
                  <div className="text-[#EAF5F8]">{activeNode.quantityReconciliation}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded border border-[#42C7E8]/25 bg-[#12334D] p-4 space-y-2.5 text-xs">
            <div className="font-mono text-[11px] font-bold text-[#42C7E8]">PARENT-CHILD & QR PAYLOAD SCHEMA</div>
            <div>
              <span className="font-mono text-[10px] text-[#9BB4C5]">PARENT LINK: </span>
              <span className="font-mono text-[#F5FAFC]">{activeNode.parentStage || 'ROOT ORIGIN'}</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#9BB4C5]">CHILD LINK: </span>
              <span className="font-mono text-[#F5FAFC]">{activeNode.childStage || 'LEDGER CLOSURE'}</span>
            </div>
            {activeNode.inventoryBucket && (
              <div>
                <span className="font-mono text-[10px] text-[#9BB4C5]">MIDC INVENTORY BUCKET: </span>
                <span className="font-mono text-[#F5C57B]">{activeNode.inventoryBucket}</span>
              </div>
            )}
            <div>
              <span className="font-mono text-[10px] text-[#9BB4C5]">ALLOCATION: </span>
              <span>{activeNode.customerAllocation}</span>
            </div>
            <div className="rounded bg-[#0B1F33] p-2.5 font-mono text-[11px] text-[#7AE0B3]">
              QR SCHEMA: {activeNode.qrPayloadSchema}
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Temperature Curve & 4-Bucket Mass Balance */}
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7 rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              Simulated Batch Temperature History (°C Across Cold Chain)
            </h3>
            <StatusBadge status="ILLUSTRATIVE SIMULATION" compact />
          </div>
          <svg viewBox="0 0 600 200" className="w-full rounded border border-[#42C7E8]/20 bg-[#0B1F33]">
            <line x1="40" y1="135" x2="580" y2="135" stroke="#3CA77A" strokeDasharray="4 3" strokeWidth="1" />
            <text x="45" y="130" fill="#7AE0B3" fontSize="9" fontFamily="monospace">5°C STATED TARGET</text>
            {(() => {
              const pts = TRACEABILITY_TEMPERATURE_TIMELINE.map((pt, i) => {
                const x = 55 + i * 56;
                const y = 175 - pt.tempC * 8;
                return { x, y, pt };
              });
              const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
              return (
                <>
                  <path d={pathD} fill="none" stroke="#42C7E8" strokeWidth="2.2" />
                  {pts.map((p, idx) => (
                    <g key={idx}>
                      <circle cx={p.x} cy={p.y} r="4" fill="#F5FAFC" stroke="#42C7E8" strokeWidth="1.5" />
                      <text x={p.x} y={p.y - 8} textAnchor="middle" fill="#86E1F7" fontSize="8.5" fontFamily="monospace">
                        {p.pt.tempC}°
                      </text>
                      <text x={p.x} y="190" textAnchor="middle" fill="#9BB4C5" fontSize="7" fontFamily="monospace">
                        {p.pt.stage.split(' ')[0]}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
        </section>

        <section className="lg:col-span-5 rounded border border-[#42C7E8]/25 bg-[#12334D] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#42C7E8]">
              MIDC 4-Bucket Batch Reconciliation (Demo)
            </h3>
            <StatusBadge status="ILLUSTRATIVE SIMULATION" compact />
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: '1. Sellable Stock (Zone A)', qty: '126.5 kg (96.6%)', color: 'bg-[#3CA77A]', note: 'FEFO/Batch allocated to M08 Orders' },
              { name: '2. Reshuffling Buffer (Zone B)', qty: '2.5 kg (1.9%)', color: 'bg-[#42C7E8]', note: 'Pending repack QC check' },
              { name: '3. Value-Addition Stock (Zone C)', qty: '1.5 kg (1.1%)', color: 'bg-[#E9A23B]', note: 'Secondary culinary processing' },
              { name: '4. Scrap / Waste (Zone D)', qty: '0.5 kg (0.4%)', color: 'bg-[#D9534F]', note: 'Blocked from customer release; +1 return punnet' },
            ].map((b) => (
              <div key={b.name} className="rounded border border-[#42C7E8]/20 bg-[#0B1F33] p-3">
                <div className="flex items-center justify-between font-semibold text-[#F5FAFC]">
                  <span className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${b.color}`} />
                    {b.name}
                  </span>
                  <span className="font-mono text-[#42C7E8]">{b.qty}</span>
                </div>
                <div className="mt-1 text-[11px] text-[#9BB4C5]">{b.note}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
