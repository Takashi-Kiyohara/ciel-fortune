import Link from "next/link";
import { fortunes } from "@/data/fortunes";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return fortunes.map((f) => ({ country: f.slug }));
}

export default async function FortunePage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const fortune = fortunes.find((f) => f.slug === country);

  if (!fortune) return notFound();

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-serif-en text-[#c4a265]/40 text-xs tracking-[0.3em] mb-6 uppercase">
        Coming Soon
      </p>

      <h1 className="text-2xl sm:text-3xl text-[#e8e4df] tracking-wide mb-4">
        {fortune.name}
      </h1>

      <p className="text-sm text-[#e8e4df]/35 mb-3">
        {fortune.country}
        {fortune.city ? ` / ${fortune.city}` : ""}
      </p>

      <p className="text-sm leading-[2] text-[#e8e4df]/30 max-w-md mb-16">
        {fortune.shortDescription}
      </p>

      <p className="text-xs text-[#e8e4df]/20 mb-10">
        この占いは現在準備中です
      </p>

      <Link
        href="/"
        className="inline-block border border-[#c4a265]/30 text-[#c4a265]/60 text-xs tracking-[0.15em] px-8 py-3 rounded hover:bg-[#c4a265] hover:text-[#0d0d1a] transition-all duration-500"
      >
        トップに戻る
      </Link>
    </div>
  );
}
