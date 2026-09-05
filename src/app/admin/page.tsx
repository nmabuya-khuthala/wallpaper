import type { Metadata } from 'next';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';
import { getAllProducts } from '@/lib/data/products';
import { getApprovedReviews } from '@/lib/data/reviews';

export const metadata: Metadata = { title: 'Admin Dashboard — Haosail' };

export default function AdminPage() {
  const products = getAllProducts();
  const reviews  = getApprovedReviews();
  return <AdminDashboardClient products={products} reviewCount={reviews.length} />;
}
