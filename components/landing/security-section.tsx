"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Enkripsi Wi-Fi Aman",
    description: "Perangkat dilengkapi protokol keamanan WPA3 terbaru untuk mencegah pembajakan sandi Wi-Fi Anda.",
  },
  {
    icon: Lock,
    title: "Proteksi Malware & Phishing",
    description: "Penyaringan jaringan otomatis untuk memblokir situs berbahaya dan mengamankan data transaksi Anda.",
  },
  {
    icon: Eye,
    title: "Privasi Data Terjamin",
    description: "Kami berkomitmen menjaga privasi aktivitas digital Anda tanpa melacak atau menjual data penjelajahan.",
  },
  {
    icon: FileCheck,
    title: "Izin Resmi Kominfo",
    description: "Sicakra beroperasi penuh di bawah lisensi resmi ISP nasional, menjamin layanan yang legal dan patuh hukum.",
  },
];

const certifications = ["KOMINFO", "WPA3 SECURE", "ISP RESMI", "BRTI", "FIBER OPTIC"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Keamanan & Legalitas
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Keamanan Anda
              <br />
              Prioritas Kami.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Internet cepat saja tidak cukup. Sicakra memberikan perlindungan berlapis pada jaringan Wi-Fi Anda, memastikan seluruh aktivitas digital keluarga dan bisnis berjalan aman tanpa cemas.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-mono transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
