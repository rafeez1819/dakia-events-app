import { useEffect, type ReactNode } from "react";
import { applyGtagConsent, loadConsent } from "@/lib/analytics/consent";
import { bootAnalytics, injectGtag } from "@/lib/analytics/tracker";
import { ConsentBanner } from "./ConsentBanner";
import { IntelDock } from "./IntelDock";

export function AnalyticsRoot({ children, dock = true }: { children: ReactNode; dock?: boolean }) {
  useEffect(() => {
    injectGtag();
    const consent = loadConsent();
    if (consent.decided) applyGtagConsent(consent);
    const stop = bootAnalytics();
    return stop;
  }, []);

  return (
    <>
      {children}
      <ConsentBanner />
      {dock ? <IntelDock /> : null}
    </>
  );
}
