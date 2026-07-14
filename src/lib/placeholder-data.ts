/**
 * Luxe Sun — UV-protection performance catalog.
 * Certified UPF 50+ sun-protective activewear for beach volleyball, running,
 * and sun sports. Categories: Sleeves, Crop Tops, Shirts, Base Layers.
 *
 * Each hero product ships with a named colourway list plus a front and back
 * studio image (same model) so cards and PDPs can do a front→back swap.
 */

export interface ProductColor {
  name: string;
  hex: string;
}

/** Sizes offered across the range (arm sleeves use the same buckets for MVP). */
export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export interface PlaceholderProduct {
  id: string;
  name: string;
  /** Product type — drives the product-type collections (Sleeves, Crop Tops…). */
  category: string;
  /** Sport / use-case — shown under the product name and used for sport filters. */
  subCategory: string;
  /** Target audience — drives the Women's / Men's split. Defaults to "women". */
  gender?: "women" | "men";
  price: number;
  originalPrice?: number;
  /** Unit cost of goods sold — used for margin/profit analytics. */
  cost?: number;
  badge?: string;
  colors: ProductColor[];
  /** Front studio image. */
  image: string;
  /** Back studio image (same model) for the hover swap. */
  backImage?: string;
  /** Stock keeping unit prefix (per-size SKU derives from this). */
  sku?: string;
  /** On-hand units keyed by size. */
  stock?: Record<string, number>;
  /** Extra gallery images beyond front/back. */
  images?: string[];
  /** Marketing description (falls back to a generated blurb). */
  description?: string;
  /** Fabric / composition detail. */
  fabric?: string;
  /** Fit and cut guidance. */
  fit?: string;
  /** Care instructions. */
  care?: string[];
  /** Feature bullets shown on the PDP. */
  features?: string[];
  /** "Model is 175cm and wears a size S" style note. */
  modelInfo?: string;
}

const SAND: ProductColor = { name: "Sand", hex: "#d8c3a5" };
const BLACK: ProductColor = { name: "Black", hex: "#141413" };
const IVORY: ProductColor = { name: "Ivory", hex: "#f5f0e0" };
const CHALK: ProductColor = { name: "Chalk White", hex: "#f7f5ef" };
const OLIVE: ProductColor = { name: "Olive Sage", hex: "#8a9a7a" };
const GOLDEN: ProductColor = { name: "Golden Hour", hex: "#ccb04a" };

const DEFAULT_CARE = [
  "Machine wash cold on a gentle cycle",
  "Do not tumble dry — hang in shade",
  "Do not iron print or bleach",
];

