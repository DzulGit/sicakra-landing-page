import React from "react";

export function StepContact({ formData, onChange, onNext, inputClass, labelClass }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nama Lengkap *</label>
          <input name="fullName" value={formData.fullName} onChange={onChange} className={inputClass} placeholder="Sesuai KTP" required />
        </div>
        <div>
          <label className={labelClass}>Nomor WhatsApp *</label>
          <input name="phone" value={formData.phone} onChange={onChange} className={inputClass} placeholder="08xxxxxxxxxx" required />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} className={inputClass} placeholder="email@contoh.com" required />
        </div>
        <div>
          <label className={labelClass}>Pekerjaan *</label>
          <select name="job" value={formData.job} onChange={onChange} className={inputClass} required>
            <option value="">Pilih Pekerjaan</option>
            <option value="Karyawan Swasta">Karyawan Swasta</option>
            <option value="PNS">PNS</option>
            <option value="Wiraswasta">Wiraswasta</option>
            <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
            <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Nomor KTP (Opsional)</label>
          <input name="ktpNumber" value={formData.ktpNumber} onChange={onChange} className={inputClass} placeholder="16 digit nomor KTP" maxLength={16} />
        </div>
      </div>
      <div className="pt-6 text-right border-t border-foreground/10">
        <button type="button" onClick={onNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Alamat Pemasangan →
        </button>
      </div>
    </div>
  );
}