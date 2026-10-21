/**
 * authService.js — Auth API Calls
 *
 * All functions that talk to /api/auth/* live here.
 * Components import from this file, not from api.js directly.
 * This keeps API logic separate from UI logic.
 */

import api from "./api.js";

// Register a new user account
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

// Log in — returns { accessToken, user }
// The refresh token cookie is set automatically by the browser
export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

// Exchange the httpOnly refresh cookie for a new access token
// Called on app startup and by the Axios interceptor on 401
export const refreshAccessToken = async () => {
  const response = await api.post("/api/auth/refresh-token");
  return response.data;
};

// Log out — clears the session on the server and removes the cookie
export const logoutUser = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

// Get the current user's profile
export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};
