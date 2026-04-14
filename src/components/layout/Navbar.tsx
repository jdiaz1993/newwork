"use client";

import Image from "next/image";
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
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>
        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary"
        >
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
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
        <Link
          href="/contact"
          className="hidden rounded-sm border border-gold/50 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:border-gold hover:bg-gold/20 md:inline-flex"
        >
          Request quote
        </Link>
        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-sm border border-border-subtle px-3 py-2 text-xs font-semibold uppercase tracking-widest text-cream"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-border-subtle bg-charcoal-elevated px-5 py-5 shadow-xl animate-fade-in"
        >
          <div className="flex flex-col gap-4">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wide ${
                    active ? "text-gold" : "text-cream-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 rounded-sm border border-gold/50 bg-gold/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cream"
            >
              Request quote
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
