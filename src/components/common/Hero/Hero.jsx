import React from 'react';
import styles from './Hero.module.css';

const Hero = ({ title, subtitle, backgroundImage, backgroundSize = 'cover' }) => {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <section className={styles.hero} style={bgStyle}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>LUMORIA</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <div className={styles.heroDivider}>
          <span className={styles.heroDividerLine} />
          <span className={styles.heroDividerDiamond}>◆</span>
          <span className={styles.heroDividerLine} />
        </div>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </div>
    </section>
  );
};

export default Hero;
