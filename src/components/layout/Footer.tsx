import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Share2, Globe } from 'lucide-react';

const FOOTER_LINKS = {
  shop: [
    { label: 'All Wallpaper',          href: '/shop' },
    { label: 'Bespoke Wallpaper',      href: '/shop?category=bespoke-wallpaper' },
    { label: 'Feature Walls',          href: '/shop?category=feature-walls' },
    { label: 'Kids & Nurseries',       href: '/shop?category=kids-nurseries' },
    { label: 'Nature & Botanicals',    href: '/shop?category=nature-botanicals' },
    { label: 'Custom Designs',         href: '/custom-design' },
  ],
  services: [
    { label: 'Family Portraits',       href: '/family-portraits' },
    { label: 'Custom Design',          href: '/custom-design' },
    { label: 'Professional Installation', href: '/installation' },
    { label: 'Room Visualiser',        href: '/visualiser' },
    { label: 'Get Inspired',           href: '/inspiration' },
  ],
  help: [
    { label: 'How to Measure',         href: '/help/how-to-measure' },
    { label: 'Installation Guides',    href: '/installation' },
    { label: 'My Account',             href: '/account' },
    { label: 'Track My Order',         href: '/account/orders' },
    { label: 'Contact Us',             href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy',         href: '/legal/privacy' },
    { label: 'Terms & Conditions',     href: '/legal/terms' },
    { label: 'Returns Policy',         href: '/legal/returns' },
    { label: 'Cookie Policy',          href: '/legal/cookies' },
  ],
};

const TRUST_BADGES = [
  { icon: '🎨', label: 'Bespoke Design' },
  { icon: '🖨️', label: 'Premium Printing' },
  { icon: '🛠️', label: 'Pro Installation' },
  { icon: '🔒', label: 'Secure Checkout' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="container-brand py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 text-sm font-sans text-white/80"
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-brand py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-9 h-9">
                <Image
                  src="/gallery/logo.png"
                  alt="Haosail"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-display font-bold">Haosail</span>
            </Link>
            <p className="text-white/60 font-sans text-sm leading-relaxed mb-6 max-w-xs">
              Bespoke wallpaper, statement murals and family portraits designed
              to turn your home into a space that feels uniquely yours.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:hello@haosail.co.za"
                className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-[#C4622D] transition-colors"
              >
                <Mail size={15} className="shrink-0" />
                hello@haosail.co.za
              </a>
              <a
                href="tel:+27000000000"
                className="flex items-center gap-2 text-sm font-sans text-white/70 hover:text-[#C4622D] transition-colors"
              >
                <Phone size={15} className="shrink-0" />
                +27 00 000 0000
              </a>
              <span className="flex items-center gap-2 text-sm font-sans text-white/60">
                <MapPin size={15} className="shrink-0" />
                South Africa — nationwide delivery
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/haosail"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C4622D] flex items-center justify-center transition-colors"
                aria-label="Follow Haosail on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com/haosail"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C4622D] flex items-center justify-center transition-colors"
                aria-label="Follow Haosail on Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="text-sm font-semibold font-sans uppercase tracking-widest text-[#C4622D] mb-4">
              Shop
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-sans uppercase tracking-widest text-[#C4622D] mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold font-sans uppercase tracking-widest text-[#C4622D] mb-4">
              Help
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-brand py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-white/40">
            © {new Date().getFullYear()} Haosail. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-sans text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs font-sans text-white/30">
            Prices in ZAR. VAT included.
          </p>
        </div>
      </div>
    </footer>
  );
}
