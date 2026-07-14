import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://luxesun.com.au"),
  title: {
    default: "Luxe Sun — UPF 50+ Sun-Protective Activewear",
    template: "%s — Luxe Sun",
  },
  description:
    "Certified UPF 50+ sun-protective activewear — sleeves, crop tops, shirts and base layers built for beach volleyball, running and every sun sport.",
  keywords: ["UPF 50", "sun protective clothing", "activewear", "beach volleyball", "sun shirt", "Australia"],
  openGraph: {
    title: "Luxe Sun — UPF 50+ Sun-Protective Activewear",
    description:
      "Certified UPF 50+ activewear built for beach volleyball, running and every sun sport. Designed and tested in Australia.",
    url: "https://luxesun.com.au",
    siteName: "Luxe Sun",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Sun — UPF 50+ Sun-Protective Activewear",
    description: "Certified UPF 50+ activewear for every sun sport.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
