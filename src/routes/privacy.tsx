import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/site/LegalShell";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy Policy · Dakia Events" }] }),
});

function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        Dakia Events (“Dakia”, “we”) processes enquiry data to respond to requests for LED, AV, sound, lighting and
        event production. This policy describes website measurement. It does not change how we produce events.
      </p>
      <h2>What we collect</h2>
      <p>
        Contact form fields (name, email, phone, company, event details) are sent only to our enquiry endpoint so the
        production team can reply. They are not attached to Google Analytics events and are not stored in the
        Intelligence warehouse.
      </p>
      <h2>Analytics</h2>
      <p>
        We use Google Analytics 4 (measurement ID G-PK86GP1MGY) with Consent Mode v2. Defaults are denied. If you accept
        analytics we send anonymized behavioral events (page views, service interest, quote funnel, click-to-call). IP
        anonymization is enabled. We do not send user_id, email, phone or message text to GA4.
      </p>
      <h2>First-party intelligence</h2>
      <p>
        A first-party collector (the server-side analogue of a GTM server container) stores event names and
        non-identifying parameters to power the Website Intelligence desk. Collection starts only after you accept
        analytics. Advertising storage and personalization remain denied.
      </p>
      <h2>Your choices</h2>
      <p>
        You can refuse analytics and continue using the site. Essential operation (serving pages, submitting a quote)
        does not require analytics consent.
      </p>
      <h2>Contact</h2>
      <p>
        Ajman, United Arab Emirates ·{" "}
        <a href="mailto:info@dakiaevents.com">info@dakiaevents.com</a> · +971 54 582 6560
      </p>
    </LegalShell>
  );
}
