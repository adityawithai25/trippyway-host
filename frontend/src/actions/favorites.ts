"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getFavoritesServer(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("trip_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }

    return data?.map((item) => item.trip_id) || [];
  } catch (error) {
    console.error("Error in getFavoritesServer:", error);
    return [];
  }
}

export async function toggleFavoriteServer(tripId: string): Promise<string[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check if favorite exists
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("trip_id", tripId)
      .single();

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("trip_id", tripId);

      if (error) {
        throw error;
      }
    } else {
      // Add favorite
      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
        trip_id: tripId,
      });

      if (error) {
        throw error;
      }
    }

    // Revalidate the page to reflect changes
    revalidatePath("/packages");

    // Return updated favorites list
    return await getFavoritesServer();
  } catch (error) {
    console.error("Error in toggleFavoriteServer:", error);
    throw error;
  }
}
