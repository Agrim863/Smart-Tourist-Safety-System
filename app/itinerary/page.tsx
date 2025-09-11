"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// ✅ Initialize supabase client
const supabase = createPagesBrowserClient();

// ✅ Dynamically import PlaceMap (Google Maps + user location)
const PlaceMap = dynamic(() => import("../../components/PlaceMap"), {
  ssr: false, // prevent SSR crash
});

export default function HomePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // ✅ Ensures this only runs client-side
    setHasMounted(true);
  }, []);

  // Prevent rendering on server
  if (!hasMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Smart Tourist Safety System
      </h1>

      {/* ✅ Map component is client-only */}
      <div className="w-full h-[600px]">
        <PlaceMap supabase={supabase} />
      </div>
    </main>
  );
}
