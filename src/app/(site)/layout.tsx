import React from 'react';
import SiteLayout from '@/components/layout/SiteLayout';
export const metadata: Metadata = {
  title: 'Khuthala — Make Your Walls Tell Your Story',
  description:
    'Bespoke wallpaper, statement murals and family portraits. Custom-printed to your exact wall size. Professionally installed across South Africa.',
};
export default function SiteShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
