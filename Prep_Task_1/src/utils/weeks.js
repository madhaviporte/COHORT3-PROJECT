import { generateId } from './id';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];
const CATEGORIES = ['DSA', 'Git', 'Technical'];
const WEEK_NUMBER_PATTERN = /^week\s*#?\s*(\d+)/i;

function asString(value) {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function takeId(value, usedIds) {
  const id = asString(value).trim();
  if (id && !usedIds.has(id)) {
    usedIds.add(id);
    return id;
  }

  let nextId = generateId();
  while (usedIds.has(nextId)) nextId = generateId();
  usedIds.add(nextId);
  return nextId;
}

function normalizeProblem(raw, usedIds) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    ...raw,
    id: takeId(raw.id, usedIds),
    title: asString(raw.title).trim() || 'Untitled problem',
    topic: asString(raw.topic).trim(),
    difficulty: pick(raw.difficulty, DIFFICULTIES, 'Easy'),
    link: asString(raw.link).trim(),
    completed: Boolean(raw.completed),
  };
}

function normalizeQuestion(raw, usedIds) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    ...raw,
    id: takeId(raw.id, usedIds),
    question: asString(raw.question).trim() || 'Untitled question',
    answer: asString(raw.answer),
    notes: asString(raw.notes),
    reviewed: Boolean(raw.reviewed),
  };
}

function normalizeTrackerQuestion(raw, usedIds) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    ...raw,
    id: takeId(raw.id, usedIds),
    title: asString(raw.title).trim() || 'Untitled question',
    category: pick(raw.category, CATEGORIES, 'Technical'),
    difficulty: pick(raw.difficulty, DIFFICULTIES, 'Easy'),
    status: pick(raw.status, STATUSES, 'Pending'),
    notes: asString(raw.notes),
  };
}

function normalizeTask(raw, usedIds) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    ...raw,
    id: takeId(raw.id, usedIds),
    title: asString(raw.title).trim() || 'Untitled task',
    description: asString(raw.description),
    link: asString(raw.link).trim(),
    completed: Boolean(raw.completed),
  };
}

function normalizeCustomSection(raw, usedIds) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    ...raw,
    id: takeId(raw.id, usedIds),
    title: asString(raw.title).trim() || 'Custom section',
    description: asString(raw.description),
    tasks: asArray(raw.tasks)
      .map((task) => normalizeTask(task, usedIds))
      .filter(Boolean),
  };
}

export function normalizeWeek(raw, index = 0, usedWeekIds = new Set()) {
  if (!raw || typeof raw !== 'object') return null;

  const weekId = takeId(raw.id, usedWeekIds);
  const usedItemIds = new Set();

  return {
    ...raw,
    id: weekId,
    title: asString(raw.title).trim() || `Week ${index + 1}`,
    description: asString(raw.description),
    createdAt: Number(raw.createdAt) || Date.now(),
    dsaProblems: asArray(raw.dsaProblems)
      .map((problem) => normalizeProblem(problem, usedItemIds))
      .filter(Boolean),
    gitQuestions: asArray(raw.gitQuestions)
      .map((question) => normalizeQuestion(question, usedItemIds))
      .filter(Boolean),
    fullstackQuestions: asArray(raw.fullstackQuestions)
      .map((question) => normalizeQuestion(question, usedItemIds))
      .filter(Boolean),
    trackerQuestions: asArray(raw.trackerQuestions)
      .map((question) => normalizeTrackerQuestion(question, usedItemIds))
      .filter(Boolean),
    customSections: asArray(raw.customSections)
      .map((section) => normalizeCustomSection(section, usedItemIds))
      .filter(Boolean),
  };
}

export function normalizeWeeks(rawWeeks) {
  if (!Array.isArray(rawWeeks)) return [];
  const usedWeekIds = new Set();
  return rawWeeks
    .map((week, index) => normalizeWeek(week, index, usedWeekIds))
    .filter(Boolean);
}

function getWeekNumber(title) {
  const match = WEEK_NUMBER_PATTERN.exec(asString(title).trim());
  return match ? Number(match[1]) : null;
}

export function validateWeekTitle(title, weeks = [], ignoreId = null) {
  const value = asString(title).trim();
  if (!value) return 'Week title is required.';

  const others = weeks.filter((week) => String(week.id) !== String(ignoreId));

  if (others.some((week) => asString(week.title).trim().toLowerCase() === value.toLowerCase())) {
    return `A week named "${value}" already exists.`;
  }

  const number = getWeekNumber(value);
  if (number !== null) {
    const clash = others.find((week) => getWeekNumber(week.title) === number);
    if (clash) return `Week number ${number} is already used by "${clash.title}".`;
  }

  return null;
}

export function getNextWeekTitle(weeks = []) {
  const numbers = weeks
    .map((week) => getWeekNumber(week.title))
    .filter((number) => number !== null);
  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : weeks.length + 1;
  return `Week ${nextNumber}`;
}
