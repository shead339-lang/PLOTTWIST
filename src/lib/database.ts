// Simple in-memory store + optional Supabase persistence for share URLs
// Works fully without Supabase — uses Map-based in-memory store

import type { StoryResult } from "@/lib/validation";
import type { MovieProfile } from "@/lib/scoring";

export interface SavedMovie {
  id: string;
  shareCode: string;
  name: string;
  universe: string;
  role: string;
  profile: MovieProfile;
  story: StoryResult;
  createdAt: string;
}

// In-memory store for development / when Supabase is not configured
const memoryStore = new Map<string, SavedMovie>();

function generateShareCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excluded ambiguous chars
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(url, key);
  } catch {
    return null;
  }
}

export async function saveMovie(
  profile: MovieProfile,
  story: StoryResult
): Promise<string> {
  const shareCode = generateShareCode();
  const movie: SavedMovie = {
    id: shareCode,
    shareCode,
    name: profile.name,
    universe: profile.universe,
    role: profile.actualArchetype,
    profile,
    story,
    createdAt: new Date().toISOString(),
  };

  // Try Supabase first
  const supabase = await getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("movies").insert({
        share_code: shareCode,
        name: profile.name,
        universe: profile.universe,
        role: profile.actualArchetype,
        profile_json: profile,
        story_json: story,
      });
      return shareCode;
    } catch (error) {
      console.warn("Supabase save failed, falling back to memory store:", error);
    }
  }

  // Fallback to memory store
  memoryStore.set(shareCode, movie);
  return shareCode;
}

export async function getMovie(shareCode: string): Promise<SavedMovie | null> {
  // Try Supabase first
  const supabase = await getSupabaseClient();
  if (supabase) {
    try {
      const { data } = await supabase
        .from("movies")
        .select("*")
        .eq("share_code", shareCode)
        .single();

      if (data) {
        return {
          id: data.id,
          shareCode: data.share_code,
          name: data.name,
          universe: data.universe,
          role: data.role,
          profile: data.profile_json as MovieProfile,
          story: data.story_json as StoryResult,
          createdAt: data.created_at,
        };
      }
    } catch {
      // Fall through to memory store
    }
  }

  return memoryStore.get(shareCode) ?? null;
}
