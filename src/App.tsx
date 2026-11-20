import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CameraMode, FlowLayerMode, NavTabId, StationId } from './data/types';
import { getStationById, OPERATIONAL_STATIONS } from './stations/stationsData';
import { getSubStepByProgress, JOURNEY_SUB_STEPS } from './process/journeyPathData';
import { TopNavBar } from './components/TopNavBar';
import { BottomJourneyControls } from './components/BottomJourneyControls';
import { StationDetailPanel } from './components/StationDetailPanel';
import { ScrollJourneyController } from './components/ScrollJourneyController';
import { TutorialGuideModal } from './components/TutorialGuideModal';
import { InformationFlowView } from './information/InformationFlowView';
import { ExceptionsExplorerView } from './exceptions/ExceptionsExplorerView';
import { DataArchitectureView } from './information/DataArchitectureView';
import { soundEngine } from './audio/SoundEngine';

const LazyIchigoWorldScene = lazy(() => import('./scene/IchigoWorldScene'));

const TUTORIAL_STORAGE_KEY = 'ichigo_v2_tutorial_seen';

const STATION_PROGRESS_ANCHORS: Record<StationId, number> = {
  'ST-01': 0.04,
  'ST-02': 0.21,
  'ST-03': 0.34,
  'ST-04': 0.56,
  'ST-05': 0.68,
  'ST-06': 0.85,
  'ST-07': 0.92,
  'ST-08': 0.98,
};

