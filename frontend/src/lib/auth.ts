import { createClient } from "@/lib/supabase/server";

/**
 * Get user authentication status
 * @returns Promise<boolean> - true if user is authenticated, false otherwise
 */
export async function getUserAuth(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return !!user;
}


