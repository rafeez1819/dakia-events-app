import { track } from "@/lib/analytics/tracker";

function productFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("led")) return "LED_VIDEO_WALL";
  if (t.includes("sound")) return "SOUND_SYSTEM";
  if (t.includes("light")) return "LIGHTING";
  if (t.includes("stage") || t.includes("rigging")) return "STAGE_RIGGING";
  if (t.includes("production")) return "EVENT_PRODUCTION";
  if (t.includes("rental") || t.includes("av")) return "AV_RENTAL";
  return "UNKNOWN";
}

function projectType(name: string): string {
  const t = name.toLowerCase();
  if (t.includes("sport") || t.includes("fiba")) return "SPORTS";
  if (t.includes("concert") || t.includes("music")) return "CONCERT";
  if (t.includes("exhibit")) return "EXHIBITION";
  if (t.includes("conference")) return "CONFERENCE";
  if (t.includes("corporate")) return "CORPORATE";
  if (t.includes("private")) return "PRIVATE";
  return "OTHER";
}

export function mountDakiaRuntime(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cursor = root.querySelector<HTMLElement>("#cursor");
  const ring = root.querySelector<HTMLElement>("#cursorRing");
  if (cursor && ring && window.matchMedia("(pointer: fine)").matches) {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx - 4}px`;
      cursor.style.top = `${my - 4}px`;
    };
    document.addEventListener("mousemove", onMove);
    let raf = 0;
    const anim = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx - 18}px`;
      ring.style.top = `${ry - 18}px`;
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    cleanups.push(() => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    });
  }

  const nav = root.querySelector("#mainNav");
  const onScrollNav = () => nav?.classList.toggle("scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();
  cleanups.push(() => window.removeEventListener("scroll", onScrollNav));

  const navLinks = [...root.querySelectorAll<HTMLAnchorElement>('#desktopNav a[href^="#"], .mobile-nav a[href^="#"]')];
  const sections = [...root.querySelectorAll<HTMLElement>("main section[id]")];
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );
  sections.forEach((s) => navObserver.observe(s));
  cleanups.push(() => navObserver.disconnect());

  const mobileNav = root.querySelector<HTMLElement>("#mobileNav");
  const menuButton = root.querySelector<HTMLButtonElement>("#hamburger");
  const setMenu = (open: boolean) => {
    if (!mobileNav || !menuButton) return;
    mobileNav.classList.toggle("open", open);
    mobileNav.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };
  window.toggleMobile = () => setMenu(!mobileNav?.classList.contains("open"));
  window.closeMobile = () => setMenu(false);
  mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setMenu(false);
  };
  document.addEventListener("keydown", onKey);
  cleanups.push(() => document.removeEventListener("keydown", onKey));

  const revealEls = root.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => revealObs.observe(el));
  revealEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      window.setTimeout(() => el.classList.add("visible"), i * 60);
    }
  });
  cleanups.push(() => revealObs.disconnect());

  const eventsTrack = root.querySelector<HTMLElement>("#eventsTrack");
  const scrollEvents = (amount: number) =>
    eventsTrack?.scrollBy({ left: amount, behavior: reduced ? "auto" : "smooth" });
  const prev = root.querySelector("#evPrev");
  const next = root.querySelector("#evNext");
  const onPrev = () => {
    scrollEvents(-380);
    track("event_carousel_navigation", { direction: "previous" });
  };
  const onNext = () => {
    scrollEvents(380);
    track("event_carousel_navigation", { direction: "next" });
  };
  prev?.addEventListener("click", onPrev);
  next?.addEventListener("click", onNext);
  cleanups.push(() => {
    prev?.removeEventListener("click", onPrev);
    next?.removeEventListener("click", onNext);
  });

  if (eventsTrack && window.matchMedia("(pointer: fine)").matches) {
    let isDragging = false,
      startX = 0,
      scrollLeft = 0;
    const down = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - eventsTrack.offsetLeft;
      scrollLeft = eventsTrack.scrollLeft;
    };
    const up = () => {
      isDragging = false;
    };
    const move = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - eventsTrack.offsetLeft;
      eventsTrack.scrollLeft = scrollLeft - (x - startX);
    };
    eventsTrack.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mousemove", move);
    cleanups.push(() => {
      eventsTrack.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mousemove", move);
    });
  }

  const onParallax = () => {
    if (reduced) return;
    const grid = root.querySelector<HTMLElement>(".hero-grid-lines");
    if (grid) grid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  };
  window.addEventListener("scroll", onParallax, { passive: true });
  cleanups.push(() => window.removeEventListener("scroll", onParallax));

  root.querySelectorAll<HTMLElement>("[data-track]").forEach((el) => {
    const handler = () =>
      track(el.dataset.track || "click", { label: (el.textContent || "").trim().slice(0, 80) });
    el.addEventListener("click", handler);
    cleanups.push(() => el.removeEventListener("click", handler));
  });
  root.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((a) => {
    const handler = () => track("phone_click");
    a.addEventListener("click", handler);
    cleanups.push(() => a.removeEventListener("click", handler));
  });
  root.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((a) => {
    const handler = () => track("email_click");
    a.addEventListener("click", handler);
    cleanups.push(() => a.removeEventListener("click", handler));
  });
  root.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((a) => {
    const handler = () => track("whatsapp_click");
    a.addEventListener("click", handler);
    cleanups.push(() => a.removeEventListener("click", handler));
  });

  root.querySelectorAll<HTMLAnchorElement>("[data-social]").forEach((a) => {
    const handler = (e: Event) => {
      if (a.getAttribute("href") === "#") {
        e.preventDefault();
        track("social_placeholder_click", { network: a.dataset.social });
      }
    };
    a.addEventListener("click", handler);
    a.classList.add("disabled");
    a.setAttribute("aria-disabled", "true");
    cleanups.push(() => a.removeEventListener("click", handler));
  });

  const viewObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.classList.contains("service-card")) {
          const title = el.querySelector(".service-title")?.textContent?.trim() || "service";
          const product = productFromTitle(title);
          track("product_view", { product_type: product, item_name: title, rental_or_sale: "RENTAL" });
          if (product === "LED_VIDEO_WALL") {
            track("led_product_view", { product_type: product, item_name: title });
          }
        }
        if (el.classList.contains("event-card")) {
          const name = el.querySelector(".event-name")?.textContent?.trim() || "event";
          const type = projectType(name);
          track("project_view", { project_type: type, item_name: name });
          if (type === "SPORTS") track("fiba_project_view", { project_type: type, venue_type: "ARENA" });
          if (type === "CONCERT") track("concert_project_view", { project_type: type });
          if (type === "EXHIBITION") track("exhibition_project_view", { project_type: type });
          track("event_project_view", { project_type: type });
        }
        if (el.classList.contains("project-card")) {
          const name = el.querySelector("b")?.textContent?.trim() || "project";
          track("sports_project_view", { project_type: projectType(name), item_name: name });
        }
        viewObs.unobserve(el);
      });
    },
    { threshold: 0.45 },
  );
  root.querySelectorAll(".service-card, .event-card, .project-card").forEach((el) => viewObs.observe(el));
  cleanups.push(() => viewObs.disconnect());

  const form = root.querySelector<HTMLFormElement>("#quoteForm");
  const status = root.querySelector<HTMLElement>("#formStatus");
  const submit = root.querySelector<HTMLButtonElement>("#submitBtn");
  if (form && submit && status) {
    let started = false;
    const onStart = () => {
      if (started) return;
      started = true;
      track("form_start");
      track("quotation_start");
      track("contact_form_start");
    };
    form.addEventListener("focusin", onStart);
    cleanups.push(() => form.removeEventListener("focusin", onStart));

    const fields = {
      fullName: form.querySelector<HTMLInputElement>("#fullName"),
      email: form.querySelector<HTMLInputElement>("#email"),
      phone: form.querySelector<HTMLInputElement>("#phone"),
      eventType: form.querySelector<HTMLSelectElement>("#eventType"),
      details: form.querySelector<HTMLTextAreaElement>("#details"),
    };
    const error = (key: string) => form.querySelector(`#${key}Error`);
    const setError = (key: keyof typeof fields, message: string) => {
      const field = fields[key];
      const box = error(key);
      field?.setAttribute("aria-invalid", message ? "true" : "false");
      if (box) box.textContent = message;
    };
    const emailOK = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    const phoneOK = (value: string) => /^[+()\d\s.-]{7,30}$/.test(value);
    const arrowSpan = submit.querySelector("span");

    const onSubmit = async (event: Event) => {
      event.preventDefault();
      (Object.keys(fields) as Array<keyof typeof fields>).forEach((k) => setError(k, ""));
      status.textContent = "";
      status.className = "form-status";
      const data = new FormData(form);
      if (String(data.get("website") || "").trim()) return;
      const values = Object.fromEntries(data.entries());
      let valid = true;
      if ((values.fullName || "").toString().trim().length < 2) {
        setError("fullName", "Please enter your full name.");
        valid = false;
      }
      if (!emailOK((values.email || "").toString().trim())) {
        setError("email", "Please enter a valid email.");
        valid = false;
      }
      if (!phoneOK((values.phone || "").toString().trim())) {
        setError("phone", "Please enter a valid phone number.");
        valid = false;
      }
      if (!values.eventType) {
        setError("eventType", "Please select an event type.");
        valid = false;
      }
      if ((values.details || "").toString().trim().length < 20) {
        setError("details", "Please provide at least 20 characters about your event.");
        valid = false;
      }
      if (!valid) {
        track("form_validation_error");
        return;
      }

      submit.disabled = true;
      if (arrowSpan) arrowSpan.textContent = "…";
      status.textContent = "Sending your enquiry securely…";

      const safePayload = {
        eventType: String(values.eventType),
        budget: String(values.budget || ""),
        eventDate: String(values.eventDate || ""),
        company: String(values.company || "").slice(0, 120),
        fullName: String(values.fullName).slice(0, 100),
        email: String(values.email).slice(0, 160),
        phone: String(values.phone).slice(0, 30),
        details: String(values.details).slice(0, 3000),
        website: "",
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(safePayload),
          credentials: "same-origin",
        });
        const result = (await response.json().catch(() => ({}))) as { message?: string };
        if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
        form.reset();
        started = false;
        status.textContent = "✓ ENQUIRY RECEIVED — Dakia will review your brief and respond soon.";
        status.className = "form-status success";
        const eventType = safePayload.eventType;
        track("form_submit", { event_type: eventType });
        track("contact_form_submit", { event_type: eventType });
        track("quotation_submit", { event_type: eventType, rental_or_sale: "RENTAL" });
        track("lead_generated", { event_type: eventType });
        if (/fiba|sport/i.test(eventType)) track("led_quote_request", { event_type: eventType, product_type: "LED_VIDEO_WALL" });
      } catch {
        status.textContent =
          "We could not submit the form. Please email info@dakiaevents.com or call +971 54 582 6560.";
        status.className = "form-status error";
        track("form_submit_error");
      } finally {
        submit.disabled = false;
        if (arrowSpan) arrowSpan.textContent = "→";
      }
    };
    form.addEventListener("submit", onSubmit);
    cleanups.push(() => form.removeEventListener("submit", onSubmit));
  }

  return () => {
    cleanups.forEach((fn) => fn());
    delete window.toggleMobile;
    delete window.closeMobile;
  };
}

declare global {
  interface Window {
    toggleMobile?: () => void;
    closeMobile?: () => void;
  }
}
