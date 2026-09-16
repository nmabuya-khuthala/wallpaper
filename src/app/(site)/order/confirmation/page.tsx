import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div>
      <h1>Order Confirmation</h1>
      {orderId ? (
        <p>Thank you for your order! Your reference is: {orderId}</p>
      ) : (
        <p>Thank you for your order!</p>
      )}
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
