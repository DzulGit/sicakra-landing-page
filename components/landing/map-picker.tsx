"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, mapsUrl: string) => void;
  initialLat?: number;
  initialLng?: number;
}

export function MapPicker({ onLocationSelect, initialLat, initialLng }: MapPickerProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(
    initialLat && initialLng ? [initialLat, initialLng] : null
  );

  useEffect(() => { setMounted(true); }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPosition([lat, lng]);
      const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      onLocationSelect(lat, lng, mapsUrl);
    });
  };

  if (!mounted) return null;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleGetLocation}
        className="flex items-center gap-2 px-4 py-2 border border-foreground/20 text-sm font-mono hover:border-foreground transition-colors"
      >
        <MapPin className="w-4 h-4" />
        {position ? "Lokasi Terdeteksi ✓" : "Deteksi Lokasi Saya"}
      </button>

      {position && (
        <div className="text-xs font-mono text-muted-foreground space-y-1">
          <p>Lat: {position[0].toFixed(6)}</p>
          <p>Lng: {position[1].toFixed(6)}</p>
          <a
            href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-1 underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Lihat di Google Maps →
          </a>
        </div>
      )}

      <p className="text-xs text-muted-foreground pt-1">
        Atau paste link Google Maps:
      </p>
      <input
        type="text"
        placeholder="https://maps.google.com/..."
        onChange={(e) => {
          const url = e.target.value;
          if (url.includes('google.com/maps') || url.includes('goo.gl/maps')) {
            onLocationSelect(position?.[0] ?? 0, position?.[1] ?? 0, url);
          }
        }}
        className="w-full bg-transparent border border-foreground/10 px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors"
      />
    </div>
  );
}