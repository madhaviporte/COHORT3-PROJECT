import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';

const Layout = ({ onAddTransaction }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}

      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar} 
        onAddTransaction={onAddTransaction} 
      />
      
      <div className={styles.mainContent}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
