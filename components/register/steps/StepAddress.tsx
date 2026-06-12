import React, { useState } from "react";

export function StepAddress({ formData, onChange, onNext, onBack, onError, labelClass }: any) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    const newErrors: Record<string, boolean> = {};
    let errorMsg = "";

    if (!formData.address?.trim()) {
      newErrors.address = true;
      if (!errorMsg) errorMsg = "Mohon isi Alamat Lengkap Rumah (Nama jalan, gang, atau patokan).";
    }
    if (!formData.rtRw?.trim()) {
      newErrors.rtRw = true;
      if (!errorMsg) errorMsg = "Mohon isi detail RT/RW domisili Anda.";
    }
    if (!formData.village?.trim()) {
      newErrors.village = true;
      if (!errorMsg) errorMsg = "Mohon isi nama Kelurahan/Desa domisili Anda.";
    }
    if (!formData.district?.trim()) {
      newErrors.district = true;
      if (!errorMsg) errorMsg = "Mohon isi nama Kecamatan domisili Anda.";
    }
    if (!formData.city?.trim()) {
      newErrors.city = true;
      if (!errorMsg) errorMsg = "Mohon isi nama Kabupaten/Kota domisili Anda.";
    }
    if (formData.postalCode && !/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = true;
      if (!errorMsg) errorMsg = "Format Kode Pos tidak valid. Harus berupa 5 digit angka.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      onError(errorMsg);
      return;
    }
    onNext();
  };

  const getInputClass = (name: string) =>
    `w-full bg-transparent border px-4 py-2 text-sm focus:outline-none font-mono transition-colors ${
      errors[name] ? "border-red-500 focus:border-red-500 text-red-600 bg-red-500/5 placeholder:text-red-400/50" : "border-foreground/10 focus:border-foreground/40 text-foreground"
    }`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Alamat Lengkap Rumah *</label>
          <input name="address" value={formData.address} onChange={onChange} className={getInputClass("address")} placeholder="Nama jalan, blok, atau nomor rumah" />
        </div>
        <div>
          <label className={labelClass}>RT/RW *</label>
          <input name="rtRw" value={formData.rtRw} onChange={onChange} className={getInputClass("rtRw")} placeholder="Contoh: 003/005" />
        </div>
        <div>
          <label className={labelClass}>Kelurahan/Desa *</label>
          <input name="village" value={formData.village} onChange={onChange} className={getInputClass("village")} />
        </div>
        <div>
          <label className={labelClass}>Kecamatan *</label>
          <input name="district" value={formData.district} onChange={onChange} className={getInputClass("district")} />
        </div>
        <div>
          <label className={labelClass}>Kabupaten/Kota *</label>
          <input name="city" value={formData.city} onChange={onChange} className={getInputClass("city")} />
        </div>
        <div>
          <label className={labelClass}>Kode Pos</label>
          <input name="postalCode" value={formData.postalCode} onChange={onChange} className={getInputClass("postalCode")} maxLength={5} placeholder="5 digit angka" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={handleNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Lokasi & Bangunan →
        </button>
      </div>
    </div>
  );
}