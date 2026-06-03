import React from 'react';
import styles from './AnnouncementBar.module.css';
import { ANNOUNCEMENTS } from '../../../constants/content';

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.bar}>
      <div className={styles.content}>{ANNOUNCEMENTS[currentIndex]}</div>
    </div>
  );
};

export default AnnouncementBar;
