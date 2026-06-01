"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

// Minimal animation CSS placeholder preserved from the original template.
const codeAnimationStyles = `
/* Code block animation placeholders - keep empty or add safe rules here */
.code-fade-in { opacity: 0; transform: translateY(6px); transition: all .3s ease; }
`;

const infraFeatures = [
  {
    title: "Router Wi‑Fi 6",
    description: "Perangkat terbaru mendukung throughput tinggi dan banyak perangkat terhubung sekaligus.",
  },
  {
    title: "Rasio Simetris 1:1",
    description: "Upload dan download seimbang untuk kebutuhan cloud, backup, dan video conference.",
  },
  {
    title: "Latency Rendah",
    description: "Jaringan backbone fiber dengan peering optimal untuk ping stabil.",
  },
  {
    title: "SLA & Support",
    description: "Layanan teknisi cepat dan dukungan 24/7 untuk pelanggan premium.",
  },
];

export function DevelopersSection() {
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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Infrastruktur
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Infrastruktur Fiber Optic
              <br />
              <span className="text-muted-foreground">Performa dan keandalan untuk kebutuhan internet Anda</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Sicakra menghadirkan jaringan fiber backbone, router Wi‑Fi 6, dan tim teknisi profesional untuk memastikan koneksi rumah dan bisnis Anda selalu optimal.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {infraFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Infrastructure illustration */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10 p-8 bg-background min-h-[220px]">
              <h4 className="text-lg font-medium mb-4">Spesifikasi Teknis</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li>Router: Wi‑Fi 6 (AX) standar terbaru</li>
                <li>Rasio: 1:1 symmetric bandwidth</li>
                <li>Backbone: Fiber optik dengan peering internasional</li>
                <li>Latency: rata‑rata <strong>&lt;20ms</strong> pada rute domestik</li>
              </ul>

              <div className="mt-6">
                <a href="#pricing" className="text-foreground hover:underline">Lihat paket & harga</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
