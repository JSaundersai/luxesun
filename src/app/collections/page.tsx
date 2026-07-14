import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { collections, getCollectionProducts } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Collections — Luxe Sun",
  description: "Shop every Luxe Sun collection of UPF 50+ sun-protective activewear.",
};

export default function CollectionsIndexPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Shop"
        title="Collections"
        description="Shop by sport or by style — certified UPF 50+ sleeves, crops, shirts and base layers for beach volleyball, running and every sun sport."
      />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c) => {
            const count = getCollectionProducts(c).length;
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-warm-sand no-underline"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-near-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="block font-sans text-[0.62rem] font-medium tracking-[0.2em] uppercase text-ivory/75 mb-1">
                    {count} {count === 1 ? "style" : "styles"}
                  </span>
                  <span className="font-serif text-[1.6rem] leading-tight text-ivory">
                    {c.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
