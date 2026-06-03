import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import PageFilter from '../../components/common/PageFilter/PageFilter';
import Hero from '../../components/common/Hero/Hero';
import styles from './BestSellersPage.module.css';

const BestSellersPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const baseProducts = useMemo(
    () => PRODUCTS.filter((p) => p.tag === 'Best Seller'),
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
        title="Best Sellers"
        subtitle="Our most-loved pieces, tried and tested by thousands of Lumoria customers. Timeless everyday luxury."
        backgroundImage="https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780487968/ChatGPT_Image_Jun_3_2026_05_29_07_PM_mcefvj.png"
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

      <section className={styles.trustSection}>
        <h2 className={styles.trustTitle}>Why Customers Love These</h2>
        <div className={styles.trustGrid}>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>⭐</div>
            <h3 className={styles.trustCardTitle}>Highest Rated</h3>
            <p className={styles.trustCardText}>Average 4.8/5 stars from verified buyers</p>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>🛍️</div>
            <h3 className={styles.trustCardTitle}>Most Purchased</h3>
            <p className={styles.trustCardText}>Trusted by thousands of happy customers</p>
          </div>
          <div className={styles.trustCard}>
            <div className={styles.trustIcon}>💎</div>
            <h3 className={styles.trustCardTitle}>Premium Quality</h3>
            <p className={styles.trustCardText}>Durable, waterproof, hypoallergenic materials</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSellersPage;
