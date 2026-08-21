import {
  placeholderProducts,
  PlaceholderProduct,
  productTypes,
  sports,
} from "./placeholder-data";

export interface CollectionDef {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Circular sub-category filters shown at the top of the listing. */
  subCategories?: string[];
  /** Predicate that selects which products belong to this collection. */
  filter: (product: PlaceholderProduct) => boolean;
}

export const collections: CollectionDef[] = [
  // Sports
  {
    slug: "beach-volleyball",
    title: "Beach Volleyball",
    description:
      "Full-coverage crops, sleeves and base layers engineered for the sand, the sun and the dive.",
    image: "/placeholders/products/ace-crop-front.jpg",
    subCategories: [...productTypes],
    filter: (p) => p.subCategory === "Beach Volleyball",
  },
  {
    slug: "running",
    title: "Run & Train",
    description:
      "Breathable, moisture-wicking UPF 50+ shirts and crops that keep you cool mile after mile.",
    image: "/placeholders/products/horizon-shirt-front.jpg",
    subCategories: [...productTypes],
    filter: (p) => p.subCategory === "Running" && p.gender !== "men",
  },
  {
    slug: "tennis-and-golf",
    title: "Tennis & Golf",
    description:
      "Sun-smart sport shirts and layers with the coverage to last a full round or match.",
    image: "/placeholders/products/serve-shirt-front.jpg",
    filter: (p) => p.subCategory === "Tennis & Golf" && p.gender !== "men",
  },
  // Product types
  {
    slug: "sleeves",
    title: "Sleeves",
    description: "Certified UPF 50+ arm sleeves that slip on for instant sun coverage.",
    image: "/placeholders/products/baseline-sleeves-front.jpg",
    filter: (p) => p.category === "Sleeves",
  },
  {
    slug: "crop-tops",
    title: "Crop Tops",
    description: "Long-sleeve and seamless crops with total UV protection and full range of motion.",
    image: "/placeholders/products/ace-crop-front.jpg",
    filter: (p) => p.category === "Crop Tops",
  },
  {
    slug: "shirts",
    title: "Shirts",
    description: "Lightweight sun shirts and half-zips built to breathe under a relentless sun.",
    image: "/placeholders/products/horizon-shirt-front.jpg",
    filter: (p) => p.category === "Shirts" && p.gender !== "men",
  },
  {
    slug: "base-layers",
    title: "Base Layers",
    description: "Second-skin shorts and layers with UPF 50+ coverage for high-movement sport.",
    image: "/placeholders/products/baselayer-short-front.jpg",
    filter: (p) => p.category === "Base Layers",
  },
  // Flags
  {
    slug: "activewear",
    title: "Activewear",
    description: "Performance-first UPF 50+ layers for every sun sport.",
    image: "/placeholders/products/ace-crop-front.jpg",
    subCategories: [...productTypes],
    filter: (p) => p.gender !== "men",
  },
  {
    slug: "leisurewear",
    title: "Leisurewear",
    description: "Easy sun coverage for off-court days and everywhere in between.",
    image: "/placeholders/products/serve-shirt-front.jpg",
    filter: (p) => p.category === "Shirts" && p.gender !== "men",
  },
  // Flags
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    description: "The latest UPF 50+ drops, fresh off the line.",
    image: "/placeholders/products/rally-crop-front.jpg",
    filter: (p) => p.badge === "New" && p.gender !== "men",
  },
  {
    slug: "bestsellers",
    title: "Best Sellers",
    description: "The most-loved styles our community keeps coming back to.",
    image: "/placeholders/products/baseline-sleeves-front.jpg",
    filter: (p) => p.badge === "Bestseller",
  },
  {
    slug: "sale",
    title: "Sale",
    description: "Limited-time markdowns on select sun-protective styles.",
    image: "/placeholders/products/serve-shirt-front.jpg",
    filter: (p) => p.badge === "Sale",
  },
  // Men
  {
    slug: "mens",
    title: "Men",
    description:
      "UPF 50+ sun shirts engineered for men — built to breathe through every sun sport.",
    image: "/placeholders/products/mens-summit-front.jpg",
    filter: (p) => p.gender === "men",
  },
];

/** Sports referenced by the sport-based collections. */
export const collectionSports = [...sports];

export function getCollection(slug: string): CollectionDef | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(def: CollectionDef): PlaceholderProduct[] {
  return placeholderProducts.filter(def.filter);
}
