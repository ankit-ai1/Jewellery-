import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ForEveryYou.module.css';

const ForEveryYou = () => {
  const navigate = useNavigate();
  
  const occasions = [
    {
      id: 'daily',
      title: 'Daily Wear',
      route: 'daily-wear',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    },
    {
      id: 'office',
      title: 'Office Wear',
      route: 'office-wear',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    },
    {
      id: 'date',
      title: 'Date Night',
      route: 'date-night',
      image: 'https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=600&q=80',
    },
    {
      id: 'party',
      title: 'Party Wear',
      route: 'party-wear',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    },
    {
      id: 'wedding',
      title: 'Wedding Wear',
      route: 'wedding-wear',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    },
    {
      id: 'vacation',
      title: 'Vacation Style',
      route: 'vacation-style',
      image: 'https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=600&q=80',
    },
    {
      id: 'minimal',
      title: 'Minimal Style',
      route: 'minimal-style',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    },
  ];

  // Initialize with middle card as active
  const [activeIndex, setActiveIndex] = useState(Math.floor(occasions.length / 2));
  const touchStartX = useRef(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + occasions.length) % occasions.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % occasions.length);
  };

  const handleCardClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      // Navigate to collection page when active card is clicked
      navigate(`/collections/${occasions[index].route}`);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
  };

  const getCardClass = (index) => {
    // Calculate circular distance from active card
    let distance = (index - activeIndex + occasions.length) % occasions.length;

    // Normalize distance to show direction (-2 to 2 for 5 visible cards)
    if (distance > occasions.length / 2) {
      distance = distance - occasions.length;
    }

    switch (distance) {
      case -2:
        return styles.cardFarLeft;
      case -1:
        return styles.cardLeft;
      case 0:
        return styles.cardActive;
      case 1:
        return styles.cardRight;
      case 2:
        return styles.cardFarRight;
      default:
        return styles.cardHidden;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>FOR EVERY YOU</h2>
        <p className={styles.sectionSubtitle}>Jewellery curated for every mood, moment and occasion.</p>

        <div 
          className={styles.carouselWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className={styles.navButton} onClick={handlePrev} aria-label="Previous">
            ‹
          </button>

          <div className={styles.carousel}>
            {occasions.map((occasion, index) => (
              <button
                key={occasion.id}
                className={`${styles.card} ${getCardClass(index)}`}
                onClick={() => handleCardClick(index)}
                aria-label={`View ${occasion.title}`}
              >
                <div className={styles.imageWrapper}>
                  <img src={occasion.image} alt={occasion.title} className={styles.image} />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.label}>{occasion.title}</div>
              </button>
            ))}
          </div>

          <button className={styles.navButton} onClick={handleNext} aria-label="Next">
            ›
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className={styles.indicators}>
          {occasions.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForEveryYou;
