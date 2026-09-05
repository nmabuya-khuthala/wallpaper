import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import type { InspirationImage } from '@/types';

interface InspirationSectionProps {
  images: InspirationImage[];
}

export default function InspirationSection({ images }: InspirationSectionProps) {
  return (
    <section
      className="py-20 md:py-28 bg-white"
      aria-labelledby="inspiration-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
              Room Inspiration
            </span>
            <h2
              id="inspiration-heading"
              className="font-display font-bold text-[#1A1A1A]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              GET INSPIRED.
            </h2>
          </div>
          <Link
            href="/inspiration"
            className="flex items-center gap-2 text-sm font-semibold font-sans text-[#C4622D] hover:gap-3 transition-all duration-200 shrink-0"
          >
            View full gallery
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                index === 0 ? 'row-span-2' : ''
              }`}
              style={{
                minHeight: index === 0 ? '480px' : '220px',
              }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.title && (
                  <p className="text-white font-display font-semibold text-sm mb-2">
                    {img.title}
                  </p>
                )}
                {img.productIds.length > 0 && (
                  <Link
                    href={`/shop/${img.productIds[0]}`}
                    className="inline-flex items-center gap-1.5 bg-white text-[#1A1A1A] text-xs font-semibold font-sans px-3 py-1.5 rounded-full hover:bg-[#C4622D] hover:text-white transition-colors self-start"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingBag size={12} />
                    Shop this look
                  </Link>
                )}
              </div>

              {/* Room label */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-[#2C2C2C] text-[10px] font-semibold font-sans uppercase tracking-wider px-2 py-1 rounded-full">
                  {img.room.replace(/-/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
