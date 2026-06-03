import React from 'react';
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const badgeClass = `${styles.badge} ${styles[`badge--${variant}`]} ${className}`.trim();

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

export default Badge;
