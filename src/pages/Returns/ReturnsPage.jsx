import React from 'react';
import Hero from '../../components/common/Hero/Hero';
import styles from './ReturnsPage.module.css';

const STEPS = [
  { n: '1', icon: '📋', title: 'Start Your Return', desc: 'Visit the returns portal below, enter your order number and email address to get started.' },
  { n: '2', icon: '📦', title: 'Pack Your Item', desc: 'Place the item in its original packaging (or a secure box) with all tags and certificates included.' },
  { n: '3', icon: '🏷️', title: 'Print Label', desc: 'Download and print your free prepaid return label from the confirmation email we send you.' },
  { n: '4', icon: '📮', title: 'Post It', desc: 'Drop your parcel at any post office or Royal Mail collection point. Keep your receipt as proof.' },
  { n: '5', icon: '💳', title: 'Get Refunded', desc: 'Once received and inspected, your refund is processed within 3–5 business days.' },
];

const CONDITIONS = [
  { title: 'Time Window', value: '30 days from delivery' },
  { title: 'Item Condition', value: 'Unworn, unaltered, original packaging' },
  { title: 'Refund Method', value: 'Original payment method' },
  { title: 'Processing Time', value: '3–5 business days on receipt' },
  { title: 'Return Postage', value: 'Free (prepaid label provided)' },
  { title: 'Exchanges', value: 'Free within 30 days' },
];

const EXCEPTIONS = [
  'Personalised or engraved items',
  'Earrings (for hygiene reasons)',
  'Items purchased during final sale events',
  'Items showing signs of wear or damage',
  'Gift cards',
];

const ReturnsPage = () => (
  <div className={styles.page}>
    <Hero
      title="Returns & Exchanges"
      subtitle="Not quite right? We make returns effortless. 30-day hassle-free returns on all standard orders."
      backgroundImage="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1400&q=80&auto=format&fit=crop"
    />

    {/* Policy Summary */}
    <section className={styles.summarySection}>
      <div className={styles.container}>
        <div className={styles.summaryGrid}>
          {CONDITIONS.map((c) => (
            <div key={c.title} className={styles.summaryCard}>
              <div className={styles.summaryLabel}>{c.title}</div>
              <div className={styles.summaryValue}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Steps */}
    <section className={styles.stepsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>How to Return</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepTop}>
                <div className={styles.stepNum}>{s.n}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
              </div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Exceptions */}
    <section className={styles.exceptionsSection}>
      <div className={styles.container}>
        <div className={styles.exceptionsCard}>
          <h2 className={styles.exceptionsTitle}>Non-Returnable Items</h2>
          <p className={styles.exceptionsSubtitle}>The following items cannot be returned or exchanged:</p>
          <ul className={styles.exceptionsList}>
            {EXCEPTIONS.map((e) => (
              <li key={e} className={styles.exceptionItem}>
                <span className={styles.exceptionDot}>×</span> {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className={styles.ctaSection}>
      <div className={styles.ctaInner}>
        <h2 className={styles.ctaTitle}>Ready to Return?</h2>
        <p className={styles.ctaText}>Start your return in minutes using our online portal.</p>
        <a href="/contact" className={styles.ctaBtn}>Start a Return</a>
        <p className={styles.ctaNote}>Questions? <a href="/contact">Contact our support team</a></p>
      </div>
    </section>
  </div>
);

export default ReturnsPage;
