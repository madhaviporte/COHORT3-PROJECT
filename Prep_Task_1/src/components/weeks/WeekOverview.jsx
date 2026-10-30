import { useState } from 'react';
import { ArrowLeft, BarChart3, Pencil, Trash2 } from 'lucide-react';
import ConfirmDialog from '../common/ConfirmDialog';
import ProgressBar from '../common/ProgressBar';
import DSASection from '../dsa/DSASection';
import GitSection from '../git/GitSection';
import TechnicalSection from '../technical/TechnicalSection';
import TrackerSection from '../tracker/TrackerSection';
import CustomSectionsView from '../custom/CustomSectionsView';
import WeekForm from './WeekForm';
import { WEEK_SECTIONS } from '../../data/sections';
import {
  getCustomSectionsProgress,
  getDSAProgress,
  getQAProgress,
  getTrackerProgress,
  getWeekOverallProgress,
} from '../../utils/progress';
import { generateId } from '../../utils/id';

function WeekOverview({
  week,
  weeks,
  activeSection,
  onSectionChange,
  onBack,
  onUpdateWeek,
  onDeleteWeek,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const customSections = week.customSections || [];
  const dsa = getDSAProgress(week.dsaProblems || []);
  const git = getQAProgress(week.gitQuestions || []);
  const technical = getQAProgress(week.fullstackQuestions || []);
  const tracker = getTrackerProgress(week.trackerQuestions || []);
  const custom = getCustomSectionsProgress(customSections);
  const overall = getWeekOverallProgress(week);

  const summaries = [
    { id: 'dsa', label: 'DSA', value: `${dsa.done}/${dsa.total}` },
    { id: 'git', label: 'Git', value: `${git.done}/${git.total}` },
    { id: 'technical', label: 'Full stack', value: `${technical.done}/${technical.total}` },
    { id: 'tracker', label: 'Machine coding', value: `${tracker.done}/${tracker.total}` },
    ...(custom.total > 0
      ? [{ id: 'custom', label: 'Custom', value: `${custom.done}/${custom.total}` }]
      : []),
  ];

  function updateField(field, value) {
    onUpdateWeek(week.id, (current) => ({ ...current, [field]: value }));
  }

  function handleSaveCustomSection(data, sectionId) {
    if (sectionId) {
      updateField('customSections', customSections.map((section) => (
        section.id === sectionId ? { ...section, ...data } : section
      )));
      return;
    }

    updateField('customSections', [
      ...customSections,
      { id: generateId(), ...data, tasks: [] },
    ]);
  }

  function handleDeleteCustomSection(sectionId) {
    updateField('customSections', customSections.filter((section) => section.id !== sectionId));
  }

  function handleUpdateCustomTasks(sectionId, tasks) {
    updateField('customSections', customSections.map((section) => (
      section.id === sectionId ? { ...section, tasks } : section
    )));
  }

  const current = WEEK_SECTIONS.find((section) => section.id === activeSection) || WEEK_SECTIONS[0];

  return (
    <div className="page">
      <div className="week-hero">
        <div className="week-hero-main">
          <button type="button" className="back-link" onClick={onBack}>
            <ArrowLeft size={15} />
            All weeks
          </button>

          <div className="week-title-row">
            <h1 className="page-title">{week.title}</h1>
            <div className="week-title-actions">
              <button
                type="button"
                className="icon-btn"
                title="Edit week"
                aria-label="Edit week"
                onClick={() => setEditOpen(true)}
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                title="Delete week"
                aria-label="Delete week"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <p className="page-subtitle">
            {week.description || 'No description added yet — edit the week to add focus areas.'}
          </p>
        </div>

        <div className="week-progress-card">
          <div className="week-progress-head">
            <BarChart3 size={16} aria-hidden="true" />
            <span>Week progress</span>
            <strong>{overall}%</strong>
          </div>
          <ProgressBar percent={overall} label={`${week.title} overall completion`} />
          <ul className="week-summary-list">
            {summaries.map((item) => (
              <li key={item.id}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-tabs" role="tablist" aria-label="Week sections">
        {WEEK_SECTIONS.map(({ id, shortLabel, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`section-tab-${id}`}
            aria-selected={activeSection === id}
            aria-controls={`section-panel-${id}`}
            tabIndex={activeSection === id ? 0 : -1}
            className={`section-tab ${activeSection === id ? 'is-active' : ''}`}
            onClick={() => onSectionChange(id)}
          >
            <Icon size={15} aria-hidden="true" />
            {shortLabel}
            {id === 'custom' && customSections.length > 0 && (
              <span className="tab-count">{customSections.length}</span>
            )}
          </button>
        ))}
      </div>

      <div
        className="section-content"
        role="tabpanel"
        id={`section-panel-${activeSection}`}
        aria-labelledby={`section-tab-${activeSection}`}
      >
        {activeSection === 'dsa' && (
          <DSASection
            problems={week.dsaProblems || []}
            onUpdate={(problems) => updateField('dsaProblems', problems)}
          />
        )}

        {activeSection === 'git' && (
          <GitSection
            questions={week.gitQuestions || []}
            onUpdate={(questions) => updateField('gitQuestions', questions)}
          />
        )}

        {activeSection === 'technical' && (
          <TechnicalSection
            questions={week.fullstackQuestions || []}
            onUpdate={(questions) => updateField('fullstackQuestions', questions)}
          />
        )}

        {activeSection === 'tracker' && (
          <TrackerSection
            questions={week.trackerQuestions || []}
            onUpdate={(questions) => updateField('trackerQuestions', questions)}
          />
        )}

        {activeSection === 'custom' && (
          <CustomSectionsView
            sections={customSections}
            onSaveSection={handleSaveCustomSection}
            onDeleteSection={handleDeleteCustomSection}
            onUpdateTasks={handleUpdateCustomTasks}
          />
        )}
      </div>

      <p className="section-note">
        Viewing <strong>{current.label}</strong> · changes save to this browser automatically.
      </p>

      {editOpen && (
        <WeekForm
          week={week}
          weeks={weeks}
          onSave={(data) => {
            onUpdateWeek(week.id, (currentWeek) => ({ ...currentWeek, ...data }));
            setEditOpen(false);
          }}
          onClose={() => setEditOpen(false)}
        />
      )}

      {deleteOpen && (
        <ConfirmDialog
          title={`Delete "${week.title}"?`}
          message="This permanently deletes the week with all its problems, questions, answers and custom sections. This cannot be undone."
          onConfirm={() => {
            setDeleteOpen(false);
            onDeleteWeek(week.id);
          }}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}

export default WeekOverview;
