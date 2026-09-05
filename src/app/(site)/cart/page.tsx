import type { Metadata } from 'next';
import CartPageClient from '@/components/cart/CartPageClient';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your selected wallpaper products, customisations and installation options before checking out.',
};

export default function CartPage() {
  return <CartPageClient />;
}
