import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
  colour?: 'terracotta' | 'green' | 'mustard' | 'cobalt';
}

const colours = {
  terracotta: 'bg-[#C4622D]',
  green:      'bg-[#2D5016]',
  mustard:    'bg-[#D4A017]',
  cobalt:     'bg-[#1B4F8C]',
};

export default function ProgressBar({
  value,
  label,
  className,
  colour = 'terracotta',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <p className="text-xs font-sans text-[#5C5C5C] mb-1">{label}</p>
      )}
      <div
        className="w-full bg-[#F0E8D8] rounded-full h-2"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-2 rounded-full transition-all duration-500', colours[colour])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
