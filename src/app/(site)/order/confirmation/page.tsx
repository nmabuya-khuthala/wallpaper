import type { Metadata } from 'next';
import OrderConfirmationClient from '@/components/order/OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmed — Thank You!',
  description: 'Your Haosail order has been confirmed. We\'re busy preparing your bespoke wallpaper.',
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}
