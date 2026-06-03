import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser, useWishlist } from '../../hooks';
import styles from './AccountPage.module.css';

const ORDERS = [
  {
    id: 'AUR-98231',
    name: 'Aurelia Solitaire Diamond Necklace',
    items: 1,
    price: '£1,250.00',
    status: 'Delivered',
    date: 'Oct 12, 2024',
    img: 'https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=200&q=80',
    delivery: '12 Kensington Gardens Mews, London, W8 4QH',
    timeline: [
      { label: 'Order Placed',   date: 'Oct 8, 2024',  done: true },
      { label: 'Processing',     date: 'Oct 9, 2024',  done: true },
      { label: 'Dispatched',     date: 'Oct 10, 2024', done: true },
      { label: 'Out for Delivery',date: 'Oct 12, 2024',done: true },
      { label: 'Delivered',      date: 'Oct 12, 2024', done: true },
    ],
  },
  {
    id: 'AUR-99540',
    name: 'Heritage Gold & Sapphire Studs',
    items: 2,
    price: '£840.00',
    status: 'Processing',
    date: 'Nov 3, 2024',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80',
    delivery: '12 Kensington Gardens Mews, London, W8 4QH',
    timeline: [
      { label: 'Order Placed',    date: 'Nov 3, 2024', done: true },
      { label: 'Processing',      date: 'Nov 4, 2024', done: true },
      { label: 'Dispatched',      date: '—',           done: false },
      { label: 'Out for Delivery',date: '—',           done: false },
      { label: 'Delivered',       date: '—',           done: false },
    ],
  },
  {
    id: 'AUR-97104',
    name: 'Lumoria Gold Vermeil Bracelet',
    items: 1,
    price: '£320.00',
    status: 'Delivered',
    date: 'Sep 5, 2024',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80',
    delivery: '12 Kensington Gardens Mews, London, W8 4QH',
    timeline: [
      { label: 'Order Placed',    date: 'Sep 1, 2024', done: true },
      { label: 'Processing',      date: 'Sep 2, 2024', done: true },
      { label: 'Dispatched',      date: 'Sep 3, 2024', done: true },
      { label: 'Out for Delivery',date: 'Sep 5, 2024', done: true },
      { label: 'Delivered',       date: 'Sep 5, 2024', done: true },
    ],
  },
];

const NAV = [
  { id: 'profile',   icon: '👤', label: 'Profile Details' },
  { id: 'orders',    icon: '📦', label: 'Order History' },
  { id: 'addresses', icon: '📍', label: 'Addresses' },
  { id: 'wishlist',  icon: '❤️', label: 'Wishlist' },
];

