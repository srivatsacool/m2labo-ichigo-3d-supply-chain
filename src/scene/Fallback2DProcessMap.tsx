import React from 'react';
import { AlertTriangle, ArrowRight, Database, Lock, Package, RotateCcw, ShieldAlert, Truck } from 'lucide-react';
import { FlowLayerMode, StationId } from '../data/types';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';
import { getExceptionsForStation } from '../exceptions/exceptionsData';

interface Fallback2DProcessMapProps {
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  flowMode: FlowLayerMode;
  onSelectStation: (id: StationId) => void;
  reason?: string;
}

export const Fallback2DProcessMap: React.FC<Fallback2DProcessMapProps> = ({
  selectedStationId,
  activeJourneyStationId,
  flowMode,
  onSelectStation,
  reason,
}) => {
  return (
    <div className="h-full w-full overflow-auto bg-blueprint-grid p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5 pb-28">
        {/* Process Ownership & Mode Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#42C7E8]/40 bg-[#173B57]/90 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#3CA77A] bg-[#3CA77A]/20">
              <Package className="h-4 w-4 text-[#3CA77A]" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold tracking-wider text-[#F4F7F8]">
                2D OPERATIONAL PROCESS SCHEMATIC {reason ? `(${reason})` : '(2D FALLBACK MODE)'}
              </div>
              <div className="text-xs text-[#A9E8F5]">
                Custody strictly begins at <span className="font-mono font-semibold text-[#3CA77A]">FARM → M2LABO CUSTODY HANDOVER</span>. Upstream farm cultivation, harvesting, cooling &amp; grading are excluded.
              </div>
            </div>
          </div>
          <span className="rounded border border-[#42C7E8]/50 bg-[#102A43] px-2.5 py-1 font-mono text-[10px] text-[#42C7E8]">
            LAYER: {flowMode} FLOW
          </span>
        </div>

        {/* Boundary Indicator */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="flex flex-col justify-center rounded-lg border border-dashed border-[#8C9BA5]/50 bg-[#102A43]/60 p-4 lg:col-span-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#8C9BA5]">
              Upstream Counterparty (Out of Scope)
            </div>
            <div className="mt-1 text-sm font-semibold text-[#8C9BA5]">
              Farm Origin Boundary Only
            </div>
            <p className="mt-1.5 text-xs text-[#8C9BA5]/90">
              Presents packed crates/cartons at handover gate. Farm production, picking robots, blast cooling &amp; farm sorting are not M2Labo operations.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded border border-[#3CA77A]/60 bg-[#3CA77A]/15 px-2.5 py-1.5 font-mono text-[10px] font-bold text-[#3CA77A]">
              <span>M2LABO CUSTODY BEGINS HERE</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Stations 01 - 08 Interactive Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:col-span-9">
            {OPERATIONAL_STATIONS.map((station) => {
              const isSelected = selectedStationId === station.id;
              const isJourneyActive = activeJourneyStationId === station.id;
              const exceptions = getExceptionsForStation(station.id);

              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => onSelectStation(station.id)}
                  className={`group flex flex-col justify-between rounded-lg border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-[#42C7E8] bg-[#173B57] ring-2 ring-[#42C7E8]/40'
                      : isJourneyActive
                      ? 'border-[#3CA77A] bg-[#173B57]/80'
                      : 'border-[#42C7E8]/25 bg-[#102A43]/90 hover:border-[#42C7E8]/70 hover:bg-[#173B57]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-[#102A43] px-2 py-0.5 font-mono text-[11px] font-bold text-[#42C7E8]">
                        ST-{station.number}
                      </span>
                      {station.custodyBanner && (
                        <span className="rounded bg-[#3CA77A]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#3CA77A]">
                          CUSTODY START
                        </span>
                      )}
                      {station.isDigitalStation && (
                        <span className="rounded bg-[#42C7E8]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#A9E8F5]">
                          DIGITAL NEXUS
                        </span>
                      )}
                      {isJourneyActive && !station.custodyBanner && !station.isDigitalStation && (
                        <span className="rounded bg-[#3CA77A]/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#3CA77A]">
                          ACTIVE STEP
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-sm font-semibold text-[#F4F7F8] group-hover:text-[#A9E8F5]">
                      {station.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[#8C9BA5]">{station.summary}</p>

                    {/* Station 04 4-Bucket Visual Callout */}
                    {station.id === 'ST-04' && (
                      <div className="mt-2.5 grid grid-cols-2 gap-1 font-mono text-[9px]">
                        <div className="rounded border border-[#3CA77A]/50 bg-[#3CA77A]/15 px-1.5 py-1 text-[#3CA77A]">
                          1. Sellable (FIFO)
                        </div>
                        <div className="rounded border border-[#42C7E8]/50 bg-[#42C7E8]/15 px-1.5 py-1 text-[#42C7E8]">
                          2. Reshuffling
                        </div>
                        <div className="rounded border border-[#E9A23B]/50 bg-[#E9A23B]/15 px-1.5 py-1 text-[#E9A23B]">
                          3. Value-Add
                        </div>
                        <div className="flex items-center gap-1 rounded border border-[#D9534F]/50 bg-[#D9534F]/15 px-1.5 py-1 text-[#D9534F]">
                          <Lock className="h-2.5 w-2.5 shrink-0" />
                          <span>4. Scrap</span>
                        </div>
                      </div>
                    )}

                    {/* Station 07 Quarantine Firewall Note */}
                    {station.id === 'ST-07' && (
                      <div className="mt-2 flex items-center gap-1.5 rounded border border-[#D9534F]/50 bg-[#D9534F]/15 px-2 py-1 font-mono text-[9px] text-[#D9534F]">
                        <RotateCcw className="h-3 w-3 shrink-0" />
                        <span>Quarantine Lock: Never Auto-Sellable</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-[#42C7E8]/15 pt-2.5">
                    {(flowMode === 'MATERIAL' || flowMode === 'COMBINED') && (
                      <div className="flex items-start gap-1.5 text-[11px] text-[#F4F7F8]">
                        <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3CA77A]" />
                        <span className="line-clamp-1">{station.materialMovement.outputs[0]}</span>
                      </div>
                    )}
                    {(flowMode === 'INFORMATION' || flowMode === 'COMBINED') && (
                      <div className="flex items-start gap-1.5 text-[11px] text-[#A9E8F5]">
                        <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#42C7E8]" />
                        <span className="line-clamp-1 font-mono text-[10px]">
                          {station.informationFlowSummary.primaryEntityId}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-[#8C9BA5]">
                      <span className="flex items-center gap-1">
                        {exceptions.length > 0 && <ShieldAlert className="h-3 w-3 text-[#E9A23B]" />}
                        {exceptions.length} exception branches
                      </span>
                      <span className="text-[#42C7E8]">Inspect →</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unresolved Process Decisions Reminder */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E9A23B]/40 bg-[#E9A23B]/10 px-4 py-2.5 text-xs text-[#F4F7F8]">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#E9A23B]" />
          <span>
            Unfinalized operational thresholds and SOPs remain explicitly marked{' '}
            <strong className="font-mono text-[#E9A23B]">PROCESS DECISION REQUIRED</strong> across stations and exception pathways.
          </span>
        </div>
      </div>
    </div>
  );
};
