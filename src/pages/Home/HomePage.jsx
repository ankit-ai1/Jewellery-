import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, TRUST_BADGES } from '../../data/products';
import { CONTENT } from '../../constants/content';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import Button from '../../components/common/Button/Button';
import ShopByRecipient from '../../components/home/ShopByRecipient/ShopByRecipient';
import ForEveryYou from '../../components/home/ForEveryYou/ForEveryYou';
import JournalSection from '../../components/home/JournalSection/JournalSection';
import ShopWithConfidence from '../../components/home/ShopWithConfidence/ShopWithConfidence';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();

  const heroSlides = [
    {
      bg: 'https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780485622/ChatGPT_Image_Jun_3_2026_04_21_03_PM_ix6m1q.png',
      title: CONTENT.HERO_TITLE_1,
      subtitle: CONTENT.HERO_SUBTITLE_1,
    },
    {
      bg: 'https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780485662/ChatGPT_Image_Jun_3_2026_04_29_24_PM_ftrzld.png',
      title: CONTENT.HERO_TITLE_2,
      subtitle: CONTENT.HERO_SUBTITLE_2,
    },
    {
      bg: 'https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780485699/ChatGPT_Image_Jun_3_2026_04_30_50_PM_rlipdg.png',
      title: CONTENT.HERO_TITLE_3,
      subtitle: CONTENT.HERO_SUBTITLE_3,
    },
    {
      bg: 'https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780485739/ChatGPT_Image_Jun_3_2026_04_49_28_PM_ibzw6f.png',
      title: CONTENT.HERO_TITLE_1,
      subtitle: CONTENT.HERO_SUBTITLE_1,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const tabs = ['ALL', 'NECKLACES', 'BRACELETS', 'EARRINGS', 'RINGS'];
  const filtered =
    activeTab === 'ALL'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category.toUpperCase() === activeTab).slice(0, 8);


  

  return (
    <div className={styles.page}>
      {/* Hero Slider */}
      <section className={styles.hero}>
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.heroSlide} ${
              i === currentSlide ? styles['heroSlide--active'] : ''
            }`}
            style={{ backgroundImage: `url(${slide.bg})` }}
          >
            <div className={styles.heroOverlay} />
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{slide.title}</h1>
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              <div className={styles.heroButtons}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/shop')}
                >
                  {CONTENT.BTN_SHOP_NOW}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  {CONTENT.BTN_OUR_STORY}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Dots */}
        <div className={styles.slideDots}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === currentSlide ? styles['dot--active'] : ''
              }`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustBadges}>
        <div className={styles.trustContainer}>
          <div className={styles.trustGrid}>
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className={styles.trustItem}>
                <span className={styles.trustIcon}>{badge.icon}</span>
                <span className={styles.trustText}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{CONTENT.SECTION_EVERYDAY_JEWELLERY}</h2>
          <p className={styles.sectionSubtitle}>{CONTENT.EVERYDAY_SUBTITLE}</p>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className={styles.categoryCard}
                onClick={() => navigate(`/shop?category=${cat.name}`)}
              >
                <div className={styles.categoryImageWrapper}>
                  <img src={cat.img} alt={cat.name} />
                </div>
                <p className={styles.categoryName}>{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Styles */}
      <section className={styles.topStyles}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{CONTENT.SECTION_TOP_STYLES}</h2>

          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles['tab--active'] : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className={styles.productsGrid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          <div className={styles.viewAllContainer}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/shop')}
            >
              {CONTENT.BTN_VIEW_ALL}
            </Button>
          </div>
        </div>
      </section>

      {/* Shop By Recipient */}
      <ShopByRecipient />

      {/* For Every You - Carousel */}
      <ForEveryYou />

      {/* Lumoria Journal */}
      <JournalSection />

      {/* Shop With Confidence */}
      <ShopWithConfidence />
    </div>
  );
};

export default HomePage;
