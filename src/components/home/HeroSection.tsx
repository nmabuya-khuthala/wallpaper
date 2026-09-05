'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Wrench } from 'lucide-react';

const HERO_SLIDES = [
  { url: '/gallery/4.jpg', alt: 'African Sunset dramatic feature wall' },
  { url: '/gallery/1.jpg', alt: 'Golden Botanica luxury wallpaper' },
  { url: '/gallery/7.jpg', alt: 'Wild and Free tropical mural' },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Make Your Walls Tell Your Story"
    >
      {/* Background slideshow */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.url}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.url}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 container-brand w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-2xl">
          {/* Kicker */}
          <div
            className={`inline-flex items-center gap-2 mb-5 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-8 h-0.5 bg-[#C4622D]" />
            <span className="text-[#C4622D] text-xs font-semibold font-sans uppercase tracking-widest">
              Bespoke · Printed · Installed
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display font-bold text-white text-balance leading-none mb-5 transition-all duration-700 delay-100 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            MAKE YOUR
            <br />
            <span className="text-[#C4622D]">WALLS</span> TELL
            <br />
            YOUR STORY.
          </h1>

          {/* Sub-headline */}
          <p
            className={`text-white/80 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-xl transition-all duration-700 delay-200 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Bespoke wallpaper, statement murals and family portraits designed to
            turn your home into a space that feels uniquely yours.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-7 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              SHOP WALLPAPER
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/family-portraits"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-7 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-white hover:text-[#1A1A1A] transition-all duration-200"
            >
              CREATE YOUR FAMILY WALL
            </Link>
          </div>

          {/* Trust */}
          <div
            className={`flex items-center gap-3 text-white/70 font-sans text-xs transition-all duration-700 delay-400 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Wrench size={13} className="text-[#C4622D]" />
              DIY installation
            </div>
            <span className="text-white/30">·</span>
            <div className="flex items-center gap-1.5">
              <Shield size={13} className="text-[#C4622D]" />
              Professionally installed by accredited installers
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2 bg-[#C4622D]'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-[10px] font-sans uppercase tracking-widest rotate-90 origin-center mb-6">
          Scroll
        </span>
        <div className="w-0.5 h-8 bg-white/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-white animate-[slideDown_1.5s_ease-in-out_infinite]" style={{ height: '40%', animation: 'slideDown 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}
