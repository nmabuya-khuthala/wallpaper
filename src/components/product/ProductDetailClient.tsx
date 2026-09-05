'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart, ShoppingCart, Paintbrush, ChevronLeft, ChevronRight,
  Truck, Shield, Award, Star, ZoomIn,
} from 'lucide-react';
import { cn, formatCurrency, getDeliveryEstimate, getCartTotals } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import WallCalculator from './WallCalculator';
import ProductCard from './ProductCard';
import type {
  Product, Review, MaterialFinish,
  InstallationOption, WallMeasurement, WallCalculationResult,
} from '@/types';

const FINISH_LABELS: Record<MaterialFinish, string> = {
  matte:          'Matte',
  satin:          'Satin',
  gloss:          'Gloss',
  textured:       'Textured',
  fabric:         'Fabric',
  vinyl:          'Vinyl',
  'non-woven':    'Non-Woven',
  'peel-and-stick': 'Peel & Stick',
};

const FINISH_DESCRIPTIONS: Partial<Record<MaterialFinish, string>> = {
  matte:          'No shine, premium flat finish. Best for low-light rooms.',
  satin:          'Slight sheen, easy to clean. Ideal for family rooms.',
  gloss:          'High shine, very durable. Makes colours pop.',
  'non-woven':    'Premium material, paste-the-wall. Easiest to hang.',
  'peel-and-stick': 'Removable adhesive. Perfect for renters or temporary use.',
  vinyl:          'Waterproof, wipe-clean. Great for kitchens and bathrooms.',
};

