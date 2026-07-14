import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts, getPost } from "@/lib/blog-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  return {
    title: post ? `${post.title} — Luxe Sun` : "Journal — Luxe Sun",
    description: post?.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <PageLayout>
      <article className="max-w-[760px] mx-auto px-6 py-14 md:py-20">
        <Link
          href="/blog"
          className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-stone-gray no-underline hover:text-near-black"
        >
          ← All Stories
        </Link>

        <div className="mt-6 mb-8">
          <span className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terracotta">
            {post.category}
          </span>
          <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-medium leading-[1.1] text-near-black mt-3 mb-4">
            {post.title}
          </h1>
          <span className="font-sans text-[0.8rem] text-stone-gray">
            {post.date} · {post.readTime}
          </span>
        </div>

        <div className="relative aspect-[16/9] bg-warm-sand overflow-hidden mb-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="760px"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 font-sans text-[1.05rem] leading-[1.85] text-charcoal-warm">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="border-t border-border-cream mt-14 pt-8 text-center">
          <p className="font-serif text-[1.4rem] text-near-black mb-4">
            Shop the styles behind the story
          </p>
          <Link href="/collections" className="btn-primary">
            Explore Collections
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
