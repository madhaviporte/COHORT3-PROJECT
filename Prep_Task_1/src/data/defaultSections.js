import { dsaProblems } from './dsaProblems';
import { gitQuestions } from './gitQuestions';
import { fullstackQuestions } from './fullstackQuestions';
import { generateId } from '../utils/id';

export function createDefaultWeek(title, description = '') {
  return {
    id: generateId(),
    title,
    description,
    createdAt: Date.now(),
    dsaProblems: dsaProblems.map((problem) => ({
      id: generateId(),
      title: problem.title,
      topic: problem.topic,
      difficulty: problem.difficulty,
      link: problem.link,
      completed: false,
    })),
    gitQuestions: gitQuestions.map((question) => ({
      id: generateId(),
      question: question.question,
      answer: question.answer,
      notes: '',
      reviewed: false,
    })),
    fullstackQuestions: fullstackQuestions.map((question) => ({
      id: generateId(),
      question: question.question,
      answer: question.answer,
      notes: '',
      reviewed: false,
    })),
    trackerQuestions: [],
    customSections: [],
  };
}