const PRODUCT_FAQS = [
  {
    id: 'sizing',
    question: 'How is this product sized?',
    answer: 'Every product is custom-printed to your exact wall dimensions. Use the wall calculator above to determine the number of panels needed for your space.',
  },
  {
    id: 'installation-time',
    question: 'How long does installation take?',
    answer: 'A standard feature wall typically takes 2–4 hours for a DIY installation, or 1–2 hours with our professional installer service.',
  },
  {
    id: 'delivery',
    question: 'How long does delivery take?',
    answer: 'Production takes 5–7 business days. Delivery is an additional 2–3 business days. Professional installation is scheduled separately once delivery is confirmed.',
  },
  {
    id: 'returns',
    question: 'Can I return a custom product?',
    answer: 'As each product is custom-printed to your specifications, we cannot accept returns unless the product is defective or differs from your order. We do offer a free reprint guarantee.',
  },
  {
    id: 'prep',
    question: 'How do I prepare my wall?',
    answer: 'Walls should be clean, dry, smooth and primed. Remove existing wallpaper and fill any holes or cracks. Download our full preparation guide for step-by-step instructions.',
  },
];

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  reviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<MaterialFinish>(product.defaultFinish);
  const [installation, setInstallation] = useState<InstallationOption>('diy');
  const [calcResult, setCalcResult] = useState<WallCalculationResult | null>(null);
  const [calcWall, setCalcWall] = useState<WallMeasurement | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const addItem       = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isWishlisted   = useCartStore((s) => s.isInWishlist(product.id));
  const { showToast } = useToast();

  const installationCost = installation === 'professional'
    ? (product.pricing.installationPrice ?? 450) * (calcResult?.panelsRequired ?? 1)
    : 0;

  const productPrice = calcResult
    ? calcResult.estimatedPrice
    : product.pricing.basePrice;

  const totalDisplay = productPrice + installationCost;

  const handleAddToCart = () => {
    setAddingToCart(true);
    addItem(product, {
      finish: selectedFinish,
      installation,
      wallMeasurements: calcWall ?? undefined,
      panelsRequired: calcResult?.panelsRequired,
      squareMetres: calcResult?.squareMetres,
    });
    showToast(`${product.name} added to cart!`, 'success');
    setTimeout(() => setAddingToCart(false), 800);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    showToast(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      isWishlisted ? 'info' : 'success',
    );
  };

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImage = () =>
    setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container-brand py-4 border-b border-[#F0E8D8]">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main product area */}
      <div className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Images ── */}
          <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative aspect-[4/3] md:aspect-product rounded-2xl overflow-hidden bg-[#F0E8D8] group">
              {product.images[activeImage] && (
                <Image
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].alt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}

              {/* Zoom button */}
              <button
                onClick={() => setZoomedImage(product.images[activeImage]?.url)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
                aria-label="Zoom image"
              >
                <ZoomIn size={16} className="text-[#2C2C2C]" />
              </button>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-1">
                {product.tags.includes('bestseller') && (
                  <span className="badge bg-[#C4622D] text-white">Bestseller</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-colors',
                      i === activeImage
                        ? 'border-[#C4622D]'
                        : 'border-transparent hover:border-[#E5DDD0]',
                    )}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === activeImage}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-5">
            {/* Category & name */}
            <div>
              <Badge variant="terracotta" className="mb-3">
                {product.category.replace(/-/g, ' ')}
              </Badge>
              <h1 className="font-display font-bold text-[#1A1A1A] leading-tight mb-2"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size="sm" showCount count={product.reviewCount} />
                <a href="#reviews" className="text-xs font-sans text-[#1B4F8C] hover:underline">
                  Read reviews
                </a>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#FAF6EE] rounded-xl p-4">
              <span className="price-from">
                {calcResult ? 'Your price' : 'Starting from'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-3xl text-[#1A1A1A]">
                  {formatCurrency(productPrice)}
                </span>
                {installation === 'professional' && installationCost > 0 && (
                  <span className="text-sm font-sans text-[#9A9A9A]">
                    + {formatCurrency(installationCost)} installation
                  </span>
                )}
              </div>
              {calcResult && (
                <p className="text-xs font-sans text-[#5C5C5C] mt-1">
                  Based on {calcResult.panelsRequired} panels for your {calcResult.breakdown.wallWidth}m × {calcResult.breakdown.wallHeight}m wall
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-[#5C5C5C] font-sans text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Finish selector */}
            <div>
              <h3 className="text-sm font-semibold font-sans text-[#2C2C2C] mb-2">
                Finish:{' '}
                <span className="font-normal text-[#C4622D]">
                  {FINISH_LABELS[selectedFinish]}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.availableFinishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-sans border transition-colors',
                      selectedFinish === finish
                        ? 'border-[#C4622D] bg-[#C4622D]/8 text-[#C4622D] font-medium'
                        : 'border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
                    )}
                    title={FINISH_DESCRIPTIONS[finish]}
                  >
                    {FINISH_LABELS[finish]}
                  </button>
                ))}
              </div>
              {FINISH_DESCRIPTIONS[selectedFinish] && (
                <p className="text-xs font-sans text-[#9A9A9A] mt-1.5">
                  {FINISH_DESCRIPTIONS[selectedFinish]}
                </p>
              )}
            </div>

            {/* Wall Calculator */}
            <WallCalculator
              product={product}
              onCalculate={(result, wall) => {
                setCalcResult(result);
                setCalcWall(wall);
              }}
            />

            {/* Installation options */}
            <div>
              <h3 className="text-sm font-semibold font-sans text-[#2C2C2C] mb-2">
                Installation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setInstallation('diy')}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    installation === 'diy'
                      ? 'border-[#2D5016] bg-[#2D5016]/5'
                      : 'border-[#E5DDD0] hover:border-[#2D5016]/40',
                  )}
                  aria-pressed={installation === 'diy'}
                >
                  <div className="text-xl mb-1">🛠️</div>
                  <div className="font-semibold font-sans text-sm text-[#1A1A1A]">
                    DIY Installation
                  </div>
                  <div className="text-xs font-sans text-[#9A9A9A] mt-0.5">
                    Includes guide & tutorials
                  </div>
                  <div className="text-xs font-semibold font-sans text-[#2D5016] mt-1">
                    Free
                  </div>
                </button>

                <button
                  onClick={() => setInstallation('professional')}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all',
                    installation === 'professional'
                      ? 'border-[#1B4F8C] bg-[#1B4F8C]/5'
                      : 'border-[#E5DDD0] hover:border-[#1B4F8C]/40',
                  )}
                  aria-pressed={installation === 'professional'}
                >
                  <div className="text-xl mb-1">👷</div>
                  <div className="font-semibold font-sans text-sm text-[#1A1A1A]">
                    Professional
                  </div>
                  <div className="text-xs font-sans text-[#9A9A9A] mt-0.5">
                    Accredited installer
                  </div>
                  <div className="text-xs font-semibold font-sans text-[#1B4F8C] mt-1">
                    {formatCurrency(product.pricing.installationPrice ?? 450)}/panel
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-3 p-3 bg-[#F0F5E8] rounded-xl text-sm font-sans">
              <Truck size={16} className="text-[#2D5016] shrink-0" />
              <div>
                <span className="font-semibold text-[#2D5016]">Estimated delivery: </span>
                <span className="text-[#5C5C5C]">{getDeliveryEstimate()}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 md:sticky md:bottom-0">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={addingToCart}
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingCart size={18} />}
                  className="flex-1"
                >
                  {calcResult ? `ADD ${calcResult.panelsRequired} PANELS TO CART` : 'ADD TO CART'}
                </Button>
                <button
                  onClick={handleWishlist}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-colors',
                    isWishlisted
                      ? 'border-[#C4622D] text-[#C4622D] bg-[#C4622D]/5'
                      : 'border-[#E5DDD0] text-[#9A9A9A] hover:border-[#C4622D] hover:text-[#C4622D]',
                  )}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<Paintbrush size={18} />}
                as="a"
                href="/visualiser"
              >
                SEE IT ON YOUR WALL
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: <Shield size={14} />, label: 'Secure payment' },
                { icon: <Award size={14} />, label: 'Quality guarantee' },
                { icon: <Truck size={14} />, label: 'Nationwide delivery' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <div className="text-[#C4622D]">{b.icon}</div>
                  <span className="text-[10px] font-sans text-[#9A9A9A] leading-tight">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Long description, specs, FAQs, reviews ── */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: description + FAQ */}
          <div className="lg:col-span-2">
            {product.longDescription && (
              <section className="mb-10" aria-labelledby="product-description">
                <h2 id="product-description" className="font-display font-bold text-xl text-[#1A1A1A] mb-4">
                  About This Design
                </h2>
                <div className="prose-brand">
                  {product.longDescription.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Specs */}
            <section className="mb-10 bg-[#FAF6EE] rounded-2xl p-6" aria-labelledby="product-specs">
              <h2 id="product-specs" className="font-display font-bold text-lg text-[#1A1A1A] mb-4">
                Product Specifications
              </h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { label: 'Panel Width', value: `${product.measurements.panelWidth}m` },
                  { label: 'Panel Height', value: `${product.measurements.panelHeight}m` },
                  { label: 'Waste Allowance', value: `${product.measurements.wasteAllowance}%` },
                  { label: 'Category', value: product.category.replace(/-/g, ' ') },
                  { label: 'Available Finishes', value: product.availableFinishes.map((f) => FINISH_LABELS[f]).join(', ') },
                  { label: 'Rooms', value: product.rooms.map((r) => r.replace(/-/g, ' ')).join(', ') },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-0.5">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-sans text-[#1A1A1A] font-medium capitalize">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* FAQ */}
            <section aria-labelledby="product-faq">
              <h2 id="product-faq" className="font-display font-bold text-xl text-[#1A1A1A] mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion items={PRODUCT_FAQS} allowMultiple />
            </section>
          </div>

          {/* Right: reviews */}
          <div id="reviews">
            <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">
              Customer Reviews
            </h2>

            {reviews.length === 0 ? (
              <div className="bg-[#FAF6EE] rounded-2xl p-6 text-center">
                <Star size={24} className="text-[#D4A017] mx-auto mb-2" />
                <p className="font-sans text-sm text-[#5C5C5C]">
                  No reviews yet. Be the first to review this product.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                  <article
                    key={r.id}
                    className="bg-[#FAF6EE] rounded-xl p-4 flex flex-col gap-2"
                  >
                    <StarRating rating={r.rating} size="sm" />
                    <h3 className="font-semibold font-sans text-sm text-[#1A1A1A]">
                      &ldquo;{r.title}&rdquo;
                    </h3>
                    <p className="text-xs font-sans text-[#5C5C5C] leading-relaxed">
                      {r.body}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-semibold font-sans text-[#2C2C2C]">
                        {r.customerName}
                      </span>
                      {r.verified && (
                        <span className="text-[10px] font-sans text-[#2D5016]">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display font-bold text-2xl text-[#1A1A1A] mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile CTA */}
      <div className="sticky-cta lg:hidden">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="text-xs font-sans text-[#9A9A9A]">
              {calcResult ? `${calcResult.panelsRequired} panels` : 'From'}
            </div>
            <div className="font-display font-bold text-lg text-[#1A1A1A]">
              {formatCurrency(totalDisplay)}
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddToCart}
            loading={addingToCart}
            leftIcon={<ShoppingCart size={16} />}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Image zoom modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
          role="dialog"
          aria-label="Zoomed product image"
        >
          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={zoomedImage}
              alt="Zoomed product image"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2"
            onClick={() => setZoomedImage(null)}
            aria-label="Close zoomed image"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
