"use client";

import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

export function ContactStudio() {
  const c = site.contactPage;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorHint, setErrorHint] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorHint(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        message?: string;
        detail?: string;
        hint?: string;
      };

      if (!res.ok) {
        if (res.status === 503 && data.error === "not_configured") {
          setErrorHint(
            data.message ??
              "Email is not configured on the server yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL to .env.local (see .env.example), then restart the dev server.",
          );
        } else if (data.error === "send_failed") {
          const parts = [
            data.detail ? `Resend: ${data.detail}` : null,
            data.hint ?? null,
          ].filter(Boolean);
          setErrorHint(
            parts.length > 0
              ? parts.join(" ")
              : "The email provider rejected the send. Check RESEND_API_KEY, CONTACT_FROM_EMAIL (domain must be verified in Resend), and Resend dashboard logs.",
          );
        } else if (data.error === "invalid_email") {
          setErrorHint("Please enter a valid email address in the form.");
        } else {
          setErrorHint("Please try again or reach us by phone or email.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorHint("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="contact-font-sans bg-black text-[#F5F5DC]">
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-block h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <h1 className="contact-font-serif text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {c.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-light text-[#F5F5DC]/70 md:text-2xl">
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-8 md:p-10">
              <h2 className="contact-font-serif text-3xl font-bold">{c.formTitle}</h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-[#F5F5DC]/70">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-[#F5F5DC] transition-all duration-300 placeholder:text-[#F5F5DC]/30 focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#F5F5DC]/70">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-[#F5F5DC] transition-all duration-300 placeholder:text-[#F5F5DC]/30 focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
                    placeholder="(323) 555-1234"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#F5F5DC]/70">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-[#F5F5DC] transition-all duration-300 placeholder:text-[#F5F5DC]/30 focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[#F5F5DC]/70">
                    Project Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-lg border border-[#D4AF37]/20 bg-black/50 px-4 py-3 text-[#F5F5DC] transition-all duration-300 placeholder:text-[#F5F5DC]/30 focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
                    placeholder="Tell us about your upholstery project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8930A] py-4 font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>

                {status === "success" ? (
                  <p className="text-center text-sm text-[#D4AF37]">
                    Thank you for your inquiry! We&apos;ll be in touch soon.
                  </p>
                ) : null}
                {status === "error" ? (
                  <div className="space-y-2 text-center text-sm text-red-300/90">
                    <p>Something went wrong. Please call or email us directly.</p>
                    {errorHint ? (
                      <p className="text-xs leading-relaxed text-[#F5F5DC]/50">{errorHint}</p>
                    ) : null}
                  </div>
                ) : null}
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-8">
                <h3 className="contact-font-serif text-2xl font-bold">
                  {c.infoCardTitle}
                </h3>

                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                      <Phone className="h-6 w-6 text-[#D4AF37]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Phone</h4>
                      <a
                        href={`tel:${site.phone.replace(/\D/g, "")}`}
                        className="text-[#F5F5DC]/70 transition hover:text-[#D4AF37]"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                      <Mail className="h-6 w-6 text-[#D4AF37]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Email</h4>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-[#F5F5DC]/70 transition hover:text-[#D4AF37]"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                      <MapPin className="h-6 w-6 text-[#D4AF37]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Location</h4>
                      <p className="text-[#F5F5DC]/70">
                        {site.addressLine1}
                        <br />
                        {site.cityStateZip}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                      <Clock className="h-6 w-6 text-[#D4AF37]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Hours</h4>
                      <p className="text-[#F5F5DC]/70">
                        {site.hoursDetail.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent">
                      <Instagram className="h-6 w-6 text-[#D4AF37]" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold">Instagram</h4>
                      <a
                        href={site.social.instagram}
                        className="text-[#D4AF37] transition hover:underline"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {c.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-8">
                <h3 className="contact-font-serif text-2xl font-bold">
                  {c.serviceAreaTitle}
                </h3>
                <p className="mb-4 mt-4 text-[#F5F5DC]/70">{c.serviceAreaIntro}</p>
                <ul className="space-y-2">
                  {c.serviceAreaCities.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-2 text-[#F5F5DC]/70"
                    >
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex h-96 items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-[#D4AF37]" aria-hidden />
              <p className="text-[#F5F5DC]/70">{c.mapLabel}</p>
              <p className="mt-2 max-w-md px-4 text-xs text-[#F5F5DC]/40">
                Embed Google Maps here later, or link to maps with your studio address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
