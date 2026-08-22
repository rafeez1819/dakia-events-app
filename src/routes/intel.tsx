import { createFileRoute } from "@tanstack/react-router";
import { IntelApp } from "@/components/intel/IntelApp";

export const Route = createFileRoute("/intel")({
  component: IntelPage,
  head: () => ({
    meta: [{ title: "Website Intelligence · Dakia Events" }],
  }),
});

function IntelPage() {
  return <IntelApp />;
}
