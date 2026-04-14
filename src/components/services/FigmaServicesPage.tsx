import {
  Armchair,
  Building2,
  Hammer,
  Scissors,
  Sofa,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { figmaServices } from "@/content/figmaServices";

const icons = {
  Sofa,
  Armchair,
  Sparkles,
  Scissors,
  Hammer,
  Building2,
} as const;

export function FigmaServicesPage() {
  const { hero, items, pricing } = figmaServices;

  return (
    <div className="services-font-sans bg-black text-[#F5F5DC]">
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#D4AF37] opacity-10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-block h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <h1 className="services-font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-light text-[#F5F5DC]/70 md:text-2xl">
            {hero.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((service) => {
              const Icon = icons[service.icon];
              return (
                <div
                  key={service.title}
                  className="group overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                >
                  <div className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent transition-transform group-hover:scale-110">
                      <Icon className="h-8 w-8 text-[#D4AF37]" aria-hidden />
                    </div>

                    <h3 className="services-font-serif text-2xl font-bold">{service.title}</h3>
                    <p className="mb-6 mt-4 text-[#F5F5DC]/70">{service.description}</p>

                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-[#F5F5DC]/60"
                        >
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="block w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8930A] py-3 text-center font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    >
                      {pricing.quoteCta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1A1A1A] to-black p-8 text-center md:p-12">
            <h2 className="services-font-serif text-3xl font-bold">{pricing.title}</h2>
            <p className="mb-6 mt-4 text-lg text-[#F5F5DC]/70">{pricing.body}</p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8930A] px-8 py-4 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              {pricing.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
