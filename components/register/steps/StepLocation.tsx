import React from "react";
import { MapPicker } from "@/components/landing/map-picker";

const BUILDING_TYPES = ["RUMAH", "KONTRAKAN", "KOS", "RUKO", "KANTOR", "SEKOLAH"];
const OWNERSHIP_TYPES = ["MILIK_SENDIRI", "SEWA_KONTRAK"];
const OWNERSHIP_LABELS: Record<string, string> = {
  MILIK_SENDIRI: "Milik Sendiri",
  SEWA_KONTRAK: "Sewa / Kontrak",
};

export function StepLocation({ formData, setFormData, onNext, onBack, labelClass }: any) {
  const handleNext = () => {
    if (formData.latitude === 0 || formData.longitude === 0) {
      alert("Harap pin lokasi pada peta terlebih dahulu.");
      return;
    }
    if (!formData.buildingType || !formData.ownershipStatus) {
      alert("Harap pilih jenis bangunan dan status kepemilikan.");
      return;
    }
    onNext();
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <label className={labelClass}>Pin Peta Akurat Lokasi Rumah *</label>
        <MapPicker
          onLocationSelect={(lat: number, lng: number, url: string) =>
            setFormData((prev: any) => ({ ...prev, latitude: lat, longitude: lng, mapsUrl: url }))
          }
          initialLat={formData.latitude}
          initialLng={formData.longitude}
        />
      </div>

      <div>
        <label className={labelClass}>Jenis Model Bangunan *</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {BUILDING_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData((prev: any) => ({ ...prev, buildingType: type }))}
              className={`py-2 px-3 text-xs font-mono border transition-colors ${
                formData.buildingType === type
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Status Kepemilikan Rumah *</label>
        <div className="flex gap-3">
          {OWNERSHIP_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData((prev: any) => ({ ...prev, ownershipStatus: type }))}
              className={`py-2 px-4 text-xs font-mono border transition-colors ${
                formData.ownershipStatus === type
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {OWNERSHIP_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={onNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Pilih Paket Layanan →
        </button>
      </div>
    </div>
  );
}