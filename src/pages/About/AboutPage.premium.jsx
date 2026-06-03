import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/common/Button/Button';
import Hero from '../../components/common/Hero/Hero';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const brandValues = [
    {
      icon: '✨',
      title: 'Premium Craftsmanship',
      description: 'Every piece is meticulously crafted by skilled artisans with years of experience in fine jewellery making.'
    },
    {
      icon: '🌍',
      title: 'Ethical Sourcing',
      description: 'We source all materials responsibly, ensuring fair practices and environmental sustainability.'
    },
    {
      icon: '💎',
      title: 'Timeless Design',
      description: 'Our designs transcend trends, created to be treasured and worn for generations to come.'
    },
    {
      icon: '👑',
      title: 'Everyday Luxury',
      description: 'Premium jewellery made accessible, so everyone can experience affordable luxury daily.'
    }
  ];

  const features = [
    { icon: '🛡️', title: 'Hypoallergenic', description: 'Safe for sensitive skin' },
    { icon: '✨', title: 'Tarnish Resistant', description: 'Maintains shine for years' },
    { icon: '💫', title: 'Premium Materials', description: 'Only finest metals & stones' },
    { icon: '🔒', title: 'Secure Shopping', description: 'Encrypted & protected' },
    { icon: '🚚', title: 'Fast Delivery', description: 'Ships within 24 hours' },
    { icon: '↩️', title: 'Easy Returns', description: '30-day return policy' }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '1,000+', label: 'Unique Designs' },
    { number: '4.8/5', label: 'Customer Rating' },
    { number: '100%', label: 'Quality Checked' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Jewellery Enthusiast',
      text: 'I absolutely love my Lumoria collection. The quality is outstanding and the pieces are so elegant. I wear them every day!',
      rating: 5,
      avatar: 'P'
    },
    {
      name: 'Anjali Kapoor',
      role: 'Fashion Blogger',
      text: 'Lumoria has transformed how I accessorize. Their designs are timeless and affordable. Highly recommend to everyone!',
      rating: 5,
      avatar: 'A'
    },
    {
      name: 'Neha Desai',
      role: 'Business Owner',
      text: 'Finally, luxury jewellery that fits my lifestyle and budget. Every piece from Lumoria is a conversation starter.',
      rating: 5,
      avatar: 'N'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Lumoria - Premium Demi-Fine Jewellery</title>
        <meta name="description" content="Discover the story behind Lumoria. Premium, affordable luxury jewellery designed for everyday elegance." />
      </Helmet>

      <div className={styles.page}>
        {/* Hero Section (standardized) */}
        <Hero
          title="About Lumoria"
          subtitle={"Discover the artistry, ethics, and passion behind every piece. We believe that luxury should be accessible to everyone who appreciates fine craftsmanship and timeless elegance."}
        />
        

        {/* Our Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            <div className={styles.storyImage}>
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80" 
                alt="Lumoria Craftsmanship"
              />
            </div>
            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>Why Lumoria Exists</h2>
              <p className={styles.storyText}>
                In 2019, we founded Lumoria with a simple vision: to make premium jewellery accessible to everyone. 
                We noticed a gap in the market—either you could buy affordable but low-quality jewellery, 
                or invest in expensive luxury pieces. We wanted to offer a third option.
              </p>
              <p className={styles.storyText}>
                Today, Lumoria represents the perfect balance of affordability and luxury. Each piece is 
                designed to be worn daily, layered with confidence, and cherished for years to come. 
                From office meetings to weekend adventures, our jewellery adapts to your lifestyle.
              </p>
              <p className={styles.storyText}>
                We call it "Everyday Luxury"—beautiful, premium pieces that don't require a special occasion 
                to be worn. Because everyone deserves to feel elegant every single day.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <p className={styles.sectionSubtitle}>
              Every decision we make is guided by these principles
            </p>
            <div className={styles.valuesGrid}>
              {brandValues.map((value, idx) => (
                <div key={idx} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Lumoria Section */}
        <section className={styles.whySection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose Lumoria</h2>
            <p className={styles.sectionSubtitle}>
              Benefits that make us different
            </p>
            <div className={styles.featuresGrid}>
              {features.map((feature, idx) => (
                <div key={idx} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className={styles.trustSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Trusted By Thousands</h2>
            <p className={styles.sectionSubtitle}>
              Join our growing community of Lumoria lovers
            </p>
            <div className={styles.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Customer Stories</h2>
            <p className={styles.sectionSubtitle}>
              Hear from our happy customers
            </p>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className={styles.testimonialCard}>
                  <div className={styles.testimonialHeader}>
                    <div className={styles.testimonialAvatar}>{testimonial.avatar}</div>
                    <div className={styles.testimonialMeta}>
                      <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                      <p className={styles.testimonialRole}>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className={styles.testimonialRating}>
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Discover Jewellery Designed For Everyday Elegance</h2>
            <p className={styles.ctaSubtitle}>
              Explore our collections and find the perfect piece to express your style
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg">
                Shop Collection
              </Button>
              <Button variant="secondary" size="lg">
                Best Sellers
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
