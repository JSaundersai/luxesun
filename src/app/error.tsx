"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-[520px] text-center">
        <p className="section-eyebrow">Something went wrong</p>
        <h1 className="font-serif text-[2.6rem] font-medium text-near-black mb-4">
          We hit an unexpected snag
        </h1>
        <p className="font-sans text-[0.95rem] text-stone-gray mb-9">
          Sorry about that. You can try again, or head back to the homepage.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={reset} className="btn-primary">Try Again</button>
          <Link href="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
