import React, { useState } from 'react';
import { ZoomIn, Layers, Image as ImageIcon } from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { PACKAGING_PICTURE_ASSETS } from '../../data/visualAssetsData';

interface PackagingBlueprintSvgProps {
  variant: 'B2C' | 'B2B';
  forceCad?: boolean;
}

export const PackagingBlueprintSvg: React.FC<PackagingBlueprintSvgProps> = ({ variant, forceCad = false }) => {
  const { visualMode, setLightboxImage } = useBlueprint();
  const [imgError, setImgError] = useState(false);
  const [localView, setLocalView] = useState<'INHERIT' | 'PICTURE' | 'CAD'>(forceCad ? 'CAD' : 'INHERIT');

  const pic = PACKAGING_PICTURE_ASSETS[variant];
  const showPicture =
    !forceCad &&
    !imgError &&
    (localView === 'PICTURE' || (localView === 'INHERIT' && visualMode === 'PICTURE'));

  if (showPicture) {
    return (
      <div className="group relative overflow-hidden rounded border border-[#42C7E8]/35 bg-[#0B1F33]">
        <img
          src={pic.src}
          alt={pic.title}
          loading="lazy"
          onError={() => setImgError(true)}
          onClick={() =>
            setLightboxImage({
              src: pic.src,
              title: pic.title,
              caption: pic.caption,
              classification: pic.classification,
            })
          }
          className="h-64 w-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#0B1F33]/95 via-[#0B1F33]/75 to-transparent px-3 py-2">
          <span className="rounded border border-[#E9A23B]/50 bg-[#0B1F33]/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#F5C57B]">
            {pic.classification}
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-[#42C7E8]">
            <ZoomIn className="h-3.5 w-3.5" />
            <span>Expand View</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setLocalView('CAD')}
          className="absolute right-2 top-2 flex items-center gap-1 rounded border border-[#42C7E8]/50 bg-[#0B1F33]/90 px-2 py-1 font-mono text-[10px] text-[#EAF5F8] hover:border-[#42C7E8]"
        >
          <Layers className="h-3 w-3 text-[#42C7E8]" />
          <span>Switch to 2D CAD</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {!forceCad && !imgError && (
        <button
          type="button"
          onClick={() => setLocalView('PICTURE')}
          className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded border border-[#42C7E8]/40 bg-[#0B1F33]/90 px-2 py-1 font-mono text-[10px] text-[#EAF5F8] hover:border-[#42C7E8]"
        >
          <ImageIcon className="h-3 w-3 text-[#42C7E8]" />
          <span>Picture View</span>
        </button>
      )}
      {variant === 'B2C' ? (
        <svg viewBox="0 0 560 280" className="w-full rounded border border-[#42C7E8]/30 bg-[#0B1F33]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="b2cGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#42C7E8" strokeOpacity="0.08" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="560" height="280" fill="url(#b2cGrid)" />

          <text x="20" y="26" fill="#42C7E8" fontSize="11" fontFamily="monospace" fontWeight="bold">
            FIG 5.1 — B2C RETAIL ARCHITECTURE: 2 × 250g BLACK BOXES = 500g CARTON
          </text>
          <text x="20" y="42" fill="#9BB4C5" fontSize="9.5" fontFamily="monospace">
            SEPARATE FROM EPS/THERMOCOL TRANSPORT SHELL • PROJECT REFERENCE SPEC
          </text>

          <g transform="translate(30, 68)">
            <rect x="0" y="0" width="200" height="145" rx="4" fill="#0B1117" stroke="#42C7E8" strokeWidth="1.5" />
            <rect x="14" y="28" width="172" height="102" rx="3" fill="#141C24" stroke="#9BB4C5" strokeWidth="0.9" strokeDasharray="3 2" />
            <text x="100" y="18" textAnchor="middle" fill="#F5FAFC" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ICHIGO® BLACK 250g PUNNET
            </text>
            {[0, 1, 2, 3].map((col) =>
              [0, 1].map((row) => {
                const cx = 38 + col * 41;
                const cy = 56 + row * 44;
                return (
                  <g key={`${col}-${row}`}>
                    <circle cx={cx} cy={cy} r="15" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1" />
                    <path d={`M ${cx - 6} ${cy - 3} Q ${cx} ${cy + 10} ${cx + 6} ${cy - 3} Q ${cx} ${cy - 10} ${cx - 6} ${cy - 3}`} fill="#D9534F" />
                    <path d={`M ${cx - 4} ${cy - 7} L ${cx} ${cy - 11} L ${cx + 4} ${cy - 7}`} stroke="#3CA77A" strokeWidth="1.5" fill="none" />
                  </g>
                );
              })
            )}
            <text x="100" y="164" textAnchor="middle" fill="#86E1F7" fontSize="9" fontFamily="monospace">
              INTERNAL MOULDED CAVITIES (ZERO BERRY CONTACT)
            </text>
          </g>

          <path d="M 244 140 L 296 140" stroke="#42C7E8" strokeWidth="2" strokeDasharray="5 3" />
          <polygon points="292,134 304,140 292,146" fill="#42C7E8" />
          <text x="272" y="128" textAnchor="middle" fill="#F5C57B" fontSize="9" fontFamily="monospace">
            × 2 UNITS
          </text>

          <g transform="translate(314, 60)">
            <polygon points="16,20 204,20 220,38 220,162 32,162 16,144" fill="#12334D" stroke="#42C7E8" strokeWidth="1.6" />
            <rect x="28" y="42" width="84" height="104" rx="2" fill="#0B1117" stroke="#42C7E8" strokeWidth="1.2" />
            <text x="70" y="96" textAnchor="middle" fill="#F5FAFC" fontSize="9.5" fontFamily="monospace">BOX #1</text>
            <text x="70" y="110" textAnchor="middle" fill="#42C7E8" fontSize="8.5" fontFamily="monospace">250 g</text>
            <rect x="122" y="42" width="84" height="104" rx="2" fill="#0B1117" stroke="#42C7E8" strokeWidth="1.2" />
            <text x="164" y="96" textAnchor="middle" fill="#F5FAFC" fontSize="9.5" fontFamily="monospace">BOX #2</text>
            <text x="164" y="110" textAnchor="middle" fill="#42C7E8" fontSize="8.5" fontFamily="monospace">250 g</text>
            <rect x="78" y="14" width="82" height="16" rx="2" fill="#0B1F33" stroke="#3CA77A" strokeWidth="1" />
            <text x="119" y="25" textAnchor="middle" fill="#7AE0B3" fontSize="9" fontFamily="monospace">500 g CARTON</text>
            <text x="118" y="182" textAnchor="middle" fill="#9BB4C5" fontSize="9" fontFamily="monospace">
              PACKED SEPARATELY BY GRADE (2L / L / M / S)
            </text>
          </g>

          <text x="20" y="266" fill="#F69D9B" fontSize="8.5" fontFamily="monospace">
            NOTE: Exact mm box dimensions & board GSM remain UNKNOWN / NEEDS VERIFICATION (OQ-10)
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 560 280" className="w-full rounded border border-[#3CA77A]/35 bg-[#0B1F33]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="b2bGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3CA77A" strokeOpacity="0.08" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="560" height="280" fill="url(#b2bGrid)" />

          <text x="20" y="26" fill="#7AE0B3" fontSize="11" fontFamily="monospace" fontWeight="bold">
            FIG 5.2 — B2B CULINARY & HOSPITALITY: MOULDED CAVITY SHEET/TRAY + CRATE
          </text>
          <text x="20" y="42" fill="#9BB4C5" fontSize="9.5" fontFamily="monospace">
            HOTELS • FINE DINING • PATISSERIES • SINGLE-GRADE 250g BASE OR ORDER TRAY
          </text>

          <g transform="translate(30, 68)">
            <rect x="0" y="0" width="210" height="145" rx="4" fill="#173B57" stroke="#3CA77A" strokeWidth="1.5" />
            <text x="105" y="18" textAnchor="middle" fill="#F5FAFC" fontSize="10" fontFamily="monospace" fontWeight="bold">
              PROTECTIVE CAVITY SHEET / MOULD
            </text>
            {[0, 1, 2, 3, 4].map((col) =>
              [0, 1, 2].map((row) => {
                const cx = 30 + col * 37;
                const cy = 48 + row * 38;
                return (
                  <g key={`${col}-${row}`}>
                    <rect x={cx - 14} y={cy - 14} width="28" height="28" rx="6" fill="#0B1F33" stroke="#42C7E8" strokeWidth="0.9" />
                    <circle cx={cx} cy={cy} r="8" fill="#D9534F" />
                    <circle cx={cx} cy={cy - 6} r="2.2" fill="#3CA77A" />
                  </g>
                );
              })
            )}
            <text x="105" y="164" textAnchor="middle" fill="#7AE0B3" fontSize="9" fontFamily="monospace">
              PLASTIC / THIN SHEET WITH INDIVIDUAL HOLES
            </text>
          </g>

          <path d="M 250 140 L 296 140" stroke="#3CA77A" strokeWidth="2" strokeDasharray="5 3" />
          <polygon points="292,134 304,140 292,146" fill="#3CA77A" />
          <text x="273" y="128" textAnchor="middle" fill="#7AE0B3" fontSize="9" fontFamily="monospace">
            TIERED
          </text>

          <g transform="translate(310, 62)">
            <polygon points="10,20 210,20 226,38 226,158 26,158 10,140" fill="#102A43" stroke="#3CA77A" strokeWidth="1.6" />
            <line x1="26" y1="74" x2="226" y2="74" stroke="#42C7E8" strokeWidth="1.1" strokeDasharray="4 2" />
            <line x1="26" y1="116" x2="226" y2="116" stroke="#42C7E8" strokeWidth="1.1" strokeDasharray="4 2" />
            <rect x="44" y="42" width="164" height="22" rx="2" fill="#173B57" stroke="#3CA77A" strokeWidth="1" />
            <text x="126" y="57" textAnchor="middle" fill="#EAF5F8" fontSize="8.5" fontFamily="monospace">LAYER 1 — GRADE 2L / L</text>
            <rect x="44" y="84" width="164" height="22" rx="2" fill="#173B57" stroke="#3CA77A" strokeWidth="1" />
            <text x="126" y="99" textAnchor="middle" fill="#EAF5F8" fontSize="8.5" fontFamily="monospace">LAYER 2 — AIRFLOW CHANNELS</text>
            <text x="118" y="180" textAnchor="middle" fill="#9BB4C5" fontSize="9" fontFamily="monospace">
              PACKED INTO CRATES/CARTONS BY ORDER & TRANSPORT REQ.
            </text>
          </g>

          <text x="20" y="266" fill="#F69D9B" fontSize="8.5" fontFamily="monospace">
            NOTE: Cavity pitch per grade (2L/L/M/S) & polymer food-contact spec UNKNOWN / NEEDS VERIFICATION (OQ-10)
          </text>
        </svg>
      )}
    </div>
  );
};
