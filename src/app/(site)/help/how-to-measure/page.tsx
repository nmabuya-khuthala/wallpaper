import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Measure Your Wall',
  description: 'Step-by-step guide to measuring your wall for bespoke wallpaper. Get accurate measurements for a perfect fit.',
};

export default function HowToMeasurePage() {
  const steps = [
    { step: '1', title: 'Find the widest point', desc: 'Measure the full width of your wall from corner to corner at its widest point. Note any doors or windows.' },
    { step: '2', title: 'Measure the height',    desc: 'Measure from floor to ceiling at the highest point. Measure in at least 3 places — walls are rarely perfectly straight.' },
    { step: '3', title: 'Note obstacles',         desc: 'Record the width and position of any doors, windows, sockets or switches.' },
    { step: '4', title: 'Use metres',            desc: 'Always use metres (not centimetres) for your measurements. Enter e.g. 3.20 for 320cm.' },
    { step: '5', title: 'Add to calculator',     desc: 'Enter your width and height in the Wall Calculator on any product page. We add a waste allowance automatically.' },
  ];

  return (
    <div className="pt-[70px] md:pt-[94px] min-h-screen bg-[#FDFAF6]">
      <div className="container-brand py-12 max-w-2xl">
        <h1 className="font-display font-bold text-3xl text-[#1A1A1A] mb-3">How to Measure Your Wall</h1>
        <p className="text-[#5C5C5C] font-sans mb-8">Accurate measurements ensure your wallpaper fits perfectly. Follow these steps.</p>
        <div className="flex flex-col gap-6">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-[#C4622D] text-white text-sm font-bold font-sans flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div>
                <h2 className="font-display font-semibold text-[#1A1A1A] mb-1">{s.title}</h2>
                <p className="text-sm font-sans text-[#5C5C5C] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
