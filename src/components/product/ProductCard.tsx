'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye, Paintbrush } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import type { Product } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  'bespoke-wallpaper': 'Bespoke Wallpaper',
  'feature-walls':     'Feature Wall',
  'family-portraits':  'Family Portrait',
  'kids-nurseries':    'Kids & Nursery',
  'nature-botanicals': 'Nature & Botanical',
  'custom-designs':    'Custom Design',
  'murals':            'Mural',
  'wall-art':          'Wall Art',
};

const CATEGORY_BADGE_VARIANT: Record<string, 'terracotta' | 'green' | 'mustard' | 'cobalt' | 'coral' | 'pink'> = {
  'bespoke-wallpaper': 'terracotta',
  'feature-walls':     'cobalt',
  'family-portraits':  'pink',
  'kids-nurseries':    'coral',
  'nature-botanicals': 'green',
  'custom-designs':    'mustard',
  'murals':            'cobalt',
  'wall-art':          'terracotta',
};

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  className?: string;
}

export default function ProductCard({
  product,
  layout = 'grid',
  className,
}: ProductCardProps) {
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isWishlisted   = useCartStore((s) => s.isInWishlist(product.id));
  const { showToast }  = useToast();

  const primaryImage =
    product.images.find((i) => i.isPrimary) ?? product.images[0];
  const secondaryImage = product.images[1];

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      isWishlisted ? 'info' : 'success',
    );
  };

  if (layout === 'list') {
    return (
      <article
        className={cn(
          'product-card bg-white rounded-2xl overflow-hidden flex gap-0 shadow-sm',
          className,
        )}
      >
        <Link
          href={`/shop/${product.slug}`}
          className="relative w-44 sm:w-56 shrink-0 overflow-hidden"
        >
          <div className="relative h-full min-h-[160px]">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover product-card-image"
              sizes="(max-width: 640px) 176px, 224px"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between p-4 flex-1 min-w-0">
          <div>
            <Badge
              variant={CATEGORY_BADGE_VARIANT[product.category] ?? 'default'}
              className="mb-2"
            >
              {CATEGORY_LABELS[product.category] ?? product.category}
            </Badge>
            <Link href={`/shop/${product.slug}`}>
              <h3 className="font-display font-semibold text-lg text-[#1A1A1A] hover:text-[#C4622D] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm font-sans text-[#5C5C5C] truncate-2 mt-1">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs font-sans text-[#9A9A9A]">
                ({product.reviewCount})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <div>
              <span className="price-from">From</span>
              <span className="price-display text-xl">
                {formatCurrency(product.pricing.basePrice)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlist}
                className={cn(
                  'p-2 rounded-full border transition-colors',
                  isWishlisted
                    ? 'border-[#C4622D] text-[#C4622D] bg-[#C4622D]/5'
                    : 'border-[#E5DDD0] text-[#9A9A9A] hover:border-[#C4622D] hover:text-[#C4622D]',
                )}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <Link
                href={`/shop/${product.slug}`}
                className="bg-[#C4622D] text-white text-sm font-semibold font-sans px-4 py-2 rounded-xl hover:bg-[#9E4D23] transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'product-card bg-white rounded-2xl overflow-hidden shadow-sm group',
        className,
      )}
    >
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-product overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className={cn(
              'object-cover product-card-image absolute inset-0 transition-opacity duration-300',
              secondaryImage ? 'group-hover:opacity-0' : '',
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {secondaryImage && (
          <Image
            src={secondaryImage.url}
            alt={secondaryImage.alt}
            fill
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.includes('bestseller') && (
            <span className="badge bg-[#C4622D] text-white">Bestseller</span>
          )}
          {product.tags.includes('featured') && !product.tags.includes('bestseller') && (
            <span className="badge bg-[#2D5016] text-white">Featured</span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={handleWishlist}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors',
              isWishlisted
                ? 'bg-[#C4622D] text-white'
                : 'bg-white text-[#5C5C5C] hover:bg-[#C4622D] hover:text-white',
            )}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white text-[#5C5C5C] hover:bg-[#C4622D] hover:text-white flex items-center justify-center shadow-md transition-colors"
            aria-label="Quick view"
          >
            <Eye size={15} />
          </Link>
        </div>

        {/* Colour swatches */}
        {product.colours.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.colours.slice(0, 5).map((colour) => (
              <span
                key={colour}
                className="text-[10px] font-sans bg-white/90 text-[#5C5C5C] px-2 py-0.5 rounded-full"
              >
                {colour}
              </span>
            ))}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Badge
            variant={CATEGORY_BADGE_VARIANT[product.category] ?? 'default'}
            size="sm"
          >
            {CATEGORY_LABELS[product.category] ?? product.category}
          </Badge>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display font-semibold text-[#1A1A1A] hover:text-[#C4622D] transition-colors mt-2 truncate-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs font-sans text-[#9A9A9A] truncate-2 mt-1">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs font-sans text-[#9A9A9A]">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0E8D8]">
          <div>
            <span className="price-from">From</span>
            <span className="font-display font-semibold text-lg text-[#1A1A1A]">
              {formatCurrency(product.pricing.basePrice)}
            </span>
          </div>
          <Link
            href={`/shop/${product.slug}`}
            className="flex items-center gap-1.5 bg-[#C4622D] text-white text-xs font-semibold font-sans px-3 py-2 rounded-xl hover:bg-[#9E4D23] transition-colors"
          >
            <Paintbrush size={13} />
            Customise
          </Link>
        </div>
      </div>
    </article>
  );
}
