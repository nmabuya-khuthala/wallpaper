'use client';

import { INSPIRATION_IMAGES } from '@/lib/data/inspiration';
import { SAMPLE_PRODUCTS } from '@/lib/data/products';
import HeroSection from '@/components/home/HeroSection';
import ShopByExperience from '@/components/home/ShopByExperience';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function HomeContent() {
  return (
    <main>
      <HeroSection />
      <ShopByExperience />
      <FeaturedProducts products={SAMPLE_PRODUCTS} />
    </main>
  );
}
