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
    <section id="about" className="py-28 px-6 bg-ivory border-t border-border-cream">
      <FadeIn>
        <div className="max-w-[600px] mx-auto text-center">
          <p className="section-eyebrow">Stay Connected</p>
          <h2 className="font-serif text-[2.4rem] font-medium leading-[1.15] text-near-black mb-5">
            Join the Luxe Sun Community
          </h2>
          <p className="font-sans text-[0.95rem] leading-[1.7] text-olive-gray mb-10">
            Be the first to know about new drops, exclusive offers, and
            sun-soaked inspiration.
          </p>
          {done ? (
            <p className="font-sans text-[0.95rem] text-terracotta">
              You&apos;re on the list ☀️ Check your inbox for 10% off your first order.
            </p>
          ) : (
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 border border-border-warm bg-white font-sans text-[0.88rem] text-near-black outline-none transition-all duration-300 placeholder:text-stone-gray focus:border-near-black"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-near-black px-10 py-3.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.15em] text-ivory cursor-pointer transition-all duration-300 hover:bg-dark-surface"
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
