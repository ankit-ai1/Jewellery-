import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useCart, useWishlist } from '../../hooks';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import Rating from '../../components/common/Rating/Rating';
import Button from '../../components/common/Button/Button';
import styles from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState('');

  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>Product not found</p>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || null);
  };

  const isWished = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.originalPrice, product.price);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.mainImage}
          />
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <p className={styles.material}>{product.material}</p>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.rating}>
            <Rating rating={product.rating} reviewCount={product.reviews} />
          </div>

          <div className={styles.pricing}>
            <span className={styles.currentPrice}>
              {formatPrice(product.price)}
            </span>
            <span className={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </span>
            <span className={styles.discount}>({discountPercent}% OFF)</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizeSection}>
              <label className={styles.label}>Select Size:</label>
              <div className={styles.sizes}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${
                      selectedSize === size ? styles['sizeBtn--active'] : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className={styles.quantitySection}>
            <label className={styles.label}>Quantity:</label>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <button
              className={`${styles.wishlistBtn} ${
                isWished ? styles['wishlistBtn--active'] : ''
              }`}
              onClick={() => toggleWishlist(product)}
            >
              {isWished ? '❤️' : '🤍'} Wishlist
            </button>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span>✓ Lifetime Warranty</span>
            </div>
            <div className={styles.infoItem}>
              <span>✓ Ships in 24 Hours</span>
            </div>
            <div className={styles.infoItem}>
              <span>✓ Free Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
