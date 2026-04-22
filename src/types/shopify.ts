export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { src: string; altText?: string }[];
  variants: { id: string; title: string; price: { amount: string } }[];
  productType: string;
  tags: string[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: { src: string; altText?: string };
}

export interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  image?: string;
  price: string;
}
