import type { Metadata } from 'next';
import AdminInstallersClient from '@/components/admin/AdminInstallersClient';

export const metadata: Metadata = { title: 'Installers — Admin' };

export default function AdminInstallersPage() {
  return <AdminInstallersClient />;
}
