/**
 * Central content & asset paths — edit here to update copy site-wide.
 * Swap `images.unsplash.com` URLs for `/images/your-file.jpg` when ready.
 */

export type NavItem = { label: string; href: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  category: "residential" | "commercial" | "restoration";
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const site = {
  name: "New Work Design Custom",
  tagline:
    "Bespoke reupholstery and restoration for discerning homes and distinguished spaces.",
  /** Used for metadata / OG — set to your production domain before launch */
  url: "https://example.com",
  email: "newworkcustomupholstery@gmail.com",
  phone: "(310) 293-9832",
  addressLine1: "1643 W Vernon Ave",
  addressLine2: "",
  cityStateZip: "Los Angeles, CA 90062",
  serviceArea:
    "Greater Los Angeles — by appointment. Travel available for select commercial projects.",
  hours: "Mon–Fri 9am–5pm · Sat 9am–3pm · Sun closed",
  /** Multi-line hours for the contact page card */
  hoursDetail: [
    "Monday - Friday: 9:00 AM - 5:00 PM",
    "Saturday: 9:00 AM - 3:00 PM",
    "Sunday: Closed",
  ] as const,
  social: {
    instagram: "https://www.instagram.com/newworkcustom",
    pinterest: "https://pinterest.com",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  /** Replace with your logo — same dimensions recommended for navbar */
  logo: {
    src: "/images/newwork-logo-nav.png",
    alt: "New Work Design Custom",
    width: 1254,
    height: 1254,
  },
  hero: {
    eyebrow: "Atelier · Since 1987",
    headline: "Where fabric meets\nenduring craft.",
    subhead:
      "Hand-finished upholstery, meticulous restoration, and custom pieces tailored to the architecture of your life.",
    primaryCta: { label: "Request a consultation", href: "/contact" },
    secondaryCta: { label: "View portfolio", href: "/gallery" },
    image: {
      src: "/images/work/velvet-loveseat.webp",
      alt: "Custom gray velvet loveseat finished in the studio",
    },
  },
  intro: {
    kicker: "The atelier",
    title: "A quiet devotion to the seat, the seam, and the silhouette.",
    paragraphs: [
      "New Work Design Custom is a small team of master upholsterers and textile specialists. We treat each commission as a singular piece of furniture history—honoring original joinery while elevating comfort, drape, and detail.",
      "From heirlooms awaiting a second life to showrooms requiring a cohesive visual language, we deliver museum-caliber workmanship with the warmth of a family-run studio.",
    ],
    stats: [
      { value: "35+", label: "Years of combined craft" },
      { value: "800+", label: "Pieces restored" },
      { value: "100%", label: "Bench-made in-house" },
    ],
  },
  servicesPreview: {
    kicker: "Capabilities",
    title: "Services shaped around your piece—not a catalog page.",
    intro:
      "Whether the frame is sound or needs structural care, we begin with listening: how you live, how you sit, and how the room should feel when the work is complete.",
  },
  services: [
    {
      slug: "sofa-reupholstery",
      title: "Sofa Reupholstery",
      short: "Full teardown, repair, and tailored recover in your chosen textile.",
      description:
        "We strip to the frame, replace or refresh suspension as needed, and rebuild cushions for balanced support. Pattern matching, welt, and skirt details are executed by hand for a showroom finish.",
    },
    {
      slug: "chair-restoration",
      title: "Chair Restoration",
      short: "Dining, lounge, and accent seating brought back with integrity.",
      description:
        "Loose joints, worn padding, and tired covers disappear under careful restoration. We preserve provenance where it matters and discreetly modernize comfort where it counts.",
    },
    {
      slug: "custom-upholstery",
      title: "Custom Upholstery",
      short: "Original designs and bespoke builds from concept to installation.",
      description:
        "Collaborate with our team on silhouettes, foam profiles, and fabric direction. We prototype details, source responsibly, and deliver pieces that anchor a room.",
    },
    {
      slug: "cushion-replacement",
      title: "Cushion Replacement",
      short: "Renewed cores, refined fill, and covers that sit just right.",
      description:
        "Down-wrapped, high-resilience, or hybrid constructions—specified for your use case. We pattern from existing covers or engineer new ones for a crisp, tailored fit.",
    },
    {
      slug: "leather-vinyl-repair",
      title: "Leather / Vinyl Repair",
      short: "Color correction, patching, and conditioning for premium hides.",
      description:
        "Cosmetic and structural repairs for automotive, marine, and residential applications. We match grain and sheen so repairs recede into the whole.",
    },
    {
      slug: "commercial-upholstery",
      title: "Commercial Upholstery",
      short: "Hospitality, retail, and office programs with dependable timelines.",
      description:
        "CFM-compliant materials, documented specs, and batch consistency across locations. White-glove delivery and on-site finishing available.",
    },
  ] satisfies Service[],
  galleryPreview: {
    kicker: "Portfolio",
    title: "Rooms that carry a hush of permanence.",
    intro:
      "A glimpse of recent residential and commercial work. Each project balances tactility, proportion, and light.",
    cta: { label: "Explore full gallery", href: "/gallery" },
  },
  whyUs: {
    kicker: "Why New Work",
    title: "Trust earned one staple at a time.",
    points: [
      {
        title: "Materials with lineage",
        body: "European mills, heritage velvets, performance weaves, and leathers selected for patina—not obsolescence.",
      },
      {
        title: "Transparent timelines",
        body: "Clear milestones from yardage approval to white-glove delivery. You always know where your piece is in the queue.",
      },
      {
        title: "Quiet luxury",
        body: "No excess ornament—only disciplined tailoring, whisper-thin welts, and borders that read as architecture.",
      },
    ],
  },
  testimonials: {
    kicker: "Kind words",
    title: "Clients who sit with the results every day.",
    items: [
      {
        quote:
          "They treated our Gio Ponti chairs like cultural artifacts. The wool they suggested wears like iron yet feels like silk.",
        name: "Elena M.",
        detail: "Upper West Side residence",
      },
      {
        quote:
          "Our boutique’s banquettes had to survive brunch service and still look editorial. New Work delivered—twice.",
        name: "Marcus T.",
        detail: "Hospitality operator",
      },
      {
        quote:
          "The sofa was my grandmother’s. I assumed the frame was lost. They proved me wrong, beautifully.",
        name: "Priya S.",
        detail: "Heirloom restoration",
      },
    ] satisfies Testimonial[],
  },
  finalCta: {
    title: "Reserve a bench date for your piece.",
    body: "Share dimensions, photos, and inspiration. We reply within two business days with next steps.",
    primary: { label: "Start your project", href: "/contact" },
    secondary: { label: "Our services", href: "/services" },
  },
  footer: {
    tagline:
      "Custom upholstery, restoration, and textile direction for homes and brands that value permanence over trends.",
  },
  gallery: [
    {
      id: "1",
      title: "Cream bouclé armchair",
      category: "residential",
      src: "/images/work/boucle-armchair.webp",
      alt: "Modern cream bouclé armchair with curved silhouette",
      width: 1200,
      height: 900,
    },
    {
      id: "2",
      title: "Gray velvet loveseat",
      category: "residential",
      src: "/images/work/velvet-loveseat.webp",
      alt: "Custom gray velvet loveseat with skirted base",
      width: 1200,
      height: 900,
    },
    {
      id: "3",
      title: "Oak leather banquette",
      category: "commercial",
      src: "/images/work/banquette-seating.webp",
      alt: "Custom oak banquette with taupe leather cushions",
      width: 1200,
      height: 900,
    },
    {
      id: "4",
      title: "Oak leather bench",
      category: "commercial",
      src: "/images/work/oak-leather-bench.webp",
      alt: "Custom oak bench with taupe leather seat cushion",
      width: 1200,
      height: 900,
    },
    {
      id: "5",
      title: "Cane-back armchair",
      category: "restoration",
      src: "/images/work/cane-back-armchair.webp",
      alt: "French provincial armchair with cane back and new upholstery",
      width: 1200,
      height: 900,
    },
    {
      id: "6",
      title: "Navy ball chair",
      category: "residential",
      src: "/images/work/ball-chair-navy.webp",
      alt: "White ball chair with navy blue interior upholstery",
      width: 1200,
      height: 900,
    },
    {
      id: "7",
      title: "Wire-frame lounge chair",
      category: "residential",
      src: "/images/work/wire-frame-chair.webp",
      alt: "Chrome wire-frame chair with rust bouclé upholstery",
      width: 1200,
      height: 900,
    },
    {
      id: "8",
      title: "Cantilever chair",
      category: "restoration",
      src: "/images/work/cantilever-chair.jpg",
      alt: "Chrome cantilever chair with wood accents and dark upholstery",
      width: 1200,
      height: 900,
    },
    {
      id: "9",
      title: "Patterned accent pillow",
      category: "residential",
      src: "/images/work/patterned-pillow.webp",
      alt: "Custom cream pillow with black sunburst pattern",
      width: 1200,
      height: 900,
    },
    {
      id: "10",
      title: "Custom woodwork detail",
      category: "commercial",
      src: "/images/work/woodwork-detail.webp",
      alt: "Close-up of custom rounded wood furniture construction",
      width: 1200,
      height: 900,
    },
    {
      id: "11",
      title: "Ball chair outdoors",
      category: "residential",
      src: "/images/work/ball-chair-outdoor.webp",
      alt: "White ball chair with navy cushions photographed outdoors",
      width: 1200,
      height: 900,
    },
    {
      id: "12",
      title: "Textured interior finish",
      category: "commercial",
      src: "/images/work/textured-interior.webp",
      alt: "Textured teal and terracotta walls with custom upholstery accents",
      width: 1200,
      height: 900,
    },
  ] satisfies GalleryItem[],
  contactPage: {
    heroTitle: "Get In Touch",
    heroSubtitle:
      "Let's discuss how we can bring your furniture vision to life",
    formTitle: "Book a Consultation",
    infoCardTitle: "Contact Information",
    serviceAreaTitle: "Service Area",
    serviceAreaIntro:
      "We proudly serve the greater Los Angeles area, including:",
    serviceAreaCities: [
      "Downtown Los Angeles",
      "Beverly Hills",
      "Santa Monica",
      "Pasadena",
      "West Hollywood",
      "Culver City",
    ] as const,
    mapLabel: "Map View",
    instagramHandle: "@newworkcustom",
  },
} as const;

export const galleryCategories = [
  { id: "all", label: "All work" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "restoration", label: "Restoration" },
] as const;
