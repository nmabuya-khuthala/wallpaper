// ─── App-wide configuration ───────────────────────────────────────────────────
// All values read from environment variables with sensible defaults.
// Copy .env.example to .env.local and override for your environment.

export const SITE_CONFIG = {
  name: 'Haosail',
  tagline: 'Make Your Walls Tell Your Story.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haosail.co.za',
  description:
    'Bespoke wallpaper, statement murals and family portraits designed to turn your home into a space that feels uniquely yours.',
};

export const CONTACT_CONFIG = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+27000000000',
  whatsappMessage: encodeURIComponent(
    "Hi, I'd like help choosing wallpaper for my wall.",
  ),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@haosail.co.za',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+27 00 000 0000',
};

export const PAYMENT_CONFIG = {
  // Integration layer — connect your South African payment provider here.
  // Supported: payfast | yoco | peach | ozow
  provider: process.env.NEXT_PUBLIC_PAYMENT_PROVIDER ?? 'payfast',
  merchantId: process.env.PAYFAST_MERCHANT_ID ?? '',
  merchantKey: process.env.PAYFAST_MERCHANT_KEY ?? '',
  passphrase: process.env.PAYFAST_PASSPHRASE ?? '',
  sandbox: process.env.NODE_ENV !== 'production',
  returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/order/confirmation`,
  cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/checkout`,
  notifyUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/payment/notify`,
};

export const STORAGE_CONFIG = {
  // Object storage integration layer — connect Supabase / S3 / Cloudflare R2
  provider: process.env.STORAGE_PROVIDER ?? 'local',
  bucket: process.env.STORAGE_BUCKET ?? 'haosail-uploads',
  baseUrl: process.env.STORAGE_BASE_URL ?? '/api/uploads',
  maxFileSizeMb: 20,
};

export const DATABASE_CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
};

export const DELIVERY_CONFIG = {
  flatRate: 350,        // ZAR — configurable
  freeAbove: 5000,      // ZAR — free delivery above this amount
  estimateDaysMin: 7,
  estimateDaysMax: 10,
};

export const INSTALLATION_CONFIG = {
  defaultPricePerPanel: 450, // ZAR baseline
  callOutFee: 350,
};
