import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'bespoke-wallpaper',
    title: 'Bespoke Wallpaper',
    description: 'Custom wallpaper designed around your style.',
    href: '/shop?category=bespoke-wallpaper',
    image: '/gallery/5.jpg',
    accent: '#C4622D',
    bg: 'bg-[#FAF0E6]',
  },
  {
    id: 'feature-walls',
    title: 'Feature Walls',
    description: 'Transform one wall into the centrepiece of the room.',
    href: '/shop?category=feature-walls',
    image: '/gallery/4.jpg',
    accent: '#1B4F8C',
    bg: 'bg-[#EEF2FA]',
  },
  {
    id: 'family-portraits',
    title: 'Family Portraits',
    description: 'Turn your favourite memories into beautiful wall art.',
    href: '/family-portraits',
    image: '/gallery/6.jpg',
    accent: '#9D174D',
    bg: 'bg-[#FDF2F8]',
  },
  {
    id: 'kids-nurseries',
    title: 'Kids & Nurseries',
    description: 'Creative designs for children\'s spaces.',
    href: '/shop?category=kids-nurseries',
    image: '/gallery/3.jpg',
    accent: '#E05A4A',
    bg: 'bg-[#FFF5F3]',
  },
  {
    id: 'nature-botanicals',
    title: 'Nature & Botanicals',
    description: 'Bring colour and nature indoors.',
    href: '/shop?category=nature-botanicals',
    image: '/gallery/1.jpg',
    accent: '#2D5016',
    bg: 'bg-[#F0F5E8]',
  },
  {
    id: 'custom-designs',
    title: 'Custom Designs',
    description: 'Upload your own artwork, image or concept.',
    href: '/custom-design',
    image: '/gallery/8.jpg',
    accent: '#D4A017',
    bg: 'bg-[#FDF8E8]',
  },
];

export default function ShopByExperience() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFAF6]" aria-labelledby="shop-by-experience-heading">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Explore The Collection
          </span>
          <h2
            id="shop-by-experience-heading"
            className="font-display font-bold text-[#1A1A1A] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
          >
            ONE WALL CAN CHANGE EVERYTHING.
          </h2>
          <p className="text-[#5C5C5C] font-sans max-w-xl mx-auto text-base leading-relaxed">
            From bold feature murals to personalised family portraits — find
            your perfect wall transformation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ minHeight: index === 0 ? '320px' : '260px' }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:text-[#C4622D] transition-colors duration-200">
                  {cat.title}
                </h3>
                <p className="text-white/70 font-sans text-sm mb-3 line-clamp-2">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold font-sans text-white/90 group-hover:text-white transition-colors">
                  Explore
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>

              {/* Colour accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ backgroundColor: cat.accent }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