export const placeholderProducts: PlaceholderProduct[] = [
  {
    id: "1",
    name: "Ace Long-Sleeve Crop",
    category: "Crop Tops",
    subCategory: "Beach Volleyball",
    price: 88,
    cost: 34,
    badge: "New",
    colors: [SAND, BLACK, IVORY],
    image: "/placeholders/products/ace-crop-front.jpg",
    backImage: "/placeholders/products/ace-crop-back.jpg",
    sku: "LS-ACE",
    stock: { XS: 12, S: 20, M: 18, L: 9, XL: 4 },
    fabric: "78% recycled nylon, 22% elastane — 210gsm four-way stretch knit",
    fit: "Cropped, body-skimming fit with thumbholes. Size up for a relaxed feel.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ — blocks 98% of UVA/UVB rays",
      "Thumbholes for extended hand coverage",
      "Sweat-wicking, quick-dry knit",
      "Flatlock seams for chafe-free digs and dives",
    ],
    modelInfo: "Model is 176cm and wears a size S.",
  },
  {
    id: "2",
    name: "Rally Seamless Crop",
    category: "Crop Tops",
    subCategory: "Running",
    price: 92,
    cost: 36,
    badge: "Bestseller",
    colors: [OLIVE, BLACK, SAND],
    image: "/placeholders/products/rally-crop-front.jpg",
    backImage: "/placeholders/products/rally-crop-back.jpg",
    sku: "LS-RLY",
    stock: { XS: 8, S: 15, M: 22, L: 11, XL: 5 },
    fabric: "82% recycled polyester, 18% elastane — seamless bonded knit",
    fit: "Second-skin seamless fit with a supportive under-bust band.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ all-day sun protection",
      "Seamless bonded construction — zero chafe",
      "Breathable mesh zones at the back",
      "Stays put on long runs",
    ],
    modelInfo: "Model is 172cm and wears a size S.",
  },
  {
    id: "3",
    name: "Serve UV Sun Shirt",
    category: "Shirts",
    subCategory: "Tennis & Golf",
    price: 98,
    cost: 40,
    colors: [CHALK, GOLDEN, BLACK],
    image: "/placeholders/products/serve-shirt-front.jpg",
    backImage: "/placeholders/products/serve-shirt-back.jpg",
    sku: "LS-SRV",
    stock: { XS: 6, S: 10, M: 0, L: 7, XL: 3 },
    fabric: "88% recycled polyester, 12% elastane — 160gsm cooling piqué",
    fit: "Relaxed athletic fit with a longer hem for full coverage.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ — engineered for hours on court",
      "Cooling piqué knit with mesh underarm vents",
      "Longer drop hem stays tucked through the swing",
      "Anti-odour finish",
    ],
    modelInfo: "Model is 180cm and wears a size M.",
  },
  {
    id: "4",
    name: "Horizon Half-Zip Sun Shirt",
    category: "Shirts",
    subCategory: "Running",
    price: 104,
    cost: 44,
    badge: "New",
    colors: [GOLDEN, BLACK, SAND],
    image: "/placeholders/products/horizon-shirt-front.jpg",
    backImage: "/placeholders/products/horizon-shirt-back.jpg",
    sku: "LS-HZN",
    stock: { XS: 10, S: 14, M: 16, L: 8, XL: 6 },
    fabric: "90% recycled polyester, 10% elastane — featherweight 135gsm jersey",
    fit: "Streamlined running fit with a stand collar and quarter zip.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ featherweight sun cover",
      "Quarter-zip stand collar for neck protection",
      "Thumbholes and a zip media pocket",
      "Reflective hits for low-light runs",
    ],
    modelInfo: "Model is 178cm and wears a size M.",
  },
  {
    id: "5",
    name: "Baseline UV Arm Sleeves",
    category: "Sleeves",
    subCategory: "Beach Volleyball",
    price: 34,
    cost: 11,
    badge: "Bestseller",
    colors: [BLACK, CHALK, SAND],
    image: "/placeholders/products/baseline-sleeves-front.jpg",
    backImage: "/placeholders/products/baseline-sleeves-back.jpg",
    sku: "LS-BSL",
    stock: { XS: 25, S: 30, M: 28, L: 20, XL: 12 },
    fabric: "80% nylon, 20% elastane — compression knit",
    fit: "Compression fit with silicone grip tops. Sized by bicep circumference.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ arm coverage",
      "Silicone grippers stay put mid-rally",
      "Cooling compression knit",
      "Sold as a pair",
    ],
    modelInfo: "Model wears a size M (28–32cm bicep).",
  },
  {
    id: "6",
    name: "Base Layer Sun Short",
    category: "Base Layers",
    subCategory: "Beach Volleyball",
    price: 68,
    cost: 26,
    badge: "New",
    colors: [BLACK, SAND, OLIVE],
    image: "/placeholders/products/baselayer-short-front.jpg",
    backImage: "/placeholders/products/baselayer-short-back.jpg",
    sku: "LS-BLS",
    stock: { XS: 9, S: 13, M: 15, L: 10, XL: 4 },
    fabric: "76% recycled polyester, 24% elastane — 200gsm compression knit",
    fit: "High-rise compression short with a 4\" inseam and inner brief.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ for the beach and beyond",
      "High-rise waistband stays put on dives",
      "Bonded inner brief",
      "Squat-proof compression knit",
    ],
    modelInfo: "Model is 176cm and wears a size S.",
  },
  {
    id: "7",
    name: "Summit Men's Half-Zip Sun Shirt",
    category: "Shirts",
    subCategory: "Running",
    gender: "men",
    price: 108,
    cost: 45,
    badge: "New",
    colors: [SAND, BLACK, OLIVE],
    image: "/placeholders/products/mens-summit-front.jpg",
    backImage: "/placeholders/products/mens-summit-back.jpg",
    sku: "LS-MSU",
    stock: { XS: 6, S: 14, M: 20, L: 16, XL: 9 },
    fabric: "90% recycled polyester, 10% elastane — featherweight 140gsm jersey",
    fit: "Streamlined athletic fit with a quarter-zip stand collar. True to size.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ — blocks 98% of UVA/UVB rays",
      "Quarter-zip stand collar for extra neck protection",
      "Thumbholes for full hand coverage on long runs",
      "Sweat-wicking, quick-dry jersey",
    ],
    modelInfo: "Model is 185cm and wears a size M.",
  },
  {
    id: "8",
    name: "Meridian Men's UV Long-Sleeve",
    category: "Shirts",
    subCategory: "Tennis & Golf",
    gender: "men",
    price: 96,
    cost: 39,
    colors: [CHALK, BLACK, SAND],
    image: "/placeholders/products/mens-ace-front.jpg",
    backImage: "/placeholders/products/mens-ace-back.jpg",
    sku: "LS-MME",
    stock: { XS: 5, S: 12, M: 18, L: 14, XL: 8 },
    fabric: "88% recycled polyester, 12% elastane — 160gsm cooling piqué",
    fit: "Relaxed athletic fit with a longer drop hem. Size up for extra room.",
    care: DEFAULT_CARE,
    features: [
      "Certified UPF 50+ all-day sun protection",
      "Cooling piqué knit with mesh underarm vents",
      "Longer drop hem stays tucked through the swing",
      "Anti-odour finish",
    ],
    modelInfo: "Model is 183cm and wears a size M.",
  },
];

