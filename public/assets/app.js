(() => {
  "use strict";

  const FORM_ENDPOINT = "/api/contact";

  // Use the richer dakiaTrack (consent-aware, UTM-enriched, PII-safe, AED values).
  // Falls back to bare gtag so the file works even if the analytics module is absent.
  const track = (name, params = {}) => {
    if (typeof window.dakiaTrack === "function") {
      window.dakiaTrack(name, params);
    } else if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  };

  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const setMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileMenu.hidden = !open;
    if (open) mobileMenu.querySelector("a")?.focus();
  };
  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]')];
  const sections = [...document.querySelectorAll("main section[id]")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    });
  }, {rootMargin:"-35% 0px -55% 0px", threshold:0});
  sections.forEach(s => observer.observe(s));

  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", scrollY > 30), {passive:true});

  document.querySelectorAll("[data-track]").forEach(el => {
    el.addEventListener("click", () => {
      const eventName = el.dataset.track;
      const label     = (el.textContent || "").trim().slice(0, 80);
      // Map click events to richer params for key conversion events
      const extra = {};
      if (eventName === "whatsapp_click") extra.contact_method = "whatsapp";
      if (eventName === "phone_click")    extra.contact_method = "phone";
      if (eventName === "email_click")    extra.contact_method = "email";
      track(eventName, Object.assign({ label }, extra));
    });
  });

  // Carousel
  const trackEl = document.getElementById("eventTrack");
  const scrollEvents = amount => trackEl?.scrollBy({left:amount, behavior:matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth"});
  document.getElementById("prevEvents")?.addEventListener("click", () => { scrollEvents(-380); track("event_carousel_navigation",{direction:"previous"}); });
  document.getElementById("nextEvents")?.addEventListener("click", () => { scrollEvents(380); track("event_carousel_navigation",{direction:"next"}); });

  // Form validation and lead submission.
  const form = document.getElementById("quoteForm");
  const status = document.getElementById("formStatus");
  const submit = document.getElementById("submitBtn");
  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    eventType: document.getElementById("eventType"),
    details: document.getElementById("details")
  };
  const error = key => document.getElementById(`${key}Error`);
  const setError = (key, message) => {
    const field = fields[key], box = error(key);
    if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
    if (box) box.textContent = message || "";
  };
  const emailOK = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  const phoneOK = value => /^[+()\d\s.-]{7,30}$/.test(value);

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    Object.keys(fields).forEach(k => setError(k, ""));
    status.textContent = "";
    status.className = "form-status";

    const data = new FormData(form);
    if (String(data.get("website") || "").trim()) return;

    const values = Object.fromEntries(data.entries());
    let valid = true;
    if (values.fullName.trim().length < 2) { setError("fullName","Please enter your full name."); valid=false; }
    if (!emailOK(values.email.trim())) { setError("email","Please enter a valid email."); valid=false; }
    if (!phoneOK(values.phone.trim())) { setError("phone","Please enter a valid phone number."); valid=false; }
    if (!values.eventType) { setError("eventType","Please select an event type."); valid=false; }
    if (values.details.trim().length < 20) { setError("details","Please provide at least 20 characters about your event."); valid=false; }
    if (!valid) { track("form_validation_error"); return; }

    submit.disabled = true;
    submit.querySelector("span").textContent = "…";
    status.textContent = "Sending your enquiry securely…";
    status.className = "form-status";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify(values),
        credentials:"same-origin"
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
      form.reset();
      status.textContent = "✓ ENQUIRY RECEIVED — Dakia will review your brief and respond soon.";
      status.className = "form-status success";
      track("generate_lead", {
        event_type:   values.eventType,
        value:        450,
        currency:     "AED",
        lead_source:  "contact_form",
        content_group:"contact"
      });
      track("form_submit_success", { event_type: values.eventType });
    } catch (err) {
      console.error(err);
      status.textContent = "We could not submit the form. Please email info@dakiaevents.com or call +971 54 582 6560.";
      status.className = "form-status error";
      track("form_submit_error");
    } finally {
      submit.disabled = false;
      submit.querySelector("span").textContent = "→";
    }
  });

  // Phone/email/WhatsApp conversions.
  document.querySelectorAll('a[href^="tel:"]').forEach(a => a.addEventListener("click", () => track("phone_click")));
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.addEventListener("click", () => track("email_click")));
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => a.addEventListener("click", () => track("whatsapp_click")));

  // Social placeholders: disable until real company profiles are supplied.
  document.querySelectorAll("[data-social]").forEach(a => {
    a.addEventListener("click", e => {
      if (a.getAttribute("href") === "#") {
        e.preventDefault();
        track("social_placeholder_click",{network:a.dataset.social});
      }
    });
    a.classList.add("disabled");
    a.setAttribute("aria-disabled","true");
  });

  // NOTE: page_view / session_start / first_visit are fired by the
  // Dakia Analytics module (inline script) — not duplicated here.
})();
