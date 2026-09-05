'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: 'underline' | 'pill';
}

export default function Tabs({
  tabs,
  defaultTab,
  className,
  variant = 'underline',
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={cn('w-full', className)}>
      {/* Tab list */}
      <div
        role="tablist"
        className={cn(
          'flex',
          variant === 'underline'
            ? 'border-b border-[#E5DDD0] gap-0'
            : 'gap-2 flex-wrap',
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              'flex items-center gap-2 font-sans font-medium text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C4622D] focus-visible:outline-offset-2',
              variant === 'underline'
                ? cn(
                    'px-5 py-3 border-b-2 -mb-px',
                    active === tab.id
                      ? 'border-[#C4622D] text-[#C4622D]'
                      : 'border-transparent text-[#9A9A9A] hover:text-[#2C2C2C]',
                  )
                : cn(
                    'px-4 py-2 rounded-full',
                    active === tab.id
                      ? 'bg-[#C4622D] text-white'
                      : 'bg-[#F0E8D8] text-[#5C5C5C] hover:bg-[#E5DDD0]',
                  ),
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
