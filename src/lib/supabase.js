// ============================================
// Supabase client — visitor counter, guestbook, egg clicker
// ============================================

import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Guard — fails loudly in dev if env vars are missing
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[Supabase] Missing env vars. Visitor counter, guestbook, and egg clicker will not work.\n" +
    "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  )
}

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

// ── Visitor counter ───────────────────────────
export async function incrementVisitorCount() {
  if (!supabase) return null

  try {
    // Atomic increment via RPC — avoids race conditions
    const { data, error } = await supabase.rpc("increment_visitor_count")
    if (error) throw error
    return data
  } catch (err) {
    console.error("[Supabase] incrementVisitorCount failed:", err)
    return null
  }
}

export async function getVisitorCount() {
  if (!supabase) return 1337 // fallback number

  try {
    const { data, error } = await supabase
      .from("visitor_count")
      .select("count")
      .eq("id", 1)
      .single()

    if (error) throw error
    return data?.count ?? 1337
  } catch (err) {
    console.error("[Supabase] getVisitorCount failed:", err)
    return 1337
  }
}

// ── Guestbook ─────────────────────────────────
export async function getGuestbookEntries() {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error("[Supabase] getGuestbookEntries failed:", err)
    return []
  }
}

export async function addGuestbookEntry({ name, message, egg_rating }) {
  if (!supabase) return { error: "Supabase not configured" }

  try {
    const { data, error } = await supabase
      .from("guestbook")
      .insert([{ name, message, egg_rating }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error("[Supabase] addGuestbookEntry failed:", err)
    return { data: null, error: err.message }
  }
}

// ── Egg clicker leaderboard ───────────────────
export async function getLeaderboard() {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from("egg_clicks")
      .select("*")
      .order("score", { ascending: false })
      .limit(10)

    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error("[Supabase] getLeaderboard failed:", err)
    return []
  }
}

export async function submitScore({ player_name, score }) {
  if (!supabase) return { error: "Supabase not configured" }

  try {
    const { data, error } = await supabase
      .from("egg_clicks")
      .insert([{ player_name, score }])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (err) {
    console.error("[Supabase] submitScore failed:", err)
    return { data: null, error: err.message }
  }
}