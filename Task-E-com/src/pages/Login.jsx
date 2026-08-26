import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import Logo from "../components/Logo";
import { useToast } from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 4) errs.password = "Password must be at least 4 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginStart());

    // Check registered users in localStorage
    const users = JSON.parse(localStorage.getItem("skymart_users") || "[]");
    const found = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (found) {
      dispatch(loginSuccess({ name: found.name, email: found.email }));
      addToast("Welcome back!", "success");
      navigate("/home");
    } else {
      // For demo: accept any valid credentials
      dispatch(
        loginSuccess({
          name: email.split("@")[0],
          email: email.toLowerCase(),
        })
      );
      addToast("Welcome back!", "success");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col lg:flex-row">
      {/* Left branding section */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center min-h-screen">
        <Logo className="mb-24" />

        <div className="max-w-lg">
          <p className="text-xs font-semibold text-neon uppercase tracking-[0.2em] mb-6">
            WELCOME BACK
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Shop the future.{" "}
            <span className="text-neon">Today.</span>
          </h1>
          <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-14 max-w-md">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>

          {/* Stats */}
          <div className="flex gap-5">
            {[
              { value: "20K+", label: "Products" },
              { value: "50K+", label: "Users" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 border border-white/[0.08] rounded-2xl p-5 text-center hover:border-neon/20 transition-all duration-300"
              >
                <p className="text-2xl font-bold text-neon">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-dark-card border border-white/[0.08] rounded-3xl p-8 sm:p-10 lg:p-11">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Sign in</h2>
          <p className="text-sm text-gray-400 mb-10">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-6">
              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className={`w-full bg-dark-input border ${
                    errors.email ? "border-red-500" : "border-white/[0.08]"
                  } rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 focus:outline-none transition-all duration-200`}
                  aria-label="Email address"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-2 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-10">
              <div className="relative">
                <Lock
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full bg-dark-input border ${
                    errors.password ? "border-red-500" : "border-white/[0.08]"
                  } rounded-2xl pl-12 pr-12 py-4 text-sm text-white placeholder-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 focus:outline-none transition-all duration-200`}
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
              {errors.password && (
                <p className="text-xs text-red-400 mt-2 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-neon hover:bg-neon-hover text-dark font-bold py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.98] shadow-[0_0_20px_rgba(163,230,53,0.12)]"
            >
              Sign in <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-10">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-neon font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
