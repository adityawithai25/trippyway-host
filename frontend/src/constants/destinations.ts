/**
 * Destination Navigation Configuration
 * Data for the horizontal destination slider with images
 */

export interface Destination {
  id: string;
  name: string;
  icon: string; // Emoji icon (fallback)
  image?: string; // Image path (preferred)
  trending?: boolean; // Show fire emoji badge
  slug: string; // URL slug for filtering
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'explore',
    name: 'Explore',
    icon: '🗺️',
    image: '/images/destinations/view-mountains-from-top-mountain.webp',
    slug: '',
  },
  {
    id: 'himachal',
    name: 'Himachal',
    icon: '⛷️',
    image: '/images/destinations/spring-kullu-valley-himalaya-mountains-himachal-pradesh-india (1).webp',
    trending: true,
    slug: 'himachal',
  },
  {
    id: 'manali',
    name: 'Manali',
    icon: '🏔️',
    image: '/images/destinations/manali-himachal-pradesh-winter-after-heavy-snow-fall (1).webp',
    trending: true,
    slug: 'manali',
  },
  {
    id: 'kasol',
    name: 'Kasol',
    icon: '🏕️',
    image: '/images/destinations/local-houses-kasol-village-india (4).webp',
    slug: 'kasol',
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    icon: '🌸',
    image: '/images/destinations/mountain-range-with-snow-top-blue-sky-background.webp',
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
    image: '/images/destinations/white-chair-dinner-parasol-wedding.webp',
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
    image: '/images/destinations/view-mountains-from-valley.webp',
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
    image: '/images/destinations/village-mountains-with-mountain-background (1).webp',
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





