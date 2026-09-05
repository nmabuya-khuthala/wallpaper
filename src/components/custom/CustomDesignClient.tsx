'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, CheckCircle2, Paintbrush, Phone, Mail } from 'lucide-react';
import { cn, validateImageFile, isValidEmail, isValidPhone } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input, { Textarea, Select } from '@/components/ui/Input';
import type { CustomProjectType, BudgetRange } from '@/types';

const PROJECT_TYPES: { value: CustomProjectType; label: string; emoji: string }[] = [
  { value: 'photograph',    label: 'Photograph',       emoji: '📷' },
  { value: 'artwork',       label: 'Artwork / Painting', emoji: '🎨' },
  { value: 'drawing',       label: 'Drawing / Sketch', emoji: '✏️' },
  { value: 'logo',          label: 'Logo / Brand',     emoji: '🔷' },
  { value: 'inspiration',   label: 'Inspiration Image', emoji: '💡' },
  { value: 'family-photo',  label: 'Family Photo',     emoji: '👨‍👩‍👧‍👦' },
  { value: 'custom',        label: 'Something else',   emoji: '✨' },
];

const STYLE_OPTIONS = [
  { value: 'botanical',   label: 'Botanical' },
  { value: 'geometric',   label: 'Geometric' },
  { value: 'abstract',    label: 'Abstract' },
  { value: 'floral',      label: 'Floral' },
  { value: 'landscape',   label: 'Landscape' },
  { value: 'photographic',label: 'Photographic' },
  { value: 'illustrated', label: 'Illustrated' },
  { value: 'minimalist',  label: 'Minimalist' },
];

const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: 'under-2500',   label: 'Under R2,500' },
  { value: '2500-5000',    label: 'R2,500 – R5,000' },
  { value: '5000-10000',   label: 'R5,000 – R10,000' },
  { value: '10000-20000',  label: 'R10,000 – R20,000' },
  { value: 'over-20000',   label: 'Over R20,000' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: CustomProjectType | '';
  wallWidth: string;
  wallHeight: string;
  description: string;
  preferredStyle: string;
  budget: BudgetRange | '';
  installationRequired: boolean;
}

const INITIAL_FORM: FormData = {
  name: '', email: '', phone: '', projectType: '',
  wallWidth: '', wallHeight: '', description: '',
  preferredStyle: '', budget: '', installationRequired: false,
};

