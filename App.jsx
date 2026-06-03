import { useState, useEffect, useRef, useCallback } from "react";

// ===================== DATA =====================
const PRODUCTS = [
  { id: 1, name: "Celestial Halo Bracelet", price: 2199, originalPrice: 3149, category: "Bracelets", tag: "Best Seller", rating: 4.8, reviews: 342, material: "18K Gold Plated", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80","https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Delicate celestial-inspired bracelet with shimmering stones", sizes: [] },
  { id: 2, name: "Moonrise Pendant Necklace", price: 2799, originalPrice: 3999, category: "Necklaces", tag: "New Arrival", rating: 4.9, reviews: 218, material: "Sterling Silver", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80","https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"], badge: "New", inStock: true, description: "Ethereal moonrise pendant with lab-grown diamond", sizes: [] },
  { id: 3, name: "Aurora Solitaire Ring", price: 2499, originalPrice: 3571, category: "Rings", tag: "Trending", rating: 4.7, reviews: 189, material: "18K Gold Vermeil", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80","https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Classic solitaire ring with brilliant-cut stone", sizes: ["5","6","7","8","9"] },
  { id: 4, name: "Stardust Hoop Earrings", price: 1899, originalPrice: 2713, category: "Earrings", tag: "Best Seller", rating: 4.8, reviews: 423, material: "18K Gold Plated", image: "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=400&q=80", images: ["https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=400&q=80","https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80"], badge: "Popular", inStock: true, description: "Sparkling hoop earrings with micro-pave setting", sizes: [] },
  { id: 5, name: "Solstice Chain Bracelet", price: 1749, originalPrice: 2499, category: "Bracelets", tag: "New Arrival", rating: 4.6, reviews: 156, material: "Sterling Silver", image: "https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=400&q=80", images: ["https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=400&q=80","https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80"], badge: "New", inStock: true, description: "Elegant chain bracelet with adjustable clasp", sizes: [] },
  { id: 6, name: "Nova Diamond Pendant", price: 3299, originalPrice: 4713, category: "Necklaces", tag: "Premium", rating: 4.9, reviews: 87, material: "9KT Gold + Lab Diamond", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"], badge: "Luxury", inStock: true, description: "Exquisite lab-grown diamond pendant in 9KT gold", sizes: [] },
  { id: 7, name: "Eclipse Bangle", price: 2599, originalPrice: 3713, category: "Bracelets", tag: "Trending", rating: 4.7, reviews: 203, material: "18K Gold Plated", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80", images: ["https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80","https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Bold eclipse-inspired bangle with geometric detail", sizes: [] },
  { id: 8, name: "Whisper Stud Earrings", price: 1495, originalPrice: 2136, category: "Earrings", tag: "Essential", rating: 4.6, reviews: 512, material: "Sterling Silver", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80","https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=400&q=80"], badge: "Free Gift", inStock: true, description: "Minimalist stud earrings for everyday elegance", sizes: [] },
  { id: 9, name: "Lyra Twisted Ring", price: 2899, originalPrice: 4141, category: "Rings", tag: "Unique", rating: 4.8, reviews: 134, material: "18K Gold Vermeil", image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80", images: ["https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=400&q=80","https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80"], badge: "Unique", inStock: true, description: "Sculptural twisted band ring with stone inlay", sizes: ["5","6","7","8","9"] },
  { id: 10, name: "Dew Drop Mangalsutra", price: 3499, originalPrice: 4999, category: "Mangalsutra", tag: "Best Seller", rating: 4.9, reviews: 276, material: "18K Gold Plated", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80","https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Modern minimal mangalsutra with dew drop motif", sizes: [] },
  { id: 11, name: "Orbit Men's Chain", price: 2633, originalPrice: 3761, category: "Mens", tag: "Men's Pick", rating: 4.7, reviews: 98, material: "18K Gold Plated", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80","https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Bold rope chain for the modern man", sizes: [] },
  { id: 12, name: "Bloom Emerald Necklace", price: 2223, originalPrice: 3175, category: "Necklaces", tag: "Trending", rating: 4.8, reviews: 167, material: "18K Gold Plated + CZ", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80","https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"], badge: "30% OFF", inStock: true, description: "Vibrant emerald-toned CZ necklace in gold", sizes: [] },
];

const CATEGORIES = [
  { name: "Earrings", icon: "💎", img: "https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=300&q=80" },
  { name: "Necklaces", icon: "✨", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80" },
  { name: "Bracelets", icon: "💫", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80" },
  { name: "Rings", icon: "💍", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80" },
  { name: "Mangalsutra", icon: "🌟", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&q=80" },
  { name: "Mens", icon: "⚡", img: "https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=300&q=80" },
];

const TESTIMONIALS = [
  { name: "Priya S.", product: "Aurora Solitaire Ring", text: "Absolutely gorgeous! Wore it to a wedding and got so many compliments. The quality is outstanding for this price.", rating: 5, avatar: "P" },
  { name: "Neha K.", product: "Celestial Halo Bracelet", text: "I've been wearing this daily for 3 months, it still looks brand new. Waterproof as promised! Love it so much.", rating: 5, avatar: "N" },
  { name: "Riya M.", product: "Stardust Hoop Earrings", text: "The finish is absolutely premium. My friends thought it was real gold! Fast delivery and beautiful packaging.", rating: 5, avatar: "R" },
  { name: "Ananya D.", product: "Moonrise Pendant Necklace", text: "Perfect gift for my sister. She was blown away by how stunning it looks. Lumoria never disappoints!", rating: 5, avatar: "A" },
];

const BLOG_POSTS = [
  { id: 1, title: "How to Style Gold Jewellery for Every Occasion", date: "May 28, 2026", category: "Style Guide", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", excerpt: "From office mornings to date nights, here's your ultimate guide to wearing gold effortlessly." },
  { id: 2, title: "Lab-Grown Diamonds: Everything You Need to Know", date: "May 20, 2026", category: "Jewellery 101", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", excerpt: "Sustainable, stunning, and surprisingly affordable — lab diamonds are changing the game." },
  { id: 3, title: "The Art of Layering Necklaces Like a Pro", date: "May 15, 2026", category: "Styling", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", excerpt: "Layering necklaces is an art — master it with these simple tips and look effortlessly chic." },
];

const OCCASIONS = ["Office Wear", "Daily Wear", "Party Wear", "Day Out", "Date Night", "Wedding Wear"];

// ===================== UTILS =====================
const formatPrice = (p) => `₹${p.toLocaleString("en-IN")}`;
const discount = (orig, curr) => Math.round(((orig - curr) / orig) * 100);

// ===================== COMPONENTS =====================

// Announcement Bar
function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const msgs = [
    "✨ Buy 2 Get 1 FREE | Use Code: LUMORIA3",
    "🚚 FREE Shipping on orders above ₹1999",
    "💎 New Arrivals: 9KT Fine Gold Collection",
    "🎁 Gift Wrapping Available | Ships in 24 Hours",
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: "#1a1205", color: "#e8c97e", padding: "10px 0", textAlign: "center", fontSize: "13px", letterSpacing: "0.5px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", overflow: "hidden" }}>
      <div style={{ transition: "all 0.4s ease" }}>{msgs[idx]}</div>
    </div>
  );
}

// Header
function Header({ page, setPage, cart, wishlist, searchOpen, setSearchOpen, mobileMenu, setMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const navItems = [
    { label: "New Arrivals", page: "shop", filter: "New Arrival" },
    { label: "Best Sellers", page: "shop", filter: "Best Seller" },
    { label: "Fine Gold", page: "shop", filter: "Premium" },
    { label: "Collections", page: "shop", filter: "" },
    { label: "Gifting", page: "shop", filter: "" },
    { label: "About", page: "about" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 999, background: scrolled ? "rgba(255,252,245,0.97)" : "#fffcf5", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8dcc8", transition: "all 0.3s ease", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: "700", color: "#1a1205", letterSpacing: "3px", lineHeight: 1 }}>LUMORIA</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "10px", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase" }}>Demi-Fine Jewellery</span>
        </div>

        {/* Nav - Desktop */}
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
          {navItems.map(n => (
            <span key={n.label} onClick={() => setPage(n.page)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: "#3d2c0e", cursor: "pointer", letterSpacing: "0.5px", fontWeight: "600", transition: "color 0.2s", borderBottom: page === n.page ? "2px solid #c9a84c" : "2px solid transparent", paddingBottom: "2px" }}
              onMouseEnter={e => e.target.style.color = "#c9a84c"} onMouseLeave={e => e.target.style.color = "#3d2c0e"}>{n.label}</span>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#3d2c0e", fontSize: "18px" }}>🔍</button>
          <button onClick={() => setPage("wishlist")} style={{ background: "none", border: "none", cursor: "pointer", color: "#3d2c0e", fontSize: "18px", position: "relative" }}>
            🤍
            {wishlist.length > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#c9a84c", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>{wishlist.length}</span>}
          </button>
          <button onClick={() => setPage("cart")} style={{ background: "none", border: "none", cursor: "pointer", color: "#3d2c0e", fontSize: "18px", position: "relative" }}>
            🛍️
            {cart.length > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#c9a84c", color: "#fff", borderRadius: "50%", width: "16px", height: "16px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.reduce((a, c) => a + c.qty, 0)}</span>}
          </button>
          <button onClick={() => setPage("account")} style={{ background: "none", border: "none", cursor: "pointer", color: "#3d2c0e", fontSize: "18px" }}>👤</button>
          <button onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", cursor: "pointer", color: "#3d2c0e", fontSize: "22px" }} className="mobile-menu-btn">☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div style={{ background: "#fffcf5", borderTop: "1px solid #e8dcc8", padding: "20px 24px" }}>
          {navItems.map(n => (
            <div key={n.label} onClick={() => { setPage(n.page); setMobileMenu(false); }} style={{ padding: "12px 0", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#3d2c0e", cursor: "pointer", borderBottom: "1px solid #f0e8d5" }}>{n.label}</div>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {searchOpen && <SearchBar setPage={setPage} setSearchOpen={setSearchOpen} />}
    </header>
  );
}

function SearchBar({ setPage, setSearchOpen }) {
  const [q, setQ] = useState("");
  const results = q.length > 1 ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];
  return (
    <div style={{ background: "#fffcf5", borderTop: "1px solid #e8dcc8", padding: "16px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", position: "relative" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search earrings, necklaces, rings..." style={{ width: "100%", padding: "12px 48px 12px 16px", border: "2px solid #c9a84c", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", outline: "none", background: "#fff", boxSizing: "border-box" }} autoFocus />
        <button onClick={() => setSearchOpen(false)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>✕</button>
        {results.length > 0 && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e8dcc8", borderRadius: "8px", zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", marginTop: "4px" }}>
            {results.map(p => (
              <div key={p.id} onClick={() => { setPage(`product-${p.id}`); setSearchOpen(false); }} style={{ display: "flex", gap: "12px", padding: "10px 16px", cursor: "pointer", borderBottom: "1px solid #f0e8d5", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.background = "#faf7f0"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", fontSize: "14px" }}>{p.name}</div>
                  <div style={{ color: "#c9a84c", fontSize: "13px" }}>{formatPrice(p.price)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card
function ProductCard({ product, addToCart, toggleWishlist, wishlist, setPage }) {
  const [hovered, setHovered] = useState(false);
  const isWished = wishlist.includes(product.id);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "none", cursor: "pointer", position: "relative" }}>
      {/* Image */}
      <div style={{ position: "relative", paddingTop: "110%", overflow: "hidden" }} onClick={() => setPage(`product-${product.id}`)}>
        <img src={hovered && product.images[1] ? product.images[1] : product.image} alt={product.name}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }} />
        {product.badge && (
          <div style={{ position: "absolute", top: "12px", left: "12px", background: product.badge === "New" ? "#2d7a4f" : product.badge === "Luxury" ? "#7c4a1e" : "#c9a84c", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px" }}>{product.badge}</div>
        )}
        <button onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", transform: isWished ? "scale(1.2)" : "scale(1)" }}>
          {isWished ? "❤️" : "🤍"}
        </button>
      </div>
      {/* Info */}
      <div style={{ padding: "16px" }}>
        <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{product.material}</div>
        <div onClick={() => setPage(`product-${product.id}`)} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", color: "#1a1205", marginBottom: "6px", lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <span style={{ color: "#f59e0b", fontSize: "12px" }}>{"★".repeat(Math.round(product.rating))}</span>
          <span style={{ fontSize: "12px", color: "#888" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: "#1a1205" }}>{formatPrice(product.price)}</span>
          <span style={{ fontSize: "13px", color: "#aaa", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
          <span style={{ fontSize: "12px", color: "#c9a84c", fontWeight: "700" }}>({discount(product.originalPrice, product.price)}% OFF)</span>
        </div>
        <button onClick={() => addToCart(product)}
          style={{ width: "100%", padding: "10px", background: hovered ? "#1a1205" : "#fff", color: hovered ? "#c9a84c" : "#1a1205", border: "2px solid #1a1205", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", transition: "all 0.3s ease" }}>
          Add to Bag
        </button>
      </div>
    </div>
  );
}

// ===================== PAGES =====================

// HOME PAGE
function HomePage({ setPage, addToCart, toggleWishlist, wishlist }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentSlide, setCurrentSlide] = useState(0);
  const tabs = ["ALL", "NECKLACES", "BRACELETS", "EARRINGS", "RINGS"];
  const filtered = activeTab === "ALL" ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.category.toUpperCase() === activeTab).slice(0, 8);
  
  const heroSlides = [
    { bg: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&q=80", title: "Where Everyday Meets Extraordinary", sub: "Demi-Fine Jewellery That Lasts" },
    { bg: "https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=1400&q=80", title: "New: 9KT Fine Gold Collection", sub: "Solid Gold. Real Value. Everyday Luxury." },
    { bg: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=80", title: "Lab-Grown Diamonds", sub: "Ethical Beauty. Timeless Shine." },
  ];
  
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  
  return (
    <div>
      {/* Hero Slider */}
      <div style={{ position: "relative", height: "90vh", minHeight: "500px", overflow: "hidden" }}>
        {heroSlides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 1s ease", opacity: i === currentSlide ? 1 : 0 }}>
            <img src={s.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,12,4,0.7) 0%, rgba(20,12,4,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: "700", color: "#fff", lineHeight: 1.1, marginBottom: "20px", maxWidth: "600px" }}>{s.title}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 22px)", color: "#e8c97e", marginBottom: "36px", fontStyle: "italic" }}>{s.sub}</div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={() => setPage("shop")} style={{ padding: "14px 36px", background: "#c9a84c", color: "#1a1205", border: "none", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer", letterSpacing: "2px", textTransform: "uppercase" }}>Shop Now</button>
                <button onClick={() => setPage("about")} style={{ padding: "14px 36px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "600", cursor: "pointer", letterSpacing: "1px" }}>Our Story</button>
              </div>
            </div>
          </div>
        ))}
        {/* Slide dots */}
        <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: i === currentSlide ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === currentSlide ? "#c9a84c" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ background: "#1a1205", padding: "18px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", textAlign: "center" }}>
          {[["🛡️", "Lifetime Warranty"], ["💧", "Waterproof & Tarnish-Proof"], ["🌿", "Skin-Safe & Hypoallergenic"], ["⚡", "Ships in 24 Hours"]].map(([icon, text]) => (
            <div key={text} style={{ color: "#e8c97e", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <span>{icon}</span><span style={{ letterSpacing: "0.5px" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Icons */}
      <div style={{ padding: "64px 24px 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", textAlign: "center", color: "#1a1205", marginBottom: "8px", fontWeight: "700" }}>Everyday Demi-Fine® Jewellery</h2>
        <p style={{ textAlign: "center", color: "#888", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", marginBottom: "40px" }}>Crafted to move with you, every single day.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "20px" }}>
          {CATEGORIES.map(c => (
            <div key={c.name} onClick={() => setPage("shop")} style={{ cursor: "pointer", textAlign: "center" }}>
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "120px", height: "120px", margin: "0 auto 12px", border: "3px solid #e8dcc8", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a84c"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e8dcc8"}>
                <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: "700", color: "#1a1205" }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Styles Tabs */}
      <div style={{ padding: "20px 24px 64px", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", textAlign: "center", color: "#1a1205", marginBottom: "32px", fontWeight: "700" }}>LUMORIA Top Styles</h2>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ padding: "8px 20px", background: activeTab === t ? "#1a1205" : "transparent", color: activeTab === t ? "#c9a84c" : "#3d2c0e", border: "2px solid #1a1205", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", transition: "all 0.2s" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setPage={setPage} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={() => setPage("shop")} style={{ padding: "14px 48px", background: "transparent", color: "#1a1205", border: "2px solid #1a1205", borderRadius: "4px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer", letterSpacing: "2px", textTransform: "uppercase", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#1a1205"; e.target.style.color = "#c9a84c"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#1a1205"; }}>
            View All Styles
          </button>
        </div>
      </div>

      {/* Shop by Occasion Marquee */}
      <div style={{ background: "#f7f0e4", padding: "40px 0", overflow: "hidden" }}>
        <h3 style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "4px", color: "#888", textTransform: "uppercase", marginBottom: "24px" }}>For Every You</h3>
        <div style={{ display: "flex", gap: "20px", animation: "marquee 20s linear infinite", width: "max-content" }}>
          {[...OCCASIONS, ...OCCASIONS].map((o, i) => (
            <div key={i} onClick={() => setPage("shop")} style={{ padding: "10px 28px", background: "#fff", border: "1px solid #e8dcc8", borderRadius: "40px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: "600", color: "#3d2c0e", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#3d2c0e"; }}>
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story Banner */}
      <div style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: "#c9a84c", marginBottom: "16px" }}>Because You Deserve to Shine</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 44px)", color: "#1a1205", fontWeight: "700", lineHeight: 1.2, marginBottom: "20px" }}>Jewellery Made for Your Everyday Story</h2>
          <p style={{ color: "#666", lineHeight: 1.8, fontSize: "16px", marginBottom: "28px" }}>At Lumoria, we create jewellery that moves with you. Premium in quality, thoughtful in design, and priced to feel right. Made with 18K gold plating on surgical steel and sterling silver — lasting shine without the fine jewellery price tag.</p>
          <p style={{ color: "#888", lineHeight: 1.8, fontSize: "15px", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", borderLeft: "3px solid #c9a84c", paddingLeft: "16px" }}>"Real gold is too expensive. Imitation jewellery doesn't last. We built the middle ground — Demi-Fine® jewellery that everyone can wear every day."</p>
        </div>
        <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}>
          <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80" alt="Lumoria Story" style={{ width: "100%", height: "420px", objectFit: "cover" }} />
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: "#1a1205", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", textAlign: "center", color: "#e8c97e", marginBottom: "48px", fontWeight: "700" }}>Loved by Our Community</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "28px", border: "1px solid rgba(201,168,76,0.3)" }}>
                <div style={{ color: "#f59e0b", marginBottom: "12px" }}>{"★".repeat(t.rating)}</div>
                <p style={{ color: "#e8dcc8", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1205", fontWeight: "700", fontFamily: "'Cormorant Garamond', serif" }}>{t.avatar}</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{t.name}</div>
                    <div style={{ color: "#888", fontSize: "12px" }}>{t.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs */}
      <div style={{ padding: "80px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)", textAlign: "center", color: "#1a1205", marginBottom: "48px", fontWeight: "700" }}>Style Inspiration & Jewellery Guides</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
          {BLOG_POSTS.map(b => (
            <div key={b.id} style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "none"}>
              <img src={b.img} alt={b.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", color: "#c9a84c", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>{b.category}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>{b.date}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: "#1a1205", marginBottom: "8px", lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>{b.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Badges */}
      <div style={{ background: "#faf7f0", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 2.5vw, 36px)", textAlign: "center", color: "#1a1205", marginBottom: "48px", fontWeight: "700" }}>Shop With Confidence</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}>
            {[["🛡️", "Skin Safe", "Hypoallergenic & irritation-free. Safe for all skin types."], ["✨", "18K Gold Vermeil", "Thick gold plating on premium metals. Built to last."], ["💎", "Authentic Diamonds", "SGL Certified lab-grown diamonds — ethically sourced."], ["🔄", "Easy Returns", "30-day hassle-free returns. No questions asked."]].map(([icon, title, desc]) => (
              <div key={title} style={{ padding: "24px", background: "#fff", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: "#1a1205", marginBottom: "8px" }}>{title}</div>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// SHOP PAGE
function ShopPage({ setPage, addToCart, toggleWishlist, wishlist }) {
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cats = ["ALL", "Earrings", "Necklaces", "Bracelets", "Rings", "Mangalsutra", "Mens"];
  
  let products = filter === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (sort === "low-high") products = [...products].sort((a, b) => a.price - b.price);
  else if (sort === "high-low") products = [...products].sort((a, b) => b.price - a.price);
  else if (sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 48px)", color: "#1a1205", fontWeight: "700", marginBottom: "8px" }}>Our Collection</h1>
        <p style={{ color: "#888", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px" }}>Demi-Fine® Jewellery — Made to be Worn Every Day</p>
      </div>
      
      {/* Filters Bar */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "32px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ padding: "8px 18px", background: filter === c ? "#1a1205" : "#fff", color: filter === c ? "#c9a84c" : "#3d2c0e", border: "2px solid " + (filter === c ? "#1a1205" : "#e8dcc8"), borderRadius: "24px", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px 16px", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", outline: "none", background: "#fff" }}>
          <option value="featured">Featured</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      
      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "24px" }}>
        <span style={{ fontSize: "14px", color: "#888" }}>{products.length} products</span>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setPage={setPage} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px", color: "#888" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>💎</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>No products found in this category yet.</p>
        </div>
      )}
    </div>
  );
}

// PRODUCT DETAIL PAGE
function ProductPage({ productId, setPage, addToCart, toggleWishlist, wishlist }) {
  const product = PRODUCTS.find(p => p.id === productId);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const related = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  
  if (!product) return <div style={{ padding: "80px", textAlign: "center" }}>Product not found</div>;
  
  const handleAdd = () => {
    if (product.sizes.length > 0 && !selectedSize) { alert("Please select a size"); return; }
    addToCart({ ...product, selectedSize, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  const checkPin = () => {
    if (pincode.length === 6) setPincodeMsg("✅ Delivery available in 2-4 days");
    else setPincodeMsg("❌ Enter valid 6-digit pincode");
  };
  
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", fontSize: "13px", color: "#888", fontFamily: "'Cormorant Garamond', serif" }}>
        <span onClick={() => setPage("home")} style={{ cursor: "pointer", color: "#c9a84c" }}>Home</span>
        <span>/</span>
        <span onClick={() => setPage("shop")} style={{ cursor: "pointer", color: "#c9a84c" }}>{product.category}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
        {/* Images */}
        <div>
          <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
            <img src={product.images[selectedImg]} alt={product.name} style={{ width: "100%", height: "500px", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {product.images.map((img, i) => (
              <div key={i} onClick={() => setSelectedImg(i)} style={{ width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: `3px solid ${selectedImg === i ? "#c9a84c" : "#e8dcc8"}`, transition: "border-color 0.2s" }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div>
          <div style={{ fontSize: "12px", color: "#c9a84c", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>{product.material}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: "700", color: "#1a1205", marginBottom: "12px", lineHeight: 1.2 }}>{product.name}</h1>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <span style={{ color: "#f59e0b" }}>{"★".repeat(Math.round(product.rating))}</span>
            <span style={{ color: "#888", fontSize: "14px" }}>{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "700", color: "#1a1205" }}>{formatPrice(product.price)}</span>
            <span style={{ fontSize: "18px", color: "#aaa", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
            <span style={{ background: "#c9a84c", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "700" }}>{discount(product.originalPrice, product.price)}% OFF</span>
          </div>
          
          <div style={{ background: "#faf7f0", borderRadius: "12px", padding: "16px", marginBottom: "24px", borderLeft: "4px solid #c9a84c" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#3d2c0e", lineHeight: 1.6 }}>{product.description}</p>
          </div>
          
          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#1a1205", marginBottom: "10px" }}>Select Size:</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{ width: "40px", height: "40px", borderRadius: "8px", border: `2px solid ${selectedSize === s ? "#1a1205" : "#e8dcc8"}`, background: selectedSize === s ? "#1a1205" : "#fff", color: selectedSize === s ? "#c9a84c" : "#3d2c0e", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>
          )}
          
          {/* Qty & Add */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", border: "2px solid #e8dcc8", borderRadius: "8px", overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: "40px", height: "48px", background: "#f7f0e4", border: "none", cursor: "pointer", fontSize: "18px" }}>−</button>
              <span style={{ width: "48px", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: "40px", height: "48px", background: "#f7f0e4", border: "none", cursor: "pointer", fontSize: "18px" }}>+</button>
            </div>
            <button onClick={handleAdd} style={{ flex: 1, minWidth: "200px", padding: "14px 28px", background: added ? "#2d7a4f" : "#1a1205", color: added ? "#fff" : "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", transition: "all 0.3s" }}>
              {added ? "✓ Added to Bag!" : "Add to Bag"}
            </button>
            <button onClick={() => toggleWishlist(product.id)} style={{ width: "48px", height: "48px", background: wishlist.includes(product.id) ? "#fff0f0" : "#f7f0e4", border: `2px solid ${wishlist.includes(product.id) ? "#e74c3c" : "#e8dcc8"}`, borderRadius: "8px", cursor: "pointer", fontSize: "20px" }}>
              {wishlist.includes(product.id) ? "❤️" : "🤍"}
            </button>
          </div>
          
          {/* Pincode Check */}
          <div style={{ background: "#faf7f0", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#1a1205", marginBottom: "8px" }}>📍 Check Delivery</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Enter Pincode" maxLength={6} style={{ flex: 1, padding: "8px 12px", border: "1px solid #e8dcc8", borderRadius: "6px", fontSize: "14px", outline: "none" }} />
              <button onClick={checkPin} style={{ padding: "8px 16px", background: "#c9a84c", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "700" }}>Check</button>
            </div>
            {pincodeMsg && <div style={{ marginTop: "6px", fontSize: "13px", color: pincodeMsg.includes("✅") ? "#2d7a4f" : "#e74c3c" }}>{pincodeMsg}</div>}
          </div>
          
          {/* Features */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[["💧", "Waterproof"], ["🛡️", "Tarnish-Proof"], ["🌿", "Skin-Safe"], ["✨", "18K Gold Plated"], ["🔄", "30-Day Returns"], ["🚚", "Ships in 24h"]].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#666", padding: "6px 0" }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: "80px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: "700", color: "#1a1205", marginBottom: "32px" }}>You May Also Love</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
            {related.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setPage={setPage} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// CART PAGE
function CartPage({ cart, setCart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [coupon, setCoupon] = useState("");
  const [discount2, setDiscount2] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "LUMORIA10") { setDiscount2(Math.round(total * 0.1)); setCouponMsg("✅ 10% discount applied!"); }
    else if (coupon.toUpperCase() === "WELCOME") { setDiscount2(200); setCouponMsg("✅ ₹200 off applied!"); }
    else setCouponMsg("❌ Invalid coupon code");
  };
  
  const removeItem = (id, size) => setCart(c => c.filter(i => !(i.id === id && i.selectedSize === size)));
  const updateQty = (id, size, q) => {
    if (q < 1) return;
    setCart(c => c.map(i => i.id === id && i.selectedSize === size ? { ...i, qty: q } : i));
  };
  
  if (cart.length === 0) return (
    <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
      <div style={{ fontSize: "80px", marginBottom: "24px" }}>🛍️</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#1a1205", marginBottom: "12px" }}>Your Bag is Empty</h2>
      <p style={{ color: "#888", marginBottom: "32px", fontSize: "16px" }}>Discover our beautiful jewellery collection and add your favourites!</p>
      <button onClick={() => setPage("shop")} style={{ padding: "14px 48px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px" }}>Start Shopping</button>
    </div>
  );
  
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: "700", color: "#1a1205", marginBottom: "40px" }}>Shopping Bag ({cart.reduce((s, i) => s + i.qty, 0)} items)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px" }}>
        {/* Cart Items */}
        <div>
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: "1px solid #e8dcc8", alignItems: "center" }}>
              <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "12px" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", color: "#c9a84c", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>{item.material}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: "#1a1205", marginBottom: "4px" }}>{item.name}</div>
                {item.selectedSize && <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>Size: {item.selectedSize}</div>}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #e8dcc8", borderRadius: "6px", overflow: "hidden" }}>
                    <button onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)} style={{ width: "32px", height: "32px", background: "#f7f0e4", border: "none", cursor: "pointer" }}>−</button>
                    <span style={{ width: "36px", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: "700" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)} style={{ width: "32px", height: "32px", background: "#f7f0e4", border: "none", cursor: "pointer" }}>+</button>
                  </div>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: "#1a1205" }}>{formatPrice(item.price * item.qty)}</span>
                  <button onClick={() => removeItem(item.id, item.selectedSize)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e74c3c", fontSize: "16px" }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "28px", height: "fit-content", position: "sticky", top: "100px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", color: "#1a1205", marginBottom: "24px" }}>Order Summary</h2>
          <div style={{ marginBottom: "16px" }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                <span>{item.name} × {item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #e8dcc8", paddingTop: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#666" }}>
              <span>Subtotal</span><span>{formatPrice(total)}</span>
            </div>
            {discount2 > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#2d7a4f" }}>
              <span>Coupon Discount</span><span>-{formatPrice(discount2)}</span>
            </div>}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: total - discount2 >= 1999 ? "#2d7a4f" : "#666" }}>
              <span>Shipping</span><span>{total - discount2 >= 1999 ? "FREE" : formatPrice(99)}</span>
            </div>
          </div>
          
          {/* Coupon */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: "10px 12px", border: "1px solid #e8dcc8", borderRadius: "8px", fontSize: "14px", outline: "none" }} />
              <button onClick={applyCoupon} style={{ padding: "10px 16px", background: "#c9a84c", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "700" }}>Apply</button>
            </div>
            {couponMsg && <div style={{ marginTop: "6px", fontSize: "12px", color: couponMsg.includes("✅") ? "#2d7a4f" : "#e74c3c" }}>{couponMsg}</div>}
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "700", color: "#1a1205", paddingTop: "16px", borderTop: "2px solid #e8dcc8", marginBottom: "24px" }}>
            <span>Total</span>
            <span>{formatPrice(Math.max(0, total - discount2) + (total - discount2 < 1999 ? 99 : 0))}</span>
          </div>
          
          <button onClick={() => setPage("checkout")} style={{ width: "100%", padding: "16px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", marginBottom: "12px" }}>
            Proceed to Checkout →
          </button>
          <button onClick={() => setPage("shop")} style={{ width: "100%", padding: "12px", background: "transparent", color: "#3d2c0e", border: "2px solid #e8dcc8", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", cursor: "pointer" }}>Continue Shopping</button>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
            {["💳", "📱", "🏦", "💰"].map((icon, i) => (
              <span key={i} style={{ fontSize: "20px" }}>{icon}</span>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "8px" }}>Visa • Mastercard • UPI • NetBanking • COD</div>
        </div>
      </div>
    </div>
  );
}

// CHECKOUT PAGE
function CheckoutPage({ cart, setCart, setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", payMethod: "upi" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState("LUM" + Math.floor(100000 + Math.random() * 900000));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = total >= 1999 ? 0 : 99;
  
  const handleChange = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid1 = form.name && form.email && form.phone;
  const valid2 = form.address && form.city && form.state && form.pincode;
  
  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
  };
  
  if (orderPlaced) return (
    <div style={{ maxWidth: "600px", margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
      <div style={{ width: "100px", height: "100px", background: "#2d7a4f", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", margin: "0 auto 32px", animation: "popIn 0.5s ease" }}>✓</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "#1a1205", marginBottom: "12px" }}>Order Placed!</h1>
      <p style={{ color: "#2d7a4f", fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>Order ID: {orderId}</p>
      <p style={{ color: "#666", marginBottom: "8px", fontSize: "16px" }}>A confirmation has been sent to <strong>{form.email}</strong></p>
      <p style={{ color: "#888", marginBottom: "40px", fontSize: "15px" }}>Your Lumoria jewellery will be delivered in 2-4 business days ✨</p>
      <button onClick={() => setPage("home")} style={{ padding: "14px 48px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Back to Home</button>
    </div>
  );
  
  const inputStyle = { width: "100%", padding: "12px 14px", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "700", color: "#3d2c0e", marginBottom: "6px", letterSpacing: "0.5px" };
  
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: "700", color: "#1a1205", marginBottom: "32px" }}>Checkout</h1>
      
      {/* Steps */}
      <div style={{ display: "flex", gap: "0", marginBottom: "40px" }}>
        {["Contact", "Address", "Payment", "Review"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={() => step > i + 1 && setStep(i + 1)}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: step > i ? "#c9a84c" : step === i + 1 ? "#1a1205" : "#e8dcc8", color: step > i ? "#fff" : step === i + 1 ? "#c9a84c" : "#aaa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", marginBottom: "6px" }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <div style={{ fontSize: "11px", color: step === i + 1 ? "#1a1205" : "#aaa", fontWeight: step === i + 1 ? "700" : "400", letterSpacing: "0.5px" }}>{s}</div>
            </div>
            {i < 3 && <div style={{ flex: 1, height: "2px", background: step > i + 1 ? "#c9a84c" : "#e8dcc8", margin: "0 8px", marginBottom: "20px" }} />}
          </div>
        ))}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px" }}>
        <div>
          {step === 1 && (
            <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Contact Information</h2>
              <div style={{ display: "grid", gap: "16px" }}>
                <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={handleChange("name")} placeholder="Your full name" style={inputStyle} /></div>
                <div><label style={labelStyle}>Email Address *</label><input value={form.email} onChange={handleChange("email")} type="email" placeholder="you@email.com" style={inputStyle} /></div>
                <div><label style={labelStyle}>Phone Number *</label><input value={form.phone} onChange={handleChange("phone")} type="tel" placeholder="+91 XXXXX XXXXX" style={inputStyle} /></div>
              </div>
              <button disabled={!valid1} onClick={() => setStep(2)} style={{ marginTop: "24px", padding: "14px 40px", background: valid1 ? "#1a1205" : "#ccc", color: valid1 ? "#c9a84c" : "#fff", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: valid1 ? "pointer" : "not-allowed", letterSpacing: "1px" }}>Continue to Address →</button>
            </div>
          )}
          {step === 2 && (
            <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Delivery Address</h2>
              <div style={{ display: "grid", gap: "16px" }}>
                <div><label style={labelStyle}>Street Address *</label><input value={form.address} onChange={handleChange("address")} placeholder="House/Flat No., Street, Area" style={inputStyle} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div><label style={labelStyle}>City *</label><input value={form.city} onChange={handleChange("city")} placeholder="City" style={inputStyle} /></div>
                  <div><label style={labelStyle}>State *</label><input value={form.state} onChange={handleChange("state")} placeholder="State" style={inputStyle} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div><label style={labelStyle}>Pincode *</label><input value={form.pincode} onChange={handleChange("pincode")} placeholder="6-digit pincode" maxLength={6} style={inputStyle} /></div>
                  <div><label style={labelStyle}>Country</label><input value="India" disabled style={{ ...inputStyle, background: "#f0e8d5", color: "#888" }} /></div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button onClick={() => setStep(1)} style={{ padding: "12px 24px", background: "transparent", color: "#3d2c0e", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", cursor: "pointer" }}>← Back</button>
                <button disabled={!valid2} onClick={() => setStep(3)} style={{ padding: "14px 40px", background: valid2 ? "#1a1205" : "#ccc", color: valid2 ? "#c9a84c" : "#fff", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: valid2 ? "pointer" : "not-allowed", letterSpacing: "1px" }}>Continue to Payment →</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Payment Method</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {[["upi", "📱", "UPI / GPay / PhonePe / Paytm"], ["card", "💳", "Credit / Debit Card"], ["netbanking", "🏦", "Net Banking"], ["cod", "💰", "Cash on Delivery"], ["emi", "📅", "EMI (0% for 3 months)"]].map(([val, icon, label]) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px", background: form.payMethod === val ? "#1a1205" : "#fff", border: `2px solid ${form.payMethod === val ? "#c9a84c" : "#e8dcc8"}`, borderRadius: "12px", cursor: "pointer", transition: "all 0.2s" }}>
                    <input type="radio" value={val} checked={form.payMethod === val} onChange={handleChange("payMethod")} style={{ accentColor: "#c9a84c" }} />
                    <span style={{ fontSize: "20px" }}>{icon}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "600", color: form.payMethod === val ? "#c9a84c" : "#3d2c0e" }}>{label}</span>
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button onClick={() => setStep(2)} style={{ padding: "12px 24px", background: "transparent", color: "#3d2c0e", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", cursor: "pointer" }}>← Back</button>
                <button onClick={() => setStep(4)} style={{ padding: "14px 40px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Review Order →</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Review Your Order</h2>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", marginBottom: "12px" }}>Delivering to:</h3>
                <p style={{ color: "#666", lineHeight: 1.8 }}>{form.name}<br />{form.address}, {form.city}, {form.state} - {form.pincode}<br />📞 {form.phone} | ✉️ {form.email}</p>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", marginBottom: "12px" }}>Items:</h3>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
                    <img src={item.image} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px" }} alt="" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: "700" }}>{item.name}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>Qty: {item.qty} | {formatPrice(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => setStep(3)} style={{ padding: "12px 24px", background: "transparent", color: "#3d2c0e", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", cursor: "pointer" }}>← Back</button>
                <button onClick={placeOrder} style={{ flex: 1, padding: "16px 40px", background: "#c9a84c", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px" }}>
                  🔒 Place Order — {formatPrice(total + shipping)}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary Sidebar */}
        <div style={{ background: "#faf7f0", borderRadius: "20px", padding: "24px", height: "fit-content", position: "sticky", top: "90px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Order Summary</h3>
          {cart.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <img src={item.image} style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "8px" }} alt="" />
                <span style={{ position: "absolute", top: -6, right: -6, background: "#c9a84c", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>{item.qty}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", fontSize: "14px" }}>{item.name}</div>
                <div style={{ fontSize: "13px", color: "#c9a84c", fontWeight: "700" }}>{formatPrice(item.price)}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e8dcc8", marginTop: "16px", paddingTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#666" }}><span>Subtotal</span><span>{formatPrice(total)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: shipping === 0 ? "#2d7a4f" : "#666" }}><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "700", color: "#1a1205", paddingTop: "12px", borderTop: "1px solid #e8dcc8" }}><span>Total</span><span>{formatPrice(total + shipping)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// WISHLIST PAGE
function WishlistPage({ wishlist, toggleWishlist, addToCart, setPage }) {
  const products = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: "700", color: "#1a1205", marginBottom: "8px" }}>My Wishlist</h1>
      <p style={{ color: "#888", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "18px", marginBottom: "40px" }}>{products.length} items saved</p>
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px" }}>
          <div style={{ fontSize: "80px", marginBottom: "24px" }}>🤍</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#1a1205", marginBottom: "16px" }}>Your wishlist is empty</h2>
          <button onClick={() => setPage("shop")} style={{ padding: "14px 40px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer" }}>Explore Collection</button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
          {products.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} setPage={setPage} />)}
        </div>
      )}
    </div>
  );
}

// ABOUT PAGE
function AboutPage({ setPage }) {
  return (
    <div>
      <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1400&q=80" alt="About Lumoria" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,12,4,0.75) 0%, rgba(20,12,4,0.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "5px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "16px" }}>The Lumoria Story</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 64px)", color: "#fff", fontWeight: "700", lineHeight: 1.1, maxWidth: "600px" }}>Jewellery That Moves With You</h1>
        </div>
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", marginBottom: "80px" }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: "700", color: "#1a1205", marginBottom: "20px" }}>Our Mission</h2>
            <p style={{ color: "#666", lineHeight: 1.9, fontSize: "16px", marginBottom: "20px" }}>Lumoria was born from a simple belief: beautiful jewellery shouldn't sit locked in a box. It should be part of your everyday — from morning coffee to late-night celebrations.</p>
            <p style={{ color: "#666", lineHeight: 1.9, fontSize: "16px" }}>We create Demi-Fine® jewellery that bridges the gap between expensive fine jewellery and disposable fashion pieces — using 18K gold plating on surgical steel and sterling silver for pieces that truly last.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80" alt="Mission" style={{ borderRadius: "20px", width: "100%", height: "360px", objectFit: "cover", boxShadow: "0 24px 60px rgba(0,0,0,0.12)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginBottom: "80px" }}>
          {[["8L+", "Happy Customers"], ["500+", "Unique Designs"], ["4.8★", "Average Rating"], ["24h", "Ships in 24 Hours"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center", padding: "32px 20px", background: "#faf7f0", borderRadius: "16px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "44px", fontWeight: "700", color: "#c9a84c", marginBottom: "8px" }}>{num}</div>
              <div style={{ fontSize: "14px", color: "#666", letterSpacing: "1px" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("shop")} style={{ padding: "16px 60px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", cursor: "pointer", letterSpacing: "2px" }}>Explore Our Collection</button>
        </div>
      </div>
    </div>
  );
}

// ACCOUNT PAGE
function AccountPage({ setPage }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const h = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputStyle = { width: "100%", padding: "13px 14px", border: "2px solid #e8dcc8", borderRadius: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "14px" };
  if (loggedIn) return (
    <div style={{ maxWidth: "600px", margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ width: "80px", height: "80px", background: "#c9a84c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 24px" }}>👑</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#1a1205", marginBottom: "8px" }}>Welcome back, {form.name || "Jewel Lover"}!</h2>
      <p style={{ color: "#888", marginBottom: "32px" }}>Your Lumoria account is active.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {[["📦", "My Orders", "shop"], ["🤍", "Wishlist", "wishlist"], ["📍", "Addresses", "account"], ["🎁", "Gift Cards", "shop"]].map(([icon, label, pg]) => (
          <div key={label} onClick={() => setPage(pg)} style={{ padding: "20px", background: "#faf7f0", borderRadius: "12px", cursor: "pointer", border: "2px solid #e8dcc8", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a84c"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e8dcc8"}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700" }}>{label}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setLoggedIn(false)} style={{ padding: "10px 28px", background: "transparent", color: "#e74c3c", border: "2px solid #e74c3c", borderRadius: "8px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif" }}>Sign Out</button>
    </div>
  );
  return (
    <div style={{ maxWidth: "460px", margin: "60px auto", padding: "0 24px" }}>
      <div style={{ background: "#faf7f0", borderRadius: "24px", padding: "40px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700", color: "#1a1205", letterSpacing: "2px" }}>LUMORIA</div>
          <div style={{ color: "#888", fontSize: "14px", marginTop: "4px" }}>Sign in to your account</div>
        </div>
        <div style={{ display: "flex", background: "#e8dcc8", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: "8px", background: tab === t ? "#fff" : "transparent", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: "700", cursor: "pointer", color: tab === t ? "#1a1205" : "#888", transition: "all 0.2s", textTransform: "capitalize" }}>{t === "login" ? "Sign In" : "Create Account"}</button>
          ))}
        </div>
        {tab === "register" && <input value={form.name} onChange={h("name")} placeholder="Full Name" style={inputStyle} />}
        <input value={form.email} onChange={h("email")} type="email" placeholder="Email Address" style={inputStyle} />
        <input value={form.password} onChange={h("password")} type="password" placeholder="Password" style={inputStyle} />
        <button onClick={() => setLoggedIn(true)} style={{ width: "100%", padding: "14px", background: "#1a1205", color: "#c9a84c", border: "none", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", marginBottom: "12px" }}>
          {tab === "login" ? "Sign In →" : "Create Account →"}
        </button>
        {tab === "login" && <div style={{ textAlign: "center", fontSize: "13px", color: "#c9a84c", cursor: "pointer" }}>Forgot password?</div>}
      </div>
    </div>
  );
}

// FOOTER
function Footer({ setPage }) {
  const [email, setEmail] = useState("");
  return (
    <footer style={{ background: "#100c03", color: "#e8dcc8", marginTop: "40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "700", color: "#e8c97e", letterSpacing: "3px", marginBottom: "6px" }}>LUMORIA</div>
            <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "16px" }}>Demi-Fine Jewellery</div>
            <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, marginBottom: "24px" }}>Jewellery made for your everyday story. Premium quality, thoughtful design, honest pricing.</p>
            <div style={{ marginBottom: "16px", fontSize: "13px", color: "#888" }}>Subscribe for exclusive offers:</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, padding: "10px 12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }} />
              <button style={{ padding: "10px 16px", background: "#c9a84c", color: "#1a1205", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "700", fontSize: "13px" }}>Subscribe</button>
            </div>
          </div>
          
          {[["Shop", [["Earrings", "shop"], ["Necklaces", "shop"], ["Bracelets", "shop"], ["Rings", "shop"], ["Mangalsutra", "shop"], ["Men's Collection", "shop"]]],
            ["Help", [["Track Order", "account"], ["Returns & Exchange", "about"], ["FAQs", "about"], ["Contact Us", "about"], ["Store Locator", "about"]]],
            ["Company", [["About Us", "about"], ["Blog", "about"], ["Careers", "about"], ["Press", "about"], ["Sustainability", "about"]]]
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: "700", color: "#e8c97e", marginBottom: "16px", letterSpacing: "1px" }}>{title}</div>
              {links.map(([label, pg]) => (
                <div key={label} onClick={() => setPage(pg)} style={{ fontSize: "13px", color: "#888", marginBottom: "10px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#c9a84c"} onMouseLeave={e => e.target.style.color = "#888"}>{label}</div>
              ))}
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontSize: "13px", color: "#666" }}>© 2026 Lumoria Jewellery. All Rights Reserved.</div>
          <div style={{ display: "flex", gap: "16px" }}>
            {["📘", "📸", "▶️", "💼"].map((icon, i) => (
              <span key={i} style={{ fontSize: "20px", cursor: "pointer", opacity: 0.7, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.7}>{icon}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Visa", "Mastercard", "UPI", "GPay", "COD"].map(p => (
              <span key={p} style={{ fontSize: "11px", color: "#666", background: "rgba(255,255,255,0.06)", padding: "4px 8px", borderRadius: "4px" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Toast
function Toast({ msg }) {
  return msg ? (
    <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#1a1205", color: "#c9a84c", padding: "14px 28px", borderRadius: "40px", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "700", zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", animation: "slideUp 0.3s ease" }}>
      ✓ {msg}
    </div>
  ) : null;
}

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };
  
  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id && i.selectedSize === product.selectedSize);
      if (existing) return c.map(i => i.id === product.id && i.selectedSize === product.selectedSize ? { ...i, qty: i.qty + (product.qty || 1) } : i);
      return [...c, { ...product, qty: product.qty || 1 }];
    });
    showToast(`${product.name} added to bag!`);
  };
  
  const toggleWishlist = (id) => {
    setWishlist(w => {
      if (w.includes(id)) { showToast("Removed from wishlist"); return w.filter(i => i !== id); }
      showToast("Added to wishlist ❤️"); return [...w, id];
    });
  };
  
  const handleSetPage = (pg) => {
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenu(false);
  };
  
  const renderPage = () => {
    if (page.startsWith("product-")) {
      const id = parseInt(page.split("-")[1]);
      return <ProductPage productId={id} setPage={handleSetPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />;
    }
    switch (page) {
      case "home": return <HomePage setPage={handleSetPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />;
      case "shop": return <ShopPage setPage={handleSetPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />;
      case "cart": return <CartPage cart={cart} setCart={setCart} setPage={handleSetPage} />;
      case "checkout": return <CheckoutPage cart={cart} setCart={setCart} setPage={handleSetPage} />;
      case "wishlist": return <WishlistPage wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} setPage={handleSetPage} />;
      case "about": return <AboutPage setPage={handleSetPage} />;
      case "account": return <AccountPage setPage={handleSetPage} />;
      default: return <HomePage setPage={handleSetPage} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />;
    }
  };
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fffcf5; font-family: system-ui, sans-serif; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0); } 60% { transform: scale(1.2); } 100% { transform: scale(1); } }
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          [style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 380px"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 1fr 360px"] { grid-template-columns: 1fr !important; }
          [style*="gridTemplateColumns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
        input:focus { border-color: #c9a84c !important; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f7f0e4; } ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
      `}</style>
      <AnnouncementBar />
      <Header page={page} setPage={handleSetPage} cart={cart} wishlist={wishlist} searchOpen={searchOpen} setSearchOpen={setSearchOpen} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <main style={{ minHeight: "60vh" }}>{renderPage()}</main>
      <Footer setPage={handleSetPage} />
      <Toast msg={toast} />
    </>
  );
}
