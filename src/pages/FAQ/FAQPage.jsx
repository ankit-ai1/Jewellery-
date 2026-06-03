import React, { useState } from 'react';
import Hero from '../../components/common/Hero/Hero';
import styles from './FAQPage.module.css';

const FAQS = [
  {
    section: 'Orders & Payment',
    icon: '🛍️',
    items: [
      { q: 'How do I place an order?', a: 'Browse our collections, select your desired piece, choose size if applicable, and click "Add to Cart". Proceed to checkout to complete your purchase securely.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are encrypted and secure.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Please contact us immediately at support@lumoria.com with your order number.' },
      { q: 'Will I receive an order confirmation?', a: 'Yes, a confirmation email with your order details and tracking information will be sent to your registered email address within minutes of placing your order.' },
    ],
  },
  {
    section: 'Shipping & Delivery',
    icon: '📦',
    items: [
      { q: 'How long does delivery take?', a: 'Standard UK delivery takes 3–5 business days. Express delivery is available within 1–2 business days. International orders typically arrive in 7–14 business days.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all UK orders over £75. International free shipping is available on orders over £150.' },
      { q: 'How do I track my order?', a: 'Once dispatched, you will receive a tracking number via email. You can use this to track your package in real time on our website or the courier\'s site.' },
      { q: 'Do you ship internationally?', a: 'We ship to over 40 countries worldwide. International shipping rates and delivery times vary by destination. Duties and taxes may apply.' },
    ],
  },
  {
    section: 'Returns & Exchanges',
    icon: '🔄',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free returns policy. Items must be unworn, in original packaging, with all tags attached. Sale items are final sale.' },
      { q: 'How do I initiate a return?', a: 'Visit our Returns page, enter your order number and email, select the items you wish to return, and print your prepaid return label. Drop off at any post office.' },
      { q: 'How long does a refund take?', a: 'Once we receive your return, refunds are processed within 3–5 business days. The amount will appear in your account within 5–10 business days depending on your bank.' },
      { q: 'Can I exchange an item for a different size?', a: 'Absolutely! We offer free exchanges on sizing within 30 days. Simply initiate a return and place a new order, or contact us and we will arrange a direct exchange.' },
    ],
  },
  {
    section: 'Product & Care',
    icon: '💎',
    items: [
      { q: 'What is demi-fine jewellery?', a: 'Demi-fine jewellery sits between costume and fine jewellery. Our pieces are made with sterling silver or gold vermeil — real precious metals at accessible price points.' },
      { q: 'How do I care for my Lumoria jewellery?', a: 'Store pieces in the provided pouch away from direct sunlight. Avoid contact with perfume, lotions, and water. Clean gently with a soft cloth. Remove before swimming or exercising.' },
      { q: 'Will the gold plating wear off?', a: 'Our gold vermeil uses a thick layer of 18KT gold over sterling silver. With proper care, it will last for years. We recommend avoiding prolonged water exposure to maintain the finish.' },
      { q: 'Are your materials ethically sourced?', a: 'Yes. We are committed to ethical sourcing. All our metals are responsibly sourced and our suppliers comply with ethical labour standards. We are working towards full supply chain transparency.' },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqItemOpen : ''}`}>
      <button className={styles.faqQuestion} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={styles.faqIcon}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.faqAnswer}><p>{a}</p></div>}
    </div>
  );
};

const FAQPage = () => (
  <div className={styles.page}>
    <Hero
      title="FAQ"
      subtitle="Everything you need to know about Lumoria — orders, shipping, returns, and care."
      backgroundImage="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80&auto=format&fit=crop"
    />

    <section className={styles.intro}>
      <div className={styles.container}>
        <p className={styles.introText}>
          Can't find your answer? <a href="/contact" className={styles.introLink}>Contact our team</a> and we'll get back to you within 24 hours.
        </p>
      </div>
    </section>

    <section className={styles.faqSection}>
      <div className={styles.container}>
        {FAQS.map((section) => (
          <div key={section.section} className={styles.faqGroup}>
            <div className={styles.groupHeader}>
              <span className={styles.groupIcon}>{section.icon}</span>
              <h2 className={styles.groupTitle}>{section.section}</h2>
            </div>
            <div className={styles.faqList}>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <h2 className={styles.ctaTitle}>Still have questions?</h2>
        <p className={styles.ctaText}>Our customer care team is available Monday–Saturday, 9am–6pm GMT.</p>
        <a href="/contact" className={styles.ctaBtn}>Get In Touch</a>
      </div>
    </section>
  </div>
);

export default FAQPage;
