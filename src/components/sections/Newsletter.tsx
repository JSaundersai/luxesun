"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { useEmails } from "@/context/EmailsProvider";

const SUBSCRIBERS_KEY = "luxe_subscribers_v1";

export default function Newsletter() {
  const { logEmail } = useEmails();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return;
    try {
      const list: string[] = JSON.parse(localStorage.getItem(SUBSCRIBERS_KEY) || "[]");
      if (!list.includes(value)) {
        localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify([...list, value]));
      }
    } catch {
      /* ignore */
    }
    logEmail("newsletter_welcome", value, { email: value });
    setDone(true);
    setEmail("");
  };

  return (
    <section id="about" className="border-t border-border-cream bg-ivory px-5 py-14 sm:px-8 sm:py-16 lg:px-6 lg:py-28">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="section-eyebrow">Stay Connected</p>
          <h2 className="mb-4 font-serif text-[2.1rem] font-medium leading-[1.15] text-near-black lg:mb-5 lg:text-[2.4rem]">
            Join the Luxe Sun Community
          </h2>
          <p className="mb-8 font-sans text-[0.95rem] leading-[1.7] text-olive-gray lg:mb-10">
            Be the first to know about new drops, exclusive offers, and
            sun-soaked inspiration.
          </p>
          {done ? (
            <p className="font-sans text-[0.95rem] text-terracotta">
              You&apos;re on the list ☀️ Check your inbox for 10% off your first order.
            </p>
          ) : (
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-h-[52px] flex-1 rounded-full border border-border-warm bg-white px-6 font-sans text-[1rem] text-near-black outline-none transition-all duration-300 placeholder:text-stone-gray focus:border-near-black lg:min-h-0 lg:rounded-none lg:px-5 lg:py-3.5 lg:text-[0.88rem]"
              />
              <button type="submit" className="btn-pill min-h-[52px] lg:hidden">
                Subscribe
              </button>
              <button
                type="submit"
                className="hidden shrink-0 cursor-pointer items-center justify-center rounded-full bg-near-black px-10 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-ivory transition-all duration-300 hover:bg-dark-surface lg:inline-flex"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
