import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import Logo from "../components/Logo";
import { useToast } from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      dispatch(
        register({
          name: form.name.trim(),
          email: form.email.toLowerCase().trim(),
          password: form.password,
          createdAt: new Date().toISOString(),
        })
      );
      setLoading(false);
      addToast("Account created successfully!", "success");
      navigate("/home");
    }, 500);
  };

  const inputClass = (field) =>
    `w-full bg-dark-input border ${
      errors[field] ? "border-red-500" : "border-white/[0.08]"
    } rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 focus:outline-none transition-all duration-200`;

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-8">
      <Logo className="mb-12" />

      <div className="w-full max-w-md bg-dark-card border border-white/[0.08] rounded-3xl p-8 sm:p-10 lg:p-11">
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Create account</h2>
        <p className="text-sm text-gray-400 mb-10">Join SkyMart and start shopping</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-5">
            <div className="relative">
              <User size={18} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                className={inputClass("name")}
                aria-label="Full name"
              />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-2 ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <div className="relative">
              <Mail size={18} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email address"
                className={inputClass("email")}
                aria-label="Email address"
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-2 ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-5">
            <div className="relative">
              <Lock size={18} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Password (min 6 chars)"
                className={`${inputClass("password")} pr-12`}
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-2 ml-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-8">
            <div className="relative">
              <Lock size={18} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Confirm password"
                className={`${inputClass("confirmPassword")} pr-12`}
                aria-label="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-2 ml-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 bg-neon hover:bg-neon-hover text-dark font-bold py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(163,230,53,0.12)]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight size={18} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-10">
          Already have an account?{" "}
          <Link to="/login" className="text-neon font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
