import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section
      className="py-20 md:py-28 bg-white"
      aria-labelledby="featured-products-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
              Bestsellers
            </span>
            <h2
              id="featured-products-heading"
              className="font-display font-bold text-[#1A1A1A]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              FROM BLANK WALL TO WOW.
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-semibold font-sans text-[#C4622D] hover:gap-3 transition-all duration-200 shrink-0"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border-2 border-[#C4622D] text-[#C4622D] px-8 py-3.5 rounded-xl font-semibold font-sans text-sm hover:bg-[#C4622D] hover:text-white transition-all duration-200"
          >
            Browse All Designs
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
