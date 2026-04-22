import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-near-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholders/hero.jpg"
          alt="Woman in sun protection athletic top outdoors"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-near-black/30 to-near-black/60" />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-[800px] animate-fade-in-up">
        <p className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-gold mb-6">
          UPF 50+ Sun Protection
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.10] text-ivory mb-5">
          Train Under the Sun,
          <br />
          Not in Fear of It
        </h1>
        <p className="font-sans text-base sm:text-lg font-light leading-relaxed text-warm-silver mb-10 max-w-[520px] mx-auto">
          Athletic tops engineered with UPF 50+ protection and premium
          performance fabrics. Sun-smart style for every outdoor session.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#products" className="btn-primary">
            Shop Sun Protection Tops
          </a>
          <a href="#feature" className="btn-secondary">
            UPF Technology
          </a>
        </div>
      </div>
    </section>
  );
}
