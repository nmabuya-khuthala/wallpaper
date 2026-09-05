'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Package, Truck, Wrench, Star } from 'lucide-react';
import { useOrderStore } from '@/lib/stores/orderStore';
import { formatCurrency, formatDate, getOrderStatusLabel } from '@/lib/utils';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

const ORDER_STEPS = [
  { status: 'order-received',         label: 'Order Received',        icon: CheckCircle2, desc: 'We\'ve received your order and payment.' },
  { status: 'design-review',          label: 'Artwork Review',         icon: Star,         desc: 'Our design team reviews your artwork.' },
  { status: 'production',             label: 'In Production',          icon: Package,      desc: 'Your wallpaper is being printed.' },
  { status: 'ready-dispatch',         label: 'Ready for Dispatch',     icon: Package,      desc: 'Packed and ready to go.' },
  { status: 'out-for-delivery',       label: 'Out for Delivery',       icon: Truck,        desc: 'On its way to you.' },
  { status: 'installation-scheduled', label: 'Installation Scheduled', icon: Wrench,       desc: 'Installer assigned and confirmed.' },
  { status: 'completed',              label: 'Completed',              icon: CheckCircle2, desc: 'Your wall has been transformed!' },
];

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const orderNumber  = searchParams.get('order');
  const { orders, currentOrder } = useOrderStore();
  const order = orderNumber
    ? orders.find((o) => o.orderNumber === orderNumber)
    : currentOrder;

  if (!order) {
    return (
      <div className="pt-[70px] md:pt-[94px] min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <p className="font-sans text-[#5C5C5C] mb-4">Order not found.</p>
          <Button variant="primary" as="a" href="/">Go Home</Button>
        </div>
      </div>
    );
  }

  const currentStepIndex = ORDER_STEPS.findIndex((s) => s.status === order.status);

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <div className="bg-[#2D5016] text-white py-12 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} className="text-white" />
        </div>
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
          ORDER CONFIRMED 🎉
        </h1>
        <p className="text-white/80 font-sans text-base mb-2">
          Thank you, {order.customerInfo.firstName}!
        </p>
        <p className="text-white/60 font-sans text-sm">
          Order reference: <strong className="text-white">{order.orderNumber}</strong>
        </p>
        <p className="text-white/60 font-sans text-xs mt-1">
          Confirmation sent to {order.customerInfo.email}
        </p>
      </div>

      <div className="container-brand py-8 max-w-3xl">

        {/* Status tracker */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="font-display font-bold text-lg text-[#1A1A1A] mb-5">
            Order Status
          </h2>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[#F0E8D8]" aria-hidden="true">
              <div
                className="bg-[#2D5016] w-full transition-all duration-500"
                style={{
                  height: `${Math.min(100, (currentStepIndex / (ORDER_STEPS.length - 1)) * 100)}%`,
                }}
              />
            </div>

            <ol className="flex flex-col gap-5">
              {ORDER_STEPS.map((step, i) => {
                const Icon = step.icon;
                const done = i < currentStepIndex;
                const active = i === currentStepIndex;
                return (
                  <li key={step.status} className="flex items-start gap-4 pl-0">
                    <div className={cn_simple(
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 relative border-2',
                      done ? 'bg-[#2D5016] border-[#2D5016] text-white' :
                      active ? 'bg-[#C4622D] border-[#C4622D] text-white' :
                      'bg-white border-[#E5DDD0] text-[#9A9A9A]',
                    )}>
                      <Icon size={16} />
                    </div>
                    <div className={cn_simple('pt-2', !done && !active && 'opacity-50')}>
                      <p className={cn_simple(
                        'font-semibold font-sans text-sm',
                        active ? 'text-[#C4622D]' : done ? 'text-[#2D5016]' : 'text-[#9A9A9A]',
                      )}>
                        {step.label}
                        {active && <span className="ml-2 text-[10px] bg-[#C4622D]/10 text-[#C4622D] px-2 py-0.5 rounded-full font-medium">Current</span>}
                      </p>
                      <p className="text-xs font-sans text-[#9A9A9A] mt-0.5">{step.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Order details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          {/* Products */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#1A1A1A] mb-4">Items Ordered</h3>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => {
                const img = item.product.images[0];
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F0E8D8]">
                      {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="48px" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold font-sans text-[#1A1A1A] truncate">{item.product.name}</p>
                      {item.customisation.panelsRequired && (
                        <p className="text-xs font-sans text-[#9A9A9A]">{item.customisation.panelsRequired} panels</p>
                      )}
                    </div>
                    <p className="text-sm font-bold font-sans text-[#1A1A1A] shrink-0">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary & delivery */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#1A1A1A] mb-4">Order Summary</h3>
            <dl className="flex flex-col gap-2 text-sm font-sans">
              <div className="flex justify-between">
                <dt className="text-[#5C5C5C]">Subtotal</dt>
                <dd className="font-medium text-[#1A1A1A]">{formatCurrency(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5C5C5C]">Delivery</dt>
                <dd className="font-medium text-[#1A1A1A]">
                  {order.deliveryTotal === 0 ? <span className="text-[#2D5016]">Free</span> : formatCurrency(order.deliveryTotal)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-[#F0E8D8] pt-2 mt-1">
                <dt className="font-bold text-[#1A1A1A]">Total Paid</dt>
                <dd className="font-display font-bold text-xl text-[#2D5016]">
                  {formatCurrency(order.total)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 pt-4 border-t border-[#F0E8D8]">
              <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-2">
                Delivery to
              </p>
              <p className="text-sm font-sans text-[#1A1A1A]">
                {order.deliveryAddress.line1}, {order.deliveryAddress.suburb}, {order.deliveryAddress.city}
              </p>
              <p className="text-sm font-sans text-[#5C5C5C]">
                {order.deliveryAddress.province}, {order.deliveryAddress.postalCode}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-[#F0E8D8]">
              <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1">
                Installation
              </p>
              <p className="text-sm font-sans text-[#1A1A1A] capitalize">
                {order.installation === 'professional' ? '👷 Professional Installation' : '🛠️ DIY Installation'}
              </p>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#FAF6EE] rounded-2xl p-5 mb-6">
          <h3 className="font-display font-semibold text-[#1A1A1A] mb-3">What happens next?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { emoji: '📧', title: 'Confirmation Email', desc: 'Check your inbox for your order confirmation with all details.' },
              { emoji: '🎨', title: 'Design Review', desc: 'Our team reviews your artwork and will contact you if we have questions.' },
              { emoji: '📦', title: 'Production & Delivery', desc: 'Your wallpaper is custom-printed and dispatched within 5–7 business days.' },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center text-center gap-2 p-3">
                <span className="text-3xl">{step.emoji}</span>
                <p className="font-semibold font-sans text-sm text-[#1A1A1A]">{step.title}</p>
                <p className="text-xs font-sans text-[#5C5C5C] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg" as="a" href="/account/orders">
            Track My Order
          </Button>
          <Button variant="outline" size="lg" as="a" href="/shop">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

function cn_simple(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
