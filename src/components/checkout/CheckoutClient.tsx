'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, CreditCard, Smartphone, Building2, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn, formatCurrency, isValidEmail, isValidPhone, isValidPostalCode, SA_PROVINCES } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';
import { useOrderStore } from '@/lib/stores/orderStore';
import Button from '@/components/ui/Button';
import Input, { Select } from '@/components/ui/Input';
import type { CheckoutFormData, Address, CustomerInfo, InstallationOption } from '@/types';

type CheckoutStep = 'info' | 'delivery' | 'payment';

const PROVINCE_OPTIONS = SA_PROVINCES.map((p) => ({ value: p, label: p }));

const PAYMENT_METHODS = [
  { value: 'card',        label: 'Credit / Debit Card',  icon: CreditCard,  desc: 'Visa, Mastercard, Amex' },
  { value: 'instant-eft', label: 'Instant EFT',           icon: Building2,   desc: 'Pay via your bank app' },
  { value: 'eft',         label: 'Manual EFT',            icon: Smartphone,  desc: 'Bank transfer with reference' },
] as const;

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, total, deliveryTotal, installationTotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const hasFreeDelivery = subtotal >= 5000;
  const deliveryAmount  = hasFreeDelivery ? 0 : deliveryTotal;

  const [step, setStep] = useState<CheckoutStep>('info');
  const [submitting, setSubmitting] = useState(false);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '', lastName: '', email: '', phone: '',
  });
  const [address, setAddress] = useState<Address>({
    line1: '', line2: '', suburb: '', city: '', province: '', postalCode: '', country: 'South Africa',
  });
  const [delivery, setDelivery] = useState<'delivery' | 'collection'>('delivery');
  const [installation, setInstallation] = useState<InstallationOption>('diy');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'eft' | 'instant-eft'>('card');
  const [infoErrors, setInfoErrors] = useState<Partial<Record<string, string>>>({});
  const [addressErrors, setAddressErrors] = useState<Partial<Record<string, string>>>({});

  const validateInfo = () => {
    const errs: Record<string, string> = {};
    if (!customerInfo.firstName.trim()) errs.firstName = 'Required';
    if (!customerInfo.lastName.trim())  errs.lastName  = 'Required';
    if (!customerInfo.email.trim())     errs.email = 'Required';
    else if (!isValidEmail(customerInfo.email)) errs.email = 'Invalid email';
    if (!customerInfo.phone.trim())     errs.phone = 'Required';
    else if (!isValidPhone(customerInfo.phone)) errs.phone = 'Invalid SA number';
    setInfoErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddress = () => {
    const errs: Record<string, string> = {};
    if (delivery === 'delivery') {
      if (!address.line1.trim())    errs.line1    = 'Required';
      if (!address.suburb.trim())   errs.suburb   = 'Required';
      if (!address.city.trim())     errs.city     = 'Required';
      if (!address.province)        errs.province = 'Required';
      if (!address.postalCode.trim())           errs.postalCode = 'Required';
      else if (!isValidPostalCode(address.postalCode)) errs.postalCode = '4-digit code';
    }
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    setSubmitting(true);
    // Payment integration layer:
    // In production: redirect to PayFast/Yoco/Peach hosted payment page.
    // The payment provider calls /api/payment/notify on success,
    // which updates the order status and sends confirmation email.
    // For now we simulate a successful payment after a short delay.
    setTimeout(() => {
      const order = addOrder({
        customerInfo,
        items: items.map((i) => ({ ...i, orderId: '' })),
        subtotal,
        installationTotal,
        deliveryTotal: deliveryAmount,
        discount: 0,
        total: subtotal + deliveryAmount,
        status: 'order-received',
        paymentStatus: 'paid',
        paymentReference: `PAY-${Date.now()}`,
        deliveryMethod: delivery,
        deliveryAddress: address,
        installation,
      });
      clearCart();
      router.push(`/order/confirmation?order=${order.orderNumber}`);
    }, 2000);
  };

  const STEPS = [
    { id: 'info',     label: 'Your Info' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment',  label: 'Payment' },
  ];

  if (items.length === 0) {
    return (
      <div className="pt-[70px] md:pt-[94px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-[#5C5C5C] mb-4">Your cart is empty.</p>
          <Button variant="primary" as="a" href="/shop">Shop Now</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Progress */}
      <div className="bg-white border-b border-[#F0E8D8] sticky top-[70px] md:top-[94px] z-20">
        <div className="container-brand py-3">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const idx = STEPS.findIndex((x) => x.id === step);
              const done = i < idx;
              const active = s.id === step;
              return (
                <React.Fragment key={s.id}>
                  <button
                    className={cn(
                      'flex items-center gap-2 text-xs font-semibold font-sans px-3 py-1.5 rounded-full transition-colors',
                      active ? 'bg-[#C4622D] text-white' : done ? 'text-[#2D5016]' : 'text-[#9A9A9A]',
                    )}
                    onClick={() => done && setStep(s.id as CheckoutStep)}
                    disabled={!done && !active}
                  >
                    {done ? <CheckCircle2 size={12} /> : <span className={cn('w-4 h-4 rounded-full flex items-center justify-center text-[10px]', active ? 'bg-white text-[#C4622D]' : 'bg-[#F0E8D8] text-[#9A9A9A]')}>{i + 1}</span>}
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={cn('flex-1 h-0.5', done ? 'bg-[#2D5016]' : 'bg-[#E5DDD0]')} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-brand py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">

            {/* Step: Info */}
            {step === 'info' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-5">Your Information</h2>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" value={customerInfo.firstName} onChange={(e) => setCustomerInfo((c) => ({ ...c, firstName: e.target.value }))} error={infoErrors.firstName} required />
                    <Input label="Last Name" value={customerInfo.lastName} onChange={(e) => setCustomerInfo((c) => ({ ...c, lastName: e.target.value }))} error={infoErrors.lastName} required />
                  </div>
                  <Input label="Email Address" type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo((c) => ({ ...c, email: e.target.value }))} error={infoErrors.email} required hint="Your order confirmation will be sent here" />
                  <Input label="Phone Number" type="tel" placeholder="+27 00 000 0000" value={customerInfo.phone} onChange={(e) => setCustomerInfo((c) => ({ ...c, phone: e.target.value }))} error={infoErrors.phone} required />
                </div>
                <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={() => { if (validateInfo()) setStep('delivery'); }}>
                  Continue to Delivery →
                </Button>
              </div>
            )}

            {/* Step: Delivery */}
            {step === 'delivery' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-5">Delivery & Installation</h2>

                {/* Delivery method */}
                <div className="mb-5">
                  <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">Delivery Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ value: 'delivery', label: 'Home Delivery', desc: formatCurrency(hasFreeDelivery ? 0 : deliveryTotal), icon: '🚚' }, { value: 'collection', label: 'Collection', desc: 'Collect from us', icon: '🏪' }].map((m) => (
                      <button key={m.value} type="button" onClick={() => setDelivery(m.value as any)}
                        className={cn('p-4 rounded-xl border-2 text-left transition-all', delivery === m.value ? 'border-[#C4622D] bg-[#C4622D]/5' : 'border-[#E5DDD0] hover:border-[#C4622D]/40')}
                        aria-pressed={delivery === m.value}>
                        <div className="text-xl mb-1">{m.icon}</div>
                        <div className="font-semibold font-sans text-sm text-[#1A1A1A]">{m.label}</div>
                        <div className={cn('text-xs font-sans mt-0.5', hasFreeDelivery && m.value === 'delivery' ? 'text-[#2D5016] font-semibold' : 'text-[#9A9A9A]')}>{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address */}
                {delivery === 'delivery' && (
                  <div className="flex flex-col gap-4 mb-5">
                    <Input label="Address Line 1" placeholder="123 Main Street" value={address.line1} onChange={(e) => setAddress((a) => ({ ...a, line1: e.target.value }))} error={addressErrors.line1} required />
                    <Input label="Address Line 2" placeholder="Apartment, suite (optional)" value={address.line2 ?? ''} onChange={(e) => setAddress((a) => ({ ...a, line2: e.target.value }))} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Suburb" value={address.suburb} onChange={(e) => setAddress((a) => ({ ...a, suburb: e.target.value }))} error={addressErrors.suburb} required />
                      <Input label="City" value={address.city} onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))} error={addressErrors.city} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="Province" options={PROVINCE_OPTIONS} placeholder="Select province" value={address.province} onChange={(e) => setAddress((a) => ({ ...a, province: e.target.value }))} error={addressErrors.province} required />
                      <Input label="Postal Code" placeholder="0001" maxLength={4} value={address.postalCode} onChange={(e) => setAddress((a) => ({ ...a, postalCode: e.target.value }))} error={addressErrors.postalCode} required />
                    </div>
                  </div>
                )}

                {/* Installation */}
                <div className="mb-5">
                  <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">Installation</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'diy', label: 'DIY', desc: 'Includes full guide', icon: '🛠️', price: 'Free' },
                      { value: 'professional', label: 'Professional', desc: 'Accredited installer', icon: '👷', price: 'From R450/panel' },
                    ].map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setInstallation(opt.value as InstallationOption)}
                        className={cn('p-4 rounded-xl border-2 text-left transition-all', installation === opt.value ? 'border-[#1B4F8C] bg-[#1B4F8C]/5' : 'border-[#E5DDD0] hover:border-[#1B4F8C]/40')}
                        aria-pressed={installation === opt.value}>
                        <div className="text-xl mb-1">{opt.icon}</div>
                        <div className="font-semibold font-sans text-sm text-[#1A1A1A]">{opt.label}</div>
                        <div className="text-xs font-sans text-[#9A9A9A] mt-0.5">{opt.desc}</div>
                        <div className="text-xs font-semibold font-sans text-[#1B4F8C] mt-1">{opt.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" size="lg" onClick={() => setStep('info')}>← Back</Button>
                  <Button variant="primary" size="lg" fullWidth onClick={() => { if (validateAddress()) setStep('payment'); }}>
                    Continue to Payment →
                  </Button>
                </div>
              </div>
            )}

            {/* Step: Payment */}
            {step === 'payment' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
                <h2 className="font-display font-bold text-xl text-[#1A1A1A] mb-5">Payment</h2>

                <div className="flex flex-col gap-3 mb-6">
                  {PAYMENT_METHODS.map(({ value, label, icon: Icon, desc }) => (
                    <button key={value} type="button" onClick={() => setPaymentMethod(value)}
                      className={cn('flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all', paymentMethod === value ? 'border-[#C4622D] bg-[#C4622D]/5' : 'border-[#E5DDD0] hover:border-[#C4622D]/40')}
                      aria-pressed={paymentMethod === value}>
                      <Icon size={20} className={paymentMethod === value ? 'text-[#C4622D]' : 'text-[#9A9A9A]'} />
                      <div>
                        <div className="font-semibold font-sans text-sm text-[#1A1A1A]">{label}</div>
                        <div className="text-xs font-sans text-[#9A9A9A]">{desc}</div>
                      </div>
                      {paymentMethod === value && <CheckCircle2 size={16} className="text-[#C4622D] ml-auto" />}
                    </button>
                  ))}
                </div>

                {/* Payment integration note */}
                <div className="bg-[#EEF2FA] rounded-xl p-4 mb-6 flex items-start gap-3">
                  <Lock size={14} className="text-[#1B4F8C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold font-sans text-[#1B4F8C] mb-1">Secure Payment</p>
                    <p className="text-xs font-sans text-[#5C5C5C] leading-relaxed">
                      Payment is processed securely by our payment provider. We never store your card details.
                      You will be redirected to complete payment after placing your order.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" size="lg" onClick={() => setStep('delivery')}>← Back</Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    leftIcon={<Lock size={16} />}
                    onClick={handlePlaceOrder}
                  >
                    PLACE ORDER — {formatCurrency(subtotal + deliveryAmount)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-28">
              <h3 className="font-display font-semibold text-[#1A1A1A] mb-4">Order Summary</h3>
              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => {
                  const img = item.product.images[0];
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#F0E8D8]">
                        {img && <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="48px" />}
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C4622D] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold font-sans text-[#1A1A1A] truncate">{item.product.name}</p>
                        {item.customisation.panelsRequired && (
                          <p className="text-[10px] font-sans text-[#9A9A9A]">{item.customisation.panelsRequired} panels</p>
                        )}
                      </div>
                      <p className="text-xs font-semibold font-sans text-[#1A1A1A] shrink-0">
                        {formatCurrency(item.totalPrice)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <dl className="flex flex-col gap-2 border-t border-[#F0E8D8] pt-3">
                <div className="flex justify-between text-sm font-sans">
                  <dt className="text-[#5C5C5C]">Subtotal</dt>
                  <dd className="font-medium text-[#1A1A1A]">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <dt className="text-[#5C5C5C]">Delivery</dt>
                  <dd className={cn('font-medium', hasFreeDelivery ? 'text-[#2D5016]' : 'text-[#1A1A1A]')}>
                    {hasFreeDelivery ? 'Free' : formatCurrency(deliveryAmount)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[#F0E8D8] pt-2 mt-1">
                  <dt className="font-bold font-sans text-[#1A1A1A]">Total</dt>
                  <dd className="font-display font-bold text-xl text-[#C4622D]">
                    {formatCurrency(subtotal + deliveryAmount)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
