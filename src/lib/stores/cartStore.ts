'use client';

import { create } from 'zustand';
import type {
  CartItem,
  Product,
  CartItemCustomisation,
  InstallationOption,
  MaterialFinish,
  WallMeasurement,
} from '@/types';
import { calculateWallRequirements, calculateCartItemPrice, getCartTotals } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  // Derived totals
  subtotal: number;
  installationTotal: number;
  deliveryTotal: number;
  total: number;
  itemCount: number;

  // Actions
  addItem: (product: Product, customisation: CartItemCustomisation) => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, customisation: Partial<CartItemCustomisation>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

function computeTotals(items: CartItem[]) {
  const totals = getCartTotals(items);
  return {
    subtotal: totals.subtotal,
    installationTotal: totals.installationTotal,
    deliveryTotal: totals.delivery,
    total: totals.total,
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

function buildCartItem(
  product: Product,
  customisation: CartItemCustomisation,
): CartItem {
  let panelsRequired = customisation.panelsRequired ?? 1;

  // Auto-calculate panels if wall measurements provided
  if (customisation.wallMeasurements) {
    const calc = calculateWallRequirements(
      customisation.wallMeasurements,
      product.measurements,
      product.pricing,
    );
    panelsRequired = calc.panelsRequired;
  }

  const enrichedCustomisation: CartItemCustomisation = {
    ...customisation,
    panelsRequired,
  };

  const { unitPrice, installationPrice, totalPrice } = calculateCartItemPrice(
    enrichedCustomisation,
    product.pricing.basePrice,
    product.pricing.installationPrice ?? 450,
  );

  return {
    id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    product,
    quantity: 1,
    customisation: enrichedCustomisation,
    unitPrice,
    installationPrice,
    totalPrice,
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  installationTotal: 0,
  deliveryTotal: 0,
  total: 0,
  itemCount: 0,
  wishlist: [],

  addItem: (product, customisation) => {
    const newItem = buildCartItem(product, customisation);
    const items = [...get().items, newItem];
    set({ items, ...computeTotals(items) });
  },

  removeItem: (itemId) => {
    const items = get().items.filter((i) => i.id !== itemId);
    set({ items, ...computeTotals(items) });
  },

  updateItem: (itemId, partialCustomisation) => {
    const items = get().items.map((item) => {
      if (item.id !== itemId) return item;
      const updatedCustomisation: CartItemCustomisation = {
        ...item.customisation,
        ...partialCustomisation,
      };
      return buildCartItem(item.product, updatedCustomisation);
    });
    set({ items, ...computeTotals(items) });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    const items = get().items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity,
            totalPrice: (item.unitPrice + item.installationPrice) * quantity,
          }
        : item,
    );
    set({ items, ...computeTotals(items) });
  },

  clearCart: () =>
    set({
      items: [],
      subtotal: 0,
      installationTotal: 0,
      deliveryTotal: 0,
      total: 0,
      itemCount: 0,
    }),

  toggleWishlist: (productId) => {
    const wishlist = get().wishlist;
    set({
      wishlist: wishlist.includes(productId)
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId],
    });
  },

  isInWishlist: (productId) => get().wishlist.includes(productId),
}));
