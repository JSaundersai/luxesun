/**
 * Luxe Sun transactional email registry.
 *
 * Each template renders to a self-contained HTML string (inline styles, no
 * external fonts) so it can be previewed and printed from the admin, and later
 * handed to a real ESP (e.g. Shopify Notifications / Klaviyo / SES) unchanged.
 *
 * Prices across the store are GST-inclusive (Australian). The GST component is
 * shown as `total / 11`.
 */

export type EmailType =
  | "order_confirmation"
  | "shipping_confirmation"
  | "delivery_confirmation"
  | "welcome"
  | "password_reset"
  | "abandoned_cart"
  | "review_request"
  | "back_in_stock"
  | "newsletter_welcome"
  | "influencer_welcome"
  | "influencer_payout"
  | "refund_confirmation"
  | "gift_card";

export interface RenderedEmail {
  subject: string;
  previewText: string;
  html: string;
}

interface LineItem {
  name: string;
  qty: number;
  price: number;
  size?: string;
  color?: string;
}

const BRAND = {
  bg: "#f5f4ed",
  surface: "#ffffff",
  ink: "#141413",
  muted: "#6b6a63",
  accent: "#c96442",
  border: "#e7e2d6",
};

const money = (n: number) => `$${n.toFixed(2)}`;
const gstOf = (gstInclusiveTotal: number) => gstInclusiveTotal / 11;

const SITE = "https://luxesun.com.au";

