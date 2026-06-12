import React, { useState } from "react";

export function StepContact({ formData, onChange, onNext, onError, labelClass }: any) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    const newErrors: Record<string, boolean> = {};
    let errorMsg = "";

    if (!formData.fullName?.trim()) {
      newErrors.fullName = true;
      if (!errorMsg) errorMsg = "Mohon isi Nama Lengkap Anda sesuai identitas KTP.";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = true;
      if (!errorMsg) errorMsg = "Mohon isi Nomor WhatsApp yang dapat dihubungi.";
    } else if (!/^[0-9]{9,15}$/.test(formData.phone)) {
      newErrors.phone = true;
      if (!errorMsg) errorMsg = "Format Nomor WhatsApp tidak valid. Pastikan hanya berisi angka (9-15 digit).";
    }
    if (!formData.email?.trim()) {
      newErrors.email = true;
      if (!errorMsg) errorMsg = "Mohon isi Alamat Email Anda.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = true;
      if (!errorMsg) errorMsg = "Format Alamat Email tidak valid. Pastikan penulisan benar (contoh: nama@email.com).";
    }
    if (!formData.job) {
      newErrors.job = true;
      if (!errorMsg) errorMsg = "Mohon pilih Pekerjaan Anda saat ini.";
    }
    if (formData.ktpNumber && !/^[0-9]{16}$/.test(formData.ktpNumber)) {
      newErrors.ktpNumber = true;
      if (!errorMsg) errorMsg = "Format Nomor KTP tidak valid. Harus berupa 16 digit angka.";
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
        <div>
          <label className={labelClass}>Nama Lengkap *</label>
          <input name="fullName" value={formData.fullName} onChange={onChange} className={getInputClass("fullName")} placeholder="Sesuai KTP" />
        </div>
        <div>
          <label className={labelClass}>Nomor WhatsApp *</label>
          <input name="phone" value={formData.phone} onChange={onChange} className={getInputClass("phone")} placeholder="08xxxxxxxxxx" />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={onChange} className={getInputClass("email")} placeholder="email@contoh.com" />
        </div>
        <div>
          <label className={labelClass}>Pekerjaan *</label>
          <select name="job" value={formData.job} onChange={onChange} className={getInputClass("job")}>
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
          <input name="ktpNumber" value={formData.ktpNumber} onChange={onChange} className={getInputClass("ktpNumber")} placeholder="16 digit nomor KTP" maxLength={16} />
        </div>
      </div>
      <div className="pt-6 text-right border-t border-foreground/10">
        <button type="button" onClick={handleNext} className="px-8 py-3 bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
          Lanjut: Alamat Pemasangan →
        </button>
      </div>
    </div>
  );
}