import { createFileRoute } from "@tanstack/react-router";
import { LegalShell } from "@/components/site/LegalShell";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({ meta: [{ title: "Terms & Conditions · Dakia Events" }] }),
});

function TermsPage() {
  return (
    <LegalShell title="Terms & Conditions">
      <p>
        These terms cover use of the Dakia Events website. Event production contracts are issued separately and are not
        replaced by this page.
      </p>
      <h2>Enquiries</h2>
      <p>
        Submitting the quote form is a request for information, not an order. Availability of LED inventory, crew and
        dates is confirmed in writing by Dakia.
      </p>
      <h2>Accuracy</h2>
      <p>
        Equipment counts, coverage maps and case descriptions on this site are indicative. Technical riders are scoped
        per event.
      </p>
      <h2>Measurement</h2>
      <p>
        Website Intelligence derives every KPI from stored event rows. A deterministic 90-day seed populates the
        warehouse so the desk is usable on first load; live consented events append as origin=live. Forecasts are a
        baseline linear model, not a guaranteed error bound. Reconciliation — not zero data loss — is the production
        target.
      </p>
      <h2>Governing law</h2>
      <p>United Arab Emirates. Contact: Ajman · info@dakiaevents.com · +971 54 582 6560</p>
    </LegalShell>
  );
}
