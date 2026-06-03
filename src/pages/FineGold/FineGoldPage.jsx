import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import PageFilter from '../../components/common/PageFilter/PageFilter';
import Hero from '../../components/common/Hero/Hero';
import styles from './FineGoldPage.module.css';

const FineGoldPage = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const baseProducts = useMemo(
    () => PRODUCTS.filter((p) => p.tag === 'Premium'),
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
        title="Fine Gold Collection"
        subtitle="Experience the elegance of solid 9KT and 18KT gold. Timeless pieces crafted with precision for those who appreciate true luxury."
        backgroundImage="https://res.cloudinary.com/dtg3lepr4/image/upload/c_fill,g_auto,ar_16:9,w_1400,q_90/v1780488228/ChatGPT_Image_Jun_3_2026_05_33_35_PM_zno44i.png"
      />

      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>9KT Fine Gold</h3>
            <p className={styles.infoDesc}>
              Perfect balance of luxury and affordability. Durable, waterproof, and ideal
              for everyday wear. Made with 37.5% pure gold.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>18KT Vermeil</h3>
            <p className={styles.infoDesc}>
              Premium gold plating over sterling silver. Rich, lustrous finish that lasts.
              Hypoallergenic and perfect for sensitive skin.
            </p>
          </div>
        </div>
      </section>

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

      <section className={styles.careSection}>
        <h2 className={styles.careTitle}>Gold Care Guide</h2>
        <div className={styles.careGrid}>
          <div className={styles.careTip}>
            <div className={styles.careTipNumber}>1</div>
            <h4>Clean Regularly</h4>
            <p>Use a soft cloth and lukewarm water with mild soap. Pat dry gently.</p>
          </div>
          <div className={styles.careTip}>
            <div className={styles.careTipNumber}>2</div>
            <h4>Store Properly</h4>
            <p>Keep in a jewelry box away from sunlight and moisture.</p>
          </div>
          <div className={styles.careTip}>
            <div className={styles.careTipNumber}>3</div>
            <h4>Avoid Chemicals</h4>
            <p>Remove before swimming, bathing, or using harsh chemicals.</p>
          </div>
          <div className={styles.careTip}>
            <div className={styles.careTipNumber}>4</div>
            <h4>Polish Annually</h4>
            <p>Professional polishing keeps the shine. We offer free polishing service.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FineGoldPage;
