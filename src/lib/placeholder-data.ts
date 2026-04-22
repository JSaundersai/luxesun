/** Placeholder product data — tops-only UV/sun protection activewear */

export interface PlaceholderProduct {
  id: string;
  name: string;
  category: string;
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
    category: "Crop Tops",
    price: 78,
    badge: "New",
    colors: ["#ccb04a", "#141413", "#f5f0e0"],
    image: "/placeholders/product-crop-top.jpg",
  },
  {
    id: "2",
    name: "Golden Hour Long Sleeve",
    category: "Long Sleeves",
    price: 98,
    badge: "Bestseller",
    colors: ["#f5f0e0", "#141413", "#8a9a7a"],
    image: "/placeholders/product-longsleeve.jpg",
  },
  {
    id: "3",
    name: "Dusk Ribbed Tank",
    category: "Tanks",
    price: 58,
    colors: ["#e8e0d0", "#4a4a44", "#ccb04a"],
    image: "/placeholders/product-tank.jpg",
  },
  {
    id: "4",
    name: "Sunrise Zip-Through Jacket",
    category: "Jackets & Cover-Ups",
    price: 118,
    originalPrice: 148,
    badge: "Sale",
    colors: ["#ccb04a", "#141413"],
    image: "/placeholders/product-jacket.jpg",
  },
  {
    id: "5",
    name: "Horizon Wrap Top",
    category: "Wrap Tops",
    price: 72,
    colors: ["#f5f4ed", "#2d2d2d"],
    image: "/placeholders/product-wrap.jpg",
  },
  {
    id: "6",
    name: "Tide Rash Guard",
    category: "Rash Guards",
    price: 108,
    badge: "New",
    colors: ["#141413", "#8a9a7a", "#ccb04a"],
    image: "/placeholders/product-rashguard.jpg",
  },
  {
    id: "7",
    name: "Cove Halter Top",
    category: "Crop Tops",
    price: 64,
    colors: ["#b08870", "#2d2d2d", "#e8e0d0"],
    image: "/placeholders/product-halter.jpg",
  },
  {
    id: "8",
    name: "Reef Hoodie UPF 50+",
    category: "Hoodies",
    price: 128,
    badge: "Bestseller",
    colors: ["#ccb04a", "#141413", "#f5f4ed"],
    image: "/placeholders/product-hoodie.jpg",
  },
];

export const placeholderCategories = [
  {
    title: "Tanks & Crop Tops",
    count: 16,
    gradient: "from-[#c2a060] to-[#a08040]",
    image: "/placeholders/cat-tanks.jpg",
  },
  {
    title: "Long Sleeves & Rash Guards",
    count: 12,
    gradient: "from-[#8a9a7a] to-[#6a7a5a]",
    image: "/placeholders/cat-longsleeves.jpg",
  },
  {
    title: "Jackets & Cover-Ups",
    count: 8,
    gradient: "from-[#b08870] to-[#906850]",
    image: "/placeholders/cat-jackets.jpg",
  },
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
