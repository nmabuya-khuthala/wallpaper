import type { Product } from '@/types';

// ─── Sample Product Data ──────────────────────────────────────────────────────
// These demo products showcase the data model. Replace with real products from
// your database (Supabase / API) in production.
// Gallery images are sourced from /gallery/1.jpg – /gallery/10.jpg

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'golden-botanica',
    name: 'Golden Botanica',
    description:
      'Lush botanical illustration in warm gold and terracotta tones. Brings life and richness to any wall.',
    longDescription: `Golden Botanica is our signature botanical collection — a celebration of nature's most striking leaves and blooms rendered in warm gold, terracotta, and deep green. Each panel is individually printed to your wall's exact dimensions, ensuring a seamless, gallery-quality finish.

Whether you're transforming a living room feature wall or creating a dramatic bedroom backdrop, Golden Botanica adds an instant sense of luxury.`,
    category: 'nature-botanicals',
    style: ['botanical'],
    rooms: ['living-room', 'bedroom', 'dining-room', 'entrance'],
    colours: ['gold', 'terracotta', 'green', 'cream'],
    images: [
      { url: '/gallery/1.jpg', alt: 'Golden Botanica wallpaper full view', isPrimary: true },
      { url: '/gallery/2.jpg', alt: 'Golden Botanica detail close-up' },
      { url: '/gallery/5.jpg', alt: 'Golden Botanica room setting' },
    ],
    measurements: {
      panelWidth: 0.53,
      panelHeight: 2.65,
      rollWidth: 0.53,
      rollLength: 10,
      coveragePerRoll: 5.3,
      wasteAllowance: 10,
    },
    pricing: {
      basePrice: 1250,
      pricePerSqm: 890,
      installationPrice: 450,
    },
    availableFinishes: ['matte', 'satin', 'non-woven'],
    defaultFinish: 'matte',
    featured: true,
    available: true,
    rating: 4.9,
    reviewCount: 124,
    tags: ['botanical', 'gold', 'bestseller', 'featured'],
    seo: {
      title: 'Golden Botanica Bespoke Wallpaper | Haosail',
      description:
        'Luxury botanical wallpaper in warm gold and terracotta. Printed to your exact wall dimensions. Shop Golden Botanica at Haosail.',
      keywords: ['botanical wallpaper', 'gold wallpaper', 'luxury wallpaper', 'feature wall'],
    },
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'prod-002',
    slug: 'sunday-blooms',
    name: 'Sunday Blooms',
    description:
      'A burst of colourful floral energy — bold blooms in coral, cobalt, mustard and soft pink.',
    longDescription: `Sunday Blooms was designed for spaces that deserve personality. This bold, joyful floral pattern features oversized blooms in a curated palette of coral, cobalt, mustard and soft pink.

Perfect for a statement living room wall, a vibrant dining room, or a bedroom that refuses to be boring. Sunday Blooms is printed on premium non-woven paper for easy installation.`,
    category: 'bespoke-wallpaper',
    style: ['floral'],
    rooms: ['living-room', 'bedroom', 'dining-room', 'nursery'],
    colours: ['coral', 'cobalt', 'mustard', 'pink', 'white'],
    images: [
      { url: '/gallery/2.jpg', alt: 'Sunday Blooms full pattern', isPrimary: true },
      { url: '/gallery/3.jpg', alt: 'Sunday Blooms detail' },
      { url: '/gallery/7.jpg', alt: 'Sunday Blooms living room' },
    ],
    measurements: {
      panelWidth: 0.53,
      panelHeight: 2.65,
      rollWidth: 0.53,
      rollLength: 10,
      coveragePerRoll: 5.3,
      wasteAllowance: 12,
    },
    pricing: {
      basePrice: 1150,
      pricePerSqm: 820,
      installationPrice: 450,
    },
    availableFinishes: ['matte', 'satin', 'non-woven', 'peel-and-stick'],
    defaultFinish: 'non-woven',
    featured: true,
    available: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ['floral', 'colourful', 'bold', 'featured'],
    seo: {
      title: 'Sunday Blooms Floral Wallpaper | Haosail',
      description:
        'Bold colourful floral wallpaper. Coral, cobalt and mustard blooms. Custom-sized for your wall. Shop Sunday Blooms at Haosail.',
      keywords: ['floral wallpaper', 'colourful wallpaper', 'bold wallpaper'],
    },
    createdAt: '2025-01-20T08:00:00Z',
  },
  {
    id: 'prod-003',
    slug: 'little-explorer',
    name: 'Little Explorer',
    description:
      'Adventure-themed childrens wallpaper packed with maps, compasses, hot air balloons and wildlife.',
    longDescription: `Little Explorer turns any child's room into a world of adventure. Featuring hand-illustrated maps, friendly animals, hot air balloons, mountains and secret paths, this design sparks curiosity and creativity.

Printed on child-safe, wipe-clean vinyl for easy maintenance. Available in a warm rainbow palette or our popular muted pastels edition.`,
    category: 'kids-nurseries',
    style: ['illustrated'],
    rooms: ['kids-room', 'nursery'],
    colours: ['blue', 'green', 'coral', 'cream', 'mustard'],
    images: [
      { url: '/gallery/3.jpg', alt: 'Little Explorer adventure wallpaper', isPrimary: true },
      { url: '/gallery/4.jpg', alt: 'Little Explorer detail' },
      { url: '/gallery/8.jpg', alt: 'Little Explorer nursery setting' },
    ],
    measurements: {
      panelWidth: 0.53,
      panelHeight: 2.65,
      rollWidth: 0.53,
      rollLength: 10,
      coveragePerRoll: 5.3,
      wasteAllowance: 10,
    },
    pricing: {
      basePrice: 980,
      pricePerSqm: 750,
      installationPrice: 450,
    },
    availableFinishes: ['matte', 'vinyl', 'peel-and-stick'],
    defaultFinish: 'vinyl',
    featured: true,
    available: true,
    rating: 5.0,
    reviewCount: 67,
    tags: ['kids', 'adventure', 'nursery', 'illustrated', 'featured'],
    seo: {
      title: 'Little Explorer Children\'s Wallpaper | Haosail',
      description:
        'Adventure-themed wallpaper for kids rooms and nurseries. Custom-sized, child-safe. Shop Little Explorer at Haosail.',
      keywords: ['kids wallpaper', 'children wallpaper', 'nursery wallpaper', 'adventure wallpaper'],
    },
    createdAt: '2025-02-01T08:00:00Z',
  },
  {
    id: 'prod-004',
    slug: 'african-sunset',
    name: 'African Sunset',
    description:
      'A breathtaking landscape mural of an African sunset — warm oranges, deep purples and silhouetted acacia trees.',
    longDescription: `African Sunset is our most dramatic mural — a sweeping landscape that transforms any feature wall into a window to the African savannah. The design captures the deep oranges, corals and purples of a perfect sunset behind iconic acacia silhouettes.

Available as a full-wall mural or a triptych panel set. Printed at ultra-high resolution on heavy-duty non-woven for a truly immersive effect.`,
    category: 'feature-walls',
    style: ['landscape', 'photographic'],
    rooms: ['living-room', 'bedroom', 'dining-room', 'home-office', 'entertainment-room'],
    colours: ['orange', 'terracotta', 'purple', 'coral', 'charcoal'],
    images: [
      { url: '/gallery/4.jpg', alt: 'African Sunset mural full view', isPrimary: true },
      { url: '/gallery/1.jpg', alt: 'African Sunset detail' },
      { url: '/gallery/9.jpg', alt: 'African Sunset room setting' },
    ],
    measurements: {
      panelWidth: 1.0,
      panelHeight: 2.65,
      rollWidth: 1.0,
      rollLength: 2.65,
      coveragePerRoll: 2.65,
      wasteAllowance: 5,
    },
    pricing: {
      basePrice: 2200,
      pricePerSqm: 1100,
      installationPrice: 550,
    },
    availableFinishes: ['matte', 'satin', 'non-woven'],
    defaultFinish: 'satin',
    featured: true,
    available: true,
    rating: 4.9,
    reviewCount: 201,
    tags: ['mural', 'landscape', 'feature-wall', 'africa', 'bestseller', 'featured'],
    seo: {
      title: 'African Sunset Feature Wall Mural | Haosail',
      description:
        'Dramatic African sunset mural for feature walls. Ultra-high resolution print. Custom wall size. Shop African Sunset at Haosail.',
      keywords: ['feature wall mural', 'african wallpaper', 'sunset mural', 'landscape wallpaper'],
    },
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'prod-005',
    slug: 'modern-earth',
    name: 'Modern Earth',
    description:
      'Clean, sophisticated geometric shapes in warm earth tones. Minimal, modern, timeless.',
    longDescription: `Modern Earth brings architectural calm to any space. Clean geometric shapes — arcs, rectangles, and organic curves — are layered in warm sand, terracotta, cream and charcoal.

This design works beautifully in home offices, bedrooms, and minimalist living rooms. It's quiet enough to live with every day, yet striking enough to draw the eye.`,
    category: 'bespoke-wallpaper',
    style: ['geometric', 'minimalist'],
    rooms: ['living-room', 'bedroom', 'home-office', 'entrance'],
    colours: ['terracotta', 'cream', 'sand', 'charcoal', 'warm-white'],
    images: [
      { url: '/gallery/5.jpg', alt: 'Modern Earth geometric wallpaper', isPrimary: true },
      { url: '/gallery/6.jpg', alt: 'Modern Earth close-up detail' },
      { url: '/gallery/10.jpg', alt: 'Modern Earth home office' },
    ],
    measurements: {
      panelWidth: 0.53,
      panelHeight: 2.65,
      rollWidth: 0.53,
      rollLength: 10,
      coveragePerRoll: 5.3,
      wasteAllowance: 10,
    },
    pricing: {
      basePrice: 1050,
      pricePerSqm: 780,
      installationPrice: 450,
    },
    availableFinishes: ['matte', 'satin', 'textured', 'non-woven'],
    defaultFinish: 'matte',
    featured: false,
    available: true,
    rating: 4.7,
    reviewCount: 55,
    tags: ['geometric', 'minimal', 'earth-tones', 'modern'],
    seo: {
      title: 'Modern Earth Geometric Wallpaper | Haosail',
      description:
        'Minimalist geometric wallpaper in warm earth tones. Custom-printed for your wall. Shop Modern Earth at Haosail.',
      keywords: ['geometric wallpaper', 'minimalist wallpaper', 'earth tone wallpaper'],
    },
    createdAt: '2025-02-10T08:00:00Z',
  },
  {
    id: 'prod-006',
    slug: 'family-memories',
    name: 'Family Memories',
    description:
      'Turn your favourite family photographs into a stunning custom photo wall. Your story, beautifully told.',
    longDescription: `Family Memories is our custom photo wall service. You upload your favourite family photographs, and our design team creates a beautifully composed photographic wall panel sized precisely for your space.

Choose from a clean grid layout, an organic collage, or our editorial editorial-magazine-style layout. Printed on premium fine-art paper with vibrant, archival-quality inks.`,
    category: 'family-portraits',
    style: ['photographic'],
    rooms: ['living-room', 'bedroom', 'entrance', 'entertainment-room'],
    colours: ['custom'],
    images: [
      { url: '/gallery/6.jpg', alt: 'Family Memories photo wall', isPrimary: true },
      { url: '/gallery/7.jpg', alt: 'Family Memories close-up' },
      { url: '/gallery/8.jpg', alt: 'Family Memories room view' },
    ],
    measurements: {
      panelWidth: 1.0,
      panelHeight: 2.65,
      rollWidth: 1.0,
      rollLength: 2.65,
      coveragePerRoll: 2.65,
      wasteAllowance: 5,
    },
    pricing: {
      basePrice: 2800,
      pricePerSqm: 1350,
      installationPrice: 550,
    },
    availableFinishes: ['matte', 'satin', 'gloss'],
    defaultFinish: 'satin',
    featured: true,
    available: true,
    rating: 5.0,
    reviewCount: 312,
    tags: ['family', 'portrait', 'custom', 'photo-wall', 'bestseller', 'featured'],
    seo: {
      title: 'Family Memories Custom Photo Wall | Haosail',
      description:
        'Turn your family photos into a beautiful custom photo wall. Professionally designed and printed. Shop Family Memories at Haosail.',
      keywords: ['custom photo wall', 'family portrait wall', 'photo wallpaper', 'custom wallpaper'],
    },
    createdAt: '2025-01-05T08:00:00Z',
  },
  {
    id: 'prod-007',
    slug: 'wild-and-free',
    name: 'Wild & Free',
    description:
      'A bold, vibrant tropical mural bursting with parrots, leaves and exotic flowers in electric colour.',
    longDescription: `Wild & Free is for those who believe walls should never be boring. This vivid tropical mural explodes with colour — electric turquoise leaves, magenta blooms, golden parrots and layers of lush tropical foliage.

A single wall of Wild & Free transforms a room from ordinary to extraordinary. Available as a full-wall seamless mural or in individual repeat-tile format.`,
    category: 'feature-walls',
    style: ['tropical', 'botanical'],
    rooms: ['living-room', 'dining-room', 'entertainment-room', 'bedroom'],
    colours: ['turquoise', 'magenta', 'gold', 'green', 'coral'],
    images: [
      { url: '/gallery/7.jpg', alt: 'Wild and Free tropical mural', isPrimary: true },
      { url: '/gallery/2.jpg', alt: 'Wild and Free colour detail' },
      { url: '/gallery/5.jpg', alt: 'Wild and Free room transformation' },
    ],
    measurements: {
      panelWidth: 1.0,
      panelHeight: 2.65,
      rollWidth: 1.0,
      rollLength: 2.65,
      coveragePerRoll: 2.65,
      wasteAllowance: 8,
    },
    pricing: {
      basePrice: 2400,
      pricePerSqm: 1200,
      installationPrice: 550,
    },
    availableFinishes: ['matte', 'satin', 'non-woven'],
    defaultFinish: 'satin',
    featured: false,
    available: true,
    rating: 4.8,
    reviewCount: 78,
    tags: ['tropical', 'bold', 'colourful', 'mural', 'feature-wall'],
    seo: {
      title: 'Wild & Free Tropical Mural Wallpaper | Haosail',
      description:
        'Bold tropical mural wallpaper. Vivid colours, exotic leaves and birds. Custom wall size. Shop Wild & Free at Haosail.',
      keywords: ['tropical wallpaper', 'tropical mural', 'bold wallpaper', 'colourful mural'],
    },
    createdAt: '2025-02-20T08:00:00Z',
  },
  {
    id: 'prod-008',
    slug: 'abstract-energy',
    name: 'Abstract Energy',
    description:
      'Dynamic abstract wallpaper in rich jewel tones — cobalt, emerald, magenta and gold on charcoal.',
    longDescription: `Abstract Energy is our most distinctive design — a bold, gestural abstract composition created by layering brushstrokes, geometric shapes and colour fields in rich jewel tones against a deep charcoal ground.

No two panels are identical. Each wall becomes a unique artwork. Ideal for home offices, entertainment rooms and bedrooms that want to make a strong visual statement.`,
    category: 'bespoke-wallpaper',
    style: ['abstract'],
    rooms: ['living-room', 'bedroom', 'home-office', 'entertainment-room'],
    colours: ['cobalt', 'emerald', 'magenta', 'gold', 'charcoal'],
    images: [
      { url: '/gallery/8.jpg', alt: 'Abstract Energy wallpaper', isPrimary: true },
      { url: '/gallery/9.jpg', alt: 'Abstract Energy detail' },
      { url: '/gallery/10.jpg', alt: 'Abstract Energy room view' },
    ],
    measurements: {
      panelWidth: 0.53,
      panelHeight: 2.65,
      rollWidth: 0.53,
      rollLength: 10,
      coveragePerRoll: 5.3,
      wasteAllowance: 10,
    },
    pricing: {
      basePrice: 1380,
      pricePerSqm: 960,
      installationPrice: 450,
    },
    availableFinishes: ['matte', 'satin', 'gloss', 'non-woven'],
    defaultFinish: 'satin',
    featured: false,
    available: true,
    rating: 4.6,
    reviewCount: 43,
    tags: ['abstract', 'bold', 'jewel-tones', 'modern', 'art'],
    seo: {
      title: 'Abstract Energy Wallpaper | Haosail',
      description:
        'Bold abstract wallpaper in jewel tones on charcoal. Custom-printed for your wall. Shop Abstract Energy at Haosail.',
      keywords: ['abstract wallpaper', 'jewel tone wallpaper', 'modern wallpaper', 'art wallpaper'],
    },
    createdAt: '2025-03-01T08:00:00Z',
  },
];

// ─── Data Access Helpers ──────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return SAMPLE_PRODUCTS;
}

export function getFeaturedProducts(): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.featured && p.available);
}

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return SAMPLE_PRODUCTS
    .filter(
      (p) =>
        p.id !== product.id &&
        p.available &&
        (p.category === product.category ||
          p.style.some((s) => product.style.includes(s))),
    )
    .slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  return SAMPLE_PRODUCTS.filter(
    (p) => p.category === category && p.available,
  );
}
