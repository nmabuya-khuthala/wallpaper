'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={cn('divide-y divide-[#E5DDD0]', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between py-4 px-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4622D] focus-visible:outline-offset-2 rounded"
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
            >
              <span className="text-base font-semibold text-[#1A1A1A] font-display pr-4">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  'shrink-0 text-[#C4622D] transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`acc-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="pb-4 px-1 text-[#5C5C5C] font-sans text-sm leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
