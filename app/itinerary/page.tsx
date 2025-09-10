"use client";

import PlaceMap from "@/components/PlaceMap";

export default function ItineraryPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Plan Your Trip</h1>
      {/* PlaceMap handles:
          1️⃣ Autocomplete destination input
          2️⃣ Google Map centering on selected city
          3️⃣ Nearby attractions & hotels cards */}
      <PlaceMap />
    </div>
  );
}
