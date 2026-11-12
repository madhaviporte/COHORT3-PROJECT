import { dsaProblems } from './dsaProblems';
import { gitQuestions } from './gitQuestions';
import { fullstackQuestions } from './fullstackQuestions';
import { generateId } from '../utils/id';

function createWeekSkeleton(title, description = '') {
  return {
    id: generateId(),
    title,
    description,
    createdAt: Date.now(),
    dsaProblems: [],
    gitQuestions: [],
    fullstackQuestions: [],
    trackerQuestions: [],
    customSections: [],
  };
}

// A freshly created week always gets the four default sections, but no content:
// every problem/question/task is entered by the user through the Add forms.
export function createDefaultWeek(title, description = '') {
  return createWeekSkeleton(title, description);
}

// Only used by the legacy single-week migration, which maps the old progress
// flags onto the original seed lists. Never use this when creating a new week.
export function createLegacySeedWeek(title, description = '') {
  const week = createWeekSkeleton(title, description);

  week.dsaProblems = dsaProblems.map((problem) => ({
    id: generateId(),
    title: problem.title,
    topic: problem.topic,
    difficulty: problem.difficulty,
    link: problem.link,
    completed: false,
  }));

  week.gitQuestions = gitQuestions.map((question) => ({
    id: generateId(),
    question: question.question,
    answer: question.answer,
    notes: '',
    reviewed: false,
  }));

  week.fullstackQuestions = fullstackQuestions.map((question) => ({
    id: generateId(),
    question: question.question,
    answer: question.answer,
    notes: '',
    reviewed: false,
  }));

  return week;
}
