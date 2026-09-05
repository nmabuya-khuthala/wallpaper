import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera } from 'lucide-react';

export default function FamilyPortraitCTA() {
  return (
    <section
      className="py-20 md:py-28 bg-[#2C2C2C] overflow-hidden relative"
      aria-labelledby="family-portrait-cta-heading"
    >
      {/* Decorative background image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/gallery/6.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C] via-[#2C2C2C]/90 to-transparent" />

      <div className="container-brand relative z-10">
        <div className="max-w-2xl">
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-5">
            <Camera size={18} className="text-[#C4622D]" />
            <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D]">
              Family Portraits
            </span>
          </div>

          <h2
            id="family-portrait-cta-heading"
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            YOUR MEMORIES
            <br />
            DESERVE MORE THAN
            <br />
            <span className="text-[#C4622D]">A CAMERA ROLL.</span>
          </h2>

          <p className="text-white/70 font-sans text-base leading-relaxed mb-8 max-w-lg">
            Your family deserves a wall. Upload your favourite photographs and
            our design team will create a stunning portrait wall that tells your
            family&apos;s story — beautifully, permanently, and in your home
            forever.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/family-portraits"
              className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-7 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-all duration-200 shadow-lg"
            >
              <Camera size={16} />
              CREATE YOUR FAMILY WALL
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/inspiration?room=family-wall"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-4 rounded-xl font-semibold font-sans text-sm hover:bg-white/10 transition-all duration-200"
            >
              See examples
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {['/gallery/9.jpg', '/gallery/10.jpg', '/gallery/8.jpg'].map(
                (src, i) => (
                  <div
                    key={i}
                    className="relative w-9 h-9 rounded-full border-2 border-[#2C2C2C] overflow-hidden"
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="36px" />
                  </div>
                ),
              )}
            </div>
            <div>
              <div className="text-white font-semibold font-sans text-sm">
                312+ happy families
              </div>
              <div className="text-white/50 font-sans text-xs">
                ★★★★★ 5.0 average rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
