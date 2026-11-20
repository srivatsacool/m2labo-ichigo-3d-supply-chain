import React, { useState } from 'react';
import { ZoomIn, Layers, Image as ImageIcon } from 'lucide-react';
import { useBlueprint } from '../../context/BlueprintContext';
import { STATION_PICTURE_ASSETS } from '../../data/visualAssetsData';

interface StationIsometricSvgProps {
  milestoneId: string;
  className?: string;
  allowLocalToggle?: boolean;
}

export const StationIsometricSvg: React.FC<StationIsometricSvgProps> = ({
  milestoneId,
  className = 'h-28 w-full',
  allowLocalToggle = true,
}) => {
  const { visualMode, setLightboxImage } = useBlueprint();
  const [imgError, setImgError] = useState(false);
  const [localMode, setLocalMode] = useState<'INHERIT' | 'PICTURE' | 'CAD'>('INHERIT');

  const pictureAsset = STATION_PICTURE_ASSETS[milestoneId];
  const effectivePicture =
    !imgError &&
    pictureAsset &&
    (localMode === 'PICTURE' || (localMode === 'INHERIT' && visualMode === 'PICTURE'));

  if (effectivePicture) {
    return (
      <div className="group relative overflow-hidden rounded border border-[#42C7E8]/35 bg-[#0B1F33]">
        <img
          src={pictureAsset.src}
          alt={pictureAsset.title}
          loading="lazy"
          onError={() => setImgError(true)}
          onClick={(e) => {
            e.stopPropagation();
            setLightboxImage({
              src: pictureAsset.src,
              title: pictureAsset.title,
              caption: pictureAsset.caption,
              classification: pictureAsset.classification,
            });
          }}
          className={`${className} object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#0B1F33]/95 via-[#0B1F33]/75 to-transparent px-2 py-1.5">
          <span className="rounded border border-[#E9A23B]/50 bg-[#0B1F33]/90 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[#F5C57B]">
            AI CONCEPT VISUAL
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-[#42C7E8]">
            <ZoomIn className="h-3 w-3" />
            <span>Zoom</span>
          </span>
        </div>

        {allowLocalToggle && (
          <button
            type="button"
            title="Switch this station between Picture and 2D CAD diagram"
            onClick={(e) => {
              e.stopPropagation();
              setLocalMode('CAD');
            }}
            className="absolute right-1.5 top-1.5 flex items-center gap-1 rounded border border-[#42C7E8]/50 bg-[#0B1F33]/90 px-1.5 py-0.5 font-mono text-[9px] text-[#EAF5F8] hover:border-[#42C7E8]"
          >
            <Layers className="h-2.5 w-2.5 text-[#42C7E8]" />
            <span>2D CAD</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {allowLocalToggle && !imgError && pictureAsset && (
        <button
          type="button"
          title="Switch this station to Picture Mode"
          onClick={(e) => {
            e.stopPropagation();
            setLocalMode('PICTURE');
          }}
          className="absolute right-1.5 top-1.5 z-10 flex items-center gap-1 rounded border border-[#42C7E8]/40 bg-[#0B1F33]/90 px-1.5 py-0.5 font-mono text-[9px] text-[#EAF5F8] hover:border-[#42C7E8]"
        >
          <ImageIcon className="h-2.5 w-2.5 text-[#42C7E8]" />
          <span>Picture</span>
        </button>
      )}
      <svg viewBox="0 0 220 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Common Isometric Blueprint Base Grid */}
        <path d="M110 118 L28 84 L110 50 L192 84 Z" fill="#0B1F33" stroke="#27B7D8" strokeWidth="1" strokeOpacity="0.45" />
        <path d="M69 101 L151 67 M151 101 L69 67" stroke="#42C7E8" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 3" />

        {milestoneId === 'M01' && (
          <g>
            <polygon points="110,30 156,48 110,66 64,48" fill="#173B57" stroke="#42C7E8" strokeWidth="1.5" />
            <polygon points="64,48 110,66 110,88 64,70" fill="#12334D" stroke="#42C7E8" strokeWidth="1.2" />
            <polygon points="156,48 110,66 110,88 156,70" fill="#102A43" stroke="#42C7E8" strokeWidth="1.2" />
            <rect x="86" y="42" width="48" height="10" rx="2" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1" />
            <circle cx="52" cy="40" r="6" fill="#12334D" stroke="#42C7E8" strokeWidth="1.2" />
            <circle cx="168" cy="40" r="6" fill="#12334D" stroke="#42C7E8" strokeWidth="1.2" />
            <path d="M58 42 L80 46 M162 42 L140 46" stroke="#42C7E8" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="110" y="23" textAnchor="middle" fill="#9BB4C5" fontSize="8" fontFamily="monospace">4 CHANNELS → 1 INST</text>
          </g>
        )}

        {milestoneId === 'M02' && (
          <g>
            <path d="M54 78 L54 44 L110 20 L166 44 L166 78" stroke="#42C7E8" strokeWidth="1.5" fill="#12334D" fillOpacity="0.55" />
            <path d="M54 44 L110 64 L166 44" stroke="#42C7E8" strokeWidth="1.2" />
            <path d="M110 20 L110 64" stroke="#42C7E8" strokeWidth="0.9" strokeDasharray="2 2" />
            <ellipse cx="90" cy="76" rx="16" ry="6" fill="#3CA77A" fillOpacity="0.35" stroke="#3CA77A" strokeWidth="1.2" />
            <ellipse cx="130" cy="76" rx="16" ry="6" fill="#3CA77A" fillOpacity="0.35" stroke="#3CA77A" strokeWidth="1.2" />
            <circle cx="88" cy="74" r="3" fill="#D9534F" />
            <circle cx="96" cy="77" r="3" fill="#D9534F" />
            <circle cx="128" cy="75" r="3" fill="#3CA77A" />
            <text x="110" y="15" textAnchor="middle" fill="#9BB4C5" fontSize="8" fontFamily="monospace">HIMEDIA CROP QC</text>
          </g>
        )}

        {milestoneId === 'M03' && (
          <g>
            <rect x="64" y="64" width="38" height="22" rx="3" fill="#173B57" stroke="#42C7E8" strokeWidth="1.5" />
            <path d="M83 64 L83 38 L114 28 L128 46" stroke="#E9A23B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="83" cy="38" r="4" fill="#42C7E8" />
            <circle cx="114" cy="28" r="4" fill="#42C7E8" />
            <polygon points="120,62 158,62 152,82 126,82" fill="#12334D" stroke="#42C7E8" strokeWidth="1.4" />
            <circle cx="134" cy="68" r="3.5" fill="#D9534F" />
            <circle cx="143" cy="69" r="3.5" fill="#D9534F" />
            <text x="110" y="18" textAnchor="middle" fill="#F5C57B" fontSize="8" fontFamily="monospace">AI SEMI-AUTO + HUMAN</text>
          </g>
        )}

        {milestoneId === 'M04' && (
          <g>
            <polygon points="62,32 158,32 174,46 174,90 78,90 62,76" fill="#12334D" stroke="#42C7E8" strokeWidth="1.5" />
            <rect x="78" y="46" width="82" height="36" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1" />
            <line x1="84" y1="58" x2="154" y2="58" stroke="#42C7E8" strokeWidth="1" />
            <line x1="84" y1="70" x2="154" y2="70" stroke="#42C7E8" strokeWidth="1" />
            <path d="M86 52 L144 52" stroke="#42C7E8" strokeWidth="1.6" strokeDasharray="4 3" />
            <path d="M140 48 L148 52 L140 56" stroke="#42C7E8" strokeWidth="1.4" />
            <rect x="128" y="22" width="44" height="16" rx="2" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1.2" />
            <text x="150" y="33" textAnchor="middle" fill="#42C7E8" fontSize="9" fontWeight="bold" fontFamily="monospace">5°C/5h</text>
          </g>
        )}

        {milestoneId === 'M05' && (
          <g>
            <rect x="44" y="42" width="60" height="22" rx="2" fill="#173B57" stroke="#42C7E8" strokeWidth="1.4" />
            <path d="M104 53 L126 38 M104 53 L126 74" stroke="#42C7E8" strokeWidth="1.5" />
            <rect x="128" y="26" width="44" height="20" rx="2" fill="#0A141E" stroke="#42C7E8" strokeWidth="1.4" />
            <text x="150" y="39" textAnchor="middle" fill="#F5FAFC" fontSize="8" fontFamily="monospace">B2C 250g</text>
            <rect x="128" y="64" width="44" height="20" rx="2" fill="#173B57" stroke="#3CA77A" strokeWidth="1.4" />
            <text x="150" y="77" textAnchor="middle" fill="#7AE0B3" fontSize="8" fontFamily="monospace">B2B TRAY</text>
            <text x="74" y="56" textAnchor="middle" fill="#9BB4C5" fontSize="8" fontFamily="monospace">2L/L/M/S</text>
          </g>
        )}

        {milestoneId === 'M06' && (
          <g>
            <polygon points="56,42 132,42 132,76 56,76" fill="#173B57" stroke="#42C7E8" strokeWidth="1.5" />
            <polygon points="132,52 162,52 170,64 170,76 132,76" fill="#12334D" stroke="#42C7E8" strokeWidth="1.5" />
            <circle cx="76" cy="80" r="8" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1.6" />
            <circle cx="152" cy="80" r="8" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1.6" />
            <text x="94" y="62" textAnchor="middle" fill="#42C7E8" fontSize="8.5" fontFamily="monospace">OPT A / OPT B</text>
            <text x="110" y="25" textAnchor="middle" fill="#9BB4C5" fontSize="8" fontFamily="monospace">4–5H GPS + TEMP LOG</text>
          </g>
        )}

        {milestoneId === 'M07' && (
          <g>
            <rect x="52" y="32" width="54" height="24" fill="#3CA77A" fillOpacity="0.2" stroke="#3CA77A" strokeWidth="1.3" />
            <text x="79" y="47" textAnchor="middle" fill="#7AE0B3" fontSize="7.5" fontFamily="monospace">SELLABLE</text>
            <rect x="114" y="32" width="54" height="24" fill="#42C7E8" fillOpacity="0.18" stroke="#42C7E8" strokeWidth="1.3" />
            <text x="141" y="47" textAnchor="middle" fill="#86E1F7" fontSize="7.5" fontFamily="monospace">RESHUFFLE</text>
            <rect x="52" y="62" width="54" height="24" fill="#E9A23B" fillOpacity="0.2" stroke="#E9A23B" strokeWidth="1.3" />
            <text x="79" y="77" textAnchor="middle" fill="#F5C57B" fontSize="7.5" fontFamily="monospace">VALUE-ADD</text>
            <rect x="114" y="62" width="54" height="24" fill="#D9534F" fillOpacity="0.2" stroke="#D9534F" strokeWidth="1.3" />
            <text x="141" y="77" textAnchor="middle" fill="#F69D9B" fontSize="7.5" fontFamily="monospace">SCRAP</text>
            <text x="110" y="21" textAnchor="middle" fill="#9BB4C5" fontSize="8" fontFamily="monospace">ANDHERI MIDC 4-ZONES</text>
          </g>
        )}

        {milestoneId === 'M08' && (
          <g>
            <rect x="54" y="36" width="38" height="46" rx="2" fill="#12334D" stroke="#42C7E8" strokeWidth="1.4" />
            <line x1="62" y1="48" x2="84" y2="48" stroke="#42C7E8" strokeWidth="1.2" />
            <line x1="62" y1="58" x2="84" y2="58" stroke="#42C7E8" strokeWidth="1.2" />
            <line x1="62" y1="68" x2="78" y2="68" stroke="#3CA77A" strokeWidth="1.2" />
            <path d="M96 58 L120 58" stroke="#42C7E8" strokeWidth="1.6" />
            <rect x="124" y="40" width="42" height="38" rx="3" fill="#173B57" stroke="#42C7E8" strokeWidth="1.5" />
            <rect x="135" y="49" width="20" height="20" fill="#0B1F33" stroke="#42C7E8" strokeWidth="1" />
            <text x="145" y="62" textAnchor="middle" fill="#42C7E8" fontSize="8" fontFamily="monospace">QR</text>
          </g>
        )}

        {milestoneId === 'M09' && (
          <g>
            <rect x="56" y="42" width="44" height="38" rx="4" fill="#173B57" stroke="#42C7E8" strokeWidth="1.5" />
            <text x="78" y="63" textAnchor="middle" fill="#86E1F7" fontSize="7.5" fontFamily="monospace">COOL BAG</text>
            <path d="M104 60 L126 60" stroke="#42C7E8" strokeWidth="1.5" strokeDasharray="3 2" />
            <rect x="130" y="34" width="34" height="50" rx="4" fill="#12334D" stroke="#3CA77A" strokeWidth="1.5" />
            <path d="M139 58 L145 64 L156 50" stroke="#3CA77A" strokeWidth="2.2" strokeLinecap="round" />
            <text x="147" y="77" textAnchor="middle" fill="#7AE0B3" fontSize="7.5" fontFamily="monospace">POD</text>
          </g>
        )}

        {milestoneId === 'M10' && (
          <g>
            <path d="M158 46 C140 28, 86 28, 70 46" stroke="#E9A23B" strokeWidth="1.8" strokeDasharray="4 3" />
            <polygon points="68,40 76,50 64,52" fill="#E9A23B" />
            <rect x="52" y="54" width="52" height="28" rx="2" fill="#D9534F" fillOpacity="0.18" stroke="#D9534F" strokeWidth="1.5" />
            <text x="78" y="71" textAnchor="middle" fill="#F69D9B" fontSize="7.5" fontFamily="monospace">QUARANTINE</text>
            <rect x="122" y="54" width="50" height="28" rx="2" fill="#12334D" stroke="#42C7E8" strokeWidth="1.3" />
            <text x="147" y="71" textAnchor="middle" fill="#86E1F7" fontSize="7.5" fontFamily="monospace">CRM / QC</text>
          </g>
        )}

        {milestoneId === 'M11' && (
          <g>
            <rect x="54" y="36" width="46" height="44" rx="2" fill="#12334D" stroke="#42C7E8" strokeWidth="1.4" />
            <text x="77" y="52" textAnchor="middle" fill="#F5FAFC" fontSize="8" fontFamily="monospace">INV=POD</text>
            <text x="77" y="66" textAnchor="middle" fill="#3CA77A" fontSize="8" fontFamily="monospace">CN LINK</text>
            <rect x="114" y="64" width="12" height="16" fill="#42C7E8" fillOpacity="0.6" />
            <rect x="132" y="52" width="12" height="28" fill="#42C7E8" fillOpacity="0.8" />
            <rect x="150" y="40" width="12" height="40" fill="#3CA77A" />
          </g>
        )}
      </svg>
    </div>
  );
};
