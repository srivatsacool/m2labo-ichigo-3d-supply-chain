import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ChecklistInteractionState,
  LightboxImageInfo,
  ModuleId,
  ProcessStateType,
  RolePerspective,
  ValidationStatus,
  VisualMode,
} from '../types/blueprint';
import { MILESTONES } from '../data/milestonesData';
import { OPEN_QUESTIONS_REGISTER } from '../data/openQuestionsData';
import { OpenQuestionRecord } from '../types/blueprint';

export interface BlueprintFilters {
  milestoneId: string; // 'ALL' or 'M01'..'M11'
  status: ValidationStatus | 'ALL';
  roleKeyword: string;
  processState: ProcessStateType | 'ALL';
  questionState: 'ALL' | 'OPEN' | 'RESOLVED';
}

interface ChecklistAuditEntry {
  id: string;
  timestamp: string;
  milestoneId: string;
  itemId: string;
  actor: string;
  action: string;
}

interface BlueprintContextValue {
  activeModule: ModuleId;
  setActiveModule: (mod: ModuleId) => void;
  activeMilestoneId: string;
  setActiveMilestoneId: (id: string) => void;
  milestoneDetailOpen: boolean;
  setMilestoneDetailOpen: (open: boolean) => void;
  openMilestoneWorkspace: (id: string) => void;
  perspective: RolePerspective;
  setPerspective: (p: RolePerspective) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  visualMode: VisualMode;
  setVisualMode: (m: VisualMode) => void;
  mode3D: boolean;
  setMode3D: (v: boolean) => void;
  lightboxImage: LightboxImageInfo | null;
  setLightboxImage: (img: LightboxImageInfo | null) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filters: BlueprintFilters;
  setFilters: React.Dispatch<React.SetStateAction<BlueprintFilters>>;
  checklistState: Record<string, ChecklistInteractionState>;
  updateChecklistItem: (itemId: string, milestoneId: string, patch: Partial<ChecklistInteractionState>) => void;
  resetDemoChecklists: () => void;
  auditTrail: ChecklistAuditEntry[];
  questions: OpenQuestionRecord[];
  updateQuestion: (id: string, patch: Partial<OpenQuestionRecord>) => void;
  selectedScenarioId: string;
  setSelectedScenarioId: (id: string) => void;
}

const DEFAULT_FILTERS: BlueprintFilters = {
  milestoneId: 'ALL',
  status: 'ALL',
  roleKeyword: 'ALL',
  processState: 'ALL',
  questionState: 'ALL',
};

const STORAGE_KEY_CHECKLIST = 'm2labo_ichigo_demo_checklists_v1';
const STORAGE_KEY_AUDIT = 'm2labo_ichigo_demo_audit_v1';
const STORAGE_KEY_QUESTIONS = 'm2labo_ichigo_demo_questions_v1';

const SEED_DEMO_CHECKLISTS: Record<string, ChecklistInteractionState> = {
  'M01-CHK-1': {
    checked: true,
    timestamp: '2026-11-20 06:00 IST (DEMO)',
    readingValue: '4 Channels',
    supervisorSignedOff: true,
    supervisorName: 'Demo Ops Supervisor',
  },
  'M05-CHK-1': {
    checked: true,
    timestamp: '2026-11-20 11:30 IST (DEMO)',
    readingValue: '250.0 g',
    supervisorSignedOff: true,
    supervisorName: 'Demo QC Lead',
  },
};

const BlueprintContext = createContext<BlueprintContextValue | undefined>(undefined);

