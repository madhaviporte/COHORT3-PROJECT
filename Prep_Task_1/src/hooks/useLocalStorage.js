import { useCallback, useEffect, useState } from 'react';

function readStoredValue(key, fallback) {
  const defaultValue = typeof fallback === 'function' ? fallback() : fallback;
  if (typeof window === 'undefined') return defaultValue;

  let raw;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return defaultValue;
  }

  if (raw === null) return defaultValue;

  try {
    return JSON.parse(raw);
  } catch {
    try {
      window.localStorage.setItem(`${key}__backup`, raw);
    } catch {
      // Storage can be unavailable (private mode, quota). The app keeps working in memory.
    }
    return defaultValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota or blocked-storage errors; state still updates for this session.
    }
  }, [key, value]);

  const update = useCallback((next) => {
    setValue((previous) => (typeof next === 'function' ? next(previous) : next));
  }, []);

  useEffect(() => {
    function handleStorageEvent(event) {
      if (event.key !== key) return;
      setValue(readStoredValue(key, initialValue));
    }

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, [key, initialValue]);

  return [value, update];
}

export default useLocalStorage;
