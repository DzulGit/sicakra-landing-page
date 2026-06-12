import React from "react";

export function StepPackage({ formData, setFormData, onChange, packages, onNext, onBack, inputClass, labelClass }: any) {
  const handleNext = () => {
    if (!formData.packageId) {
      alert("Harap pilih paket layanan terlebih dahulu.");
      return;
    }
    onNext();
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <label className={labelClass}>Pilih Paket Kecepatan WiFi *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {packages.map((pkg: any) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setFormData((prev: any) => ({ ...prev, packageId: pkg.id }))}
              className={`p-4 text-left border transition-colors ${
                formData.packageId === pkg.id
                  ? "border-foreground bg-foreground/5"
                  : "border-foreground/20 hover:border-foreground/50"
              }`}
            >
              <div className="font-bold text-sm text-foreground">{pkg.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                ↓ Download: {pkg.speedDown}Mbps / ↑ Upload: {pkg.speedUp}Mbps
              </div>
              <div className="text-sm font-semibold mt-2 text-primary">
                Rp {pkg.price.toLocaleString('id-ID')} / bulan
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-foreground/10">
        <label className={labelClass}>Petunjuk Acuan Tambahan Rumah (Opsional)</label>
        <textarea
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={onChange}
          className={`${inputClass} resize-none`}
          placeholder="Contoh: Rumah warna hijau pagar hitam, dekat warung kelontong depan masjid."
        />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={onNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Berkas Dokumen →
        </button>
      </div>
    </div>
  );
}