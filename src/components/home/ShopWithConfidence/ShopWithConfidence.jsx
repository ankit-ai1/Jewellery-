import React from 'react';
import styles from './ShopWithConfidence.module.css';

const ShopWithConfidence = () => {
  const trustCards = [
    {
      id: 1,
      icon: '♡',
      title: 'SKIN SAFE',
      description:
        'Our jewellery is hypoallergenic and skin-safe, crafted to ensure comfort for everyday wear.',
    },
    {
      id: 2,
      icon: '✦',
      title: '18K GOLD VERMEIL',
      description:
        'Premium quality vermeil jewellery crafted with durability, shine and long-lasting elegance.',
    },
    {
      id: 3,
      icon: '◆',
      title: 'AUTHENTIC DIAMONDS',
      description:
        'Certified diamonds with exceptional brilliance, quality and ethical sourcing.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>SHOP WITH CONFIDENCE</h2>
        <p className={styles.sectionSubtitle}>
          Crafted with care, designed to last, and delivered with trust.
        </p>

        <div className={styles.trustGrid}>
          {trustCards.map((card) => (
            <div key={card.id} className={styles.trustCard}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{card.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopWithConfidence;
