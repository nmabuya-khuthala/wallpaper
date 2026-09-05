'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Camera, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn, validateImageFile } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import Input, { Textarea, Select } from '@/components/ui/Input';
import type { PortraitStyle, PortraitDetails } from '@/types';
import { getProductById } from '@/lib/data/products';

const PORTRAIT_STYLES: { value: PortraitStyle; label: string; description: string; emoji: string }[] = [
  { value: 'classic',              label: 'Classic Portrait',       description: 'Timeless elegance with warm tones',          emoji: '🖼️' },
  { value: 'fine-art',             label: 'Fine Art',               description: 'Gallery-quality artistic interpretation',     emoji: '🎨' },
  { value: 'black-white',          label: 'Black & White',          description: 'Dramatic monochrome with deep contrast',      emoji: '⚪' },
  { value: 'modern-colour',        label: 'Modern Colour',          description: 'Bold, vibrant contemporary palette',          emoji: '🌈' },
  { value: 'luxury-editorial',     label: 'Luxury Editorial',       description: 'Magazine-style premium composition',          emoji: '✨' },
  { value: 'artistic-illustration',label: 'Artistic Illustration',  description: 'Hand-drawn artistic interpretation',          emoji: '✏️' },
  { value: 'collage',              label: 'Collage',                description: 'Multiple photos beautifully composed',        emoji: '📸' },
  { value: 'family-timeline',      label: 'Family Timeline',        description: 'A visual story through the years',            emoji: '📅' },
];

const PALETTE_OPTIONS = [
  { value: 'warm', label: 'Warm (terracotta, gold, cream)' },
  { value: 'cool', label: 'Cool (cobalt, sage, white)' },
  { value: 'neutral', label: 'Neutral (charcoal, beige, off-white)' },
  { value: 'bold', label: 'Bold (coral, mustard, deep green)' },
  { value: 'monochrome', label: 'Monochrome (black, grey, white)' },
  { value: 'custom', label: 'Custom — I\'ll describe in notes' },
];

const SIZE_OPTIONS = [
  { value: '600x900', label: '60cm × 90cm (Small feature)' },
  { value: '900x1200', label: '90cm × 120cm (Medium)' },
  { value: '1200x1800', label: '120cm × 180cm (Large feature)' },
  { value: '1500x2400', label: '150cm × 240cm (Full wall panel)' },
  { value: 'custom', label: 'Custom dimensions' },
];

const STEPS = ['Upload Photos', 'Choose Style', 'Personalise', 'Review & Order'];

