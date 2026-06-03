import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import styles from './ShopPage.module.css';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <div className={styles.categoryFilter}>
              <button
                className={`${styles.filterBtn} ${
                  selectedCategory === 'All' ? styles['filterBtn--active'] : ''
                }`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className={`${styles.filterBtn} ${
                    selectedCategory === cat.name
                      ? styles['filterBtn--active']
                      : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className={styles.productsGrid}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No products found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
