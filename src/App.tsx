import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { FlowLayerMode, NavTabId, StationId } from './data/types';
import { OPERATIONAL_STATIONS } from './stations/stationsData';
import { getSubStepByProgress, JOURNEY_SUB_STEPS } from './process/journeyPathData';
import { TopNavBar } from './components/TopNavBar';
import { KpiStrip } from './components/KpiStrip';
import { BottomJourneyControls } from './components/BottomJourneyControls';
import { StationDetailPanel } from './components/StationDetailPanel';
import { InformationFlowView } from './information/InformationFlowView';
import { ExceptionsExplorerView } from './exceptions/ExceptionsExplorerView';
import { DataArchitectureView } from './information/DataArchitectureView';

const LazyIchigoWorldScene = lazy(() => import('./scene/IchigoWorldScene'));

const STATION_PROGRESS_ANCHORS: Record<StationId, number> = {
  'ST-01': 0.04,
  'ST-02': 0.24,
  'ST-03': 0.36,
  'ST-04': 0.54,
  'ST-05': 0.68,
  'ST-06': 0.86,
  'ST-07': 0.94,
  'ST-08': 0.99,
};

export function App() {
  const [activeNav, setActiveNav] = useState<NavTabId>('JOURNEY');
  const [flowMode, setFlowMode] = useState<FlowLayerMode>('COMBINED');
  const [selectedStationId, setSelectedStationId] = useState<StationId | null>('ST-01');
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);
  const [infoExplorerStationFilter, setInfoExplorerStationFilter] = useState<StationId | 'ALL'>('ALL');

  const [journeyProgress, setJourneyProgress] = useState<number>(0.02);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [followShipment, setFollowShipment] = useState<boolean>(false);
  const [cameraResetNonce, setCameraResetNonce] = useState<number>(0);

  const [force2D, setForce2D] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showExceptionPins, setShowExceptionPins] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  // Smooth shipment journey playback loop
  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      setJourneyProgress((prev) => {
        const speed = reducedMotion ? 0.08 : 0.045; // ~22 seconds full downstream journey
        const next = prev + dt * speed;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, reducedMotion]);

  const activeSubStep = useMemo(() => getSubStepByProgress(journeyProgress), [journeyProgress]);

  const handleSelectStation = useCallback((stationId: StationId) => {
    setSelectedStationId(stationId);
    setSelectedExceptionId(null);
    setFollowShipment(false);
    setJourneyProgress(STATION_PROGRESS_ANCHORS[stationId]);
  }, []);

  const handleRestart = useCallback(() => {
    setJourneyProgress(0);
    setSelectedStationId('ST-01');
    setSelectedExceptionId(null);
    setIsPlaying(true);
  }, []);

  const handlePrevStage = useCallback(() => {
    setIsPlaying(false);
    setFollowShipment(false);
    const currentId = selectedStationId ?? activeSubStep.stationId;
    const idx = OPERATIONAL_STATIONS.findIndex((s) => s.id === currentId);
    const prevIdx = idx <= 0 ? 0 : idx - 1;
    const targetId = OPERATIONAL_STATIONS[prevIdx].id;
    setSelectedStationId(targetId);
    setSelectedExceptionId(null);
    setJourneyProgress(STATION_PROGRESS_ANCHORS[targetId]);
  }, [selectedStationId, activeSubStep.stationId]);

  const handleNextStage = useCallback(() => {
    setIsPlaying(false);
    setFollowShipment(false);
    const currentId = selectedStationId ?? activeSubStep.stationId;
    const idx = OPERATIONAL_STATIONS.findIndex((s) => s.id === currentId);
    const nextIdx = idx >= OPERATIONAL_STATIONS.length - 1 ? OPERATIONAL_STATIONS.length - 1 : idx + 1;
    const targetId = OPERATIONAL_STATIONS[nextIdx].id;
    setSelectedStationId(targetId);
    setSelectedExceptionId(null);
    setJourneyProgress(STATION_PROGRESS_ANCHORS[targetId]);
  }, [selectedStationId, activeSubStep.stationId]);

  const handleScrubProgress = useCallback((val: number) => {
    setIsPlaying(false);
    setJourneyProgress(val);
    const step = getSubStepByProgress(val);
    setSelectedStationId(step.stationId);
  }, []);

  const handleResetCamera = useCallback(() => {
    setFollowShipment(false);
    setSelectedStationId(null);
    setSelectedExceptionId(null);
    setCameraResetNonce((n) => n + 1);
  }, []);

  const handleFocusStationIn3D = useCallback((stationId: StationId) => {
    setActiveNav('JOURNEY');
    setForce2D(false);
    setFollowShipment(false);
    setSelectedStationId(stationId);
    setSelectedExceptionId(null);
    setJourneyProgress(STATION_PROGRESS_ANCHORS[stationId]);
  }, []);

  const handleFocusExceptionIn3D = useCallback((exceptionId: string, stationId: StationId) => {
    setActiveNav('JOURNEY');
    setForce2D(false);
    setFollowShipment(false);
    setShowExceptionPins(true);
    setSelectedStationId(stationId);
    setSelectedExceptionId(exceptionId);
    setJourneyProgress(STATION_PROGRESS_ANCHORS[stationId]);
  }, []);

  const handleOpenInfoExplorerForStation = useCallback((stationId: StationId) => {
    setInfoExplorerStationFilter(stationId);
    setActiveNav('INFORMATION_FLOW');
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (journeyProgress >= 0.995) {
      setJourneyProgress(0);
    }
    setIsPlaying((p) => !p);
  }, [journeyProgress]);

  // Keyboard navigation shortcuts (Space = Play/Pause, Left/Right = Prev/Next stage)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeNav !== 'JOURNEY') return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextStage();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStage();
      } else if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeNav, handleNextStage, handlePrevStage, handleTogglePlay]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#102A43] text-[#F4F7F8]">
      <TopNavBar
        activeNav={activeNav}
        onChangeNav={setActiveNav}
        flowMode={flowMode}
        onChangeFlowMode={setFlowMode}
        force2D={force2D}
        onToggle2D={() => setForce2D((v) => !v)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels((v) => !v)}
        showExceptionPins={showExceptionPins}
        onToggleExceptionPins={() => setShowExceptionPins((v) => !v)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((v) => !v)}
      />

      <KpiStrip onOpenExceptions={() => setActiveNav('EXCEPTIONS')} />

      <main className="relative flex-1 overflow-hidden">
        {activeNav === 'JOURNEY' && (
          <>
            <Suspense
              fallback={
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#0A1C2E] text-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#42C7E8] border-t-transparent" />
                  <p className="mt-3 font-mono text-xs text-[#A9E8F5]">
                    Initializing M2Labo ICHIGO® Low-Poly 3D Supply Chain...
                  </p>
                </div>
              }
            >
              <LazyIchigoWorldScene
                selectedStationId={selectedStationId}
                activeJourneyStationId={activeSubStep.stationId}
                journeyProgress={journeyProgress}
                flowMode={flowMode}
                showLabels={showLabels}
                showExceptionPins={showExceptionPins}
                selectedExceptionId={selectedExceptionId}
                followShipment={followShipment}
                cameraResetNonce={cameraResetNonce}
                reducedMotion={reducedMotion}
                force2D={force2D}
                onSelectStation={handleSelectStation}
                onSelectException={(excId, stId) => {
                  setSelectedStationId(stId);
                  setSelectedExceptionId(excId);
                }}
              />
            </Suspense>

            {/* Compact Blueprint Legend & Camera Hint (Top-Left Overlay) */}
            {!force2D && (
              <div className="pointer-events-none absolute left-3 top-3 z-10 hidden max-w-xs space-y-1.5 rounded-lg glass-panel px-3 py-2 sm:block">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#3CA77A]">
                  <span className="h-2 w-2 rounded-full bg-[#3CA77A]" />
                  <span>M2LABO CUSTODY BEGINS AT STATION 01</span>
                </div>
                <p className="font-mono text-[9px] text-[#A9E8F5]">
                  Drag to rotate • Right-drag to pan • Scroll to zoom • Click any 3D station
                </p>
                <div className="flex flex-wrap gap-2 pt-0.5 font-mono text-[9px]">
                  <span className="text-[#3CA77A]">■ Physical Flow</span>
                  <span className="text-[#42C7E8]">■ ERP/CRM Info</span>
                  <span className="text-[#E9A23B]">■ Returns / Warn</span>
                  <span className="text-[#D9534F]">■ Quarantine / Crit</span>
                </div>
              </div>
            )}

            {/* Selected Station Information Drawer */}
            {selectedStationId && (
              <StationDetailPanel
                stationId={selectedStationId}
                flowMode={flowMode}
                selectedExceptionId={selectedExceptionId}
                onClose={() => {
                  setSelectedStationId(null);
                  setSelectedExceptionId(null);
                }}
                onOpenInfoExplorer={handleOpenInfoExplorerForStation}
                onSelectException={(excId) => setSelectedExceptionId(excId)}
              />
            )}

            {/* Bottom Journey Controls & Progress Rail */}
            <BottomJourneyControls
              journeyProgress={journeyProgress}
              isPlaying={isPlaying}
              activeSubStep={activeSubStep}
              selectedStationId={selectedStationId}
              followShipment={followShipment}
              onTogglePlay={handleTogglePlay}
              onRestart={handleRestart}
              onPrevStage={handlePrevStage}
              onNextStage={handleNextStage}
              onSelectStationStage={handleSelectStation}
              onScrubProgress={handleScrubProgress}
              onToggleFollow={() => setFollowShipment((v) => !v)}
              onResetCamera={handleResetCamera}
            />

            {/* Keep JOURNEY_SUB_STEPS referenced cleanly */}
            <span className="sr-only">Total journey stages: {JOURNEY_SUB_STEPS.length}</span>
          </>
        )}

        {activeNav === 'INFORMATION_FLOW' && (
          <InformationFlowView
            key={infoExplorerStationFilter}
            selectedStationFilter={infoExplorerStationFilter}
            flowMode={flowMode}
            onChangeFlowMode={setFlowMode}
            onFocusStationIn3D={handleFocusStationIn3D}
          />
        )}

        {activeNav === 'EXCEPTIONS' && (
          <ExceptionsExplorerView onFocusExceptionIn3D={handleFocusExceptionIn3D} />
        )}

        {activeNav === 'DATA_ARCHITECTURE' && (
          <DataArchitectureView
            onFocusStationIn3D={handleFocusStationIn3D}
            onOpenInfoFlowForStation={handleOpenInfoExplorerForStation}
          />
        )}
      </main>
    </div>
  );
}

export default App;
