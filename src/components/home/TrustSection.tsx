import React from 'react';

const TRUST_ITEMS = [
  {
    icon: '🎨',
    title: 'BESPOKE',
    description: 'Made to suit your exact space — every design custom-sized and printed to your wall dimensions.',
    colour: 'bg-[#FAF0E6] border-[#C4622D]/20',
    titleColour: 'text-[#C4622D]',
  },
  {
    icon: '🖨️',
    title: 'QUALITY PRINTING',
    description: 'Premium wall finishes with vibrant, fade-resistant colour and exceptional resolution.',
    colour: 'bg-[#F0F5E8] border-[#2D5016]/20',
    titleColour: 'text-[#2D5016]',
  },
  {
    icon: '🛠️',
    title: 'EASY INSTALLATION',
    description: 'DIY-friendly options with full installation guides, video tutorials and support.',
    colour: 'bg-[#FDF8E8] border-[#D4A017]/20',
    titleColour: 'text-[#A87D12]',
  },
  {
    icon: '👷',
    title: 'PROFESSIONAL INSTALLATION',
    description: 'Accredited installers available. We arrange everything — you just choose the date.',
    colour: 'bg-[#EEF2FA] border-[#1B4F8C]/20',
    titleColour: 'text-[#1B4F8C]',
  },
  {
    icon: '✏️',
    title: 'CUSTOM DESIGN',
    description: 'Your idea. Your photograph. Your wall. Our design team brings your vision to life.',
    colour: 'bg-[#FDF2F8] border-[#9D174D]/20',
    titleColour: 'text-[#9D174D]',
  },
];

export default function TrustSection() {
  return (
    <section
      className="py-20 md:py-24 bg-[#FAF6EE]"
      aria-labelledby="trust-heading"
    >
      <div className="container-brand">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Why Haosail
          </span>
          <h2
            id="trust-heading"
            className="font-display font-bold text-[#1A1A1A]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            DESIGNED FOR YOUR HOME.
            <br />
            MADE FOR YOUR STORY.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className={`flex flex-col gap-3 p-6 rounded-2xl border ${item.colour} transition-transform duration-200 hover:-translate-y-1`}
            >
              <span className="text-4xl" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className={`font-display font-bold text-sm tracking-wide ${item.titleColour}`}>
                {item.title}
              </h3>
              <p className="text-[#5C5C5C] font-sans text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
