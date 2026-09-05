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
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#C4622D] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-sans focus:text-sm"
      >
        Skip to main content
      </a>

      <HeroSection />
      <ShopByExperience />
      <FeaturedProducts products={featuredProducts} />
      <TrustSection />
      <FamilyPortraitCTA />
      <InspirationSection images={INSPIRATION_IMAGES.slice(0, 6)} />
      <BeforeAfterSection />
      <ReviewsSection reviews={reviews} />
    </>
  );
}
