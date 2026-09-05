import type { Metadata } from 'next';
import AdminProductsClient from '@/components/admin/AdminProductsClient';
import { getAllProducts } from '@/lib/data/products';

export const metadata: Metadata = { title: 'Products — Admin' };

export default function AdminProductsPage() {
  const products = getAllProducts();
  return <AdminProductsClient products={products} />;
}
