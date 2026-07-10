"use client";

import { ArrowRight, Award, Sofa, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { figmaHome } from "@/content/figmaHome";
import { site } from "@/content/site";

const serviceIcons = {
  Sofa,
  Sparkles,
  Users,
  Award,
} as const;

export function FigmaHomePage() {
  const { hero, services, showcase, testimonials } = figmaHome;

  return (
    <div className="figma-font-sans bg-black text-[#F5F5DC]">
      <section className="relative flex min-h-[calc(100vh-var(--nav-h))] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="flex h-full w-full items-center justify-center p-6 sm:p-10 md:p-14">
            <ImageWithFallback
              src={site.logo.src}
              alt=""
              className="max-h-full max-w-full object-contain"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/75" />
        </div>

        <div className="absolute left-10 top-10 hidden h-32 w-32 border-l-2 border-t-2 border-[#D4AF37]/30 sm:block" />
        <div className="absolute bottom-10 right-10 hidden h-32 w-32 border-b-2 border-r-2 border-[#D4AF37]/30 sm:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-5 inline-block rounded-full border border-[#F5F5DC]/30 px-4 py-2 sm:mb-6 sm:px-6">
            <span className="text-xs tracking-wide text-[#F5F5DC] sm:text-sm">{hero.badge}</span>
          </div>

          <h1 className="figma-font-serif mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {hero.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F5F5DC]" />
                <span className="text-sm tracking-wider text-[#F5F5DC] sm:text-base">{tag}</span>
              </div>
            ))}
          </div>

          <p className="mx-auto mb-10 max-w-3xl text-lg font-light text-[#F5F5DC]/80 sm:text-xl md:mb-12 md:text-2xl">
            {hero.subhead}
          </p>

          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8930A] px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Get a Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border border-[#F5F5DC]/30 px-8 py-4 text-center font-semibold text-[#F5F5DC] transition-all duration-300 hover:border-[#F5F5DC]/60"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-[#0A0A0A] px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <div className="mb-6 inline-block h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <h2 className="figma-font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              {services.kicker}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#F5F5DC]/70 sm:text-xl">{services.intro}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.items.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div
                  key={service.title}
                  className="group rounded-lg border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-6 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] sm:p-8"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent transition-transform group-hover:scale-110">
                    <Icon className="h-8 w-8 text-[#D4AF37]" aria-hidden />
                  </div>
                  <h3 className="figma-font-serif text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-[#F5F5DC]/70">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <div className="mb-6 inline-block h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <h2 className="figma-font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              {showcase.kicker}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#F5F5DC]/70 sm:text-xl">{showcase.intro}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {showcase.images.map((image, index) => (
              <Link
                key={image}
                href="/gallery"
                className="group relative block overflow-hidden rounded-lg border border-[#D4AF37]/20 transition-all duration-300 hover:border-[#D4AF37]"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Showcase ${index + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-80"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="figma-font-serif text-xl font-semibold text-[#D4AF37]">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D4AF37]/50 bg-transparent px-8 py-4 font-semibold text-[#D4AF37] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              View Full Gallery
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black to-[#0A0A0A] px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center md:mb-16">
            <div className="mb-6 inline-block h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <h2 className="figma-font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              {testimonials.kicker}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#F5F5DC]/70 sm:text-xl">{testimonials.intro}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.items.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-6 sm:p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" aria-hidden />
                  ))}
                </div>
                <p className="mb-6 italic text-[#F5F5DC]/80">&ldquo;{t.text}&rdquo;</p>
                <p className="figma-font-serif font-semibold text-[#D4AF37]">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
