import {
  Bus,
  Home,
  Sparkles,
  Utensils,
  Coffee,
  Camera,
  MapPin,
  Clock,
  Users,
  Wifi,
  Car,
  Snowflake,
  Briefcase,
  BedDouble,
  Backpack,
  Plane,
  Ship,
  ShieldCheck,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { Trip } from "./trip-data";
import { ACTIVITY_IMAGES } from "./authentic-images";
import {
  LOCAL_ACTIVITY_IMAGES,
  LOCAL_DESTINATION_IMAGES,
  getPackageGalleryImages,
} from "./local-images";

// Icon mapping for activity types
export const activityIconMap: Record<string, React.ElementType> = {
  bus: Bus,
  home: Home,
  sparkles: Sparkles,
  utensils: Utensils,
  coffee: Coffee,
  camera: Camera,
  mapPin: MapPin,
  clock: Clock,
  users: Users,
};

export const getActivityIcon = (iconName: string) => {
  return activityIconMap[iconName] || MapPin;
};

// Icon mapping for inclusions/exclusions
export const featureIconMap: Array<{
  keywords: string[];
  icon: React.ElementType;
}> = [
  { keywords: ["wifi", "internet"], icon: Wifi },
  { keywords: ["parking", "vehicle"], icon: Car },
  { keywords: ["air conditioning", "ac", "climate"], icon: Snowflake },
  { keywords: ["workspace", "workation", "work"], icon: Briefcase },
  {
    keywords: ["meals", "breakfast", "lunch", "dinner", "food"],
    icon: Utensils,
  },
  {
    keywords: ["stay", "accommodation", "hotel", "homestay", "resort", "camp"],
    icon: BedDouble,
  },
  { keywords: ["guide", "coordinator", "host", "expert"], icon: Users },
  {
    keywords: ["transport", "coach", "bus", "ferry", "cab", "transfer"],
    icon: Bus,
  },
  { keywords: ["insurance", "safety"], icon: ShieldCheck },
  {
    keywords: ["adventure", "activities", "zip", "rafting", "trek"],
    icon: Sparkles,
  },
  { keywords: ["luggage", "bag"], icon: Backpack },
  { keywords: ["flight"], icon: Plane },
  { keywords: ["boat", "cruise", "ferry"], icon: Ship },
];

export const getFeatureIcon = (
  feature: string,
  type: "included" | "excluded"
) => {
  const lower = feature.toLowerCase();
  const match = featureIconMap.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword))
  );
  if (match) return match.icon;
  return type === "included" ? CheckCircle2 : Ban;
};

