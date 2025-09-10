"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/src/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

interface Place {
  name: string | undefined;
  geometry?: google.maps.places.PlaceGeometry;
  formatted_address?: string;
}

interface NearbyPlace {
  name: string;
  vicinity: string;
  place_id: string;
  rating?: number;
  types?: string[];
}

export default function PlaceMap() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [nearby, setNearby] = useState<NearbyPlace[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();

  // ✅ Initialize map
  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 }, // default India
        zoom: 5,
      });
      setMap(mapInstance);
    }
  }, []);

  // ✅ Setup autocomplete
  useEffect(() => {
    if (inputRef.current && map) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
      });

      autocomplete.addListener("place_changed", () => {
        const placeResult = autocomplete.getPlace();

        const lat = placeResult.geometry?.location?.lat();
        const lng = placeResult.geometry?.location?.lng();

        if (lat !== undefined && lng !== undefined) {
          map.setCenter({ lat, lng });
          map.setZoom(12);

          setSelectedPlace({
            name: placeResult.name,
            geometry: placeResult.geometry,
            formatted_address: placeResult.formatted_address,
          });

          fetchNearby({ lat, lng });
        } else {
          console.warn("Selected place has no geometry/location");
        }
      });
    }
  }, [map]);

  // ✅ Fetch nearby attractions/hotels
  const fetchNearby = ({ lat, lng }: { lat: number; lng: number }) => {
    if (!map) return;

    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000,
      keyword: "attraction OR hotel",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const formatted: NearbyPlace[] = results.map((place) => ({
          name: place.name ?? "Unknown",
          vicinity: place.vicinity ?? "Unknown area",
          place_id: place.place_id ?? "",
          rating: place.rating,
          types: place.types,
        }));
        setNearby(formatted);
      }
    });
  };

  // ✅ Track user live location & push to Supabase every 10 minutes
  useEffect(() => {
    if (!session) return;

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Insert new location
        await supabase.from("locations").insert({
          user_id: session.user.id,
          lat: latitude,
          lng: longitude,
          timestamp: new Date().toISOString(),
        });

        // Keep only 6 most recent
        const { data: oldLocations } = await supabase
          .from("locations")
          .select("id")
          .eq("user_id", session.user.id)
          .order("timestamp", { ascending: false });

        if (oldLocations && oldLocations.length > 6) {
          const idsToDelete = oldLocations.slice(6).map((loc: { id: string }) => loc.id);
          await supabase.from("locations").delete().in("id", idsToDelete);
        }
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    // stop tracking on unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, [session]);

  return (
    <div className="space-y-4">
      {/* Location permission input */}
      <p className="text-sm text-gray-600">
        Please enable location permissions to improve your safety and recommendations.
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Enter city"
        className="border p-2 w-full"
      />
      <div ref={mapRef} style={{ width: "100%", height: "400px" }} />

      {selectedPlace && (
        <div className="p-2 border mt-2 bg-green-50 rounded">
          <h2 className="font-bold">{selectedPlace.name}</h2>
          <p>{selectedPlace.formatted_address}</p>
        </div>
      )}

      {nearby.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">Nearby Attractions & Hotels:</h3>
          <ul className="space-y-2">
            {nearby.map((place) => (
              <li key={place.place_id} className="p-2 border rounded bg-white shadow">
                <p className="font-bold">{place.name}</p>
                <p className="text-sm">{place.vicinity}</p>
                {place.rating && <p className="text-sm">⭐ {place.rating}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
