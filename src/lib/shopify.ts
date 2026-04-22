import Client from "shopify-buy";

/*
 * Shopify Storefront API client.
 * Plug in your store domain & token in .env.local
 *
 * NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
 * NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=...
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";

const isConfigured = domain.length > 0 && storefrontAccessToken.length > 0;

// Only initialize if configured — allows dev to run without Shopify creds
export const shopifyClient = isConfigured
  ? Client.buildClient({ domain, storefrontAccessToken, apiVersion: "2024-04" })
  : null;

/** Fetch all products (first page) */
export async function fetchAllProducts() {
  if (!shopifyClient) return [];
  const products = await shopifyClient.product.fetchAll();
  return JSON.parse(JSON.stringify(products));
}

/** Fetch a single product by handle */
export async function fetchProductByHandle(handle: string) {
  if (!shopifyClient) return null;
  const product = await shopifyClient.product.fetchByHandle(handle);
  return JSON.parse(JSON.stringify(product));
}

/** Fetch all collections */
export async function fetchCollections() {
  if (!shopifyClient) return [];
  const collections = await shopifyClient.collection.fetchAll();
  return JSON.parse(JSON.stringify(collections));
}

/** Create a checkout (cart) */
export async function createCheckout() {
  if (!shopifyClient) return null;
  const checkout = await shopifyClient.checkout.create();
  return JSON.parse(JSON.stringify(checkout));
}

/** Add line items to checkout */
export async function addToCheckout(
  checkoutId: string,
  lineItems: { variantId: string; quantity: number }[]
) {
  if (!shopifyClient) return null;
  const checkout = await shopifyClient.checkout.addLineItems(
    checkoutId,
    lineItems
  );
  return JSON.parse(JSON.stringify(checkout));
}
