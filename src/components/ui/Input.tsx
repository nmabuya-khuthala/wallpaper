'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  containerClassName,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[#2C2C2C] font-sans"
        >
          {label}
          {props.required && (
            <span className="text-[#C4622D] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#9A9A9A] pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'input-base font-sans',
            leftIcon && 'pl-10',
            rightElement && 'pr-10',
            error && 'error',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3">{rightElement}</span>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-[#E05A4A] font-sans"
          role="alert"
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-[#9A9A9A] font-sans">
          {hint}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export function Textarea({
  label,
  error,
  hint,
  containerClassName,
  className,
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[#2C2C2C] font-sans"
        >
          {label}
          {props.required && (
            <span className="text-[#C4622D] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'input-base font-sans resize-none',
          error && 'error',
          className,
        )}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p className="text-xs text-[#E05A4A] font-sans" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#9A9A9A] font-sans">{hint}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  hint,
  containerClassName,
  className,
  id,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[#2C2C2C] font-sans"
        >
          {label}
          {props.required && (
            <span className="text-[#C4622D] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'input-base font-sans appearance-none cursor-pointer',
          error && 'error',
          className,
        )}
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-[#E05A4A] font-sans" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#9A9A9A] font-sans">{hint}</p>
      )}
    </div>
  );
}
