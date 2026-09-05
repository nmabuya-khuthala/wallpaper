'use client';

import { create } from 'zustand';
import type { Order } from '@/types';
import { generateOrderNumber } from '@/lib/utils';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrder: null,

  setCurrentOrder: (order) => set({ currentOrder: order }),

  addOrder: (orderData) => {
    const now = new Date().toISOString();
    const order: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ orders: [...state.orders, order], currentOrder: order }));
    return order;
  },

  getOrderByNumber: (orderNumber) =>
    get().orders.find((o) => o.orderNumber === orderNumber),

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, status, updatedAt: new Date().toISOString() }
          : o,
      ),
    }));
  },
}));
