import { createFileRoute } from "@tanstack/react-router";

type ContactBody = {
  website?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  details?: string;
  company?: string;
  eventDate?: string;
  budget?: string;
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const phoneOk = (v: string) => /^[+()\d\s.-]{7,30}$/.test(v);

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ContactBody;
        try {
          body = (await request.json()) as ContactBody;
        } catch {
          return Response.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
        }
        if ((body.website || "").trim()) {
          return Response.json({ ok: true });
        }
        if ((body.fullName || "").trim().length < 2) {
          return Response.json({ ok: false, message: "Please enter your full name." }, { status: 400 });
        }
        if (!emailOk((body.email || "").trim())) {
          return Response.json({ ok: false, message: "Please enter a valid email." }, { status: 400 });
        }
        if (!phoneOk((body.phone || "").trim())) {
          return Response.json({ ok: false, message: "Please enter a valid phone number." }, { status: 400 });
        }
        if (!body.eventType) {
          return Response.json({ ok: false, message: "Please select an event type." }, { status: 400 });
        }
        if ((body.details || "").trim().length < 20) {
          return Response.json({ ok: false, message: "Please provide more detail about your event." }, { status: 400 });
        }
        return Response.json({
          ok: true,
          message: "Enquiry received",
          ref: `DK-${Date.now().toString(36).toUpperCase()}`,
        });
      },
    },
  },
});
