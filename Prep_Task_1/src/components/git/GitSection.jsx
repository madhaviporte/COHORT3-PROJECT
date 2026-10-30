import { GitBranch } from 'lucide-react';
import QAWorkspace from '../common/QAWorkspace';

function GitSection({ questions, onUpdate }) {
  return (
    <QAWorkspace
      title="Git & GitHub Interview"
      icon={GitBranch}
      accent="amber"
      questions={questions}
      onUpdate={onUpdate}
      itemLabel="Git question"
      emptyTitle="No Git questions yet"
      emptyMessage="Add a question about merge conflicts, rebasing, reverts or team workflows and mark it reviewed when you are confident."
    />
  );
}

export default GitSection;
