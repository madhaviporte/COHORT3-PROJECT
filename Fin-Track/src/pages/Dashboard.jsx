import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import StatCard from '../components/StatCard';
import Chart from '../components/Chart';
import { FiBriefcase, FiTrendingUp, FiTrendingDown, FiLayers } from 'react-icons/fi';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { balance, income, expense, total, darkMode, toggleDarkMode, resetData } = useTransactions();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Financial Overview</h1>
        <p className={styles.subtitle}>Real-time tracking application</p>
      </header>

      <section className={styles.statsGrid}>
        <StatCard 
          icon={FiBriefcase} 
          title="Current Balance" 
          amount={balance} 
          iconBgColor="var(--blue-selection)"
          iconColor="#3B82F6"
        />
        <StatCard 
          icon={FiTrendingUp} 
          title="Total Income" 
          amount={income} 
          iconBgColor="rgba(22, 163, 74, 0.1)"
          iconColor="#16A34A"
        />
        <StatCard 
          icon={FiTrendingDown} 
          title="Total Expense" 
          amount={expense} 
          iconBgColor="rgba(220, 38, 38, 0.1)"
          iconColor="#DC2626"
        />
        <StatCard 
          icon={FiLayers} 
          title="Total Transactions" 
          amount={total} 
          iconBgColor="rgba(59, 130, 246, 0.1)"
          iconColor="#3B82F6"
        />
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.chartWrapper}>
          <Chart />
        </div>
        
        <div className={styles.preferencesCard}>
          <h3 className={styles.prefTitle}>Preferences</h3>
          
          <div className={styles.prefRow}>
            <span>Dark Mode</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className={styles.slider}></span>
            </label>
          </div>

          <button className={styles.resetBtn} onClick={resetData}>
            🗑 Reset All Data
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
