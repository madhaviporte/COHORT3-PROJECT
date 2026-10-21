/**
 * NotFound.jsx — 404 Page
 *
 * Shown for any route that doesn't match a defined route in App.jsx.
 */

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-code">404</div>
      <h2>Page Not Found</h2>
      <p>
        Oops! The page you're looking for doesn't exist, was moved, or the
        URL might be incorrect.
      </p>
      <Link to="/" className="btn-primary" id="not-found-home-btn">
        ← Go Home
      </Link>
    </div>
  );
};

export default NotFound;
