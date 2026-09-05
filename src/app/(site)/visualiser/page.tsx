import type { Metadata } from 'next';
import RoomVisualiserClient from '@/components/visualiser/RoomVisualiserClient';
import { getAllProducts } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'See It On Your Wall — Room Visualiser',
  description:
    'Upload a photo of your room and preview our bespoke wallpaper designs on your actual wall. See the transformation before you order.',
};

export default function VisualiserPage() {
  const products = getAllProducts().filter((p) => p.available);
  return <RoomVisualiserClient products={products} />;
}
