import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, ChevronLeft, Database, MapPin, ShieldAlert } from 'lucide-react';
import { StationId } from '../data/types';
import { OPERATIONAL_STATIONS } from '../stations/stationsData';
import { getExceptionsForStation } from '../exceptions/exceptionsData';

gsap.registerPlugin(ScrollTrigger);

interface ScrollJourneyControllerProps {
  journeyProgress: number;
  selectedStationId: StationId | null;
  activeJourneyStationId: StationId;
  isPlaying: boolean;
  reducedMotion: boolean;
  onScrollProgress: (progress: number, stationId: StationId) => void;
  onSelectStation: (stationId: StationId) => void;
  onInspectStationDetails: (stationId: StationId) => void;
  onOpenInfoExplorer: (stationId: StationId) => void;
}

const STATION_SCROLL_CENTERS: Record<StationId, number> = {
  'ST-01': 0.05,
  'ST-02': 0.21,
  'ST-03': 0.34,
  'ST-04': 0.56,
  'ST-05': 0.68,
  'ST-06': 0.83,
  'ST-07': 0.92,
  'ST-08': 0.99,
};

export const ScrollJourneyController: React.FC<ScrollJourneyControllerProps> = ({
  journeyProgress,
  selectedStationId,
  activeJourneyStationId,
  isPlaying,
  reducedMotion,
  onScrollProgress,
  onSelectStation,
  onInspectStationDetails,
  onOpenInfoExplorer,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const lastEmittedProgressRef = useRef(journeyProgress);
  // Default collapsed so the 3D Farm & entire landscape are unobstructed on launch
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (collapsed) return;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        scroller,
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reducedMotion ? false : 0.35,
        onUpdate: (self) => {
          if (isProgrammaticScrollRef.current) return;
          const p = Math.max(0, Math.min(1, self.progress));
          if (Math.abs(p - lastEmittedProgressRef.current) < 0.002) return;
          lastEmittedProgressRef.current = p;

          const total = OPERATIONAL_STATIONS.length;
          const idx = Math.min(total - 1, Math.floor(p * total));
          const stationId = OPERATIONAL_STATIONS[idx].id;
          onScrollProgress(p, stationId);
        },
      });
    }, scrollerRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [collapsed, reducedMotion, onScrollProgress]);

  useEffect(() => {
    if (collapsed) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollHeight - scroller.clientHeight;
    if (maxScroll <= 0) return;

    const targetTop = journeyProgress * maxScroll;
    if (Math.abs(scroller.scrollTop - targetTop) < 6) return;
    if (!isPlaying && Math.abs(journeyProgress - lastEmittedProgressRef.current) < 0.004) return;

    isProgrammaticScrollRef.current = true;
    scroller.scrollTo({
      top: targetTop,
      behavior: isPlaying || reducedMotion ? 'auto' : 'smooth',
    });
    lastEmittedProgressRef.current = journeyProgress;

    const t = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, isPlaying ? 30 : 320);

    return () => window.clearTimeout(t);
  }, [collapsed, journeyProgress, isPlaying, reducedMotion]);

  if (collapsed) {
    return (
      <div className="pointer-events-auto absolute left-3 top-3 z-20 hidden sm:block">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 rounded-lg glass-panel px-3 py-2 text-[13px] font-semibold text-[#EDF3F7] transition-colors hover:border-[#42C7E8] hover:text-[#42C7E8]"
        >
          <BookOpen className="h-4 w-4 text-[#42C7E8]" />
          <span>Story Chapters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={scrollerRef}
      aria-label="Scroll-driven operational journey chapters"
      className="pointer-events-none absolute bottom-36 left-3 top-3 z-20 hidden w-[355px] overflow-y-auto pr-2 sm:block"
    >
      <div ref={trackRef} className="space-y-[34vh] pb-[40vh] pt-1">
        {OPERATIONAL_STATIONS.map((station, idx) => {
          const isCurrent = (selectedStationId ?? activeJourneyStationId) === station.id;
          const exceptions = getExceptionsForStation(station.id);

          return (
            <section
              key={station.id}
              aria-label={`Chapter ${station.number}: ${station.title}`}
              className={`pointer-events-auto rounded-xl border p-4 backdrop-blur-md transition-all ${
                isCurrent
                  ? 'border-[#42C7E8] bg-[#071524]/94 shadow-[0_14px_34px_rgba(3,10,18,0.6)]'
                  : 'border-[#42C7E8]/25 bg-[#071524]/84 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-[12px]">
                  <span className="rounded bg-[#42C7E8] px-2 py-0.5 font-bold text-[#061220]">
                    {station.number} / 0{OPERATIONAL_STATIONS.length}
                  </span>
                  <span className="text-[#A9E8F5]">{station.shortTitle}</span>
                </div>
                {idx === 0 && (
                  <button
                    type="button"
                    onClick={() => setCollapsed(true)}
                    title="Collapse scroll narrative rail"
                    className="rounded border border-[#42C7E8]/30 bg-[#102A43] p-1 text-[#A9E8F5] hover:text-[#F4F7F8]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
              </div>

              <h3 className="mt-2 text-[18px] font-bold leading-snug text-[#F4F7F8]">{station.title}</h3>
              <p className="mt-0.5 font-mono text-[12px] text-[#9BB4C7]">{station.zoneLabel}</p>

              {station.custodyBanner && (
                <div className="mt-2.5 rounded border border-[#3CA77A]/60 bg-[#3CA77A]/15 px-2.5 py-1 font-mono text-[12px] font-bold text-[#5EE8A8]">
                  {station.custodyBanner}
                </div>
              )}

              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#E2EDF5]">{station.summary}</p>

              <div className="mt-3 space-y-1.5 border-t border-[#42C7E8]/20 pt-2.5 text-[12.5px]">
                <div className="text-[#5EE8A8]">
                  <span className="font-mono font-bold">FLOW: </span>
                  <span className="text-[#EDF3F7]">{station.materialMovement.actions[0]}</span>
                </div>
                <div className="flex items-start gap-1.5 font-mono text-[12px] text-[#7BE0F7]">
                  <Database className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{station.informationFlowSummary.primaryEntityId}</span>
                </div>
                {exceptions.length > 0 && (
                  <div className="flex items-center gap-1.5 font-mono text-[12px] text-[#FCD34D]">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                    <span>{exceptions.length} Exception Branch(es)</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectStation(station.id);
                    const scroller = scrollerRef.current;
                    if (scroller) {
                      isProgrammaticScrollRef.current = true;
                      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
                      scroller.scrollTo({
                        top: STATION_SCROLL_CENTERS[station.id] * maxScroll,
                        behavior: reducedMotion ? 'auto' : 'smooth',
                      });
                      window.setTimeout(() => {
                        isProgrammaticScrollRef.current = false;
                      }, 300);
                    }
                  }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#42C7E8]/45 bg-[#14324B] py-1.5 font-mono text-[12px] font-semibold text-[#A9E8F5] hover:bg-[#42C7E8] hover:text-[#061220]"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Focus 3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => onInspectStationDetails(station.id)}
                  className="flex-1 rounded-md border border-[#3CA77A]/55 bg-[#3CA77A]/15 py-1.5 font-mono text-[12px] font-semibold text-[#5EE8A8] hover:bg-[#3CA77A] hover:text-[#061220]"
                >
                  Inspect Stage
                </button>
                <button
                  type="button"
                  onClick={() => onOpenInfoExplorer(station.id)}
                  className="rounded-md border border-[#42C7E8]/30 bg-[#0A1C2E] px-2.5 py-1.5 font-mono text-[12px] text-[#42C7E8] hover:border-[#42C7E8]"
                >
                  ERP
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
