"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toggleFavoriteServer, getFavoritesServer } from "@/actions/favorites";

const FAVORITES_STORAGE_KEY = "trippyway_favorites";

interface UseFavoritesReturn {
  favorites: string[];
  isFavorite: (tripId: string) => boolean;
  toggleFavorite: (tripId: string) => Promise<void>;
  isLoading: boolean;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Load favorites based on auth status
  useEffect(() => {
    const loadFavorites = async () => {
      if (isAuthenticated === null) return; // Wait for auth check

      setIsLoading(true);
      try {
        if (isAuthenticated) {
          // Load from Supabase
          const serverFavorites = await getFavoritesServer();
          setFavorites(serverFavorites || []);
        } else {
          // Load from localStorage
          const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              setFavorites(Array.isArray(parsed) ? parsed : []);
            } catch {
              setFavorites([]);
            }
          } else {
            setFavorites([]);
          }
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated]);

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (tripId: string) => {
      if (isAuthenticated === null) return; // Wait for auth check

      try {
        if (isAuthenticated) {
          // Use server action for authenticated users
          const updatedFavorites = await toggleFavoriteServer(tripId);
          setFavorites(updatedFavorites || []);
        } else {
          // Use localStorage for unauthenticated users
          const newFavorites = favorites.includes(tripId)
            ? favorites.filter((id) => id !== tripId)
            : [...favorites, tripId];

          localStorage.setItem(
            FAVORITES_STORAGE_KEY,
            JSON.stringify(newFavorites)
          );
          setFavorites(newFavorites);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    [favorites, isAuthenticated]
  );

  const isFavorite = useCallback(
    (tripId: string) => {
      return favorites.includes(tripId);
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading,
  };
}

