import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setProfileData({
      name: userData.name || '',
      email: userData.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Luxury Lane, New York, NY 10001',
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate API call
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>MY ACCOUNT</h1>
          <p className={styles.headerSubtitle}>Welcome back, {user.name}</p>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Sidebar Navigation */}
        <nav className={styles.sidebar}>
          <div className={styles.navSection}>
            <h3 className={styles.navTitle}>ACCOUNT</h3>
            <ul className={styles.navList}>
              <li>
                <button
                  className={`${styles.navLink} ${activeTab === 'profile' ? styles.active : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Details
                </button>
              </li>
              <li>
                <button
                  className={`${styles.navLink} ${activeTab === 'orders' ? styles.active : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Order History
                </button>
              </li>
              <li>
                <button
                  className={`${styles.navLink} ${activeTab === 'wishlist' ? styles.active : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  className={`${styles.navLink} ${activeTab === 'addresses' ? styles.active : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  Addresses
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.divider}></div>

          <button className={styles.logoutButton} onClick={handleLogout}>
            SIGN OUT
          </button>
        </nav>

        {/* Main Content Area */}
        <main className={styles.content}>
          {/* Profile Details Tab */}
          {activeTab === 'profile' && (
            <div className={styles.tab}>
              <h2 className={styles.tabTitle}>Personal Information</h2>
              <form onSubmit={handleProfileUpdate} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className={styles.input}
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
                      value={profileData.email}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.label}>
                    ADDRESS
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.button}>
                  SAVE CHANGES
                </button>
              </form>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className={styles.tab}>
              <h2 className={styles.tabTitle}>Order History</h2>
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>You haven't placed any orders yet.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className={styles.emptyButton}
                >
                  Start Shopping
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className={styles.tab}>
              <h2 className={styles.tabTitle}>Wishlist</h2>
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>Your wishlist is empty.</p>
                <button
                  onClick={() => navigate('/')}
                  className={styles.emptyButton}
                >
                  Explore Jewelry
                </button>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className={styles.tab}>
              <h2 className={styles.tabTitle}>Saved Addresses</h2>
              <div className={styles.addressCard}>
                <div className={styles.addressHeader}>
                  <h3 className={styles.addressLabel}>HOME</h3>
                  <span className={styles.badge}>DEFAULT</span>
                </div>
                <p className={styles.addressText}>{profileData.address}</p>
                <div className={styles.addressActions}>
                  <button className={styles.editLink}>Edit</button>
                  <button className={styles.deleteLink}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
