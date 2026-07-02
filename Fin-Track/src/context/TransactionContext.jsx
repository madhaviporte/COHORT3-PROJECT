import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { notifySuccess, notifyInfo } from '../utils/toastNotify';
import { v4 as uuidv4 } from 'uuid';

const TransactionContext = createContext();

export function useTransactions() {
  return useContext(TransactionContext);
}

export function TransactionProvider({ children }) {
  const { currentUser, logout } = useAuth();
  // Toast moved to external utility
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const storedTx = localStorage.getItem(`transactions_${currentUser.username}`);
      if (storedTx) {
        setTransactions(JSON.parse(storedTx));
      } else {
        setTransactions([]);
      }

      const storedTheme = localStorage.getItem(`theme_${currentUser.username}`);
      if (storedTheme) {
        const isDark = JSON.parse(storedTheme);
        setDarkMode(isDark);
        if (isDark) {
          document.body.setAttribute('data-theme', 'dark');
        } else {
          document.body.removeAttribute('data-theme');
        }
      } else {
        setDarkMode(false);
        document.body.removeAttribute('data-theme');
      }
    } else {
      setTransactions([]);
      setDarkMode(false);
      document.body.removeAttribute('data-theme');
    }
  }, [currentUser]);

  const addTransaction = (transaction) => {
    const newTx = { ...transaction, id: uuidv4() };
    const updatedTx = [...transactions, newTx];
    setTransactions(updatedTx);
    localStorage.setItem(`transactions_${currentUser.username}`, JSON.stringify(updatedTx));
    notifySuccess("Transaction added successfully.");
  };

  const deleteTransaction = (id) => {
    const updatedTx = transactions.filter(t => t.id !== id);
    setTransactions(updatedTx);
    localStorage.setItem(`transactions_${currentUser.username}`, JSON.stringify(updatedTx));
    notifySuccess("Transaction deleted successfully.");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem(`theme_${currentUser.username}`, JSON.stringify(newMode));
    if (newMode) {
      document.body.setAttribute('data-theme', 'dark');
      notifyInfo("Dark mode enabled.");
    } else {
      document.body.removeAttribute('data-theme');
      notifyInfo("Dark mode disabled.");
    }
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setTransactions([]);
      localStorage.removeItem(`transactions_${currentUser.username}`);
      setDarkMode(false);
      localStorage.removeItem(`theme_${currentUser.username}`);
      document.body.removeAttribute('data-theme');
      notifySuccess("Data reset successfully.");
    }
  };

  const calculations = transactions.reduce((acc, current) => {
    const amount = parseFloat(current.amount) || 0;
    if (current.type === 'Income') {
      acc.income += amount;
      acc.balance += amount;
    } else if (current.type === 'Expense') {
      acc.expense += amount;
      acc.balance -= amount;
    }
    return acc;
  }, { balance: 0, income: 0, expense: 0, total: transactions.length });

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      resetData,
      toggleDarkMode,
      darkMode,
      ...calculations
    }}>
      {children}
    </TransactionContext.Provider>
  );
}
