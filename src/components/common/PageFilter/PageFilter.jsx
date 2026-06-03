import React, { useState, useRef, useEffect } from 'react';
import styles from './PageFilter.module.css';

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const RATING_OPTIONS = [0, 4.5, 4.6, 4.7, 4.8, 4.9];

const PageFilter = ({
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  ratingFilter,
  setRatingFilter,
  categories,
  selectedCategory,
  setSelectedCategory,
  showRating = true,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [open]);

  const hasActiveFilters =
    sortBy !== 'featured' ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000 ||
    (showRating && ratingFilter > 0);

  const handleClear = () => {
    setSortBy('featured');
    setPriceRange([0, 50000]);
    if (showRating) setRatingFilter(0);
    setOpen(false);
  };

  return (
    <div className={styles.filterBar}>
      {/* FILTER & SORT button with dropdown */}
      <div className={styles.filterSortWrapper} ref={wrapperRef}>
        <button
          className={`${styles.filterSortBtn} ${hasActiveFilters ? styles.active : ''}`}
          onClick={() => setOpen((v) => !v)}
        >
          <FilterIcon />
          <span>FILTER &amp; SORT</span>
        </button>

        {open && (
          <div className={styles.panel}>
            {/* Sort */}
            <div className={styles.panelGroup}>
              <p className={styles.panelLabel}>SORT BY</p>
              <div className={styles.sortList}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.sortOpt} ${sortBy === opt.value ? styles.sortOptActive : ''}`}
                    onClick={() => setSortBy(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={styles.panelGroup}>
              <p className={styles.panelLabel}>PRICE RANGE</p>
              <div className={styles.priceRow}>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className={styles.priceInput}
                  placeholder="Min"
                />
                <span className={styles.priceDash}>—</span>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 50000])}
                  className={styles.priceInput}
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Rating */}
            {showRating && (
              <div className={styles.panelGroup}>
                <p className={styles.panelLabel}>RATING</p>
                <div className={styles.ratingRow}>
                  {RATING_OPTIONS.map((r) => (
                    <button
                      key={r}
                      className={`${styles.ratingChip} ${ratingFilter === r ? styles.ratingChipActive : ''}`}
                      onClick={() => setRatingFilter(r)}
                    >
                      {r === 0 ? 'All' : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <button className={styles.clearBtn} onClick={handleClear}>
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Pills */}
      {categories && categories.length > 0 && setSelectedCategory && (
        <div className={styles.pills}>
          <button
            className={`${styles.pill} ${selectedCategory === 'All' ? styles.pillActive : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            ALL
          </button>
          {categories.map((cat) => {
            const name = cat.name ?? cat;
            return (
              <button
                key={name}
                className={`${styles.pill} ${selectedCategory === name ? styles.pillActive : ''}`}
                onClick={() => setSelectedCategory(name)}
              >
                {name.toUpperCase()}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageFilter;
