/**
 * Indian Cities Search Data & Functions
 * Fast client-side search for location suggestions
 * Optimized for instant autocomplete results
 */

export interface IndianCity {
  code: string;
  name: string;
  zones: string[];
}

export interface SearchResult {
  name: string;
  code: string;
  type: 'city' | 'zone';
  parentCity?: string;
  matchScore: number;
}

// Optimized Indian cities data for fast in-memory search (consolidated from all sources)
export const INDIAN_CITIES: IndianCity[] = [
  { code: "1NA", name: "Panna", zones: ["Panna National Park"] },
  { code: "ABG", name: "Bagalkot", zones: ["Badami", "Pattadakal"] },
  { code: "ABM", name: "Ambala", zones: ["South Ambala"] },
  { code: "ABT", name: "Bathinda", zones: ["Bathinda city"] },
  { code: "AGR", name: "Agra", zones: ["Agra", "Taj Mahal Area"] },
  { code: "AJM", name: "Ajmer", zones: ["Ajmer city", "Pushkar", "Dargah Sharif"] },
  { code: "ALB", name: "Alleppey", zones: ["Backwaters", "Alleppey Beach", "Alappuzha"] },
  { code: "AMD", name: "Ahmedabad", zones: ["Ahmedabad", "SG Highway", "Navrangpura"] },
  { code: "AOR", name: "Gorakhpur", zones: ["Gorakhpur city"] },
  { code: "AOT", name: "Kota", zones: ["Kota City"] },
  { code: "ATQ", name: "Amritsar", zones: ["Amritsar", "Golden Temple Area"] },
  { code: "AWR", name: "Alwar", zones: ["Alwar City", "Sariska"] },
  { code: "BBI", name: "Bhubaneswar", zones: ["Bhubaneswar", "Puri Road"] },
  { code: "BDQ", name: "Vadodara", zones: ["Vadodara", "Alkapuri", "Laxmi Vilas Palace"] },
  { code: "BHJ", name: "Bhuj", zones: ["Bhuj city", "Rann of Kutch"] },
  { code: "BHO", name: "Bhopal", zones: ["Bhopal", "MP Nagar", "New Market"] },
  { code: "BKN", name: "Bikaner", zones: ["Bikaner city", "Junagarh Fort"] },
  { code: "BLR", name: "Bengaluru", zones: ["Koramangala", "Whitefield", "MG Road", "Electronic City", "Indiranagar", "Jayanagar"] },
  { code: "BOM", name: "Mumbai", zones: ["South Mumbai", "Bandra", "Andheri", "Juhu", "Colaba", "Worli", "Powai"] },
  { code: "CCJ", name: "Kozhikode", zones: ["Kozhikode", "Calicut Beach"] },
  { code: "CCU", name: "Kolkata", zones: ["Park Street", "Salt Lake", "Howrah", "New Town", "Esplanade", "Victoria Memorial"] },
  { code: "CHT", name: "Chittorgarh", zones: ["Chittorgarh Fort", "Chittorgarh city"] },
  { code: "CJB", name: "Coimbatore", zones: ["Coimbatore", "RS Puram", "Gandhipuram"] },
  { code: "COK", name: "Kochi", zones: ["Fort Kochi", "Marine Drive", "Ernakulam"] },
  { code: "DBR", name: "Darbhanga", zones: ["Darbhanga city"] },
  { code: "DEL", name: "Delhi", zones: ["Connaught Place", "Karol Bagh", "Paharganj", "South Delhi", "Dwarka", "Aerocity"] },
  { code: "DGH", name: "Deoghar", zones: ["Deoghar city"] },
  { code: "DHM", name: "Dharamshala", zones: ["McLeod Ganj", "Dharamshala city", "Bhagsu"] },
  { code: "DIB", name: "Dibrugarh", zones: ["Dibrugarh city"] },
  { code: "DMU", name: "Diu", zones: ["Diu city", "Diu Beach"] },
  { code: "DRJ", name: "Darjeeling", zones: ["Mall Road", "Tiger Hill", "Darjeeling city"] },
  { code: "DWK", name: "Dwarka", zones: ["Dwarka city", "Dwarkadhish Temple"] },
  { code: "GAU", name: "Guwahati", zones: ["Guwahati", "Paltan Bazaar", "Kamakhya"] },
  { code: "GAY", name: "Gaya", zones: ["Bodh Gaya", "Gaya city"] },
  { code: "GNR", name: "Gandhidham", zones: ["Gandhidham city"] },
  { code: "GOI", name: "Goa", zones: ["North Goa", "South Goa", "Panaji", "Calangute", "Baga", "Anjuna", "Candolim", "Vagator", "Palolem", "Arambol"] },
  { code: "GOP", name: "Gorakhpur", zones: ["Gorakhpur city"] },
  { code: "GWL", name: "Gwalior", zones: ["Gwalior city", "Gwalior Fort"] },
  { code: "HBX", name: "Hubli", zones: ["Hubli city"] },
  { code: "HJR", name: "Khajuraho", zones: ["Khajuraho", "Western Group of Temples"] },
  { code: "HRD", name: "Haridwar", zones: ["Har Ki Pauri", "Haridwar city"] },
  { code: "HYD", name: "Hyderabad", zones: ["Banjara Hills", "Hitech City", "Secunderabad", "Gachibowli", "Jubilee Hills", "Charminar"] },
  { code: "IDR", name: "Indore", zones: ["Indore", "Vijay Nagar", "Rajwada"] },
  { code: "IMF", name: "Imphal", zones: ["Imphal city"] },
  { code: "IXA", name: "Agartala", zones: ["Agartala city"] },
  { code: "IXB", name: "Bagdogra", zones: ["Siliguri", "Bagdogra"] },
  { code: "IXC", name: "Chandigarh", zones: ["Sector 17", "Sector 35", "Chandigarh"] },
  { code: "IXD", name: "Allahabad", zones: ["Prayagraj", "Civil Lines", "Sangam"] },
  { code: "IXE", name: "Mangalore", zones: ["Mangalore city"] },
  { code: "IXJ", name: "Jammu", zones: ["Jammu city", "Vaishno Devi"] },
  { code: "IXL", name: "Leh", zones: ["Leh city", "Ladakh", "Pangong Lake"] },
  { code: "IXM", name: "Madurai", zones: ["Madurai city", "Meenakshi Temple"] },
  { code: "IXR", name: "Ranchi", zones: ["Ranchi city"] },
  { code: "IXS", name: "Silchar", zones: ["Silchar city"] },
  { code: "IXU", name: "Aurangabad", zones: ["Aurangabad city", "Ajanta", "Ellora"] },
  { code: "IXZ", name: "Port Blair", zones: ["Port Blair", "Andaman Islands", "Havelock Island", "Neil Island"] },
  { code: "JAI", name: "Jaipur", zones: ["MI Road", "C-Scheme", "Vaishali Nagar", "Malviya Nagar", "Pink City", "Amer Fort"] },
  { code: "JBP", name: "Jabalpur", zones: ["Jabalpur city", "Bhedaghat"] },
  { code: "JDH", name: "Jodhpur", zones: ["Jodhpur city", "Blue City", "Mehrangarh Fort"] },
  { code: "JGA", name: "Jamnagar", zones: ["Jamnagar city"] },
  { code: "JLR", name: "Jalandhar", zones: ["Jalandhar city"] },
  { code: "JRH", name: "Jorhat", zones: ["Jorhat city", "Majuli Island"] },
  { code: "JSA", name: "Jaisalmer", zones: ["Jaisalmer city", "Sam Sand Dunes", "Jaisalmer Fort"] },
  { code: "KAS", name: "Kashmir", zones: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"] },
  { code: "KLH", name: "Kullu", zones: ["Kullu city", "Manali", "Solang Valley"] },
  { code: "KNU", name: "Kanpur", zones: ["Kanpur city"] },
  { code: "KTU", name: "Katra", zones: ["Vaishno Devi", "Katra city"] },
  { code: "KUU", name: "Kullu", zones: ["Kullu", "Manali", "Solang Valley", "Rohtang"] },
  { code: "KVL", name: "Kovalam", zones: ["Kovalam Beach", "Lighthouse Beach"] },
  { code: "LAD", name: "Ladakh", zones: ["Leh", "Nubra Valley", "Pangong Lake", "Khardung La"] },
  { code: "LKO", name: "Lucknow", zones: ["Hazratganj", "Gomti Nagar", "Lucknow city", "Chowk"] },
  { code: "LNL", name: "Lonavala", zones: ["Lonavala", "Khandala", "Tiger Point"] },
  { code: "MAA", name: "Chennai", zones: ["T Nagar", "Anna Nagar", "Adyar", "Marina Beach", "Mylapore", "OMR"] },
  { code: "MCL", name: "McLeodganj", zones: ["McLeod Ganj", "Bhagsu", "Dharamkot"] },
  { code: "MHB", name: "Mahabaleshwar", zones: ["Mahabaleshwar", "Panchgani"] },
  { code: "MNL", name: "Manali", zones: ["Mall Road", "Old Manali", "Solang Valley", "Rohtang"] },
  { code: "MRT", name: "Mount Abu", zones: ["Mount Abu", "Dilwara Temples", "Nakki Lake"] },
  { code: "MSR", name: "Mysore", zones: ["Mysore city", "Mysore Palace"] },
  { code: "MSS", name: "Mussoorie", zones: ["Mall Road", "Kempty Falls", "Mussoorie city"] },
  { code: "MTH", name: "Mathura", zones: ["Mathura city", "Vrindavan"] },
  { code: "MUN", name: "Munnar", zones: ["Munnar town", "Tea Gardens", "Eravikulam"] },
  { code: "MYQ", name: "Mysuru", zones: ["Mysuru city", "Mysore Palace", "Chamundi Hills"] },
  { code: "NAG", name: "Nagpur", zones: ["Nagpur city", "Sitabuldi"] },
  { code: "NDL", name: "Nainital", zones: ["Mall Road", "Naini Lake", "Nainital city"] },
  { code: "OOT", name: "Ooty", zones: ["Ooty city", "Botanical Gardens", "Ooty Lake", "Coonoor"] },
  { code: "PAB", name: "Bilaspur", zones: ["Bilaspur city"] },
  { code: "PAT", name: "Patna", zones: ["Patna city", "Gandhi Maidan"] },
  { code: "PBD", name: "Porbandar", zones: ["Porbandar city"] },
  { code: "PGH", name: "Pantnagar", zones: ["Pantnagar city"] },
  { code: "PNQ", name: "Pune", zones: ["Koregaon Park", "Camp", "Hinjewadi", "Deccan", "Shivaji Nagar", "FC Road"] },
  { code: "PNY", name: "Pondicherry", zones: ["White Town", "Auroville", "Promenade Beach", "Rock Beach"] },
  { code: "PUT", name: "Thiruvananthapuram", zones: ["Kovalam", "Trivandrum city", "Technopark"] },
  { code: "RAJ", name: "Rajkot", zones: ["Rajkot city"] },
  { code: "RDP", name: "Rajahmundry", zones: ["Rajahmundry city"] },
  { code: "RJA", name: "Rajahmundry", zones: ["Rajahmundry city"] },
  { code: "RNT", name: "Ranthambore", zones: ["Ranthambore National Park", "Sawai Madhopur"] },
  { code: "RPR", name: "Raipur", zones: ["Raipur city"] },
  { code: "RSG", name: "Rishikesh", zones: ["Lakshman Jhula", "Ram Jhula", "Rishikesh city", "Triveni Ghat"] },
  { code: "SHL", name: "Shillong", zones: ["Shillong city", "Police Bazaar", "Elephant Falls"] },
  { code: "SIK", name: "Sikkim", zones: ["Gangtok", "Pelling", "Lachung", "MG Marg", "Tsomgo Lake"] },
  { code: "SLV", name: "Shimla", zones: ["Mall Road", "Ridge", "Shimla city", "Kufri"] },
  { code: "SPT", name: "Spiti Valley", zones: ["Kaza", "Key Monastery", "Spiti", "Chandratal"] },
  { code: "STV", name: "Surat", zones: ["Surat city", "Athwa Gate", "Dumas Beach"] },
  { code: "SXR", name: "Srinagar", zones: ["Dal Lake", "Lal Chowk", "Gulmarg", "Pahalgam", "Houseboats"] },
  { code: "THK", name: "Thekkady", zones: ["Periyar National Park", "Thekkady"] },
  { code: "TIR", name: "Tirupati", zones: ["Tirumala", "Tirupati city"] },
  { code: "TRV", name: "Thiruvananthapuram", zones: ["Kovalam", "Trivandrum"] },
  { code: "TRZ", name: "Tiruchirappalli", zones: ["Trichy city", "Rock Fort Temple"] },
  { code: "UDR", name: "Udaipur", zones: ["City Palace", "Lake Pichola", "Udaipur city", "Fateh Sagar"] },
  { code: "VGA", name: "Vijayawada", zones: ["Vijayawada city"] },
  { code: "VNS", name: "Varanasi", zones: ["Dashashwamedh Ghat", "Assi Ghat", "Varanasi city", "Sarnath"] },
  { code: "VTZ", name: "Visakhapatnam", zones: ["RK Beach", "Vizag city", "Rushikonda"] },
  { code: "WAY", name: "Wayanad", zones: ["Wayanad", "Vythiri", "Banasura Sagar Dam"] },
  // Additional popular destinations
  { code: "CRG", name: "Coorg", zones: ["Madikeri", "Abbey Falls", "Coorg"] },
  { code: "HMP", name: "Hampi", zones: ["Hampi ruins", "Virupaksha Temple", "Hampi"] },
];

// Pre-computed city names for quick lookup
export const CITY_NAMES: string[] = INDIAN_CITIES.map(city => city.name);

// Flattened zones with parent city reference for zone search
export const ALL_ZONES: { zone: string; city: string; code: string }[] = INDIAN_CITIES.flatMap(
  city => city.zones.map(zone => ({ zone, city: city.name, code: city.code }))
);

/**
 * Fast in-memory search function for location suggestions
 * Professional character-wise search with smart scoring
 *
 * Features:
 * - Instant suggestions on every keystroke (no minimum characters)
 * - Prefix matching scores higher than contains
 * - Word boundary matching for better relevance
 * - Removes duplicate results
 * - Case-insensitive search
 *
 * @param query - Search query string
 * @param limit - Maximum number of results (default: 8)
 * @returns Array of SearchResult sorted by match score
 */
export function searchLocations(query: string, limit: number = 8): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  const seen = new Set<string>(); // Track duplicates
  
  // Search cities first (higher priority)
  for (const city of INDIAN_CITIES) {
    const cityNameLower = city.name.toLowerCase();
    let matchScore = 0;
    
    // Exact match gets highest score (200)
    if (cityNameLower === normalizedQuery) {
      matchScore = 200;
    }
    // Prefix match at word start (150)
    else if (cityNameLower.startsWith(normalizedQuery)) {
      matchScore = 150 + (normalizedQuery.length / cityNameLower.length) * 50;
    }
    // Word boundary match (120)
    else if (cityNameLower.includes(' ' + normalizedQuery)) {
      matchScore = 120 + (normalizedQuery.length / cityNameLower.length) * 30;
    }
    // Contains match (70)
    else if (cityNameLower.includes(normalizedQuery)) {
      matchScore = 70 + (normalizedQuery.length / cityNameLower.length) * 20;
    }
    
    // Add city result if matched
    if (matchScore > 0) {
      const resultKey = `city-${city.code}`;
      if (!seen.has(resultKey)) {
        results.push({
          name: city.name,
          code: city.code,
          type: 'city',
          matchScore
        });
        seen.add(resultKey);
      }
    }
    
    // Search zones within the city
    for (const zone of city.zones) {
      const zoneLower = zone.toLowerCase();
      
      // Skip if zone name is same as city name (avoid duplicates)
      if (zoneLower === cityNameLower) continue;
      
      let zoneScore = 0;
      
      // Exact match
      if (zoneLower === normalizedQuery) {
        zoneScore = 180;
      }
      // Prefix match
      else if (zoneLower.startsWith(normalizedQuery)) {
        zoneScore = 120 + (normalizedQuery.length / zoneLower.length) * 40;
      }
      // Word boundary match
      else if (zoneLower.includes(' ' + normalizedQuery)) {
        zoneScore = 100 + (normalizedQuery.length / zoneLower.length) * 30;
      }
      // Contains match
      else if (zoneLower.includes(normalizedQuery)) {
        zoneScore = 60 + (normalizedQuery.length / zoneLower.length) * 20;
      }
      
      // Add zone result if matched
      if (zoneScore > 0) {
        const resultKey = `zone-${city.code}-${zoneLower}`;
        if (!seen.has(resultKey)) {
          results.push({
            name: zone,
            code: city.code,
            type: 'zone',
            parentCity: city.name,
            matchScore: zoneScore
          });
          seen.add(resultKey);
        }
      }
    }
  }
  
  // Sort by match score (highest first), then alphabetically
  return results
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

/**
 * Get city by code
 */
export function getCityByCode(code: string): IndianCity | undefined {
  return INDIAN_CITIES.find(city => city.code === code);
}

/**
 * Get city by name (case-insensitive)
 */
export function getCityByName(name: string): IndianCity | undefined {
  const normalizedName = name.toLowerCase();
  return INDIAN_CITIES.find(city => city.name.toLowerCase() === normalizedName);
}

// Popular Indian destinations for quick selection
export const POPULAR_INDIAN_DESTINATIONS = [
  { name: "Goa", code: "GOI", type: "beach" as const, popular: true, trending: true },
  { name: "Manali", code: "MNL", type: "mountain" as const, popular: true, trending: false },
  { name: "Jaipur", code: "JAI", type: "cultural" as const, popular: true, trending: false },
  { name: "Kerala", code: "COK", type: "nature" as const, popular: true, trending: true },
  { name: "Udaipur", code: "UDR", type: "cultural" as const, popular: true, trending: false },
  { name: "Rishikesh", code: "RSG", type: "adventure" as const, popular: true, trending: true },
  { name: "Varanasi", code: "VNS", type: "cultural" as const, popular: true, trending: false },
  { name: "Shimla", code: "SLV", type: "mountain" as const, popular: true, trending: false },
  { name: "Darjeeling", code: "DRJ", type: "mountain" as const, popular: false, trending: true },
  { name: "Ladakh", code: "LAD", type: "adventure" as const, popular: false, trending: true },
  { name: "Mumbai", code: "BOM", type: "city" as const, popular: true, trending: false },
  { name: "Delhi", code: "DEL", type: "city" as const, popular: true, trending: false },
];

export type DestinationType = 'beach' | 'mountain' | 'cultural' | 'nature' | 'adventure' | 'city';

