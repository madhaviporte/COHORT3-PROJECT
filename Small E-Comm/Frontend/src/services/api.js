/**
 * api.js — Centralized Axios Client
 *
 * This file creates a single Axios instance that every service module uses.
 * Having one place for the base URL and interceptors means:
 *   - We update the backend URL in one place (the .env file)
 *   - Token refresh logic lives here, not scattered across every API call
 *
 * How the token interceptor works (simple explanation):
 *
 *  1. REQUEST interceptor:
 *     Before every request, check if there's a token in memory.
 *     If yes, add "Authorization: Bearer <token>" to the headers.
 *
 *  2. RESPONSE interceptor:
 *     If the server responds with 401 (token expired), automatically:
 *       a) Call /api/auth/refresh-token to get a new access token
 *       b) Retry the original failed request with the new token
 *       c) If refresh also fails, clear the session and redirect to login
 *
 *  This means components don't need to handle 401 errors themselves.
 */

import axios from "axios";

// ---------------------------------------------------------------------------
// In-memory token store
// We export getter/setter functions so AuthContext and interceptors share state.
// NEVER use localStorage — XSS attacks can steal tokens stored there.
// ---------------------------------------------------------------------------
let inMemoryAccessToken = null;

export const getAccessToken = () => inMemoryAccessToken;
export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};
export const clearAccessToken = () => {
  inMemoryAccessToken = null;
};

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // IMPORTANT: needed to send/receive httpOnly cookies
  headers: { "Content-Type": "application/json" },
});

// ---------------------------------------------------------------------------
// REQUEST interceptor — attach the Bearer token to every outbound request
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------------------------
// RESPONSE interceptor — handle 401 (expired access token) automatically
// ---------------------------------------------------------------------------
let isRefreshing = false;         // Flag to prevent multiple simultaneous refresh calls
let failedRequestQueue = [];       // Queue requests that failed while refreshing

const processQueue = (error, token = null) => {
  failedRequestQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestQueue = [];
};

api.interceptors.response.use(
  // On success, just return the response
  (response) => response,

  // On error:
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh for 401 errors, and only once per request
    // _retried flag prevents infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retried
    ) {
      // Do NOT try to refresh if the failing request IS the refresh endpoint
      // (that would cause an infinite loop)
      if (originalRequest.url?.includes("/api/auth/refresh-token")) {
        return Promise.reject(error);
      }

      originalRequest._retried = true; // Mark so we don't retry again

      if (isRefreshing) {
        // Another refresh is already in progress.
        // Queue this request to be retried once refresh completes.
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Attempt to get a new access token using the httpOnly cookie
        const response = await api.post("/api/auth/refresh-token");
        const newToken = response.data.accessToken;

        // Store the new token in memory
        setAccessToken(newToken);

        // Let all queued requests proceed with the new token
        processQueue(null, newToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — user must log in again
        processQueue(refreshError, null);
        clearAccessToken();

        // Dispatch a custom event so AuthContext can update its state
        // (we can't import AuthContext here — that would cause a circular dependency)
        window.dispatchEvent(new CustomEvent("auth:logout"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
