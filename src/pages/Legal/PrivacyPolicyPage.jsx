import React from 'react';
import styles from './PolicyPage.module.css';

const PrivacyPolicyPage = () => (
  <div className={styles.page}>
    <div className={styles.hero}>
      <div>
        <h1 className={styles.heroTitle}>Privacy Policy</h1>
        <p className={styles.heroMeta}>Last updated: January 2025</p>
      </div>
    </div>

    <div className={styles.body}>

      <div className={styles.highlight}>
        Your privacy matters to us. This policy explains how Lumoria collects, uses, and protects your personal information when you shop with us.
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
        <p className={styles.text}>When you create an account or place an order, we collect:</p>
        <ul className={styles.list}>
          <li>Name, email address, and password</li>
          <li>Shipping and billing address</li>
          <li>Payment information (processed securely via our payment provider — we never store card details)</li>
          <li>Order history and preferences</li>
          <li>Communications you send us</li>
        </ul>
        <p className={styles.text}>We also automatically collect browsing data such as IP address, browser type, pages visited, and time spent on our site via cookies and analytics tools.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
        <p className={styles.text}>We use your data to:</p>
        <ul className={styles.list}>
          <li>Process and fulfil your orders</li>
          <li>Send order confirmations, shipping updates, and receipts</li>
          <li>Provide customer support</li>
          <li>Send marketing emails (only with your consent — you can unsubscribe at any time)</li>
          <li>Improve our website and personalise your experience</li>
          <li>Comply with legal obligations</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Sharing Your Information</h2>
        <p className={styles.text}>We never sell your personal data. We may share information with trusted third parties who assist us in operating our business:</p>
        <ul className={styles.list}>
          <li><strong>Payment processors</strong> (e.g. Stripe, PayPal) — for secure transaction handling</li>
          <li><strong>Courier partners</strong> (e.g. Royal Mail, DPD) — to deliver your orders</li>
          <li><strong>Analytics providers</strong> (e.g. Google Analytics) — to understand site usage</li>
          <li><strong>Email service providers</strong> — to send transactional and marketing emails</li>
        </ul>
        <p className={styles.text}>All third parties are contractually required to protect your data and use it only for specified purposes.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Cookies</h2>
        <p className={styles.text}>We use cookies to enhance your browsing experience. These include essential cookies (required for the site to function), analytics cookies, and marketing cookies (only with your consent). You can manage your cookie preferences at any time through your browser settings.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Data Retention</h2>
        <p className={styles.text}>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Account data is kept for the duration of your account. Order data is retained for 7 years for tax and legal purposes.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Your Rights</h2>
        <p className={styles.text}>Under UK GDPR and applicable data protection laws, you have the right to:</p>
        <ul className={styles.list}>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data ("right to be forgotten")</li>
          <li>Object to or restrict certain processing</li>
          <li>Withdraw marketing consent at any time</li>
          <li>Lodge a complaint with the ICO (Information Commissioner's Office)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Security</h2>
        <p className={styles.text}>We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your data. However, no method of internet transmission is 100% secure and we cannot guarantee absolute security.</p>
      </div>

      <div className={styles.contact}>
        <h3 className={styles.contactTitle}>Privacy Questions?</h3>
        <p className={styles.contactText}>For any data protection enquiries, please contact our Privacy team.</p>
        <a href="mailto:privacy@lumoria.com" className={styles.contactEmail}>privacy@lumoria.com</a>
      </div>
    </div>
  </div>
);

export default PrivacyPolicyPage;
