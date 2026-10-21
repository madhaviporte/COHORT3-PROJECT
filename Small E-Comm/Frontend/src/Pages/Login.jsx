/**
 * Login.jsx — User Login Page
 *
 * Accepts email and password.
 * On success: stores access token in memory via AuthContext, navigates to /
 * Shows a success banner if user just registered (?registered=true in URL)
 */

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Show success message if redirected from registration
  const justRegistered = searchParams.get("registered") === "true";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/"); // Go to product listing after login
    } catch (err) {
      if (err.response?.status === 401) {
        // Generic message — don't reveal which field is wrong
        setServerError("Invalid email or password");
      } else if (err.response?.status === 429) {
        setServerError("Too many login attempts. Please wait 15 minutes.");
      } else if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach(({ field, message }) => {
          backendErrors[field] = message;
        });
        setErrors(backendErrors);
      } else {
        setServerError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Log in to manage your products</p>
        </div>

        {justRegistered && (
          <div className="alert alert-success">
            ✅ Account created! Please log in.
          </div>
        )}

        {serverError && (
          <div className="alert alert-error">{serverError}</div>
        )}

        <form id="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
