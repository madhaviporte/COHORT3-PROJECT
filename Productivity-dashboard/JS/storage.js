/**
 * Storage.js
 * Wrapper utilities for handling localStorage saves and loads safely.
 */
const Storage = {
  /**
   * Keep data persisted in localStorage.
   * @param {string} key - Storage namespace.
   * @param {*} value - Data payload.
   */
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving key "${key}" to LocalStorage:`, e);
      return false;
    }
  },

  /**
   * Retrieve structured data payload from localStorage.
   * @param {string} key - Storage namespace.
   * @param {*} defaultValue - Fallback value if key is not found.
   */
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return defaultValue;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error loading key "${key}" from LocalStorage:`, e);
      return defaultValue;
    }
  },

  /**
   * Delete records associated with a key.
   * @param {string} key - Storage namespace.
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing key "${key}" from LocalStorage:`, e);
      return false;
    }
  }
};
window.Storage = Storage;
