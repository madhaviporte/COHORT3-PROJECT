import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  LogOut,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { logout, updateProfile } from "../redux/authSlice";
import { useToast } from "../components/Toast";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    if (name.trim()) {
      dispatch(updateProfile({ name: name.trim() }));
      setEditing(false);
      addToast("Profile updated!", "success");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    addToast("Logged out successfully", "info");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 tracking-tight">My Profile</h1>

        <div className="bg-dark-card border border-white/[0.08] rounded-3xl p-7 sm:p-9 lg:p-11">
          {/* Avatar + Name */}
          <div className="flex items-center gap-5 mb-12">
            <div className="w-20 h-20 rounded-2xl bg-neon/15 text-neon flex items-center justify-center text-3xl font-bold ring-1 ring-neon/20">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-dark-input border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:border-neon/50 focus:ring-1 focus:ring-neon/20 focus:outline-none flex-1 transition-all duration-200"
                    aria-label="Edit name"
                  />
                  <button
                    onClick={handleSave}
                    className="text-sm bg-neon hover:bg-neon-hover text-dark font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setName(user?.name || "");
                    }}
                    className="text-sm text-gray-400 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-gray-400 hover:text-neon p-2 rounded-lg hover:bg-white/[0.05] transition-all duration-200"
                    aria-label="Edit profile"
                  >
                    <Edit3 size={16} strokeWidth={1.8} />
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-400 truncate mt-1">{user?.email}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <User size={20} strokeWidth={1.8} className="text-neon shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-white mt-0.5">{user?.name || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <Mail size={20} strokeWidth={1.8} className="text-neon shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm font-medium text-white mt-0.5">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <Calendar size={20} strokeWidth={1.8} className="text-neon shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-medium text-white mt-0.5">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <ShoppingBag size={20} strokeWidth={1.8} className="text-neon shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">{cartItems.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Cart Items</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
              <Heart size={20} strokeWidth={1.8} className="text-neon shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-gray-500 mt-0.5">Wishlist</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 active:scale-[0.97] px-5 py-3 rounded-xl transition-all duration-200"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
