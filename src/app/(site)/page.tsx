import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ShopByExperience from '@/components/home/ShopByExperience';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustSection from '@/components/home/TrustSection';
import BeforeAfterSection from '@/components/home/BeforeAfterSection';
import InspirationSection from '@/components/home/InspirationSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FamilyPortraitCTA from '@/components/home/FamilyPortraitCTA';
import { getFeaturedProducts } from '@/lib/data/products';
import { getApprovedReviews } from '@/lib/data/reviews';
import { INSPIRATION_IMAGES } from '@/lib/data/inspiration';

export const metadata: Metadata = {
  title: 'Haosail — Make Your Walls Tell Your Story',
  description:
    'Bespoke wallpaper, statement murals and family portraits. Custom-printed to your exact wall size. Professionally installed across South Africa.',
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const reviews = getApprovedReviews();

  return (
    <main id="main-content">
      <HeroSection />
      <ShopByExperience />
      <FeaturedProducts products={featuredProducts} />
      <TrustSection />
      <FamilyPortraitCTA />
      <InspirationSection images={INSPIRATION_IMAGES.slice(0, 6)} />
      <BeforeAfterSection />
      <ReviewsSection reviews={reviews} />
    </main>
  );
}
