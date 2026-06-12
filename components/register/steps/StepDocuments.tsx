import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

export function StepDocuments({ formData, onChange, ktpPreview, housePreview, onFileChange, onClearFile, onSubmit, isSubmitting, submitError, onBack, onError, labelClass }: any) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleFinalSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    let errorMsg = "";

    if (!ktpPreview) {
      newErrors.ktp = true;
      if (!errorMsg) errorMsg = "Mohon unggah Foto KTP Pemohon untuk keperluan validasi identitas.";
    }
    if (!housePreview) {
      newErrors.house = true;
      if (!errorMsg) errorMsg = "Mohon unggah Foto Tampak Depan Rumah untuk acuan teknisi lapangan.";
    }
    if (!formData.agreeTerms) {
      newErrors.terms = true;
      if (!errorMsg) errorMsg = "Anda wajib menyetujui pernyataan kebenaran data pada bagian bawah sebelum mendaftar.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      onError(errorMsg);
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`${labelClass} ${errors.ktp ? "text-red-500" : ""}`}>Foto KTP Pemohon *</label>
          <label className="block cursor-pointer">
            <div className={`border border-dashed transition-colors p-6 text-center ${ktpPreview ? 'p-2' : ''} ${errors.ktp ? "border-red-500 bg-red-500/5 text-red-500" : "border-foreground/20 hover:border-foreground/50"}`}>
              {ktpPreview ? (
                <div className="relative">
                  <img src={ktpPreview} alt="KTP" className="w-full h-32 object-cover rounded" />
                  <button type="button" onClick={(e) => { onClearFile(e, 'ktp'); setErrors(err => ({...err, ktp: true})) }} className="absolute top-1 right-1 bg-background p-1 border">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Klik untuk upload foto KTP</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { onFileChange(e, 'ktp'); setErrors(err => ({...err, ktp: false})) }} />
          </label>
        </div>

        <div>
          <label className={`${labelClass} ${errors.house ? "text-red-500" : ""}`}>Foto Tampak Depan Rumah *</label>
          <label className="block cursor-pointer">
            <div className={`border border-dashed transition-colors p-6 text-center ${housePreview ? 'p-2' : ''} ${errors.house ? "border-red-500 bg-red-500/5 text-red-500" : "border-foreground/20 hover:border-foreground/50"}`}>
              {housePreview ? (
                <div className="relative">
                  <img src={housePreview} alt="Rumah" className="w-full h-32 object-cover rounded" />
                  <button type="button" onClick={(e) => { onClearFile(e, 'house'); setErrors(err => ({...err, house: true})) }} className="absolute top-1 right-1 bg-background p-1 border">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Klik untuk upload foto depan rumah</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { onFileChange(e, 'house'); setErrors(err => ({...err, house: false})) }} />
          </label>
        </div>
      </div>

      <div className={`flex items-start gap-3 py-4 border-t transition-colors ${errors.terms ? "border-red-500 bg-red-500/5 px-3" : "border-foreground/10"}`}>
        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={(e) => { onChange(e); setErrors(err => ({...err, terms: false})) }} className="mt-0.5" id="terms" />
        <label htmlFor="terms" className={`text-xs leading-relaxed cursor-pointer ${errors.terms ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>
          Saya menyatakan bahwa seluruh informasi pendaftaran WiFi Sicakra ini adalah benar, dapat dipertanggungjawabkan, dan siap dikonfirmasi oleh tim lapangan via WhatsApp.
        </label>
      </div>

      {submitError && <div className="p-4 border border-red-500/20 bg-red-500/5 text-xs text-red-500 font-mono">{submitError}</div>}

      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button type="button" onClick={handleFinalSubmit} disabled={isSubmitting} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors disabled:opacity-30 flex items-center gap-2">
          {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
          {isSubmitting ? 'Memproses Berkas...' : 'Kirim Berkas Pendaftaran'}
        </button>
      </div>
    </div>
  );
}