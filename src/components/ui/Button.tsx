'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'green'
  | 'mustard'
  | 'cobalt';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#C4622D] text-white hover:bg-[#9E4D23] active:bg-[#7A3A1A] shadow-sm hover:shadow-md',
  secondary:
    'bg-[#2C2C2C] text-white hover:bg-[#1A1A1A] active:bg-black shadow-sm',
  outline:
    'border-2 border-[#C4622D] text-[#C4622D] hover:bg-[#C4622D] hover:text-white bg-transparent',
  ghost:
    'text-[#C4622D] hover:bg-[#C4622D]/10 bg-transparent',
  danger:
    'bg-[#E05A4A] text-white hover:bg-[#C04535] shadow-sm',
  green:
    'bg-[#2D5016] text-white hover:bg-[#1E3510] shadow-sm',
  mustard:
    'bg-[#D4A017] text-white hover:bg-[#A87D12] shadow-sm',
  cobalt:
    'bg-[#1B4F8C] text-white hover:bg-[#123570] shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs rounded-md',
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4622D] disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const classes = cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
