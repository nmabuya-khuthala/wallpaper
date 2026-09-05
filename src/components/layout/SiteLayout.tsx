import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface SiteLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function SiteLayout({ children, hideFooter }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
}
