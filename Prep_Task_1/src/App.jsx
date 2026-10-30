import { useCallback, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import WeekList from './components/weeks/WeekList';
import WeekOverview from './components/weeks/WeekOverview';
import useLocalStorage from './hooks/useLocalStorage';
import useWeeks from './hooks/useWeeks';
import { WEEK_SECTIONS } from './data/sections';
import './App.scss';

function App() {
  const { weeks, createWeek, updateWeek, deleteWeek } = useWeeks();
  const [activeWeekId, setActiveWeekId] = useLocalStorage('active-week-id', null);
  const [activeSection, setActiveSection] = useState(WEEK_SECTIONS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeWeek = weeks.find((week) => week.id === String(activeWeekId ?? '')) || null;
  const activeSectionLabel = WEEK_SECTIONS.find((section) => section.id === activeSection)?.label;

  const openWeek = useCallback((weekId) => {
    setActiveWeekId(weekId);
    setActiveSection('dsa');
    setSidebarOpen(false);
  }, [setActiveWeekId]);

  const showAllWeeks = useCallback(() => {
    setActiveWeekId(null);
    setSidebarOpen(false);
  }, [setActiveWeekId]);

  const selectSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  }, []);

  const handleCreateWeek = useCallback((data) => {
    const week = createWeek(data);
    setActiveWeekId(week.id);
    setActiveSection('dsa');
  }, [createWeek, setActiveWeekId]);

  const handleEditWeek = useCallback((weekId, data) => {
    updateWeek(weekId, (current) => ({ ...current, ...data }));
  }, [updateWeek]);

  const handleDeleteWeek = useCallback((weekId) => {
    deleteWeek(weekId);
    setActiveWeekId((current) => (String(current ?? '') === weekId ? null : current));
  }, [deleteWeek, setActiveWeekId]);

  const breadcrumb = activeWeek
    ? `${activeWeek.title} / ${activeSectionLabel}`
    : 'All weeks';

  return (
    <div className="app-shell">
      <Sidebar
        weeks={weeks}
        activeWeek={activeWeek}
        activeSection={activeSection}
        onShowAll={showAllWeeks}
        onOpenWeek={openWeek}
        onSelectSection={selectSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Topbar breadcrumb={breadcrumb} onOpenMenu={() => setSidebarOpen(true)} />

        <main className="content">
          {activeWeek ? (
            <WeekOverview
              week={activeWeek}
              weeks={weeks}
              activeSection={activeSection}
              onSectionChange={selectSection}
              onBack={showAllWeeks}
              onUpdateWeek={updateWeek}
              onDeleteWeek={handleDeleteWeek}
            />
          ) : (
            <WeekList
              weeks={weeks}
              onCreateWeek={handleCreateWeek}
              onOpenWeek={openWeek}
              onEditWeek={handleEditWeek}
              onDeleteWeek={handleDeleteWeek}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
