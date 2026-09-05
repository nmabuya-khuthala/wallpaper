'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updatePosition(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };
  const handleMouseUp = () => { dragging.current = false; };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section
      className="py-20 md:py-28 bg-[#F0E8D8]"
      aria-labelledby="before-after-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            The Transformation
          </span>
          <h2
            id="before-after-heading"
            className="font-display font-bold text-[#1A1A1A] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            SAME ROOM.
            <br />
            COMPLETELY DIFFERENT FEELING.
          </h2>
          <p className="text-[#5C5C5C] font-sans text-base max-w-md mx-auto">
            Drag the slider to see how one wall can transform an entire space.
          </p>
        </div>

        {/* Before/After slider */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="before-after-container rounded-2xl overflow-hidden shadow-2xl select-none"
            style={{ height: 'min(60vw, 520px)' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            role="img"
            aria-label="Before and after comparison of wall transformation"
          >
            {/* AFTER image (full width behind) */}
            <div className="absolute inset-0">
              <Image
                src="/gallery/4.jpg"
                alt="After — African Sunset feature wall transformation"
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 896px) 100vw, 896px"
                draggable={false}
              />
            </div>

            {/* BEFORE image (clipped to left side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <Image
                src="/gallery/10.jpg"
                alt="Before — plain room without wallpaper"
                fill
                className="object-cover pointer-events-none"
                style={{ maxWidth: 'none', width: `${10000 / sliderPos}%` }}
                sizes="(max-width: 896px) 100vw, 896px"
                draggable={false}
              />
              {/* BEFORE label */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-[#2C2C2C] text-xs font-bold font-sans uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Before
                </span>
              </div>
            </div>

            {/* AFTER label */}
            <div className="absolute top-4 right-4">
              <span className="bg-[#C4622D] text-white text-xs font-bold font-sans uppercase tracking-wider px-3 py-1.5 rounded-full">
                After
              </span>
            </div>

            {/* Divider line */}
            <div
              className="before-after-divider"
              style={{ left: `calc(${sliderPos}% - 1.5px)` }}
            >
              {/* Handle */}
              <div className="before-after-handle">
                <MoveHorizontal size={18} className="text-[#C4622D]" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-8 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-all duration-200 shadow-lg"
            >
              TRANSFORM MY WALL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
