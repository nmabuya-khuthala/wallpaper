import { NextRequest, NextResponse } from 'next/server';

/**
 * Payment Provider Webhook — POST /api/payment/notify
 *
 * This endpoint receives payment notifications from your South African
 * payment provider (PayFast, Yoco, Peach, etc.).
 *
 * Production implementation:
 * 1. Verify the webhook signature/hash from the provider.
 * 2. Look up the order by payment reference.
 * 3. Update order.paymentStatus to 'paid'.
 * 4. Update order.status to 'order-received'.
 * 5. Send confirmation email to customer.
 * 6. Trigger production workflow.
 *
 * PayFast ITN (Instant Transaction Notification) documentation:
 * https://developers.payfast.co.za/docs#instant-transaction-notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentStatus = params.get('payment_status');
    const mPayment      = params.get('m_payment_id');
    const pfPayment     = params.get('pf_payment_id');

    // TODO: Verify PayFast signature
    // const isValid = await verifyPayFastSignature(params, process.env.PAYFAST_PASSPHRASE!);
    // if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    if (paymentStatus === 'COMPLETE') {
      // TODO: Update order status in database
      // await updateOrder(mPayment, { paymentStatus: 'paid', status: 'order-received' });
      // TODO: Send confirmation email
      // await sendOrderConfirmationEmail(order);

      console.info(`[Payment Notify] Payment complete — m_payment_id: ${mPayment}, pf_payment_id: ${pfPayment}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Payment Notify] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
