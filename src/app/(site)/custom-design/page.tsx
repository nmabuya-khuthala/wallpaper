import type { Metadata } from 'next';
import CustomDesignClient from '@/components/custom/CustomDesignClient';

export const metadata: Metadata = {
  title: 'Custom Design — Your Idea, Your Wall',
  description:
    'Submit your custom wallpaper design request. Upload your artwork, photographs, or inspiration images and our team will bring your vision to life.',
};

export default function CustomDesignPage() {
  return <CustomDesignClient />;
}
