import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../hooks';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import Button from '../../components/common/Button/Button';
import styles from './WishlistPage.module.css';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>🤍</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Add your favorite jewellery to your wishlist</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Wishlist</h1>
        <div className={styles.productsGrid}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
