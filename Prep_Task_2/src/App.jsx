import { useState } from 'react';
import Header from './components/Header/Header';
import SearchFilter from './components/SearchFilter/SearchFilter';
import TaskBoard from './components/TaskBoard/TaskBoard';
import useLocalStorage from './hooks/useLocalStorage';
import { sampleTasks, generateId, getFilteredTasks } from './utils/taskHelpers';
import './App.scss';

function App() {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', sampleTasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (formData) => {
    if (formData.id !== undefined) {
      setTasks((current) =>
        current.map((task) =>
          task.id === formData.id ? { ...task, ...formData } : task
        )
      );
    } else {
      const newTask = { ...formData, id: generateId(), status: 'todo' };
      setTasks((current) => [newTask, ...current]);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (id) => {
    if (!window.confirm('Delete this task?')) return;
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = getFilteredTasks(tasks, search, priority, status);
  const isFiltering = search.trim() !== '' || priority !== 'all' || status !== 'all';

  return (
    <main className="app">
      <Header onAddTask={handleAddTask} />

      <SearchFilter
        search={search}
        priority={priority}
        status={status}
        onSearchChange={setSearch}
        onPriorityChange={setPriority}
        onStatusChange={setStatus}
      />

      <TaskBoard
        tasks={filteredTasks}
        allTasksCount={tasks.length}
        isFiltering={isFiltering}
        isModalOpen={isModalOpen}
        selectedTask={selectedTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onCloseModal={handleCloseModal}
        onSaveTask={handleSaveTask}
        onAddTask={handleAddTask}
      />
    </main>
  );
}

export default App;
