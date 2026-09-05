import type { Metadata } from 'next';
import AccountClient from '@/components/account/AccountClient';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your Haosail account, orders, wishlist and saved designs.',
};

export default function AccountPage() {
  return <AccountClient />;
}
