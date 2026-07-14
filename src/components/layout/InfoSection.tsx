interface InfoSectionProps {
  heading: string;
  children: React.ReactNode;
}

/** Consistent heading + body block for support and legal pages. */
export default function InfoSection({ heading, children }: InfoSectionProps) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-[1.5rem] md:text-[1.7rem] text-near-black mb-3">
        {heading}
      </h2>
      <div className="font-sans text-[0.98rem] leading-[1.8] text-olive-gray space-y-3">
        {children}
      </div>
    </div>
  );
}