export const BlueprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleId>('blueprint');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('M01');
  const [milestoneDetailOpen, setMilestoneDetailOpen] = useState<boolean>(false);
  const [perspective, setPerspective] = useState<RolePerspective>('MANAGEMENT');
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [visualMode, setVisualMode] = useState<VisualMode>('PICTURE');
  const mode3D = visualMode === '3D_SPATIAL';
  const setMode3D = (v: boolean) => setVisualMode(v ? '3D_SPATIAL' : 'PICTURE');
  const [lightboxImage, setLightboxImage] = useState<LightboxImageInfo | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<BlueprintFilters>(DEFAULT_FILTERS);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('SCN-10');

  const [checklistState, setChecklistState] = useState<Record<string, ChecklistInteractionState>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      return raw ? JSON.parse(raw) : SEED_DEMO_CHECKLISTS;
    } catch {
      return SEED_DEMO_CHECKLISTS;
    }
  });

  const [auditTrail, setAuditTrail] = useState<ChecklistAuditEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_AUDIT);
      return raw
        ? JSON.parse(raw)
        : [
            {
              id: 'AUD-SEED-1',
              timestamp: '2026-11-20 06:00 IST',
              milestoneId: 'M01',
              itemId: 'M01-CHK-1',
              actor: 'Demo Planner (Local Only)',
              action: 'Initial demonstration baseline verified',
            },
          ];
    } catch {
      return [];
    }
  });

  const [questions, setQuestions] = useState<OpenQuestionRecord[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      return raw ? JSON.parse(raw) : OPEN_QUESTIONS_REGISTER;
    } catch {
      return OPEN_QUESTIONS_REGISTER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklistState));
    } catch {
      // Ignore storage quota errors
    }
  }, [checklistState]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(auditTrail.slice(0, 60)));
    } catch {
      // Ignore storage quota errors
    }
  }, [auditTrail]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch {
      // Ignore storage quota errors
    }
  }, [questions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openMilestoneWorkspace = (id: string) => {
    const found = MILESTONES.find((m) => m.id === id);
    if (found) {
      setActiveMilestoneId(found.id);
      setActiveModule('blueprint');
      setMilestoneDetailOpen(true);
    }
  };

  const updateChecklistItem = (itemId: string, milestoneId: string, patch: Partial<ChecklistInteractionState>) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC (LOCAL DEMO)';
    setChecklistState((prev) => {
      const next = {
        ...prev,
        [itemId]: {
          ...(prev[itemId] || { checked: false }),
          ...patch,
          timestamp: now,
        },
      };
      return next;
    });

    const summary = patch.supervisorSignedOff
      ? 'Supervisor demo sign-off recorded'
      : patch.escalated
      ? 'Escalation flagged (Local Demo)'
      : patch.failed
      ? 'Failure status flagged (Local Demo)'
      : patch.checked
      ? 'Task marked complete (Local Demo)'
      : 'Task record updated (Local Demo)';

    setAuditTrail((prev) => [
      {
        id: `AUD-${Date.now()}`,
        timestamp: now,
        milestoneId,
        itemId,
        actor: `${perspective} View (Local Demo)`,
        action: summary,
      },
      ...prev.slice(0, 49),
    ]);
  };

  const resetDemoChecklists = () => {
    setChecklistState(SEED_DEMO_CHECKLISTS);
    setAuditTrail([
      {
        id: `AUD-RST-${Date.now()}`,
        timestamp: new Date().toISOString().slice(0, 16) + ' UTC',
        milestoneId: 'ALL',
        itemId: 'SYSTEM',
        actor: 'User',
        action: 'Local demonstration checklists reset to initial state',
      },
    ]);
  };

  const updateQuestion = (id: string, patch: Partial<OpenQuestionRecord>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  };

  return (
    <BlueprintContext.Provider
      value={{
        activeModule,
        setActiveModule,
        activeMilestoneId,
        setActiveMilestoneId,
        milestoneDetailOpen,
        setMilestoneDetailOpen,
        openMilestoneWorkspace,
        perspective,
        setPerspective,
        reducedMotion,
        setReducedMotion,
        visualMode,
        setVisualMode,
        mode3D,
        setMode3D,
        lightboxImage,
        setLightboxImage,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        checklistState,
        updateChecklistItem,
        resetDemoChecklists,
        auditTrail,
        questions,
        updateQuestion,
        selectedScenarioId,
        setSelectedScenarioId,
      }}
    >
      <div className={reducedMotion ? 'reduced-motion min-h-screen bg-blueprint-grid text-[#F5FAFC]' : 'min-h-screen bg-blueprint-grid text-[#F5FAFC]'}>
        {children}
      </div>
    </BlueprintContext.Provider>
  );
};

export function useBlueprint() {
  const ctx = useContext(BlueprintContext);
  if (!ctx) throw new Error('useBlueprint must be used within BlueprintProvider');
  return ctx;
}
