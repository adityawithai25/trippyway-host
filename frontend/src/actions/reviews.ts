"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface ReviewData {
  id: string;
  name?: string;
  user_id?: string;
  verified: boolean;
  stars: number;
  review_comment: string;
  images: string[];
  trip_id: string;
  created_at?: string;
}

export interface SubmitReviewData {
  name?: string;
  stars: number;
  review_comment: string;
  images: File[];
  trip_id: string;
}

export interface SubmitReviewResponse {
  success: boolean;
  error?: string;
  data?: ReviewData;
}

/**
 * Submit a review with optional image uploads
 */
export async function submitReview(
  formData: FormData
): Promise<SubmitReviewResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const tripId = formData.get("trip_id") as string;
    const stars = parseInt(formData.get("stars") as string);
    const reviewComment = formData.get("review_comment") as string;
    const name = formData.get("name") as string | null;
    const imageFiles = formData.getAll("images") as File[];

    if (!tripId || !stars || !reviewComment) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    // Validate stars (1-5)
    if (stars < 1 || stars > 5) {
      return {
        success: false,
        error: "Stars must be between 1 and 5",
      };
    }

    // Determine verified status based on authentication
    const verified = !!user;
    const userId = user?.id;

    // If user is not authenticated, name is required
    if (!user && !name) {
      return {
        success: false,
        error: "Name is required for unauthenticated users",
      };
    }

    // Upload images to Supabase storage
    const imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        if (imageFile.size === 0) continue; // Skip empty files

        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${tripId}/${fileName}`;

        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await imageFile.arrayBuffer();
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("reviews")
          .upload(filePath, arrayBuffer, {
            contentType: imageFile.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          // Continue with other images even if one fails
          continue;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("reviews").getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }
    }

    // Insert review into database
    const reviewData: Partial<ReviewData> = {
      trip_id: tripId,
      stars,
      review_comment: reviewComment,
      verified,
      images: imageUrls,
      ...(user ? { user_id: userId } : {}),
      ...(name && !user ? { name } : {}),
    };

    const { data, error } = await supabase
      .from("reviews")
      .insert(reviewData)
      .select()
      .single();

    if (error) {
      console.error("Error inserting review:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Revalidate the package page
    revalidatePath(`/packages/${tripId}`);

    return {
      success: true,
      data: data as ReviewData,
    };
  } catch (error) {
    console.error("Error in submitReview:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get reviews for a specific trip
 */
export async function getReviews(tripId: string): Promise<ReviewData[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("trip_id", tripId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    return (data || []) as ReviewData[];
  } catch (error) {
    console.error("Error in getReviews:", error);
    return [];
  }
}

