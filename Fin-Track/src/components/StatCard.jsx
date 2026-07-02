import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ icon: Icon, title, amount, iconBgColor, iconColor }) => {
  return (
    <div className={styles.card}>
      <div 
        className={styles.iconContainer} 
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <h3 className={styles.amount}>
          {typeof amount === 'number' ? 
            (title.includes('Total Transactions') ? amount : `$${amount.toFixed(2)}`) 
            : amount}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
