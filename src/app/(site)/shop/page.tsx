import type { Metadata } from 'next';
import ShopPageClient from '@/components/shop/ShopPageClient';
import { getAllProducts } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Shop Bespoke Wallpaper & Murals',
  description:
    'Browse our full collection of bespoke wallpaper, feature wall murals, family portraits, kids wallpaper and custom designs. Custom-printed to your exact dimensions.',
};

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const products = getAllProducts();
  return (
    <ShopPageClient
      products={products}
      initialCategory={(params.category as string) ?? ''}
      initialSearch={(params.search as string) ?? ''}
    />
  );
}
