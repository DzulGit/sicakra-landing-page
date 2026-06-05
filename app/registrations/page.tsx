"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";
import { AnimatedWave } from "@/components/landing/animated-wave";
import { MapPicker } from "@/components/landing/map-picker";
import { getPackages, submitRegistration, uploadFile, type Package } from "@/lib/api";

const TABS = [
  { label: "01. Detail Kontak" },
  { label: "02. Alamat Instalasi" },
  { label: "03. Lokasi & Bangunan" },
  { label: "04. Paket & Jadwal" },
  { label: "05. Dokumen" },
];

const BUILDING_TYPES = ["RUMAH", "KONTRAKAN", "KOS", "RUKO", "KANTOR", "SEKOLAH"];
const OWNERSHIP_TYPES = ["MILIK_SENDIRI", "SEWA_KONTRAK"];
const OWNERSHIP_LABELS: Record<string, string> = {
  MILIK_SENDIRI: "Milik Sendiri",
  SEWA_KONTRAK: "Sewa / Kontrak",
};

export default function RegistrationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Upload states
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [houseFile, setHouseFile] = useState<File | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [housePreview, setHousePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    job: "",
    ktpNumber: "",
    address: "",
    rtRw: "",
    village: "",
    district: "",
    city: "",
    postalCode: "",
    latitude: 0,
    longitude: 0,
    mapsUrl: "",
    buildingType: "",
    ownershipStatus: "",
    packageId: "",
    surveyDate: "",
    surveyTime: "",
    notes: "",
    agreeTerms: false,
  });

  useEffect(() => {
    getPackages().then(setPackages).catch(console.error);

    // Ambil packageId dari pricing section jika ada
    const savedPackageId = sessionStorage.getItem('selectedPackageId');
    if (savedPackageId) {
      setFormData(prev => ({ ...prev, packageId: savedPackageId }));
      sessionStorage.removeItem('selectedPackageId');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !isFullScreen) {
        setIsFullScreen(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullScreen]);

  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isFullScreen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "ktp" | "house"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    if (type === "ktp") {
      setKtpFile(file);
      setKtpPreview(preview);
    } else {
      setHouseFile(file);
      setHousePreview(preview);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let ktpPhotoUrl: string | undefined;
      let housePhotoUrl: string | undefined;

      if (ktpFile) ktpPhotoUrl = await uploadFile(ktpFile, 'ktp');
      if (houseFile) housePhotoUrl = await uploadFile(houseFile, 'house');

      await submitRegistration({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        job: formData.job,
        ktpNumber: formData.ktpNumber || undefined,
        address: formData.address,
        rtRw: formData.rtRw,
        village: formData.village,
        district: formData.district,
        city: formData.city,
        postalCode: formData.postalCode || undefined,
        latitude: formData.latitude || undefined,
        longitude: formData.longitude || undefined,
        mapsUrl: formData.mapsUrl || undefined,
        buildingType: formData.buildingType as any,
        ownershipStatus: formData.ownershipStatus as any,
        packageId: formData.packageId,
        surveyDate: formData.surveyDate || undefined,
        surveyTime: formData.surveyTime || undefined,
        notes: formData.notes || undefined,
        ktpPhotoUrl,
        housePhotoUrl,
      });

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-transparent border border-foreground/10 px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors";
  const labelClass = "block text-[11px] uppercase tracking-wider mb-1.5 text-muted-foreground";

  return (
    <section
      id="registrations"
      ref={sectionRef}
      className={`relative bg-background flex flex-col transition-all duration-700 ease-in-out ${
        isFullScreen ? "h-screen w-full overflow-hidden" : "min-h-screen pt-20 pb-8"
      }`}
    >
      <div className="relative z-10 w-full flex-1 flex flex-col mx-auto transition-all duration-700 ease-in-out">

        {/* Header */}
        <div className={`flex flex-col items-center text-center mx-auto transition-all duration-700 ease-in-out ${
          isFullScreen ? "opacity-0 h-0 overflow-hidden m-0 p-0" : "opacity-100 h-auto mb-10"
        }`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <span className="w-8 h-px bg-foreground/30" />
            Pendaftaran Baru
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
            Buat Pesanan Baru.<br />
            <span className="text-muted-foreground">Gabung Sicakra.</span>
          </h2>
        </div>

        <div className={`flex-1 transition-all duration-700 ease-in-out flex flex-col ${
          isFullScreen ? "w-full px-0" : "max-w-6xl w-full px-6 mx-auto"
        }`}>
          <div className={`bg-background/80 backdrop-blur-sm flex flex-col transition-all duration-700 ease-in-out h-full relative z-10 ${
            isFullScreen ? "border-0" : "border border-foreground/10 shadow-2xl"
          }`}>

            {/* Tabs */}
            <div className="flex items-center border-b border-foreground/10 bg-background/95 backdrop-blur-md overflow-x-auto relative z-30">
              <Link
                href="/"
                className="px-6 py-4 flex items-center gap-2 text-sm font-mono border-r border-foreground/10 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Link>
              <div className="flex flex-1">
                {TABS.map((tab, idx) => (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-4 text-xs font-mono transition-colors relative flex-1 text-center whitespace-nowrap ${
                      activeTab === idx
                        ? "text-foreground bg-foreground/5"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className={`p-6 lg:p-8 font-mono text-sm bg-foreground/[0.01] flex-1 flex flex-col relative overflow-hidden ${
              isFullScreen ? "overflow-y-auto" : ""
            }`}>
              <div className="absolute bottom-0 left-0 w-full h-40 opacity-35 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_70%)]">
                <AnimatedWave />
              </div>

              {!isSubmitted ? (
                <div className="w-full h-full flex flex-col relative z-10 pb-12">

                  {/* TAB 1: DETAIL KONTAK */}
                  {activeTab === 0 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Nama Lengkap *</label>
                          <input name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Sesuai KTP" />
                        </div>
                        <div>
                          <label className={labelClass}>Nomor WhatsApp *</label>
                          <input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="08xxxxxxxxxx" />
                        </div>
                        <div>
                          <label className={labelClass}>Email *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="email@contoh.com" />
                        </div>
                        <div>
                          <label className={labelClass}>Pekerjaan *</label>
                          <select name="job" value={formData.job} onChange={handleChange} className={inputClass}>
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
                          <input name="ktpNumber" value={formData.ktpNumber} onChange={handleChange} className={inputClass} placeholder="16 digit nomor KTP" maxLength={16} />
                        </div>
                      </div>
                      <div className="pt-6 text-right border-t border-foreground/10">
                        <button type="button" onClick={() => setActiveTab(1)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
                          Lanjut: Alamat Instalasi →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ALAMAT */}
                  {activeTab === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className={labelClass}>Alamat Lengkap *</label>
                          <input name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="Nama jalan, nomor rumah" />
                        </div>
                        <div>
                          <label className={labelClass}>RT/RW *</label>
                          <input name="rtRw" value={formData.rtRw} onChange={handleChange} className={inputClass} placeholder="003/005" />
                        </div>
                        <div>
                          <label className={labelClass}>Kelurahan/Desa *</label>
                          <input name="village" value={formData.village} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Kecamatan *</label>
                          <input name="district" value={formData.district} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Kabupaten/Kota *</label>
                          <input name="city" value={formData.city} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Kode Pos</label>
                          <input name="postalCode" value={formData.postalCode} onChange={handleChange} className={inputClass} maxLength={5} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                        <button type="button" onClick={() => setActiveTab(0)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
                        <button type="button" onClick={() => setActiveTab(2)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
                          Lanjut: Lokasi & Bangunan →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LOKASI & BANGUNAN */}
                  {activeTab === 2 && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div>
                        <label className={labelClass}>Pin Lokasi Rumah *</label>
                        <MapPicker
                          onLocationSelect={(lat, lng, url) =>
                            setFormData(prev => ({ ...prev, latitude: lat, longitude: lng, mapsUrl: url }))
                          }
                          initialLat={formData.latitude}
                          initialLng={formData.longitude}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Jenis Bangunan *</label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                          {BUILDING_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, buildingType: type }))}
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
                        <label className={labelClass}>Status Kepemilikan *</label>
                        <div className="flex gap-3">
                          {OWNERSHIP_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, ownershipStatus: type }))}
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
                        <button type="button" onClick={() => setActiveTab(1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
                        <button type="button" onClick={() => setActiveTab(3)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
                          Lanjut: Paket & Jadwal →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: PAKET & JADWAL */}
                  {activeTab === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div>
                        <label className={labelClass}>Pilih Paket *</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {packages.map((pkg) => (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, packageId: pkg.id }))}
                              className={`p-4 text-left border transition-colors ${
                                formData.packageId === pkg.id
                                  ? "border-foreground bg-foreground/5"
                                  : "border-foreground/20 hover:border-foreground/50"
                              }`}
                            >
                              <div className="font-medium text-sm">{pkg.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                ↓{pkg.speedDown}Mbps / ↑{pkg.speedUp}Mbps
                              </div>
                              <div className="text-sm font-mono mt-2">
                                Rp {pkg.price.toLocaleString('id-ID')}/bln
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-foreground/10">
                        <div>
                          <label className={labelClass}>Tanggal Survey Diinginkan</label>
                          <input type="date" name="surveyDate" value={formData.surveyDate} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Jam Survey</label>
                          <select name="surveyTime" value={formData.surveyTime} onChange={handleChange} className={inputClass}>
                            <option value="">Pilih Jam</option>
                            <option value="08:00-10:00">08:00 - 10:00</option>
                            <option value="10:00-12:00">10:00 - 12:00</option>
                            <option value="13:00-15:00">13:00 - 15:00</option>
                            <option value="15:00-17:00">15:00 - 17:00</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelClass}>Catatan Tambahan</label>
                          <textarea
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleChange}
                            className={`${inputClass} resize-none`}
                            placeholder="Contoh: Rumah pagar warna hitam, masuk gang sebelah masjid"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-foreground/10">
                        <button type="button" onClick={() => setActiveTab(2)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
                        <button type="button" onClick={() => setActiveTab(4)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors">
                          Lanjut: Dokumen →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: DOKUMEN & SUBMIT */}
                  {activeTab === 4 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upload KTP */}
                        <div>
                          <label className={labelClass}>Foto KTP</label>
                          <label className="block cursor-pointer">
                            <div className={`border border-dashed border-foreground/20 hover:border-foreground/50 transition-colors p-6 text-center ${ktpPreview ? 'p-2' : ''}`}>
                              {ktpPreview ? (
                                <div className="relative">
                                  <img src={ktpPreview} alt="KTP" className="w-full h-32 object-cover" />
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); setKtpFile(null); setKtpPreview(null); }}
                                    className="absolute top-1 right-1 bg-background border border-foreground/20 p-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                  <Upload className="w-6 h-6" />
                                  <span className="text-xs font-mono">Klik untuk upload foto KTP</span>
                                  <span className="text-xs">JPG, PNG, WebP — maks 5MB</span>
                                </div>
                              )}
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'ktp')} />
                          </label>
                        </div>

                        {/* Upload Foto Rumah */}
                        <div>
                          <label className={labelClass}>Foto Depan Rumah</label>
                          <label className="block cursor-pointer">
                            <div className={`border border-dashed border-foreground/20 hover:border-foreground/50 transition-colors p-6 text-center ${housePreview ? 'p-2' : ''}`}>
                              {housePreview ? (
                                <div className="relative">
                                  <img src={housePreview} alt="Rumah" className="w-full h-32 object-cover" />
                                  <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); setHouseFile(null); setHousePreview(null); }}
                                    className="absolute top-1 right-1 bg-background border border-foreground/20 p-1"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                  <Upload className="w-6 h-6" />
                                  <span className="text-xs font-mono">Klik untuk upload foto rumah</span>
                                  <span className="text-xs">JPG, PNG, WebP — maks 5MB</span>
                                </div>
                              )}
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'house')} />
                          </label>
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="flex items-start gap-3 py-4 border-t border-foreground/10">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-0.5"
                        />
                        <label className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          Saya menyatakan telah membaca dan setuju dengan syarat dan ketentuan layanan Sicakra, serta menyatakan bahwa seluruh informasi yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
                        </label>
                      </div>

                      {submitError && (
                        <div className="p-4 border border-red-500/20 bg-red-500/5 text-sm text-red-500 font-mono">
                          {submitError}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                        <button type="button" onClick={() => setActiveTab(3)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Kembali</button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!formData.agreeTerms || isSubmitting}
                          className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono hover:bg-foreground/90 transition-colors disabled:opacity-30 flex items-center gap-2"
                        >
                          {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
                          {isSubmitting ? 'Mengirim...' : 'Kirim Formulir'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center h-full relative z-20">
                  <div className="w-16 h-16 border border-foreground rounded-full flex items-center justify-center bg-foreground/5 mb-2">
                    <Check className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-3xl font-display tracking-tight">Pendaftaran Terkirim!</h3>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Terima kasih <span className="text-foreground font-bold">{formData.fullName}</span>! Tim kami akan menghubungi kamu via WhatsApp di nomor <span className="text-foreground">{formData.phone}</span> dalam 1x24 jam.
                  </p>
                  <div className="pt-6 flex gap-3">
                    <Link href="/" className="px-6 py-3 text-xs font-mono border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors">
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}