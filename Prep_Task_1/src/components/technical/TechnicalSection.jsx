import { BookOpen } from 'lucide-react';
import QAWorkspace from '../common/QAWorkspace';

function TechnicalSection({ questions, onUpdate }) {
  return (
    <QAWorkspace
      title="Full Stack Technical Interview"
      icon={BookOpen}
      accent="sky"
      questions={questions}
      onUpdate={onUpdate}
      itemLabel="technical question"
      emptyTitle="No technical questions yet"
      emptyMessage="Add a React, API, database or systems question, write your answer and track revision progress."
    />
  );
}

export default TechnicalSection;