/** Product types — the primary way to shop the range. */
export const productTypes = [
  "Sleeves",
  "Crop Tops",
  "Shirts",
  "Base Layers",
] as const;

/** Sports the range is built for. */
export const sports = [
  "Beach Volleyball",
  "Running",
  "Tennis & Golf",
] as const;

const DEFAULT_STOCK: Record<string, number> = { XS: 10, S: 16, M: 16, L: 10, XL: 6 };

/**
 * Ensure a product (including ones persisted before newer fields existed) has
 * every field the app relies on. Self-heals older localStorage payloads.
 */
export function normalizeProduct(p: PlaceholderProduct): PlaceholderProduct {
  const stock =
    p.stock && Object.keys(p.stock).length
      ? { ...DEFAULT_STOCK, ...p.stock }
      : { ...DEFAULT_STOCK };
  return {
    ...p,
    cost: p.cost ?? Math.round(p.price * 0.42),
    sku: p.sku ?? `LS-${p.id}`,
    stock,
    care: p.care ?? DEFAULT_CARE,
    gender: p.gender ?? "women",
  };
}

/** The two hero shopping worlds surfaced on the homepage. */
export const placeholderCategories = [
  {
    title: "Beach Volleyball",
    slug: "beach-volleyball",
    subtitle: "Full-coverage crops, sleeves and base layers built for the sand and sun.",
    count: placeholderProducts.filter((p) => p.subCategory === "Beach Volleyball").length,
    gradient: "from-[#c2a060] to-[#a08040]",
    image: "/placeholders/products/ace-crop-front.jpg",
  },
  {
    title: "Run & Train",
    slug: "running",
    subtitle: "Breathable UPF 50+ shirts and crops that keep you cool mile after mile.",
    count: placeholderProducts.filter((p) => p.subCategory === "Running").length,
    gradient: "from-[#8a9a7a] to-[#6a7a5a]",
    image: "/placeholders/products/horizon-shirt-front.jpg",
  },
];

export const placeholderTestimonials = [
  {
    text: "I played a full beach volleyball tournament in the Ace crop and sleeves — six hours in the sun and zero burn. It never rode up or clung once.",
    author: "Sarah M.",
    role: "Beach Volleyball",
  },
  {
    text: "The Horizon half-zip is my go-to for long runs. UPF 50+, feathery light, and it actually breathes in the heat. I stopped bothering with sunscreen on my arms.",
    author: "Mia L.",
    role: "Marathon Runner",
  },
  {
    text: "Finally sun protection that doesn't look like a surf-shop rash guard. The Serve shirt is stylish enough that I wear it off the court too.",
    author: "Jess K.",
    role: "Tennis Coach",
  },
];

/** Convert a product name into a URL-safe handle, e.g. "Serve UPF 50+" -> "serve-upf-50-plus". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getProductHandle(product: PlaceholderProduct): string {
  return slugify(product.name);
}

export function findProductByHandle(
  handle: string
): PlaceholderProduct | undefined {
  return placeholderProducts.find((p) => getProductHandle(p) === handle);
}

/** Products flagged as bestsellers, used for "Most Loved" surfaces. */
export const bestsellerProducts = placeholderProducts.filter(
  (p) => p.badge === "Bestseller"
);

/** Products flagged as new, used for "New Arrivals" surfaces. */
export const newProducts = placeholderProducts.filter((p) => p.badge === "New");
