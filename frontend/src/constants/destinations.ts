/**
 * Destination Navigation Configuration
 * Data for the horizontal destination slider with emoji icons
 */

export interface Destination {
  id: string;
  name: string;
  icon: string; // Emoji icon
  trending?: boolean; // Show fire emoji badge
  slug: string; // URL slug for filtering
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'explore',
    name: 'Explore',
    icon: '🗺️',
    slug: '',
  },
  {
    id: 'himachal',
    name: 'Himachal',
    icon: '⛷️',
    trending: true,
    slug: 'himachal',
  },
  {
    id: 'manali',
    name: 'Manali',
    icon: '🏔️',
    trending: true,
    slug: 'manali',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    icon: '🏕️',
    slug: 'kasol',
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    icon: '🌸',
    trending: true,
    slug: 'kashmir',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    icon: '🛶',
    trending: true,
    slug: 'kerala',
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    icon: '🏰',
    slug: 'jaipur',
  },
  {
    id: 'goa',
    name: 'Goa',
    icon: '🏖️',
    trending: true,
    slug: 'goa',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    icon: '🏞️',
    trending: true,
    slug: 'ladakh',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    icon: '🐫',
    slug: 'rajasthan',
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    icon: '⛰️',
    slug: 'uttarakhand',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    icon: '🏙️',
    trending: true,
    slug: 'dubai',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    icon: '🦁',
    slug: 'singapore',
  },
  {
    id: 'thailand',
    name: 'Thailand',
    icon: '🐘',
    slug: 'thailand',
  },
  {
    id: 'bali',
    name: 'Bali',
    icon: '🌴',
    trending: true,
    slug: 'bali',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    icon: '🐠',
    slug: 'maldives',
  },
  {
    id: 'andaman',
    name: 'Andaman',
    icon: '🏝️',
    slug: 'andaman',
  },
  {
    id: 'europe',
    name: 'Europe',
    icon: '🗼',
    slug: 'europe',
  },
];



