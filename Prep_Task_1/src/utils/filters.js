export const ALL_CATEGORIES = 'All Categories';
export const ALL_STATUSES = 'All Status';
export const ALL_DIFFICULTIES = 'All Difficulties';

export const EMPTY_FILTERS = {
  search: '',
  category: ALL_CATEGORIES,
  status: ALL_STATUSES,
  difficulty: ALL_DIFFICULTIES,
};

export function filterTrackerQuestions(questions = [], filters = EMPTY_FILTERS) {
  const search = String(filters.search ?? '').trim().toLowerCase();

  return questions.filter((question) => {
    const title = String(question.title ?? '').toLowerCase();
    if (search && !title.includes(search)) return false;
    if (filters.category !== ALL_CATEGORIES && question.category !== filters.category) return false;
    if (filters.status !== ALL_STATUSES && question.status !== filters.status) return false;
    if (filters.difficulty !== ALL_DIFFICULTIES && question.difficulty !== filters.difficulty) return false;
    return true;
  });
}

export function hasActiveFilters(filters = EMPTY_FILTERS) {
  return (
    String(filters.search ?? '').trim() !== '' ||
    filters.category !== ALL_CATEGORIES ||
    filters.status !== ALL_STATUSES ||
    filters.difficulty !== ALL_DIFFICULTIES
  );
}