export default function CustomDesignClient() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string }[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email.';
    if (!form.projectType) errs.projectType = 'Please select a project type.' as any;
    if (!form.description.trim()) errs.description = 'Please describe your project.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: { url: string; name: string }[] = [];
    let err = '';
    Array.from(files).forEach((file) => {
      const v = validateImageFile(file);
      if (!v.valid) { err = v.error ?? ''; return; }
      if (uploadedFiles.length + newFiles.length >= 5) { err = 'Max 5 files.'; return; }
      newFiles.push({ url: URL.createObjectURL(file), name: file.name });
    });
    setUploadError(err);
    setUploadedFiles((p) => [...p, ...newFiles]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // In production: POST to /api/custom-design with FormData including files
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#2D5016]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={36} className="text-[#2D5016]" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-3">
            Request Received!
          </h2>
          <p className="font-sans text-[#5C5C5C] mb-3 leading-relaxed">
            Thank you. Our design team will review your idea and contact you within
            1–2 business days with the next steps and a quote.
          </p>
          <p className="font-sans text-sm text-[#9A9A9A] mb-6">
            We&apos;ll be in touch at <strong className="text-[#1A1A1A]">{form.email}</strong>
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="primary" size="lg" fullWidth as="a" href="/shop">
              Browse Existing Designs
            </Button>
            <Button variant="outline" size="md" fullWidth onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); setUploadedFiles([]); }}>
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <div className="bg-[#C4622D] text-white py-12 px-4">
        <div className="container-brand max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Paintbrush size={18} />
            <span className="text-xs font-semibold font-sans uppercase tracking-widest text-white/70">
              Custom Design
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
            YOUR IDEA. YOUR WALL.
          </h1>
          <p className="text-white/80 font-sans text-base max-w-lg">
            Tell us about your vision. Upload your artwork, photos or inspiration,
            and our design team will bring it to life on your wall.
          </p>
        </div>
      </div>

      <div className="container-brand py-10 max-w-3xl">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name as string}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email as string}
                  required
                  leftIcon={<Mail size={14} />}
                />
              </div>

              <Input
                label="Phone"
                type="tel"
                placeholder="+27 00 000 0000"
                value={form.phone}
                onChange={set('phone')}
                leftIcon={<Phone size={14} />}
                hint="Optional — we may call to discuss your project"
              />

              {/* Project type */}
              <div>
                <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">
                  Project Type <span className="text-[#C4622D]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, projectType: pt.value }))}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left text-sm font-sans transition-all',
                        form.projectType === pt.value
                          ? 'border-[#C4622D] bg-[#C4622D]/5 text-[#C4622D] font-medium'
                          : 'border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]/40',
                      )}
                      aria-pressed={form.projectType === pt.value}
                    >
                      <span>{pt.emoji}</span>
                      {pt.label}
                    </button>
                  ))}
                </div>
                {errors.projectType && (
                  <p className="text-xs text-[#E05A4A] font-sans mt-1">{String(errors.projectType)}</p>
                )}
              </div>

              {/* Wall dimensions */}
              <div>
                <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">
                  Wall Dimensions (optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5" max="20" step="0.1"
                      placeholder="Width e.g. 3.2"
                      value={form.wallWidth}
                      onChange={set('wallWidth')}
                      className="input-base font-sans pr-8 text-sm"
                      aria-label="Wall width in metres"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A] font-sans">m</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5" max="20" step="0.1"
                      placeholder="Height e.g. 2.6"
                      value={form.wallHeight}
                      onChange={set('wallHeight')}
                      className="input-base font-sans pr-8 text-sm"
                      aria-label="Wall height in metres"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A] font-sans">m</span>
                  </div>
                </div>
              </div>

              <Textarea
                label="Describe your project"
                placeholder="Tell us about your vision — the space, the mood you want to create, any specific elements you'd like included, colours you love or want to avoid…"
                rows={5}
                value={form.description}
                onChange={set('description')}
                error={errors.description as string}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Preferred style"
                  options={STYLE_OPTIONS}
                  placeholder="Select style"
                  value={form.preferredStyle}
                  onChange={set('preferredStyle')}
                />
                <Select
                  label="Budget range"
                  options={BUDGET_OPTIONS}
                  placeholder="Select budget"
                  value={form.budget}
                  onChange={set('budget')}
                />
              </div>

              {/* Installation */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="installation-required"
                  checked={form.installationRequired}
                  onChange={(e) => setForm((f) => ({ ...f, installationRequired: e.target.checked }))}
                  className="w-4 h-4 accent-[#C4622D]"
                />
                <label htmlFor="installation-required" className="text-sm font-sans text-[#2C2C2C] cursor-pointer">
                  I&apos;m interested in professional installation
                </label>
              </div>

              {/* File upload */}
              <div>
                <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">
                  Upload files (optional)
                </label>
                <div
                  className={cn('upload-zone py-6 px-4 text-center cursor-pointer', dragActive && 'drag-active')}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
                  onClick={() => fileRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
                  aria-label="Upload inspiration files"
                >
                  <Upload size={20} className="text-[#C4622D] mx-auto mb-2" />
                  <p className="text-sm font-sans text-[#5C5C5C]">
                    Drop files here or <span className="text-[#C4622D] font-medium">browse</span>
                  </p>
                  <p className="text-xs font-sans text-[#9A9A9A] mt-1">Up to 5 files · JPEG, PNG, WebP · Max 20MB each</p>
                  <input ref={fileRef} type="file" multiple accept="image/*" className="sr-only" onChange={(e) => handleFiles(e.target.files)} />
                </div>

                {uploadError && <p className="text-xs text-[#E05A4A] font-sans mt-1">{uploadError}</p>}

                {uploadedFiles.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="relative">
                        <img src={f.url} alt={f.name} className="w-16 h-16 object-cover rounded-xl" />
                        <button
                          type="button"
                          onClick={() => { URL.revokeObjectURL(f.url); setUploadedFiles((p) => p.filter((_, j) => j !== i)); }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E05A4A] text-white rounded-full flex items-center justify-center"
                          aria-label={`Remove ${f.name}`}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                fullWidth
                loading={submitting}
                leftIcon={<Paintbrush size={18} />}
              >
                START MY CUSTOM DESIGN
              </Button>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#2C2C2C] text-white rounded-2xl p-5">
                <h3 className="font-display font-bold text-lg mb-3">What happens next?</h3>
                <ol className="flex flex-col gap-3">
                  {[
                    'We review your request within 1–2 business days',
                    'Our design team contacts you with questions and a quote',
                    'You approve the design concept',
                    'We print and deliver to your door',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#C4622D] text-white text-xs font-bold font-sans flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm font-sans text-white/80 leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-[#FAF6EE] rounded-2xl p-5">
                <h3 className="font-display font-semibold text-[#1A1A1A] mb-2">We&apos;ve worked with</h3>
                <div className="flex flex-col gap-2 text-sm font-sans text-[#5C5C5C]">
                  <span>✓ Family photographs</span>
                  <span>✓ Children&apos;s artwork</span>
                  <span>✓ Corporate branding</span>
                  <span>✓ Custom map designs</span>
                  <span>✓ Pet portraits</span>
                  <span>✓ Abstract paintings</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
