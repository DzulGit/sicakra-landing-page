"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "01. Data Diri",
    code: `> INPUT CUSTOMER DATA...

Nama      : [Wajib Diisi]
WhatsApp  : [Wajib Diisi]
Lokasi    : Sleman, Yogyakarta

* Pastikan nomor WhatsApp aktif untuk konfirmasi teknisi.`,
  },
  {
    label: "02. Pilih Paket",
    code: `> SELECT INTERNET PLAN...

[ ] Sicakra Lite  - 30 Mbps
[ ] Sicakra Reguler - 50 Mbps
[ ] Sicakra Pro     - 100 Mbps

* Semua paket True Unlimited tanpa batasan FUP.`,
  },
  {
    label: "03. Pasang",
    code: `> DEPLOYING TECHNICIAN...

Status Jaringan : Tersedia (Fiber Optik)
Estimasi Kerja  : Max 24 Jam setelah registrasi
Biaya Registrasi: Rp 0 (Gratis Alat & Jalur)

Ketik "GAS" untuk konfirmasi penjadwalan.`,
  },
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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
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

              {/* Code content */}
              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[220px]">
                <pre className="text-foreground/80">
                  {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className="dev-code-char"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
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
