import React from 'react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  showCount,
  count,
  className,
}: StarRatingProps) {
  const px = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center" aria-label={`${rating} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <svg
              key={i}
              width={px}
              height={px}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={
                filled
                  ? 'star-filled'
                  : partial
                  ? 'text-[#D4A017]'
                  : 'star-empty'
              }
            >
              {partial ? (
                <>
                  <defs>
                    <linearGradient id={`partial-${i}`}>
                      <stop offset="50%" stopColor="#D4A017" />
                      <stop offset="50%" stopColor="#D4C4B0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill={`url(#partial-${i})`}
                    points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  />
                </>
              ) : (
                <polygon
                  fill="currentColor"
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                />
              )}
            </svg>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-[#9A9A9A] font-sans">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
