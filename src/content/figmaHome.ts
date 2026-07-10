/**
 * Figma-style homepage copy & image URLs — edit here.
 */

export const figmaHome = {
  hero: {
    badge: "SINCE 2000",
    headline: ["Custom Upholstery &", "Furniture Restoration"],
    tags: ["Craftsmanship", "Quality", "Timeless Design"],
    subhead:
      "Bringing new life to your cherished furniture with expert craftsmanship and attention to detail",
    image: "/images/work/velvet-loveseat.webp",
    imageAlt: "Custom gray velvet loveseat finished in the studio",
  },
  services: {
    kicker: "Our Services",
    intro: "Expert craftsmanship for every need",
    items: [
      {
        title: "Reupholstery",
        desc: "Transform worn furniture with premium fabrics",
        icon: "Sofa" as const,
      },
      {
        title: "Custom Builds",
        desc: "Unique pieces crafted to your vision",
        icon: "Sparkles" as const,
      },
      {
        title: "Restoration",
        desc: "Preserve the beauty of antique furniture",
        icon: "Users" as const,
      },
      {
        title: "Commercial Work",
        desc: "Professional solutions for businesses",
        icon: "Award" as const,
      },
    ],
  },
  showcase: {
    kicker: "Our Work Speaks",
    intro: "Transformations that inspire",
    images: [
      "/images/work/boucle-armchair.webp",
      "/images/work/banquette-seating.webp",
      "/images/work/oak-leather-bench.webp",
    ],
  },
  testimonials: {
    kicker: "Client Testimonials",
    intro: "Trusted by discerning clients",
    items: [
      {
        name: "Sarah Mitchell",
        text: "Absolutely stunning work! They brought my grandmother's chair back to life with impeccable attention to detail.",
      },
      {
        name: "David Chen",
        text: "Professional, timely, and the quality is outstanding. I highly recommend New Work for any upholstery needs.",
      },
      {
        name: "Emma Rodriguez",
        text: "The custom sofa they created for us is a masterpiece. Worth every penny!",
      },
    ],
  },
} as const;
