/** Navigation data shared by the desktop mega menu and the mobile menu sheet. */

export type MenuItem = { label: string; href: string };

export const shopByItems: MenuItem[] = [
  { label: "Sleeves", href: "/collections/sleeves" },
  { label: "Crop Tops", href: "/collections/crop-tops" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Base Layers", href: "/collections/base-layers" },
];

export const activityItems: MenuItem[] = [
  { label: "Beach Volleyball", href: "/collections/beach-volleyball" },
  { label: "Running", href: "/collections/running" },
  { label: "Tennis & Golf", href: "/collections/tennis-and-golf" },
];

export const shopForItems: MenuItem[] = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/bestsellers" },
  { label: "Sales", href: "/collections/sale" },
];

export const collectionMenuItems = [
  {
    label: "New Arrivals",
    description: "Fresh from the studio",
    href: "/collections/new-arrivals",
  },
  {
    label: "Best Sellers",
    description: "Most-loved sun layers",
    href: "/collections/bestsellers",
  },
  {
    label: "Activewear",
    description: "Made to move outside",
    href: "/collections/activewear",
  },
  {
    label: "Leisurewear",
    description: "Easy off-court comfort",
    href: "/collections/leisurewear",
  },
  {
    label: "Sales",
    description: "Last chance, less",
    href: "/collections/sale",
  },
];

export const featureTiles = [
  {
    eyebrow: "New In",
    title: "The Latest Collection",
    image: "/placeholders/menu-latest-collection.jpg",
    href: "/collections/new-arrivals",
  },
  {
    eyebrow: "Most Loved",
    title: "Best Sellers",
    image: "/placeholders/menu-best-seller.jpg",
    href: "/collections/bestsellers",
  },
];

/** Large serif links at the top of the mobile menu sheet. */
export const mobilePrimaryLinks: MenuItem[] = [
  { label: "Shop all", href: "/collections" },
  { label: "New in", href: "/collections/new-arrivals" },
  { label: "Best sellers", href: "/collections/bestsellers" },
  { label: "Sale", href: "/collections/sale" },
];

/** Accordion groups in the mobile menu (de-duplicated against the primary links). */
export const mobileMenuGroups: { heading: string; items: MenuItem[] }[] = [
  { heading: "Shop by product", items: shopByItems },
  { heading: "Shop by sport", items: activityItems },
  {
    heading: "Collections",
    items: [
      { label: "Activewear", href: "/collections/activewear" },
      { label: "Leisurewear", href: "/collections/leisurewear" },
    ],
  },
];

export const mobileUtilityLinks: MenuItem[] = [
  { label: "Size guide", href: "/size-guide" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Contact", href: "/contact" },
];
