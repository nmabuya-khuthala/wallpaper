import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ui/Toast';
import { OrganisationSchema, WebsiteSchema } from '@/components/seo/StructuredData';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Haosail',
    default: 'Haosail — Make Your Walls Tell Your Story',
  },
  description:
    'Bespoke wallpaper, statement murals and family portraits designed to turn your home into a space that feels uniquely yours. Custom-printed. Professionally installed.',
  keywords: [
    'bespoke wallpaper',
    'custom wallpaper',
    'feature wall',
    'family portraits',
    'wall murals',
    'kids wallpaper',
    'nursery wallpaper',
    'professional installation',
    'South Africa',
  ],
  authors: [{ name: 'Haosail' }],
  creator: 'Haosail',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haosail.co.za',
  ),
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://haosail.co.za',
    siteName: 'Haosail',
    title: 'Haosail — Make Your Walls Tell Your Story',
    description:
      'Bespoke wallpaper, statement murals and family portraits. Custom-printed for your home.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Haosail — Bespoke Wallpaper & Family Portraits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haosail — Make Your Walls Tell Your Story',
    description:
      'Bespoke wallpaper, murals and family portraits. Custom-printed for your home.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#C4622D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full antialiased">
        <OrganisationSchema />
        <WebsiteSchema />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
