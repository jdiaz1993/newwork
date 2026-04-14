/**
 * Figma-style services page — edit copy and feature lists here.
 */

export const figmaServices = {
  hero: {
    title: "Our Services",
    subtitle:
      "Premium upholstery and restoration services crafted with passion and precision",
  },
  pricing: {
    title: "Custom Pricing",
    body: "Prices vary based on material selection, labor complexity, and project scope. Each piece is unique, and we provide detailed quotes after an initial consultation.",
    cta: "Schedule Free Consultation",
    quoteCta: "Request Quote",
  },
  items: [
    {
      icon: "Sofa" as const,
      title: "Sofa Reupholstery",
      description:
        "Transform your worn sofa with premium fabrics and expert craftsmanship. We restore comfort and beauty to your favorite pieces.",
      features: [
        "Premium fabric selection",
        "Custom cushion replacement",
        "Frame repair included",
        "Color consultation",
      ],
    },
    {
      icon: "Armchair" as const,
      title: "Chair Restoration",
      description:
        "Breathe new life into antique and modern chairs. Our meticulous restoration process preserves the integrity while updating the look.",
      features: [
        "Period-appropriate materials",
        "Structural reinforcement",
        "Detail preservation",
        "Stain & finish matching",
      ],
    },
    {
      icon: "Sparkles" as const,
      title: "Custom Furniture Design",
      description:
        "Create unique pieces tailored to your exact specifications. From concept to completion, we bring your vision to life.",
      features: [
        "Personalized design consultation",
        "Bespoke measurements",
        "Unlimited fabric options",
        "One-of-a-kind creation",
      ],
    },
    {
      icon: "Scissors" as const,
      title: "Leather Repair",
      description:
        "Expert leather restoration and repair services. We match textures, colors, and finishes to make damage disappear.",
      features: [
        "Color matching",
        "Texture restoration",
        "Tear & scratch repair",
        "Conditioning treatment",
      ],
    },
    {
      icon: "Hammer" as const,
      title: "Frame Reconstruction",
      description:
        "Structural repairs for damaged furniture frames. We rebuild and reinforce to ensure longevity and stability.",
      features: [
        "Wood replacement",
        "Joint reinforcement",
        "Spring retying",
        "Full structural assessment",
      ],
    },
    {
      icon: "Building2" as const,
      title: "Commercial Upholstery",
      description:
        "Professional solutions for restaurants, hotels, and offices. Durable materials and efficient turnaround times.",
      features: [
        "Bulk pricing available",
        "Commercial-grade fabrics",
        "Quick turnaround",
        "On-site consultation",
      ],
    },
  ],
} as const;