// Detailed itinerary data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const detailedItineraries: Record<string, any> = {
  "wt-del-001": {
    images: [
      LOCAL_DESTINATION_IMAGES.highAltitude.panoramic,
      LOCAL_DESTINATION_IMAGES.manali.valleyView,
      LOCAL_ACTIVITY_IMAGES.valley[0],
      LOCAL_ACTIVITY_IMAGES.mountains[0],
      LOCAL_ACTIVITY_IMAGES.camping[0],
    ],
    description:
      "Experience the adventure capital of India with river rafting, camping under the stars, and exploring the serene beauty of Rishikesh. This weekend getaway is perfect for those seeking thrill and spiritual connection.",
    itinerary: [
      {
        day: "Day 1",
        title: "Journey Begins - Delhi to Rishikesh",
        activities: [
          {
            time: "08:00 AM",
            title: "Departure from Delhi",
            description:
              "Meet at Kashmere Gate Metro Station. Board comfortable AC coach.",
            icon: "bus",
          },
          {
            time: "02:00 PM",
            title: "Arrival & Check-in",
            description:
              "Reach Rishikesh, check into riverside camping site. Welcome drinks and orientation.",
            icon: "home",
          },
          {
            time: "04:00 PM",
            title: "River Rafting Adventure",
            description:
              "Experience thrilling 16km river rafting with professional instructors. All safety equipment provided.",
            icon: "sparkles",
            highlight: true,
          },
          {
            time: "07:00 PM",
            title: "Riverside Bonfire & Dinner",
            description:
              "Enjoy bonfire with music, followed by delicious dinner buffet.",
            icon: "utensils",
          },
          {
            time: "10:00 PM",
            title: "Stargazing & Rest",
            description:
              "Overnight stay in comfortable camps by the riverside.",
            icon: "home",
          },
        ],
      },
      {
        day: "Day 2",
        title: "Explore & Return",
        activities: [
          {
            time: "07:00 AM",
            title: "Sunrise Yoga Session",
            description: "Start your day with peaceful yoga by the Ganges.",
            icon: "coffee",
          },
          {
            time: "08:30 AM",
            title: "Breakfast",
            description:
              "Healthy breakfast spread with local and continental options.",
            icon: "utensils",
          },
          {
            time: "10:00 AM",
            title: "Cafe Hopping Tour",
            description:
              "Visit famous cafes like Beatles Cafe, Little Buddha Cafe, and German Bakery.",
            icon: "coffee",
            highlight: true,
          },
          {
            time: "01:00 PM",
            title: "Lunch & Check-out",
            description: "Lunch at a riverside cafe, check-out from camps.",
            icon: "utensils",
          },
          {
            time: "02:00 PM",
            title: "Laxman Jhula & Ram Jhula",
            description:
              "Photo stops at iconic suspension bridges and nearby temples.",
            icon: "camera",
          },
          {
            time: "04:00 PM",
            title: "Departure to Delhi",
            description:
              "Board the coach back to Delhi with memories to cherish.",
            icon: "bus",
          },
          {
            time: "08:00 PM",
            title: "Arrival in Delhi",
            description:
              "Reach Kashmere Gate Metro Station. Trip ends with happy faces!",
            icon: "mapPin",
          },
        ],
      },
    ],
    included: [
      {
        title: "AC Coach Transportation",
        description: "Comfortable AC coach for Delhi-Rishikesh-Delhi journey",
      },
      {
        title: "Riverside Camping Accommodation",
        description: "1 night stay in comfortable riverside camps",
      },
      {
        title: "All Meals",
        description: "1 Breakfast, 2 Lunches, and 1 Dinner included",
      },
      {
        title: "River Rafting with Safety Equipment",
        description: "16km rafting experience with all safety gear provided",
      },
      {
        title: "Bonfire & Music Evening",
        description: "Evening bonfire with music and entertainment",
      },
      {
        title: "Professional Guide & Coordinator",
        description: "Experienced guide throughout the trip",
      },
      {
        title: "First Aid Kit & Travel Insurance",
        description: "Basic medical support and travel coverage",
      },
    ],
    notIncluded: [
      {
        title: "Personal expenses & shopping",
        description: "Any personal purchases or shopping expenses",
      },
      {
        title: "Any monument entry fees",
        description: "Entry tickets to monuments or attractions",
      },
      {
        title: "Additional adventure activities",
        description: "Extra activities beyond the package itinerary",
      },
      {
        title: "Anything not mentioned in inclusions",
        description: "Any service or item not specifically listed above",
      },
    ],
    thingsToCarry: [
      "Comfortable clothes & shoes",
      "Sunscreen & sunglasses",
      "Personal medicines",
      "Camera & powerbank",
      "Valid ID proof",
      "Swimming costume for rafting",
    ],
  },
  
  // ========================================================================
  // HIMACHAL PRADESH PACKAGES - AUTHENTIC LOCAL IMAGES
  // ========================================================================
  
  "3d2n-dec22-couples": {
    images: [
      LOCAL_DESTINATION_IMAGES.manali.romantic,
      LOCAL_DESTINATION_IMAGES.manali.village,
      LOCAL_DESTINATION_IMAGES.manali.valleyView,
      LOCAL_DESTINATION_IMAGES.manali.winter,
      LOCAL_DESTINATION_IMAGES.manali.mountains,
    ],
    description:
      "Experience the magic of romance in snow-capped Manali. This carefully curated couples-only getaway includes candlelight dinners, private bonfires, cozy stays, and breathtaking mountain views perfect for creating unforgettable memories together.",
    itinerary: [
      {
        day: "Day 1",
        title: "Journey to Romance - Delhi to Manali",
        activities: [
          {
            time: "09:00 PM",
            title: "Departure from Delhi",
            description: "Board luxury Volvo bus from Kashmere Gate. Comfortable overnight journey with blankets and pillows provided.",
            icon: "bus",
          },
        ],
      },
      {
        day: "Day 2",
        title: "Romantic Mountain Adventures",
        activities: [
          {
            time: "10:00 AM",
            title: "Arrival & Check-in",
            description: "Reach Manali, check into romantic riverside resort. Welcome drinks and fresh mountain air greet you.",
            icon: "home",
          },
          {
            time: "12:00 PM",
            title: "Leisure Time & Lunch",
            description: "Freshen up and enjoy delicious lunch. Rest after the overnight journey.",
            icon: "utensils",
          },
          {
            time: "03:00 PM",
            title: "Romantic Solang Valley Visit",
            description: "Visit scenic Solang Valley for snow activities (if season permits). Enjoy ropeway rides and stunning valley views together.",
            icon: "sparkles",
            highlight: true,
          },
          {
            time: "07:00 PM",
            title: "Candlelight Dinner by the Riverside",
            description: "Private candlelight dinner setup by the river with soft music and mountain views. A truly romantic experience.",
            icon: "utensils",
            highlight: true,
          },
        ],
      },
      {
        day: "Day 3",
        title: "Local Exploration & Departure",
        activities: [
          {
            time: "08:00 AM",
            title: "Breakfast & Mall Road Shopping",
            description: "Hearty breakfast followed by shopping at Mall Road. Pick up local handicrafts and woolens.",
            icon: "coffee",
          },
          {
            time: "12:00 PM",
            title: "Check-out & Lunch",
            description: "Check-out from hotel and enjoy lunch before departure.",
            icon: "utensils",
          },
          {
            time: "02:00 PM",
            title: "Return Journey to Delhi",
            description: "Board Volvo for return journey with beautiful mountain memories.",
            icon: "bus",
          },
        ],
      },
    ],
    included: [
      { title: "Volvo Transportation", description: "Delhi-Manali-Delhi in luxury Volvo" },
      { title: "Resort Stay", description: "2 nights in romantic riverside resort" },
      { title: "All Meals", description: "2 Breakfasts, 2 Lunches, 1 Candlelight Dinner" },
      { title: "Solang Valley Trip", description: "Sightseeing with activities" },
      { title: "Couple Photography", description: "Professional couple photoshoot" },
      { title: "Travel Coordinator", description: "24/7 assistance throughout trip" },
    ],
    notIncluded: [
      { title: "Personal expenses", description: "Shopping, snacks, etc." },
      { title: "Adventure activities", description: "Paragliding, skiing charges extra" },
      { title: "Monument entries", description: "Temple and attraction fees" },
    ],
    thingsToCarry: [
      "Warm clothes & jackets",
      "Comfortable shoes",
      "Sunglasses & sunscreen",
      "Camera",
      "Valid ID proof",
      "Personal medicines",
    ],
  },

  "4d3n-dec28-girls": {
    images: [
      LOCAL_DESTINATION_IMAGES.kasol.houses,
      LOCAL_DESTINATION_IMAGES.kasol.valley,
      LOCAL_DESTINATION_IMAGES.kalpa.aerial,
      LOCAL_DESTINATION_IMAGES.manali.village,
      LOCAL_DESTINATION_IMAGES.kullu.spring,
    ],
    description:
      "Ring in the New Year with your girl gang in the magical valleys of Kasol and Manali! This all-girls trip includes safe accommodations, scenic hikes, cafe hopping, bonfire nights, and a special NYE celebration in the Himalayas.",
    itinerary: [
      {
        day: "Day 1",
        title: "Girls Gang Assembles",
        activities: [
          {
            time: "08:00 PM",
            title: "Departure from Delhi",
            description: "Meet your girl squad at departure point. Board comfortable Volvo for overnight journey.",
            icon: "bus",
          },
        ],
      },
      {
        day: "Day 2",
        title: "Kasol Vibes & Village Life",
        activities: [
          {
            time: "11:00 AM",
            title: "Arrival in Kasol",
            description: "Reach the hippie paradise of Kasol. Check into cozy riverside camps.",
            icon: "home",
          },
          {
            time: "02:00 PM",
            title: "Kasol Cafe Hopping",
            description: "Explore famous cafes like Evergreen, Jim Morrison, and German Bakery. Try Israeli cuisine!",
            icon: "coffee",
            highlight: true,
          },
          {
            time: "05:00 PM",
            title: "Parvati River Walk",
            description: "Evening walk along the beautiful Parvati River. Perfect photo opportunities!",
            icon: "camera",
          },
          {
            time: "08:00 PM",
            title: "Bonfire & Music Night",
            description: "Bonfire by the riverside with music, games, and girl talk!",
            icon: "sparkles",
          },
        ],
      },
      {
        day: "Day 3",
        title: "Manali Transfer & Exploration",
        activities: [
          {
            time: "09:00 AM",
            title: "Breakfast & Checkout",
            description: "Healthy breakfast and checkout from Kasol camps.",
            icon: "utensils",
          },
          {
            time: "11:00 AM",
            title: "Transfer to Manali",
            description: "Scenic drive to Manali with photo stops at beautiful viewpoints.",
            icon: "bus",
          },
          {
            time: "03:00 PM",
            title: "Mall Road & Shopping",
            description: "Check-in followed by Mall Road exploration and shopping spree!",
            icon: "camera",
            highlight: true,
          },
          {
            time: "07:00 PM",
            title: "Dinner & Rest",
            description: "Dinner at hotel followed by rest before NYE celebration.",
            icon: "utensils",
          },
        ],
      },
      {
        day: "Day 4",
        title: "New Year Celebration & Departure",
        activities: [
          {
            time: "08:00 AM",
            title: "Breakfast & Free Time",
            description: "Relaxed breakfast and free time for last-minute shopping.",
            icon: "coffee",
          },
          {
            time: "12:00 PM",
            title: "Lunch & Checkout",
            description: "Check out and enjoy lunch before departure.",
            icon: "utensils",
          },
          {
            time: "02:00 PM",
            title: "Return Journey",
            description: "Board Volvo for return with amazing memories and new friends!",
            icon: "bus",
          },
        ],
      },
    ],
    included: [
      { title: "Volvo Transportation", description: "Delhi-Kasol-Manali-Delhi round trip" },
      { title: "Safe Accommodation", description: "3 nights stay in verified properties" },
      { title: "All Meals", description: "3 Breakfasts, 3 Lunches, 3 Dinners" },
      { title: "Female Trip Coordinator", description: "Female coordinator for your safety" },
      { title: "Sightseeing", description: "All mentioned sightseeing included" },
      { title: "Bonfire Nights", description: "Special bonfire and music evenings" },
    ],
    notIncluded: [
      { title: "Personal expenses", description: "Shopping and personal purchases" },
      { title: "Extra adventure activities", description: "Activities beyond itinerary" },
      { title: "Entry fees", description: "Temple and monument entries" },
    ],
    thingsToCarry: [
      "Warm winter clothes",
      "Comfortable walking shoes",
      "Camera & powerbank",
      "Sunscreen & moisturizer",
      "Valid ID proof",
      "Personal medicines",
    ],
  },

  "3d2n-dec24-boys": {
    images: [
      LOCAL_DESTINATION_IMAGES.highAltitude.pass,
      LOCAL_DESTINATION_IMAGES.highAltitude.mountains,
      LOCAL_DESTINATION_IMAGES.highAltitude.panoramic,
      LOCAL_DESTINATION_IMAGES.manali.winter,
      LOCAL_DESTINATION_IMAGES.manali.panoramic,
    ],
    description:
      "The ultimate boys' adventure in the mountains! Experience snow activities, adventure sports, mountain treks, riverside camping, and pure brotherhood. This trip is packed with adrenaline and unforgettable memories.",
    itinerary: [
      {
        day: "Day 1",
        title: "Adventure Begins",
        activities: [
          {
            time: "09:00 PM",
            title: "Departure from Delhi",
            description: "Meet the squad at boarding point. Overnight journey in comfortable Volvo.",
            icon: "bus",
          },
        ],
      },
      {
        day: "Day 2",
        title: "Full Adventure Mode",
        activities: [
          {
            time: "10:00 AM",
            title: "Arrival & Quick Check-in",
            description: "Reach Manali, quick check-in and freshen up. No time to waste!",
            icon: "home",
          },
          {
            time: "11:30 AM",
            title: "Solang Valley Adventure",
            description: "Head straight to Solang Valley for paragliding, zorbing, and snow activities (season dependent).",
            icon: "sparkles",
            highlight: true,
          },
          {
            time: "04:00 PM",
            title: "Return & Leisure Time",
            description: "Back to hotel, rest and refresh after adventure activities.",
            icon: "home",
          },
          {
            time: "07:00 PM",
            title: "Dinner & Night Out",
            description: "Dinner followed by exploring local nightlife and cafes.",
            icon: "utensils",
          },
        ],
      },
      {
        day: "Day 3",
        title: "Explore & Return",
        activities: [
          {
            time: "08:00 AM",
            title: "Breakfast & Morning Trek",
            description: "Quick breakfast and short trek to nearby viewpoint for epic photos.",
            icon: "camera",
          },
          {
            time: "12:00 PM",
            title: "Mall Road & Lunch",
            description: "Shopping for souvenirs and lunch at local restaurants.",
            icon: "utensils",
          },
          {
            time: "02:00 PM",
            title: "Return Journey",
            description: "Board Volvo for return with stories to tell!",
            icon: "bus",
          },
        ],
      },
    ],
    included: [
      { title: "Volvo Transportation", description: "Delhi-Manali-Delhi round trip" },
      { title: "Hotel Stay", description: "2 nights accommodation" },
      { title: "Meals", description: "2 Breakfasts, 2 Lunches, 2 Dinners" },
      { title: "Solang Valley Trip", description: "Transport to Solang included" },
      { title: "Adventure Activities", description: "Basic activities included" },
      { title: "Trip Coordinator", description: "Male coordinator throughout" },
    ],
    notIncluded: [
      { title: "Personal expenses", description: "Shopping and extras" },
      { title: "Premium activities", description: "Paragliding, skiing paid separately" },
      { title: "Entry tickets", description: "Monument and attraction fees" },
    ],
    thingsToCarry: [
      "Heavy winter jacket",
      "Gloves & cap",
      "Trekking shoes",
      "Sunglasses",
      "Camera",
      "Valid ID",
    ],
  },

  "4d3n-dec27-mixed": {
    images: [
      LOCAL_DESTINATION_IMAGES.kasol.valley,
      LOCAL_DESTINATION_IMAGES.manali.valley,
      LOCAL_DESTINATION_IMAGES.kullu.spring,
      LOCAL_DESTINATION_IMAGES.manali.village,
      LOCAL_DESTINATION_IMAGES.kasol.mountains,
    ],
    description:
      "The perfect pre-New Year celebration combining the best of Manali and Kasol! Meet new people, party in the mountains, explore scenic valleys, try local food, and create amazing memories in mixed group settings.",
    itinerary: [
      {
        day: "Day 1",
        title: "Journey & Ice Breaking",
        activities: [
          {
            time: "08:00 PM",
            title: "Departure & Introduction",
            description: "Board Volvo from Delhi. Ice-breaking games and introductions during journey.",
            icon: "bus",
          },
        ],
      },
      {
        day: "Day 2",
        title: "Manali Arrival & Exploration",
        activities: [
          {
            time: "11:00 AM",
            title: "Manali Check-in",
            description: "Arrive in Manali, check into hotel and breakfast.",
            icon: "home",
          },
          {
            time: "02:00 PM",
            title: "Old Manali Exploration",
            description: "Explore Old Manali cafes, riverside walks, and local markets.",
            icon: "camera",
            highlight: true,
          },
          {
            time: "07:00 PM",
            title: "Group Dinner & Music",
            description: "Group dinner followed by music and bonfire night.",
            icon: "sparkles",
          },
        ],
      },
      {
        day: "Day 3",
        title: "Kasol Adventure",
        activities: [
          {
            time: "09:00 AM",
            title: "Kasol Transfer",
            description: "Morning drive to Kasol through scenic Kullu Valley.",
            icon: "bus",
          },
          {
            time: "12:00 PM",
            title: "Kasol Cafe Tour",
            description: "Famous cafe hopping and trying international cuisines.",
            icon: "coffee",
            highlight: true,
          },
          {
            time: "06:00 PM",
            title: "Return & Party Night",
            description: "Return to Manali for dinner and party celebration.",
            icon: "sparkles",
          },
        ],
      },
      {
        day: "Day 4",
        title: "Farewell & Departure",
        activities: [
          {
            time: "10:00 AM",
            title: "Breakfast & Free Time",
            description: "Relaxed breakfast and last-minute shopping.",
            icon: "coffee",
          },
          {
            time: "01:00 PM",
            title: "Lunch & Checkout",
            description: "Check out after lunch and exchange contact info.",
            icon: "utensils",
          },
          {
            time: "02:00 PM",
            title: "Return Journey",
            description: "Board Volvo with new friendships and memories!",
            icon: "bus",
          },
        ],
      },
    ],
    included: [
      { title: "Volvo Transportation", description: "Complete round trip from Delhi" },
      { title: "3 Nights Stay", description: "Comfortable hotels in Manali" },
      { title: "All Meals Included", description: "3 Breakfasts, 3 Lunches, 3 Dinners" },
      { title: "Kasol Day Trip", description: "Full day excursion to Kasol" },
      { title: "Bonfire Nights", description: "Music and bonfire evenings" },
      { title: "Trip Coordinator", description: "Experienced guide throughout" },
    ],
    notIncluded: [
      { title: "Personal expenses", description: "Shopping and personal items" },
      { title: "Extra activities", description: "Activities beyond package" },
      { title: "Monument fees", description: "Entry tickets if any" },
    ],
    thingsToCarry: [
      "Warm clothing",
      "Comfortable shoes",
      "Camera & chargers",
      "Sunscreen",
      "ID proof",
      "Medicines",
    ],
  },
};

