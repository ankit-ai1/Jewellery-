import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLLECTIONS } from '../../data/collectionsData';
import Hero from '../../components/common/Hero/Hero';
import styles from './CollectionsLandingPage.module.css';

const CollectionsLandingPage = () => {
  const navigate = useNavigate();
  
  const collectionsArray = Object.values(COLLECTIONS);

  const handleCollectionClick = (collectionId) => {
    navigate(`/collections/${collectionId}`);
  };

  return (
    <div className={styles.collectionsLanding}>
      <Hero
        title="Collections"
        subtitle="Explore our thoughtfully curated collections designed for every style and occasion."
        backgroundImage="https://res.cloudinary.com/dtg3lepr4/image/upload/c_fit,w_1400,q_90/v1780488499/ChatGPT_Image_Jun_3_2026_05_38_08_PM_ee1tlg.png"
        backgroundSize="contain"
      />

      {/* Featured Collections Section */}
      <section className={styles.collectionsSection}>
        <div className={styles.container}>
          <div className={styles.collectionsGrid}>
            {collectionsArray.map((collection) => (
              <div
                key={collection.id}
                className={styles.collectionCard}
                onClick={() => handleCollectionClick(collection.id)}
              >
                <div className={styles.cardImage}>
                  <img 
                    src={collection.hero} 
                    alt={collection.title}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{collection.title}</h3>
                  <p className={styles.cardSubtitle}>{collection.subtitle}</p>
                  <button className={styles.cardButton}>
                    Explore Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Curated with Care</h3>
              <p className={styles.infoText}>
                Each collection is thoughtfully designed to celebrate unique moments and personal styles.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Premium Quality</h3>
              <p className={styles.infoText}>
                Crafted with 18K gold plating and premium materials for lasting elegance.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Fast & Free Shipping</h3>
              <p className={styles.infoText}>
                Free shipping on orders above ₹1999, delivered in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsLandingPage;
