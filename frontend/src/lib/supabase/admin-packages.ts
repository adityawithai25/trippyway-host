// ============================================================================
// Supabase Admin Package Functions (for future admin panel)
// ============================================================================

import { createClient } from "./server";
import {
  TravelPackage,
  PackageTheme,
  CreatePackageData,
  UpdatePackageData,
  PackageItinerary,
  PackageInclusion,
} from "@/types/packages";

// ============================================================================
// Theme Management
// ============================================================================

export async function createTheme(
  theme: Omit<PackageTheme, "id" | "created_at" | "updated_at">
): Promise<PackageTheme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_themes")
    .insert(theme)
    .select()
    .single();

  if (error) {
    console.error("Error creating theme:", error);
    return null;
  }

  return data;
}

export async function updateTheme(
  id: string,
  updates: Partial<PackageTheme>
): Promise<PackageTheme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_themes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating theme:", error);
    return null;
  }

  return data;
}

export async function deleteTheme(id: string): Promise<boolean> {
  const supabase = await createClient();

  // Soft delete by setting is_active to false
  const { error } = await supabase
    .from("package_themes")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting theme:", error);
    return false;
  }

  return true;
}

// ============================================================================
// Package Management
// ============================================================================

export async function createPackage(
  packageData: CreatePackageData
): Promise<TravelPackage | null> {
  const supabase = await createClient();

  // Extract theme-related data
  const { theme_ids, primary_theme_id, itinerary, inclusions, ...packageInfo } =
    packageData;

  // Create the package
  const { data: newPackage, error: packageError } = await supabase
    .from("travel_packages")
    .insert({
      ...packageInfo,
      is_active: true,
    })
    .select()
    .single();

  if (packageError || !newPackage) {
    console.error("Error creating package:", packageError);
    return null;
  }

  // Create theme mappings
  if (theme_ids && theme_ids.length > 0) {
    const mappings = theme_ids.map((themeId) => ({
      package_id: newPackage.id,
      theme_id: themeId,
      is_primary: themeId === primary_theme_id,
    }));

    const { error: mappingError } = await supabase
      .from("package_theme_mappings")
      .insert(mappings);

    if (mappingError) {
      console.error("Error creating theme mappings:", mappingError);
    }
  }

  // Create itinerary
  if (itinerary && itinerary.length > 0) {
    const itineraryData = itinerary.map((day) => ({
      ...day,
      package_id: newPackage.id,
    }));

    const { error: itineraryError } = await supabase
      .from("package_itineraries")
      .insert(itineraryData);

    if (itineraryError) {
      console.error("Error creating itinerary:", itineraryError);
    }
  }

  // Create inclusions
  if (inclusions && inclusions.length > 0) {
    const inclusionsData = inclusions.map((inc) => ({
      ...inc,
      package_id: newPackage.id,
    }));

    const { error: inclusionsError } = await supabase
      .from("package_inclusions")
      .insert(inclusionsData);

    if (inclusionsError) {
      console.error("Error creating inclusions:", inclusionsError);
    }
  }

  return newPackage;
}

export async function updatePackage(
  updateData: UpdatePackageData
): Promise<TravelPackage | null> {
  const supabase = await createClient();

  const { id, theme_ids, primary_theme_id, itinerary, inclusions, ...updates } =
    updateData;

  // Update the package
  const { data: updatedPackage, error: packageError } = await supabase
    .from("travel_packages")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (packageError || !updatedPackage) {
    console.error("Error updating package:", packageError);
    return null;
  }

  // Update theme mappings if provided
  if (theme_ids) {
    // Delete existing mappings
    await supabase
      .from("package_theme_mappings")
      .delete()
      .eq("package_id", id);

    // Create new mappings
    if (theme_ids.length > 0) {
      const mappings = theme_ids.map((themeId) => ({
        package_id: id,
        theme_id: themeId,
        is_primary: themeId === primary_theme_id,
      }));

      await supabase.from("package_theme_mappings").insert(mappings);
    }
  }

  // Update itinerary if provided
  if (itinerary) {
    // Delete existing itinerary
    await supabase.from("package_itineraries").delete().eq("package_id", id);

    // Create new itinerary
    if (itinerary.length > 0) {
      const itineraryData = itinerary.map((day) => ({
        ...day,
        package_id: id,
      }));

      await supabase.from("package_itineraries").insert(itineraryData);
    }
  }

  // Update inclusions if provided
  if (inclusions) {
    // Delete existing inclusions
    await supabase.from("package_inclusions").delete().eq("package_id", id);

    // Create new inclusions
    if (inclusions.length > 0) {
      const inclusionsData = inclusions.map((inc) => ({
        ...inc,
        package_id: id,
      }));

      await supabase.from("package_inclusions").insert(inclusionsData);
    }
  }

  return updatedPackage;
}

