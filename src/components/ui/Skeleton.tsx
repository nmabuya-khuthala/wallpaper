import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  rounded?: boolean;
}

export default function Skeleton({ className, rounded }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', rounded && 'rounded-full', className)}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="w-full aspect-product" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3 mt-1" />
        <Skeleton className="h-9 w-full mt-2 rounded-lg" />
      </div>
    </div>
  );
}
