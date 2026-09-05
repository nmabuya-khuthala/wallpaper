'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, ShoppingBag, Palette,
  Wrench, Star, Home, Menu, X, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin',                icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products',       icon: Package,         label: 'Products' },
  { href: '/admin/orders',         icon: ShoppingBag,     label: 'Orders' },
  { href: '/admin/custom-requests',icon: Palette,         label: 'Custom Requests' },
  { href: '/admin/installers',     icon: Wrench,          label: 'Installers' },
  { href: '/admin/reviews',        icon: Star,            label: 'Reviews' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col bg-[#2C2C2C] text-white transition-all duration-300',
        open ? 'w-56' : 'w-16',
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/gallery/logo.png" alt="Haosail" fill className="object-contain" />
          </div>
          {open && (
            <div>
              <span className="font-display font-bold text-sm">Haosail</span>
              <span className="block text-[10px] font-sans text-white/40 uppercase tracking-wider">Admin</span>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto p-1 rounded hover:bg-white/10 text-white/60 hover:text-white"
            aria-label="Toggle sidebar"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'admin-sidebar-link',
                  active && 'active',
                  !open && 'justify-center px-2',
                )}
                title={!open ? label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {open && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className={cn(
              'admin-sidebar-link text-xs',
              !open && 'justify-center',
            )}
            target="_blank"
          >
            <ExternalLink size={14} className="shrink-0" />
            {open && 'View Site'}
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#2C2C2C] text-white flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image src="/gallery/logo.png" alt="Haosail" fill className="object-contain" />
          </div>
          <span className="font-display font-bold text-sm">Admin</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-white/10"
          aria-label="Toggle mobile menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 pt-14" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-14 bottom-0 w-56 bg-[#2C2C2C] text-white flex flex-col py-4 px-2 gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn('admin-sidebar-link', active && 'active')}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
            <Link href="/" className="admin-sidebar-link mt-auto" target="_blank">
              <ExternalLink size={14} />
              View Site
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
