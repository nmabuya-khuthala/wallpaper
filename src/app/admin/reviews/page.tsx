import type { Metadata } from 'next';
import { getApprovedReviews } from '@/lib/data/reviews';
import StarRating from '@/components/ui/StarRating';
import { formatDateShort } from '@/lib/utils';

export const metadata: Metadata = { title: 'Reviews — Admin' };

export default function AdminReviewsPage() {
  const reviews = getApprovedReviews();
  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Reviews</h1>
        <p className="text-sm font-sans text-[#9A9A9A]">{reviews.length} approved reviews</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F0E8D8] bg-[#FDFAF6]">
                {['Customer', 'Rating', 'Title', 'Body', 'Verified', 'Date', 'Actions'].map((col) => (
                  <th key={col} className="text-left px-4 py-3 text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D8]">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-[#FDFAF6] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold font-sans text-[#1A1A1A]">{r.customerName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={r.rating} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-sans text-[#1A1A1A] max-w-[180px] truncate">{r.title}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-sans text-[#5C5C5C] max-w-[240px] truncate">{r.body}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold font-sans ${r.verified ? 'text-[#2D5016]' : 'text-[#9A9A9A]'}`}>
                      {r.verified ? '✓ Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans text-[#9A9A9A] whitespace-nowrap">{formatDateShort(r.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="px-2 py-1 text-xs font-sans font-medium rounded-lg bg-[#F0F5E8] text-[#2D5016] hover:bg-[#2D5016] hover:text-white transition-colors">Approve</button>
                      <button className="px-2 py-1 text-xs font-sans font-medium rounded-lg bg-red-50 text-[#E05A4A] hover:bg-[#E05A4A] hover:text-white transition-colors">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
