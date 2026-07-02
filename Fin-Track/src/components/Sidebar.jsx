import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiSettings, FiLayers } from 'react-icons/fi';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, closeSidebar, onAddTransaction }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logoContainer}>
        <FiLayers className={styles.logoIcon} />
        <div className={styles.logoText}>
          <h2>FinTrack Pro</h2>
          <p>Enterprise Finance</p>
        </div>
      </div>

      <nav className={styles.navLinks}>
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={closeSidebar}
        >
          <FiGrid className={styles.navIcon} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={closeSidebar}
        >
          <FiSettings className={styles.navIcon} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className={styles.bottomContainer}>
        <button className={styles.addBtn} onClick={() => { closeSidebar(); onAddTransaction(); }}>
          + Add Transaction
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
