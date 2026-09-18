'use client';

import { INSPIRATION_IMAGES } from '@/lib/data/inspiration';
import { PRODUCTS } from '@/lib/data/products'; // Adjust path if your products array comes from somewhere else
import HeroSection from '@/components/home/HeroSection';
import ShopByExperience from '@/components/home/ShopByExperience';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function HomeContent() {
  return (
    <main>
      <HeroSection />
      <ShopByExperience />
      <FeaturedProducts products={PRODUCTS} />
    </main>
  );
}
