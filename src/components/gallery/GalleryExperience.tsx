"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/content/site";
import { galleryCategories } from "@/content/site";

type FilterId = (typeof galleryCategories)[number]["id"];

export function GalleryExperience({ items }: { items: readonly GalleryItem[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.category === filter);
  }, [filter, items]);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {galleryCategories.map((c) => {
          const selected = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                selected
                  ? "border-gold bg-gold/15 text-cream"
                  : "border-border-subtle text-cream-muted hover:border-gold/35 hover:text-cream"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group relative block w-full overflow-hidden rounded-sm border border-border-subtle text-left transition hover:border-gold/35"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition group-hover:bg-charcoal/25" />
              </div>
              <div className="border-t border-border-subtle bg-charcoal-elevated/90 px-4 py-3">
                <p className="font-serif text-lg text-cream">{item.title}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream-muted">
                  {item.category}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-sm border border-border-subtle px-3 py-2 text-xs font-semibold uppercase tracking-widest text-cream transition hover:border-gold"
            onClick={close}
          >
            Close
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-sm border border-gold/25 bg-charcoal-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[75vh] w-full sm:aspect-video">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain bg-black/40"
                sizes="100vw"
                priority
              />
            </div>
            <div className="border-t border-border-subtle px-6 py-4">
              <p className="font-serif text-2xl text-cream">{active.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream-muted">
                {active.category}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
