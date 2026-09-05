import type { Metadata } from 'next';
import InspirationPageClient from '@/components/inspiration/InspirationPageClient';
import { INSPIRATION_IMAGES, INSPIRATION_ROOMS } from '@/lib/data/inspiration';

export const metadata: Metadata = {
  title: 'Room Inspiration Gallery',
  description:
    'Browse our room inspiration gallery. See bespoke wallpaper, feature walls and family portraits styled in real homes across every room type.',
};

export default function InspirationPage() {
  return (
    <InspirationPageClient
      images={INSPIRATION_IMAGES}
      rooms={INSPIRATION_ROOMS}
    />
  );
}
