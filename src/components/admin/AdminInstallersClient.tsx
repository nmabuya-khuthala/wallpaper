'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Wrench, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Installer } from '@/types';

const DEMO_INSTALLERS: Installer[] = [
  {
    id: 'inst-001',
    name: 'Thabo Mokoena',
    email: 'thabo@installs.co.za',
    phone: '+27 82 000 0001',
    serviceAreas: ['Gauteng', 'Limpopo'],
    pricing: [{ area: 'Gauteng', pricePerPanel: 450, minimumCharge: 900 }],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    status: 'active',
    rating: 4.9,
    completedJobs: 147,
  },
  {
    id: 'inst-002',
    name: 'Priya Naidoo',
    email: 'priya@wallexperts.co.za',
    phone: '+27 83 000 0002',
    serviceAreas: ['KwaZulu-Natal', 'Eastern Cape'],
    pricing: [{ area: 'KwaZulu-Natal', pricePerPanel: 480, minimumCharge: 960 }],
    availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    status: 'active',
    rating: 5.0,
    completedJobs: 89,
  },
  {
    id: 'inst-003',
    name: 'Pieter van Wyk',
    email: 'pieter@wallpro.co.za',
    phone: '+27 84 000 0003',
    serviceAreas: ['Western Cape', 'Northern Cape'],
    pricing: [{ area: 'Western Cape', pricePerPanel: 420, minimumCharge: 840 }],
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    status: 'active',
    rating: 4.7,
    completedJobs: 203,
  },
];

export default function AdminInstallersClient() {
  const [installers, setInstallers] = useState<Installer[]>(DEMO_INSTALLERS);

  const toggleStatus = (id: string) => {
    setInstallers((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? { ...inst, status: inst.status === 'active' ? 'inactive' : 'active' }
          : inst,
      ),
    );
  };

  return (
    <div className="p-6 md:p-8 pt-20 md:pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Installers</h1>
          <p className="text-sm font-sans text-[#9A9A9A]">{installers.filter((i) => i.status === 'active').length} active installers</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-5 py-2.5 rounded-xl font-semibold font-sans text-sm hover:bg-[#9E4D23] transition-colors">
          <Plus size={16} />
          Add Installer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {installers.map((installer) => (
          <div key={installer.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C4622D]/10 flex items-center justify-center text-[#C4622D] font-bold font-display">
                  {installer.name[0]}
                </div>
                <div>
                  <p className="font-semibold font-sans text-sm text-[#1A1A1A]">{installer.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#D4A017]">★</span>
                    <span className="text-xs font-sans text-[#9A9A9A]">{installer.rating} · {installer.completedJobs} jobs</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleStatus(installer.id)}
                className={cn(
                  'px-2 py-1 rounded-full text-[10px] font-bold font-sans transition-colors',
                  installer.status === 'active'
                    ? 'bg-[#F0F5E8] text-[#2D5016]'
                    : 'bg-[#F5F5F5] text-[#9A9A9A]',
                )}
              >
                {installer.status}
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 text-xs font-sans text-[#5C5C5C]">
                <Mail size={12} className="text-[#9A9A9A]" />
                {installer.email}
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#5C5C5C]">
                <Phone size={12} className="text-[#9A9A9A]" />
                {installer.phone}
              </div>
              <div className="flex items-start gap-2 text-xs font-sans text-[#5C5C5C]">
                <MapPin size={12} className="text-[#9A9A9A] mt-0.5 shrink-0" />
                {installer.serviceAreas.join(', ')}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold font-sans text-[#9A9A9A] uppercase tracking-wider mb-1.5">Availability</p>
              <div className="flex flex-wrap gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const fullDay = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }[day]!;
                  const available = installer.availability.includes(fullDay);
                  return (
                    <span
                      key={day}
                      className={cn(
                        'text-[10px] font-sans font-medium px-1.5 py-0.5 rounded',
                        available ? 'bg-[#2D5016]/10 text-[#2D5016]' : 'bg-[#F5F5F5] text-[#D0D0D0]',
                      )}
                    >
                      {day}
                    </span>
                  );
                })}
              </div>
            </div>

            {installer.pricing[0] && (
              <div className="flex items-center justify-between pt-3 border-t border-[#F0E8D8]">
                <div className="text-xs font-sans text-[#5C5C5C]">
                  <Wrench size={10} className="inline mr-1" />
                  R{installer.pricing[0].pricePerPanel}/panel
                </div>
                <button className="p-1.5 text-[#9A9A9A] hover:text-[#C4622D] rounded-lg hover:bg-[#FAF0E6] transition-colors">
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
