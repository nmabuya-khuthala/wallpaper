'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cartStore';
import { cn, formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/ui/Breadcrumb';

const FINISH_LABELS: Record<string, string> = {
  matte: 'Matte', satin: 'Satin', gloss: 'Gloss',
  textured: 'Textured', fabric: 'Fabric', vinyl: 'Vinyl',
  'non-woven': 'Non-Woven', 'peel-and-stick': 'Peel & Stick',
};

export default function CartPageClient() {
  const { items, subtotal, deliveryTotal, total, itemCount, removeItem, updateQuantity } = useCartStore();
  const hasFreeDelivery = subtotal >= 5000;

  if (items.length === 0) {
    return (
      <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6] flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#F0E8D8] flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-[#C4622D]" />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">
            Your cart is empty
          </h1>
          <p className="text-[#5C5C5C] font-sans text-sm mb-6">
            Discover our bespoke wallpaper and portrait collections.
          </p>
          <Button variant="primary" size="lg" fullWidth as="a" href="/shop">
            Shop Wallpaper
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      <div className="bg-white border-b border-[#F0E8D8]">
        <div className="container-brand py-5">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} className="mb-2" />
          <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </div>

      <div className="container-brand py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => {
              const image = item.product.images.find((i) => i.isPrimary) ?? item.product.images[0];
              const finish = item.customisation.finish;
              const installation = item.customisation.installation;
              const panels = item.customisation.panelsRequired;
              const wall = item.customisation.wallMeasurements;

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 shadow-sm"
                >
                  {/* Image */}
                  <Link href={`/shop/${item.product.slug}`} className="relative w-24 h-28 sm:w-32 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-[#F0E8D8]">
                    {image && (
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-display font-semibold text-[#1A1A1A] hover:text-[#C4622D] transition-colors leading-tight"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-[#9A9A9A] hover:text-[#E05A4A] transition-colors rounded-lg hover:bg-red-50 shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Customisation tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {finish && (
                          <Badge variant="default" size="sm">{FINISH_LABELS[finish] ?? finish}</Badge>
                        )}
                        {panels && (
                          <Badge variant="terracotta" size="sm">{panels} panels</Badge>
                        )}
                        {wall && (
                          <Badge variant="cobalt" size="sm">{wall.width}m × {wall.height}m</Badge>
                        )}
                        {installation && (
                          <Badge variant={installation === 'professional' ? 'green' : 'default'} size="sm">
                            {installation === 'professional' ? '👷 Professional install' : '🛠️ DIY'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price + quantity */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      <div className="flex items-center border border-[#E5DDD0] rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#FAF6EE] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} className="text-[#5C5C5C]" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold font-sans text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#FAF6EE] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} className="text-[#5C5C5C]" />
                        </button>
                      </div>

                      <div className="text-right">
                        {item.installationPrice > 0 && (
                          <div className="text-xs font-sans text-[#9A9A9A]">
                            Products: {formatCurrency(item.unitPrice)}
                            <br />
                            Installation: {formatCurrency(item.installationPrice)}
                          </div>
                        )}
                        <span className="font-display font-bold text-lg text-[#1A1A1A]">
                          {formatCurrency(item.totalPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Continue shopping */}
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-sans font-medium text-[#C4622D] hover:gap-3 transition-all w-fit"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-28">
              <h2 className="font-display font-bold text-lg text-[#1A1A1A] mb-4">
                Order Summary
              </h2>

              {/* Delivery progress */}
              {!hasFreeDelivery && (
                <div className="bg-[#FAF6EE] rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck size={14} className="text-[#C4622D]" />
                    <span className="text-xs font-semibold font-sans text-[#2C2C2C]">
                      Add {formatCurrency(5000 - subtotal)} more for free delivery
                    </span>
                  </div>
                  <div className="w-full bg-[#F0E8D8] rounded-full h-1.5">
                    <div
                      className="bg-[#C4622D] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / 5000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {hasFreeDelivery && (
                <div className="bg-[#F0F5E8] rounded-xl p-3 mb-4 flex items-center gap-2">
                  <Truck size={14} className="text-[#2D5016]" />
                  <span className="text-xs font-semibold font-sans text-[#2D5016]">
                    🎉 You qualify for free delivery!
                  </span>
                </div>
              )}

              {/* Line items */}
              <dl className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between">
                  <dt className="text-sm font-sans text-[#5C5C5C]">Subtotal</dt>
                  <dd className="text-sm font-semibold font-sans text-[#1A1A1A]">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-sans text-[#5C5C5C]">Delivery</dt>
                  <dd className="text-sm font-semibold font-sans text-[#1A1A1A]">
                    {hasFreeDelivery ? (
                      <span className="text-[#2D5016]">Free</span>
                    ) : (
                      formatCurrency(deliveryTotal)
                    )}
                  </dd>
                </div>
              </dl>

              {/* Promo code */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="input-base font-sans text-sm pl-8"
                    aria-label="Enter promo code"
                  />
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-[#2C2C2C] text-white text-sm font-semibold font-sans hover:bg-[#1A1A1A] transition-colors whitespace-nowrap">
                  Apply
                </button>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-[#F0E8D8] pt-4 mb-5">
                <span className="font-display font-bold text-lg text-[#1A1A1A]">Total</span>
                <span className="font-display font-bold text-2xl text-[#C4622D]">
                  {formatCurrency(hasFreeDelivery ? subtotal : total)}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight size={16} />}
                as="a"
                href="/checkout"
              >
                PROCEED TO CHECKOUT
              </Button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-xs font-sans text-[#9A9A9A]">🔒 Secure checkout</span>
                <span className="text-[#E5DDD0]">·</span>
                <span className="text-xs font-sans text-[#9A9A9A]">SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
