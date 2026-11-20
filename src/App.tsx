import React from 'react';
import { BlueprintProvider, useBlueprint } from './context/BlueprintContext';
import { TopCommandBar } from './components/layout/TopCommandBar';
import { ModuleNavRail } from './components/layout/ModuleNavRail';
import { GlobalSearchModal } from './components/modules/GlobalSearchModal';
import { ExecutiveOverview } from './components/modules/ExecutiveOverview';
import { HorizontalBlueprint } from './components/modules/HorizontalBlueprint';
import { WorkerHandbook } from './components/modules/WorkerHandbook';
import { TaskChecklistsModule } from './components/modules/TaskChecklistsModule';
import { RiskFmeaLibrary } from './components/modules/RiskFmeaLibrary';
import { ScenarioSimulator } from './components/modules/ScenarioSimulator';
import { TraceabilityExplorer } from './components/modules/TraceabilityExplorer';
import { EquipmentPackagingAtlas } from './components/modules/EquipmentPackagingAtlas';
import { KpiAnalyticsDashboard } from './components/modules/KpiAnalyticsDashboard';
import { OpenQuestionsRegister } from './components/modules/OpenQuestionsRegister';

const ActiveWorkspace: React.FC = () => {
  const { activeModule } = useBlueprint();

  switch (activeModule) {
    case 'overview':
      return <ExecutiveOverview />;
    case 'blueprint':
      return <HorizontalBlueprint />;
    case 'handbook':
      return <WorkerHandbook />;
    case 'checklists':
      return <TaskChecklistsModule />;
    case 'risks':
      return <RiskFmeaLibrary />;
    case 'scenarios':
      return <ScenarioSimulator />;
    case 'traceability':
      return <TraceabilityExplorer />;
    case 'atlas':
      return <EquipmentPackagingAtlas />;
    case 'kpis':
      return <KpiAnalyticsDashboard />;
    case 'questions':
      return <OpenQuestionsRegister />;
    default:
      return <HorizontalBlueprint />;
  }
};

export function App() {
  return (
    <BlueprintProvider>
      <div className="flex min-h-screen flex-col">
        <TopCommandBar />
        <ModuleNavRail />
        <main className="flex-1">
          <ActiveWorkspace />
        </main>
        <footer className="no-print border-t border-[#42C7E8]/20 bg-[#0B1F33] px-4 py-3 text-center font-mono text-[11px] text-[#9BB4C5]">
          THE COLD CHAIN — M2LABO BHARAT / ICHIGO® INTERACTIVE SUPPLY CHAIN BLUEPRINT · CONFIRMED / PROPOSED / UNKNOWN / ILLUSTRATIVE GOVERNANCE ACTIVE · NO LIVE ERP/GPS INTEGRATIONS IMPLIED
        </footer>
        <GlobalSearchModal />
      </div>
    </BlueprintProvider>
  );
}

export default App;
