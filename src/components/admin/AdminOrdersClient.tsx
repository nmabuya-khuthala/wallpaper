'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Search } from 'lucide-react';
import { cn, formatCurrency, formatDateShort, getOrderStatusLabel } from '@/lib/utils';
import { useOrderStore } from '@/lib/stores/orderStore';
import type { OrderStatus } from '@/types';

const STATUSES: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all',                    label: 'All' },
  { value: 'order-received',         label: 'Received' },
  { value: 'design-review',          label: 'Design Review' },
  { value: 'production',             label: 'Production' },
  { value: 'ready-dispatch',         label: 'Ready' },
  { value: 'out-for-delivery',       label: 'Delivery' },
  { value: 'installation-scheduled', label: 'Installation' },
  { value: 'completed',              label: 'Completed' },
];

const STATUS_CLASSES: Record<string, string> = {
  'order-received': 'status-order-received',
  'design-review': 'status-design-review',
  'production': 'status-production',
  'ready-dispatch': 'status-ready-dispatch',
  'out-for-delivery': 'status-out-for-delivery',
  'installation-scheduled': 'status-installation-scheduled',
  'completed': 'status-completed',
};

export default function AdminOrdersClient() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      `${o.customerInfo.firstName} ${o.customerInfo.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      o.customerInfo.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Orders</h1>
        <p className="text-sm font-sans text-[#9A9A9A]">{orders.length} total orders</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative min-w-[220px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
          <input type="search" placeholder="Search orders…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-base font-sans pl-9 py-2 text-sm" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-sans font-medium border transition-colors',
                statusFilter === s.value ? 'bg-[#C4622D] text-white border-[#C4622D]' : 'bg-white border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-sm font-sans text-[#9A9A9A]">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F0E8D8] bg-[#FDFAF6]">
                  {['Order', 'Customer', 'Items', 'Total', 'Status', 'Installation', 'Date', 'Actions'].map((col) => (
                    <th key={col} className="text-left px-4 py-3 text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E8D8]">
                {[...filtered].reverse().map((order) => (
                  <tr key={order.id} className="hover:bg-[#FDFAF6] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold font-sans text-[#1A1A1A]">{order.orderNumber}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-sans text-[#1A1A1A]">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                      <p className="text-xs font-sans text-[#9A9A9A]">{order.customerInfo.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex -space-x-1.5">
                        {order.items.slice(0, 3).map((item) => {
                          const img = item.product.images[0];
                          return (
                            <div key={item.id} className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white bg-[#F0E8D8]">
                              {img && <Image src={img.url} alt="" fill className="object-cover" sizes="32px" />}
                            </div>
                          );
                        })}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-lg bg-[#F0E8D8] flex items-center justify-center border-2 border-white">
                            <span className="text-[9px] font-bold text-[#C4622D]">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-bold font-sans text-[#1A1A1A]">{formatCurrency(order.total)}</p>
                      <p className={`text-xs font-sans ${order.paymentStatus === 'paid' ? 'text-[#2D5016]' : 'text-[#E05A4A]'}`}>
                        {order.paymentStatus}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold font-sans px-2 py-1 rounded-full border-0 cursor-pointer outline-none ${STATUS_CLASSES[order.status] ?? 'status-order-received'}`}
                        aria-label="Update order status"
                      >
                        {STATUSES.filter((s) => s.value !== 'all').map((s) => (
                          <option key={s.value} value={s.value}>{getOrderStatusLabel(s.value as OrderStatus)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-sans text-[#5C5C5C] capitalize">{order.installation}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-sans text-[#9A9A9A] whitespace-nowrap">{formatDateShort(order.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/order/confirmation?order=${order.orderNumber}`} target="_blank" className="p-1.5 text-[#9A9A9A] hover:text-[#1B4F8C] rounded-lg hover:bg-[#EEF2FA] transition-colors inline-flex" title="View order">
                        <Eye size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
