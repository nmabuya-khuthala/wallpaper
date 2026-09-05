'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import type { Product, ProductCategory, ProductStyle, ProductRoom } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: { value: ProductCategory | ''; label: string }[] = [
  { value: '', label: 'All Products' },
  { value: 'bespoke-wallpaper', label: 'Bespoke Wallpaper' },
  { value: 'feature-walls', label: 'Feature Walls' },
  { value: 'family-portraits', label: 'Family Portraits' },
  { value: 'kids-nurseries', label: 'Kids & Nurseries' },
  { value: 'nature-botanicals', label: 'Nature & Botanicals' },
  { value: 'custom-designs', label: 'Custom Designs' },
  { value: 'murals', label: 'Murals' },
];

const STYLES: { value: ProductStyle; label: string }[] = [
  { value: 'botanical', label: 'Botanical' },
  { value: 'geometric', label: 'Geometric' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'floral', label: 'Floral' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'illustrated', label: 'Illustrated' },
  { value: 'photographic', label: 'Photographic' },
];

const ROOMS: { value: ProductRoom; label: string }[] = [
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kids-room', label: 'Kids Room' },
  { value: 'nursery', label: 'Nursery' },
  { value: 'dining-room', label: 'Dining Room' },
  { value: 'home-office', label: 'Home Office' },
  { value: 'entrance', label: 'Entrance' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

const PRICE_RANGES = [
  { label: 'Under R1,000', min: 0, max: 1000 },
  { label: 'R1,000 – R2,000', min: 1000, max: 2000 },
  { label: 'R2,000 – R3,000', min: 2000, max: 3000 },
  { label: 'Over R3,000', min: 3000, max: Infinity },
];

interface ShopPageClientProps {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ShopPageClient({
  products,
  initialCategory = '',
  initialSearch = '',
}: ShopPageClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [styles, setStyles] = useState<ProductStyle[]>([]);
  const [rooms, setRooms] = useState<ProductRoom[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  const toggleStyle = (s: ProductStyle) =>
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const toggleRoom = (r: ProductRoom) =>
    setRooms((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r],
    );

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setStyles([]);
    setRooms([]);
    setPriceRange(null);
    setSortBy('newest');
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (styles.length > 0)
      list = list.filter((p) => styles.some((s) => p.style.includes(s)));
    if (rooms.length > 0)
      list = list.filter((p) => rooms.some((r) => p.rooms.includes(r)));
    if (priceRange)
      list = list.filter(
        (p) =>
          p.pricing.basePrice >= priceRange.min &&
          p.pricing.basePrice <= priceRange.max,
      );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return list;
  }, [products, search, category, styles, rooms, priceRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount =
    (category ? 1 : 0) +
    styles.length +
    rooms.length +
    (priceRange ? 1 : 0);

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Page header */}
      <div className="bg-white border-b border-[#F0E8D8]">
        <div className="container-brand py-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop' },
            ]}
            className="mb-3"
          />
          <h1 className="font-display font-bold text-[#1A1A1A] text-3xl mb-1">
            Shop All Designs
          </h1>
          <p className="text-[#5C5C5C] font-sans text-sm">
            {filtered.length} products
          </p>
        </div>
      </div>

      <div className="container-brand py-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
            />
            <input
              type="search"
              placeholder="Search designs…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-base font-sans pl-9 py-2.5 text-sm"
              aria-label="Search products"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border font-sans text-sm font-medium transition-colors',
              filtersOpen
                ? 'bg-[#C4622D] text-white border-[#C4622D]'
                : 'bg-white border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
            )}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-white text-[#C4622D] rounded-full text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-base font-sans py-2.5 text-sm w-auto min-w-[180px] cursor-pointer"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Layout toggle */}
          <div className="flex items-center border border-[#E5DDD0] rounded-xl overflow-hidden">
            <button
              onClick={() => setLayout('grid')}
              className={cn(
                'p-2.5 transition-colors',
                layout === 'grid'
                  ? 'bg-[#C4622D] text-white'
                  : 'bg-white text-[#9A9A9A] hover:text-[#C4622D]',
              )}
              aria-label="Grid view"
              aria-pressed={layout === 'grid'}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={cn(
                'p-2.5 transition-colors',
                layout === 'list'
                  ? 'bg-[#C4622D] text-white'
                  : 'bg-white text-[#9A9A9A] hover:text-[#C4622D]',
              )}
              aria-label="List view"
              aria-pressed={layout === 'list'}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setCategory(cat.value); setPage(1); }}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-colors border',
                category === cat.value
                  ? 'bg-[#C4622D] text-white border-[#C4622D]'
                  : 'bg-white text-[#5C5C5C] border-[#E5DDD0] hover:border-[#C4622D] hover:text-[#C4622D]',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {filtersOpen && (
          <div className="bg-white rounded-2xl border border-[#F0E8D8] p-5 mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Style */}
              <div>
                <h3 className="text-xs font-semibold font-sans uppercase tracking-widest text-[#9A9A9A] mb-3">
                  Style
                </h3>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => toggleStyle(s.value)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors border',
                        styles.includes(s.value)
                          ? 'bg-[#C4622D] text-white border-[#C4622D]'
                          : 'bg-[#FAF6EE] text-[#5C5C5C] border-transparent hover:border-[#C4622D]',
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room */}
              <div>
                <h3 className="text-xs font-semibold font-sans uppercase tracking-widest text-[#9A9A9A] mb-3">
                  Room
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ROOMS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => toggleRoom(r.value)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-sans font-medium transition-colors border',
                        rooms.includes(r.value)
                          ? 'bg-[#2D5016] text-white border-[#2D5016]'
                          : 'bg-[#FAF6EE] text-[#5C5C5C] border-transparent hover:border-[#2D5016]',
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-xs font-semibold font-sans uppercase tracking-widest text-[#9A9A9A] mb-3">
                  Price
                </h3>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((pr) => (
                    <button
                      key={pr.label}
                      onClick={() =>
                        setPriceRange(
                          priceRange?.min === pr.min && priceRange?.max === pr.max
                            ? null
                            : { min: pr.min, max: pr.max },
                        )
                      }
                      className={cn(
                        'text-left px-3 py-1.5 rounded-lg text-sm font-sans transition-colors',
                        priceRange?.min === pr.min && priceRange?.max === pr.max
                          ? 'bg-[#C4622D]/10 text-[#C4622D] font-medium'
                          : 'text-[#5C5C5C] hover:bg-[#FAF6EE]',
                      )}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active filters / clear */}
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F0E8D8] flex-wrap">
                <span className="text-xs font-sans text-[#9A9A9A]">Active:</span>
                {category && (
                  <Badge variant="terracotta" size="sm">
                    {CATEGORIES.find((c) => c.value === category)?.label}
                    <button
                      onClick={() => setCategory('')}
                      className="ml-1 hover:text-red-500"
                      aria-label="Remove category filter"
                    >
                      <X size={10} />
                    </button>
                  </Badge>
                )}
                {styles.map((s) => (
                  <Badge key={s} variant="mustard" size="sm">
                    {s}
                    <button onClick={() => toggleStyle(s)} className="ml-1" aria-label={`Remove ${s} style filter`}>
                      <X size={10} />
                    </button>
                  </Badge>
                ))}
                <button
                  onClick={clearFilters}
                  className="ml-auto text-xs font-sans text-[#C4622D] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}

        {/* Products */}
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="font-display font-bold text-xl text-[#1A1A1A] mb-2">
              No products found
            </h3>
            <p className="text-[#5C5C5C] font-sans text-sm mb-6">
              Try adjusting your filters or search.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div
              className={cn(
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                  : 'flex flex-col gap-4',
              )}
            >
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout={layout}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl border border-[#E5DDD0] text-sm font-sans disabled:opacity-40 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      'w-9 h-9 rounded-xl text-sm font-sans font-medium transition-colors',
                      page === i + 1
                        ? 'bg-[#C4622D] text-white'
                        : 'border border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D] hover:text-[#C4622D]',
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-xl border border-[#E5DDD0] text-sm font-sans disabled:opacity-40 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
