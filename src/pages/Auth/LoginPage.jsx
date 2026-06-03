import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/account';
  const infoMessage = location.state?.message || (redirectPath === '/checkout'
    ? 'Please login to continue with checkout.'
    : '');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login({
        email,
        name: email.split('@')[0],
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
      navigate(redirectPath, { replace: true });
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp97E1DhE00lDPJkgDl4NtPtISuqqq5sQZVXmcCW3nHoYk-jNSwkVLYVVq_uhaRPEyaw_Qzr0mGcX1o-T56TTYwUlxNHoLuOfqOV_My5V2ARxTX4OqO7niFKc3Aqn6GJzCEbCpP1vyh3gYsEDPscMTJ5MA_zyUm8PPZflBzkRR3vOv7KcgUGR4zN5oGVn_ZF2cUAeVt64b8g1NnJbmPK0YH_h5DLxkcsinoDnW1FwNItxK2m30YKPN2TrwZkrkm8yMQUn58UIO-wQD"
          alt="Editorial jewelry photography"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <p className={styles.heroEyebrow}>The Aura Collection</p>
          <h2 className={styles.heroTitle}>Timeless Craftsmanship</h2>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Please sign in to access your curated collection.</p>
          </div>

          <form onSubmit={handleSignIn} className={styles.form}>
            {infoMessage && <div className={styles.notice}>{infoMessage}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <label htmlFor="password" className={styles.label}>
                  PASSWORD
                </label>
                <button type="button" className={styles.secondaryLink}>
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Signing In...' : 'SIGN IN'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.footer}>
            <span className={styles.footerText}>New to Lumoria?</span>
            <button
              onClick={() => navigate('/register')}
              className={styles.linkButton}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
