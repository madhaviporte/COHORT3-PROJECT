import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { selectCartTotalQuantity } from "../redux/cartSlice";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { useToast } from "./Toast";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartTotalQuantity);

  const handleLogout = () => {
    dispatch(logout());
    addToast("Logged out successfully", "info");
    navigate("/login");
    setShowUserMenu(false);
  };

  // Don't show navbar on login/register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-[80px]">
            {/* Left: Logo + Nav Links */}
            <div className="flex items-center gap-14">
              <Logo />
              <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === path
                        ? "text-dark bg-neon font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => navigate("/shop")}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.8} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart size={20} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-neon text-dark text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(163,230,53,0.4)]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User area - Desktop */}
              <div className="hidden md:block relative">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-xl hover:bg-white/[0.06] active:scale-95 transition-all duration-200"
                      aria-label="User menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-neon/15 text-neon flex items-center justify-center text-xs font-bold ring-1 ring-neon/20">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </button>

                    {showUserMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowUserMenu(false)}
                        />
                        <div className="absolute right-0 top-full mt-3 w-60 bg-dark-card border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 z-50 py-2">
                          <div className="px-5 py-3 border-b border-white/[0.06]">
                            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                          </div>
                          <div className="py-1.5">
                            <button
                              onClick={() => {
                                navigate("/profile");
                                setShowUserMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                            >
                              <User size={16} strokeWidth={1.8} />
                              Profile
                            </button>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 active:scale-[0.98] transition-all"
                            >
                              <LogOut size={16} strokeWidth={1.8} />
                              Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-dark bg-neon hover:bg-neon-hover active:scale-[0.97] transition-all duration-200 shadow-[0_0_12px_rgba(163,230,53,0.15)]"
                  >
                    <User size={16} strokeWidth={2} />
                    Sign In
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Toggle menu"
              >
                <Menu size={22} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
