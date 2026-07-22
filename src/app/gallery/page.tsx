import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Selected residential, commercial, and restoration upholstery work.",
};

export default function GalleryPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border-subtle bg-charcoal-elevated/30 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Gallery
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl text-cream sm:text-4xl md:text-5xl">
            A portfolio of texture, tone, and tact.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-muted sm:text-lg">
            Selected residential, commercial, and restoration work from the
            studio — each piece finished with care and attention to detail.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <GalleryExperience items={site.gallery} />
      </section>
    </main>
  );
}