// Default itinerary structure for trips without detailed data
export const getDefaultItinerary = (trip: Trip, whatsappNumber: string) => {
  // Get appropriate images based on trip location and category
  const galleryImages = getPackageGalleryImages(trip.location, trip.category);
  
  return {
    images: galleryImages.length > 0 ? galleryImages : [trip.image],
    description:
      trip.description ||
      `Experience an amazing ${trip.duration} getaway to ${trip.location}. This carefully curated package includes all essentials for a memorable weekend.`,
    whatsappNumber,
  itinerary: [
    {
      day: "Day 1",
      title: "Journey Begins",
      activities: [
        {
          time: trip.startDate,
          title: "Departure",
          description: `Start your adventure to ${trip.location}`,
          icon: "bus",
        },
        {
          time: "Evening",
          title: "Arrival & Activities",
          description: "Exciting activities await you",
          icon: "sparkles",
          highlight: true,
        },
      ],
    },
    {
      day: trip.packageType === "4D3N" ? "Day 2-3" : "Day 2",
      title: "Explore & Return",
      activities: [
        {
          time: "Morning",
          title: "Activities",
          description: "More adventures and exploration",
          icon: "camera",
        },
        {
          time: trip.endDate,
          title: "Return Journey",
          description: "Departure back with wonderful memories",
          icon: "bus",
        },
      ],
    },
  ],
  included: [
    {
      title: "Transport",
      description: "Comfortable transportation for the entire trip",
    },
    {
      title: "Accommodation",
      description: "Stay arrangements as per package type",
    },
    {
      title: "Meals",
      description: "All meals included during the trip",
    },
    {
      title: "Guide",
      description: "Professional guide for assistance",
    },
    {
      title: "Basic travel insurance",
      description: "Travel insurance coverage included",
    },
  ],
  notIncluded: [
    {
      title: "Personal expenses",
      description: "Any personal purchases or expenses",
    },
    {
      title: "Additional activities",
      description: "Extra activities beyond the package",
    },
    {
      title: "Shopping",
      description: "Shopping and personal purchases",
    },
  ],
  thingsToCarry: [
    "Comfortable clothes",
    "ID proof",
    "Camera",
    "Personal medicines",
  ],
};
};
