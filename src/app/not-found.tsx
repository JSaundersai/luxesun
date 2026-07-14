import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="max-w-[560px] mx-auto px-6 py-28 md:py-36 text-center min-h-[55vh]">
        <p className="section-eyebrow">Error 404</p>
        <h1 className="font-serif text-[2.8rem] md:text-[3.4rem] font-medium text-near-black mb-4">
          This page caught too much sun
        </h1>
        <p className="font-sans text-[0.95rem] text-stone-gray mb-9">
          The page you&apos;re looking for has moved or never existed. Let&apos;s get you back into the shade.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/collections" className="btn-secondary">Shop the Range</Link>
        </div>
      </div>
    </PageLayout>
  );
}
