import React from 'react';
import Button from '../components/common/Button/Button';
import styles from './BasicPages.module.css';

export const AboutPage = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>About Lumoria</h1>
      <div className={styles.content}>
        <p>
          Lumoria is a premium demi-fine jewellery brand dedicated to creating
          beautiful, affordable luxury pieces for everyday wear.
        </p>
        <p>
          Every piece is crafted with meticulous attention to detail, using
          high-quality materials and ethical practices.
        </p>
      </div>
    </div>
  </div>
);

export const ContactPage = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" placeholder="Your name" />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" placeholder="Your email" />
        </div>
        <div className={styles.formGroup}>
          <label>Message</label>
          <textarea placeholder="Your message" rows="5"></textarea>
        </div>
        <Button variant="primary" size="lg">
          Send Message
        </Button>
      </form>
    </div>
  </div>
);

export const AccountPage = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>My Account</h1>
      <div className={styles.content}>
        <p>Sign in to view your orders and manage your account.</p>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Your email" />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" placeholder="Your password" />
          </div>
          <Button variant="primary" size="lg">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  </div>
);

export const CheckoutPage = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <form className={styles.form}>
        <fieldset>
          <legend className={styles.legend}>Shipping Address</legend>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Full name" />
          </div>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" placeholder="Address" />
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
            <div className={styles.formGroup}>
              <label>Postal Code</label>
              <input type="text" placeholder="Postal code" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.legend}>Payment Method</legend>
          <div className={styles.formGroup}>
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" />
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className={styles.formGroup}>
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
        </fieldset>

        <Button variant="primary" size="lg" fullWidth>
          Place Order
        </Button>
      </form>
    </div>
  </div>
);
