import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("skymart_user");
    const isAuth = localStorage.getItem("skymart_auth");
    if (user && isAuth === "true") {
      return { user: JSON.parse(user), isAuthenticated: true };
    }
  } catch {
    // ignore
  }
  return { user: null, isAuthenticated: false };
};

const stored = getStoredUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored.user,
    isAuthenticated: stored.isAuthenticated,
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("skymart_user", JSON.stringify(action.payload));
      localStorage.setItem("skymart_auth", "true");
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem("skymart_user", JSON.stringify(action.payload));
      localStorage.setItem("skymart_auth", "true");
      // Store in registered users list for login validation
      const existing = JSON.parse(localStorage.getItem("skymart_users") || "[]");
      existing.push(action.payload);
      localStorage.setItem("skymart_users", JSON.stringify(existing));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem("skymart_user");
      localStorage.removeItem("skymart_auth");
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("skymart_user", JSON.stringify(state.user));
      const users = JSON.parse(localStorage.getItem("skymart_users") || "[]");
      const idx = users.findIndex((u) => u.email === state.user.email);
      if (idx !== -1) users[idx] = { ...users[idx], ...action.payload };
      localStorage.setItem("skymart_users", JSON.stringify(users));
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, register, logout, updateProfile } =
  authSlice.actions;
export default authSlice.reducer;
