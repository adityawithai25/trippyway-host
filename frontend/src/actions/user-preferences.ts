"use server";

import { createClient } from "@/lib/supabase/server";
import { UserPreferencesData } from "@/constants/user-preferences";

/**
 * SQL Migration Script for user_preferences table
 *
 * Run this SQL in your Supabase SQL Editor to create the table and RLS policies:
 *
 * ```sql
 * -- Create user_preferences table
 * CREATE TABLE IF NOT EXISTS user_preferences (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 *   travel_type TEXT,
 *   travel_frequency TEXT,
 *   budget_comfort_range TEXT,
 *   activities JSONB DEFAULT '[]'::jsonb,
 *   destinations JSONB DEFAULT '[]'::jsonb,
 *   companions JSONB DEFAULT '[]'::jsonb,
 *   goals JSONB DEFAULT '[]'::jsonb,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
 *   UNIQUE(user_id)
 * );
 *
 * -- Create index on user_id for faster lookups
 * CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
 *
 * -- Enable Row Level Security
 * ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
 *
 * -- Policy: Users can read their own preferences
 * CREATE POLICY "Users can read their own preferences"
 *   ON user_preferences
 *   FOR SELECT
 *   USING (auth.uid() = user_id);
 *
 * -- Policy: Users can insert their own preferences
 * CREATE POLICY "Users can insert their own preferences"
 *   ON user_preferences
 *   FOR INSERT
 *   WITH CHECK (auth.uid() = user_id);
 *
 * -- Policy: Users can update their own preferences
 * CREATE POLICY "Users can update their own preferences"
 *   ON user_preferences
 *   FOR UPDATE
 *   USING (auth.uid() = user_id)
 *   WITH CHECK (auth.uid() = user_id);
 *
 * -- Policy: Users can delete their own preferences
 * CREATE POLICY "Users can delete their own preferences"
 *   ON user_preferences
 *   FOR DELETE
 *   USING (auth.uid() = user_id);
 *
 * -- Policy: Admins can do everything (assuming you have an admin role check)
 * -- Uncomment and modify if you have an admin role system
 * -- CREATE POLICY "Admins can manage all preferences"
 * --   ON user_preferences
 * --   FOR ALL
 * --   USING (
 * --     EXISTS (
 * --       SELECT 1 FROM user_roles
 * --       WHERE user_id = auth.uid() AND role = 'admin'
 * --     )
 * --   );
 *
 * -- Create function to update updated_at timestamp
 * CREATE OR REPLACE FUNCTION update_updated_at_column()
 * RETURNS TRIGGER AS $$
 * BEGIN
 *   NEW.updated_at = TIMEZONE('utc'::text, NOW());
 *   RETURN NEW;
 * END;
 * $$ LANGUAGE plpgsql;
 *
 * -- Create trigger to automatically update updated_at
 * DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
 * CREATE TRIGGER update_user_preferences_updated_at
 *   BEFORE UPDATE ON user_preferences
 *   FOR EACH ROW
 *   EXECUTE FUNCTION update_updated_at_column();
 * ```
 */

export interface UserPreferencesResponse {
  success: boolean;
  data?: UserPreferencesData;
  error?: string;
}

/**
 * Get user preferences for the current authenticated user
 */
export async function getUserPreferences(): Promise<UserPreferencesResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      // If no row found, return success with empty data
      if (error.code === "PGRST116") {
        return {
          success: true,
          data: undefined,
        };
      }
      console.error("Error fetching user preferences:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Transform JSONB arrays back to string arrays
    const preferences: UserPreferencesData = {
      travel_type: data.travel_type || undefined,
      travel_frequency: data.travel_frequency || undefined,
      budget_comfort_range: data.budget_comfort_range || undefined,
      activities: Array.isArray(data.activities) ? data.activities : [],
      destinations: Array.isArray(data.destinations) ? data.destinations : [],
      companions: Array.isArray(data.companions) ? data.companions : [],
      goals: Array.isArray(data.goals) ? data.goals : [],
    };

    return {
      success: true,
      data: preferences,
    };
  } catch (error) {
    console.error("Error in getUserPreferences:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Check if user has completed onboarding
 */
export async function hasCompletedOnboarding(): Promise<boolean> {
  try {
    const result = await getUserPreferences();
    if (!result.success || !result.data) {
      return false;
    }

    // Check if at least step 1 (basic traveler identity) is completed
    const hasBasicInfo =
      result.data.travel_type &&
      result.data.travel_frequency &&
      result.data.budget_comfort_range;

    return !!hasBasicInfo;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}

/**
 * Upsert user preferences (insert or update)
 */
export async function upsertUserPreferences(
  preferences: Partial<UserPreferencesData>
): Promise<UserPreferencesResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Prepare data for upsert
    const upsertData: Record<string, unknown> = {
      user_id: user.id,
    };

    // Add single-value fields
    if (preferences.travel_type !== undefined) {
      upsertData.travel_type = preferences.travel_type;
    }
    if (preferences.travel_frequency !== undefined) {
      upsertData.travel_frequency = preferences.travel_frequency;
    }
    if (preferences.budget_comfort_range !== undefined) {
      upsertData.budget_comfort_range = preferences.budget_comfort_range;
    }

    // Add array fields as JSONB
    if (preferences.activities !== undefined) {
      upsertData.activities = preferences.activities;
    }
    if (preferences.destinations !== undefined) {
      upsertData.destinations = preferences.destinations;
    }
    if (preferences.companions !== undefined) {
      upsertData.companions = preferences.companions;
    }
    if (preferences.goals !== undefined) {
      upsertData.goals = preferences.goals;
    }

    // Use upsert with conflict resolution on user_id
    const { data, error } = await supabase
      .from("user_preferences")
      .upsert(upsertData, {
        onConflict: "user_id",
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error upserting user preferences:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Transform response
    const responseData: UserPreferencesData = {
      travel_type: data.travel_type || undefined,
      travel_frequency: data.travel_frequency || undefined,
      budget_comfort_range: data.budget_comfort_range || undefined,
      activities: Array.isArray(data.activities) ? data.activities : [],
      destinations: Array.isArray(data.destinations) ? data.destinations : [],
      companions: Array.isArray(data.companions) ? data.companions : [],
      goals: Array.isArray(data.goals) ? data.goals : [],
    };

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Error in upsertUserPreferences:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Update specific step of onboarding
 */
export async function updateOnboardingStep(
  step: number,
  stepData: Partial<UserPreferencesData>
): Promise<UserPreferencesResponse> {
  try {
    // Get existing preferences first
    const existingResult = await getUserPreferences();
    const existingData = existingResult.data || {};

    // Merge with new step data
    const mergedData: Partial<UserPreferencesData> = {
      ...existingData,
      ...stepData,
    };

    return await upsertUserPreferences(mergedData);
  } catch (error) {
    console.error("Error updating onboarding step:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Delete user preferences (for testing/reset purposes)
 */
export async function deleteUserPreferences(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const { error } = await supabase
      .from("user_preferences")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting user preferences:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in deleteUserPreferences:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
