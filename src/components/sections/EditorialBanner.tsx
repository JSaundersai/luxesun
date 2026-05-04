"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";

export default function EditorialBanner() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-near-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholders/cat-longsleeves.jpg"
          alt="Lifestyle editorial"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-near-black/70 via-near-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-[2] px-6 max-w-[1400px] mx-auto w-full py-20">
        <FadeIn>
          <div className="max-w-[550px]">
            <p className="font-sans text-[0.7rem] font-medium tracking-[0.35em] uppercase text-warm-silver/70 mb-6">
              The Collection
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.05] text-ivory mb-6">
              A Layered Uniform of Elevated Staples
            </h2>
            <p className="font-sans text-[1rem] font-light leading-[1.7] text-warm-silver/80 mb-10 max-w-[440px]">
              Built for the cold-weather rotation. From sunrise yoga to sunset runs — 
              find your perfect fit for every movement.
            </p>
            <a
              href="#products"
              className="inline-block bg-ivory text-near-black font-sans text-[0.8rem] font-medium tracking-[0.15em] uppercase px-10 py-4 cursor-pointer transition-all duration-300 hover:bg-warm-sand"
            >
              Shop the Collection
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
