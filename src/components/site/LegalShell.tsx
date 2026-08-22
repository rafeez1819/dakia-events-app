import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink px-6 py-20 text-paper md:px-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="font-cond text-[11px] tracking-[0.28em] text-gold uppercase">
          Dakia Events
        </Link>
        <h1 className="mt-6 font-display text-5xl tracking-wide">{title}</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-mute [&_h2]:mt-8 [&_h2]:font-cond [&_h2]:text-xs [&_h2]:tracking-[0.2em] [&_h2]:text-gold [&_h2]:uppercase [&_a]:text-gold">
          {children}
        </div>
        <div className="mt-12 flex gap-6 font-cond text-xs tracking-[0.16em] uppercase">
          <Link to="/" className="text-paper">
            Home
          </Link>
          <Link to="/intel" className="text-gold">
            Intelligence
          </Link>
          <Link to="/terms" className="text-mute">
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
