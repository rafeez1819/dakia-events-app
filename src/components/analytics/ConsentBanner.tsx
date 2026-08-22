import { useEffect, useState } from "react";
import { applyGtagConsent, loadConsent, saveConsent } from "@/lib/analytics/consent";
import { onConsentGranted, track } from "@/lib/analytics/tracker";
import type { ConsentState } from "@/lib/analytics/types";

function granted(): ConsentState {
  return {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    decided: true,
    updatedAt: new Date().toISOString(),
  };
}

function essential(): ConsentState {
  return {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    decided: true,
    updatedAt: new Date().toISOString(),
  };
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!loadConsent().decided);
  }, []);

  if (!open) return null;

  const choose = (state: ConsentState) => {
    saveConsent(state);
    applyGtagConsent(state);
    if (state.analytics_storage === "granted") {
      onConsentGranted();
      track("consent_update", { analytics_storage: "granted" });
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1200] p-4 md:p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 border border-gold/25 bg-ink/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:flex-row md:items-end md:justify-between md:p-6">
        <div className="max-w-xl">
          <p className="font-cond text-[11px] tracking-[0.28em] text-gold uppercase">Consent Mode v2</p>
          <p className="mt-2 font-display text-2xl tracking-wide text-paper">MEASUREMENT CHOICE</p>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Analytics is off until you choose. Google Analytics and the first-party Intelligence collector both stay
            silent unless you accept. Names, emails and phone numbers are never sent to measurement.{" "}
            <a className="text-gold underline-offset-4 hover:underline" href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="min-h-11 border border-gold/30 px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-paper uppercase hover:border-gold"
            onClick={() => choose(essential())}
          >
            Essential only
          </button>
          <button
            type="button"
            className="min-h-11 bg-gold px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-ink uppercase hover:bg-gold-2"
            onClick={() => choose(granted())}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
