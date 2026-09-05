import type { Metadata } from 'next';
import FamilyPortraitClient from '@/components/portraits/FamilyPortraitClient';

export const metadata: Metadata = {
  title: 'Family Portraits — Your Family Deserves a Wall',
  description:
    'Turn your favourite family photographs into stunning custom portrait wall art. Choose your style, upload your photos, and we\'ll create a beautiful family portrait printed to your exact wall dimensions.',
};

export default function FamilyPortraitsPage() {
  return <FamilyPortraitClient />;
}
