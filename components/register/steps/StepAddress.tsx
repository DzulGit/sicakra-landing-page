import React from "react";

export function StepAddress({ formData, onChange, onNext, onBack, inputClass, labelClass }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Alamat Lengkap Rumah *</label>
          <input name="address" value={formData.address} onChange={onChange} className={inputClass} placeholder="Nama jalan, nomor rumah" required />
        </div>
        <div>
          <label className={labelClass}>RT/RW *</label>
          <input name="rtRw" value={formData.rtRw} onChange={onChange} className={inputClass} placeholder="003/005" required />
        </div>
        <div>
          <label className={labelClass}>Kelurahan/Desa *</label>
          <input name="village" value={formData.village} onChange={onChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Kecamatan *</label>
          <input name="district" value={formData.district} onChange={onChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Kabupaten/Kota *</label>
          <input name="city" value={formData.city} onChange={onChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Kode Pos</label>
          <input name="postalCode" value={formData.postalCode} onChange={onChange} className={inputClass} maxLength={5} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={onNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Lokasi & Bangunan →
        </button>
      </div>
    </div>
  );
}