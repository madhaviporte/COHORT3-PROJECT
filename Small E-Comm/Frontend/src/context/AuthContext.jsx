/**
 * AuthContext.jsx — Global Authentication State
 *
 * This React Context shares login/logout state with every component in the app.
 * Any component can call `useAuth()` to get:
 *   - user         : The currently logged-in user, or null
 *   - accessToken  : The current access token (in memory), or null
 *   - loading      : True while we're checking the session on startup
 *   - login()      : Function to log in
 *   - logout()     : Function to log out
 *
 * On App Startup:
 *   We attempt to refresh the access token using the httpOnly cookie.
 *   If refresh succeeds → restore the session (user stays logged in after refresh).
 *   If refresh fails   → show logged-out state (no token in memory).
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, logoutUser, refreshAccessToken } from "../services/authService.js";
import { setAccessToken, clearAccessToken } from "../services/api.js";

// Create the context
const AuthContext = createContext(null);

// ---------------------------------------------------------------------------
// AuthProvider — wraps the whole app, manages auth state
// ---------------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // True until initial refresh is done

  // ---------------------------------------------------------------------------
  // On startup: try to restore the session via refresh token cookie
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // If the browser has a valid refresh cookie, this will succeed
        const data = await refreshAccessToken();
        setAccessToken(data.accessToken);  // Store token in Axios module's memory
        setUser(data.user);
      } catch {
        // No valid session — user needs to log in
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false); // Either way, we're done checking
      }
    };

    initializeAuth();
  }, []);

  // ---------------------------------------------------------------------------
  // Listen for the "auth:logout" event dispatched by the Axios interceptor
  // This happens when the refresh token itself has expired or been revoked
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleForcedLogout = () => {
      clearAccessToken();
      setUser(null);
    };

    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, []);

  // ---------------------------------------------------------------------------
  // login() — called from the Login page
  // ---------------------------------------------------------------------------
  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);
    setAccessToken(data.accessToken);  // Store in memory (NOT localStorage)
    setUser(data.user);
    return data;
  }, []);

  // ---------------------------------------------------------------------------
  // logout() — called when the user clicks Logout
  // ---------------------------------------------------------------------------
  const logout = useCallback(async () => {
    try {
      await logoutUser(); // Clears the cookie server-side
    } catch {
      // Even if the server call fails, clear client state
    }
    clearAccessToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// useAuth() — custom hook for consuming the context (cleaner than useContext)
// ---------------------------------------------------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
