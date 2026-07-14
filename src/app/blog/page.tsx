import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Journal — Luxe Sun",
  description: "Stories on sun safety, training, and life outdoors from the Luxe Sun community.",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="The Journal"
        title="Stories & Guides"
        description="Sun safety, training tips, and life outdoors — from the Luxe Sun community."
      />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block no-underline text-inherit"
            >
              <div className="relative aspect-[4/3] bg-warm-sand overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terracotta">
                {post.category}
              </span>
              <h2 className="font-serif text-[1.5rem] leading-tight text-near-black mt-2 mb-2 group-hover:text-terracotta transition-colors">
                {post.title}
              </h2>
              <p className="font-sans text-[0.9rem] leading-relaxed text-olive-gray mb-3">
                {post.excerpt}
              </p>
              <span className="font-sans text-[0.75rem] text-stone-gray">
                {post.date} · {post.readTime}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
