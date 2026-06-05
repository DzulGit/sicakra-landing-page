"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { getPackages, type Package } from "@/lib/api";

export function PricingSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPackages()
      .then(setPackages)
      .catch(() => setError('Gagal memuat paket. Silakan refresh halaman.'))
      .finally(() => setLoading(false));
  }, []);

  const handlePilihPaket = (packageId: string) => {
    // Simpan packageId ke sessionStorage lalu redirect ke form registrasi
    sessionStorage.setItem('selectedPackageId', packageId);
    window.location.href = '/registrations';
  };

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Daftar Paket
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Harga simpel,
            <br />
            <span className="text-stroke">transparan.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Pilih kecepatan sesuai kebutuhanmu. Flat selamanya, tanpa biaya
            tersembunyi, tanpa kejutan tagihan.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* Pricing Cards */}
        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {packages.map((pkg, idx) => {
                const isPopular = idx === Math.floor(packages.length / 2);
                return (
                  <div
                    key={pkg.id}
                    className={`relative p-8 lg:p-12 bg-background ${isPopular
                      ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground z-10"
                      : ""
                      }`}
                  >
                    {isPopular && (
                      <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                        Paling Populer
                      </span>
                    )}

                    {/* Plan Header */}
                    <div className="mb-8">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-3xl text-foreground mt-2">
                        {pkg.name}
                      </h3>
                      {pkg.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {pkg.description}
                        </p>
                      )}
                    </div>

                    {/* Speed Badge */}
                    <div className="mb-4 flex gap-3">
                      <span className="text-xs font-mono px-2 py-1 border border-foreground/10 text-muted-foreground">
                        ↓ {pkg.speedDown} Mbps
                      </span>
                      <span className="text-xs font-mono px-2 py-1 border border-foreground/10 text-muted-foreground">
                        ↑ {pkg.speedUp} Mbps
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-8 pb-8 border-b border-foreground/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-display text-foreground mr-1">
                          Rp
                        </span>
                        <span className="font-display text-4xl lg:text-5xl text-foreground">
                          {pkg.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /bulan
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => handlePilihPaket(pkg.id)}
                      className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${isPopular
                        ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                        : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                        }`}
                    >
                      Pilih Paket
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                );
              })}

              {packages.length % 3 !== 0 &&
                [...Array(3 - (packages.length % 3))].map((_, i) => (
                  <div key={`blank-${i}`} className="hidden md:block bg-background p-8 lg:p-12" />
                ))
              }
            </div>

            {/* Empty state */}
            {packages.length === 0 && (
              <div className="text-center py-24">
                <p className="text-muted-foreground">
                  Belum ada paket tersedia saat ini.
                </p>
              </div>
            )}

            {/* Bottom Note */}
            <p className="mt-12 text-center text-sm text-muted-foreground">
              Semua paket sudah termasuk gratis biaya sewa modem ONT, instalasi
              kabel jalur utama, dan proteksi jaringan berkelanjutan. {" "}
              <a
                href="/registrations"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Daftar pasang sekarang
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}