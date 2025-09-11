"use client";

import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

type PlaceMapProps = {
  supabase: SupabaseClient<any>; // ✅ Supabase client passed from parent
};

type Suggestion = {
  description: string;
  place_id: string;
};

export default function PlaceMap({ supabase }: PlaceMapProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Suggestion | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  // ✅ Fetch user location + save to Supabase every 10 mins
  useEffect(() => {
    if (!navigator.geolocation) return;

    const saveLocation = async (lat: number, lng: number) => {
      const timestamp = new Date().toISOString();

      await supabase.from("locations").insert([{ lat, lng, timestamp }]);

      // ✅ keep only 6 latest
      await supabase.rpc("delete_old_locations");
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(coords);
          saveLocation(coords.lat, coords.lng);
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    };

    getLocation();
    const interval = setInterval(getLocation, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [supabase]);

  // ✅ Autocomplete fetch from Places API
  const fetchSuggestions = async (input: string) => {
    if (!input) return setSuggestions([]);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK") setSuggestions(data.predictions);
      else setSuggestions([]);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (place: Suggestion) => {
    setSelectedPlace(place);
    setQuery(place.description);
    setSuggestions([]);
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="space-y-4">
      {/* 🔹 Search Box */}
      <input
        type="text"
        placeholder="Enter your destination..."
        className="border p-2 w-full rounded"
        value={query}
        onChange={handleInput}
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="border rounded bg-white shadow">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Destination */}
      {selectedPlace && (
        <div className="p-3 border rounded bg-green-50">
          <h2 className="font-semibold">Selected Destination:</h2>
          <p>{selectedPlace.description}</p>
        </div>
      )}

      {/* Google Map */}
      <div className="w-full h-[500px]">
        {position ? (
          <GoogleMap
            center={position}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            <Marker position={position} />
          </GoogleMap>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>
    </div>
  );
}
