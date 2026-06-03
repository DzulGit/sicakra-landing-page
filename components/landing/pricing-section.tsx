"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Sicakra Lite",
    description: "Cocok untuk mahasiswa, kontrakan, atau penggunaan 1-3 perangkat",
    price: { monthly: 250000, annual: 240000 },
    features: [
      "Kecepatan up to 30 Mbps",
      "100% True Unlimited (Tanpa FUP)",
      "Download / Upload Simetris (1:1)",
      "Gratis Pinjam Modem Dual-Band",
      "Dukungan Teknisi via WA",
    ],
    cta: "Pilih Paket Lite",
    popular: false,
  },
  {
    name: "Sicakra Reguler",
    description: "Paling pas untuk kebutuhan keluarga ceria dan streaming 4K bersamaan",
    price: { monthly: 350000, annual: 335000 },
    features: [
      "Kecepatan up to 50 Mbps",
      "100% True Unlimited (Tanpa FUP)",
      "Download / Upload Simetris (1:1)",
      "Gratis Pinjam Modem Dual-Band",
      "Prioritas Jalur Game & Streaming",
      "Respon Teknisi < 4 Jam",
    ],
    cta: "Pasang Sekarang",
    popular: true,
  },
  {
    name: "Sicakra Pro",
    description: "Kapasitas besar untuk kebutuhan bisnis, kafe, atau kantor lokal",
    price: { monthly: 550000, annual: 525000 },
    features: [
      "Kecepatan up to 100 Mbps",
      "100% True Unlimited (Tanpa FUP)",
      "Download / Upload Simetris (1:1)",
      "Premium Router & Akses Poin Tambahan",
      "Alokasi Bandwidth Bisnis Khusus",
      "Layanan Prioritas 24/7 Dedikasi",
      "Garansi Uptime Jaringan SLA",
    ],
    cta: "Hubungi Penjualan",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

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
            Pilih kecepatan sesuai kebutuhanmu. Flat selamanya, tanpa biaya tersembunyi, tanpa kejutan tagihan.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className={`text-sm transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
          >
            Bayar Bulanan
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-foreground/10 rounded-full p-1 transition-colors hover:bg-foreground/20"
          >
            <div
              className={`w-5 h-5 bg-foreground rounded-full transition-transform duration-300 ${isAnnual ? "translate-x-7" : "translate-x-0"
                }`}
            />
          </button>
          <span
            className={`text-sm transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"
              }`}
          >
            Langganan 1 Tahun
          </span>
          {isAnnual && (
            <span className="ml-2 px-2 py-1 bg-foreground text-primary-foreground text-xs font-mono">
              Hemat hingga 5%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
                }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Paling Populer
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-display text-foreground mr-1">Rp</span>
                  <span className="font-display text-4xl lg:text-5xl text-foreground">
                    {(isAnnual ? plan.price.annual : plan.price.monthly).toLocaleString("id-ID")}
                  </span>
                  <span className="text-muted-foreground text-sm">/bulan</span>
                </div>
                {isAnnual && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    * Ditagih sekaligus di awal tahun
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${plan.popular
                  ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                  : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Semua paket sudah termasuk gratis biaya sewa modem ONT, instalasi kabel jalur utama, dan proteksi jaringan berkelanjutan.{" "}
          <a href="registrations" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Daftar pasang sekarang
          </a>
        </p>
      </div>
    </section>
  );
}
