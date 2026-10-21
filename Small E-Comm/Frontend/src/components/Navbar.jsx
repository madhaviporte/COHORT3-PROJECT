/**
 * Navbar.jsx
 *
 * Top navigation bar showing:
 *   - App logo/brand name
 *   - For guests (not logged in): Login + Register links
 *   - For authenticated users: Products, My Products, Add Product, user name, Logout
 */

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛒</span>
          <span className="brand-text">ShopHub</span>
        </Link>

        {/* Navigation links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Products
          </Link>

          {user ? (
            // Authenticated user links
            <>
              <Link to="/my-products" className="nav-link">
                My Products
              </Link>
              <Link to="/add-product" className="nav-link btn-add">
                + Add
              </Link>
              <span className="nav-user">👤 {user.name}</span>
              <button
                id="logout-btn"
                className="btn-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            // Guest links
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
