"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border-subtle bg-charcoal/90 backdrop-blur-md"
          : "border-transparent bg-charcoal/70 backdrop-blur-sm"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-8 xl:max-w-7xl 2xl:max-w-[1500px] 2xl:px-10">
        <Link
          href="/"
          className="relative z-10 shrink-0 font-serif text-base font-semibold tracking-wide text-gold transition hover:text-cream sm:text-lg"
        >
          New Work Custom Design
        </Link>
        <nav
          className="hidden items-center justify-end gap-7 md:flex"
          aria-label="Primary"
        >
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "text-gold"
                    : "text-cream-muted hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex justify-end md:hidden">
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border-subtle bg-charcoal-elevated/70 text-cream shadow-sm transition hover:border-gold/60"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`h-0.5 w-5 rounded-full bg-current transition ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full bg-current transition ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 rounded-full bg-current transition ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-border-subtle bg-charcoal/95 px-4 py-4 shadow-2xl backdrop-blur-md animate-fade-in"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium tracking-wide transition ${
                    active
                      ? "bg-gold/15 text-gold"
                      : "text-cream-muted hover:bg-cream/5 hover:text-cream"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
