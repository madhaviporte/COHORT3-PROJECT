/**
 * ProtectedRoute.jsx
 *
 * A wrapper component that guards routes requiring authentication.
 *
 * How it works:
 * 1. While auth is still loading (checking refresh token on startup) → show spinner
 * 2. If user is not logged in → redirect to /login
 * 3. If user is logged in → render the protected page
 *
 * Usage in App.jsx:
 *   <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Still checking if we have a valid session — show nothing/spinner
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  // Not authenticated → send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render the child component
  return children;
};

export default ProtectedRoute;
