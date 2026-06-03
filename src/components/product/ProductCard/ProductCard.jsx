import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist, useCart } from '../../../hooks';
import { formatPrice, calculateDiscount } from '../../../utils/helpers';
import Rating from '../../common/Rating/Rating';
import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isWished = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.originalPrice, product.price);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className={styles.card}>
      {/* Image Section */}
      <div className={styles.imageContainer} onClick={handleProductClick}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />

        {/* Badge */}
        {product.badge && (
          <div className={styles.badgeContainer}>
            <Badge
              variant={
                product.badge === 'New'
                  ? 'success'
                  : product.badge === 'Luxury'
                  ? 'luxury'
                  : 'primary'
              }
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${isWished ? styles['wishlistBtn--active'] : ''}`}
          onClick={handleToggleWishlist}
          aria-label="Toggle wishlist"
        >
          {isWished ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Info Section */}
      <div className={styles.info}>
        {/* Material */}
        <div className={styles.material}>{product.material}</div>

        {/* Name */}
        <h3 className={styles.name} onClick={handleProductClick}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className={styles.rating}>
          <Rating rating={product.rating} reviewCount={product.reviews} size="sm" />
        </div>

        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
          <span className={styles.originalPrice}>
            {formatPrice(product.originalPrice)}
          </span>
          <span className={styles.discount}>({discountPercent}% OFF)</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          fullWidth
          variant="secondary"
          size="md"
          onClick={handleAddToCart}
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
