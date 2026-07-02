import React, { createContext, useState, useEffect, useContext } from 'react';
import { notifyError, notifySuccess } from '../utils/toastNotify';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Toast moved to external utility

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse current user from local storage");
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (!user) {
      notifyError("First you have to register.");
      return false;
    }

    if (user.password !== password) {
      notifyError("Invalid username or password.");
      return false;
    }

    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    notifySuccess("Login successful.");
    return true;
  };

  const register = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      notifyError("Passwords do not match.");
      return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.username === username);

    if (userExists) {
      notifyError("User already exists.");
      return false;
    }

    const newUser = { username, password, fullName: username, currency: 'USD ($)' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    notifySuccess("You are registered. Now you can login.");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    notifySuccess("Logout successful.");
  };

  const updateProfile = (fullName, currency) => {
    if (!currentUser) return;
    
    // Update current user
    const updatedUser = { ...currentUser, fullName, currency };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update user in users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    if (fullName !== currentUser.fullName) {
      notifySuccess("Profile updated successfully.");
    }
    if (currency !== currentUser.currency) {
      notifySuccess("Currency updated successfully.");
    }
    if (fullName === currentUser.fullName && currency === currentUser.currency) {
      notifySuccess("Profile updated successfully.");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
