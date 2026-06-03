import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart, useWishlist } from '../../../hooks';
import { NAV_ITEMS } from '../../../constants/content';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemCount } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = getCartItemCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo} onClick={handleLogoClick} role="button">
          <span className={styles.logoText}>LUMORIA</span>
          <span className={styles.logoSubtext}>Demi-Fine Jewellery</span>
        </div>

        {/* Desktop Navigation */}
        <nav className={`${styles.nav} desktop-only`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles['navItem--active'] : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            🔍
          </button>
          <Link to="/wishlist" className={styles.iconBtnWithBadge}>
            🤍
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.iconBtnWithBadge}>
            🛍️
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </Link>
          <Link to="/account" className={styles.iconBtn}>
            👤
          </Link>
          <button
            className={`${styles.mobileMenuBtn} mobile-only`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`${styles.mobileMenuItem} ${
                location.pathname === item.path ? styles['mobileMenuItem--active'] : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}
    </header>
  );
};

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search earrings, necklaces, rings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </form>
    </div>
  );
};

export default Navbar;
