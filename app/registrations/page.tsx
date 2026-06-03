"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AnimatedWave } from "./../../components/landing/animated-wave";

const codeExamples = [
  { label: "01. Detail Kontak" },
  { label: "02. Alamat Instalasi" },
  { label: "03. Pesanan" },
];

export default function RegistrationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    segmenPelanggan: "Retail (B2C)",
    lob: "HOME",
    kategoriPelanggan: "REGULAR",
    idJenis: "",
    nomorId: "",
    namaDepan: "",
    namaBelakang: "",
    jenisKelamin: "",
    tanggalLahir: "",
    pekerjaan: "",
    nomorSeluler: "",
    nomorRumah: "",
    email: "",
    bahasa: "Indonesia",
    alamat1: "",
    alamat2: "",
    alamat3: "",
    alamat4: "",
    alamat5: "",
    kelurahan: "",
    kecamatan: "",
    kabKota: "",
    kodePos: "",
    provinsi: "",
    negaraAlamat: "Indonesia",
    tanggalPemesanan: "",
    tanggalInstalasi: "",
    kodeReferal: "",
    catatanPesanan: "",
    syaratKetentuan: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

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
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullScreen]);

  const inputClass = "w-full bg-transparent border border-foreground/10 px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors relative z-20";
  const labelClass = "block text-[11px] uppercase tracking-wider mb-1.5 text-muted-foreground relative z-20";

  return (
    <section
      id="registrations"
      ref={sectionRef}
      className={`relative bg-background flex flex-col transition-all duration-700 ease-in-out ${
        isFullScreen ? "h-screen w-full overflow-hidden" : "min-h-screen pt-20 pb-8"
      }`}
    >
      <div className="relative z-10 w-full flex-1 flex flex-col mx-auto transition-all duration-700 ease-in-out">
        
        <div
          className={`flex flex-col items-center text-center mx-auto transition-all duration-700 ease-in-out ${
            isFullScreen ? "opacity-0 h-0 overflow-hidden m-0 p-0" : "opacity-100 h-auto mb-10"
          }`}
        >
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

        <div
          className={`flex-1 transition-all duration-700 ease-in-out flex flex-col ${
            isFullScreen ? "w-full px-0" : "max-w-6xl w-full px-6 mx-auto"
          }`}
        >
          <div
            className={`bg-background/80 backdrop-blur-sm flex flex-col transition-all duration-700 ease-in-out h-full relative z-10 ${
              isFullScreen
                ? "border-0"
                : "border border-foreground/10 shadow-2xl"
            }`}
          >
            <div className="flex items-center border-b border-foreground/10 bg-background/95 backdrop-blur-md overflow-x-auto relative z-30">
              <Link
                href="/"
                className="px-6 py-4 flex items-center gap-2 text-sm font-mono border-r border-foreground/10 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </Link>
              
              <div className="flex flex-1">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative flex-1 text-center whitespace-nowrap ${
                      activeTab === idx
                        ? "text-foreground bg-foreground/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-6 lg:p-8 font-mono text-sm bg-foreground/[0.01] flex-1 flex flex-col relative overflow-hidden ${isFullScreen ? "overflow-y-auto" : ""}`}>
              
              {/* Efek Wave dengan mask-image agar transisi smooth dan z-0 agar di belakang form */}
              <div className="absolute bottom-0 left-0 w-full h-40 md:h-56 opacity-10 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_70%)]">
                <AnimatedWave />
              </div>

              {!isSubmitted ? (
                /* Tambahan pb-12 dan z-10 memastikan form ada di atas wave dan tidak terlalu mepet bawah */
                <div className="w-full h-full flex flex-col relative z-10 pb-12">
                  {/* TAB 1: DETAIL KONTAK */}
                  {activeTab === 0 && (
                    <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-500">
                      <div className="space-y-6 relative z-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className={labelClass}>Segmen Pelanggan *</label>
                            <input type="text" name="segmenPelanggan" value={formData.segmenPelanggan} readOnly className={`${inputClass} opacity-70`} />
                          </div>
                          <div>
                            <label className={labelClass}>LOB *</label>
                            <input type="text" name="lob" value={formData.lob} readOnly className={`${inputClass} opacity-70`} />
                          </div>
                          <div>
                            <label className={labelClass}>Kategori Pelanggan *</label>
                            <input type="text" name="kategoriPelanggan" value={formData.kategoriPelanggan} readOnly className={`${inputClass} opacity-70`} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-foreground/10">
                          <div>
                            <label className={labelClass}>ID Jenis *</label>
                            <select name="idJenis" value={formData.idJenis} onChange={handleInputChange} className={inputClass}>
                              <option value="">Pilih ID</option>
                              <option value="KTP">KTP</option>
                              <option value="SIM">SIM</option>
                              <option value="PASPOR">PASPOR</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Nomor ID *</label>
                            <input type="text" name="nomorId" value={formData.nomorId} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Nama Depan *</label>
                            <input type="text" name="namaDepan" value={formData.namaDepan} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Nama Belakang</label>
                            <input type="text" name="namaBelakang" value={formData.namaBelakang} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Jenis Kelamin</label>
                            <select name="jenisKelamin" value={formData.jenisKelamin} onChange={handleInputChange} className={inputClass}>
                              <option value="">Pilih Kelamin</option>
                              <option value="L">Laki-laki</option>
                              <option value="P">Perempuan</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Tanggal Lahir *</label>
                            <input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Pekerjaan</label>
                            <select name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} className={inputClass}>
                              <option value="">Pilih Pekerjaan</option>
                              <option value="Karyawan">Karyawan</option>
                              <option value="Wiraswasta">Wiraswasta</option>
                              <option value="Pelajar">Pelajar</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Bahasa Disukai</label>
                            <select name="bahasa" value={formData.bahasa} onChange={handleInputChange} className={inputClass}>
                              <option value="Indonesia">Indonesia</option>
                              <option value="English">English</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-foreground/10">
                          <div>
                            <label className={labelClass}>Nomor Seluler *</label>
                            <input type="tel" name="nomorSeluler" value={formData.nomorSeluler} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Nomor Rumah</label>
                            <input type="tel" name="nomorRumah" value={formData.nomorRumah} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} />
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 text-right border-t border-foreground/10 mt-6 relative z-20">
                        <button type="button" onClick={() => setActiveTab(1)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors cursor-pointer">
                          Lanjut: Alamat Instalasi →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ALAMAT INSTALASI */}
                  {activeTab === 1 && (
                    <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-500 relative z-20">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div><label className={labelClass}>Alamat 1</label><input type="text" name="alamat1" value={formData.alamat1} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Kelurahan/Desa</label><input type="text" name="kelurahan" value={formData.kelurahan} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Alamat 2</label><input type="text" name="alamat2" value={formData.alamat2} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Kecamatan</label><input type="text" name="kecamatan" value={formData.kecamatan} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Alamat 3</label><input type="text" name="alamat3" value={formData.alamat3} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Kab/Kota</label><input type="text" name="kabKota" value={formData.kabKota} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Alamat 4</label><input type="text" name="alamat4" value={formData.alamat4} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Provinsi</label><input type="text" name="provinsi" value={formData.provinsi} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Alamat 5</label><input type="text" name="alamat5" value={formData.alamat5} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Kode Pos</label><input type="text" name="kodePos" value={formData.kodePos} onChange={handleInputChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Negara</label><input type="text" name="negaraAlamat" value={formData.negaraAlamat} readOnly className={`${inputClass} opacity-70`} /></div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-foreground/10 mt-auto relative z-20">
                        <button type="button" onClick={() => setActiveTab(0)} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative z-30">← Kembali</button>
                        <button type="button" onClick={() => setActiveTab(2)} className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors cursor-pointer">
                          Lanjut: Pesanan →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PESANAN */}
                  {activeTab === 2 && (
                    <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-500 relative z-20">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-foreground/10 pb-6">
                          <div>
                            <label className={labelClass}>Tanggal Pemesanan *</label>
                            <input type="date" name="tanggalPemesanan" value={formData.tanggalPemesanan} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Tanggal Instalasi *</label>
                            <input type="date" name="tanggalInstalasi" value={formData.tanggalInstalasi} onChange={handleInputChange} className={inputClass} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClass}>Kode Referal (Opsional)</label>
                            <input type="text" name="kodeReferal" value={formData.kodeReferal} onChange={handleInputChange} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Catatan Pesanan</label>
                            <textarea name="catatanPesanan" rows={2} value={formData.catatanPesanan} onChange={handleInputChange} className={`${inputClass} resize-none`} />
                          </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                          <input type="checkbox" name="syaratKetentuan" checked={formData.syaratKetentuan} onChange={handleInputChange} className="mt-0.5 relative z-20" />
                          <label className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                            Dengan ini saya menyatakan telah membaca dan setuju akan syarat dan ketentuan yang berlaku, serta menyatakan bahwa informasi yang saya berikan adalah benar.
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-foreground/10 mt-auto relative z-20">
                        <button type="button" onClick={() => setActiveTab(1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative z-30">← Kembali</button>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Data Registrasi Baru:", formData);
                              setIsSubmitted(true);
                            }}
                            disabled={!formData.syaratKetentuan}
                            className="px-8 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30 cursor-pointer"
                          >
                            Kirim Formulir
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center h-full relative z-20">
                  <div className="w-16 h-16 border border-foreground rounded-full flex items-center justify-center bg-foreground/5 mb-2">
                    <Check className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-3xl font-display tracking-tight">Data Terkirim</h3>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Pesanan untuk <span className="text-foreground font-bold">{formData.namaDepan}</span> telah dicatat.
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setActiveTab(0);
                      }}
                      className="px-6 py-3 text-xs font-mono border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                    >
                      Isi ulang form
                    </button>
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