import React from 'react';
import Hero from '../../components/common/Hero/Hero';
import styles from './ShippingPage.module.css';

const METHODS = [
  { icon: '🚚', name: 'Standard Delivery', time: '3–5 Business Days', price: '£3.99', free: 'Free over £75', detail: 'Tracked delivery via Royal Mail or DPD. You will receive a tracking number once dispatched.' },
  { icon: '⚡', name: 'Express Delivery', time: '1–2 Business Days', price: '£7.99', free: 'Free over £150', detail: 'Priority handling and next-day delivery available. Order before 2pm for same-day dispatch.' },
  { icon: '✈️', name: 'International', time: '7–14 Business Days', price: 'From £12.99', free: 'Free over £150', detail: 'We ship to 40+ countries. Duties and taxes may apply at destination. Fully tracked service.' },
];

const STEPS = [
  { step: '01', title: 'Order Placed', desc: 'You receive an instant confirmation email with your order summary.' },
  { step: '02', title: 'Processing', desc: 'Our team carefully prepares and quality-checks your piece within 24 hours.' },
  { step: '03', title: 'Dispatched', desc: 'Your order is beautifully packaged and handed to our courier partner.' },
  { step: '04', title: 'Delivered', desc: 'Your Lumoria piece arrives at your door in our signature gift packaging.' },
];

const FAQS = [
  { q: 'Can I change my delivery address after ordering?', a: 'Address changes can be made within 1 hour of placing your order. Contact us immediately at support@lumoria.com.' },
  { q: 'What if I miss my delivery?', a: 'The courier will leave a card with redelivery instructions. You can also redirect to a local pick-up point via the courier\'s tracking page.' },
  { q: 'Do you deliver to PO Boxes?', a: 'We are unable to deliver to PO Boxes. Please provide a full residential or business address at checkout.' },
  { q: 'Is my order insured during transit?', a: 'Yes. All Lumoria orders are fully insured during transit. In the unlikely event of loss or damage, we will replace your item free of charge.' },
];

const ShippingPage = () => (
  <div className={styles.page}>
    <Hero
      title="Shipping Info"
      subtitle="Beautiful jewellery deserves beautiful delivery. Free shipping on UK orders over £75."
      backgroundImage="https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=1400&q=80&auto=format&fit=crop"
    />

    {/* Shipping Methods */}
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Delivery Options</h2>
        <div className={styles.methodsGrid}>
          {METHODS.map((m) => (
            <div key={m.name} className={styles.methodCard}>
              <div className={styles.methodIcon}>{m.icon}</div>
              <h3 className={styles.methodName}>{m.name}</h3>
              <div className={styles.methodTime}>{m.time}</div>
              <div className={styles.methodPrice}>{m.price}</div>
              <div className={styles.methodFree}>{m.free}</div>
              <p className={styles.methodDetail}>{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Journey Steps */}
    <section className={styles.journeySection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Your Order's Journey</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((s, i) => (
            <div key={s.step} className={styles.step}>
              <div className={styles.stepNumber}>{s.step}</div>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Info Banner */}
    <section className={styles.bannerSection}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <span className={styles.bannerIcon}>🎁</span>
          <div>
            <strong>Signature Gift Packaging</strong>
            <p>Every Lumoria order arrives in our premium gift box with a handwritten note option at checkout — perfect for gifting.</p>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Common Questions</h2>
        <div className={styles.faqGrid}>
          {FAQS.map((f) => (
            <div key={f.q} className={styles.faqCard}>
              <h4 className={styles.faqQ}>{f.q}</h4>
              <p className={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ShippingPage;
