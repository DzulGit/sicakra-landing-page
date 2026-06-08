"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ArrowLeft, Maximize2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedWave } from "@/components/landing/animated-wave";
import { getPackages, submitRegistration, uploadFile, type Package } from "@/lib/api";

// Import komponen modular anak asuhan kita kemarin (Tetap Aman)
import { StepContact } from "@/components/register/steps/StepContact";
import { StepAddress } from "@/components/register/steps/StepAddress";
import { StepLocation } from "@/components/register/steps/StepLocation";
import { StepPackage } from "@/components/register/steps/StepPackage";
import { StepDocuments } from "@/components/register/steps/StepDocuments";

const TABS = [
  { label: "01. Kontak" },
  { label: "02. Alamat" },
  { label: "03. Lokasi" },
  { label: "04. Paket" },
  { label: "05. Dokumen" },
];

export default function RegistrationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // 🔘 STATE FOCUS MODE (EXPANSION)
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [houseFile, setHouseFile] = useState<File | null>(null);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [housePreview, setHousePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "", job: "", ktpNumber: "",
    address: "", rtRw: "", village: "", district: "", city: "", postalCode: "",
    latitude: 0, longitude: 0, mapsUrl: "",
    buildingType: "", ownershipStatus: "", packageId: "", notes: "", agreeTerms: false,
  });

  // Ambil data paket awal
  useEffect(() => {
    getPackages().then(setPackages).catch(console.error);
    const savedPackageId = sessionStorage.getItem('selectedPackageId');
    if (savedPackageId) {
      setFormData(prev => ({ ...prev, packageId: savedPackageId }));
      sessionStorage.removeItem('selectedPackageId');
    }
  }, []);

  // 🧠 DETEKSI SCROLL JALUR CEPAT: Begitu scroll turun dikit, langsung kunci Fullscreen Focus Mode
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15 && !isFullScreen && !isSubmitted) {
        setIsFullScreen(true);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFullScreen, isSubmitted]);

  // Kunci scroll body utama laptop biar user gak off-side keluar form
  useEffect(() => {
    document.body.style.overflow = isFullScreen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isFullScreen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "ktp" | "house") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (type === "ktp") { setKtpFile(file); setKtpPreview(preview); } 
    else { setHouseFile(file); setHousePreview(preview); }
  };

  const handleClearFile = (e: React.MouseEvent, type: "ktp" | "house") => {
    e.preventDefault();
    if (type === "ktp") { setKtpFile(null); setKtpPreview(null); } 
    else { setHouseFile(null); setHousePreview(null); }
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
        ...formData,
        ktpPhotoUrl,
        housePhotoUrl,
        buildingType: formData.buildingType as any,
        ownershipStatus: formData.ownershipStatus as any,
      });
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Terjadi kesalahan server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-transparent border border-foreground/10 px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 text-foreground font-mono transition-colors";
  const labelClass = "block text-[11px] uppercase tracking-wider mb-1.5 text-muted-foreground font-mono";

  return (
    <section 
      className={cn(
        "bg-background bg-dot-grid transition-all duration-500 ease-in-out",
        isFullScreen 
          ? "fixed inset-0 z-50 w-screen h-screen overflow-hidden flex flex-col p-0 m-0" 
          : "relative min-h-screen pt-20 pb-12 flex flex-col"
      )}
    >
      <div 
        className={cn(
          "w-full flex-1 flex flex-col mx-auto transition-all duration-500 ease-in-out h-full",
          isFullScreen ? "max-w-full px-0" : "max-w-6xl px-6"
        )}
      >
        
        {/* Title Header: Otomatis menyusut hilang dengan transisi halus pas masuk mode fullscreen */}
        <div 
          className={cn(
            "flex flex-col items-center text-center mx-auto transition-all duration-500 ease-out",
            isFullScreen ? "opacity-0 scale-95 h-0 overflow-hidden mb-0" : "opacity-100 scale-100 mb-10"
          )}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            Pendaftaran Baru Sicakra WiFi
          </span>
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
            Isi Data Pemasangan.<br />
            <span className="text-muted-foreground">Scroll ke bawah untuk fokus.</span>
          </h2>
        </div>

        {/* Boks Utama Formulir */}
        <div 
          className={cn(
            "bg-background flex flex-col border border-foreground/10 transition-all duration-500 ease-in-out flex-1 relative z-10",
            isFullScreen ? "border-0 w-full h-full" : "shadow-2xl rounded-sm"
          )}
        >
          {/* Tabs Bar Atas Navigasi */}
          <div className="flex items-center border-b border-foreground/10 bg-background/95 backdrop-blur-sm shrink-0">
            <button 
              onClick={() => {
                if (isFullScreen) {
                  setIsFullScreen(false);
                } else {
                  window.location.href = "/";
                }
              }}
              className="px-6 py-4 flex items-center gap-2 text-sm font-mono border-r border-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {isFullScreen ? "Minimize" : "Keluar"}
            </button>
            <div className="flex flex-1 overflow-x-auto scrollbar-none">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.label}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-4 py-4 text-xs font-mono flex-1 text-center whitespace-nowrap transition-all border-b-2 border-transparent",
                    activeTab === idx ? "text-foreground bg-foreground/[0.02] font-bold border-foreground" : "text-muted-foreground/60"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Isi Konten Formulir Dynamic Render (Bisa di-scroll internal jika form kepanjangan di HP) */}
          <div className="p-6 lg:p-10 font-mono text-sm flex-1 flex flex-col relative overflow-y-auto">
            
            {/* Animasi Ombak Gelombang Aesthetic */}
            <div className="absolute bottom-0 left-0 w-full h-40 opacity-15 pointer-events-none z-0">
              <AnimatedWave />
            </div>

            <div className="relative z-10 pb-6 flex-1 flex flex-col justify-between max-w-4xl w-full mx-auto">
              {!isSubmitted ? (
                <>
                  {activeTab === 0 && <StepContact formData={formData} onChange={handleChange} onNext={() => setActiveTab(1)} inputClass={inputClass} labelClass={labelClass} />}
                  {activeTab === 1 && <StepAddress formData={formData} onChange={handleChange} onNext={() => setActiveTab(2)} onBack={() => setActiveTab(0)} inputClass={inputClass} labelClass={labelClass} />}
                  {activeTab === 2 && <StepLocation formData={formData} setFormData={setFormData} onNext={() => setActiveTab(3)} onBack={() => setActiveTab(1)} labelClass={labelClass} />}
                  {activeTab === 3 && <StepPackage formData={formData} setFormData={setFormData} onChange={handleChange} packages={packages} onNext={() => setActiveTab(4)} onBack={() => setActiveTab(2)} inputClass={inputClass} labelClass={labelClass} />}
                  {activeTab === 4 && (
                    <StepDocuments
                      formData={formData} onChange={handleChange} ktpPreview={ktpPreview} housePreview={housePreview}
                      onFileChange={handleFileChange} onClearFile={handleClearFile} onSubmit={handleSubmit}
                      isSubmitting={isSubmitting} submitError={submitError} onBack={() => setActiveTab(3)} labelClass={labelClass}
                    />
                  )}
                </>
              ) : (
                /* Layar Sukses Mengantre */
                <div className="text-center space-y-4 flex flex-col items-center justify-center my-auto min-h-[300px] animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 border border-foreground rounded-full flex items-center justify-center bg-foreground/5 mb-2">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display">Pendaftaran Masuk Antrian!</h3>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Halo <span className="text-foreground font-bold">{formData.fullName}</span>, data pendaftaran kamu aman tersimpan. Mohon ditunggu ya, tim operasional Sicakra WiFi akan segera mengontak WhatsApp kamu untuk mencocokkan jadwal pemasangan!
                  </p>
                  <Link href="/" onClick={() => setIsFullScreen(false)} className="mt-4 px-6 py-3 text-xs font-mono border border-foreground text-background bg-foreground hover:bg-foreground/90 transition-colors">
                    Kembali ke Beranda
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}