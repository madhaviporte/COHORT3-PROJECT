/**
 * useAuth.js — Custom hook for consuming AuthContext
 *
 * Separated from AuthContext.jsx so that file only exports the AuthProvider
 * component, which satisfies the react-refresh/only-export-components rule
 * required for Vite's fast-refresh to work correctly.
 */

import { useContext } from "react";
import AuthContext from "./AuthContext.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
