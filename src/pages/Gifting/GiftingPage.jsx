import React, { useMemo, useState, useEffect } from 'react';
import { GIFTING_PRODUCTS, GIFTING_CATEGORIES } from '../../data/giftingProducts';
import PageFilter from '../../components/common/PageFilter/PageFilter';
import styles from './GiftingPage.module.css';
import Hero from '../../components/common/Hero/Hero';
import { useLocation } from 'react-router-dom';

const ICONS = {
  'Gifts For Her': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s-6-4.35-8-6.5C1.82 11.98 4 8 8 7c2.5-.7 4 1 4 1s1.5-1.7 4-1c4 1 6.18 4.98 4 7.5C18 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Gifts For Him': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Gift Card': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Corporate Gifting': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="12" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  "Mother's Special": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c1.5 3 6 3 6 7 0 5-6 10-6 10s-6-5-6-10c0-4 4.5-4 6-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const TITLE_FOR = {
  'Gifts For Her': 'Curated for Her',
  'Gifts For Him': 'Curated for Him',
  'Gift Card': 'Gift Card Options',
  'Corporate Gifting': 'Corporate Gifting Collection',
  "Mother's Special": "Mother's Special Collection",
};

const GiftingPage = () => {
  const location = useLocation();
  const [active, setActive] = useState('Gifts For Her');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const catParam = (qs.get('category') || '').toLowerCase();
    if (catParam.includes('her')) { setActive('Gifts For Her'); return; }
    if (catParam.includes('him')) { setActive('Gifts For Him'); return; }
    const path = location.pathname.toLowerCase();
    if (path.includes('gifts-for-her')) { setActive('Gifts For Her'); return; }
    if (path.includes('gifts-for-him')) { setActive('Gifts For Him'); return; }
  }, [location.pathname, location.search]);

  const products = useMemo(() => {
    let list = GIFTING_PRODUCTS.filter(
      (p) =>
        p.categories.includes(active) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1]
    );
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sortBy, priceRange]);

  return (
    <div className={styles.page}>
      <Hero
        title="Gifting"
        subtitle="The art of giving luxury. Thoughtfully chosen pieces that celebrate your most precious moments."
        backgroundImage="https://res.cloudinary.com/dtg3lepr4/image/upload/c_fit,w_1400,q_90/v1780488852/ChatGPT_Image_Jun_3_2026_05_43_23_PM_qofqk6.png"
        backgroundSize="contain"
      />

      {/* Category Tabs */}
      <section className={styles.topSection}>
        <div className={styles.topInner}>
          <div className={styles.categories} role="tablist">
            {GIFTING_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${active === cat ? styles.catBtnActive : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                <span className={styles.catIcon} aria-hidden>
                  {ICONS[cat]}
                </span>
                <span className={styles.catLabel}>{cat.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <div className={styles.productsSection}>
        <div className={styles.container}>
          <PageFilter
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingFilter={0}
            setRatingFilter={() => {}}
            showRating={false}
          />

          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{TITLE_FOR[active]}</h2>
            <span className={styles.count}>{products.length} items</span>
          </header>

          {products.length > 0 ? (
            <section className={styles.grid}>
              {products.map((p) => (
                <article key={p.id} className={styles.card}>
                  <div className={styles.media}>
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.name}>{p.name}</div>
                    <div className={styles.price}>£{p.price.toLocaleString()}</div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className={styles.noResults}>
              <p>No products match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftingPage;
