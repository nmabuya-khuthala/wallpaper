'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package, ShoppingBag, Star, TrendingUp,
  Eye, Palette, Wrench, ArrowRight, Circle,
} from 'lucide-react';
import { formatCurrency, getOrderStatusLabel } from '@/lib/utils';
import { useOrderStore } from '@/lib/stores/orderStore';
import type { Product } from '@/types';

interface Props {
  products: Product[];
  reviewCount: number;
}

export default function AdminDashboardClient({ products, reviewCount }: Props) {
  const { orders } = useOrderStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'order-received').length;
  const featuredCount = products.filter((p) => p.featured).length;

  const STATS = [
    { label: 'Total Revenue',    value: formatCurrency(totalRevenue),  icon: TrendingUp, colour: 'bg-[#FAF0E6] text-[#C4622D]', trend: '+12%' },
    { label: 'Total Orders',     value: orders.length,                 icon: ShoppingBag,colour: 'bg-[#EEF2FA] text-[#1B4F8C]', trend: '+5%'  },
    { label: 'Products Listed',  value: products.length,               icon: Package,    colour: 'bg-[#F0F5E8] text-[#2D5016]', trend: null    },
    { label: 'Reviews',          value: reviewCount,                   icon: Star,       colour: 'bg-[#FDF8E8] text-[#A87D12]', trend: null    },
  ];

  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm font-sans text-[#9A9A9A] mt-1">
          Welcome back. Here&apos;s what&apos;s happening with Haosail.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.colour}`}>
                <Icon size={18} />
              </div>
              <p className="font-display font-bold text-2xl text-[#1A1A1A]">{stat.value}</p>
              <p className="text-xs font-sans text-[#9A9A9A] mt-1">{stat.label}</p>
              {stat.trend && (
                <p className="text-xs font-sans text-[#2D5016] font-semibold mt-1">{stat.trend} this month</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Recent orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0E8D8]">
            <h2 className="font-display font-semibold text-[#1A1A1A]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-sans text-[#C4622D] hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {orders.length === 0 ? (
            <div className="p-6 text-center text-sm font-sans text-[#9A9A9A]">No orders yet.</div>
          ) : (
            <div className="divide-y divide-[#F0E8D8]">
              {orders.slice(-5).reverse().map((order) => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#FDFAF6]">
                  <div>
                    <p className="text-sm font-semibold font-sans text-[#1A1A1A]">{order.orderNumber}</p>
                    <p className="text-xs font-sans text-[#9A9A9A]">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-sans text-[#1A1A1A]">{formatCurrency(order.total)}</p>
                    <span className={`text-[10px] font-semibold font-sans px-2 py-0.5 rounded-full badge status-${order.status}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0E8D8]">
            <h2 className="font-display font-semibold text-[#1A1A1A]">Products</h2>
            <Link href="/admin/products" className="text-xs font-sans text-[#C4622D] hover:underline flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#F0E8D8]">
            {products.slice(0, 5).map((product) => {
              const img = product.images[0];
              return (
                <div key={product.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#FDFAF6]">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F0E8D8] shrink-0">
                    {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="40px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold font-sans text-[#1A1A1A] truncate">{product.name}</p>
                    <p className="text-xs font-sans text-[#9A9A9A] capitalize">{product.category.replace(/-/g, ' ')}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold font-sans text-[#1A1A1A]">{formatCurrency(product.pricing.basePrice)}</p>
                    <div className={`flex items-center gap-1 justify-end text-[10px] font-sans ${product.available ? 'text-[#2D5016]' : 'text-[#9A9A9A]'}`}>
                      <Circle size={6} fill="currentColor" />
                      {product.available ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Add Product',      href: '/admin/products/new',  icon: Package,  colour: 'bg-[#C4622D]' },
          { label: 'View Orders',      href: '/admin/orders',        icon: ShoppingBag, colour: 'bg-[#1B4F8C]' },
          { label: 'Custom Requests',  href: '/admin/custom-requests', icon: Palette, colour: 'bg-[#2D5016]' },
          { label: 'Manage Installers',href: '/admin/installers',    icon: Wrench,   colour: 'bg-[#A87D12]' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.colour} text-white rounded-2xl p-5 flex flex-col gap-3 hover:opacity-90 transition-opacity`}
            >
              <Icon size={22} />
              <span className="font-semibold font-sans text-sm">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
