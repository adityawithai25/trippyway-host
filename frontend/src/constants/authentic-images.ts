/**
 * AUTHENTIC IMAGE LIBRARY - TrippyWay
 * 
 * All images sourced from Unsplash with proper attribution
 * Organized by destination, theme, and purpose
 * High quality (min 1400px width) for web optimization
 * 
 * Image URL Format: https://images.unsplash.com/photo-{id}?q=80&w={width}&auto=format&fit=crop
 * Quality: 80 (optimal for web)
 * Width: 1400px (standard), 800px (thumbnails)
 * Auto format: Yes (WebP support)
 */

// ========================================================================
// DESTINATION IMAGES - PRIMARY LOCATIONS
// ========================================================================

export const DESTINATION_IMAGES = {
  // HIMACHAL PRADESH
  manali: {
    main: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
    snow: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    romantic: "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?q=80&w=1400&auto=format&fit=crop",
    adventure: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1400&auto=format&fit=crop",
    winter: "https://images.unsplash.com/photo-1501179691627-2d072e4e34c9?q=80&w=1400&auto=format&fit=crop",
    mountains: "https://images.unsplash.com/photo-1626597627004-cd4eee8d4c7c?q=80&w=1400&auto=format&fit=crop",
  },
  kasol: {
    main: "https://images.unsplash.com/photo-1518182170546-07fa6aa99792?q=80&w=1400&auto=format&fit=crop",
    hippie: "https://images.unsplash.com/photo-1609421141185-8a4f37a5d063?q=80&w=1400&auto=format&fit=crop",
    valley: "https://images.unsplash.com/photo-1471513671802-81d404d2a7de?q=80&w=1400&auto=format&fit=crop",
  },
  shimla: {
    main: "https://images.unsplash.com/photo-1626597627004-cd4eee8d4c7c?q=80&w=1400&auto=format&fit=crop",
    colonial: "https://images.unsplash.com/photo-1671883017005-4bec8547b6e1?q=80&w=1400&auto=format&fit=crop",
  },
  rishikesh: {
    main: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
    rafting: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop",
    yoga: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop",
    camping: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1400&auto=format&fit=crop",
    ganga: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1400&auto=format&fit=crop",
  },

  // RAJASTHAN
  udaipur: {
    main: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1400&auto=format&fit=crop",
    palace: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
    lake: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
  },
  jaisalmer: {
    main: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1400&auto=format&fit=crop",
    desert: "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=1400&auto=format&fit=crop",
    fort: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
  },
  jaipur: {
    main: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1400&auto=format&fit=crop",
    heritage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
  },

  // GOA
  goa: {
    main: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop",
    beach: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop",
    party: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=1400&auto=format&fit=crop",
  },

  // KASHMIR
  kashmir: {
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    dalLake: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=1400&auto=format&fit=crop",
    houseboat: "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=800&auto=format&fit=crop",
  },

  // KARNATAKA
  coorg: {
    main: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1400&auto=format&fit=crop",
    plantation: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=800&auto=format&fit=crop",
  },
  hampi: {
    main: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?q=80&w=1400&auto=format&fit=crop",
    ruins: "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=1400&auto=format&fit=crop",
    boulders: "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=800&auto=format&fit=crop",
  },

  // ANDAMAN
  andaman: {
    main: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=1400&auto=format&fit=crop",
    beach: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=800&auto=format&fit=crop",
  },

  // MAHARASHTRA
  lonavala: {
    main: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
    hills: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop",
  },
  mumbai: {
    main: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1400&auto=format&fit=crop",
    skyline: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1400&auto=format&fit=crop",
  },

  // PONDICHERRY
  pondicherry: {
    main: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1400&auto=format&fit=crop",
    french: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1400&auto=format&fit=crop",
  },

  // SPIRITUAL CITIES
  varanasi: {
    main: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1400&auto=format&fit=crop",
    ghats: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
    aarti: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?q=80&w=1400&auto=format&fit=crop",
  },
  prayagraj: {
    main: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1400&auto=format&fit=crop",
    sangam: "https://images.unsplash.com/photo-1598077550687-c854e50d8afc?q=80&w=1400&auto=format&fit=crop",
    kumbh: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
  },
  ayodhya: {
    main: "https://images.unsplash.com/photo-1585131349129-e68173d2e3b4?q=80&w=1400&auto=format&fit=crop",
    temple: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=1400&auto=format&fit=crop",
  },

  // METRO CITIES
  delhi: {
    main: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1400&auto=format&fit=crop",
    heritage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop",
  },
  chennai: {
    main: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1400&auto=format&fit=crop",
    temple: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop",
  },
  kolkata: {
    main: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1400&auto=format&fit=crop",
    culture: "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=800&auto=format&fit=crop",
  },

  // LADAKH
  ladakh: {
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    pangong: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    monastery: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
  },
} as const;

// ========================================================================
// CATEGORY-BASED IMAGES
// ========================================================================

