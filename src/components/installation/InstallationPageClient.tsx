'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, Shield, CheckCircle2, ArrowRight, Play, Phone } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import Input, { Select } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { SA_PROVINCES, isValidPhone } from '@/lib/utils';
import { cn } from '@/lib/utils';

const DIY_STEPS = [
  { step: '1', title: 'Prepare Your Wall', desc: 'Fill holes, sand smooth, clean thoroughly. Apply a base coat of wallpaper primer.' },
  { step: '2', title: 'Measure & Cut',     desc: 'Measure twice, cut once. Add 5–10cm extra on all sides to allow for trimming.' },
  { step: '3', title: 'Apply Paste',       desc: 'Apply paste to the wall (paste-the-wall method) or to the wallpaper (paste-the-paper).' },
  { step: '4', title: 'Hang & Align',      desc: 'Start from a plumb line. Hang the first panel, then work outward, matching patterns.' },
  { step: '5', title: 'Smooth & Trim',     desc: 'Use a smoothing brush or squeegee to remove air bubbles. Trim edges with a sharp knife.' },
  { step: '6', title: 'Finish & Seal',     desc: 'Clean adhesive from the surface while wet. Allow 24–48 hours to dry fully.' },
];

const INSTALLATION_FAQS = [
  { id: 'q1', question: 'How long does professional installation take?', answer: 'A standard feature wall takes 2–3 hours. Larger rooms or full-room wallpaper takes 4–8 hours depending on complexity.' },
  { id: 'q2', question: 'How much does professional installation cost?', answer: 'Installation is priced per panel, typically R450–R550 per panel depending on your province. A call-out fee of R350 applies. Get an exact quote at checkout.' },
  { id: 'q3', question: 'Do installers work nationwide?', answer: 'We have accredited installers in Gauteng, KwaZulu-Natal, Western Cape, Eastern Cape and other major provinces. Availability is confirmed at booking.' },
  { id: 'q4', question: 'What preparation do I need to do before the installer arrives?', answer: 'The room should be empty. Walls must be clean, dry and smooth. Our installer will do a wall check on arrival.' },
  { id: 'q5', question: 'Is there a guarantee on professional installation?', answer: 'Yes. All professional installations carry a 12-month workmanship guarantee. If anything lifts or peels due to incorrect installation, we will fix it at no cost.' },
];

const TOOLS_NEEDED = [
  'Paste bucket and brush',
  'Smoothing brush or squeegee',
  'Plumb line or spirit level',
  'Sharp craft knife and cutting board',
  'Seam roller',
  'Damp sponge for cleanup',
  'Measuring tape',
  'Step ladder',
];

