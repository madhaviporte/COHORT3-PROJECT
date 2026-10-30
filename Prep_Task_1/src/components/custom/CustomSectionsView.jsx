import { useState } from 'react';
import { Layers, Plus } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import CustomSection from './CustomSection';
import CustomSectionForm from './CustomSectionForm';

function CustomSectionsView({ sections, onSaveSection, onDeleteSection, onUpdateTasks }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  function openCreate() {
    setEditingSection(null);
    setFormOpen(true);
  }

  function openEdit(section) {
    setEditingSection(section);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingSection(null);
  }

  function handleSave(data) {
    onSaveSection(data, editingSection ? editingSection.id : null);
    closeForm();
  }

  return (
    <div className="custom-sections">
      <div className="list-heading">
        <div>
          <h2>Custom sections</h2>
          <p className="list-heading-sub">
            Add your own topics such as aptitude, system design, OS, DBMS or HR interview prep.
          </p>
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={openCreate}>
          <Plus size={15} />
          Add section
        </button>
      </div>

      {sections.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No custom sections yet"
          message="Create a section for any extra topic you want to track in this week. Each section has its own tasks, links and progress."
          action={{ label: 'Add a custom section', icon: Plus, onClick: openCreate }}
        />
      ) : (
        <div className="custom-sections-list">
          {sections.map((section) => (
            <CustomSection
              key={section.id}
              section={section}
              onUpdateTasks={(tasks) => onUpdateTasks(section.id, tasks)}
              onEditSection={() => openEdit(section)}
              onDeleteSection={() => onDeleteSection(section.id)}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <CustomSectionForm
          section={editingSection}
          existingTitles={sections.map((section) => section.title)}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default CustomSectionsView;
