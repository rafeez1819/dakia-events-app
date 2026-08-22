import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";

export function IntelDock() {
  return (
    <Link
      to="/intel"
      aria-label="Open Website Intelligence"
      className="fixed right-4 bottom-24 z-[1100] flex min-h-11 items-center gap-2 border border-gold/40 bg-ink/90 px-3 py-2 text-gold shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm hover:border-gold hover:bg-ink md:right-6 md:bottom-8"
    >
      <Activity className="size-4" strokeWidth={1.6} />
      <span className="font-cond text-[11px] tracking-[0.22em] uppercase">Intel</span>
    </Link>
  );
}
