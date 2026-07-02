import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Settings.module.css';

const Settings = () => {
  const { currentUser, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    currency: 'USD ($)'
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        currency: currentUser.currency || 'USD ($)'
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData.fullName, formData.currency);
  };

  return (
    <div className={styles.settings}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your account profile and app formatting.</p>
      </header>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Profile Details</h3>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Primary Currency</label>
              <select 
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="INR (₹)">INR (₹)</option>
              </select>
            </div>
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
