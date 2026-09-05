'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';

const NAV_ITEMS = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products',        href: '/shop' },
      { label: 'Bespoke Wallpaper',   href: '/shop?category=bespoke-wallpaper' },
      { label: 'Feature Walls',       href: '/shop?category=feature-walls' },
      { label: 'Kids & Nurseries',    href: '/shop?category=kids-nurseries' },
      { label: 'Nature & Botanicals', href: '/shop?category=nature-botanicals' },
      { label: 'Custom Designs',      href: '/shop?category=custom-designs' },
    ],
  },
  {
    label: 'Family Portraits',
    href: '/family-portraits',
  },
  {
    label: 'Custom Design',
    href: '/custom-design',
  },
  {
    label: 'Inspiration',
    href: '/inspiration',
  },
  {
    label: 'Installation',
    href: '/installation',
  },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = useCartStore((s) => s.itemCount);
  const wishlist = useCartStore((s) => s.wishlist);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Prevent body scroll when mobile nav open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0E8D8]',
        )}
      >
        {/* Top bar */}
        <div
          className={cn(
            'hidden md:flex items-center justify-between px-6 py-1.5 text-xs font-sans transition-all duration-300',
            isTransparent
              ? 'bg-black/20 text-white/90'
              : 'bg-[#2C2C2C] text-white/80',
          )}
        >
          <span>Free delivery on orders over R5,000 · Professional installation available nationwide</span>
          <div className="flex items-center gap-4">
            <a
              href="tel:+27000000000"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone size={11} />
              +27 00 000 0000
            </a>
            <Link href="/account" className="hover:text-white transition-colors">
              My Account
            </Link>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-brand flex items-center justify-between h-16 md:h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4622D] rounded"
            aria-label="Haosail home"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/gallery/logo.png"
                alt="Haosail"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={cn(
                'text-xl font-display font-bold tracking-tight transition-colors duration-300',
                isTransparent ? 'text-white' : 'text-[#1A1A1A]',
              )}
            >
              Haosail
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            ref={dropdownRef}
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label,
                        )
                      }
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium font-sans transition-colors duration-200',
                        isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-[#2C2C2C] hover:text-[#C4622D] hover:bg-[#FAF6EE]',
                        pathname.startsWith(item.href) && !isTransparent &&
                          'text-[#C4622D] bg-[#FAF6EE]',
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180',
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#F0E8D8] py-1 animate-scale-in z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-sans text-[#5C5C5C] hover:text-[#C4622D] hover:bg-[#FAF6EE] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium font-sans transition-colors duration-200',
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-[#2C2C2C] hover:text-[#C4622D] hover:bg-[#FAF6EE]',
                      pathname === item.href && !isTransparent &&
                        'text-[#C4622D] bg-[#FAF6EE]',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-[#5C5C5C] hover:text-[#C4622D] hover:bg-[#FAF6EE]',
              )}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className={cn(
                'relative p-2 rounded-full transition-colors',
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-[#5C5C5C] hover:text-[#C4622D] hover:bg-[#FAF6EE]',
              )}
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C4622D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className={cn(
                'hidden md:flex p-2 rounded-full transition-colors',
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-[#5C5C5C] hover:text-[#C4622D] hover:bg-[#FAF6EE]',
              )}
              aria-label="My account"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                'relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
                isTransparent
                  ? 'text-white border border-white/30 hover:bg-white/10'
                  : 'bg-[#C4622D] text-white hover:bg-[#9E4D23]',
              )}
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:block text-sm font-semibold font-sans">
                Cart
              </span>
              {itemCount > 0 && (
                <span
                  className={cn(
                    'flex items-center justify-center w-5 h-5 text-[11px] font-bold rounded-full',
                    isTransparent
                      ? 'bg-[#C4622D] text-white'
                      : 'bg-white text-[#C4622D]',
                  )}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-full transition-colors',
                isTransparent
                  ? 'text-white/90 hover:bg-white/10'
                  : 'text-[#2C2C2C] hover:bg-[#FAF6EE]',
              )}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="bg-white border-t border-[#F0E8D8] px-4 py-3 animate-fade-in-up">
            <form
              action="/shop"
              method="get"
              className="container-brand flex items-center gap-3"
            >
              <Search size={18} className="text-[#9A9A9A] shrink-0" />
              <input
                ref={searchRef}
                name="search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wallpaper, murals, portraits…"
                className="flex-1 bg-transparent text-[#1A1A1A] placeholder:text-[#9A9A9A] font-sans text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#9A9A9A] hover:text-[#2C2C2C] transition-colors"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto animate-slide-left">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#F0E8D8]">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image src="/gallery/logo.png" alt="Haosail" fill className="object-contain" />
                </div>
                <span className="text-lg font-display font-bold text-[#1A1A1A]">
                  Haosail
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-[#FAF6EE] text-[#5C5C5C]"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label,
                          )
                        }
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold font-sans text-[#1A1A1A] hover:bg-[#FAF6EE] transition-colors"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={cn(
                            'transition-transform duration-200 text-[#9A9A9A]',
                            openDropdown === item.label && 'rotate-180',
                          )}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="ml-3 pl-3 border-l-2 border-[#F0E8D8] mb-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2.5 text-sm font-sans text-[#5C5C5C] hover:text-[#C4622D] rounded-lg hover:bg-[#FAF6EE] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-3 py-3 rounded-xl text-sm font-semibold font-sans transition-colors',
                        pathname === item.href
                          ? 'text-[#C4622D] bg-[#FAF6EE]'
                          : 'text-[#1A1A1A] hover:bg-[#FAF6EE] hover:text-[#C4622D]',
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-4 pb-6 flex flex-col gap-3 border-t border-[#F0E8D8] pt-4 mt-2">
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 bg-[#C4622D] text-white px-4 py-3 rounded-xl font-semibold font-sans text-sm"
              >
                Shop Wallpaper
              </Link>
              <Link
                href="/family-portraits"
                className="flex items-center justify-center gap-2 border-2 border-[#C4622D] text-[#C4622D] px-4 py-3 rounded-xl font-semibold font-sans text-sm"
              >
                Create Your Family Wall
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 text-sm font-sans text-[#5C5C5C]"
              >
                <User size={16} />
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
