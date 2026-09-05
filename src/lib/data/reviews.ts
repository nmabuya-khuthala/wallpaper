import type { Review } from '@/types';

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    customerName: 'Lerato M.',
    rating: 5,
    title: 'Absolutely stunning. Worth every cent.',
    body: 'I was nervous about ordering online but the team helped me choose the right design. The installation was flawless and the quality is incredible. My living room looks like it\'s from a magazine.',
    verified: true,
    approved: true,
    createdAt: '2025-06-15T10:00:00Z',
  },
  {
    id: 'rev-002',
    productId: 'prod-006',
    customerName: 'Thandiwe N.',
    rating: 5,
    title: 'Our family wall is the most-complimented thing in our home.',
    body: 'We uploaded family photos spanning 15 years and the team composed them beautifully. Every visitor comments on it. This was the best investment we made for our home.',
    verified: true,
    approved: true,
    createdAt: '2025-07-02T09:30:00Z',
  },
  {
    id: 'rev-003',
    productId: 'prod-004',
    customerName: 'Jacques van der Berg',
    rating: 5,
    title: 'The African Sunset mural is breathtaking.',
    body: 'I ordered the full feature wall version. The resolution is stunning — you can see every detail in the clouds and silhouettes. Professional installation was organised quickly and efficiently.',
    verified: true,
    approved: true,
    createdAt: '2025-07-18T14:00:00Z',
  },
  {
    id: 'rev-004',
    productId: 'prod-003',
    customerName: 'Priya Reddy',
    rating: 5,
    title: 'My daughter is obsessed with her room.',
    body: 'Little Explorer transformed our daughter\'s room. The illustrations are beautiful and the colours are bright without being overwhelming. The vinyl is easy to clean too. Highly recommended!',
    verified: true,
    approved: true,
    createdAt: '2025-08-01T11:00:00Z',
  },
  {
    id: 'rev-005',
    productId: 'prod-002',
    customerName: 'Nomsa K.',
    rating: 5,
    title: 'Sunday Blooms made my dining room magic.',
    body: 'I was hesitant about such a bold pattern but the team convinced me and I\'m so glad they did. The colours are vibrant but sophisticated. Everyone at dinner parties asks about it.',
    verified: true,
    approved: true,
    createdAt: '2025-08-10T16:00:00Z',
  },
];

export function getApprovedReviews(): Review[] {
  return SAMPLE_REVIEWS.filter((r) => r.approved);
}

export function getReviewsForProduct(productId: string): Review[] {
  return SAMPLE_REVIEWS.filter((r) => r.productId === productId && r.approved);
}
