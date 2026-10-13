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
        name: "Karen P.",
        text: "I was searching for someone who could make custom cushions for a window seat on a design project… The final results speak for themselves, and the picture doesn't truly capture how beautiful it is in person. The craftsmanship is excellent and the fabric is great quality!!! If you're looking for quality work with great service, look no further!",
      },
      {
        name: "E H.",
        text: "Ricardo was wonderful! Quick to answer and very good service. He also replaced the filling with new stuffing to make sure it was smooth when putting the cover back on. THANK YOU! Very good pricing as well… New Work was wonderful. Highly recommended",
      },
      {
        name: "Rolf G.",
        text: "Contacted Ricardo to get my sofa repaired and he got back to me real quickly with a quote that was less than other companies… Only took a week to repair and he delivered the sofa looking brand new! Highly recommend using New Work Design for your sofa or furniture repairs. Great work and great value!!",
      },
    ],
    source: "Yelp",
  },
} as const;