export async function deletePackage(id: string): Promise<boolean> {
  const supabase = await createClient();

  // Soft delete by setting is_active to false
  const { error } = await supabase
    .from("travel_packages")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting package:", error);
    return false;
  }

  return true;
}

export async function hardDeletePackage(id: string): Promise<boolean> {
  const supabase = await createClient();

  // This will cascade delete related records
  const { error } = await supabase.from("travel_packages").delete().eq("id", id);

  if (error) {
    console.error("Error hard deleting package:", error);
    return false;
  }

  return true;
}

// ============================================================================
// Itinerary Management
// ============================================================================

export async function addItineraryDay(
  packageId: string,
  itinerary: Omit<
    PackageItinerary,
    "id" | "package_id" | "created_at" | "updated_at"
  >
): Promise<PackageItinerary | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_itineraries")
    .insert({
      ...itinerary,
      package_id: packageId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding itinerary day:", error);
    return null;
  }

  return data;
}

export async function updateItineraryDay(
  id: string,
  updates: Partial<PackageItinerary>
): Promise<PackageItinerary | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_itineraries")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating itinerary day:", error);
    return null;
  }

  return data;
}

export async function deleteItineraryDay(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("package_itineraries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting itinerary day:", error);
    return false;
  }

  return true;
}

// ============================================================================
// Inclusions Management
// ============================================================================

export async function addInclusion(
  packageId: string,
  inclusion: Omit<PackageInclusion, "id" | "package_id" | "created_at">
): Promise<PackageInclusion | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_inclusions")
    .insert({
      ...inclusion,
      package_id: packageId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error adding inclusion:", error);
    return null;
  }

  return data;
}

export async function updateInclusion(
  id: string,
  updates: Partial<PackageInclusion>
): Promise<PackageInclusion | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("package_inclusions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating inclusion:", error);
    return null;
  }

  return data;
}

export async function deleteInclusion(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("package_inclusions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting inclusion:", error);
    return false;
  }

  return true;
}

// ============================================================================
// Bulk Operations
// ============================================================================

export async function bulkUpdatePackageStatus(
  packageIds: string[],
  isActive: boolean
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("travel_packages")
    .update({ is_active: isActive })
    .in("id", packageIds);

  if (error) {
    console.error("Error bulk updating package status:", error);
    return false;
  }

  return true;
}

export async function bulkUpdatePackagePrices(
  packageIds: string[],
  priceAdjustment: number,
  adjustmentType: "percentage" | "fixed"
): Promise<boolean> {
  const supabase = await createClient();

  // Get current prices
  const { data: packages } = await supabase
    .from("travel_packages")
    .select("id, price_per_person")
    .in("id", packageIds);

  if (!packages) {
    return false;
  }

  // Calculate new prices
  const updates = packages.map((pkg) => {
    const newPrice =
      adjustmentType === "percentage"
        ? pkg.price_per_person * (1 + priceAdjustment / 100)
        : pkg.price_per_person + priceAdjustment;

    return {
      id: pkg.id,
      price_per_person: Math.max(0, newPrice), // Ensure non-negative
    };
  });

  // Update prices
  for (const update of updates) {
    await supabase
      .from("travel_packages")
      .update({ price_per_person: update.price_per_person })
      .eq("id", update.id);
  }

  return true;
}

// ============================================================================
// Analytics & Reports
// ============================================================================

export async function getPackageStats(): Promise<{
  totalPackages: number;
  activePackages: number;
  totalThemes: number;
  averagePrice: number;
  averageRating: number;
}> {
  const supabase = await createClient();

  const { data: packages } = await supabase
    .from("travel_packages")
    .select("is_active, price_per_person, rating");

  const { data: themes } = await supabase
    .from("package_themes")
    .select("id")
    .eq("is_active", true);

  if (!packages) {
    return {
      totalPackages: 0,
      activePackages: 0,
      totalThemes: 0,
      averagePrice: 0,
      averageRating: 0,
    };
  }

  const activePackages = packages.filter((p) => p.is_active);
  const totalPrice = activePackages.reduce(
    (sum, p) => sum + Number(p.price_per_person),
    0
  );
  const totalRating = activePackages.reduce(
    (sum, p) => sum + Number(p.rating),
    0
  );

  return {
    totalPackages: packages.length,
    activePackages: activePackages.length,
    totalThemes: themes?.length || 0,
    averagePrice:
      activePackages.length > 0 ? totalPrice / activePackages.length : 0,
    averageRating:
      activePackages.length > 0 ? totalRating / activePackages.length : 0,
  };
}

