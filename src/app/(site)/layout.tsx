import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Haosail | Make Your Walls Tell Your Story',
  description:
    'Bespoke wallpaper, statement murals and family portraits. Custom-printed to your exact specs.',
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
