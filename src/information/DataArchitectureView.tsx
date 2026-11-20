import React from 'react';
import { ArrowRight, Box, Database, Lock, ShieldCheck } from 'lucide-react';
import { StationId } from '../data/types';
import { DATA_ENTITY_GRAPH } from '../data/dataArchitectureMap';

interface DataArchitectureViewProps {
  onFocusStationIn3D: (stationId: StationId) => void;
  onOpenInfoFlowForStation: (stationId: StationId) => void;
}

export const DataArchitectureView: React.FC<DataArchitectureViewProps> = ({
  onFocusStationIn3D,
  onOpenInfoFlowForStation,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-blueprint-grid p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Header */}
        <div className="rounded-xl border border-[#42C7E8]/35 bg-[#173B57]/90 p-4">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#42C7E8]">
            <Database className="h-3.5 w-3.5" />
            <span>ERP &amp; CRM Entity-Relationship &amp; Analytical Traceability Map</span>
          </div>
          <h1 className="mt-1 text-lg font-bold text-[#F4F7F8]">
            From Farm Custody Handover to Financial Reconciliation — End-to-End Entity Lineage
          </h1>
          <p className="mt-1 text-xs text-[#A9E8F5]">
            Demonstrates how physical operational movements across Stations 01–08 bind into structured ERP &amp; CRM identifiers, enforce hard quarantine rules, and feed executive unit-economics analysis.
          </p>
        </div>

        {/* Custody Boundary & Architectural Guardrails */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-[#3CA77A]/50 bg-[#3CA77A]/10 p-3.5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#3CA77A]">
              <ShieldCheck className="h-4 w-4" />
              <span>CUSTODY BOUNDARY RULE</span>
            </div>
            <p className="mt-1.5 text-xs text-[#F4F7F8]">
              M2Labo data ownership starts at <strong>SHP-ID (Station 01)</strong>. Upstream farm batch numbers are recorded strictly as counterparty reference attributes.
            </p>
          </div>

          <div className="rounded-lg border border-[#D9534F]/50 bg-[#D9534F]/10 p-3.5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#D9534F]">
              <Lock className="h-4 w-4" />
              <span>NON-SELLABLE INVENTORY LOCK</span>
            </div>
            <p className="mt-1.5 text-xs text-[#F4F7F8]">
              Bucket 2 (Reshuffling), Bucket 3 (Value-Add), Bucket 4 (Scrap) and Station 07 Quarantine Returns carry <strong>Available-to-Promise = 0</strong> in CRM/Order Allocation.
            </p>
          </div>

          <div className="rounded-lg border border-[#42C7E8]/50 bg-[#42C7E8]/10 p-3.5">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#42C7E8]">
              <Database className="h-4 w-4" />
              <span>CLOSED-LOOP 3-WAY MATCH</span>
            </div>
            <p className="mt-1.5 text-xs text-[#F4F7F8]">
              Every invoice and margin figure in Station 08 reconciles against signed <strong>POD-ID</strong> quantities, <strong>CMP-ID</strong> credit notes, and trip/packaging cost records.
            </p>
          </div>
        </div>

        {/* Connected Entity Chain Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {DATA_ENTITY_GRAPH.map((node, index) => {
            const isCrm = node.ownerSystem.startsWith('CRM');
            const isShared = node.ownerSystem.startsWith('Shared');
            return (
              <div
                key={node.id}
                className="flex flex-col justify-between rounded-xl border border-[#42C7E8]/30 bg-[#102A43]/95 p-4 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-[#173B57] px-2 py-0.5 font-mono text-[10px] font-bold text-[#42C7E8]">
                      {node.stationId} • {node.identifierPrefix}
                    </span>
                    <span className="font-mono text-[10px] text-[#8C9BA5]">0{index + 1}</span>
                  </div>

                  <h2 className="mt-2 text-sm font-bold text-[#F4F7F8]">{node.entityName}</h2>
                  <div
                    className={`mt-1 inline-block rounded px-2 py-0.5 font-mono text-[9px] font-semibold ${
                      isCrm
                        ? 'bg-[#E9A23B]/20 text-[#E9A23B]'
                        : isShared
                        ? 'bg-[#A9E8F5]/20 text-[#A9E8F5]'
                        : 'bg-[#42C7E8]/20 text-[#42C7E8]'
                    }`}
                  >
                    {node.ownerSystem}
                  </div>

                  <div className="mt-3 space-y-1 border-t border-[#42C7E8]/15 pt-2.5 text-[11px] text-[#F4F7F8]/90">
                    {node.coreAttributes.map((attr) => (
                      <div key={attr} className="flex items-start gap-1.5">
                        <span className="text-[#42C7E8]">•</span>
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>

                  {node.guardrailNote && (
                    <div className="mt-2.5 rounded border border-[#D9534F]/50 bg-[#D9534F]/10 px-2 py-1 font-mono text-[9px] text-[#D9534F]">
                      {node.guardrailNote}
                    </div>
                  )}

                  <div className="mt-3 rounded border border-[#42C7E8]/20 bg-[#0A1C2E]/70 p-2">
                    <div className="font-mono text-[9px] font-bold text-[#8C9BA5]">ANALYTICAL OUTPUTS:</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {node.analyticalOutputs.map((out) => (
                        <span
                          key={out}
                          className="rounded bg-[#173B57] px-1.5 py-0.5 font-mono text-[9px] text-[#3CA77A]"
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#42C7E8]/15 pt-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenInfoFlowForStation(node.stationId)}
                    className="flex items-center gap-1 font-mono text-[10px] font-semibold text-[#A9E8F5] hover:text-[#42C7E8]"
                  >
                    <span>View Fields</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onFocusStationIn3D(node.stationId)}
                    className="flex items-center gap-1 rounded border border-[#42C7E8]/40 bg-[#173B57] px-2 py-1 font-mono text-[10px] text-[#42C7E8] hover:bg-[#42C7E8] hover:text-[#102A43]"
                  >
                    <Box className="h-3 w-3" />
                    <span>3D View</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
