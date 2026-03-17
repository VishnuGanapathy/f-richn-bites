// ─── Centralized Data Store ─────────────────────────────────────
// All product, category, hamper, and config data lives here.
// Every component imports from this single file.

export interface Product {
  id: number;
  name: string;
  type: string;        // 'Bar' | 'Popsicle' | 'Bites'
  category: string;    // 'Bars' | 'Popsicle' | 'Bites' | 'Hampers'
  price: number;
  basePrice: number;
  stock: number;
  status: string;
  image: string;
  description: string;
}

export interface GiftHamper {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag: string;
}

export interface Category {
  title: string;
  image: string;
  link: string;
  color: string;
}

export interface ProductTypeOption {
  id: string;
  name: string;
  price: number;
  img: string;
}

export interface ChocolateBase {
  id: string;
  name: string;
  desc: string;
}

export interface WeightOption {
  id: string;
  label: string;
}

// ─── Image Map ──────────────────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string> = {
  Bars: '/images/hero_chocolate_bars_highq.png',
  Popsicle: '/images/chocolate_pops.png',
  Bites: '/images/chocolate_bites.png',
  Hampers: '/images/richnbites_chocolate_bars.png',
};

// ─── Products ───────────────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  { id: 1, name: 'Signature Dark Bar',     type: 'Bar',      category: 'Bars',     price: 499, basePrice: 499, stock: 120, status: 'Active',       image: '/images/hero_chocolate_bars_highq.png', description: 'Our classic single-origin dark chocolate bar.' },
  { id: 2, name: 'White Couverture Pop',   type: 'Popsicle', category: 'Popsicle', price: 349, basePrice: 349, stock: 85,  status: 'Active',       image: '/images/chocolate_pops.png',            description: 'Creamy white chocolate popsicle.' },
  { id: 3, name: 'Hazelnut & Almond Bites',type: 'Bites',    category: 'Bites',    price: 799, basePrice: 799, stock: 200, status: 'Active',       image: '/images/chocolate_bites.png',           description: 'Crunchy hazelnut and almond bite-sized treats.' },
  { id: 4, name: 'Sugar-Free Classic',     type: 'Bar',      category: 'Bars',     price: 549, basePrice: 549, stock: 45,  status: 'Low Stock',    image: '/images/hero_chocolate_bars_highq.png', description: 'All the flavor, zero sugar.' },
  { id: 5, name: 'Caramel Macchiato Bite', type: 'Bites',    category: 'Bites',    price: 849, basePrice: 849, stock: 0,   status: 'Out of Stock', image: '/images/chocolate_bites.png',           description: 'Coffee-infused caramel bites.' },
  { id: 6, name: 'Fruit & Nut Luxury Pop', type: 'Popsicle', category: 'Popsicle', price: 399, basePrice: 399, stock: 60,  status: 'Active',       image: '/images/chocolate_pops.png',            description: 'Fruity pop with premium nuts.' },
];

// ─── Featured (subset shown on homepage) ────────────────────────
export const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 3);

// ─── Categories ─────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { title: 'Signature Bars', image: '/images/hero_chocolate_bars.png', link: '/#bars',  color: 'bg-[#fcf9f5]' },
  { title: 'Luxury Pops',    image: '/images/chocolate_pops.png',      link: '/#pops',  color: 'bg-[#f7f0e6]' },
  { title: 'Premium Bites',  image: '/images/chocolate_bites.png',     link: '/#bites', color: 'bg-[#f4efe8]' },
];

// ─── Gift Hampers ───────────────────────────────────────────────
export const GIFT_HAMPERS: GiftHamper[] = [
  { id: 1, name: 'The Golden Opulence Box',     desc: 'A curated selection of 12 signature artisan bars and 8 premium bites.', price: 2999, img: '/images/hero_chocolate_bars_highq.png', tag: 'Bestseller' },
  { id: 2, name: 'Midnight Truffle Collection',  desc: '16 exquisite dark chocolate bites dusted with raw cocoa.',              price: 1899, img: '/images/chocolate_bites.png',           tag: 'Dark Choco' },
  { id: 3, name: 'Petite Luxury Hamper',         desc: 'Perfect for gifting. Includes 2 bars, 3 pops, and a handwritten note.',price: 1499, img: '/images/chocolate_pops.png',            tag: 'Gift' },
];

// ─── Product Customization Config ───────────────────────────────
export const PRODUCT_TYPES: ProductTypeOption[] = [
  { id: 'bar',   name: 'Signature Bar',  price: 499, img: '/images/hero_chocolate_bars_highq.png' },
  { id: 'pops',  name: 'Luxury Pop',     price: 349, img: '/images/chocolate_pops.png' },
  { id: 'bites', name: 'Premium Bites',  price: 799, img: '/images/chocolate_bites.png' },
];

export const CHOCOLATE_BASES: ChocolateBase[] = [
  { id: 'Dark 70%',   name: 'Dark Chocolate (70% Cocoa)', desc: 'Intense and rich profile' },
  { id: 'Milk',       name: 'Classic Milk Chocolate',      desc: 'Smooth and creamy texture' },
  { id: 'White',      name: 'White Couverture',            desc: 'Sweet, rich vanilla notes' },
  { id: 'Sugar-Free', name: 'Sugar-Free Dark',             desc: 'Guilt-free indulgence' },
];

export const WEIGHT_OPTIONS: WeightOption[] = [
  { id: '100g', label: '100g (Standard)' },
  { id: '250g', label: '250g (Premium)' },
  { id: '500g', label: '500g (Gifting)' },
];

export const TOPPING_LIST: string[] = [
  'Almonds', 'Hazelnuts', 'Cashews', 'Walnuts', 'Pistachios',
  'Pumpkin Seeds', 'Cranberries', 'Raisins', 'Sea Salt', 'Gold Flakes',
];

export const CUSTOMIZATION_STEPS = [
  'Product Type', 'Chocolate Base', 'Weight', 'Toppings', 'Review',
];

// ─── Admin Dashboard Static Data ────────────────────────────────
export const REVENUE_DATA = [
  { name: 'Mon', current: 12000, previous: 8400 },
  { name: 'Tue', current: 18000, previous: 13980 },
  { name: 'Wed', current: 15000, previous: 9800 },
  { name: 'Thu', current: 27800, previous: 19080 },
  { name: 'Fri', current: 32890, previous: 24800 },
  { name: 'Sat', current: 42390, previous: 33800 },
  { name: 'Sun', current: 38490, previous: 34300 },
];

export const CATEGORY_SALES = [
  { name: 'Signature Bars', sales: 450000 },
  { name: 'Luxury Pops',    sales: 320000 },
  { name: 'Premium Bites',  sales: 280000 },
  { name: 'Hampers',        sales: 150000 },
];
