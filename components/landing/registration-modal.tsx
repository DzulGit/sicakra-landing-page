"use client"

import * as React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type PackageItem = {
  id: string | number;
  name: string;
  speed?: number | string;
  price?: number;
  description?: string;
};

export default function RegistrationModal({
  packageItem,
  onClose,
}: {
  packageItem: PackageItem;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      toast({ title: "Form belum lengkap", description: "Mohon lengkapi semua field wajib." });
      return;
    }
    setLoading(true);
    const payload = {
      packageId: packageItem.id,
      name,
      phone,
      address,
      notes,
      timestamp: new Date().toISOString(),
    };

    // Simulasi: endpoint butuh auth, jadi hanya log untuk sekarang
    console.log("[Registration] payload:", payload);

    // show toast
    toast({ title: "Pendaftaran terkirim (simulasi)", description: `Paket: ${packageItem.name}` });

    // Simulate delay
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pendaftaran Pasang - {packageItem.name}</DialogTitle>
        <DialogDescription>Isi data berikut untuk registrasi pemasangan. Kami akan menghubungi Anda via WhatsApp.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm text-muted-foreground">Nama Lengkap*</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Lengkap" />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Nomor HP (WhatsApp)*</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0812xxxx" />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Alamat Pemasangan*</label>
          <Textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap" />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Catatan Tambahan</label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Contoh: jam pasang, landmark, dsb." />
        </div>

        <DialogFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Registrasi"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
