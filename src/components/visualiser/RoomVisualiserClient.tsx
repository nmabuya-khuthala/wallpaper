'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Upload, X, RefreshCw, ShoppingCart, Camera,
  ChevronLeft, ChevronRight, Info, Sliders,
} from 'lucide-react';
import { cn, validateImageFile } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cartStore';
import { useToast } from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import type { Product } from '@/types';

interface RoomVisualiserClientProps {
  products: Product[];
}

export default function RoomVisualiserClient({ products }: RoomVisualiserClientProps) {
  const [roomImageUrl, setRoomImageUrl] = useState<string | null>(null);
  const [roomImageFile, setRoomImageFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [opacity, setOpacity] = useState(70);
  const [blendMode, setBlendMode] = useState<'multiply' | 'overlay' | 'screen' | 'normal'>('multiply');
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()),
  );

  const handleFile = useCallback((file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error ?? 'Invalid file.');
      return;
    }
    setUploadError(null);
    const url = URL.createObjectURL(file);
    setRoomImageUrl(url);
    setRoomImageFile(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    if (roomImageUrl) URL.revokeObjectURL(roomImageUrl);
    setRoomImageUrl(null);
    setRoomImageFile(null);
    setSelectedProduct(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUseDesign = () => {
    if (!selectedProduct) return;
    addItem(selectedProduct, {
      uploadedImageUrl: roomImageUrl ?? undefined,
      notes: 'Selected via Room Visualiser',
    });
    showToast(`${selectedProduct.name} added to cart!`, 'success');
  };

  const BLEND_MODES = [
    { value: 'multiply' as const, label: 'Multiply' },
    { value: 'overlay' as const, label: 'Overlay' },
    { value: 'screen' as const, label: 'Screen' },
    { value: 'normal' as const, label: 'Normal' },
  ];

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-[#2C2C2C] text-white py-12 px-4">
        <div className="container-brand text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Room Visualiser
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
            SEE IT ON YOUR WALL
          </h1>
          <p className="text-white/70 font-sans text-base">
            Upload a photo of your room. Choose a design. Preview your transformation.
          </p>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Step 1 / 2: Upload + Product picker ── */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Step 1: Upload */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#C4622D] text-white text-xs font-bold font-sans flex items-center justify-center">
                  1
                </div>
                <h2 className="font-display font-semibold text-[#1A1A1A]">
                  Upload Your Room
                </h2>
              </div>

              {!roomImageUrl ? (
                <div
                  className={cn(
                    'upload-zone flex flex-col items-center justify-center gap-3 py-10 px-4 text-center min-h-[180px]',
                    dragActive && 'drag-active',
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload room photo"
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <div className="w-12 h-12 rounded-full bg-[#F0E8D8] flex items-center justify-center">
                    <Camera size={22} className="text-[#C4622D]" />
                  </div>
                  <div>
                    <p className="font-semibold font-sans text-sm text-[#1A1A1A]">
                      Drop your photo here
                    </p>
                    <p className="text-xs font-sans text-[#9A9A9A] mt-1">
                      or click to browse · JPEG, PNG, WebP · max 20MB
                    </p>
                  </div>
                  <button className="bg-[#C4622D] text-white text-xs font-semibold font-sans px-4 py-2 rounded-lg hover:bg-[#9E4D23] transition-colors">
                    <Upload size={12} className="inline mr-1.5" />
                    Choose Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
                    className="sr-only"
                    onChange={handleInputChange}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-[#F0E8D8]">
                  <img
                    src={roomImageUrl}
                    alt="Your uploaded room"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-[#2C2C2C]"
                    aria-label="Remove uploaded image"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-[#2D5016] text-white text-[10px] font-bold font-sans px-2 py-1 rounded-full">
                      ✓ Room uploaded
                    </span>
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-[#E05A4A] font-sans mt-2 flex items-center gap-1">
                  <X size={12} />
                  {uploadError}
                </p>
              )}
            </div>

            {/* Step 2: Choose design */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#C4622D] text-white text-xs font-bold font-sans flex items-center justify-center">
                  2
                </div>
                <h2 className="font-display font-semibold text-[#1A1A1A]">
                  Choose a Design
                </h2>
              </div>

              <input
                type="search"
                placeholder="Search designs…"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="input-base font-sans text-sm mb-3"
                aria-label="Search wallpaper designs"
              />

              <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      'flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition-all w-full',
                      selectedProduct?.id === product.id
                        ? 'border-[#C4622D] bg-[#C4622D]/5'
                        : 'border-[#E5DDD0] hover:border-[#C4622D]/40 bg-white',
                    )}
                    aria-pressed={selectedProduct?.id === product.id}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]?.url ?? '/gallery/1.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        'text-sm font-semibold font-sans truncate',
                        selectedProduct?.id === product.id
                          ? 'text-[#C4622D]'
                          : 'text-[#1A1A1A]',
                      )}>
                        {product.name}
                      </p>
                      <p className="text-xs font-sans text-[#9A9A9A] capitalize truncate">
                        {product.category.replace(/-/g, ' ')}
                      </p>
                    </div>
                    {selectedProduct?.id === product.id && (
                      <div className="w-5 h-5 rounded-full bg-[#C4622D] flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px] font-bold">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Controls */}
            {selectedProduct && roomImageUrl && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#C4622D] text-white text-xs font-bold font-sans flex items-center justify-center">
                    3
                  </div>
                  <h2 className="font-display font-semibold text-[#1A1A1A]">
                    Adjust Preview
                  </h2>
                </div>

                <div className="bg-[#FAF6EE] rounded-xl p-4 flex flex-col gap-4">
                  {/* Opacity */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold font-sans text-[#2C2C2C]">
                        Intensity
                      </label>
                      <span className="text-xs font-sans text-[#C4622D] font-medium">
                        {opacity}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      aria-label="Wallpaper preview intensity"
                    />
                  </div>

                  {/* Blend mode */}
                  <div>
                    <label className="text-xs font-semibold font-sans text-[#2C2C2C] block mb-2">
                      Blend Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {BLEND_MODES.map((mode) => (
                        <button
                          key={mode.value}
                          onClick={() => setBlendMode(mode.value)}
                          className={cn(
                            'py-1.5 rounded-lg text-xs font-sans font-medium transition-colors',
                            blendMode === mode.value
                              ? 'bg-[#C4622D] text-white'
                              : 'bg-white border border-[#E5DDD0] text-[#5C5C5C] hover:border-[#C4622D]',
                          )}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Preview area ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="visualiser-canvas min-h-[400px] md:min-h-[560px] flex items-center justify-center">
              {!roomImageUrl ? (
                <div className="text-center py-16 px-8">
                  <div className="w-16 h-16 rounded-full bg-[#F0E8D8] flex items-center justify-center mx-auto mb-4">
                    <Camera size={28} className="text-[#C4622D]" />
                  </div>
                  <h3 className="font-display font-semibold text-[#1A1A1A] text-lg mb-2">
                    Your preview will appear here
                  </h3>
                  <p className="font-sans text-sm text-[#9A9A9A] max-w-xs mx-auto">
                    Upload a photo of your wall to see how any of our designs will look in your actual space.
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full min-h-[400px] md:min-h-[560px]">
                  {/* Room base image */}
                  <img
                    src={roomImageUrl}
                    alt="Your room"
                    className="w-full h-full object-cover rounded-xl"
                    style={{ minHeight: '400px' }}
                  />

                  {/* Wallpaper overlay */}
                  {selectedProduct && (
                    <div
                      className="absolute inset-0 rounded-xl transition-opacity duration-300"
                      style={{
                        backgroundImage: `url(${selectedProduct.images[0]?.url})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat',
                        opacity: opacity / 100,
                        mixBlendMode: blendMode,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Overlay labels */}
                  {!selectedProduct && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                      <div className="bg-white/95 rounded-xl px-5 py-3 text-center">
                        <p className="font-display font-semibold text-[#1A1A1A] text-sm">
                          ← Choose a wallpaper design
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Selected product badge */}
                  {selectedProduct && (
                    <div className="absolute top-3 left-3 bg-white/95 rounded-xl px-3 py-2 shadow-md flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                        <Image
                          src={selectedProduct.images[0]?.url}
                          alt={selectedProduct.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold font-sans text-[#1A1A1A] leading-none">
                          {selectedProduct.name}
                        </p>
                        <p className="text-[10px] font-sans text-[#9A9A9A]">Previewing</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2 p-3 bg-[#EEF2FA] rounded-xl">
              <Info size={14} className="text-[#1B4F8C] shrink-0 mt-0.5" />
              <p className="text-xs font-sans text-[#1B4F8C] leading-relaxed">
                This is a preview overlay to help you visualise the design. For a fully accurate room render, our design team can create a bespoke mockup for you.{' '}
                <Link href="/custom-design" className="font-semibold hover:underline">
                  Request a custom render →
                </Link>
              </p>
            </div>

            {/* CTA */}
            {selectedProduct && roomImageUrl && (
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<ShoppingCart size={18} />}
                  onClick={handleUseDesign}
                  className="flex-1 min-w-[200px]"
                >
                  USE THIS DESIGN
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<RefreshCw size={16} />}
                  onClick={() => setSelectedProduct(null)}
                >
                  Change Design
                </Button>
                <Link
                  href={`/shop/${selectedProduct.slug}`}
                  className="inline-flex items-center gap-2 border-2 border-[#2C2C2C] text-[#2C2C2C] px-6 py-3.5 rounded-xl font-semibold font-sans text-sm hover:bg-[#2C2C2C] hover:text-white transition-all"
                >
                  View Full Details
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
