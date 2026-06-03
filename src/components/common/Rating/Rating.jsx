import React from 'react';
import styles from './Rating.module.css';

const Rating = ({ rating = 0, reviewCount = 0, size = 'md', showCount = true }) => {
  const stars = Math.round(rating);
  const starArray = Array.from({ length: 5 }, (_, i) => i < stars);

  return (
    <div className={styles.rating}>
      <div className={`${styles.stars} ${styles[`stars--${size}`]}`}>
        {starArray.map((isFilled, i) => (
          <span
            key={i}
            className={`${styles.star} ${isFilled ? styles['star--filled'] : styles['star--empty']}`}
          >
            ★
          </span>
        ))}
      </div>
      {showCount && (
        <span className={`${styles.count} ${styles[`count--${size}`]}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default Rating;
