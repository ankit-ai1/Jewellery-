import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { COLLECTIONS } from '../../data/collectionsData';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import PageFilter from '../../components/common/PageFilter/PageFilter';
import styles from './CollectionsPage.module.css';

const CollectionsPage = () => {
  const { collectionId } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const collection = COLLECTIONS[collectionId];

  const filteredProducts = useMemo(() => {
    if (!collection || !collection.products) return [];

    let filtered = collection.products.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (ratingFilter === 0 || p.rating >= ratingFilter)
    );

    if (sortBy === 'price-low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [collection, sortBy, priceRange, ratingFilter]);

  if (!collection) {
    return (
      <div className={styles.notFound}>
        <h1>Collection not found</h1>
        <p>Sorry, we couldn't find the collection you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.collectionsPage}>
      {/* Hero */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${collection.hero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{collection.title}</h1>
          <p className={styles.heroSubtitle}>{collection.subtitle}</p>
        </div>
      </div>

      {/* Story */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <p className={styles.storyText}>{collection.story}</p>
        </div>
      </section>

      {/* Products */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <PageFilter
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />

          {filteredProducts.length > 0 ? (
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No products found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recommended */}
      <section className={styles.recommendedSection}>
        <div className={styles.recommendedInner}>
          <h2 className={styles.recommendedTitle}>You Might Also Like</h2>
          <div className={styles.recommendedGrid}>
            {collection.products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
