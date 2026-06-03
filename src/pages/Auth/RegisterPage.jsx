import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login({
        email: formData.email,
        name: formData.name,
        phone: '+44 7700 900123',
        addresses: [
          {
            id: 'addr-01',
            line1: '12 Kensington Gardens Mews',
            city: 'London',
            postcode: 'W8 4QH',
            country: 'United Kingdom',
          },
        ],
      });
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/account');
      }, 800);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh3H4V4LzZMAhUkqiMpRcerBhIXRILb6U4QmyiqTVf-Yc5llspf5K76VI2s6VkoBNdsaua_L8k37IbP8ZrmN45TMR4HYx9xkaRFoB4xxHnqUNUDW71EeRYssro6N4HrDwmMJ4_4vslzY88wIBiXAm4wmyrPgXkko-ZB7xf42G4XersKe7YDU4xU3MZm4nxwOiZYfwWbsBuP17MAEahvny9mqeinbqoEPu81jIYQHl4TP8BK8KgQy0WCKUdySDcbBGidsd96JqGOL4D"
          alt="Editorial fashion shot"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <h2 className={styles.heroTitle}>Timeless Elegance</h2>
          <p className={styles.heroSubtitle}>Join our curated community and experience the art of fine jewelry redefined for the modern connoisseur.</p>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <header className={styles.formHeader}>
            <h1 className={styles.title}>Create Your Account</h1>
            <p className={styles.subtitle}>Embark on a journey of refined craftsmanship and exclusive access.</p>
          </header>

          <form onSubmit={handleSignUp} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                FULL NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Isabella Sterling"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="isabella@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="newsletter" className={styles.checkboxLabel}>
                Subscribe to our newsletter to receive updates on new collections and exclusive invitations to private events.
              </label>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Creating Account...' : 'JOIN THE CIRCLE'}
            </button>
          </form>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?
              <button
                onClick={() => navigate('/login')}
                className={styles.linkButton}
              >
                Sign In
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
