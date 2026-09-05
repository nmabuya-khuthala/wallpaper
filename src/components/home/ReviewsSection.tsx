import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { formatDateShort } from '@/lib/utils';
import type { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const displayReviews = reviews.slice(0, 4);

  return (
    <section
      className="py-20 md:py-28 bg-white"
      aria-labelledby="reviews-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold font-sans uppercase tracking-widest text-[#C4622D] block mb-3">
            Customer Stories
          </span>
          <h2
            id="reviews-heading"
            className="font-display font-bold text-[#1A1A1A] mb-3"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            REAL HOMES. REAL STORIES.
          </h2>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={5} size="lg" />
            <span className="font-display font-bold text-2xl text-[#1A1A1A]">
              5.0
            </span>
            <span className="text-[#9A9A9A] font-sans text-sm">
              based on 500+ reviews
            </span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayReviews.map((review) => (
            <article
              key={review.id}
              className="bg-[#FDFAF6] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
            >
              {/* Stars */}
              <StarRating rating={review.rating} size="sm" />

              {/* Quote */}
              <h3 className="font-display font-semibold text-[#1A1A1A] text-base leading-snug">
                &ldquo;{review.title}&rdquo;
              </h3>

              <p className="text-[#5C5C5C] font-sans text-sm leading-relaxed flex-1 truncate-3">
                {review.body}
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#F0E8D8]">
                {review.customerPhoto ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={review.customerPhoto}
                      alt={review.customerName}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#C4622D]/15 flex items-center justify-center text-[#C4622D] font-bold font-sans text-sm shrink-0">
                    {review.customerName[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold font-sans text-sm text-[#1A1A1A]">
                    {review.customerName}
                  </p>
                  <div className="flex items-center gap-2">
                    {review.verified && (
                      <span className="text-[10px] font-sans text-[#2D5016] font-medium">
                        ✓ Verified purchase
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-sans text-[#9A9A9A]">
                    {formatDateShort(review.createdAt)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 text-sm font-semibold font-sans text-[#C4622D] hover:gap-3 transition-all duration-200 mx-auto w-fit"
          >
            Shop and write your own story
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