const EMPTY_ADDRESS = { label: '', line1: '', line2: '', city: '', postcode: '', country: 'United Kingdom' };

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout, updateProfile, addAddress, removeAddress } = useUser();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [activeSection, setActiveSection] = useState('profile');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileSaved, setProfileSaved] = useState(false);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [addressError, setAddressError] = useState('');

  if (isLoading) return null;
  if (!isAuthenticated) { navigate('/login'); return null; }

  const fullName = user.name || 'Guest';
  const email    = user.email || '—';
  const phone    = user.phone || '—';
  const memberSince = user.loginTime
    ? new Date(user.loginTime).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : 'Today';

  /* ── Profile edit ── */
  const startEdit = () => {
    setProfileForm({ name: user.name || '', phone: user.phone || '' });
    setEditingProfile(true);
    setProfileSaved(false);
  };
  const saveProfile = () => {
    if (!profileForm.name.trim()) return;
    updateProfile({ name: profileForm.name.trim(), phone: profileForm.phone.trim() });
    setEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  /* ── Add address ── */
  const submitAddress = () => {
    if (!addressForm.line1.trim() || !addressForm.city.trim() || !addressForm.postcode.trim()) {
      setAddressError('Please fill in all required fields.');
      return;
    }
    addAddress({ ...addressForm, label: addressForm.label || 'Home' });
    setAddressForm(EMPTY_ADDRESS);
    setShowAddAddress(false);
    setAddressError('');
  };

  return (
    <div className={styles.accountPage}>

      {/* ── Order Detail Modal ── */}
      {selectedOrder && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedOrder(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>Order #{selectedOrder.id}</h3>
                <p className={styles.modalSub}>Placed {selectedOrder.date} · {selectedOrder.items} item{selectedOrder.items > 1 ? 's' : ''} · {selectedOrder.price}</p>
              </div>
              <button className={styles.modalClose} onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className={styles.modalBody}>
              {/* Item */}
              <div className={styles.modalItem}>
                <img src={selectedOrder.img} alt={selectedOrder.name} className={styles.modalItemImg} />
                <div>
                  <p className={styles.modalItemName}>{selectedOrder.name}</p>
                  <p className={styles.modalItemMeta}>Qty: {selectedOrder.items} · {selectedOrder.price}</p>
                </div>
                <span className={selectedOrder.status === 'Delivered' ? styles.statusPill : styles.statusPillSecondary}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className={styles.modalDivider} />

              {/* Tracking Timeline */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>📦 Tracking</h4>
                <div className={styles.timeline}>
                  {selectedOrder.timeline.map((step, i) => (
                    <div key={i} className={`${styles.timelineStep} ${step.done ? styles.timelineStepDone : styles.timelineStepPending}`}>
                      <div className={styles.timelineDot} />
                      {i < selectedOrder.timeline.length - 1 && (
                        <div className={`${styles.timelineLine} ${step.done ? styles.timelineLineDone : ''}`} />
                      )}
                      <div className={styles.timelineContent}>
                        <span className={styles.timelineLabel}>{step.label}</span>
                        <span className={styles.timelineDate}>{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.modalDivider} />

              {/* Delivery Address */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>🏠 Delivery Address</h4>
                <p className={styles.modalAddress}>{fullName}<br />{selectedOrder.delivery}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1>My Account</h1>
        <p>Welcome back, <strong>{fullName}</strong>. Manage your profile, orders, and addresses.</p>
      </header>

      <div className={styles.pageGrid}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>{fullName.charAt(0).toUpperCase()}</div>
            <div>
              <p className={styles.avatarName}>{fullName}</p>
              <p className={styles.avatarEmail}>{email}</p>
            </div>
          </div>

          <nav className={styles.navList}>
            {NAV.map(({ id, icon, label }) => (
              <button
                key={id}
                className={activeSection === id ? styles.navLinkActive : styles.navLink}
                onClick={() => setActiveSection(id)}
              >
                <span className={styles.navIcon}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <button className={styles.logoutButton} onClick={() => { logout(); navigate('/login'); }}>
            Sign Out
          </button>
        </aside>

        {/* ── Content ── */}
        <div className={styles.contentArea}>

          {/* ── PROFILE ── */}
          {activeSection === 'profile' && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Personal Information</h2>
                  <p>Update your name and contact details.</p>
                </div>
                {!editingProfile && (
                  <button className={styles.editButton} onClick={startEdit}>Edit Details</button>
                )}
              </div>

              {profileSaved && <div className={styles.successBanner}>✓ Profile updated successfully.</div>}

              {editingProfile ? (
                <div className={styles.editForm}>
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>FULL NAME *</label>
                      <input
                        className={styles.formInput}
                        value={profileForm.name}
                        onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>PHONE NUMBER</label>
                      <input
                        className={styles.formInput}
                        value={profileForm.phone}
                        onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+44 7700 000000"
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>EMAIL ADDRESS</label>
                    <input className={`${styles.formInput} ${styles.formInputDisabled}`} value={email} disabled />
                    <span className={styles.formHint}>Email cannot be changed.</span>
                  </div>
                  <div className={styles.formActions}>
                    <button className={styles.btnPrimary} onClick={saveProfile}>Save Changes</button>
                    <button className={styles.btnGhost} onClick={() => setEditingProfile(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className={styles.infoGrid}>
                  <div className={styles.infoBlock}><span>Full Name</span><p>{fullName}</p></div>
                  <div className={styles.infoBlock}><span>Email Address</span><p>{email}</p></div>
                  <div className={styles.infoBlock}><span>Phone Number</span><p>{phone}</p></div>
                  <div className={styles.infoBlock}><span>Member Since</span><p>{memberSince}</p></div>
                </div>
              )}
            </section>
          )}

          {/* ── ORDERS ── */}
          {activeSection === 'orders' && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Order History</h2>
                  <p>Track your purchases and view past orders.</p>
                </div>
              </div>
              <div className={styles.orderList}>
                {ORDERS.map(o => (
                  <article key={o.id} className={styles.orderCard}>
                    <div className={styles.orderImage}>
                      <img src={o.img} alt={o.name} />
                    </div>
                    <div className={styles.orderMeta}>
                      <span className={o.status === 'Delivered' ? styles.statusPill : styles.statusPillSecondary}>
                        {o.status === 'Delivered' ? `✓ Delivered ${o.date}` : `⏳ ${o.status}`}
                      </span>
                      <h3>{o.name}</h3>
                      <p>Order #{o.id} · {o.items} item{o.items > 1 ? 's' : ''}</p>
                    </div>
                    <div className={styles.orderActions}>
                      <p className={styles.orderPrice}>{o.price}</p>
                      <button className={styles.orderButton} onClick={() => setSelectedOrder(o)}>
                        {o.status === 'Delivered' ? 'View Details' : 'Track Order'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ── ADDRESSES ── */}
          {activeSection === 'addresses' && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Saved Addresses</h2>
                  <p>Manage your delivery addresses.</p>
                </div>
                {!showAddAddress && (
                  <button className={styles.editButton} onClick={() => setShowAddAddress(true)}>+ Add Address</button>
                )}
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <div className={styles.addressFormCard}>
                  <h3 className={styles.addressFormTitle}>New Address</h3>
                  {addressError && <div className={styles.errorBanner}>{addressError}</div>}
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>LABEL (e.g. Home, Work)</label>
                      <input className={styles.formInput} value={addressForm.label}
                        onChange={e => setAddressForm(p => ({ ...p, label: e.target.value }))} placeholder="Home" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>COUNTRY</label>
                      <input className={styles.formInput} value={addressForm.country}
                        onChange={e => setAddressForm(p => ({ ...p, country: e.target.value }))} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ADDRESS LINE 1 *</label>
                    <input className={styles.formInput} value={addressForm.line1}
                      onChange={e => setAddressForm(p => ({ ...p, line1: e.target.value }))} placeholder="Street address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ADDRESS LINE 2</label>
                    <input className={styles.formInput} value={addressForm.line2}
                      onChange={e => setAddressForm(p => ({ ...p, line2: e.target.value }))} placeholder="Apartment, suite, etc." />
                  </div>
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CITY *</label>
                      <input className={styles.formInput} value={addressForm.city}
                        onChange={e => setAddressForm(p => ({ ...p, city: e.target.value }))} placeholder="London" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>POSTCODE *</label>
                      <input className={styles.formInput} value={addressForm.postcode}
                        onChange={e => setAddressForm(p => ({ ...p, postcode: e.target.value }))} placeholder="W1A 1AA" />
                    </div>
                  </div>
                  <div className={styles.formActions}>
                    <button className={styles.btnPrimary} onClick={submitAddress}>Save Address</button>
                    <button className={styles.btnGhost} onClick={() => { setShowAddAddress(false); setAddressError(''); }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Address List */}
              <div className={styles.addressGrid}>
                {(user.addresses || []).length === 0 && !showAddAddress && (
                  <div className={styles.emptyState}>
                    <span>📍</span>
                    <p>No saved addresses yet.</p>
                    <button className={styles.btnPrimary} onClick={() => setShowAddAddress(true)}>Add Your First Address</button>
                  </div>
                )}
                {(user.addresses || []).map(addr => (
                  <div key={addr.id} className={styles.addressCard}>
                    <div className={styles.addressHeader}>
                      <span>🏠</span>
                      <div>
                        <h3>{addr.label || 'Address'}</h3>
                        <span className={styles.addressCountry}>{addr.country}</span>
                      </div>
                    </div>
                    <p>
                      {fullName}<br />
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                      {addr.city}, {addr.postcode}<br />
                      {addr.country}
                    </p>
                    <button
                      className={styles.removeAddressBtn}
                      onClick={() => removeAddress(addr.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {(user.addresses || []).length > 0 && !showAddAddress && (
                  <button className={styles.addAddressCard} onClick={() => setShowAddAddress(true)}>
                    <span>＋</span>
                    <h3>Add New Address</h3>
                  </button>
                )}
              </div>
            </section>
          )}

          {/* ── WISHLIST ── */}
          {activeSection === 'wishlist' && (
            <section className={styles.card}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>My Wishlist</h2>
                  <p>{wishlist.length} saved piece{wishlist.length !== 1 ? 's' : ''}.</p>
                </div>
                {wishlist.length > 0 && (
                  <Link to="/wishlist" className={styles.editButton}>View Full Wishlist</Link>
                )}
              </div>

              {wishlist.length === 0 ? (
                <div className={styles.emptyState}>
                  <span>❤️</span>
                  <p>Your wishlist is empty.</p>
                  <Link to="/shop" className={styles.btnPrimary}>Discover Pieces</Link>
                </div>
              ) : (
                <div className={styles.wishlistGrid}>
                  {wishlist.map(item => (
                    <div key={item.id} className={styles.wishlistCard}>
                      <div className={styles.wishlistImage}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className={styles.wishlistInfo}>
                        <h4 className={styles.wishlistName}>{item.name}</h4>
                        <p className={styles.wishlistPrice}>£{item.price?.toLocaleString()}</p>
                      </div>
                      <div className={styles.wishlistActions}>
                        <Link to={`/product/${item.id}`} className={styles.orderButton}>View</Link>
                        <button
                          className={styles.removeWishlistBtn}
                          onClick={() => removeFromWishlist(item.id)}
                        >✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountPage;
