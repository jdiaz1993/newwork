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
    image:
      "https://images.unsplash.com/photo-1759229874865-20a8c780c86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2ZWx2ZXQlMjBzb2ZhJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc2MDQzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
    imageAlt: "Luxury interior with upholstered sofa",
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
      "https://images.unsplash.com/photo-1769843356632-7f22cdeadf13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYXJtY2hhaXIlMjB1cGhvbHN0ZXJ5fGVufDF8fHx8MTc3NjA0MzEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1716762260024-bc2238f971ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGVhdGhlciUyMGNoYWlyJTIwcmVzdG9yYXRpb258ZW58MXx8fHwxNzc2MDQzMTIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1655149588765-eaef8567283c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb2ZhJTIwcmV1cGhvbHN0ZXJ5fGVufDF8fHx8MTc3NjA0MzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
