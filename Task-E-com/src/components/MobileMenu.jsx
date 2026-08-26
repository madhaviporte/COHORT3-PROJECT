import { useLocation } from "react-router-dom";
import { Home, ShoppingBag, Info, User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "./Toast";

const navLinks = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/about", label: "About", icon: Info },
];

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logout());
    addToast("Logged out successfully", "info");
    navigate("/login");
    onClose();
  };

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="md:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute top-[80px] left-0 right-0 bg-dark-card border-b border-white/[0.06] shadow-2xl shadow-black/50 animate-slideDown">
        <nav className="flex flex-col p-6 gap-1">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === path
                  ? "bg-neon/10 text-neon"
                  : "text-gray-300 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon size={19} strokeWidth={1.8} />
              {label}
            </button>
          ))}

          <div className="border-t border-white/[0.06] my-2" />

          {isAuthenticated ? (
            <>
              <button
                onClick={() => handleNav("/profile")}
                className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/[0.05] hover:text-white active:scale-[0.98] transition-all duration-200"
              >
                <User size={19} strokeWidth={1.8} />
                Profile
                {user?.name && (
                  <span className="ml-auto text-xs text-gray-500 font-normal">{user.name}</span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 active:scale-[0.98] transition-all duration-200"
              >
                <LogOut size={19} strokeWidth={1.8} />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-neon hover:bg-neon/10 transition-all duration-200"
            >
              <User size={19} strokeWidth={2} />
              Sign In
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
