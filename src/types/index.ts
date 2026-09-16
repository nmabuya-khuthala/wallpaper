// ─── Product Types ─────────────────────────────────────────────────────────────
export interface WallCalculationResult {
  panelsRequired: number;
  squareMetres: number;
  estimatedPrice: number;
  wallArea: number;
  requiredArea: number;
  rollsNeeded?: number;
  totalArea?: number;
  coveragePerRoll?: number;
  totalCost?: number;
  breakdown: {
    totalArea?: number;
    extraAllowance?: number;
    recommendedPanels?: number;
    [key: string]: any;
  };
}

export type ProductCategory =
  | 'bespoke-wallpaper'
  | 'feature-walls'
  | 'family-portraits'
  | 'kids-nurseries'
  | 'nature-botanicals'
  | 'custom-designs'
  | 'murals'
  | 'wall-art';

export type ProductStyle =
  | 'botanical'
  | 'geometric'
  | 'abstract'
  | 'floral'
  | 'tropical'
  | 'landscape'
  | 'editorial'
  | 'minimalist'
  | 'illustrated'
  | 'photographic';

export type ProductRoom =
  | 'living-room'
  | 'bedroom'
  | 'kids-room'
  | 'nursery'
  | 'dining-room'
  | 'home-office'
  | 'entrance'
  | 'entertainment-room'
  | 'bathroom';

export type MaterialFinish =
  | 'matte'
  | 'satin'
  | 'gloss'
  | 'textured'
  | 'fabric'
  | 'vinyl'
  | 'non-woven'
  | 'peel-and-stick';

export interface ProductMeasurements {
  panelWidth: number;   // in metres
  panelHeight: number;  // in metres
  rollWidth?: number;   // in metres
  rollLength?: number;  // in metres
  coveragePerRoll?: number; // in square metres
  wasteAllowance: number; // percentage e.g. 10 = 10%
}

export interface ProductPricing {
  basePrice: number;          // price per panel/roll
  pricePerSqm?: number;       // optional per-sqm pricing
  installationPrice?: number; // per-panel installation add-on
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ProductCategory;
  style: ProductStyle[];
  rooms: ProductRoom[];
  colours: string[];
  images: ProductImage[];
  measurements: ProductMeasurements;
  pricing: ProductPricing;
  availableFinishes: MaterialFinish[];
  defaultFinish: MaterialFinish;
  featured: boolean;
  available: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
}

// ─── Cart Types ─────────────────────────────────────────────────────────────────

export type InstallationOption = 'diy' | 'professional';

export interface WallMeasurement {
  width: number;   // metres
  height: number;  // metres
}

export interface CartItemCustomisation {
  wallMeasurements?: WallMeasurement;
  panelsRequired?: number;
  squareMetres?: number;
  finish?: MaterialFinish;
  installation?: InstallationOption;
  installationAddress?: InstallationAddress;
  uploadedImageUrl?: string;
  portraitStyle?: PortraitStyle;
  portraitDetails?: PortraitDetails;
  notes?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customisation: CartItemCustomisation;
  unitPrice: number;
  installationPrice: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  installationTotal: number;
  deliveryTotal: number;
  discount: number;
  total: number;
}

// ─── Order Types ─────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'order-received'
  | 'design-review'
  | 'production'
  | 'ready-dispatch'
  | 'out-for-delivery'
  | 'installation-scheduled'
  | 'completed';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrderItem extends CartItem {
  orderId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  installationTotal: number;
  deliveryTotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  deliveryMethod: 'delivery' | 'collection';
  deliveryAddress: Address;
  installation: InstallationOption;
  installationDetails?: InstallationBooking;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Customer Types ─────────────────────────────────────────────────────────────

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  line1: string;
  line2?: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface InstallationAddress {
  line1: string;
  suburb: string;
  city: string;
  province: string;
  preferredDate?: string;
  contactNumber: string;
}

export interface Customer {
  id: string;
  info: CustomerInfo;
  addresses: Address[];
  defaultAddressIndex: number;
  orders: Order[];
  wishlist: string[]; // product IDs
  savedDesigns: CartItemCustomisation[];
  createdAt: string;
}

// ─── Installer Types ─────────────────────────────────────────────────────────────

export type InstallerStatus = 'active' | 'inactive' | 'suspended';
export type InstallationBookingStatus =
  | 'requested'
  | 'assigned'
  | 'scheduled'
  | 'completed';

export interface Installer {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceAreas: string[]; // provinces/cities
  pricing: InstallerPricing[];
  availability: string[]; // available days
  status: InstallerStatus;
  rating: number;
  completedJobs: number;
}

export interface InstallerPricing {
  area: string;
  pricePerPanel: number;
  minimumCharge: number;
}

export interface InstallationBooking {
  id: string;
  orderId: string;
  installerId?: string;
  address: InstallationAddress;
  preferredDate?: string;
  scheduledDate?: string;
  status: InstallationBookingStatus;
  notes?: string;
  createdAt: string;
}

// ─── Review Types ─────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  orderId?: string;
  customerName: string;
  customerPhoto?: string;
  rating: number; // 1-5
  title: string;
  body: string;
  verified: boolean;
  approved: boolean;
  createdAt: string;
}

// ─── Portrait Types ─────────────────────────────────────────────────────────────

export type PortraitStyle =
  | 'classic'
  | 'fine-art'
  | 'black-white'
  | 'modern-colour'
  | 'luxury-editorial'
  | 'artistic-illustration'
  | 'collage'
  | 'family-timeline';

export interface PortraitDetails {
  names?: string;
  message?: string;
  colourPalette?: string;
  size?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  notes?: string;
}

// ─── Custom Design Request Types ─────────────────────────────────────────────────

export type CustomProjectType =
  | 'photograph'
  | 'artwork'
  | 'drawing'
  | 'logo'
  | 'inspiration'
  | 'family-photo'
  | 'custom';

export type BudgetRange =
  | 'under-2500'
  | '2500-5000'
  | '5000-10000'
  | '10000-20000'
  | 'over-20000';

export interface CustomDesignRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: CustomProjectType;
  wallDimensions?: WallMeasurement;
  description: string;
  uploadedFiles: string[];
  preferredStyle?: ProductStyle;
  budgetRange?: BudgetRange;
  installationRequired: boolean;
  status: 'pending' | 'in-review' | 'quoted' | 'approved' | 'completed';
  createdAt: string;
}

// ─── Room Inspiration Types ─────────────────────────────────────────────────────

export type InspirationRoom =
  | 'living-room'
  | 'bedroom'
  | 'kids-room'
  | 'nursery'
  | 'dining-room'
  | 'home-office'
  | 'entertainment-room'
  | 'entrance'
  | 'family-wall';

export interface InspirationImage {
  id: string;
  url: string;
  alt: string;
  room: InspirationRoom;
  productIds: string[];
  title?: string;
}

// ─── Checkout Types ─────────────────────────────────────────────────────────────

export interface CheckoutFormData {
  customerInfo: CustomerInfo;
  deliveryMethod: 'delivery' | 'collection';
  deliveryAddress: Address;
  installation: InstallationOption;
  installationAddress?: InstallationAddress;
  paymentMethod: 'card' | 'eft' | 'instant-eft';
}

// ─── Utility Types ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  categories?: ProductCategory[];
  styles?: ProductStyle[];
  rooms?: ProductRoom[];
  colours?: string[];
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
