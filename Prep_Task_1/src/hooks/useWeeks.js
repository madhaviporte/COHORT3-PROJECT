import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';
import { createDefaultWeek } from '../data/defaultSections';
import { normalizeWeek, normalizeWeeks } from '../utils/weeks';
import { generateId } from '../utils/id';

const WEEKS_KEY = 'weeks';

function parseLegacyMap(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function buildLegacyWeek() {
  if (typeof window === 'undefined') return null;

  try {
    const storage = window.localStorage;
    const legacyQuestions = storage.getItem('prep-questions');
    const dsaProgress = storage.getItem('dsa-progress');
    const gitProgress = storage.getItem('git-progress');
    const fullstackProgress = storage.getItem('fullstack-progress');

    if (!legacyQuestions && !dsaProgress && !gitProgress && !fullstackProgress) return null;

    const week = createDefaultWeek('Week 1', 'Imported from the earlier single-week tracker');

    const dsaMap = parseLegacyMap(dsaProgress);
    if (dsaMap) {
      week.dsaProblems = week.dsaProblems.map((problem, index) => ({
        ...problem,
        completed: Boolean(dsaMap[index + 1] ?? dsaMap[String(index + 1)]),
      }));
    }

    const gitMap = parseLegacyMap(gitProgress);
    if (gitMap) {
      week.gitQuestions = week.gitQuestions.map((question, index) => ({
        ...question,
        reviewed: Boolean(gitMap[index + 1] ?? gitMap[String(index + 1)]),
      }));
    }

    const fullstackMap = parseLegacyMap(fullstackProgress);
    if (fullstackMap) {
      week.fullstackQuestions = week.fullstackQuestions.map((question, index) => ({
        ...question,
        reviewed: Boolean(fullstackMap[index + 1] ?? fullstackMap[String(index + 1)]),
      }));
    }

    if (legacyQuestions) {
      const parsedQuestions = JSON.parse(legacyQuestions);
      if (Array.isArray(parsedQuestions)) {
        week.trackerQuestions = parsedQuestions
          .filter((question) => question && typeof question === 'object')
          .map((question) => ({
            id: generateId(),
            title: question.title,
            category: question.category,
            difficulty: question.difficulty,
            status: question.status,
            notes: question.notes,
          }));
      }
    }

    return normalizeWeek(week);
  } catch {
    return null;
  }
}

function loadInitialWeeks() {
  if (typeof window === 'undefined') return [];

  try {
    // Never touch data that already exists in the current schema. React may call
    // this initializer more than once in development, so it must stay idempotent.
    if (window.localStorage.getItem(WEEKS_KEY) !== null) return [];

    const migratedWeek = buildLegacyWeek();
    if (!migratedWeek) return [];

    // Legacy keys are intentionally kept so nothing is destroyed during migration.
    return [migratedWeek];
  } catch {
    return [];
  }
}

function useWeeks() {
  const [storedWeeks, setStoredWeeks] = useLocalStorage(WEEKS_KEY, loadInitialWeeks);
  const weeks = useMemo(() => normalizeWeeks(storedWeeks), [storedWeeks]);

  const createWeek = useCallback(({ title, description }) => {
    const week = createDefaultWeek(String(title ?? '').trim(), String(description ?? '').trim());
    setStoredWeeks((previous) => [...normalizeWeeks(previous), week]);
    return week;
  }, [setStoredWeeks]);

  const updateWeek = useCallback((weekId, updater) => {
    setStoredWeeks((previous) => normalizeWeeks(previous).map((week) => (
      week.id === weekId ? updater(week) : week
    )));
  }, [setStoredWeeks]);

  const deleteWeek = useCallback((weekId) => {
    setStoredWeeks((previous) => normalizeWeeks(previous).filter((week) => week.id !== weekId));
  }, [setStoredWeeks]);

  return { weeks, createWeek, updateWeek, deleteWeek };
}

export default useWeeks;
