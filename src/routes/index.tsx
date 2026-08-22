import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsRoot } from "@/components/analytics/AnalyticsRoot";
import { DakiaSite } from "@/components/site/DakiaSite";

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  name: "Dakia Events",
  legalName: "Dakia Productions",
  url: "https://dakia-events.com/",
  email: "info@dakiaevents.com",
  telephone: "+971545826560",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ajman",
    addressRegion: "Ajman",
    addressCountry: "AE",
  },
};

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "Dakia Events | LED Video Walls, AV Rental & Event Production UAE – Ajman, Dubai, Abu Dhabi" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SCHEMA),
      },
    ],
  }),
});

function Home() {
  return (
    <AnalyticsRoot>
      <DakiaSite />
    </AnalyticsRoot>
  );
}
