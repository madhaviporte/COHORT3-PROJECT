export function generateId() {
  return Date.now() + Math.floor(Math.random() * 10000);
}

// Sample tasks shown on first load before the user has created any tasks.
export const sampleTasks = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create a modern and responsive landing page for the product.',
    priority: 'high',
    dueDate: '2026-11-02',
    status: 'todo',
  },
  {
    id: 2,
    title: 'Fix login bug',
    description: 'Resolve the issue where users cannot log in on mobile devices.',
    priority: 'medium',
    dueDate: '2026-11-04',
    status: 'todo',
  },
  {
    id: 3,
    title: 'Build API integration',
    description: 'Integrate the payment gateway API.',
    priority: 'medium',
    dueDate: '2026-11-06',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Implement authentication',
    description: 'Add JWT-based authentication and protected routes.',
    priority: 'high',
    dueDate: '2026-11-08',
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Setup project structure',
    description: 'Initialize the React project and dependencies.',
    priority: 'low',
    dueDate: '2026-10-27',
    status: 'completed',
  },
];

export function getFilteredTasks(tasks, search, priority, status) {
  const query = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = query ? task.title.toLowerCase().includes(query) : true;
    const matchesPriority = priority === 'all' ? true : task.priority === priority;
    const matchesStatus = status === 'all' ? true : task.status === status;

    return matchesSearch && matchesPriority && matchesStatus;
  });
}
