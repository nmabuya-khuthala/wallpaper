import React from 'react';
import SiteLayout from '@/components/layout/SiteLayout';

export default function SiteShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
