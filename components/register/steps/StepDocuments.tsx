import React from "react";
import { Upload, X, Loader2 } from "lucide-react";

export function StepDocuments({
  formData,
  onChange,
  ktpPreview,
  housePreview,
  onFileChange,
  onClearFile,
  onSubmit,
  isSubmitting,
  submitError,
  onBack,
  labelClass
}: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload KTP */}
        <div>
          <label className={labelClass}>Foto KTP Pemohon *</label>
          <label className="block cursor-pointer">
            <div className={`border border-dashed border-foreground/20 hover:border-foreground/50 transition-colors p-6 text-center ${ktpPreview ? 'p-2' : ''}`}>
              {ktpPreview ? (
                <div className="relative">
                  <img src={ktpPreview} alt="KTP" className="w-full h-32 object-cover rounded" />
                  <button type="button" onClick={(e) => onClearFile(e, 'ktp')} className="absolute top-1 right-1 bg-background p-1 border">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Klik untuk upload foto KTP</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFileChange(e, 'ktp')} />
          </label>
        </div>

        {/* Upload Foto Rumah */}
        <div>
          <label className={labelClass}>Foto Tampak Depan Rumah *</label>
          <label className="block cursor-pointer">
            <div className={`border border-dashed border-foreground/20 hover:border-foreground/50 transition-colors p-6 text-center ${housePreview ? 'p-2' : ''}`}>
              {housePreview ? (
                <div className="relative">
                  <img src={housePreview} alt="Rumah" className="w-full h-32 object-cover rounded" />
                  <button type="button" onClick={(e) => onClearFile(e, 'house')} className="absolute top-1 right-1 bg-background p-1 border">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Klik untuk upload foto depan rumah</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFileChange(e, 'house')} />
          </label>
        </div>
      </div>

      {/* Syarat Ketentuan */}
      <div className="flex items-start gap-3 py-4 border-t border-foreground/10">
        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={onChange} className="mt-0.5" id="terms" />
        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          Saya menyatakan bahwa seluruh informasi pendaftaran WiFi Sicakra ini adalah benar dan siap dikonfirmasi oleh tim lapangan via WhatsApp.
        </label>
      </div>

      {submitError && (
        <div className="p-4 border border-red-500/20 bg-red-500/5 text-xs text-red-500 font-mono">
          {submitError}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
        <button type="button" onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.agreeTerms || isSubmitting}
          className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors disabled:opacity-30 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
          {isSubmitting ? 'Mengirim Formulir...' : 'Kirim Berkas Masuk Antrian'}
        </button>
      </div>
    </div>
  );
}