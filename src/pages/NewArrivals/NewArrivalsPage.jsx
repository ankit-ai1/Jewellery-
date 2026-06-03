import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import PageFilter from '../../components/common/PageFilter/PageFilter';
import Button from '../../components/common/Button/Button';
import Hero from '../../components/common/Hero/Hero';
import styles from './NewArrivalsPage.module.css';

const NewArrivalsPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const baseProducts = useMemo(
    () => PRODUCTS.filter((p) => p.tag === 'New Arrival'),
    []
  );

  const availableCategories = useMemo(() => {
    const cats = new Set(baseProducts.map((p) => p.category));
    return CATEGORIES.filter((c) => cats.has(c.name));
  }, [baseProducts]);

  const filtered = useMemo(() => {
    let list = baseProducts.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (ratingFilter === 0 || p.rating >= ratingFilter) &&
        (selectedCategory === 'All' || p.category === selectedCategory)
    );
    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [baseProducts, sortBy, priceRange, ratingFilter, selectedCategory]);

  return (
    <div className={styles.page}>
      <Hero
        title="New Arrivals"
        subtitle="Discover the latest additions to our Demi-Fine collection. Crafted with precision, designed for everyday elegance."
        backgroundImage="https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780486919/ChatGPT_Image_Jun_3_2026_05_11_44_PM_cgzida.png"
      />

      <section className={styles.productsSection}>
        <div className={styles.container}>
          <PageFilter
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            categories={availableCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No products match your filters.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Don't Miss Out</h2>
        <p className={styles.ctaText}>
          Subscribe to our newsletter to get notified about new arrivals
        </p>
        <div className={styles.newsletter}>
          <input
            type="email"
            className={styles.emailInput}
            placeholder="Enter your email"
            aria-label="Email for newsletter"
          />
          <Button variant="primary" size="md">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NewArrivalsPage;