/** Shared branded shell. */
function wrap(opts: {
  heading: string;
  preheader: string;
  body: string;
  cta?: { label: string; href: string };
}): string {
  const { heading, preheader, body, cta } = opts;
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:Helvetica,Arial,sans-serif;color:${BRAND.ink};">
  <span style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:92%;background:${BRAND.surface};border:1px solid ${BRAND.border};">
        <tr><td style="padding:28px 40px;border-bottom:1px solid ${BRAND.border};text-align:center;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;letter-spacing:3px;color:${BRAND.ink};">LUXE&nbsp;SUN</div>
          <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.muted};margin-top:4px;">UPF 50+ Sun-Protective Activewear</div>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:26px;margin:0 0 20px;color:${BRAND.ink};">${heading}</h1>
          <div style="font-size:15px;line-height:1.65;color:${BRAND.ink};">${body}</div>
          ${
            cta
              ? `<div style="margin:32px 0 8px;"><a href="${cta.href}" style="display:inline-block;background:${BRAND.ink};color:#f5f4ed;text-decoration:none;padding:14px 30px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">${cta.label}</a></div>`
              : ""
          }
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid ${BRAND.border};text-align:center;font-size:11px;line-height:1.7;color:${BRAND.muted};">
          Luxe Sun Pty Ltd · Sydney, Australia · ABN 00 000 000 000<br>
          <a href="${SITE}" style="color:${BRAND.muted};">luxesun.com.au</a> ·
          <a href="${SITE}/account" style="color:${BRAND.muted};">Your account</a> ·
          <a href="${SITE}#unsubscribe" style="color:${BRAND.muted};">Unsubscribe</a><br>
          Prices include 10% GST.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function itemsTable(items: LineItem[]): string {
  const rows = items
    .map(
      (i) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;">
          ${i.name}<br><span style="color:${BRAND.muted};font-size:12px;">${[i.color, i.size, `Qty ${i.qty}`].filter(Boolean).join(" · ")}</span>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;text-align:right;white-space:nowrap;">${money(i.price * i.qty)}</td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">${rows}</table>`;
}

function totalsBlock(o: {
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
}): string {
  const line = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;font-size:14px;color:${strong ? BRAND.ink : BRAND.muted};${strong ? "font-weight:600;" : ""}">${label}</td><td style="padding:4px 0;font-size:14px;text-align:right;color:${strong ? BRAND.ink : BRAND.muted};${strong ? "font-weight:600;" : ""}">${value}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-top:1px solid ${BRAND.border};padding-top:8px;">
    ${line("Subtotal", money(o.subtotal))}
    ${o.discount && o.discount > 0 ? line("Discount", `−${money(o.discount)}`) : ""}
    ${line("Shipping", o.shipping === 0 ? "Free" : money(o.shipping))}
    ${line("Total (incl. GST)", money(o.total), true)}
    ${line("GST included", money(gstOf(o.total)))}
  </table>`;
}

interface TemplateDef {
  label: string;
  description: string;
  /** Sample payload used for the admin template gallery. */
  sample: Record<string, unknown>;
  render: (data: Record<string, unknown>) => RenderedEmail;
}

const sampleItems: LineItem[] = [
  { name: "Ace Long-Sleeve Crop", qty: 1, price: 88, size: "S", color: "Sand" },
  { name: "Baseline UV Arm Sleeves", qty: 2, price: 34, size: "M", color: "Black" },
];
const sampleOrder = {
  id: "LS-48210675",
  email: "jordan@example.com",
  name: "Jordan Lee",
  items: sampleItems,
  subtotal: 156,
  shipping: 10,
  discount: 0,
  total: 166,
  shipTo: "12 Marine Parade, Bondi Beach NSW 2026",
};

export const emailTemplates: Record<EmailType, TemplateDef> = {
  order_confirmation: {
    label: "Order Confirmation",
    description: "Sent immediately after checkout.",
    sample: sampleOrder,
    render: (d) => ({
      subject: `Order ${d.id} confirmed — thank you!`,
      previewText: "We've got your order and we're on it.",
      html: wrap({
        heading: "Thank you for your order",
        preheader: "We've received your order.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? "there"}, we've received order <strong>${d.id}</strong> and will email you again when it ships.</p>
          ${itemsTable(d.items as LineItem[])}
          ${totalsBlock(d as never)}
          <p style="margin:20px 0 0;color:${BRAND.muted};font-size:13px;">Shipping to: ${d.shipTo ?? ""}</p>`,
        cta: { label: "View your order", href: `${SITE}/account` },
      }),
    }),
  },
  shipping_confirmation: {
    label: "Shipping Confirmation",
    description: "Sent when an order is marked shipped.",
    sample: { ...sampleOrder, tracking: "AU9381726354", carrier: "Australia Post" },
    render: (d) => ({
      subject: `Your Luxe Sun order ${d.id} is on its way`,
      previewText: "Track your delivery.",
      html: wrap({
        heading: "Your order has shipped",
        preheader: "It's on the way.",
        body: `<p style="margin:0 0 16px;">Good news ${d.name ?? ""} — order <strong>${d.id}</strong> is on its way with ${d.carrier ?? "our courier"}.</p>
          <p style="margin:0 0 16px;font-size:14px;">Tracking number: <strong>${d.tracking ?? "—"}</strong></p>
          ${itemsTable(d.items as LineItem[])}`,
        cta: { label: "Track your parcel", href: `${SITE}/account` },
      }),
    }),
  },
  delivery_confirmation: {
    label: "Delivery Confirmation",
    description: "Sent when an order is marked delivered.",
    sample: sampleOrder,
    render: (d) => ({
      subject: `Delivered — enjoy your Luxe Sun gear`,
      previewText: "Your order has arrived.",
      html: wrap({
        heading: "Your order has arrived",
        preheader: "Enjoy the sunshine.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? ""}, order <strong>${d.id}</strong> has been delivered. We hope you love it — get out and enjoy the sun (protected, of course).</p>`,
        cta: { label: "Shop the range", href: `${SITE}/collections` },
      }),
    }),
  },
  welcome: {
    label: "Welcome / Account Created",
    description: "Sent when a customer registers.",
    sample: { name: "Jordan Lee", email: "jordan@example.com" },
    render: (d) => ({
      subject: "Welcome to Luxe Sun ☀️",
      previewText: "Your account is ready.",
      html: wrap({
        heading: `Welcome, ${d.name ?? "friend"}`,
        preheader: "Your account is ready.",
        body: `<p style="margin:0 0 16px;">Thanks for joining Luxe Sun. Your account is ready — track orders, save favourites and check out faster.</p>
          <p style="margin:0;color:${BRAND.muted};font-size:13px;">Certified UPF 50+ activewear, designed and tested in Australia.</p>`,
        cta: { label: "Start shopping", href: `${SITE}/collections` },
      }),
    }),
  },
  password_reset: {
    label: "Password Reset",
    description: "Sent when a customer requests a reset.",
    sample: { name: "Jordan Lee", link: `${SITE}/account/reset?token=demo` },
    render: (d) => ({
      subject: "Reset your Luxe Sun password",
      previewText: "Password reset requested.",
      html: wrap({
        heading: "Reset your password",
        preheader: "Password reset requested.",
        body: `<p style="margin:0 0 16px;">We received a request to reset your password. This link expires in 60 minutes. If you didn't request it, you can safely ignore this email.</p>`,
        cta: { label: "Choose a new password", href: String(d.link ?? `${SITE}/account`) },
      }),
    }),
  },
  abandoned_cart: {
    label: "Abandoned Cart",
    description: "Recovery email for carts left behind.",
    sample: { name: "Jordan Lee", items: sampleItems },
    render: (d) => ({
      subject: "You left something in the sun ☀️",
      previewText: "Your cart is waiting.",
      html: wrap({
        heading: "Still thinking it over?",
        preheader: "Your cart is waiting.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? "there"}, you left these in your cart. They're going fast — complete your order before they sell out.</p>
          ${itemsTable(d.items as LineItem[])}`,
        cta: { label: "Return to cart", href: `${SITE}/cart` },
      }),
    }),
  },
  review_request: {
    label: "Review Request",
    description: "Sent a few days after delivery.",
    sample: { name: "Jordan Lee", product: "Ace Long-Sleeve Crop", handle: "ace-long-sleeve-crop" },
    render: (d) => ({
      subject: `How are you liking your ${d.product ?? "Luxe Sun gear"}?`,
      previewText: "Share your thoughts.",
      html: wrap({
        heading: "How did we do?",
        preheader: "Leave a review.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? ""}, we'd love to hear how the <strong>${d.product ?? "your order"}</strong> is working out. A quick review helps other sun-seekers shop with confidence.</p>`,
        cta: { label: "Write a review", href: `${SITE}/products/${d.handle ?? ""}` },
      }),
    }),
  },
  back_in_stock: {
    label: "Back in Stock",
    description: "Sent to waitlisters when stock returns.",
    sample: { product: "Serve UV Sun Shirt", size: "M", handle: "serve-uv-sun-shirt" },
    render: (d) => ({
      subject: `Back in stock: ${d.product ?? "your size"}`,
      previewText: "It's back — but not for long.",
      html: wrap({
        heading: "It's back in stock",
        preheader: "Your size is available again.",
        body: `<p style="margin:0 0 16px;">Good news — the <strong>${d.product ?? "item"}</strong>${d.size ? ` in size <strong>${d.size}</strong>` : ""} is available again. Popular sizes sell out fast, so don't wait.</p>`,
        cta: { label: "Shop now", href: `${SITE}/products/${d.handle ?? ""}` },
      }),
    }),
  },
  newsletter_welcome: {
    label: "Newsletter Welcome",
    description: "Sent when someone subscribes.",
    sample: { email: "jordan@example.com" },
    render: () => ({
      subject: "You're on the list ☀️",
      previewText: "Welcome to the Luxe Sun community.",
      html: wrap({
        heading: "Welcome to the community",
        preheader: "You're subscribed.",
        body: `<p style="margin:0 0 16px;">Thanks for subscribing. You'll be first to hear about new drops, restocks and sun-sport tips. Here's 10% off your first order with code <strong>SUNUP10</strong>.</p>`,
        cta: { label: "Shop new arrivals", href: `${SITE}/collections/new-arrivals` },
      }),
    }),
  },
  influencer_welcome: {
    label: "Influencer Welcome",
    description: "Sent when an influencer is onboarded.",
    sample: { name: "Maya Rivera", code: "MAYA15", discountRate: 15, commissionRate: 12 },
    render: (d) => ({
      subject: "Welcome to the Luxe Sun partner program",
      previewText: "Your code is live.",
      html: wrap({
        heading: `Welcome aboard, ${d.name ?? "partner"}`,
        preheader: "Your affiliate code is live.",
        body: `<p style="margin:0 0 16px;">You're now a Luxe Sun partner. Your followers get <strong>${d.discountRate ?? 10}% off</strong> with your code, and you earn <strong>${d.commissionRate ?? 10}% commission</strong> on every attributed sale.</p>
          <p style="margin:0 0 8px;font-size:14px;">Your code:</p>
          <div style="font-size:22px;letter-spacing:2px;background:${BRAND.bg};border:1px solid ${BRAND.border};padding:14px;text-align:center;">${d.code ?? "YOURCODE"}</div>`,
        cta: { label: "View your dashboard", href: `${SITE}/partners` },
      }),
    }),
  },
  influencer_payout: {
    label: "Influencer Payout",
    description: "Sent when a commission payout is issued.",
    sample: { name: "Maya Rivera", amount: 219, period: "1–30 June 2026" },
    render: (d) => ({
      subject: `Your Luxe Sun payout of ${money(Number(d.amount ?? 0))}`,
      previewText: "Commission paid.",
      html: wrap({
        heading: "Your payout is on the way",
        preheader: "Commission paid.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? "partner"}, we've issued your commission payout of <strong>${money(Number(d.amount ?? 0))}</strong> for the period ${d.period ?? "this cycle"}. It should land in your account within 2–3 business days.</p>`,
        cta: { label: "See your earnings", href: `${SITE}/partners` },
      }),
    }),
  },
  refund_confirmation: {
    label: "Refund Confirmation",
    description: "Sent when an order is refunded.",
    sample: { name: "Jordan Lee", id: "LS-48210675", amount: 166 },
    render: (d) => ({
      subject: `Refund processed for order ${d.id}`,
      previewText: "Your refund is on its way.",
      html: wrap({
        heading: "Your refund is processed",
        preheader: "Refund on the way.",
        body: `<p style="margin:0 0 16px;">Hi ${d.name ?? ""}, we've refunded <strong>${money(Number(d.amount ?? 0))}</strong> for order <strong>${d.id}</strong> to your original payment method. Please allow 5–10 business days for it to appear.</p>`,
      }),
    }),
  },
  gift_card: {
    label: "Gift Card",
    description: "Sent when a gift card is purchased.",
    sample: { to: "Sam", amount: 100, code: "GIFT-8H2K-9Q2M" },
    render: (d) => ({
      subject: `You've received a Luxe Sun gift card`,
      previewText: "A sunny gift awaits.",
      html: wrap({
        heading: "You've received a gift card",
        preheader: "A sunny gift awaits.",
        body: `<p style="margin:0 0 16px;">Hi ${d.to ?? "there"}, you've been sent a Luxe Sun gift card worth <strong>${money(Number(d.amount ?? 0))}</strong>.</p>
          <p style="margin:0 0 8px;font-size:14px;">Redeem at checkout with code:</p>
          <div style="font-size:20px;letter-spacing:2px;background:${BRAND.bg};border:1px solid ${BRAND.border};padding:14px;text-align:center;">${d.code ?? "GIFT-XXXX"}</div>`,
        cta: { label: "Start shopping", href: `${SITE}/collections` },
      }),
    }),
  },
};

export function renderEmail(type: EmailType, data: Record<string, unknown>): RenderedEmail {
  return emailTemplates[type].render(data);
}

export const emailTypeList = Object.keys(emailTemplates) as EmailType[];
