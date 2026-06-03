# LUMORIA - Demi-Fine Jewellery Website

A full-featured jewellery e-commerce website built with React + TypeScript, inspired by Palmonas.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at **http://localhost:3000**

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimised build will be in the `/build` folder.

---

## ✨ Features

### Pages
- **Home** — Hero slider, category grid, tabbed product section, occasion marquee, brand story, testimonials, blogs, trust badges
- **Shop** — Category filters, sort by price/rating, product grid
- **Product Detail** — Image gallery, size selector, qty, pincode delivery check, related products
- **Cart** — Item management, coupon codes, order summary, free shipping logic
- **Checkout** — 4-step flow (Contact → Address → Payment → Review → Order Confirmed)
- **Wishlist** — Saved items
- **Account** — Login / Register / Dashboard
- **About** — Brand story, stats

### Functional
- 🛒 Cart with quantity update & remove
- ❤️ Wishlist toggle with badge count
- 🔍 Live search with dropdown results
- 📍 Pincode delivery check
- 🎟️ Coupon codes: `LUMORIA10` (10% off), `WELCOME` (₹200 off)
- 💳 5 payment methods (UPI, Card, NetBanking, COD, EMI)
- ✅ Order success screen with Order ID
- 📱 Fully mobile responsive
- 🎨 Animated hero slider, marquee, hover effects, toast notifications

---

## 🎨 Brand Design

- **Brand**: LUMORIA
- **Typography**: Cormorant Garamond (serif)
- **Colors**: Deep Brown `#1a1205`, Gold `#c9a84c`, Ivory `#fffcf5`
- **Style**: Luxury, refined, Demi-Fine aesthetic

---

## 📁 Project Structure

```
lumoria-jewellery/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx        ← Main app (all pages & components)
│   ├── index.js       ← Entry point
│   └── index.css      ← Global styles
├── package.json
└── README.md
```

---

## 🛠️ Customisation

All product data, categories, testimonials, and blog posts are in `src/App.jsx` at the top — easy to edit:

- `PRODUCTS` array — add/edit products
- `CATEGORIES` array — update category icons/images
- `TESTIMONIALS` array — update reviews
- `BLOG_POSTS` array — update blog content

---

Made with ❤️ using React
