'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductById } from '@/lib/data/products';
import type { InspirationImage } from '@/types';

interface Room { id: string; label: string }

interface Props {
  images: InspirationImage[];
  rooms: readonly Room[];
}

export default function InspirationPageClient({ images, rooms }: Props) {
  const [activeRoom, setActiveRoom] = useState('all');

  const filtered = activeRoom === 'all'
    ? images
    : images.filter((img) => img.room === activeRoom);

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-[#FAF6EE] border-b border-[#F0E8D8]">
        <div className="container-brand py-10 text-center">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Inspiration Gallery
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-[#1A1A1A] mb-3">
            GET INSPIRED.
          </h1>
          <p className="text-[#5C5C5C] font-sans max-w-md mx-auto text-sm leading-relaxed">
            Real rooms transformed with Haosail bespoke wallpaper and portraits.
            Click any image to shop the look.
          </p>
        </div>

        {/* Room filter */}
        <div className="container-brand pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max mx-auto w-fit">
            <button
              onClick={() => setActiveRoom('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-sans font-medium border transition-colors whitespace-nowrap',
                activeRoom === 'all'
                  ? 'bg-[#C4622D] text-white border-[#C4622D]'
                  : 'bg-white text-[#5C5C5C] border-[#E5DDD0] hover:border-[#C4622D]',
              )}
            >
              All Rooms
            </button>
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-sans font-medium border transition-colors whitespace-nowrap',
                  activeRoom === room.id
                    ? 'bg-[#C4622D] text-white border-[#C4622D]'
                    : 'bg-white text-[#5C5C5C] border-[#E5DDD0] hover:border-[#C4622D]',
                )}
              >
                {room.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container-brand py-8">
        <p className="text-xs font-sans text-[#9A9A9A] mb-5">{filtered.length} images</p>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img) => {
            const relatedProducts = img.productIds.map(getProductById).filter(Boolean);
            return (
              <div
                key={img.id}
                className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer bg-[#F0E8D8]"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.title && (
                    <p className="text-white font-display font-semibold text-sm mb-1.5">
                      {img.title}
                    </p>
                  )}
                  {relatedProducts.length > 0 && relatedProducts[0] && (
                    <Link
                      href={`/shop/${relatedProducts[0].slug}`}
                      className="inline-flex items-center gap-1.5 bg-white text-[#1A1A1A] text-xs font-semibold font-sans px-3 py-1.5 rounded-full hover:bg-[#C4622D] hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingBag size={11} />
                      Shop this look
                    </Link>
                  )}
                </div>

                {/* Room tag */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/40 text-white text-[9px] font-sans font-medium uppercase tracking-wider px-2 py-1 rounded-full">
                    {img.room.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-[#5C5C5C]">No images found for this room.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-8 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-all duration-200 shadow-lg"
          >
            SHOP ALL DESIGNS
          </Link>
        </div>
      </div>
    </div>
  );
}
