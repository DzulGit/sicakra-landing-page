"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  { label: "01. Data Diri", code: "" },
  { label: "02. Pilih Paket", code: "" },
  { label: "03. Lokasi Pasang", code: "" },
];

const features = [
  {
    title: "Proses Instan",
    description: "Isi form dalam 2 menit, tim langsung konfirmasi via WA."
  },
  {
    title: "Tanpa Biaya Siluman",
    description: "Harga paket transparan, sudah termasuk sewa modem."
  },
  {
    title: "Jadwal Fleksibel",
    description: "Tentukan sendiri waktu kunjungan teknisi ke rumah."
  },
  {
    title: "100% Fiber Optik",
    description: "Jaringan kabel murni, stabil dalam segala cuaca."
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // --- HOOKS & HANDLERS SEKARANG SUDAH AMAN DI DALAM KOMPONEN ---
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    package: "30-mbps",
    address: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="registrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Pendaftaran Baru
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Mulai Langkahmu.
              <br />
              <span className="text-muted-foreground">Gabung Sicakra.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Nikmati kebebasan internetan tanpa batas di area Yogyakarta. Cukup ikuti simulasi langkah di samping dan daftarkan rumah atau bisnismu sekarang.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <div className="border border-foreground/10">
              {/* Tabs */}
              <div className="flex items-center border-b border-foreground/10">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${activeTab === idx
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code content diubah jadi Form Interaktif */}
              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[280px] flex flex-col justify-between">
                {!isSubmitted ? (
                  <div className="space-y-4">
                    {/* TAB 1: DATA DIRI */}
                    {activeTab === 0 && (
                      <div className="space-y-4">
                        <p className="text-xs text-muted-foreground">// Masukkan data kontak Anda</p>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Nama Lengkap</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Contoh: Budi Santoso"
                            className="w-full bg-transparent border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Nomor WhatsApp</label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="Contoh: 08123456789"
                            className="w-full bg-transparent border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab(1)}
                          disabled={!formData.name || !formData.whatsapp}
                          className="mt-2 text-xs text-foreground underline underline-offset-4 disabled:opacity-30"
                        >
                          Lanjut ke Pilih Paket →
                        </button>
                      </div>
                    )}

                    {/* TAB 2: PILIH PAKET */}
                    {activeTab === 1 && (
                      <div className="space-y-4">
                        <p className="text-xs text-muted-foreground">// Pilih kecepatan internet rumahmu</p>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Paket Layanan</label>
                          <select
                            name="package"
                            value={formData.package}
                            onChange={handleInputChange}
                            className="w-full bg-background border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors cursor-pointer"
                          >
                            <option value="30-mbps">Sicakra Lite - 30 Mbps (Rp250.000/bln)</option>
                            <option value="50-mbps">Sicakra Reguler - 50 Mbps (Rp350.000/bln)</option>
                            <option value="100-mbps">Sicakra Pro - 100 Mbps (Rp550.000/bln)</option>
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <button type="button" onClick={() => setActiveTab(0)} className="text-xs text-muted-foreground underline">← Kembali</button>
                          <button type="button" onClick={() => setActiveTab(2)} className="text-xs text-foreground underline underline-offset-4">Lanjut ke Alamat →</button>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: LOKASI PASANG */}
                    {activeTab === 2 && (
                      <div className="space-y-4">
                        <p className="text-xs text-muted-foreground">// Info koordinat penarikan kabel fiber optik</p>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Alamat Lengkap (Sleman/Jogja)</label>
                          <textarea
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan."
                            className="w-full bg-transparent border border-foreground/10 px-4 py-3 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors resize-none"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <button type="button" onClick={() => setActiveTab(1)} className="text-xs text-muted-foreground underline">← Kembali</button>
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Data Registrasi Sicakra:", formData);
                              setIsSubmitted(true);
                            }}
                            disabled={!formData.address}
                            className="px-4 py-2 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30"
                          >
                            Kirim Formulir 🟢
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* TAMPILAN SUKSES */
                  <div className="text-center py-6 space-y-3">
                    <div className="w-10 h-10 border border-foreground rounded-full flex items-center justify-center mx-auto bg-foreground/5">
                      <Check className="w-4 h-4 text-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Data Terkirim!</h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Halo <span className="text-foreground font-bold">{formData.name}</span>, lokasi pasangmu sedang dicek oleh tim area Sleman. Kami akan segera kabari lewat WhatsApp!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setActiveTab(0);
                        setFormData({ name: "", whatsapp: "", package: "30-mbps", address: "" });
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground underline pt-2"
                    >
                      Isi ulang form
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="https://wa.me/nomor-wa-sicakra" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-4">
                Hubungi CS via WhatsApp
              </a>
              <span className="text-foreground/20">|</span>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground">
                Lihat Detail Harga Paket
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}