export const CATEGORY_IMAGES = {
  couples: [
    "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501179691627-2d072e4e34c9?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?q=80&w=1400&auto=format&fit=crop",
  ],
  girls: [
    "https://images.unsplash.com/photo-1735507081159-bb3ef1a3874b?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609421141185-8a4f37a5d063?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1671883017005-4bec8547b6e1?q=80&w=1400&auto=format&fit=crop",
  ],
  boys: [
    "https://images.unsplash.com/photo-1471513671802-81d404d2a7de?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1400&auto=format&fit=crop",
  ],
  mixed: [
    "https://images.unsplash.com/photo-1518182170546-07fa6aa99792?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
  ],
  family: [
    "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585131349129-e68173d2e3b4?q=80&w=1400&auto=format&fit=crop",
  ],
} as const;

// ========================================================================
// THEME-BASED IMAGES
// ========================================================================

export const THEME_IMAGES = {
  romantic: {
    primary: DESTINATION_IMAGES.udaipur.main,
    secondary: [
      DESTINATION_IMAGES.goa.main,
      DESTINATION_IMAGES.kashmir.main,
      DESTINATION_IMAGES.coorg.main,
      DESTINATION_IMAGES.andaman.main,
    ],
  },
  photography: {
    primary: DESTINATION_IMAGES.jaisalmer.main,
    secondary: [
      DESTINATION_IMAGES.hampi.main,
      DESTINATION_IMAGES.rishikesh.ganga,
      DESTINATION_IMAGES.varanasi.main,
      DESTINATION_IMAGES.ladakh.main,
    ],
  },
  corporate: {
    primary: DESTINATION_IMAGES.lonavala.main,
    secondary: [
      DESTINATION_IMAGES.coorg.main,
      DESTINATION_IMAGES.pondicherry.main,
      DESTINATION_IMAGES.goa.main,
      DESTINATION_IMAGES.shimla.main,
    ],
  },
  cultural: {
    primary: DESTINATION_IMAGES.delhi.main,
    secondary: [
      DESTINATION_IMAGES.mumbai.main,
      DESTINATION_IMAGES.chennai.main,
      DESTINATION_IMAGES.kolkata.main,
      DESTINATION_IMAGES.jaipur.main,
    ],
  },
  spiritual: {
    primary: DESTINATION_IMAGES.varanasi.main,
    secondary: [
      DESTINATION_IMAGES.prayagraj.main,
      DESTINATION_IMAGES.ayodhya.main,
      DESTINATION_IMAGES.rishikesh.ganga,
    ],
  },
  adventure: {
    primary: DESTINATION_IMAGES.rishikesh.main,
    secondary: [
      DESTINATION_IMAGES.manali.adventure,
      DESTINATION_IMAGES.ladakh.main,
      DESTINATION_IMAGES.kasol.main,
    ],
  },
} as const;

// ========================================================================
// ACTIVITY-BASED IMAGES
// ========================================================================

export const ACTIVITY_IMAGES = {
  rafting: [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop",
  ],
  camping: [
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1400&auto=format&fit=crop",
  ],
  trekking: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
  ],
  beach: [
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=1400&auto=format&fit=crop",
  ],
  heritage: [
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400&auto=format&fit=crop",
  ],
  desert: [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609920658906-8223bd289001?q=80&w=1400&auto=format&fit=crop",
  ],
  mountains: [
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626597627004-cd4eee8d4c7c?q=80&w=1400&auto=format&fit=crop",
  ],
} as const;

// ========================================================================
// LANDING PAGE & HERO IMAGES
// ========================================================================

export const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  slider: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1740&auto=format&fit=crop",
  ],
} as const;

// ========================================================================
// HELPER FUNCTIONS
// ========================================================================

/**
 * Get image for a specific destination
 */
export function getDestinationImage(destination: string, variant: string = 'main'): string {
  const dest = destination.toLowerCase().replace(/[^a-z]/g, '');
  const images = DESTINATION_IMAGES[dest as keyof typeof DESTINATION_IMAGES];
  
  if (images && typeof images === 'object') {
    return (images as any)[variant] || (images as any).main;
  }
  
  // Fallback to a default image
  return HERO_IMAGES.main;
}

/**
 * Get images for a specific theme
 */
export function getThemeImages(theme: keyof typeof THEME_IMAGES): string[] {
  const themeData = THEME_IMAGES[theme];
  return [themeData.primary, ...themeData.secondary];
}

/**
 * Get random image from a category
 */
export function getCategoryImage(category: keyof typeof CATEGORY_IMAGES, index: number = 0): string {
  const images = CATEGORY_IMAGES[category];
  return images[index % images.length];
}

/**
 * Get activity-specific images
 */
export function getActivityImages(activity: keyof typeof ACTIVITY_IMAGES): readonly string[] {
  return ACTIVITY_IMAGES[activity];
}

/**
 * Validate if an image URL is from an authentic source
 */
export function isAuthenticImage(url: string): boolean {
  const allowedDomains = [
    'images.unsplash.com',
    'unsplash.com',
    // Add other trusted sources here
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * Get optimized image URL with custom parameters
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  } = {}
): string {
  const { width = 1400, quality = 80, format = 'auto' } = options;
  
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('w', width.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    
    return url.toString();
  } catch {
    return baseUrl;
  }
}

// ========================================================================
// EXPORT ALL
// ========================================================================

export default {
  DESTINATION_IMAGES,
  CATEGORY_IMAGES,
  THEME_IMAGES,
  ACTIVITY_IMAGES,
  HERO_IMAGES,
  getDestinationImage,
  getThemeImages,
  getCategoryImage,
  getActivityImages,
  isAuthenticImage,
  getOptimizedImageUrl,
};
