/** Placeholder product data — tops-only UV/sun protection activewear */

export interface PlaceholderProduct {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors: string[];
  image: string;
}

export const placeholderProducts: PlaceholderProduct[] = [
  {
    id: "1",
    name: "Soleil UPF 50+ Crop Top",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 78,
    badge: "New",
    colors: ["#ccb04a", "#141413", "#f5f0e0"],
    image: "/placeholders/product-crop-top.jpg",
  },
  {
    id: "2",
    name: "Golden Hour Long Sleeve",
    category: "Active",
    subCategory: "Beach Volleyball",
    price: 98,
    badge: "Bestseller",
    colors: ["#f5f0e0", "#141413", "#8a9a7a"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "3",
    name: "Dusk Ribbed Tank",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 58,
    colors: ["#e8e0d0", "#4a4a44", "#ccb04a"],
    image: "/placeholders/product-tank.jpg",
  },
  {
    id: "4",
    name: "Sunrise Zip-Through Jacket",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 118,
    originalPrice: 148,
    badge: "Sale",
    colors: ["#ccb04a", "#141413"],
    image: "/placeholders/product-jacket.jpg",
  },
  {
    id: "5",
    name: "Horizon Wrap Top",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 72,
    colors: ["#f5f4ed", "#2d2d2d"],
    image: "/placeholders/product-wrap.jpg",
  },
  {
    id: "6",
    name: "Tide Rash Guard",
    category: "Active",
    subCategory: "Beach Volleyball",
    price: 108,
    badge: "New",
    colors: ["#141413", "#8a9a7a", "#ccb04a"],
    image: "/placeholders/product-rashguard.jpg",
  },
  {
    id: "7",
    name: "Cove Halter Top",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 64,
    colors: ["#b08870", "#2d2d2d", "#e8e0d0"],
    image: "/placeholders/product-halter.jpg",
  },
  {
    id: "8",
    name: "Reef Hoodie UPF 50+",
    category: "Active",
    subCategory: "Running",
    price: 128,
    badge: "Bestseller",
    colors: ["#ccb04a", "#141413", "#f5f4ed"],
    image: "/placeholders/product-hoodie.jpg",
  },
  {
    id: "9",
    name: "Stride Performance Tee",
    category: "Active",
    subCategory: "Running",
    price: 68,
    badge: "New",
    colors: ["#f5f0e0", "#141413", "#8a9a7a"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "10",
    name: "Pace Setter Long Sleeve",
    category: "Active",
    subCategory: "Running",
    price: 88,
    colors: ["#e8e0d0", "#4a4a44", "#ccb04a"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "11",
    name: "Ace Polo UV Top",
    category: "Active",
    subCategory: "Racket Sports",
    price: 84,
    colors: ["#ccb04a", "#141413"],
    image: "/placeholders/product-rashguard.jpg",
  },
  {
    id: "12",
    name: "Court Side Tank",
    category: "Active",
    subCategory: "Racket Sports",
    price: 62,
    badge: "New",
    colors: ["#b08870", "#2d2d2d", "#e8e0d0"],
    image: "/placeholders/product-tank.jpg",
  },
  {
    id: "13",
    name: "Peloton Zip Jersey",
    category: "Active",
    subCategory: "Cycling",
    price: 112,
    badge: "New",
    colors: ["#141413", "#8a9a7a", "#ccb04a"],
    image: "/placeholders/product-rashguard.jpg",
  },
  {
    id: "14",
    name: "Summit Base Layer",
    category: "Active",
    subCategory: "Cycling",
    price: 76,
    colors: ["#f5f4ed", "#2d2d2d"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "15",
    name: "Canter Show Shirt",
    category: "Active",
    subCategory: "Equestrian",
    price: 134,
    colors: ["#f5f0e0", "#141413", "#8a9a7a"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "16",
    name: "Gallop Half-Zip",
    category: "Active",
    subCategory: "Equestrian",
    price: 118,
    badge: "Bestseller",
    colors: ["#e8e0d0", "#4a4a44", "#ccb04a"],
    image: "/placeholders/product-hoodie.jpg",
  },
  {
    id: "17",
    name: "UV Shield Visor",
    category: "Active",
    subCategory: "Accessories",
    price: 42,
    colors: ["#141413", "#ccb04a"],
    image: "/placeholders/product-hoodie.jpg",
  },
  {
    id: "18",
    name: "Sport Cooling Towel",
    category: "Active",
    subCategory: "Accessories",
    price: 28,
    badge: "New",
    colors: ["#8a9a7a", "#f5f0e0"],
    image: "/placeholders/product-wrap.jpg",
  },
  {
    id: "19",
    name: "Lounge Ribbed Tee",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 56,
    colors: ["#e8e0d0", "#4a4a44", "#ccb04a"],
    image: "/placeholders/product-tank.jpg",
  },
  {
    id: "20",
    name: "Breeze Relaxed Shirt",
    category: "Leisure",
    subCategory: "Daily Wear",
    price: 82,
    badge: "New",
    colors: ["#b08870", "#2d2d2d", "#e8e0d0"],
    image: "/placeholders/product-wrap.jpg",
  },
  {
    id: "21",
    name: "Silk Hair Scarf",
    category: "Leisure",
    subCategory: "Accessories",
    price: 48,
    colors: ["#ccb04a", "#141413", "#f5f0e0"],
    image: "/placeholders/product-wrap.jpg",
  },
  {
    id: "22",
    name: "Tote Bag Canvas",
    category: "Leisure",
    subCategory: "Accessories",
    price: 68,
    badge: "New",
    colors: ["#8a9a7a", "#f5f0e0", "#141413"],
    image: "/placeholders/product-jacket.jpg",
  },
];

export const placeholderCategories = [
  {
    title: "Active",
    subtitle: "Performance-driven sun protection for every activity",
    count: 12,
    gradient: "from-[#8a9a7a] to-[#6a7a5a]",
    image: "/placeholders/cat-athletic.jpg",
  },
  {
    title: "Leisure",
    subtitle: "Casual, fashion-forward pieces for everyday wear",
    count: 10,
    gradient: "from-[#c2a060] to-[#a08040]",
    image: "/placeholders/Leisure_photo.png",
  },
];

export const activeSubCategories = [
  "New Arrivals",
  "Beach Volleyball",
  "Racket Sports",
  "Golf",
  "Equestrian",
  "Running",
  "Beach",
  "Accessories",
];

export const leisureSubCategories = [
  "New Arrivals",
  "Daily Wear",
  "Accessories",
];

export const placeholderTestimonials = [
  {
    text: "I wore the Golden Hour long sleeve on a 3-hour beach hike — zero sunburn. The fabric is buttery soft and breathes so well.",
    author: "Sarah M.",
    role: "Verified Buyer",
  },
  {
    text: "Finally a sun protection top that doesn't look like a rash guard from a surf shop. These are genuinely stylish enough for brunch after paddle.",
    author: "Mia L.",
    role: "Verified Buyer",
  },
  {
    text: "The Reef Hoodie is my new go-to for outdoor runs. UPF 50+ and the golden colour is stunning. I've bought three.",
    author: "Jess K.",
    role: "Verified Buyer",
  },
];
