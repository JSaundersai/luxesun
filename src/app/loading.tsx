export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-parchment">
      <div className="w-8 h-8 border-2 border-border-warm border-t-terracotta rounded-full animate-spin" />
      <p className="font-sans text-[0.8rem] tracking-[0.12em] uppercase text-stone-gray">Loading</p>
    </div>
  );
}
