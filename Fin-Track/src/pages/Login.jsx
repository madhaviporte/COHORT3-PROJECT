import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLayers } from 'react-icons/fi';
import { notifyError } from '../utils/toastNotify';
import styles from './Auth.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      notifyError("Username required.");
      return;
    }
    if (!password) {
      notifyError("Password required.");
      return;
    }
    if (login(username, password)) {
      navigate('/');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoContainer}>
          <FiLayers className={styles.logoIcon} />
          <h2>FinTrack Pro</h2>
        </div>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Please enter your details to sign in.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
