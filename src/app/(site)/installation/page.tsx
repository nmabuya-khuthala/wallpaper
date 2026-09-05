import type { Metadata } from 'next';
import InstallationPageClient from '@/components/installation/InstallationPageClient';

export const metadata: Metadata = {
  title: 'Wallpaper Installation — DIY or Professional',
  description:
    'Install your bespoke wallpaper yourself with our DIY guides, or choose professional installation by an accredited installer in your area.',
};

export default function InstallationPage() {
  return <InstallationPageClient />;
}
