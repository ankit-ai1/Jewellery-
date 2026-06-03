import React from 'react';
import styles from './PolicyPage.module.css';

const TermsPage = () => (
  <div className={styles.page}>
    <div className={styles.hero}>
      <div>
        <h1 className={styles.heroTitle}>Terms & Conditions</h1>
        <p className={styles.heroMeta}>Last updated: January 2025</p>
      </div>
    </div>

    <div className={styles.body}>

      <div className={styles.highlight}>
        By accessing or purchasing from Lumoria, you agree to these Terms & Conditions. Please read them carefully before placing an order.
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>1. About Us</h2>
        <p className={styles.text}>Lumoria is a premium demi-fine jewellery brand registered in the United Kingdom. References to "we", "us", or "Lumoria" refer to the company. References to "you" or "customer" refer to the person using our website or purchasing our products.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Orders & Contract</h2>
        <p className={styles.text}>When you place an order, you are making an offer to purchase. A binding contract is formed only when we send you an order confirmation email. We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud.</p>
        <p className={styles.text}>All orders are subject to stock availability. If an item becomes unavailable after your order is placed, we will notify you promptly and offer a full refund or suitable alternative.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Pricing & Payment</h2>
        <p className={styles.text}>All prices are displayed in British Pounds (£) and include VAT where applicable. We reserve the right to change prices at any time. The price charged will be the price displayed at the time of your order.</p>
        <p className={styles.text}>Payment is required in full at the time of ordering. We accept major credit/debit cards, PayPal, Apple Pay, and Google Pay. All payment processing is handled by PCI-compliant third-party providers.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Delivery</h2>
        <p className={styles.text}>We aim to dispatch all orders within 1–2 business days. Delivery timescales are estimates and not guaranteed. We are not liable for delays caused by third-party couriers, customs, or circumstances beyond our control. Risk passes to you upon delivery.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Returns & Refunds</h2>
        <p className={styles.text}>We offer a 30-day returns policy for unworn items in original condition. Certain items (earrings, personalised pieces, sale items) are non-returnable. Refunds are processed to the original payment method within 3–5 business days of receiving the return. See our <a href="/returns" style={{color: 'var(--color-primary)'}}>Returns Policy</a> for full details.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Product Descriptions & Images</h2>
        <p className={styles.text}>We make every effort to display our products accurately. However, colours may vary slightly due to monitor settings, photography lighting, and screen calibration. Product descriptions are provided in good faith but do not form part of any contract.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
        <p className={styles.text}>All content on this website — including text, images, logos, designs, and product photography — is the property of Lumoria and protected by copyright. You may not reproduce, distribute, or use our content for commercial purposes without our express written consent.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Limitation of Liability</h2>
        <p className={styles.text}>To the fullest extent permitted by law, Lumoria's liability to you shall not exceed the value of your order. We are not liable for indirect, consequential, or incidental losses. Nothing in these terms limits liability for death, personal injury, or fraud.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Governing Law</h2>
        <p className={styles.text}>These terms are governed by English law and any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales. If you are a consumer in Scotland or Northern Ireland, you may also have rights under the laws of those jurisdictions.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Changes to These Terms</h2>
        <p className={styles.text}>We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Your continued use of our website constitutes acceptance of the revised terms.</p>
      </div>

      <div className={styles.contact}>
        <h3 className={styles.contactTitle}>Legal Enquiries</h3>
        <p className={styles.contactText}>For questions about these terms, please contact us.</p>
        <a href="mailto:legal@lumoria.com" className={styles.contactEmail}>legal@lumoria.com</a>
      </div>
    </div>
  </div>
);

export default TermsPage;
