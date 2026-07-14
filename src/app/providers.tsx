"use client";

import { ReactNode } from "react";
import { ProductsProvider } from "@/context/ProductsProvider";
import { CartProvider } from "@/context/CartProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { WishlistProvider } from "@/context/WishlistProvider";
import { AnalyticsProvider } from "@/context/AnalyticsProvider";
import { ReviewsProvider } from "@/context/ReviewsProvider";
import { EmailsProvider } from "@/context/EmailsProvider";
import { SocialProvider } from "@/context/SocialProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductsProvider>
      <AuthProvider>
        <AnalyticsProvider>
          <EmailsProvider>
            <ReviewsProvider>
              <SocialProvider>
                <WishlistProvider>
                  <CartProvider>
                    {children}
                    <CartDrawer />
                  </CartProvider>
                </WishlistProvider>
              </SocialProvider>
            </ReviewsProvider>
          </EmailsProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </ProductsProvider>
  );
}
