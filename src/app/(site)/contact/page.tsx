import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Haosail team for help with wallpaper, installations, custom designs or orders.',
};

export default function ContactPage() {
  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      <div className="container-brand py-12 max-w-xl">
        <h1 className="font-display font-bold text-3xl text-[#1A1A1A] mb-2">Contact Us</h1>
        <p className="text-[#5C5C5C] font-sans mb-8">We&apos;d love to hear from you. Reach out via any of the channels below.</p>
        <div className="grid gap-4">
          {[
            { emoji: '📧', label: 'Email',    value: 'hello@haosail.co.za',   href: 'mailto:hello@haosail.co.za' },
            { emoji: '📞', label: 'Phone',    value: '+27 00 000 0000',        href: 'tel:+27000000000' },
            { emoji: '💬', label: 'WhatsApp', value: 'Chat on WhatsApp',       href: 'https://wa.me/27000000000' },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <p className="font-semibold font-sans text-sm text-[#9A9A9A] uppercase tracking-wider">{c.label}</p>
                <p className="font-display font-semibold text-[#1A1A1A]">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
