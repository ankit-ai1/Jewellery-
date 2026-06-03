import React from 'react';
import { Link } from 'react-router-dom';
import { CONTENT } from '../../../constants/content';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>

          {/* About */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>About</h4>
            <p className={styles.columnText}>{CONTENT.FOOTER_ABOUT_TEXT}</p>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{CONTENT.FOOTER_QUICK_LINKS}</h4>
            <ul className={styles.links}>
              <li><Link to="/shop">Shop All</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/best-sellers">Best Sellers</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/gifting">Gifting</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{CONTENT.FOOTER_CUSTOMER_SERVICE}</h4>
            <ul className={styles.links}>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{CONTENT.FOOTER_LEGAL}</h4>
            <ul className={styles.links}>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>{CONTENT.FOOTER_COPYRIGHT}</p>
      </div>
    </footer>
  );
};

export default Footer;
