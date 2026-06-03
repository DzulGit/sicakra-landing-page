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
    // Karena form interaktif, fungsi copy bisa disesuaikan, atau biarkan kosong sesuai array codeExamples
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
    <section 
      id="registrations" 
      ref={sectionRef} 
      className="relative min-h-screen py-24 flex flex-col justify-center overflow-hidden bg-background"
    >
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12 space-y-16">
        
        {/* TOP: Header Content */}
        <div
          className={`flex flex-col items-center text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Pendaftaran Baru
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Mulai Langkahmu.<br />
            <span className="text-muted-foreground">Gabung Sicakra.</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Nikmati kebebasan internetan tanpa batas di area Yogyakarta. Cukup ikuti simulasi langkah di bawah dan daftarkan rumah atau bisnismu sekarang.
          </p>
        </div>

        {/* MIDDLE: Interactive Form (Code Block Style) */}
        <div
          className={`w-full max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="border border-foreground/10 bg-background/50 backdrop-blur-sm shadow-2xl">
            {/* Tabs */}
            <div className="flex flex-wrap items-center border-b border-foreground/10 bg-foreground/[0.02]">
              {codeExamples.map((example, idx) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-4 text-sm font-mono transition-colors relative flex-1 sm:flex-none text-center ${
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
              <div className="hidden sm:flex flex-1" />
              <button
                type="button"
                onClick={handleCopy}
                className="hidden sm:flex px-6 py-4 text-muted-foreground hover:text-foreground transition-colors border-l border-foreground/10"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 lg:p-12 font-mono text-sm bg-foreground/[0.01] min-h-[320px] flex flex-col justify-center">
              {!isSubmitted ? (
                <div className="max-w-2xl mx-auto w-full space-y-6">
                  {/* TAB 1: DATA DIRI */}
                  {activeTab === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <p className="text-xs text-muted-foreground">// Masukkan data kontak Anda</p>
                      <div className="grid sm:grid-cols-2 gap-6">
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
                      </div>
                      <div className="pt-4 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveTab(1)}
                          disabled={!formData.name || !formData.whatsapp}
                          className="px-6 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30"
                        >
                          Lanjut: Pilih Paket →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PILIH PAKET */}
                  {activeTab === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <p className="text-xs text-muted-foreground">// Pilih kecepatan internet rumahmu</p>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Paket Layanan</label>
                        <select
                          name="package"
                          value={formData.package}
                          onChange={handleInputChange}
                          className="w-full bg-background border border-foreground/10 px-4 py-4 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors cursor-pointer"
                        >
                          <option value="30-mbps">Sicakra Lite - 30 Mbps (Rp250.000/bln)</option>
                          <option value="50-mbps">Sicakra Reguler - 50 Mbps (Rp350.000/bln)</option>
                          <option value="100-mbps">Sicakra Pro - 100 Mbps (Rp550.000/bln)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <button type="button" onClick={() => setActiveTab(0)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          ← Kembali
                        </button>
                        <button
                          type="button" 
                          onClick={() => setActiveTab(2)} 
                          className="px-6 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors"
                        >
                          Lanjut: Lokasi Pasang →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LOKASI PASANG */}
                  {activeTab === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <p className="text-xs text-muted-foreground">// Info koordinat penarikan kabel fiber optik</p>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-muted-foreground">Alamat Lengkap (Sleman/Jogja)</label>
                        <textarea
                          name="address"
                          rows={4}
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan."
                          className="w-full bg-transparent border border-foreground/10 px-4 py-4 text-sm focus:outline-none focus:border-foreground/40 text-foreground transition-colors resize-none"
                        />
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <button type="button" onClick={() => setActiveTab(1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                          ← Kembali
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Data Registrasi Sicakra:", formData);
                            setIsSubmitted(true);
                          }}
                          disabled={!formData.address}
                          className="px-6 py-3 border border-foreground bg-foreground text-background text-xs font-mono font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30"
                        >
                          Kirim Formulir 🟢
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* TAMPILAN SUKSES */
                <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 border border-foreground rounded-full flex items-center justify-center mx-auto bg-foreground/5 mb-6">
                    <Check className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-display tracking-tight">Data Terkirim!</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Halo <span className="text-foreground font-bold">{formData.name}</span>, lokasi pasangmu sedang dicek oleh tim area Sleman. Kami akan segera kabari lewat WhatsApp!
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setActiveTab(0);
                        setFormData({ name: "", whatsapp: "", package: "30-mbps", address: "" });
                      }}
                      className="px-6 py-3 text-xs font-mono border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      Isi ulang form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Links Below Form */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            <a href="https://wa.me/nomor-wa-sicakra" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline underline-offset-4">
              Hubungi CS via WhatsApp
            </a>
            <span className="hidden sm:block text-foreground/20">|</span>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">
              Lihat Detail Harga Paket
            </a>
          </div>
        </div>

        {/* BOTTOM: Features Grid */}
        <div className="pt-12 border-t border-foreground/10 w-full max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center sm:text-left">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <div className="w-8 h-px bg-foreground mb-4 mx-auto sm:mx-0" />
                <h3 className="font-medium mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}