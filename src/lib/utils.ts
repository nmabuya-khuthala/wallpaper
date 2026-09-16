import { 
  WallCalculationResult, 
  WallMeasurement, 
  ProductMeasurements, 
  ProductPricing, 
  CartItemCustomisation, 
  OrderStatus, 
  InstallationBookingStatus 
} from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WallCalculationResult } from '@/types';
// ─── Tailwind Class Utility ──────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency Formatting ──────────────────────────────────────────────────────
export function formatCurrency(
  amount: number,
  currency = 'ZAR',
  locale = 'en-ZA',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Wall Measurement Calculator ─────────────────────────────────────────────
export interface WallCalculationResult {
  wallArea: number;            // m²
  requiredArea: number;        // m² with waste
  panelsRequired: number;
  squareMetres: number;
  estimatedPrice: number;
  breakdown: {
    wallWidth: number;
    wallHeight: number;
    wasteFactor: number;
    panelWidth: number;
    panelHeight: number;
    pricePerPanel: number;
  };
}

export function calculateWallRequirements(
  wall: WallMeasurement,
  measurements: ProductMeasurements,
  pricing: ProductPricing,
): WallCalculationResult {
  const wallArea = wall.width * wall.height;
  const wasteFactor = 1 + measurements.wasteAllowance / 100;
  const requiredArea = wallArea * wasteFactor;

  // How many panels wide to cover the wall
  const panelsWide = Math.ceil(wall.width / measurements.panelWidth);
  // How many panels tall to cover the wall
  const panelsTall = Math.ceil(wall.height / measurements.panelHeight);
  const panelsRequired = panelsWide * panelsTall;

  const squareMetres = requiredArea;
  const estimatedPrice = pricing.pricePerSqm
    ? squareMetres * pricing.pricePerSqm
    : panelsRequired * pricing.basePrice;

  return {
    wallArea: round2(wallArea),
    requiredArea: round2(requiredArea),
    panelsRequired,
    squareMetres: round2(squareMetres),
    estimatedPrice: Math.round(estimatedPrice),
    breakdown: {
      wallWidth: wall.width,
      wallHeight: wall.height,
      wasteFactor,
      panelWidth: measurements.panelWidth,
      panelHeight: measurements.panelHeight,
      pricePerPanel: pricing.basePrice,
    },
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ─── Cart Price Calculator ────────────────────────────────────────────────────
export function calculateCartItemPrice(
  customisation: CartItemCustomisation,
  basePrice: number,
  installationPricePerPanel = 0,
): { unitPrice: number; installationPrice: number; totalPrice: number } {
  const panels = customisation.panelsRequired ?? 1;
  const unitPrice = basePrice * panels;

  const installationPrice =
    customisation.installation === 'professional'
      ? installationPricePerPanel * panels
      : 0;

  return {
    unitPrice,
    installationPrice,
    totalPrice: unitPrice + installationPrice,
  };
}

// ─── Slug Utilities ───────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

// ─── Order Status Helpers ─────────────────────────────────────────────────────
export function getOrderStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    'order-received':          'Order Received',
    'design-review':           'Artwork / Design Review',
    'production':              'In Production',
    'ready-dispatch':          'Ready for Dispatch',
    'out-for-delivery':        'Out for Delivery',
    'installation-scheduled':  'Installation Scheduled',
    'completed':               'Completed',
  };
  return labels[status] ?? status;
}

export function getOrderStatusStep(status: OrderStatus): number {
  const steps: Record<OrderStatus, number> = {
    'order-received': 0,
    'design-review': 1,
    'production': 2,
    'ready-dispatch': 3,
    'out-for-delivery': 4,
    'installation-scheduled': 5,
    'completed': 6,
  };
  return steps[status] ?? 0;
}

export function getInstallationStatusLabel(
  status: InstallationBookingStatus,
): string {
  const labels: Record<InstallationBookingStatus, string> = {
    requested:  'Requested',
    assigned:   'Installer Assigned',
    scheduled:  'Scheduled',
    completed:  'Completed',
  };
  return labels[status] ?? status;
}

// ─── Validation Helpers ───────────────────────────────────────────────────────
export function isValidWallDimension(value: number): boolean {
  return value >= 0.5 && value <= 20;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^(\+27|0)[6-8][0-9]{8}$/.test(phone.replace(/\s/g, ''));
}

export function isValidPostalCode(code: string): boolean {
  return /^\d{4}$/.test(code);
}

// ─── File Validation ──────────────────────────────────────────────────────────
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPEG, PNG, or WebP image.',
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`,
    };
  }
  return { valid: true };
}

// ─── Order Number Generator ───────────────────────────────────────────────────
export function generateOrderNumber(): string {
  const prefix = 'HS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ─── Pluralise ────────────────────────────────────────────────────────────────
export function pluralise(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

// ─── Cart Totals ──────────────────────────────────────────────────────────────
export function getCartTotals(items: { totalPrice: number; installationPrice: number }[]) {
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
  const installationTotal = items.reduce((sum, i) => sum + i.installationPrice, 0);
  const delivery = subtotal > 0 ? 350 : 0; // flat delivery fee, configurable
  return {
    subtotal,
    installationTotal,
    delivery,
    total: subtotal + delivery,
  };
}

// ─── Delivery Estimate ────────────────────────────────────────────────────────
export function getDeliveryEstimate(): string {
  const from = new Date();
  from.setDate(from.getDate() + 7);
  const to = new Date(from);
  to.setDate(to.getDate() + 3);
  return `${formatDateShort(from.toISOString())} – ${formatDateShort(to.toISOString())}`;
}

// ─── Image URL Helper ─────────────────────────────────────────────────────────
export function getProductImageUrl(index: number): string {
  const num = ((index - 1) % 10) + 1;
  return `/gallery/${num}.jpg`;
}

// ─── South African Provinces ──────────────────────────────────────────────────
export const SA_PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
];
