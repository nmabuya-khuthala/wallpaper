'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn, calculateWallRequirements, formatCurrency, isValidWallDimension } from '@/lib/utils';
import type { Product, WallMeasurement, WallCalculationResult } from '@/types';

interface WallCalculatorProps {
  product: Product;
  onCalculate?: (result: WallCalculationResult, wall: WallMeasurement) => void;
  className?: string;
}

export default function WallCalculator({ product, onCalculate, className }: WallCalculatorProps) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<WallCalculationResult | null>(null);
  const [errors, setErrors] = useState<{ width?: string; height?: string }>({});

  const validate = (): boolean => {
    const errs: { width?: string; height?: string } = {};
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (!width || isNaN(w)) {
      errs.width = 'Please enter a wall width.';
    } else if (!isValidWallDimension(w)) {
      errs.width = 'Width must be between 0.5m and 20m.';
    }

    if (!height || isNaN(h)) {
      errs.height = 'Please enter a wall height.';
    } else if (!isValidWallDimension(h)) {
      errs.height = 'Height must be between 0.5m and 20m.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;
    const wall: WallMeasurement = { width: parseFloat(width), height: parseFloat(height) };
    const calc = calculateWallRequirements(wall, product.measurements, product.pricing);
    setResult(calc);
    onCalculate?.(calc, wall);
  };

  // Auto-recalculate when inputs change and are valid
  useEffect(() => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (
      width && height &&
      !isNaN(w) && !isNaN(h) &&
      isValidWallDimension(w) && isValidWallDimension(h)
    ) {
      const wall: WallMeasurement = { width: w, height: h };
      const calc = calculateWallRequirements(wall, product.measurements, product.pricing);
      setResult(calc);
      onCalculate?.(calc, wall);
      setErrors({});
    }
  }, [width, height]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn('bg-[#FAF6EE] rounded-2xl p-5 border border-[#F0E8D8]', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-[#C4622D]/10 rounded-lg flex items-center justify-center">
          <Calculator size={16} className="text-[#C4622D]" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-[#1A1A1A] text-base">
            Wall Measurement Calculator
          </h3>
          <p className="text-xs font-sans text-[#9A9A9A]">
            Enter your wall dimensions to get an exact quote
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold font-sans text-[#2C2C2C] block mb-1">
            Wall Width <span className="text-[#C4622D]">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="3.20"
              className={cn(
                'input-base font-sans pr-8 text-sm',
                errors.width && 'error',
              )}
              aria-label="Wall width in metres"
              aria-invalid={!!errors.width}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans text-[#9A9A9A]">
              m
            </span>
          </div>
          {errors.width && (
            <p className="text-xs text-[#E05A4A] font-sans mt-1 flex items-center gap-1">
              <AlertCircle size={11} />
              {errors.width}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold font-sans text-[#2C2C2C] block mb-1">
            Wall Height <span className="text-[#C4622D]">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="2.60"
              className={cn(
                'input-base font-sans pr-8 text-sm',
                errors.height && 'error',
              )}
              aria-label="Wall height in metres"
              aria-invalid={!!errors.height}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans text-[#9A9A9A]">
              m
            </span>
          </div>
          {errors.height && (
            <p className="text-xs text-[#E05A4A] font-sans mt-1 flex items-center gap-1">
              <AlertCircle size={11} />
              {errors.height}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full flex items-center justify-center gap-2 bg-[#2C2C2C] text-white py-2.5 rounded-xl font-semibold font-sans text-sm hover:bg-[#1A1A1A] transition-colors mb-4"
      >
        <Calculator size={15} />
        Calculate Requirements
      </button>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl border border-[#F0E8D8] overflow-hidden animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2D5016]/8 border-b border-[#F0E8D8]">
            <CheckCircle2 size={14} className="text-[#2D5016]" />
            <span className="text-xs font-semibold font-sans text-[#2D5016]">
              Calculation complete
            </span>
          </div>

          <div className="divide-y divide-[#F0E8D8]">
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-sans text-[#5C5C5C]">Your wall</span>
              <span className="text-sm font-semibold font-sans text-[#1A1A1A]">
                {result.breakdown.wallWidth}m × {result.breakdown.wallHeight}m
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-sans text-[#5C5C5C]">Wall area</span>
              <span className="text-sm font-semibold font-sans text-[#1A1A1A]">
                {result.wallArea} m²
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-sans text-[#5C5C5C]">
                Area with waste ({product.measurements.wasteAllowance}%)
              </span>
              <span className="text-sm font-semibold font-sans text-[#1A1A1A]">
                {result.requiredArea} m²
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-sans text-[#5C5C5C]">Panels required</span>
              <span className="text-sm font-bold font-sans text-[#C4622D]">
                {result.panelsRequired} panels
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-sans text-[#5C5C5C]">Material</span>
              <span className="text-sm font-semibold font-sans text-[#1A1A1A]">
                {product.defaultFinish}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[#FAF6EE]">
              <span className="text-sm font-bold font-sans text-[#1A1A1A]">
                Estimated price
              </span>
              <span className="font-display font-bold text-xl text-[#C4622D]">
                {formatCurrency(result.estimatedPrice)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* How to measure link */}
      <Link
        href="/help/how-to-measure"
        className="flex items-center gap-1.5 mt-3 text-xs font-sans text-[#1B4F8C] hover:underline"
      >
        <Info size={12} />
        How to measure your wall
      </Link>
    </div>
  );
}
