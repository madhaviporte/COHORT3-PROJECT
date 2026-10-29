import Column from '../Column/Column';
import TaskModal from '../TaskModal/TaskModal';
import EmptyState from '../EmptyState/EmptyState';
import './TaskBoard.scss';

const columns = [
  { title: 'Todo', status: 'todo' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Completed', status: 'completed' },
];

function TaskBoard({
  tasks,
  allTasksCount,
  isFiltering,
  isModalOpen,
  selectedTask,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onCloseModal,
  onSaveTask,
  onAddTask,
}) {
  if (allTasksCount === 0) {
    return (
      <>
        <EmptyState
          message="No tasks yet"
          subMessage="Add your first task to get started."
          showAddButton
          onAddTask={onAddTask}
        />
        <TaskModal
          isOpen={isModalOpen}
          task={selectedTask}
          onClose={onCloseModal}
          onSave={onSaveTask}
        />
      </>
    );
  }

  if (tasks.length === 0 && isFiltering) {
    return (
      <>
        <EmptyState
          message="No matching tasks"
          subMessage="Try adjusting your search or filters."
        />
        <TaskModal
          isOpen={isModalOpen}
          task={selectedTask}
          onClose={onCloseModal}
          onSave={onSaveTask}
        />
      </>
    );
  }

  return (
    <>
      <section className="task-board">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter((task) => task.status === column.status)}
            isFiltering={isFiltering}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onStatusChange={onStatusChange}
          />
        ))}
      </section>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={onCloseModal}
        onSave={onSaveTask}
      />
    </>
  );
}

export default TaskBoard;
