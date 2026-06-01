"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import RegistrationModal from "@/components/landing/registration-modal";

const BASE = "https://wifi-backend-978253671723.asia-southeast2.run.app";

type PackageItem = {
  id: string | number;
  name: string;
  speed?: number | string;
  price?: number;
  description?: string;
};

function formatRupiah(amount?: number) {
  if (amount == null) return "-";
  try {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
  } catch (e) {
    return String(amount);
  }
}

export function PricingSection() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<PackageItem | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE}/packages`, { signal: ac.signal });
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        if (mounted) setPackages(data);
      } catch (err: any) {
        if (!ac.signal.aborted) setError(err?.message ?? "Failed to load packages");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
      ac.abort();
    };
  }, []);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Paket
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Pilih paket
            <br />
            <span className="text-stroke">Sicakra untuk rumah & bisnis</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">Paket transparan dengan kecepatan yang jelas dan pemasangan cepat.</p>
        </div>

        {loading && <p className="text-muted-foreground">Memuat paket...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {packages.length === 0 && !loading ? (
            <div className="p-8 bg-background">Tidak ada paket tersedia saat ini.</div>
          ) : (
            packages.map((pkg) => (
              <div key={pkg.id} className="relative p-8 lg:p-12 bg-background">
                <div className="mb-8">
                  <span className="font-mono text-xs text-muted-foreground">{String(pkg.id)}</span>
                  <h3 className="font-display text-3xl text-foreground mt-2">{pkg.name}</h3>
                  {pkg.description && <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>}
                </div>

                <div className="mb-8 pb-8 border-b border-foreground/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl lg:text-6xl text-foreground">{pkg.speed ?? "-"} <span className="text-sm">Mbps</span></span>
                  </div>
                  <div className="mt-3">
                    <span className="font-display text-3xl text-foreground">{formatRupiah(pkg.price)}</span>
                    <span className="text-muted-foreground"> / bulan</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>

                <button
                  onClick={() => {
                    setSelected(pkg);
                    setOpen(true);
                  }}
                  className="w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                >
                  Pilih Paket
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))
          )}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">Semua paket termasuk dukungan teknisi dan garansi pemasangan.</p>
      </div>

      {/* Registration Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        {selected && (
          <RegistrationModal
            packageItem={selected}
            onClose={() => {
              setOpen(false);
              setSelected(null);
            }}
          />
        )}
      </Dialog>
    </section>
  );
}
