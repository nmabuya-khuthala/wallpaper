import type { Metadata } from 'next';
import HomeContent from './home-content';

export const metadata: Metadata = {
  title: 'Wallpaper Guys | Make Your Walls Tell Your Story',
  description:
    'Bespoke wallpaper, statement murals and family portraits. Custom-printed to your exact specs.',
};

export default function Page() {
  return <HomeContent />;
}