export default function FamilyPortraitClient() {
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<{ url: string; name: string }[]>([]);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<PortraitStyle | null>(null);
  const [details, setDetails] = useState<PortraitDetails>({});
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'square'>('portrait');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const FAMILY_PORTRAIT_PRODUCT = getProductById('prod-006');

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const errs: string[] = [];
    const newFiles: { url: string; name: string }[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        errs.push(`${file.name}: ${validation.error}`);
      } else if (uploadedFiles.length + newFiles.length >= 10) {
        errs.push('Maximum 10 photos allowed.');
      } else {
        newFiles.push({ url: URL.createObjectURL(file), name: file.name });
      }
    });

    setUploadErrors(errs);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, [uploadedFiles.length]);

  const removeFile = (index: number) => {
    URL.revokeObjectURL(uploadedFiles[index].url);
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const canProceed = [
    uploadedFiles.length > 0,
    selectedStyle !== null,
    !!(details.size),
    true,
  ];

  const handleSubmit = () => {
    if (!FAMILY_PORTRAIT_PRODUCT || !selectedStyle) return;
    setSubmitting(true);
    setTimeout(() => {
      addItem(FAMILY_PORTRAIT_PRODUCT, {
        portraitStyle: selectedStyle,
        portraitDetails: details,
        uploadedImageUrl: uploadedFiles[0]?.url,
        notes: `Style: ${selectedStyle}, Photos: ${uploadedFiles.length}`,
      });
      setSubmitting(false);
      setSubmitted(true);
      showToast('Family portrait added to cart!', 'success');
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#2D5016]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={36} className="text-[#2D5016]" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-3">
            Your Portrait Is In The Cart!
          </h2>
          <p className="font-sans text-[#5C5C5C] mb-6 leading-relaxed">
            We&apos;ve saved your photos and preferences. Our design team will review them
            after checkout and contact you to confirm the composition before printing.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="primary" size="lg" fullWidth as="a" href="/cart">
              View Cart & Checkout
            </Button>
            <Button variant="outline" size="md" fullWidth onClick={() => { setSubmitted(false); setStep(0); }}>
              Create Another Portrait
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <div className="bg-[#2C2C2C] text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/gallery/6.jpg" alt="" fill className="object-cover" aria-hidden sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2C2C] to-transparent" />
        <div className="container-brand relative z-10 max-w-2xl">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Family Portraits
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
            YOUR FAMILY DESERVES A WALL.
          </h1>
          <p className="text-white/70 font-sans text-base max-w-lg">
            Upload your photographs, choose a style, and we&apos;ll create a stunning
            custom portrait wall that tells your family&apos;s story.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#F0E8D8] sticky top-[70px] md:top-[94px] z-20">
        <div className="container-brand py-3">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <button
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold font-sans whitespace-nowrap transition-colors shrink-0',
                    i === step
                      ? 'bg-[#C4622D] text-white'
                      : i < step
                      ? 'text-[#2D5016] hover:bg-[#F0F5E8]'
                      : 'text-[#9A9A9A]',
                  )}
                  disabled={i > step}
                >
                  {i < step ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <span className={cn(
                      'w-4 h-4 rounded-full text-[10px] flex items-center justify-center',
                      i === step ? 'bg-white text-[#C4622D]' : 'bg-[#F0E8D8] text-[#9A9A9A]',
                    )}>
                      {i + 1}
                    </span>
                  )}
                  {s}
                </button>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    'w-6 h-0.5 shrink-0',
                    i < step ? 'bg-[#2D5016]' : 'bg-[#E5DDD0]',
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container-brand py-8 max-w-3xl">

        {/* Step 0: Upload */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">Upload Your Photos</h2>
            <p className="text-[#5C5C5C] font-sans text-sm mb-6">
              Upload 1–10 photos. We&apos;ll use these to create your family portrait. The higher the quality, the better the result.
            </p>

            {/* Drop zone */}
            <div
              className={cn('upload-zone py-10 px-6 text-center mb-4 cursor-pointer', dragActive && 'drag-active')}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload family photos"
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            >
              <Camera size={32} className="text-[#C4622D] mx-auto mb-3" />
              <p className="font-semibold font-sans text-[#1A1A1A] mb-1">
                Drop your photos here, or click to upload
              </p>
              <p className="text-xs font-sans text-[#9A9A9A]">
                JPEG, PNG, WebP · Max 20MB each · Up to 10 photos
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => handleFiles(e.target.files)}
                aria-hidden="true"
              />
            </div>

            {uploadErrors.length > 0 && (
              <div className="bg-[#FFF5F3] border border-[#E05A4A]/30 rounded-xl p-3 mb-4">
                {uploadErrors.map((err, i) => (
                  <p key={i} className="text-xs font-sans text-[#E05A4A]">{err}</p>
                ))}
              </div>
            )}

            {/* Preview grid */}
            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={10} />
                    </button>
                    {i === 0 && (
                      <div className="absolute bottom-1 left-1">
                        <span className="bg-[#C4622D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Main
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                {uploadedFiles.length < 10 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-[#E5DDD0] flex items-center justify-center hover:border-[#C4622D] transition-colors"
                    aria-label="Add more photos"
                  >
                    <Upload size={16} className="text-[#9A9A9A]" />
                  </button>
                )}
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!canProceed[0]}
              rightIcon={<ArrowRight size={16} />}
              onClick={() => setStep(1)}
            >
              Continue — Choose Style
            </Button>
          </div>
        )}

        {/* Step 1: Style */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">Choose Your Style</h2>
            <p className="text-[#5C5C5C] font-sans text-sm mb-6">
              Select the artistic style for your family portrait.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {PORTRAIT_STYLES.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setSelectedStyle(style.value)}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all',
                    selectedStyle === style.value
                      ? 'border-[#C4622D] bg-[#C4622D]/5'
                      : 'border-[#E5DDD0] hover:border-[#C4622D]/40 bg-white',
                  )}
                  aria-pressed={selectedStyle === style.value}
                >
                  <span className="text-2xl shrink-0">{style.emoji}</span>
                  <div>
                    <p className={cn(
                      'font-semibold font-sans text-sm',
                      selectedStyle === style.value ? 'text-[#C4622D]' : 'text-[#1A1A1A]',
                    )}>
                      {style.label}
                    </p>
                    <p className="text-xs font-sans text-[#9A9A9A] mt-0.5">
                      {style.description}
                    </p>
                  </div>
                  {selectedStyle === style.value && (
                    <CheckCircle2 size={16} className="text-[#C4622D] ml-auto shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="lg" onClick={() => setStep(0)}>← Back</Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!canProceed[1]}
                rightIcon={<ArrowRight size={16} />}
                onClick={() => setStep(2)}
              >
                Continue — Personalise
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">Personalise Your Portrait</h2>
            <p className="text-[#5C5C5C] font-sans text-sm mb-6">
              Help our design team create exactly what you have in mind.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <Input
                label="Names to include"
                placeholder="e.g. The Smith Family, or individual names"
                value={details.names ?? ''}
                onChange={(e) => setDetails((d) => ({ ...d, names: e.target.value }))}
                hint="Optional — we can include names or a family message in the design"
              />

              <Input
                label="Optional message or quote"
                placeholder="e.g. 'Family is everything' or a special date"
                value={details.message ?? ''}
                onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
              />

              <Select
                label="Preferred colour palette"
                options={PALETTE_OPTIONS}
                placeholder="Select a palette"
                value={details.colourPalette ?? ''}
                onChange={(e) => setDetails((d) => ({ ...d, colourPalette: e.target.value }))}
              />

              <Select
                label="Print size *"
                options={SIZE_OPTIONS}
                placeholder="Select a size"
                value={details.size ?? ''}
                onChange={(e) => setDetails((d) => ({ ...d, size: e.target.value }))}
                required
              />

              {/* Orientation */}
              <div>
                <label className="text-sm font-semibold font-sans text-[#2C2C2C] block mb-2">
                  Orientation
                </label>
                <div className="flex gap-2">
                  {(['portrait', 'landscape', 'square'] as const).map((o) => (
                    <button
                      key={o}
                      onClick={() => { setOrientation(o); setDetails((d) => ({ ...d, orientation: o })); }}
                      className={cn(
                        'flex-1 py-2.5 rounded-xl border-2 text-sm font-sans font-medium transition-colors capitalize',
                        orientation === o
                          ? 'border-[#C4622D] bg-[#C4622D]/5 text-[#C4622D]'
                          : 'border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
                      )}
                      aria-pressed={orientation === o}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Additional notes"
                placeholder="Any special requests, specific photos to feature, colours to avoid…"
                rows={4}
                value={details.notes ?? ''}
                onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="lg" onClick={() => setStep(1)}>← Back</Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!details.size}
                rightIcon={<ArrowRight size={16} />}
                onClick={() => setStep(3)}
              >
                Review My Order
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="font-display font-bold text-2xl text-[#1A1A1A] mb-6">
              Review & Create
            </h2>

            <div className="bg-white rounded-2xl border border-[#F0E8D8] overflow-hidden mb-6">
              {/* Photos preview */}
              <div className="p-4 border-b border-[#F0E8D8]">
                <h3 className="font-semibold font-sans text-sm text-[#2C2C2C] mb-3">
                  Your Photos ({uploadedFiles.length})
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {uploadedFiles.slice(0, 5).map((f, i) => (
                    <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden">
                      <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {uploadedFiles.length > 5 && (
                    <div className="w-14 h-14 rounded-lg bg-[#F0E8D8] flex items-center justify-center">
                      <span className="text-xs font-bold font-sans text-[#C4622D]">
                        +{uploadedFiles.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <dl className="divide-y divide-[#F0E8D8]">
                {[
                  { label: 'Style', value: PORTRAIT_STYLES.find((s) => s.value === selectedStyle)?.label },
                  { label: 'Size', value: SIZE_OPTIONS.find((s) => s.value === details.size)?.label },
                  { label: 'Orientation', value: details.orientation ?? orientation },
                  { label: 'Colour Palette', value: PALETTE_OPTIONS.find((p) => p.value === details.colourPalette)?.label },
                  { label: 'Names', value: details.names || 'Not specified' },
                  { label: 'Message', value: details.message || 'Not specified' },
                  { label: 'Notes', value: details.notes || 'None' },
                ].filter((d) => d.value).map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="text-sm font-sans text-[#9A9A9A] shrink-0">{item.label}</dt>
                    <dd className="text-sm font-sans font-medium text-[#1A1A1A] text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Price note */}
            <div className="bg-[#FAF6EE] rounded-xl p-4 mb-6 flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold font-sans text-sm text-[#1A1A1A]">
                  Our design team will review your order
                </p>
                <p className="text-xs font-sans text-[#5C5C5C] mt-1 leading-relaxed">
                  After checkout, we&apos;ll review your photos and preferences and send you a design proof for approval before printing. Final pricing is confirmed at checkout.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="lg" onClick={() => setStep(2)}>← Back</Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={submitting}
                leftIcon={<Camera size={18} />}
                onClick={handleSubmit}
              >
                CREATE MY FAMILY PORTRAIT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
