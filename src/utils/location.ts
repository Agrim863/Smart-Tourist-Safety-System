import { supabase } from "@/src/supabaseClient";

export async function saveLocation(userId: string, lat: number, lng: number) {
  // insert new location
  await supabase.from("locations").insert({ user_id: userId, lat, lng });

  // delete older entries if more than 6 for this user
  const { data: oldLocations } = await supabase
    .from("locations")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (oldLocations && oldLocations.length > 6) {
    const idsToDelete = oldLocations.slice(0, oldLocations.length - 6).map((loc: any) => loc.id);
    await supabase.from("locations").delete().in("id", idsToDelete);
  }
}