export function App() {
  // Primary Defaults: Material Flow + Follow/Track Shipment + Play Journey active by default
  const [activeNav, setActiveNav] = useState<NavTabId>('JOURNEY');
  const [flowMode, setFlowMode] = useState<FlowLayerMode>('MATERIAL');
  const [cameraMode, setCameraMode] = useState<CameraMode>('OVERVIEW');

  const [selectedStationId, setSelectedStationId] = useState<StationId | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [selectedExceptionId, setSelectedExceptionId] = useState<string | null>(null);
  const [infoExplorerStationFilter, setInfoExplorerStationFilter] = useState<StationId | 'ALL'>('ALL');

  const [journeyProgress, setJourneyProgress] = useState<number>(0.02);
  const journeyProgressRef = useRef<number>(0.02);
  const lastStepIdRef = useRef<string>(JOURNEY_SUB_STEPS[0].id);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [followShipment, setFollowShipment] = useState<boolean>(true);
  const [cameraResetNonce, setCameraResetNonce] = useState<number>(0);

  const [force2D, setForce2D] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showExceptionPins, setShowExceptionPins] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showTutorial, setShowTutorial] = useState<boolean>(() => {
    try {
      return localStorage.getItem(TUTORIAL_STORAGE_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Unlock Web Audio cleanly on first user interaction
  useEffect(() => {
    const unlock = () => {
      soundEngine.unlock();
      if (isPlaying && soundEnabled) {
        soundEngine.setJourneyAmbient(true);
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [isPlaying, soundEnabled]);

  useEffect(() => {
    soundEngine.setJourneyAmbient(isPlaying && activeNav === 'JOURNEY' && !force2D);
    return () => {
      soundEngine.setJourneyAmbient(false);
    };
  }, [isPlaying, activeNav, force2D]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const setProgressSync = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    journeyProgressRef.current = clamped;
    setJourneyProgress(clamped);
    const step = getSubStepByProgress(clamped);
    lastStepIdRef.current = step.id;
  }, []);

  // 60fps ref-driven journey playback + ~10Hz throttled React UI sync (eliminates 60fps React re-render lag!)
  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();
    let lastUiSync = lastTime;

    const tick = (now: number) => {
      if (document.hidden) {
        lastTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // Calm cinematic pace (~90s full 13-step journey at 1x) with user-selectable 0.5x / 1x / 2x
      const baseSpeed = reducedMotion ? 0.016 : 0.011;
      const speed = baseSpeed * playbackSpeed;
      let next = journeyProgressRef.current + dt * speed;
      if (next >= 1) {
        // Loop seamlessly so the live strawberry cold-chain stays in continuous motion
        next = 0;
      }
      journeyProgressRef.current = next;

      const step = getSubStepByProgress(next);
      const stepChanged = step.id !== lastStepIdRef.current;
      if (stepChanged) {
        lastStepIdRef.current = step.id;
        soundEngine.playStageCue(step.stationId, !!step.reverseLoop);
      }

      if (stepChanged || now - lastUiSync >= 95) {
        lastUiSync = now;
        setJourneyProgress(next);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, reducedMotion, playbackSpeed]);

  const activeSubStep = useMemo(() => getSubStepByProgress(journeyProgress), [journeyProgress]);

  const handleSelectStation = useCallback(
    (stationId: StationId) => {
      soundEngine.unlock();
      soundEngine.playStageCue(stationId);
      setSelectedStationId(stationId);
      setSelectedExceptionId(null);
      setFollowShipment(false);
      setProgressSync(STATION_PROGRESS_ANCHORS[stationId]);
    },
    [setProgressSync]
  );

  const handleInspectFullStation = useCallback(
    (stationId: StationId) => {
      soundEngine.unlock();
      soundEngine.playUiClick();
      setSelectedStationId(stationId);
      setSelectedExceptionId(null);
      setFollowShipment(false);
      setProgressSync(STATION_PROGRESS_ANCHORS[stationId]);
      setIsDetailOpen(true);
    },
    [setProgressSync]
  );

  const handleScrollProgress = useCallback(
    (progress: number, stationId: StationId) => {
      setIsPlaying(false);
      setProgressSync(progress);
      setSelectedStationId(stationId);
    },
    [setProgressSync]
  );

  const handleRestart = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playQrScan();
    setProgressSync(0);
    setSelectedStationId(null);
    setSelectedExceptionId(null);
    setFollowShipment(true);
    setIsPlaying(true);
  }, [setProgressSync]);

  const handlePrevStage = useCallback(() => {
    soundEngine.unlock();
    setIsPlaying(false);
    setFollowShipment(false);
    const currentId = selectedStationId ?? activeSubStep.stationId;
    const idx = OPERATIONAL_STATIONS.findIndex((s) => s.id === currentId);
    const prevIdx = idx <= 0 ? 0 : idx - 1;
    const targetId = OPERATIONAL_STATIONS[prevIdx].id;
    soundEngine.playStageCue(targetId);
    setSelectedStationId(targetId);
    setSelectedExceptionId(null);
    setProgressSync(STATION_PROGRESS_ANCHORS[targetId]);
  }, [selectedStationId, activeSubStep.stationId, setProgressSync]);

  const handleNextStage = useCallback(() => {
    soundEngine.unlock();
    setIsPlaying(false);
    setFollowShipment(false);
    const currentId = selectedStationId ?? activeSubStep.stationId;
    const idx = OPERATIONAL_STATIONS.findIndex((s) => s.id === currentId);
    const nextIdx = idx >= OPERATIONAL_STATIONS.length - 1 ? OPERATIONAL_STATIONS.length - 1 : idx + 1;
    const targetId = OPERATIONAL_STATIONS[nextIdx].id;
    soundEngine.playStageCue(targetId);
    setSelectedStationId(targetId);
    setSelectedExceptionId(null);
    setProgressSync(STATION_PROGRESS_ANCHORS[targetId]);
  }, [selectedStationId, activeSubStep.stationId, setProgressSync]);

  const handleScrubProgress = useCallback(
    (val: number) => {
      setIsPlaying(false);
      setProgressSync(val);
      const step = getSubStepByProgress(val);
      setSelectedStationId(step.stationId);
    },
    [setProgressSync]
  );

  const handleResetView = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playCameraSwitch();
    setCameraMode('OVERVIEW');
    setFollowShipment(false);
    setSelectedStationId(null);
    setSelectedExceptionId(null);
    setCameraResetNonce((n) => n + 1);
  }, []);

  const handleChangeCameraMode = useCallback((mode: CameraMode) => {
    soundEngine.unlock();
    soundEngine.playCameraSwitch();
    setCameraMode(mode);
  }, []);

  const handleChangeFlowMode = useCallback((mode: FlowLayerMode) => {
    soundEngine.unlock();
    soundEngine.playFlowToggle();
    setFlowMode(mode);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
      return next;
    });
  }, []);

  const handleStartGuidedJourney = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playQrScan();
    try {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, '1');
    } catch {
      // ignore storage errors
    }
    setShowTutorial(false);
    setActiveNav('JOURNEY');
    setForce2D(false);
    setFlowMode('MATERIAL');
    setFollowShipment(true);
    setIsPlaying(true);
  }, []);

  const handleCloseTutorial = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playUiClick();
    try {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setShowTutorial(false);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playUiClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const handleFocusStationIn3D = useCallback(
    (stationId: StationId) => {
      soundEngine.unlock();
      soundEngine.playStageCue(stationId);
      setActiveNav('JOURNEY');
      setForce2D(false);
      setFollowShipment(false);
      setSelectedStationId(stationId);
      setSelectedExceptionId(null);
      setProgressSync(STATION_PROGRESS_ANCHORS[stationId]);
      setIsDetailOpen(true);
    },
    [setProgressSync]
  );

  const handleFocusExceptionIn3D = useCallback(
    (exceptionId: string, stationId: StationId) => {
      soundEngine.unlock();
      soundEngine.playWarningPing();
      setActiveNav('JOURNEY');
      setForce2D(false);
      setFollowShipment(false);
      setShowExceptionPins(true);
      setSelectedStationId(stationId);
      setSelectedExceptionId(exceptionId);
      setProgressSync(STATION_PROGRESS_ANCHORS[stationId]);
      setIsDetailOpen(true);
    },
    [setProgressSync]
  );

  const handleOpenInfoExplorerForStation = useCallback((stationId: StationId) => {
    soundEngine.unlock();
    soundEngine.playUiClick();
    setInfoExplorerStationFilter(stationId);
    setActiveNav('INFORMATION_FLOW');
  }, []);

  const handleTogglePlay = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playUiClick();
    if (journeyProgressRef.current >= 0.995) {
      setProgressSync(0);
    }
    setIsPlaying((p) => !p);
  }, [setProgressSync]);

  // Global keyboard shortcuts only when in OVERVIEW (WASD/Arrows drive walking in FIRST_PERSON & THIRD_PERSON)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeNav !== 'JOURNEY' || cameraMode !== 'OVERVIEW' || showTutorial) return;
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
  }, [activeNav, cameraMode, showTutorial, handleNextStage, handlePrevStage, handleTogglePlay]);

  const activeStationId = selectedStationId ?? activeSubStep.stationId;
  const activeMobileStation = getStationById(activeStationId);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#081726] text-[#F4F7F8]">
      <TopNavBar
        activeNav={activeNav}
        onChangeNav={(nav) => {
          soundEngine.unlock();
          soundEngine.playUiClick();
          setActiveNav(nav);
        }}
        flowMode={flowMode}
        onChangeFlowMode={handleChangeFlowMode}
        cameraMode={cameraMode}
        onChangeCameraMode={handleChangeCameraMode}
        activeStationId={activeStationId}
        force2D={force2D}
        onToggle2D={() => {
          soundEngine.unlock();
          soundEngine.playUiClick();
          setForce2D((v) => !v);
        }}
        showLabels={showLabels}
        onToggleLabels={() => {
          soundEngine.unlock();
          soundEngine.playUiClick();
          setShowLabels((v) => !v);
        }}
        showExceptionPins={showExceptionPins}
        onToggleExceptionPins={() => {
          soundEngine.unlock();
          soundEngine.playWarningPing();
          setShowExceptionPins((v) => !v);
        }}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => {
          soundEngine.unlock();
          soundEngine.playUiClick();
          setReducedMotion((v) => !v);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTutorial={() => {
          soundEngine.unlock();
          soundEngine.playUiClick();
          setShowTutorial(true);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onResetView={handleResetView}
        onInspectSelected={() => handleInspectFullStation(activeStationId)}
      />

      <main className="relative flex-1 overflow-hidden">
        {activeNav === 'JOURNEY' && (
          <>
            <Suspense
              fallback={
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#081726] text-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#42C7E8] border-t-transparent" />
                  <p className="mt-3 text-sm font-semibold text-[#A9E8F5]">
                    Initializing M2Labo ICHIGO® Strawberry Cold-Chain World…
                  </p>
                </div>
              }
            >
              <LazyIchigoWorldScene
                cameraMode={cameraMode}
                selectedStationId={selectedStationId}
                activeJourneyStationId={activeSubStep.stationId}
                journeyProgressRef={journeyProgressRef}
                flowMode={flowMode}
                showLabels={showLabels}
                showExceptionPins={showExceptionPins}
                isDetailOpen={isDetailOpen}
                selectedExceptionId={selectedExceptionId}
                followShipment={followShipment}
                cameraResetNonce={cameraResetNonce}
                reducedMotion={reducedMotion}
                force2D={force2D}
                onSelectStation={handleSelectStation}
                onInspectFullStation={handleInspectFullStation}
                onSelectException={(excId, stId) => {
                  soundEngine.unlock();
                  soundEngine.playWarningPing();
                  setSelectedStationId(stId);
                  setSelectedExceptionId(excId);
                  setIsDetailOpen(true);
                }}
              />
            </Suspense>

            {!force2D && (
              <ScrollJourneyController
                journeyProgress={journeyProgress}
                selectedStationId={selectedStationId}
                activeJourneyStationId={activeSubStep.stationId}
                isPlaying={isPlaying}
                reducedMotion={reducedMotion}
                onScrollProgress={handleScrollProgress}
                onSelectStation={handleSelectStation}
                onInspectStationDetails={handleInspectFullStation}
                onOpenInfoExplorer={handleOpenInfoExplorerForStation}
              />
            )}

            {!force2D && !isDetailOpen && (
              <div className="pointer-events-auto absolute left-2.5 right-2.5 top-2.5 z-10 flex items-center justify-between gap-2 rounded-xl glass-panel px-3 py-2 sm:hidden">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#42C7E8]">
                    <span>STAGE {activeMobileStation.number}</span>
                    <span className="text-[#5EE8A8]">· {activeMobileStation.shortTitle}</span>
                  </div>
                  <div className="truncate text-[13.5px] font-semibold text-[#F4F7F8]">
                    {activeSubStep.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleInspectFullStation(activeMobileStation.id)}
                  className="shrink-0 rounded-md border border-[#42C7E8]/60 bg-[#173B57] px-2.5 py-1 font-mono text-[11px] font-bold text-[#F4F7F8]"
                >
                  Inspect
                </button>
              </div>
            )}

            {isDetailOpen && (
              <StationDetailPanel
                stationId={activeStationId}
                flowMode={flowMode}
                selectedExceptionId={selectedExceptionId}
                onClose={() => {
                  soundEngine.playUiClick();
                  setIsDetailOpen(false);
                  setSelectedExceptionId(null);
                }}
                onOpenInfoExplorer={handleOpenInfoExplorerForStation}
                onSelectException={(excId) => {
                  soundEngine.playWarningPing();
                  setSelectedExceptionId(excId);
                }}
                onSelectNextStation={handleInspectFullStation}
              />
            )}

            <BottomJourneyControls
              journeyProgress={journeyProgress}
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              activeSubStep={activeSubStep}
              selectedStationId={selectedStationId}
              followShipment={followShipment}
              isDetailOpen={isDetailOpen}
              onTogglePlay={handleTogglePlay}
              onCycleSpeed={() => {
                soundEngine.unlock();
                soundEngine.playUiClick();
                setPlaybackSpeed((s) => (s === 0.5 ? 1 : s === 1 ? 2 : 0.5));
              }}
              onRestart={handleRestart}
              onPrevStage={handlePrevStage}
              onNextStage={handleNextStage}
              onSelectStationStage={handleSelectStation}
              onScrubProgress={handleScrubProgress}
              onToggleFollow={() => {
                soundEngine.unlock();
                soundEngine.playCameraSwitch();
                setFollowShipment((v) => !v);
              }}
              onResetCamera={handleResetView}
              onToggleDetailPanel={() => {
                soundEngine.unlock();
                soundEngine.playUiClick();
                if (!selectedStationId) {
                  setSelectedStationId(activeSubStep.stationId);
                }
                setIsDetailOpen((v) => !v);
              }}
            />

            <span className="sr-only">Total journey steps: {JOURNEY_SUB_STEPS.length}</span>
          </>
        )}

        {activeNav === 'INFORMATION_FLOW' && (
          <InformationFlowView
            key={infoExplorerStationFilter}
            selectedStationFilter={infoExplorerStationFilter}
            flowMode={flowMode}
            onChangeFlowMode={handleChangeFlowMode}
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

      {/* Interactive Visitor Tutorial & Feature Walkthrough */}
      {showTutorial && (
        <TutorialGuideModal
          cameraMode={cameraMode}
          flowMode={flowMode}
          onChangeCameraMode={handleChangeCameraMode}
          onChangeFlowMode={handleChangeFlowMode}
          onStartGuidedJourney={handleStartGuidedJourney}
          onClose={handleCloseTutorial}
        />
      )}
    </div>
  );
}

export default App;
