import React, { useState } from "react";
import { MapPicker } from "@/components/landing/map-picker";

const BUILDING_TYPES = ["RUMAH", "KONTRAKAN", "KOS", "RUKO", "KANTOR", "SEKOLAH"];
const OWNERSHIP_TYPES = ["MILIK_SENDIRI", "SEWA_KONTRAK"];
const OWNERSHIP_LABELS: Record<string, string> = { MILIK_SENDIRI: "Milik Sendiri", SEWA_KONTRAK: "Sewa / Kontrak" };

export function StepLocation({ formData, setFormData, onNext, onBack, onError, labelClass }: any) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    const newErrors: Record<string, boolean> = {};
    let errorMsg = "";

    if (formData.latitude === 0 || formData.longitude === 0) {
      newErrors.map = true;
      if (!errorMsg) errorMsg = "Mohon geser pin pada peta untuk menandai titik akurat lokasi rumah Anda.";
    }
    if (!formData.buildingType) {
      newErrors.buildingType = true;
      if (!errorMsg) errorMsg = "Mohon pilih Jenis Model Bangunan.";
    }
    if (!formData.ownershipStatus) {
      newErrors.ownershipStatus = true;
      if (!errorMsg) errorMsg = "Mohon pilih Status Kepemilikan Rumah Anda.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      onError(errorMsg);
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <label className={`${labelClass} ${errors.map ? "text-red-500" : ""}`}>Pin Peta Akurat Lokasi Rumah *</label>
        <div className={`transition-all duration-300 ${errors.map ? "p-1 bg-red-500/10 border border-red-500" : ""}`}>
          <MapPicker
            onLocationSelect={(lat: number, lng: number, url: string) =>
              setFormData((prev: any) => ({ ...prev, latitude: lat, longitude: lng, mapsUrl: url }))
            }
            initialLat={formData.latitude}
            initialLng={formData.longitude}
          />
        </div>
      </div>

      <div>
        <label className={`${labelClass} ${errors.buildingType ? "text-red-500" : ""}`}>Jenis Model Bangunan *</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {BUILDING_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setFormData((prev: any) => ({ ...prev, buildingType: type })); setErrors(e => ({...e, buildingType: false})) }}
              className={`py-2 px-3 text-xs font-mono border transition-colors ${
                formData.buildingType === type
                  ? "border-foreground bg-foreground text-background"
                  : errors.buildingType ? "border-red-500 bg-red-500/5 text-red-600" : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={`${labelClass} ${errors.ownershipStatus ? "text-red-500" : ""}`}>Status Kepemilikan Rumah *</label>
        <div className="flex gap-3">
          {OWNERSHIP_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setFormData((prev: any) => ({ ...prev, ownershipStatus: type })); setErrors(e => ({...e, ownershipStatus: false})) }}
              className={`py-2 px-4 text-xs font-mono border transition-colors ${
                formData.ownershipStatus === type
                  ? "border-foreground bg-foreground text-background"
                  : errors.ownershipStatus ? "border-red-500 bg-red-500/5 text-red-600" : "border-foreground/20 hover:border-foreground"
              }`}
            >
              {OWNERSHIP_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={handleNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Pilih Paket Layanan →
        </button>
      </div>
    </div>
  );
}