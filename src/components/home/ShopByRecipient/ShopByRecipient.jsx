import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShopByRecipient.module.css';

const ShopByRecipient = () => {
  const navigate = useNavigate();

  const recipients = [
    {
      id: 'her',
      title: 'Gifts For Her',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      description: 'Curated jewellery gifts for wives, girlfriends, sisters and mothers.',
      cta: 'Explore Collection',
    },
    {
      id: 'him',
      title: 'Gifts For Him',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      description: 'Modern jewellery gifts for husbands, brothers and partners.',
      cta: 'Explore Collection',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Shop By Recipient</h2>
        <p className={styles.sectionSubtitle}>Find the perfect jewellery gift for every special person.</p>

        <div className={styles.grid}>
          {recipients.map((recipient) => (
            <div
              key={recipient.id}
              className={styles.card}
              onClick={() => navigate(`/gifting/${recipient.id === 'her' ? 'gifts-for-her' : 'gifts-for-him'}`)}
            >
              <div className={styles.imageContainer}>
                <img src={recipient.image} alt={recipient.title} className={styles.image} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{recipient.title}</h3>
                <p className={styles.description}>{recipient.description}</p>
                <button
                  className={styles.cta}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/gifting/${recipient.id === 'her' ? 'gifts-for-her' : 'gifts-for-him'}`);
                  }}
                >
                  {recipient.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByRecipient;
