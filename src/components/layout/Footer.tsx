import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-charcoal-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-8 md:grid-cols-[1.1fr_1fr_1fr] md:py-12">
        <div className="space-y-4">
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            className="h-16 w-auto max-w-full opacity-95 sm:h-20"
          />
          <p className="max-w-sm text-sm leading-relaxed text-cream-muted">
            {site.footer.tagline}
          </p>
        </div>
        <div>
          <p className="font-serif text-lg text-cream">Visit the studio</p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-cream-muted">
            {site.addressLine1}
            {site.addressLine2 ? (
              <>
                <br />
                {site.addressLine2}
              </>
            ) : null}
            <br />
            {site.cityStateZip}
          </address>
          <p className="mt-4 text-sm text-cream-muted">{site.hours}</p>
        </div>
        <div>
          <p className="font-serif text-lg text-cream">Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-cream-muted">
            <li>
              <a
                className="transition hover:text-gold"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </li>
            <li>
              <a className="transition hover:text-gold" href={`tel:${site.phone.replace(/\D/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li className="pt-2">
              <Link className="text-gold transition hover:text-cream" href="/contact">
                Request a consultation →
              </Link>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-cream-muted">
            <a
              href={site.social.instagram}
              className="border-b border-transparent pb-0.5 transition hover:border-gold hover:text-cream"
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              href={site.social.pinterest}
              className="border-b border-transparent pb-0.5 transition hover:border-gold hover:text-cream"
              rel="noreferrer"
              target="_blank"
            >
              Pinterest
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle py-5 text-center text-xs tracking-wide text-cream-muted/80">
        © {new Date().getFullYear()} {site.name}. Crafted with care.
      </div>
    </footer>
  );
}
