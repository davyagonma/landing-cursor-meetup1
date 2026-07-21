import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}

export type MeetupSpeaker = {
  id: string;
  slug: string;
  name: string;
  role_label: string;
  title: string;
  subtitle: string | null;
  photo_url: string;
  sort_order: number;
  featured: boolean;
};

export type MeetupBadge = {
  id: string;
  display_name: string | null;
  image_url: string;
  is_public: boolean;
  created_at: string;
};

export async function fetchPublicSpeakers(): Promise<MeetupSpeaker[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("meetup_speakers")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("speakers fetch", error.message);
    return [];
  }
  return data ?? [];
}

export async function fetchPublicBadges(): Promise<MeetupBadge[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("meetup_badges")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("badges fetch", error.message);
    return [];
  }
  return data ?? [];
}

export async function publishBadge(params: {
  dataUrl: string;
  displayName?: string;
  isPublic: boolean;
}): Promise<{ ok: true; imageUrl: string } | { ok: false; error: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Supabase non configuré" };

  const res = await fetch(params.dataUrl);
  const blob = await res.blob();
  const path = `public/${crypto.randomUUID()}.png`;

  const { error: upErr } = await sb.storage
    .from("meetup-badges")
    .upload(path, blob, { contentType: "image/png", upsert: false });

  if (upErr) return { ok: false, error: upErr.message };

  const { data: pub } = sb.storage.from("meetup-badges").getPublicUrl(path);
  const imageUrl = pub.publicUrl;

  const { error: insErr } = await sb.from("meetup_badges").insert({
    display_name: params.displayName || null,
    image_url: imageUrl,
    is_public: params.isPublic,
  });

  if (insErr) return { ok: false, error: insErr.message };
  return { ok: true, imageUrl };
}
