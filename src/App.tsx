import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SyntheticDataBadge } from './components/ui/SyntheticDataBadge';
import { ExecutiveSummary } from './pages/ExecutiveSummary';
import { RawDataExplorer } from './pages/RawDataExplorer';
import { ValidationStage } from './pages/ValidationStage';
import { CleaningStage } from './pages/CleaningStage';
import { StandardizationStage } from './pages/StandardizationStage';
import { DeduplicationStage } from './pages/DeduplicationStage';
import { QualityDashboard } from './pages/QualityDashboard';
import { BeforeAfterComparison } from './pages/BeforeAfterComparison';
import { IssueBreakdown } from './pages/IssueBreakdown';
import { About } from './pages/About';
import { FilterProvider, useFilters } from './hooks/useFilters';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      
      <Footer />
      <SyntheticDataBadge />
    </div>
  );
}

function App() {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExecutiveSummary />} />
          <Route path="raw" element={<RawDataExplorer />} />
          <Route path="validation" element={<ValidationStage />} />
          <Route path="cleaning" element={<CleaningStage />} />
          <Route path="standardization" element={<StandardizationStage />} />
          <Route path="deduplication" element={<DeduplicationStage />} />
          <Route path="quality" element={<QualityDashboard />} />
          <Route path="comparison" element={<BeforeAfterComparison />} />
          <Route path="issues" element={<IssueBreakdown />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </FilterProvider>
  );
}

export default App;