export default function InstallationPageClient() {
  const [tab, setTab] = useState<'diy' | 'professional'>('diy');
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', address: '', suburb: '', city: '',
    province: '', preferredDate: '', notes: '',
  });
  const [bookingError, setBookingError] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.province) {
      setBookingError('Please fill in all required fields.');
      return;
    }
    if (!isValidPhone(bookingForm.phone)) {
      setBookingError('Please enter a valid South African phone number.');
      return;
    }
    setBookingError('');
    setBookingSubmitted(true);
  };

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-[#1B4F8C] text-white py-14 px-4">
        <div className="container-brand max-w-2xl">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-white/60 block mb-3">Installation</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
            LEAVE IT TO THE<br />
            <span className="text-[#C4622D]">PROFESSIONALS.</span>
          </h1>
          <p className="text-white/70 font-sans text-base max-w-lg">
            DIY-friendly installation guides or accredited professional installers
            in your area. You choose, we deliver.
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-[#F0E8D8]">
        <div className="container-brand flex">
          {[
            { id: 'diy' as const,          label: '🛠️  DIY Installation',         desc: 'Free with every order' },
            { id: 'professional' as const, label: '👷  Professional Installation', desc: 'From R450 per panel' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex-1 flex flex-col items-center py-4 border-b-2 transition-colors text-sm font-sans font-medium',
                tab === t.id ? 'border-[#C4622D] text-[#C4622D]' : 'border-transparent text-[#9A9A9A] hover:text-[#2C2C2C]',
              )}
              aria-pressed={tab === t.id}
            >
              <span>{t.label}</span>
              <span className="text-[10px] font-sans text-[#9A9A9A] mt-0.5">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container-brand py-10 max-w-4xl">

        {/* DIY Tab */}
        {tab === 'diy' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-4">
                  Install It Yourself
                </h2>
                <p className="text-[#5C5C5C] font-sans text-sm leading-relaxed mb-5">
                  Our wallpaper is designed to be installed by anyone — no professional
                  experience required. Follow our step-by-step guide for perfect results.
                </p>

                {/* Steps */}
                <div className="flex flex-col gap-4">
                  {DIY_STEPS.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C4622D] text-white text-xs font-bold font-sans flex items-center justify-center shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div>
                        <p className="font-semibold font-sans text-sm text-[#1A1A1A]">{step.title}</p>
                        <p className="text-xs font-sans text-[#5C5C5C] leading-relaxed mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* Tools */}
                <div className="bg-[#FAF6EE] rounded-2xl p-5">
                  <h3 className="font-display font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Wrench size={16} className="text-[#C4622D]" />
                    Tools You'll Need
                  </h3>
                  <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                    {TOOLS_NEEDED.map((tool) => (
                      <li key={tool} className="flex items-center gap-2 text-xs font-sans text-[#5C5C5C]">
                        <CheckCircle2 size={12} className="text-[#2D5016] shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video placeholder */}
                <div className="bg-[#2C2C2C] rounded-2xl aspect-video flex items-center justify-center cursor-pointer hover:bg-[#1A1A1A] transition-colors group">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#C4622D] transition-colors">
                      <Play size={22} className="text-white ml-1" />
                    </div>
                    <p className="text-white/70 font-sans text-sm">Watch: Full Installation Tutorial</p>
                    <p className="text-white/40 font-sans text-xs mt-1">12 min · HD</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-display font-bold text-xl text-[#1A1A1A] mb-4">Installation FAQs</h3>
              <Accordion items={INSTALLATION_FAQS} allowMultiple />
            </div>

            <div className="flex items-center justify-center">
              <Button variant="outline" size="lg" onClick={() => setTab('professional')} rightIcon={<ArrowRight size={16} />}>
                Or book professional installation
              </Button>
            </div>
          </div>
        )}

        {/* Professional Tab */}
        {tab === 'professional' && (
          <div className="animate-fade-in">
            {bookingSubmitted ? (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#2D5016]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-[#2D5016]" />
                </div>
                <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">Booking Request Sent!</h2>
                <p className="font-sans text-[#5C5C5C] mb-6">
                  We&apos;ll match you with an accredited installer in {bookingForm.province || 'your area'} and
                  contact you within 1 business day to confirm the date and time.
                </p>
                <Button variant="primary" as="a" href="/shop">Continue Shopping</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-4">
                    Book Professional Installation
                  </h2>
                  <div className="flex flex-col gap-3 mb-6">
                    {[
                      { icon: Shield, text: 'Accredited, background-checked installers' },
                      { icon: CheckCircle2, text: '12-month workmanship guarantee' },
                      { icon: Phone, text: 'Coordination handled for you' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-sm font-sans text-[#5C5C5C]">
                        <Icon size={16} className="text-[#1B4F8C] shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleBooking} noValidate className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Your Name" value={bookingForm.name} onChange={(e) => setBookingForm((f) => ({ ...f, name: e.target.value }))} required />
                      <Input label="Phone" type="tel" placeholder="+27 00 000 0000" value={bookingForm.phone} onChange={(e) => setBookingForm((f) => ({ ...f, phone: e.target.value }))} required />
                    </div>
                    <Input label="Email" type="email" value={bookingForm.email} onChange={(e) => setBookingForm((f) => ({ ...f, email: e.target.value }))} />
                    <Input label="Street Address" value={bookingForm.address} onChange={(e) => setBookingForm((f) => ({ ...f, address: e.target.value }))} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Suburb" value={bookingForm.suburb} onChange={(e) => setBookingForm((f) => ({ ...f, suburb: e.target.value }))} />
                      <Input label="City" value={bookingForm.city} onChange={(e) => setBookingForm((f) => ({ ...f, city: e.target.value }))} />
                    </div>
                    <Select
                      label="Province"
                      options={SA_PROVINCES.map((p) => ({ value: p, label: p }))}
                      placeholder="Select province"
                      value={bookingForm.province}
                      onChange={(e) => setBookingForm((f) => ({ ...f, province: e.target.value }))}
                      required
                    />
                    <Input label="Preferred Installation Date" type="date" value={bookingForm.preferredDate} onChange={(e) => setBookingForm((f) => ({ ...f, preferredDate: e.target.value }))} />

                    {bookingError && (
                      <p className="text-xs text-[#E05A4A] font-sans">{bookingError}</p>
                    )}

                    <Button type="submit" variant="primary" size="lg" fullWidth leftIcon={<Wrench size={16} />}>
                      Request Installation Booking
                    </Button>
                  </form>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[#1A1A1A] mb-4">How It Works</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { step: '1', title: 'Submit Request', desc: 'Fill in your details and preferred date.' },
                      { step: '2', title: 'Installer Matched', desc: 'We find an accredited installer in your area.' },
                      { step: '3', title: 'Confirmed',        desc: 'You receive confirmation with installer details.' },
                      { step: '4', title: 'Installation Day', desc: 'Your wallpaper is professionally installed.' },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1B4F8C] text-white text-xs font-bold font-sans flex items-center justify-center shrink-0">{s.step}</div>
                        <div>
                          <p className="font-semibold font-sans text-sm text-[#1A1A1A]">{s.title}</p>
                          <p className="text-xs font-sans text-[#5C5C5C]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#FAF6EE] rounded-xl p-4 mt-6">
                    <h4 className="font-semibold font-sans text-sm text-[#1A1A1A] mb-2">Pricing</h4>
                    <div className="flex flex-col gap-1.5 text-xs font-sans text-[#5C5C5C]">
                      <div className="flex justify-between"><span>Price per panel</span><span className="font-medium text-[#1A1A1A]">From R450</span></div>
                      <div className="flex justify-between"><span>Call-out fee</span><span className="font-medium text-[#1A1A1A]">R350</span></div>
                      <div className="flex justify-between"><span>Minimum charge</span><span className="font-medium text-[#1A1A1A]">R900</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
