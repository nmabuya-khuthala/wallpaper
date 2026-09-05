'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Search, Edit2, Eye, Trash2, Circle, Star } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface Props { products: Product[] }

export default function AdminProductsClient({ products }: Props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'featured'>('all');

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ? true :
      filter === 'active' ? p.available :
      p.featured;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Products</h1>
          <p className="text-sm font-sans text-[#9A9A9A]">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-5 py-2.5 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base font-sans pl-9 py-2 text-sm"
          />
        </div>
        {(['all', 'active', 'featured'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-sans font-medium border transition-colors capitalize',
              filter === f ? 'bg-[#C4622D] text-white border-[#C4622D]' : 'bg-white border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-[#F0E8D8] bg-[#FDFAF6]">
                {['Product', 'Category', 'Price', 'Status', 'Rating', 'Actions'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D8]">
              {filtered.map((product) => {
                const img = product.images[0];
                return (
                  <tr key={product.id} className="hover:bg-[#FDFAF6] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F0E8D8] shrink-0">
                          {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="40px" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold font-sans text-[#1A1A1A]">{product.name}</p>
                          <p className="text-xs font-sans text-[#9A9A9A] truncate max-w-[180px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-sans text-[#5C5C5C] capitalize">{product.category.replace(/-/g, ' ')}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold font-sans text-[#1A1A1A]">{formatCurrency(product.pricing.basePrice)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className={cn('flex items-center gap-1 text-xs font-sans font-medium', product.available ? 'text-[#2D5016]' : 'text-[#9A9A9A]')}>
                          <Circle size={6} fill="currentColor" />
                          {product.available ? 'Active' : 'Inactive'}
                        </div>
                        {product.featured && (
                          <div className="flex items-center gap-1 text-xs font-sans text-[#A87D12]">
                            <Star size={10} fill="currentColor" /> Featured
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-[#D4A017]" fill="currentColor" />
                        <span className="text-sm font-sans text-[#1A1A1A]">{product.rating}</span>
                        <span className="text-xs font-sans text-[#9A9A9A]">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/shop/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#9A9A9A] hover:text-[#1B4F8C] rounded-lg hover:bg-[#EEF2FA] transition-colors"
                          title="View on site"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          className="p-1.5 text-[#9A9A9A] hover:text-[#C4622D] rounded-lg hover:bg-[#FAF0E6] transition-colors"
                          title="Edit product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="p-1.5 text-[#9A9A9A] hover:text-[#E05A4A] rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm font-sans text-[#9A9A9A]">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
