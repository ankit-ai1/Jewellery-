import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useUser } from '../../hooks';
import { formatPrice } from '../../utils/helpers';
import Button from '../../components/common/Button/Button';
import styles from './CartPage.module.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useCart();
  const { isAuthenticated } = useUser();

  const total = getCartTotal();
  const tax = Math.round(total * 0.18);
  const finalTotal = total + tax;

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>🛍️</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some beautiful jewellery to your cart</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.cartItems}>
          <h1 className={styles.title}>Shopping Bag</h1>
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
              <img src={item.image} alt={item.name} />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.material}</p>
                {item.size && <p>Size: {item.size}</p>}
              </div>
              <div className={styles.itemPrice}>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className={styles.itemQuantity}>
                <button onClick={() => updateCartQuantity(item.id, item.qty - 1, item.size)}>
                  −
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateCartQuantity(item.id, item.qty + 1, item.size)}>
                  +
                </button>
              </div>
              <div className={styles.itemTotal}>
                {formatPrice(item.price * item.qty)}
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id, item.size)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (18%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login?redirect=/checkout', {
                  state: { message: 'Please login to continue with checkout.' },
                });
              } else {
                navigate('/checkout');
              }
            }}
          >
            Proceed to Checkout
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
