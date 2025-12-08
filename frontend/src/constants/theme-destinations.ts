/**
 * Theme-Based Destination Data
 * Curated Indian destinations organized by target audience themes
 * All images sourced from authentic-images.ts library
 */

import { DESTINATION_IMAGES } from './authentic-images';

export interface ThemeDestination {
  themeId: string;
  themeName: string;
  themeSlug: string;
  tagline: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Theme color hex
  destinations: {
    name: string;
    cityCode: string;
    image: string; // Image URL
    highlights: string[];
  }[];
}

export const THEME_DESTINATIONS: ThemeDestination[] = [
  {
    themeId: 'romantic-escape',
    themeName: 'Romantic Escape',
    themeSlug: 'romantic-escape',
    tagline: 'Create Unforgettable Moments Together',
    description: 'Curated destinations for couples seeking intimate experiences and breathtaking memories across India',
    icon: 'Heart',
    color: '#EC4899', // Pink
    destinations: [
      {
        name: 'Udaipur',
        cityCode: 'UDR',
        image: DESTINATION_IMAGES.udaipur.lake,
        highlights: [
          'Sunset boat rides on Lake Pichola',
          'Luxury heritage palace stays',
          'Candlelit rooftop dinners with city views'
        ]
      },
      {
        name: 'Goa',
        cityCode: 'GOI',
        image: DESTINATION_IMAGES.goa.beach,
        highlights: [
          'Private beach villas and resorts',
          'Scenic coastal sunsets',
          'Couple spa retreats and wellness'
        ]
      },
      {
        name: 'Kashmir',
        cityCode: 'KAS',
        image: DESTINATION_IMAGES.kashmir.houseboat,
        highlights: [
          'Houseboat stays on Dal Lake',
          'Shikara rides at golden hour',
          'Snow-capped mountain backdrop'
        ]
      },
      {
        name: 'Coorg',
        cityCode: 'CRG',
        image: DESTINATION_IMAGES.coorg.plantation,
        highlights: [
          'Coffee plantation homestays',
          'Misty hill station romance',
          'Abbey Falls and nature walks'
        ]
      },
      {
        name: 'Andaman',
        cityCode: 'IXZ',
        image: DESTINATION_IMAGES.andaman.beach,
        highlights: [
          'Secluded beaches and crystal waters',
          'Scuba diving adventures',
          'Beachfront candlelit dining'
        ]
      }
    ]
  },
  {
    themeId: 'designer-photographer',
    themeName: 'Designer & Photographer',
    themeSlug: 'designer-photographer',
    tagline: 'Capture India\'s Most Photogenic Landscapes',
    description: 'Perfect backdrops for content creators, videographers, and visual artists seeking stunning compositions',
    icon: 'Camera',
    color: '#8B5CF6', // Purple
    destinations: [
      {
        name: 'Jaisalmer',
        cityCode: 'JSA',
        image: DESTINATION_IMAGES.jaisalmer.fort,
        highlights: [
          'Golden hour desert photography',
          'Architectural heritage frames',
          'Sam sand dunes cinematography'
        ]
      },
      {
        name: 'Hampi',
        cityCode: 'HMP',
        image: DESTINATION_IMAGES.hampi.boulders,
        highlights: [
          'Ancient boulder landscapes',
          'Sunrise temple silhouettes',
          'Unique rock formations and ruins'
        ]
      },
      {
        name: 'Rishikesh',
        cityCode: 'RSG',
        image: DESTINATION_IMAGES.rishikesh.ganga,
        highlights: [
          'Ganges river ghat photography',
          'Suspension bridge perspectives',
          'Yoga and spiritual content'
        ]
      },
      {
        name: 'Varanasi',
        cityCode: 'VNS',
        image: DESTINATION_IMAGES.varanasi.ghats,
        highlights: [
          'Spiritual morning ghat rituals',
          'Ancient lanes and architecture',
          'Ganga Aarti ceremony spectacle'
        ]
      },
      {
        name: 'Ladakh',
        cityCode: 'LAD',
        image: DESTINATION_IMAGES.ladakh.pangong,
        highlights: [
          'Pangong Lake color palette',
          'High-altitude mountain scapes',
          'Buddhist monastery frames'
        ]
      }
    ]
  },
  {
    themeId: 'professional-planning',
    themeName: 'Professional Planning',
    themeSlug: 'professional-planning',
    tagline: 'Elevate Your Team with Strategic Retreats',
    description: 'Handpicked locations for corporate retreats, team building, and professional offsites',
    icon: 'Briefcase',
    color: '#3B82F6', // Blue
    destinations: [
      {
        name: 'Lonavala',
        cityCode: 'LNL',
        image: DESTINATION_IMAGES.lonavala.hills,
        highlights: [
          'Hill station conference facilities',
          'Team building activities',
          'Close proximity to Mumbai/Pune'
        ]
      },
      {
        name: 'Coorg',
        cityCode: 'CRG',
        image: DESTINATION_IMAGES.coorg.plantation,
        highlights: [
          'Plantation resort venues',
          'Nature-based team exercises',
          'Professional yet serene atmosphere'
        ]
      },
      {
        name: 'Pondicherry',
        cityCode: 'PNY',
        image: DESTINATION_IMAGES.pondicherry.main,
        highlights: [
          'Coastal retreat ambiance',
          'French Quarter for networking',
          'Auroville for mindfulness sessions'
        ]
      },
      {
        name: 'Goa',
        cityCode: 'GOI',
        image: DESTINATION_IMAGES.goa.beach,
        highlights: [
          'Beach resort conference centers',
          'Team bonding activities',
          'Relaxation and work balance'
        ]
      },
      {
        name: 'Shimla',
        cityCode: 'SLV',
        image: DESTINATION_IMAGES.shimla.main,
        highlights: [
          'Colonial-era conference venues',
          'Mountain retreat setting',
          'Mall Road for team outings'
        ]
      }
    ]
  },
  {
    themeId: 'theater-arts',
    themeName: 'Theater & Performing Arts',
    themeSlug: 'theater-arts',
    tagline: 'Immerse in India\'s Cultural Heartbeat',
    description: 'Cultural hubs for theater enthusiasts, performers, and arts lovers seeking creative inspiration',
    icon: 'Sparkles',
    color: '#F59E0B', // Amber/Gold
    destinations: [
      {
        name: 'Delhi',
        cityCode: 'DEL',
        image: DESTINATION_IMAGES.delhi.heritage,
        highlights: [
          'National School of Drama',
          'Kamani Auditorium performances',
          'India Habitat Centre cultural events'
        ]
      },
      {
        name: 'Mumbai',
        cityCode: 'BOM',
        image: DESTINATION_IMAGES.mumbai.skyline,
        highlights: [
          'Prithvi Theatre legacy',
          'NCPA cultural center',
          'Bollywood film city tours'
        ]
      },
      {
        name: 'Chennai',
        cityCode: 'MAA',
        image: DESTINATION_IMAGES.chennai.temple,
        highlights: [
          'Kalakshetra Foundation',
          'Music Academy concerts',
          'Bharatanatyam performances'
        ]
      },
      {
        name: 'Kolkata',
        cityCode: 'CCU',
        image: DESTINATION_IMAGES.kolkata.culture,
        highlights: [
          'Academy of Fine Arts',
          'Rabindra Sadan theater',
          'Street theater and cultural festivals'
        ]
      },
      {
        name: 'Jaipur',
        cityCode: 'JAI',
        image: DESTINATION_IMAGES.jaipur.heritage,
        highlights: [
          'Jaipur Literature Festival',
          'Rajasthani folk performances',
          'Heritage venue cultural shows'
        ]
      }
    ]
  }
];

// Helper function to get theme by slug
export function getThemeBySlug(slug: string): ThemeDestination | undefined {
  return THEME_DESTINATIONS.find(theme => theme.themeSlug === slug);
}

// Helper function to get all theme slugs
export function getAllThemeSlugs(): string[] {
  return THEME_DESTINATIONS.map(theme => theme.themeSlug);
}

// Export theme colors for easy access
export const THEME_COLORS = {
  'romantic-escape': '#EC4899',
  'designer-photographer': '#8B5CF6',
  'professional-planning': '#3B82F6',
  'theater-arts': '#F59E0B',
} as const;
