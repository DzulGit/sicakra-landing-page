import { AlertCircle } from "lucide-react";

export function AlertModal({ message, onClose }: { message: string | null; onClose: () => void }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-foreground/20 p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 font-mono">
        <div className="flex items-center gap-3 mb-4 text-foreground">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Error</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-foreground text-background text-xs hover:bg-foreground/90 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}