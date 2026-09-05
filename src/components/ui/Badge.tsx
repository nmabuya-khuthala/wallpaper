import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'terracotta'
  | 'green'
  | 'mustard'
  | 'cobalt'
  | 'coral'
  | 'pink'
  | 'charcoal'
  | 'outline';

const variantStyles: Record<BadgeVariant, string> = {
  default:    'bg-[#F0E8D8] text-[#5C5C5C]',
  terracotta: 'bg-[#C4622D]/10 text-[#C4622D]',
  green:      'bg-[#2D5016]/10 text-[#2D5016]',
  mustard:    'bg-[#D4A017]/15 text-[#A87D12]',
  cobalt:     'bg-[#1B4F8C]/10 text-[#1B4F8C]',
  coral:      'bg-[#E05A4A]/10 text-[#C04535]',
  pink:       'bg-[#F5D5CE] text-[#9D174D]',
  charcoal:   'bg-[#2C2C2C] text-white',
  outline:    'border border-[#E5DDD0] text-[#5C5C5C] bg-transparent',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export default function Badge({
  variant = 'default',
  children,
  className,
  size = 'sm',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        variantStyles[variant],
        size === 'md' && 'text-xs px-3 py-1',
        className,
      )}
    >
      {children}
    </span>
  );
}
