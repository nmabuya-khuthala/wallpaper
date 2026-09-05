'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User, Package, Heart, Palette, MapPin, LogOut,
  ChevronRight, CheckCircle2, Clock,
} from 'lucide-react';
import { useOrderStore } from '@/lib/stores/orderStore';
import { useCartStore } from '@/lib/stores/cartStore';
import { formatCurrency, formatDateShort, getOrderStatusLabel } from '@/lib/utils';
import { getAllProducts } from '@/lib/data/products';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

type Tab = 'orders' | 'wishlist' | 'designs' | 'profile';

const STATUS_COLOURS: Record<string, string> = {
  'order-received': 'status-order-received',
  'design-review': 'status-design-review',
  'production': 'status-production',
  'ready-dispatch': 'status-ready-dispatch',
  'out-for-delivery': 'status-out-for-delivery',
  'installation-scheduled': 'status-installation-scheduled',
  'completed': 'status-completed',
};

export default function AccountClient() {
  const [tab, setTab] = useState<Tab>('orders');
  const { orders } = useOrderStore();
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const allProducts = getAllProducts();
  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'orders',  label: 'My Orders',       icon: <Package size={18} /> },
    { id: 'wishlist',label: 'Wishlist',         icon: <Heart size={18} /> },
    { id: 'designs', label: 'Saved Designs',    icon: <Palette size={18} /> },
    { id: 'profile', label: 'Profile',          icon: <User size={18} /> },
  ];

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-white border-b border-[#F0E8D8]">
        <div className="container-brand py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#C4622D]/10 flex items-center justify-center text-[#C4622D] font-bold font-display text-xl">
              G
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-[#1A1A1A]">
                Welcome back!
              </h1>
              <p className="text-sm font-sans text-[#9A9A9A]">
                {orders.length} orders · {wishlist.length} saved items
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-brand py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Sidebar nav */}
          <div className="md:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-sans font-medium transition-colors border-b border-[#F0E8D8] last:border-0 ${
                    tab === item.id
                      ? 'bg-[#C4622D]/5 text-[#C4622D]'
                      : 'text-[#5C5C5C] hover:bg-[#FAF6EE] hover:text-[#1A1A1A]'
                  }`}
                  aria-current={tab === item.id ? 'page' : undefined}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </span>
                  <ChevronRight size={14} className="text-[#9A9A9A]" />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-sans font-medium text-[#E05A4A] hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">

            {/* Orders */}
            {tab === 'orders' && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <Package size={36} className="text-[#9A9A9A] mx-auto mb-3" />
                    <p className="font-sans text-[#5C5C5C] mb-4">No orders yet.</p>
                    <Button variant="primary" as="a" href="/shop">Start Shopping</Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-2xl shadow-sm p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="font-semibold font-sans text-[#1A1A1A] text-sm">
                              {order.orderNumber}
                            </p>
                            <p className="text-xs font-sans text-[#9A9A9A]">
                              {formatDateShort(order.createdAt)}
                            </p>
                          </div>
                          <span className={`badge ${STATUS_COLOURS[order.status] ?? 'status-order-received'}`}>
                            {getOrderStatusLabel(order.status)}
                          </span>
                        </div>

                        {/* Items preview */}
                        <div className="flex items-center gap-2 mb-3">
                          {order.items.slice(0, 3).map((item) => {
                            const img = item.product.images[0];
                            return (
                              <div key={item.id} className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F0E8D8]">
                                {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="48px" />}
                              </div>
                            );
                          })}
                          {order.items.length > 3 && (
                            <div className="w-12 h-12 rounded-lg bg-[#F0E8D8] flex items-center justify-center">
                              <span className="text-xs font-bold font-sans text-[#C4622D]">+{order.items.length - 3}</span>
                            </div>
                          )}
                          <div className="ml-auto">
                            <span className="font-display font-bold text-lg text-[#1A1A1A]">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/order/confirmation?order=${order.orderNumber}`}
                            className="text-xs font-semibold font-sans text-[#C4622D] hover:underline"
                          >
                            View Order →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist */}
            {tab === 'wishlist' && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">
                  Wishlist ({wishlistProducts.length})
                </h2>
                {wishlistProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <Heart size={36} className="text-[#9A9A9A] mx-auto mb-3" />
                    <p className="font-sans text-[#5C5C5C] mb-4">Your wishlist is empty.</p>
                    <Button variant="primary" as="a" href="/shop">Browse Designs</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((product) => {
                      const img = product.images[0];
                      return (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex gap-3 p-3">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F0E8D8]">
                            {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <Link href={`/shop/${product.slug}`} className="font-semibold font-sans text-sm text-[#1A1A1A] hover:text-[#C4622D] transition-colors line-clamp-1">
                                {product.name}
                              </Link>
                              <p className="text-xs font-sans text-[#9A9A9A] line-clamp-1">{product.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-display font-bold text-sm text-[#1A1A1A]">
                                {formatCurrency(product.pricing.basePrice)}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <Link href={`/shop/${product.slug}`} className="text-xs font-semibold font-sans text-[#C4622D] hover:underline">
                                  View
                                </Link>
                                <button
                                  onClick={() => toggleWishlist(product.id)}
                                  className="text-xs font-sans text-[#9A9A9A] hover:text-[#E05A4A]"
                                  aria-label="Remove from wishlist"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Saved Designs */}
            {tab === 'designs' && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">Saved Designs</h2>
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                  <Palette size={36} className="text-[#9A9A9A] mx-auto mb-3" />
                  <p className="font-sans text-[#5C5C5C] mb-2">No saved designs yet.</p>
                  <p className="text-xs font-sans text-[#9A9A9A] mb-4">
                    When you customise a product, you can save your configuration here.
                  </p>
                  <Button variant="primary" as="a" href="/shop">Customise a Design</Button>
                </div>
              </div>
            )}

            {/* Profile */}
            {tab === 'profile' && (
              <div>
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">Profile</h2>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1">First Name</p>
                        <p className="font-sans text-[#1A1A1A]">—</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1">Last Name</p>
                        <p className="font-sans text-[#1A1A1A]">—</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1">Email</p>
                        <p className="font-sans text-[#1A1A1A]">—</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1">Phone</p>
                        <p className="font-sans text-[#1A1A1A]">—</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#F0E8D8]">
                      <p className="text-xs font-sans text-[#9A9A9A] mb-3">
                        Account authentication integrates with Supabase Auth. Connect your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable full account management.
                      </p>
                      <Button variant="primary" size="sm">
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
