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
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
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
};

// Default itinerary structure for trips without detailed data
export const getDefaultItinerary = (trip: Trip, whatsappNumber: string) => ({
  images: [trip.image],
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
});
