/**
 * Theme-Based Destination Data
 * Curated Indian destinations organized by target audience themes
 */

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
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
        highlights: [
          'Sunset boat rides on Lake Pichola',
          'Luxury heritage palace stays',
          'Candlelit rooftop dinners with city views'
        ]
      },
      {
        name: 'Goa',
        cityCode: 'GOI',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        highlights: [
          'Private beach villas and resorts',
          'Scenic coastal sunsets',
          'Couple spa retreats and wellness'
        ]
      },
      {
        name: 'Kashmir',
        cityCode: 'KAS',
        image: 'https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=800&q=80',
        highlights: [
          'Houseboat stays on Dal Lake',
          'Shikara rides at golden hour',
          'Snow-capped mountain backdrop'
        ]
      },
      {
        name: 'Coorg',
        cityCode: 'CRG',
        image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        highlights: [
          'Coffee plantation homestays',
          'Misty hill station romance',
          'Abbey Falls and nature walks'
        ]
      },
      {
        name: 'Andaman',
        cityCode: 'IXZ',
        image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
        highlights: [
          'Golden hour desert photography',
          'Architectural heritage frames',
          'Sam sand dunes cinematography'
        ]
      },
      {
        name: 'Hampi',
        cityCode: 'HMP',
        image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&q=80',
        highlights: [
          'Ancient boulder landscapes',
          'Sunrise temple silhouettes',
          'Unique rock formations and ruins'
        ]
      },
      {
        name: 'Rishikesh',
        cityCode: 'RSG',
        image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
        highlights: [
          'Ganges river ghat photography',
          'Suspension bridge perspectives',
          'Yoga and spiritual content'
        ]
      },
      {
        name: 'Varanasi',
        cityCode: 'VNS',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
        highlights: [
          'Spiritual morning ghat rituals',
          'Ancient lanes and architecture',
          'Ganga Aarti ceremony spectacle'
        ]
      },
      {
        name: 'Ladakh',
        cityCode: 'LAD',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
        highlights: [
          'Hill station conference facilities',
          'Team building activities',
          'Close proximity to Mumbai/Pune'
        ]
      },
      {
        name: 'Coorg',
        cityCode: 'CRG',
        image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        highlights: [
          'Plantation resort venues',
          'Nature-based team exercises',
          'Professional yet serene atmosphere'
        ]
      },
      {
        name: 'Pondicherry',
        cityCode: 'PNY',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
        highlights: [
          'Coastal retreat ambiance',
          'French Quarter for networking',
          'Auroville for mindfulness sessions'
        ]
      },
      {
        name: 'Goa',
        cityCode: 'GOI',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
        highlights: [
          'Beach resort conference centers',
          'Team bonding activities',
          'Relaxation and work balance'
        ]
      },
      {
        name: 'Shimla',
        cityCode: 'SLV',
        image: 'https://images.unsplash.com/photo-1626597627004-cd4eee8d4c7c?w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
        highlights: [
          'National School of Drama',
          'Kamani Auditorium performances',
          'India Habitat Centre cultural events'
        ]
      },
      {
        name: 'Mumbai',
        cityCode: 'BOM',
        image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
        highlights: [
          'Prithvi Theatre legacy',
          'NCPA cultural center',
          'Bollywood film city tours'
        ]
      },
      {
        name: 'Chennai',
        cityCode: 'MAA',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
        highlights: [
          'Kalakshetra Foundation',
          'Music Academy concerts',
          'Bharatanatyam performances'
        ]
      },
      {
        name: 'Kolkata',
        cityCode: 'CCU',
        image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80',
        highlights: [
          'Academy of Fine Arts',
          'Rabindra Sadan theater',
          'Street theater and cultural festivals'
        ]
      },
      {
        name: 'Jaipur',
        cityCode: 'JAI',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
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
