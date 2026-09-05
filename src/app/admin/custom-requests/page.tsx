import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Custom Requests — Admin' };

export default function AdminCustomRequestsPage() {
  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <h1 className="font-display font-bold text-2xl text-[#1A1A1A] mb-2">Custom Design Requests</h1>
      <p className="text-sm font-sans text-[#9A9A9A] mb-6">
        Customer design requests submitted via the Custom Design page.
      </p>
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="text-4xl mb-3">🎨</div>
        <p className="font-sans text-[#5C5C5C]">
          Custom design requests will appear here when customers submit them.
        </p>
        <p className="text-xs font-sans text-[#9A9A9A] mt-2">
          Connect a database (Supabase) to persist requests across sessions.
        </p>
      </div>
    </div>
  );
}
