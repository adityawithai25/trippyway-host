"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  ONBOARDING_QUESTIONS,
  SKIP_STORAGE_KEY,
  SKIP_EXPIRY_HOURS,
  COMPLETED_STORAGE_KEY,
  type UserPreferencesData,
  type OnboardingQuestion,
} from "@/constants/user-preferences";
import {
  getUserPreferences,
  hasCompletedOnboarding,
  updateOnboardingStep,
} from "@/actions/user-preferences";
import {
  Sparkles,
  User,
  Heart,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Plane,
  Mountain,
  Palmtree,
  Building2,
  TreePine,
  Globe,
  Waves,
  Tent,
  Compass,
  PartyPopper,
  Dumbbell,
  Car,
  Camera,
  Briefcase,
  Crown,
  Backpack,
  UsersRound,
  Baby,
  CalendarDays,
  Target,
  Sparkle,
  Clock,
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface SkipData {
  timestamp: number;
  expiry: number;
}

interface CompletedData {
  userId: string;
  completedAt: number;
}

// Icon mapping for options
const OPTION_ICONS: Record<string, React.ReactNode> = {
  // Travel types
  solo: <User className="w-4 h-4" />,
  group: <Users className="w-4 h-4" />,
  family: <UsersRound className="w-4 h-4" />,
  backpacker: <Backpack className="w-4 h-4" />,
  luxury: <Crown className="w-4 h-4" />,
  corporate: <Briefcase className="w-4 h-4" />,
  // Frequencies
  "1-2": <CalendarDays className="w-4 h-4" />,
  "3-5": <CalendarDays className="w-4 h-4" />,
  "6-10": <CalendarDays className="w-4 h-4" />,
  monthly: <Clock className="w-4 h-4" />,
  // Budget
  budget: <Tent className="w-4 h-4" />,
  "mid-range": <Building2 className="w-4 h-4" />,
  premium: <Sparkle className="w-4 h-4" />,
  "ultra-luxury": <Crown className="w-4 h-4" />,
  // Activities
  adventure: <Mountain className="w-4 h-4" />,
  "nature-relaxation": <TreePine className="w-4 h-4" />,
  "cultural-heritage": <Building2 className="w-4 h-4" />,
  "water-activities": <Waves className="w-4 h-4" />,
  "nightlife-parties": <PartyPopper className="w-4 h-4" />,
  "wellness-spa": <Dumbbell className="w-4 h-4" />,
  "road-trips": <Car className="w-4 h-4" />,
  "wildlife-safari": <Camera className="w-4 h-4" />,
  // Destinations
  mountains: <Mountain className="w-4 h-4" />,
  beaches: <Palmtree className="w-4 h-4" />,
  cities: <Building2 className="w-4 h-4" />,
  desert: <Compass className="w-4 h-4" />,
  forest: <TreePine className="w-4 h-4" />,
  "international-asia": <Globe className="w-4 h-4" />,
  "international-europe": <Globe className="w-4 h-4" />,
  "international-middle-east": <Globe className="w-4 h-4" />,
  // Companions
  friends: <Users className="w-4 h-4" />,
  couples: <Heart className="w-4 h-4" />,
  "family-kids": <Baby className="w-4 h-4" />,
  "family-parents": <UsersRound className="w-4 h-4" />,
  "office-team": <Briefcase className="w-4 h-4" />,
  "custom-group": <Users className="w-4 h-4" />,
  // Goals
  "explore-new": <Compass className="w-4 h-4" />,
  "relax-unwind": <Palmtree className="w-4 h-4" />,
  "bucket-list": <Target className="w-4 h-4" />,
  "events-festivals": <PartyPopper className="w-4 h-4" />,
  "adventure-sports": <Mountain className="w-4 h-4" />,
};

const STEP_ICONS = [
  <User key="step1" className="w-5 h-5" />,
  <Heart key="step2" className="w-5 h-5" />,
  <Users key="step3" className="w-5 h-5" />,
];

export function OnboardingDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  const [formData, setFormData] = useState<Partial<UserPreferencesData>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check onboarding status function
  const checkOnboardingStatus = useCallback(async (authUser: SupabaseUser) => {
    try {
      setCurrentUser(authUser);

      // First, check localStorage for completed status (per user)
      const completedData = localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (completedData) {
        try {
          const parsed: CompletedData = JSON.parse(completedData);
          // Check if this is the same user who completed onboarding
          if (parsed.userId === authUser.id) {
            console.log("Onboarding already completed for this user");
            setIsLoading(false);
            return;
          }
        } catch {
          // Invalid data, remove it
          localStorage.removeItem(COMPLETED_STORAGE_KEY);
        }
      }

      // Check localStorage for skip status
      const skipData = localStorage.getItem(SKIP_STORAGE_KEY);
      if (skipData) {
        try {
          const parsed: SkipData = JSON.parse(skipData);
          const now = Date.now();
          if (now < parsed.expiry) {
            // Still within skip period
            setIsLoading(false);
            return;
          } else {
            // Skip expired, remove it
            localStorage.removeItem(SKIP_STORAGE_KEY);
          }
        } catch {
          localStorage.removeItem(SKIP_STORAGE_KEY);
        }
      }

      // Try to check if user has completed onboarding in the database
      let completed = false;
      try {
        completed = await hasCompletedOnboarding();
        // If completed in database, also save to localStorage for faster future checks
        if (completed) {
          const completedInfo: CompletedData = {
            userId: authUser.id,
            completedAt: Date.now(),
          };
          localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedInfo));
        }
      } catch (error) {
        console.warn("Could not check onboarding status from database:", error);
        // If we can't check database, we'll still show the dialog if localStorage doesn't have completed status
        completed = false;
      }
      
      if (completed) {
        setIsLoading(false);
        return;
      }

      // Try to load existing preferences if any
      try {
        const preferences = await getUserPreferences();
        if (preferences.success && preferences.data) {
          setFormData(preferences.data);
        }
      } catch (error) {
        console.warn("Could not load existing preferences:", error);
        // Continue without existing preferences
      }

      // Reset to first step when opening
      setCurrentStep(0);
      
      // Show dialog if user hasn't completed onboarding and hasn't skipped
      setIsOpen(true);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      // On error, don't show dialog to avoid annoying user
      setIsLoading(false);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const supabase = createClient();
    
    // Initial check
    const initialCheck = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        await checkOnboardingStatus(authUser);
      } else {
        setIsLoading(false);
      }
    };

    initialCheck();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === "SIGNED_IN" && session?.user) {
        // User just signed in - check onboarding status
        setIsLoading(true);
        await checkOnboardingStatus(session.user);
      } else if (event === "SIGNED_OUT") {
        // User signed out - close dialog and reset
        setIsOpen(false);
        setCurrentUser(null);
        setFormData({});
        setCurrentStep(0);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [checkOnboardingStatus]);

  const handleRemindMeLater = useCallback(() => {
    const now = Date.now();
    const expiry = now + SKIP_EXPIRY_HOURS * 60 * 60 * 1000;
    const skipData: SkipData = {
      timestamp: now,
      expiry,
    };
    localStorage.setItem(SKIP_STORAGE_KEY, JSON.stringify(skipData));
    setIsOpen(false);
  }, []);

  const handleFieldChange = useCallback(
    (fieldId: string, value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    },
    []
  );

  const handleStepComplete = useCallback(
    async (stepIndex: number) => {
      const question = ONBOARDING_QUESTIONS[stepIndex];
      if (!question) return;

      const stepData: Partial<UserPreferencesData> = {};

      question.fields.forEach((field) => {
        const fieldKey = field.id as keyof UserPreferencesData;
        const value = formData[fieldKey];
        if (value !== undefined && value !== null && value !== "") {
          if (Array.isArray(value) && value.length > 0) {
            (stepData as Record<string, string[] | string>)[fieldKey] = value;
          } else if (!Array.isArray(value)) {
            (stepData as Record<string, string[] | string>)[fieldKey] = value;
          }
        }
      });

      if (Object.keys(stepData).length > 0) {
        try {
          await updateOnboardingStep(stepIndex + 1, stepData);
        } catch (error) {
          console.error("Error saving step:", error);
        }
      }
    },
    [formData]
  );

  const handleNext = useCallback(async () => {
    setIsAnimating(true);
    await handleStepComplete(currentStep);
    
    setTimeout(() => {
      if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
      setIsAnimating(false);
    }, 150);
  }, [currentStep, handleStepComplete]);

  const handlePrevious = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
      setIsAnimating(false);
    }, 150);
  }, [currentStep]);

  const handleFinish = useCallback(async () => {
    await handleStepComplete(currentStep);
    
    // Mark onboarding as completed in localStorage for this user
    if (currentUser) {
      const completedInfo: CompletedData = {
        userId: currentUser.id,
        completedAt: Date.now(),
      };
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedInfo));
      console.log("Onboarding completed and saved for user:", currentUser.id);
    }
    
    setIsOpen(false);
  }, [currentStep, handleStepComplete, currentUser]);

  const handleClose = useCallback(async () => {
    for (let i = 0; i <= currentStep; i++) {
      await handleStepComplete(i);
    }
    setIsOpen(false);
  }, [currentStep, handleStepComplete]);

  if (isLoading || !isOpen) {
    return null;
  }

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === ONBOARDING_QUESTIONS.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-xl bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 rounded-2xl shadow-2xl pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20 blur-xl -z-10" />
          
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {ONBOARDING_QUESTIONS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index <= currentStep) {
                      setCurrentStep(index);
                    }
                  }}
                  disabled={index > currentStep}
                  className={cn(
                    "flex items-center justify-center transition-all duration-300",
                    index === currentStep
                      ? "w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                      : index < currentStep
                      ? "w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:scale-105"
                      : "w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400"
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    STEP_ICONS[index]
                  )}
                </button>
              ))}
            </div>

            {/* Title section */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Step {currentStep + 1} of {ONBOARDING_QUESTIONS.length}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentQuestion.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                {isFirstStep
                  ? "Help us create a better experience for your next travel adventure!"
                  : currentQuestion.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              "px-6 py-4 max-h-[45vh] overflow-y-auto transition-all duration-300",
              isAnimating && "opacity-0 translate-y-2"
            )}
          >
            <div className="space-y-6">
              {currentQuestion.fields.map((field) => (
                <FieldRenderer
                  key={field.id}
                  field={field}
                  value={formData[field.id as keyof UserPreferencesData]}
                  onChange={(value) => handleFieldChange(field.id, value)}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                {isFirstStep && (
                  <button
                    onClick={handleRemindMeLater}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Remind me later
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                {isLastStep ? (
                  <Button
                    onClick={handleFinish}
                    className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg shadow-emerald-500/30"
                  >
                    <Plane className="w-4 h-4" />
                    Start Exploring
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg shadow-emerald-500/30"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface FieldRendererProps {
  field: OnboardingQuestion["fields"][0];
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}

function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  if (field.type === "single" && field.options) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {field.label}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {field.options.map((option) => {
            const isSelected = value === option.value;
            const icon = OPTION_ICONS[option.value];
            return (
              <button
                key={option.id}
                onClick={() => onChange(option.value)}
                className={cn(
                  "group relative flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left",
                  isSelected
                    ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 shadow-md shadow-emerald-500/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                    isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600"
                  )}
                >
                  {icon || <Sparkle className="w-4 h-4" />}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors flex-1",
                    isSelected
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "multiple" && field.options) {
    const selectedValues = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          {selectedValues.length > 0 && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
              {selectedValues.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const icon = OPTION_ICONS[option.value];
            return (
              <button
                key={option.id}
                onClick={() => {
                  if (isSelected) {
                    onChange(selectedValues.filter((v) => v !== option.value));
                  } else {
                    onChange([...selectedValues, option.value]);
                  }
                }}
                className={cn(
                  "group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200",
                  isSelected
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                )}
              >
                <span
                  className={cn(
                    "transition-colors",
                    isSelected
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-emerald-500"
                  )}
                >
                  {icon || <Sparkle className="w-4 h-4" />}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">
                  {option.label}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-white ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
