import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { FiX } from 'react-icons/fi';
import { notifyError } from '../utils/toastNotify';
import styles from './TransactionModal.module.css';

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'Expense',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: ''
  });

  if (!isOpen) return null;

  const categories = {
    Income: ['Salary', 'Freelance', 'Investments', 'Other'],
    Expense: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Other']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' && { category: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      notifyError("Description required.");
      return;
    }
    const amt = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amt) || amt <= 0) {
      notifyError("Invalid amount.");
      return;
    }
    if (!formData.category) {
      notifyError("Category required.");
      return;
    }
    
    addTransaction({
      ...formData,
      amount: amt
    });
    
    // Reset form
    setFormData({
      type: 'Expense',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: ''
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Add Transaction</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className={styles.input}>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <input 
              type="text" 
              name="description" 
              placeholder="e.g. Amazon, Salary, Coffee" 
              value={formData.description} 
              onChange={handleChange} 
              className={styles.input}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Amount</label>
              <input 
                type="number" 
                name="amount" 
                placeholder="0.00" 
                value={formData.amount} 
                onChange={handleChange} 
                step="0.01"
                min="0"
                className={styles.input}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
              <option value="" disabled>Select a category</option>
              {categories[formData.type].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
