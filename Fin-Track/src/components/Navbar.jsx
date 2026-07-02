import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FiMenu />
        </button>
      </div>
      
      <div className={styles.right}>
        <span className={styles.username}>
          {currentUser ? currentUser.fullName : 'Guest'}
        </span>
        <button className={styles.logoutBtn} onClick={logout}>
          <FiLogOut className={styles.logoutIcon} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
