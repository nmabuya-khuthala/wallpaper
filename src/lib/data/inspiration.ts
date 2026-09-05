import type { InspirationImage } from '@/types';

export const INSPIRATION_IMAGES: InspirationImage[] = [
  {
    id: 'insp-001',
    url: '/gallery/1.jpg',
    alt: 'Living room with Golden Botanica feature wall',
    room: 'living-room',
    productIds: ['prod-001'],
    title: 'Botanical Living Room',
  },
  {
    id: 'insp-002',
    url: '/gallery/4.jpg',
    alt: 'Entertainment room with African Sunset mural',
    room: 'entertainment-room',
    productIds: ['prod-004'],
    title: 'Dramatic Entertainment Wall',
  },
  {
    id: 'insp-003',
    url: '/gallery/3.jpg',
    alt: 'Child\'s adventure bedroom',
    room: 'kids-room',
    productIds: ['prod-003'],
    title: 'The Adventure Room',
  },
  {
    id: 'insp-004',
    url: '/gallery/6.jpg',
    alt: 'Family memories portrait wall in entrance',
    room: 'family-wall',
    productIds: ['prod-006'],
    title: 'The Family Entrance Wall',
  },
  {
    id: 'insp-005',
    url: '/gallery/2.jpg',
    alt: 'Colourful bedroom with Sunday Blooms',
    room: 'bedroom',
    productIds: ['prod-002'],
    title: 'Sunday Morning Bedroom',
  },
  {
    id: 'insp-006',
    url: '/gallery/7.jpg',
    alt: 'Tropical dining room with Wild & Free mural',
    room: 'dining-room',
    productIds: ['prod-007'],
    title: 'Tropical Dining Experience',
  },
  {
    id: 'insp-007',
    url: '/gallery/8.jpg',
    alt: 'Modern home office with Abstract Energy',
    room: 'home-office',
    productIds: ['prod-008'],
    title: 'The Creative Home Office',
  },
  {
    id: 'insp-008',
    url: '/gallery/5.jpg',
    alt: 'Modern geometric entrance hall',
    room: 'entrance',
    productIds: ['prod-005'],
    title: 'Modern Earth Entrance',
  },
  {
    id: 'insp-009',
    url: '/gallery/9.jpg',
    alt: 'Nursery with soft botanical wallpaper',
    room: 'nursery',
    productIds: ['prod-003'],
    title: 'Dreamy Nursery',
  },
  {
    id: 'insp-010',
    url: '/gallery/10.jpg',
    alt: 'Bedroom with abstract wallpaper feature wall',
    room: 'bedroom',
    productIds: ['prod-008'],
    title: 'Bold Bedroom Feature',
  },
];

export const INSPIRATION_ROOMS = [
  { id: 'living-room',        label: 'Living Room' },
  { id: 'bedroom',            label: 'Bedroom' },
  { id: 'kids-room',          label: 'Kids Room' },
  { id: 'nursery',            label: 'Nursery' },
  { id: 'dining-room',        label: 'Dining Room' },
  { id: 'home-office',        label: 'Home Office' },
  { id: 'entertainment-room', label: 'Entertainment Room' },
  { id: 'entrance',           label: 'Entrance' },
  { id: 'family-wall',        label: 'Family Wall' },
] as const;

export function getInspirationByRoom(room: string): InspirationImage[] {
  if (room === 'all') return INSPIRATION_IMAGES;
  return INSPIRATION_IMAGES.filter((img) => img.room === room);
}
