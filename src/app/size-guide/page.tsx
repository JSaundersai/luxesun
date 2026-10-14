import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/layout/PageHero";
import InfoSection from "@/components/layout/InfoSection";
import { SIZE_ROWS, formatRange } from "@/lib/size-chart";

export const metadata: Metadata = {
  title: "Size Guide — Luxe Sun",
  description: "Find your fit with the Luxe Sun size guide and measurement chart.",
};

const rows = SIZE_ROWS.map((r) => ({
  size: r.size,
  au: r.au,
  bust: formatRange(r.bust, "cm"),
  waist: formatRange(r.waist, "cm"),
  hip: formatRange(r.hip, "cm"),
}));

export default function SizeGuidePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Support"
        title="Size Guide"
        description="All measurements are in centimetres and refer to body measurements, not garment measurements."
      />

      <section className="px-6 py-14 md:py-20">
        <div className="max-w-[820px] mx-auto">
          <div className="overflow-x-auto border border-border-cream">
            <table className="w-full border-collapse text-left font-sans text-[0.92rem]">
              <thead>
                <tr className="bg-parchment text-near-black">
                  <th className="py-3.5 px-4 font-medium tracking-[0.08em] uppercase text-[0.72rem]">Size</th>
                  <th className="py-3.5 px-4 font-medium tracking-[0.08em] uppercase text-[0.72rem]">AU</th>
                  <th className="py-3.5 px-4 font-medium tracking-[0.08em] uppercase text-[0.72rem]">Bust</th>
                  <th className="py-3.5 px-4 font-medium tracking-[0.08em] uppercase text-[0.72rem]">Waist</th>
                  <th className="py-3.5 px-4 font-medium tracking-[0.08em] uppercase text-[0.72rem]">Hip</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.size} className="border-t border-border-cream text-olive-gray">
                    <td className="py-3.5 px-4 font-medium text-near-black">{r.size}</td>
                    <td className="py-3.5 px-4">{r.au}</td>
                    <td className="py-3.5 px-4">{r.bust}</td>
                    <td className="py-3.5 px-4">{r.waist}</td>
                    <td className="py-3.5 px-4">{r.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12">
            <InfoSection heading="How to Measure">
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-near-black">Bust:</strong> Measure around the fullest part of your chest.</li>
                <li><strong className="text-near-black">Waist:</strong> Measure around the narrowest part of your waist.</li>
                <li><strong className="text-near-black">Hip:</strong> Measure around the fullest part of your hips.</li>
              </ul>
            </InfoSection>
            <InfoSection heading="Between Sizes?">
              <p>
                Our fabrics have four-way stretch. For a compressive fit, take
                your usual size; for a relaxed fit, size up.
              </p>
            </InfoSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
