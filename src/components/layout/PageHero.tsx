import Image from "next/image";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional background image path for a dark, full-bleed hero. */
  image?: string;
  align?: "left" | "center";
}

/**
 * Interior page header. Renders a plain parchment header by default, or a
 * dark image hero when `image` is provided.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  align = "center",
}: PageHeroProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  if (image) {
    return (
      <section className="relative min-h-[42vh] flex items-end overflow-hidden bg-near-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-near-black/80 via-near-black/20 to-near-black/10" />
        <div className="relative z-[2] px-6 max-w-[1400px] mx-auto w-full pb-14 pt-28">
          <div className={`flex flex-col ${alignment} max-w-[720px]`}>
            {eyebrow && (
              <p className="font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-warm-silver/80 mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.6rem] font-medium leading-[1.05] text-ivory">
              {title}
            </h1>
            {description && (
              <p className="font-sans text-[1rem] font-light leading-[1.7] text-warm-silver/85 mt-5 max-w-[560px]">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pt-16 pb-10 md:pt-20 md:pb-12 border-b border-border-cream">
      <div className={`max-w-[1400px] mx-auto flex flex-col ${alignment} max-w-[760px]`}>
        {eyebrow && (
          <p className="font-sans text-[0.7rem] font-medium tracking-[0.3em] uppercase text-stone-gray mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-[2.6rem] md:text-[3.4rem] font-medium leading-[1.08] text-near-black">
          {title}
        </h1>
        {description && (
          <p className="font-sans text-[1rem] leading-[1.7] text-olive-gray mt-5 max-w-[620px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
