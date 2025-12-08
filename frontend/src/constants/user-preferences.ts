export interface OnboardingQuestion {
  id: string;
  step: number;
  title: string;
  description?: string;
  fields: OnboardingField[];
  allowSkip: boolean;
}

export interface OnboardingField {
  id: string;
  label: string;
  type: "single" | "multiple" | "text" | "number";
  required: boolean;
  options?: OnboardingOption[];
  placeholder?: string;
}

export interface OnboardingOption {
  id: string;
  label: string;
  value: string;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: "basic-traveler-identity",
    step: 1,
    title: "Basic Traveler Identity",
    description: "Tell us what kind of traveler you are",
    allowSkip: true,
    fields: [
      {
        id: "travel_type",
        label: "Travel Type",
        type: "single",
        required: true,
        options: [
          { id: "solo", label: "Solo Traveler", value: "solo" },
          { id: "group", label: "Group Traveler", value: "group" },
          { id: "family", label: "Family Traveler", value: "family" },
          { id: "backpacker", label: "Backpacker", value: "backpacker" },
          { id: "luxury", label: "Luxury Traveller", value: "luxury" },
          { id: "corporate", label: "Corporate Traveller", value: "corporate" },
        ],
      },
      {
        id: "travel_frequency",
        label: "Travel Frequency",
        type: "single",
        required: true,
        options: [
          { id: "1-2", label: "1–2 trips/year", value: "1-2" },
          { id: "3-5", label: "3–5 trips/year", value: "3-5" },
          { id: "6-10", label: "6–10 trips/year", value: "6-10" },
          { id: "monthly", label: "Monthly traveller", value: "monthly" },
        ],
      },
      {
        id: "budget_comfort_range",
        label: "Budget Comfort Range",
        type: "single",
        required: true,
        options: [
          { id: "budget", label: "Budget", value: "budget" },
          { id: "mid-range", label: "Mid-range", value: "mid-range" },
          { id: "premium", label: "Premium", value: "premium" },
          { id: "ultra-luxury", label: "Ultra Luxury", value: "ultra-luxury" },
        ],
      },
    ],
  },
  {
    id: "preferences",
    step: 2,
    title: "Travel Preferences",
    description: "What activities and destinations do you enjoy? (Select all that apply)",
    allowSkip: true,
    fields: [
      {
        id: "activities",
        label: "Activities",
        type: "multiple",
        required: false,
        options: [
          {
            id: "adventure",
            label: "Adventure (trekking, parasailing, rafting)",
            value: "adventure",
          },
          {
            id: "nature-relaxation",
            label: "Nature & Relaxation",
            value: "nature-relaxation",
          },
          {
            id: "cultural-heritage",
            label: "Cultural & Heritage",
            value: "cultural-heritage",
          },
          {
            id: "water-activities",
            label: "Water Activities / Beaches",
            value: "water-activities",
          },
          {
            id: "nightlife-parties",
            label: "Nightlife & Parties",
            value: "nightlife-parties",
          },
          {
            id: "wellness-spa",
            label: "Wellness & Spa",
            value: "wellness-spa",
          },
          {
            id: "road-trips",
            label: "Road Trips & Long Drives",
            value: "road-trips",
          },
          {
            id: "wildlife-safari",
            label: "Wildlife & Safari",
            value: "wildlife-safari",
          },
        ],
      },
      {
        id: "destinations",
        label: "Destinations",
        type: "multiple",
        required: false,
        options: [
          { id: "mountains", label: "Mountains", value: "mountains" },
          { id: "beaches", label: "Beaches", value: "beaches" },
          { id: "cities", label: "Cities", value: "cities" },
          { id: "desert", label: "Desert", value: "desert" },
          { id: "forest", label: "Forest", value: "forest" },
          {
            id: "international-asia",
            label: "International (Asia)",
            value: "international-asia",
          },
          {
            id: "international-europe",
            label: "International (Europe)",
            value: "international-europe",
          },
          {
            id: "international-middle-east",
            label: "International (Middle East)",
            value: "international-middle-east",
          },
        ],
      },
    ],
  },
  {
    id: "travel-companions-goals",
    step: 3,
    title: "Travel Companions & Goals",
    description: "Who do you travel with and what are your travel goals? (Select all that apply)",
    allowSkip: true,
    fields: [
      {
        id: "companions",
        label: "Travel Companions",
        type: "multiple",
        required: false,
        options: [
          { id: "solo", label: "Solo", value: "solo" },
          { id: "friends", label: "Friends", value: "friends" },
          { id: "couples", label: "Couples", value: "couples" },
          {
            id: "family-kids",
            label: "Family (Kids)",
            value: "family-kids",
          },
          {
            id: "family-parents",
            label: "Family (Parents)",
            value: "family-parents",
          },
          { id: "office-team", label: "Office Team", value: "office-team" },
          { id: "custom-group", label: "Custom Group", value: "custom-group" },
        ],
      },
      {
        id: "goals",
        label: "Travel Goals",
        type: "multiple",
        required: false,
        options: [
          {
            id: "explore-new",
            label: "Explore new destinations",
            value: "explore-new",
          },
          {
            id: "relax-unwind",
            label: "Relax & unwind",
            value: "relax-unwind",
          },
          {
            id: "bucket-list",
            label: "Complete bucket list",
            value: "bucket-list",
          },
          {
            id: "events-festivals",
            label: "Attend events/festivals",
            value: "events-festivals",
          },
          {
            id: "adventure-sports",
            label: "Do adventure sports",
            value: "adventure-sports",
          },
        ],
      },
    ],
  },
];

export const SKIP_STORAGE_KEY = "trippyway_onboarding_skip";
export const SKIP_EXPIRY_HOURS = 48;
export const COMPLETED_STORAGE_KEY = "trippyway_onboarding_completed";

export interface UserPreferencesData {
  travel_type?: string;
  travel_frequency?: string;
  budget_comfort_range?: string;
  activities?: string[];
  destinations?: string[];
  companions?: string[];
  goals?: string[];
}
