/* Gifting mock data for Lumoria */

export const GIFTING_CATEGORIES = [
  'Gifts For Her',
  'Gifts For Him',
  'Gift Card',
  'Corporate Gifting',
  "Mother's Special",
];

// Re-using existing Unsplash images found in the repo's product data
const IMAGES = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
  'https://images.unsplash.com/photo-1635767798638-3665a0a107fc?w=800&q=80',
  'https://images.unsplash.com/photo-1573408301185-9519f94a5d3a?w=800&q=80',
  'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
  'https://images.unsplash.com/photo-1611107683227-e9060eccd846?w=800&q=80',
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
];

let id = 100;
const makeProduct = ({ name, price, tags = [], categories = [], imgIndex = 0 }) => ({
  id: id++,
  name,
  price,
  categories,
  image: IMAGES[imgIndex % IMAGES.length],
  tags,
});

export const GIFTING_PRODUCTS = [
  // Gifts For Her (8)
  makeProduct({ name: 'Nova Diamond Pendant', price: 850, categories: ['Gifts For Her'], imgIndex: 0 }),
  makeProduct({ name: 'Stardust Hoop Earrings', price: 420, categories: ['Gifts For Her'], imgIndex: 1 }),
  makeProduct({ name: 'Aurora Solitaire Ring', price: 1200, categories: ['Gifts For Her'], imgIndex: 2 }),
  makeProduct({ name: 'Solstice Chain Bracelet', price: 380, categories: ['Gifts For Her'], imgIndex: 3 }),
  makeProduct({ name: 'Lyra Twisted Ring', price: 620, categories: ['Gifts For Her'], imgIndex: 4 }),
  makeProduct({ name: 'Celestial Halo Bracelet', price: 540, categories: ['Gifts For Her'], imgIndex: 5 }),
  makeProduct({ name: 'Moonrise Pendant', price: 470, categories: ['Gifts For Her'], imgIndex: 6 }),
  makeProduct({ name: 'Whisper Stud Earrings', price: 220, categories: ['Gifts For Her'], imgIndex: 7 }),

  // Gifts For Him (8)
  makeProduct({ name: "Orbit Men's Chain", price: 760, categories: ['Gifts For Him'], imgIndex: 5 }),
  makeProduct({ name: "Regent Men's Bracelet", price: 540, categories: ['Gifts For Him'], imgIndex: 4 }),
  makeProduct({ name: "Crown Link Chain", price: 980, categories: ['Gifts For Him'], imgIndex: 0 }),
  makeProduct({ name: "Harrow Signet Ring", price: 630, categories: ['Gifts For Him'], imgIndex: 2 }),
  makeProduct({ name: "Atlas Curb Bracelet", price: 410, categories: ['Gifts For Him'], imgIndex: 1 }),
  makeProduct({ name: "Alder Men's Pendant", price: 350, categories: ['Gifts For Him'], imgIndex: 3 }),
  makeProduct({ name: "Harbor Chain", price: 290, categories: ['Gifts For Him'], imgIndex: 6 }),
  makeProduct({ name: "Tide Rope Chain", price: 520, categories: ['Gifts For Him'], imgIndex: 7 }),

  // Gift Card (8)
  makeProduct({ name: '£50 Gift Card', price: 50, categories: ['Gift Card'], imgIndex: 2 }),
  makeProduct({ name: '£100 Gift Card', price: 100, categories: ['Gift Card'], imgIndex: 3 }),
  makeProduct({ name: '£250 Gift Card', price: 250, categories: ['Gift Card'], imgIndex: 0 }),
  makeProduct({ name: '£500 Gift Card', price: 500, categories: ['Gift Card'], imgIndex: 1 }),
  makeProduct({ name: 'Personalised Message Add-on', price: 12, categories: ['Gift Card'], imgIndex: 4 }),
  makeProduct({ name: 'Premium E-Giftbox', price: 18, categories: ['Gift Card'], imgIndex: 5 }),
  makeProduct({ name: 'Express Delivery Option', price: 25, categories: ['Gift Card'], imgIndex: 6 }),
  makeProduct({ name: 'Curator Selection Voucher', price: 350, categories: ['Gift Card'], imgIndex: 7 }),

  // Corporate Gifting (8)
  makeProduct({ name: 'Executive Gift Set', price: 750, categories: ['Corporate Gifting'], imgIndex: 3 }),
  makeProduct({ name: 'Luxury Desk Set', price: 420, categories: ['Corporate Gifting'], imgIndex: 4 }),
  makeProduct({ name: 'Signature Gold Card', price: 180, categories: ['Corporate Gifting'], imgIndex: 0 }),
  makeProduct({ name: 'Premium Gift Box - 3 pcs', price: 1299, categories: ['Corporate Gifting'], imgIndex: 1 }),
  makeProduct({ name: 'Client Appreciation Hamper', price: 640, categories: ['Corporate Gifting'], imgIndex: 2 }),
  makeProduct({ name: 'Office Gifting Collection', price: 980, categories: ['Corporate Gifting'], imgIndex: 5 }),
  makeProduct({ name: 'Branded Keepsake', price: 210, categories: ['Corporate Gifting'], imgIndex: 6 }),
  makeProduct({ name: 'Corporate E-Gift Voucher', price: 500, categories: ['Corporate Gifting'], imgIndex: 7 }),

  // Mother's Special (8)
  makeProduct({ name: "Mother's Day Rose Necklace", price: 430, categories: ["Mother's Special"], imgIndex: 0 }),
  makeProduct({ name: 'Heirloom Locket', price: 920, categories: ["Mother's Special"], imgIndex: 1 }),
  makeProduct({ name: 'Personalized Name Bracelet', price: 260, categories: ["Mother's Special"], imgIndex: 2 }),
  makeProduct({ name: 'Memory Gem Ring', price: 720, categories: ["Mother's Special"], imgIndex: 3 }),
  makeProduct({ name: 'Luxe Keepsake Box', price: 140, categories: ["Mother's Special"], imgIndex: 4 }),
  makeProduct({ name: 'Mother & Daughter Set', price: 1250, categories: ["Mother's Special"], imgIndex: 5 }),
  makeProduct({ name: 'Bloom Pearl Earrings', price: 360, categories: ["Mother's Special"], imgIndex: 6 }),
  makeProduct({ name: 'Signature Thank You Card', price: 8, categories: ["Mother's Special"], imgIndex: 7 }),
];

export default GIFTING_PRODUCTS;
