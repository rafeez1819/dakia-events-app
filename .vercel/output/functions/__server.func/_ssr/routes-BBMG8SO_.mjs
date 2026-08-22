import { o as __toESM } from "../_runtime.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as sanitizeParams, d as COLLECT_ENDPOINT, f as EVENT_VALUE_AED, h as KEY_EVENTS, m as GA4_MEASUREMENT_ID, r as isKnownEvent, s as sanitizeEventName } from "./store-e_Pha8XU.mjs";
import { i as saveConsent, n as hasAnalyticsConsent, r as loadConsent, t as applyGtagConsent } from "./consent-DuG9pQXb.mjs";
import { d as Activity } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BBMG8SO_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLIENT_KEY = "dakia_cid";
var SESSION_KEY = "dakia_sid";
var SESSION_MS = 18e5;
function rid(prefix) {
	const bytes = /* @__PURE__ */ new Uint8Array(8);
	crypto.getRandomValues(bytes);
	return `${prefix}.${[...bytes].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}
function getClientId() {
	try {
		const existing = localStorage.getItem(CLIENT_KEY);
		if (existing) return existing;
		const id = rid("cid");
		localStorage.setItem(CLIENT_KEY, id);
		return id;
	} catch {
		return rid("cid");
	}
}
function getSessionId() {
	try {
		const raw = sessionStorage.getItem(SESSION_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (Date.now() - parsed.at < SESSION_MS) {
				parsed.at = Date.now();
				sessionStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
				return parsed.id;
			}
		}
		const next = {
			id: rid("sid"),
			at: Date.now()
		};
		sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
		return next.id;
	} catch {
		return rid("sid");
	}
}
function isFirstVisit() {
	try {
		if (localStorage.getItem("dakia_fv")) return false;
		localStorage.setItem("dakia_fv", "1");
		return true;
	} catch {
		return false;
	}
}
function captureUtm(search) {
	const params = new URLSearchParams(search);
	const keys = [
		"utm_source",
		"utm_medium",
		"utm_campaign",
		"utm_content",
		"utm_term"
	];
	const out = {};
	for (const key of keys) {
		const value = params.get(key);
		if (value) out[key] = value.slice(0, 100);
	}
	if (Object.keys(out).length === 0) {
		try {
			const cached = sessionStorage.getItem("dakia_utm");
			if (cached) return JSON.parse(cached);
		} catch {}
		return out;
	}
	try {
		sessionStorage.setItem("dakia_utm", JSON.stringify(out));
	} catch {}
	return out;
}
function inferChannel(utm, referrer) {
	const source = (utm.utm_source || "").toLowerCase();
	const medium = (utm.utm_medium || "").toLowerCase();
	if (medium === "cpc" || medium === "paid" || source.includes("googleads")) return "paid";
	if (source === "linkedin" || medium === "social" && source.includes("linkedin")) return "linkedin";
	if (source === "instagram" || source === "facebook") return "instagram";
	if (source === "whatsapp" || medium === "whatsapp") return "whatsapp";
	if (medium === "email") return "email";
	if (source || medium) return "referral";
	if (!referrer) return "direct";
	try {
		const host = new URL(referrer).hostname;
		if (host.includes("google") || host.includes("bing")) return "organic";
		if (host.includes("linkedin")) return "linkedin";
		if (host.includes("instagram") || host.includes("facebook")) return "instagram";
		if (typeof window !== "undefined" && host !== window.location.hostname) return "referral";
	} catch {}
	return "direct";
}
function deviceCategory() {
	const ua = navigator.userAgent;
	if (/iPad|Tablet/i.test(ua)) return "tablet";
	if (/Mobi|Android/i.test(ua)) return "mobile";
	return "desktop";
}
var booted = false;
var tracking = false;
var pageEngaged = false;
var listeners = [];
function pageContext() {
	const hash = window.location.hash.replace("#", "");
	const utm = captureUtm(window.location.search);
	return {
		page_location: window.location.href.split("#")[0] ?? window.location.href,
		page_title: document.title,
		page_referrer: document.referrer || "",
		content_group: hash || "home",
		content_type: hash ? "section" : "landing",
		language: navigator.language,
		...utm
	};
}
function pushDataLayer(event, params) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event,
		...params
	});
}
function sendGtag(event, params) {
	if (!hasAnalyticsConsent()) return;
	if (typeof window.gtag !== "function") return;
	window.gtag("event", event, params);
}
function postCollect(payload) {
	const body = JSON.stringify({
		...payload,
		consent: "granted"
	});
	if (navigator.sendBeacon) {
		const blob = new Blob([body], { type: "application/json" });
		navigator.sendBeacon(COLLECT_ENDPOINT, blob);
		return;
	}
	fetch(COLLECT_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body,
		credentials: "same-origin",
		keepalive: true
	}).catch(() => {});
}
function track(name, rawParams = {}) {
	if (!hasAnalyticsConsent()) return;
	const event = sanitizeEventName(name);
	if (!event || !isKnownEvent(event)) return;
	const params = sanitizeParams({
		...pageContext(),
		lead_source: inferChannel(captureUtm(window.location.search), document.referrer),
		device_category: deviceCategory(),
		...rawParams
	});
	if (KEY_EVENTS.includes(event) && params.value == null) {
		params.value = EVENT_VALUE_AED[event] ?? 0;
		params.currency = "AED";
	}
	const payload = {
		event,
		timestamp: Date.now(),
		client_id: getClientId(),
		session_id: getSessionId(),
		origin: "live",
		params
	};
	pushDataLayer(event, params);
	sendGtag(event, params);
	postCollect(payload);
}
function startSessionTracking() {
	if (tracking) return;
	tracking = true;
	const first = isFirstVisit();
	getSessionId();
	if (first) track("first_visit");
	track("session_start", {
		screen_resolution: `${window.screen.width}x${window.screen.height}`,
		device_category: deviceCategory(),
		language: navigator.language
	});
	track("page_view", {
		page_type: "homepage",
		site_section: "dakia_events"
	});
	const onScroll = () => {
		const depth = Math.round((window.scrollY + window.innerHeight) / Math.max(document.body.scrollHeight, 1) * 100);
		if (!pageEngaged && depth >= 25) {
			pageEngaged = true;
			track("user_engagement", { engagement_threshold: 25 });
		}
		if (depth >= 90) {
			window.removeEventListener("scroll", onScroll);
			track("scroll", { percent_scrolled: 90 });
		}
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	listeners.push(() => window.removeEventListener("scroll", onScroll));
	const onVis = () => {
		if (document.visibilityState === "hidden") track("user_engagement", { visibility: "hidden" });
	};
	document.addEventListener("visibilitychange", onVis);
	listeners.push(() => document.removeEventListener("visibilitychange", onVis));
}
function onConsentGranted() {
	if (loadConsent().analytics_storage !== "granted") return;
	startSessionTracking();
}
function bootAnalytics() {
	if (booted) return () => {};
	booted = true;
	window.dataLayer = window.dataLayer || [];
	if (typeof window.gtag !== "function") window.gtag = function gtag(...args) {
		window.dataLayer.push(args);
	};
	if (hasAnalyticsConsent()) startSessionTracking();
	return () => {
		listeners.splice(0).forEach((fn) => fn());
		booted = false;
		tracking = false;
		pageEngaged = false;
	};
}
function injectGtag() {
	if (document.getElementById("ga4-gtag")) return;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag(...args) {
		window.dataLayer.push(args);
	};
	window.gtag("consent", "default", {
		analytics_storage: "denied",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
		functionality_storage: "granted",
		personalization_storage: "denied",
		security_storage: "granted",
		wait_for_update: 500
	});
	window.gtag("js", /* @__PURE__ */ new Date());
	window.gtag("config", GA4_MEASUREMENT_ID, {
		anonymize_ip: true,
		allow_google_signals: false,
		send_page_view: false
	});
	const s = document.createElement("script");
	s.id = "ga4-gtag";
	s.async = true;
	s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
	document.head.appendChild(s);
}
function granted() {
	return {
		analytics_storage: "granted",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
		decided: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function essential() {
	return {
		analytics_storage: "denied",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
		decided: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function ConsentBanner() {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(!loadConsent().decided);
	}, []);
	if (!open) return null;
	const choose = (state) => {
		saveConsent(state);
		applyGtagConsent(state);
		if (state.analytics_storage === "granted") {
			onConsentGranted();
			track("consent_update", { analytics_storage: "granted" });
		}
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-x-0 bottom-0 z-[1200] p-4 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col gap-4 border border-gold/25 bg-ink/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:flex-row md:items-end md:justify-between md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[11px] tracking-[0.28em] text-gold uppercase",
						children: "Consent Mode v2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl tracking-wide text-paper",
						children: "MEASUREMENT CHOICE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-relaxed text-mute",
						children: [
							"Analytics is off until you choose. Google Analytics and the first-party Intelligence collector both stay silent unless you accept. Names, emails and phone numbers are never sent to measurement.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-gold underline-offset-4 hover:underline",
								href: "/privacy",
								children: "Privacy Policy"
							}),
							"."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 border border-gold/30 px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-paper uppercase hover:border-gold",
					onClick: () => choose(essential()),
					children: "Essential only"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 bg-gold px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-ink uppercase hover:bg-gold-2",
					onClick: () => choose(granted()),
					children: "Accept analytics"
				})]
			})]
		})
	});
}
function IntelDock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/intel",
		"aria-label": "Open Website Intelligence",
		className: "fixed right-4 bottom-24 z-[1100] flex min-h-11 items-center gap-2 border border-gold/40 bg-ink/90 px-3 py-2 text-gold shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm hover:border-gold hover:bg-ink md:right-6 md:bottom-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
			className: "size-4",
			strokeWidth: 1.6
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-cond text-[11px] tracking-[0.22em] uppercase",
			children: "Intel"
		})]
	});
}
function AnalyticsRoot({ children, dock = true }) {
	(0, import_react.useEffect)(() => {
		injectGtag();
		const consent = loadConsent();
		if (consent.decided) applyGtagConsent(consent);
		return bootAnalytics();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		children,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentBanner, {}),
		dock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelDock, {}) : null
	] });
}
var dakia_body_default = "<a class=\"skip-link\" href=\"#main\">Skip to content</a>\n\n<!-- Cursor -->\n<div class=\"cursor\" id=\"cursor\" aria-hidden=\"true\"></div>\n<div class=\"cursor-ring\" id=\"cursorRing\" aria-hidden=\"true\"></div>\n\n<!-- Mobile Nav -->\n<div class=\"mobile-nav\" id=\"mobileNav\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Mobile navigation\" hidden>\n  <a href=\"#about\" onclick=\"closeMobile()\">About</a>\n  <a href=\"#services\" onclick=\"closeMobile()\">Services</a>\n  <a href=\"#events\" onclick=\"closeMobile()\">Events</a>\n  <a href=\"#capabilities\" onclick=\"closeMobile()\">Capabilities</a>\n  <a href=\"#process\" onclick=\"closeMobile()\">Process</a>\n  <a href=\"#projects\" onclick=\"closeMobile()\">Projects</a>\n  <a href=\"#contact\" onclick=\"closeMobile()\">Contact</a>\n</div>\n\n<!-- Navigation -->\n<nav id=\"mainNav\" role=\"navigation\" aria-label=\"Primary navigation\">\n  <a href=\"#hero\" class=\"nav-logo\" aria-label=\"Dakia Events home\">\n    <img src=\"/assets/dakia-logo.webp\" alt=\"\" width=\"40\" height=\"40\" onerror=\"this.onerror=null;this.src='/assets/dakia-logo.png';\" fetchpriority=\"high\">\n    <span class=\"nav-logo-wordmark\"><strong>DAKIA</strong><small>EVENTS</small></span>\n  </a>\n  <div class=\"nav-links\" id=\"desktopNav\">\n    <a href=\"#about\">About</a>\n    <a href=\"#services\">Services</a>\n    <a href=\"#events\">Events</a>\n    <a href=\"#capabilities\">Capabilities</a>\n    <a href=\"#process\">Process</a>\n    <a href=\"#projects\">Projects</a>\n    <a href=\"#contact\" class=\"nav-cta\" data-track=\"quote_cta_click\">Get a Quote</a>\n  </div>\n  <button class=\"hamburger\" id=\"hamburger\" type=\"button\" aria-label=\"Open navigation\" aria-expanded=\"false\" aria-controls=\"mobileNav\" onclick=\"toggleMobile()\">\n    <span></span><span></span><span></span>\n  </button>\n</nav>\n\n<main id=\"main\">\n\n<!-- HERO -->\n<section id=\"hero\" aria-labelledby=\"heroTitle\">\n  <div class=\"hero-bg\" aria-hidden=\"true\"></div>\n  <div class=\"hero-grid-lines\" aria-hidden=\"true\"></div>\n  <div class=\"hero-scan\" aria-hidden=\"true\"></div>\n\n  <div class=\"hero-tag reveal\">Dakia Events · Arena Operations Excellence</div>\n  <h1 id=\"heroTitle\" class=\"hero-title reveal reveal-delay-1\">\n    DAKIA\n    <span class=\"line2\">PRODUCTIONS</span>\n    <span class=\"line3\">Ajman · United Arab Emirates</span>\n  </h1>\n\n  <div class=\"hero-bottom\">\n    <p class=\"hero-desc reveal reveal-delay-2\">\n      We engineer <strong>unforgettable live experiences</strong>. From intimate corporate gatherings to stadium-scale concerts, Dakia deploys cutting-edge LED, sound, lighting, and staging solutions across the UAE and GCC.\n    </p>\n    <div class=\"hero-cta reveal reveal-delay-3\">\n      <a href=\"#contact\" class=\"btn-primary\" data-track=\"services_cta_click\">Request a Quote <span style=\"margin-left:0.5rem\">→</span></a>\n      <a href=\"#services\" class=\"btn-outline\">Our Services</a>\n    </div>\n  </div>\n\n  <div class=\"hero-contact-strip reveal reveal-delay-3\" aria-label=\"Contact information\">\n    <a href=\"#contact\" aria-label=\"Location\"><span>⌖</span><span>Ajman, UAE</span></a>\n    <a href=\"tel:+971545826560\" data-track=\"phone_click\" aria-label=\"Call Dakia Events\"><span>◯</span><span>+971 54 582 6560</span></a>\n    <a href=\"mailto:info@dakiaevents.com\" data-track=\"email_click\" aria-label=\"Email Dakia Events\"><span>✉</span><span>info@dakiaevents.com</span></a>\n  </div>\n\n  <div class=\"hero-scroll\" aria-hidden=\"true\">\n    <div class=\"scroll-line\"></div>\n    <span>Scroll</span>\n  </div>\n</section>\n\n<!-- STATS TICKER -->\n<div class=\"stats-bar\" aria-label=\"Dakia Events statistics\">\n  <div class=\"stats-ticker\" id=\"ticker\">\n    <div class=\"stat-item\"><span class=\"stat-num\">500+</span><div class=\"stat-label\">Events<br>Delivered</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">8K+</span><div class=\"stat-label\">LED Panel<br>Inventory</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">100+</span><div class=\"stat-label\">Corporate<br>Clients</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">15+</span><div class=\"stat-label\">Years<br>Experience</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">2 MVA</span><div class=\"stat-label\">Power<br>Capacity</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">300+</span><div class=\"stat-label\">Moving<br>Lights</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">24/7</span><div class=\"stat-label\">On-site<br>Support</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">GCC</span><div class=\"stat-label\">Regional<br>Coverage</div></div>\n    <!-- Duplicate for seamless loop -->\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">500+</span><div class=\"stat-label\">Events<br>Delivered</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">8K+</span><div class=\"stat-label\">LED Panel<br>Inventory</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">100+</span><div class=\"stat-label\">Corporate<br>Clients</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">15+</span><div class=\"stat-label\">Years<br>Experience</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">2 MVA</span><div class=\"stat-label\">Power<br>Capacity</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">300+</span><div class=\"stat-label\">Moving<br>Lights</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">24/7</span><div class=\"stat-label\">On-site<br>Support</div></div>\n    <div class=\"stat-div\"></div>\n    <div class=\"stat-item\"><span class=\"stat-num\">GCC</span><div class=\"stat-label\">Regional<br>Coverage</div></div>\n  </div>\n</div>\n\n<!-- ABOUT -->\n<section id=\"about\" class=\"section-pad\" aria-labelledby=\"aboutTitle\">\n  <div class=\"about-grid\">\n    <div class=\"about-text\">\n      <div class=\"section-tag reveal\">Who We Are</div>\n      <h2 id=\"aboutTitle\" class=\"section-title reveal reveal-delay-1\">BUILDING <em>STAGES</em><br>THAT DEFINE<br>MOMENTS</h2>\n      <div class=\"gold-line reveal reveal-delay-2\"></div>\n      <p class=\"reveal reveal-delay-2\">\n        Dakia is a professional arena operations and event production company headquartered in <strong>Ajman, UAE</strong>. We are the technical backbone behind some of the region's most impactful live events — from sports venues and corporate conferences to large-format concerts and exhibitions.\n      </p>\n      <p class=\"reveal reveal-delay-3\">\n        From high-definition <strong>LED video walls</strong> and precision <strong>sound systems</strong> to architectural <strong>lighting designs</strong> and engineered <strong>stage platforms</strong>, every element we deploy is chosen and operated to deliver maximum visual and acoustic impact.\n      </p>\n      <div class=\"about-values reveal reveal-delay-3\">\n        <div class=\"value-card\">\n          <div class=\"value-num\">01</div>\n          <div class=\"value-title\">Technical Excellence</div>\n          <div class=\"value-desc\">Latest generation equipment maintained to the highest standards of performance and reliability.</div>\n        </div>\n        <div class=\"value-card\">\n          <div class=\"value-num\">02</div>\n          <div class=\"value-title\">On-Time Delivery</div>\n          <div class=\"value-desc\">Rigorous project timelines backed by experienced logistics and operations teams.</div>\n        </div>\n        <div class=\"value-card\">\n          <div class=\"value-num\">03</div>\n          <div class=\"value-title\">Safety First</div>\n          <div class=\"value-desc\">Full HSE compliance on every project, with certified rigging and electrical procedures.</div>\n        </div>\n        <div class=\"value-card\">\n          <div class=\"value-num\">04</div>\n          <div class=\"value-title\">Client-Centric</div>\n          <div class=\"value-desc\">Every solution is custom-built around your event's unique creative and technical vision.</div>\n        </div>\n      </div>\n    </div>\n    <div class=\"about-visual reveal reveal-delay-2\">\n      <div class=\"about-img-frame\">\n        <div class=\"about-img-inner\">\n          <div class=\"stage-icon\" aria-hidden=\"true\"></div>\n          <div class=\"frame-label\">DAKIA<br>EVENTS</div>\n        </div>\n      </div>\n      <div class=\"about-corner-tag\">\n        <div class=\"about-corner-num\">UAE</div>\n        <div class=\"about-corner-txt\">Ajman Based</div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- SERVICES -->\n<section id=\"services\" class=\"section-pad\" aria-labelledby=\"servicesTitle\">\n  <div class=\"services-header\">\n    <div>\n      <div class=\"section-tag reveal\">What We Do</div>\n      <h2 id=\"servicesTitle\" class=\"section-title reveal reveal-delay-1\">TECHNICAL<br><em>SERVICES</em></h2>\n    </div>\n    <p class=\"services-intro reveal reveal-delay-2\">Every discipline in-house. From concept to strike, Dakia handles the full technical scope of your event production across the UAE and GCC.</p>\n  </div>\n  <div class=\"services-grid\">\n\n    <div class=\"service-card featured reveal\">\n      <div class=\"feat-badge\">\n        <svg width=\"8\" height=\"8\" viewBox=\"0 0 8 8\" aria-hidden=\"true\"><circle cx=\"4\" cy=\"4\" r=\"3\" fill=\"currentColor\"/></svg>\n        Flagship Service\n      </div>\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"1\"/><polyline points=\"8 21 12 17 16 21\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/></svg>\n      </div>\n      <div class=\"service-num\">01</div>\n      <div class=\"service-title\">LED Video Walls</div>\n      <div class=\"service-desc\">High-resolution indoor and outdoor LED display solutions engineered for maximum visual impact. Our pixel-perfect panels transform any space into an immersive visual environment.</div>\n      <ul class=\"service-features\">\n        <li>Indoor &amp; Outdoor LED Panels</li>\n        <li>Pixel Pitch from 1.9mm to 10mm</li>\n        <li>Real-time Video Processing</li>\n        <li>Custom Configurations</li>\n        <li>Seamless Tiling Technology</li>\n      </ul>\n    </div>\n\n    <div class=\"service-card reveal reveal-delay-1\">\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"/><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14\"/></svg>\n      </div>\n      <div class=\"service-num\">02</div>\n      <div class=\"service-title\">Sound Systems</div>\n      <div class=\"service-desc\">Professional audio solutions that fill every seat with crystal-clear sound. From line array systems for concert venues to intimate conference audio configurations.</div>\n      <ul class=\"service-features\">\n        <li>Line Array Speaker Systems</li>\n        <li>Wireless Microphone Rigs</li>\n        <li>Live Sound Engineering</li>\n        <li>Conference Audio Solutions</li>\n        <li>Delay &amp; Fill Speakers</li>\n      </ul>\n    </div>\n\n    <div class=\"service-card reveal reveal-delay-2\">\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"4\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"22\"/><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"/><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"/><line x1=\"2\" y1=\"12\" x2=\"4\" y2=\"12\"/><line x1=\"20\" y1=\"12\" x2=\"22\" y2=\"12\"/><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"/><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"/></svg>\n      </div>\n      <div class=\"service-num\">03</div>\n      <div class=\"service-title\">Lighting Systems</div>\n      <div class=\"service-desc\">Intelligent lighting design that transforms atmosphere and amplifies your event's energy. Moving heads, architectural wash, beam packages, and special effects all under one contract.</div>\n      <ul class=\"service-features\">\n        <li>Intelligent Moving Lights</li>\n        <li>Architectural Wash Lighting</li>\n        <li>Special FX (Haze, Pyro-safe)</li>\n        <li>Lighting Design &amp; Programming</li>\n        <li>LED Strip &amp; Pixel Mapping</li>\n      </ul>\n    </div>\n\n    <div class=\"service-card reveal\">\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"17\" width=\"18\" height=\"2\"/><polygon points=\"3 17 7 5 12 12 16 8 21 17\"/></svg>\n      </div>\n      <div class=\"service-num\">04</div>\n      <div class=\"service-title\">Stage &amp; Rigging</div>\n      <div class=\"service-desc\">Custom stage structures, truss systems, and certified rigging solutions engineered for safety and spectacle. We design and build stages for the largest and most demanding events in the region.</div>\n      <ul class=\"service-features\">\n        <li>Modular Stage Platforms</li>\n        <li>Truss &amp; Ground Support</li>\n        <li>Certified Rigging Operations</li>\n        <li>Custom Stage Fabrication</li>\n        <li>Load Calculation &amp; Engineering</li>\n      </ul>\n    </div>\n\n    <div class=\"service-card reveal reveal-delay-1\">\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>\n      </div>\n      <div class=\"service-num\">05</div>\n      <div class=\"service-title\">Event Production</div>\n      <div class=\"service-desc\">Complete end-to-end event technical management. We embed our project team into your event, coordinating all technical disciplines from pre-production planning through live execution and de-rig.</div>\n      <ul class=\"service-features\">\n        <li>Full Technical Direction</li>\n        <li>Conference AV Setup</li>\n        <li>Exhibition Booth Support</li>\n        <li>Live Event Coordination</li>\n        <li>On-site Technical Crew</li>\n      </ul>\n    </div>\n\n    <div class=\"service-card reveal reveal-delay-2\">\n      <div class=\"service-icon\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 24 24\"><polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"/></svg>\n      </div>\n      <div class=\"service-num\">06</div>\n      <div class=\"service-title\">AV Rental &amp; Consultation</div>\n      <div class=\"service-desc\">Flexible dry and wet hire of professional AV equipment, plus strategic technical consultation to plan and budget your event's technical requirements before a single item ships.</div>\n      <ul class=\"service-features\">\n        <li>Dry &amp; Wet Hire Available</li>\n        <li>Equipment Consultation</li>\n        <li>Technical Rider Fulfillment</li>\n        <li>Delivery &amp; Collection</li>\n        <li>Technical Documentation</li>\n      </ul>\n    </div>\n\n  </div>\n</section>\n\n<!-- EVENTS WE SERVE -->\n<section id=\"events\" class=\"section-pad\" aria-labelledby=\"eventsTitle\">\n  <div class=\"events-header\">\n    <div>\n      <div class=\"section-tag reveal\">Our Expertise</div>\n      <h2 id=\"eventsTitle\" class=\"section-title reveal reveal-delay-1\">EVENT <em>TYPES</em></h2>\n    </div>\n    <div class=\"events-nav\">\n      <button class=\"ev-nav-btn\" id=\"evPrev\" type=\"button\" aria-label=\"Previous events\">\n        <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><polyline points=\"10 12 6 8 10 4\"/></svg>\n      </button>\n      <button class=\"ev-nav-btn\" id=\"evNext\" type=\"button\" aria-label=\"Next events\">\n        <svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><polyline points=\"6 4 10 8 6 12\"/></svg>\n      </button>\n    </div>\n  </div>\n  <div class=\"events-scroll-wrap\">\n    <div class=\"events-track\" id=\"eventsTrack\" tabindex=\"0\" aria-label=\"Event types carousel\">\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-1.jpg\" alt=\"Sports event with Dakia LED video wall and arena production\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Arena Sports · FIBA</div>\n          <div class=\"event-name\">Sports Events</div>\n          <div class=\"event-tech\">Scoreboard LED displays · Stadium PA · Broadcast-ready lighting · Pitch-level staging</div>\n        </div>\n      </article>\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-2.jpg\" alt=\"Concert production with Dakia lighting, LED and sound systems\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Live Entertainment</div>\n          <div class=\"event-name\">Music Concerts</div>\n          <div class=\"event-tech\">Massive LED backdrops · Line array PA · Moving light rigs · Custom stage build</div>\n        </div>\n      </article>\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-3.jpg\" alt=\"Corporate event AV production and LED video wall by Dakia\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Corporate</div>\n          <div class=\"event-name\">Corporate Events</div>\n          <div class=\"event-tech\">Presentation LED walls · Conference audio · Podium lighting · IMAG camera screens</div>\n        </div>\n      </article>\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-4.jpg\" alt=\"Exhibition booth LED and AV technology by Dakia Events\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Exhibitions &amp; Trade Shows</div>\n          <div class=\"event-name\">Exhibitions</div>\n          <div class=\"event-tech\">Booth LED solutions · Ambient audio · Accent lighting · Modular display units</div>\n        </div>\n      </article>\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-5.jpg\" alt=\"Conference AV setup, LED wall and sound by Dakia Events\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Corporate</div>\n          <div class=\"event-name\">Conferences</div>\n          <div class=\"event-tech\">Presentation LED walls · Conference audio · Podium lighting · IMAG screens</div>\n        </div>\n      </article>\n\n      <article class=\"event-card\">\n        <div class=\"event-visual\">\n          <img src=\"/assets/event-6.jpg\" alt=\"Private event lighting and production services by Dakia\" loading=\"lazy\">\n        </div>\n        <div class=\"event-info\">\n          <div class=\"event-type\">Private &amp; Lifestyle</div>\n          <div class=\"event-name\">Private Events</div>\n          <div class=\"event-tech\">Ambient LED installations · Boutique sound systems · Designer lighting · VIP staging</div>\n        </div>\n      </article>\n\n    </div>\n  </div>\n</section>\n\n<!-- CLIENTS -->\n<section id=\"clients\" class=\"section-pad\" aria-labelledby=\"clientsTitle\">\n  <div style=\"text-align:center;max-width:900px;margin:0 auto;\">\n    <div class=\"section-tag reveal\" style=\"justify-content:center;\">Trusted By</div>\n    <h2 id=\"clientsTitle\" class=\"section-title reveal reveal-delay-1\">OUR <em>CLIENTS</em></h2>\n    <div class=\"clients-image-wrap reveal reveal-delay-2\">\n      <img src=\"/assets/client-logos.jpg\" alt=\"Selected clients and partners that trust Dakia Events for LED, AV and event production\" loading=\"lazy\">\n    </div>\n    <p class=\"reveal reveal-delay-3\" style=\"font-size:0.85rem;color:var(--muted2);margin-top:2rem;font-style:italic;\">We work with leading corporates, government bodies, hospitality groups, and event agencies across the UAE and GCC.</p>\n  </div>\n</section>\n\n<!-- CAPABILITIES -->\n<section id=\"capabilities\" class=\"section-pad\" aria-labelledby=\"capTitle\">\n  <div class=\"cap-grid\">\n    <div>\n      <div class=\"section-tag reveal\">Deep Expertise</div>\n      <h2 id=\"capTitle\" class=\"section-title reveal reveal-delay-1\">TECHNICAL<br><em>CAPABILITIES</em></h2>\n      <div class=\"gold-line reveal reveal-delay-2\"></div>\n      <div class=\"cap-list reveal reveal-delay-2\">\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">LED Pixel Processing</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Real-time 4K video signal processing, mapping, and blending across multi-panel LED arrays using industry-standard Novastar and Brompton processors.</div>\n        </div>\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">Line Array System Design</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Acoustic modelling and system tuning using EASE and Rational Acoustics Smaart software, ensuring even coverage from front of house to the back row.</div>\n        </div>\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">Lighting Programming &amp; Control</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Full DMX512 and ArtNet control via MA Lighting, ChamSys, and custom media server setups for pixel-mapped and generative show environments.</div>\n        </div>\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">Structural Engineering &amp; Rigging</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Certified rigging operations with full load calculations, truss engineering drawings, and compliance with UAE and international ESTA rigging standards.</div>\n        </div>\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">Sports &amp; FIBA Venue Technology</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Venue-ready LED courtside systems, scoreboards, 24-second shot clocks, ribbon displays, broadcast-calibrated lighting and technical ground support for basketball and multi-sport environments.</div>\n        </div>\n        <div class=\"cap-item\">\n          <div class=\"cap-item-header\">\n            <div class=\"cap-item-title\">Power Distribution &amp; Management</div>\n            <div class=\"cap-arrow\" aria-hidden=\"true\"><svg viewBox=\"0 0 10 10\"><polyline points=\"2 8 8 2\"/><polyline points=\"3 2 8 2 8 7\"/></svg></div>\n          </div>\n          <div class=\"cap-item-desc\">Clean power distribution with load balancing, generator tie-in, and UPS backup solutions to guarantee zero interruptions during live events.</div>\n        </div>\n      </div>\n    </div>\n    <div class=\"cap-visual reveal reveal-delay-3\">\n      <div class=\"tech-specs\">\n        <div class=\"tech-specs-header\">\n          <div class=\"tech-specs-title\">Equipment Readiness</div>\n          <div class=\"live-dot\" aria-hidden=\"true\"></div>\n        </div>\n        <div class=\"specs-list\">\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">LED Inventory</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:92%; animation-delay:0.1s\"></div></div>\n            <div class=\"spec-val\">8K+ panels</div>\n          </div>\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">Audio Systems</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:85%; animation-delay:0.2s\"></div></div>\n            <div class=\"spec-val\">150kW+</div>\n          </div>\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">Moving Lights</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:78%; animation-delay:0.3s\"></div></div>\n            <div class=\"spec-val\">300+ units</div>\n          </div>\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">Truss Stock</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:88%; animation-delay:0.4s\"></div></div>\n            <div class=\"spec-val\">2,000m+</div>\n          </div>\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">Stage Decks</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:72%; animation-delay:0.5s\"></div></div>\n            <div class=\"spec-val\">500m²</div>\n          </div>\n          <div class=\"spec-row\">\n            <div class=\"spec-name\">Generator Capacity</div>\n            <div class=\"spec-bar-wrap\"><div class=\"spec-bar\" style=\"width:95%; animation-delay:0.6s\"></div></div>\n            <div class=\"spec-val\">2 MVA</div>\n          </div>\n        </div>\n      </div>\n\n      <div style=\"margin-top:1.5rem; border:1px solid var(--border2); background:var(--black2); padding:2rem;\">\n        <div class=\"section-tag\" style=\"margin-bottom:1rem;\">Our Reach</div>\n        <div style=\"display:flex;flex-direction:column;gap:0.75rem;\">\n          <div style=\"display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);\">\n            <span style=\"font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)\">Ajman</span>\n            <span style=\"font-family:'Bebas Neue',sans-serif;color:var(--gold);font-size:0.9rem;letter-spacing:0.1em\">HQ / Base</span>\n          </div>\n          <div style=\"display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);\">\n            <span style=\"font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)\">Dubai · Abu Dhabi · Sharjah</span>\n            <span style=\"font-family:'Bebas Neue',sans-serif;color:var(--white2);font-size:0.9rem;letter-spacing:0.1em\">UAE Coverage</span>\n          </div>\n          <div style=\"display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);\">\n            <span style=\"font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)\">KSA · Qatar · Kuwait</span>\n            <span style=\"font-family:'Bebas Neue',sans-serif;color:var(--white2);font-size:0.9rem;letter-spacing:0.1em\">GCC Export</span>\n          </div>\n          <div style=\"display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;\">\n            <span style=\"font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)\">Beyond GCC</span>\n            <span style=\"font-family:'Bebas Neue',sans-serif;color:var(--muted2);font-size:0.9rem;letter-spacing:0.1em\">On Request</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- PROCESS -->\n<section id=\"process\" class=\"section-pad\" aria-labelledby=\"processTitle\">\n  <div style=\"text-align:center;max-width:700px;margin:0 auto 5rem;\">\n    <div class=\"section-tag reveal\" style=\"justify-content:center;text-align:center;\">How We Work</div>\n    <h2 id=\"processTitle\" class=\"section-title reveal reveal-delay-1\">FROM BRIEF TO <em>SHOWTIME.</em></h2>\n    <p class=\"reveal reveal-delay-2\" style=\"font-size:0.95rem;color:var(--muted);line-height:1.8;margin-top:1.5rem;\">From your first call to final de-rig, every stage is managed with precision, transparency and clear communication.</p>\n  </div>\n  <div class=\"process-steps\">\n    <div class=\"process-step reveal\">\n      <div class=\"step-num-wrap\"><div class=\"step-num\">01</div></div>\n      <div class=\"step-title\">Brief &amp; Site Survey</div>\n      <div class=\"step-desc\">We listen, ask the right questions, and map your creative vision against venue and technical reality.</div>\n    </div>\n    <div class=\"process-step reveal reveal-delay-1\">\n      <div class=\"step-num-wrap\"><div class=\"step-num\">02</div></div>\n      <div class=\"step-title\">Technical Design</div>\n      <div class=\"step-desc\">Technical drawings, system schematics, and 3D stage visualizations crafted by our in-house team.</div>\n    </div>\n    <div class=\"process-step reveal reveal-delay-2\">\n      <div class=\"step-num-wrap\"><div class=\"step-num\">03</div></div>\n      <div class=\"step-title\">Production &amp; Testing</div>\n      <div class=\"step-desc\">Systems are prepped, racked and bench-tested in our warehouse before a single truck rolls.</div>\n    </div>\n    <div class=\"process-step reveal reveal-delay-3\">\n      <div class=\"step-num-wrap\"><div class=\"step-num\">04</div></div>\n      <div class=\"step-title\">Live Delivery &amp; Support</div>\n      <div class=\"step-desc\">Seamless build, full technical rehearsal and expert live show operation — on-site the entire time.</div>\n    </div>\n  </div>\n</section>\n\n<!-- PROJECTS FOCUS -->\n<section id=\"projects\" class=\"section-pad\" aria-labelledby=\"projectsTitle\">\n  <div style=\"max-width:1400px;margin:0 auto;\">\n    <div>\n      <div class=\"section-tag reveal\">Selected Focus</div>\n      <h2 id=\"projectsTitle\" class=\"section-title reveal reveal-delay-1\">PROJECTS &amp; <em>EVENT TECHNOLOGY</em></h2>\n    </div>\n    <div class=\"project-grid\">\n      <article class=\"project-card reveal\">\n        <b>Sports &amp; FIBA</b>\n        <span>LED courtside systems · scoreboards · ribbon displays · shot clocks · broadcast-calibrated lighting · technical ground support for basketball and arena sports environments.</span>\n      </article>\n      <article class=\"project-card reveal reveal-delay-1\">\n        <b>Corporate &amp; Conferences</b>\n        <span>Main-stage LED walls · projection mapping · wireless mics · conference audio · intelligent lighting · show control · IMAG camera systems.</span>\n      </article>\n      <article class=\"project-card reveal reveal-delay-2\">\n        <b>Concerts &amp; Live Shows</b>\n        <span>Large-format LED backdrops · FOH/BOH audio systems · line arrays · moving-head lighting packages · custom stage build · rigging and ground support.</span>\n      </article>\n    </div>\n  </div>\n</section>\n\n<!-- TESTIMONIALS -->\n<section id=\"testimonials\" class=\"section-pad\" aria-labelledby=\"testiTitle\">\n  <div style=\"max-width:1400px;margin:0 auto;\">\n    <div style=\"display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;\">\n      <div>\n        <div class=\"section-tag reveal\">Client Voices</div>\n        <h2 id=\"testiTitle\" class=\"section-title reveal reveal-delay-1\">WHAT THEY <em>SAY</em></h2>\n      </div>\n    </div>\n    <div class=\"testimonials-grid\">\n      <article class=\"testi-card reveal\">\n        <span class=\"testi-quote\" aria-hidden=\"true\">\"</span>\n        <div class=\"star-row\" aria-hidden=\"true\"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>\n        <p class=\"testi-text\">The LED wall Dakia installed for our product launch was flawless. Every pixel was calibrated perfectly and the visual impact had our guests genuinely stunned. These are pros who understand luxury events in the UAE.</p>\n        <div class=\"testi-author\">\n          <div class=\"testi-avatar\" aria-hidden=\"true\">AH</div>\n          <div>\n            <div class=\"testi-name\">Ahmed Hassan</div>\n            <div class=\"testi-role\">Events Director, Dubai Corporate Group</div>\n          </div>\n        </div>\n      </article>\n      <article class=\"testi-card reveal reveal-delay-1\">\n        <span class=\"testi-quote\" aria-hidden=\"true\">\"</span>\n        <div class=\"star-row\" aria-hidden=\"true\"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>\n        <p class=\"testi-text\">We've used Dakia for three consecutive annual conferences. Their crew is incredibly efficient, the audio was perfect in a 3,000-seat ballroom, and they never missed a cue. Total professionals.</p>\n        <div class=\"testi-author\">\n          <div class=\"testi-avatar\" aria-hidden=\"true\">SQ</div>\n          <div>\n            <div class=\"testi-name\">Sara Al Qassimi</div>\n            <div class=\"testi-role\">Operations Manager, Expo Authority UAE</div>\n          </div>\n        </div>\n      </article>\n      <article class=\"testi-card reveal reveal-delay-2\">\n        <span class=\"testi-quote\" aria-hidden=\"true\">\"</span>\n        <div class=\"star-row\" aria-hidden=\"true\"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>\n        <p class=\"testi-text\">Our music festival had 15,000 attendees and Dakia's stage build and sound system performed beyond our expectations. The rig looked spectacular and sounded even better. Booking them again next year.</p>\n        <div class=\"testi-author\">\n          <div class=\"testi-avatar\" aria-hidden=\"true\">MR</div>\n          <div>\n            <div class=\"testi-name\">Majid Al Rashidi</div>\n            <div class=\"testi-role\">Founder, Gulf Entertainment Agency</div>\n          </div>\n        </div>\n      </article>\n    </div>\n  </div>\n</section>\n\n<!-- CONTACT -->\n<section id=\"contact\" class=\"section-pad\" aria-labelledby=\"contactTitle\">\n  <div class=\"contact-wrap\">\n    <div class=\"contact-info\">\n      <div>\n        <div class=\"section-tag reveal\">Let's Create Something</div>\n        <h2 id=\"contactTitle\" class=\"section-title reveal reveal-delay-1\">EXTRAORDINARY<br><em>TOGETHER.</em></h2>\n        <div class=\"gold-line reveal reveal-delay-2\"></div>\n        <p class=\"reveal reveal-delay-2\">Tell us about your event and our team will get back to you with the perfect technical solution. Whether you're planning a stadium concert or a boardroom conference, we have the team and technology to make it exceptional.</p>\n      </div>\n\n      <div class=\"quick-links reveal reveal-delay-2\">\n        <a href=\"https://wa.me/971525089299\" target=\"_blank\" rel=\"noopener noreferrer\" data-track=\"whatsapp_click\">WhatsApp<small>+971 52 508 9299</small></a>\n        <a href=\"tel:+971545826560\" data-track=\"phone_click\">Call Us<small>+971 54 582 6560</small></a>\n        <a href=\"mailto:info@dakia-events.com\" data-track=\"email_click\">Email Us<small>info@dakia-events.com</small></a>\n        <a href=\"#about\">Our Location<small>Ajman, United Arab Emirates</small></a>\n      </div>\n\n      <div class=\"contact-detail reveal reveal-delay-3\">\n        <div class=\"detail-item\">\n          <div class=\"detail-icon\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>\n          </div>\n          <div>\n            <div class=\"detail-label\">Location</div>\n            <div class=\"detail-val\">Ajman, United Arab Emirates</div>\n          </div>\n        </div>\n        <div class=\"detail-item\">\n          <div class=\"detail-icon\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.47 2 2 0 0 1 3.56 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/></svg>\n          </div>\n          <div>\n            <div class=\"detail-label\">Phone · WhatsApp</div>\n            <div class=\"detail-val\"><a href=\"tel:+97152 508 9299\" data-track=\"phone_click\">+971 52 508 9299</a></div>\n          </div>\n        </div>\n        <div class=\"detail-item\">\n          <div class=\"detail-icon\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><polyline points=\"22,6 12,13 2,6\"/></svg>\n          </div>\n          <div>\n            <div class=\"detail-label\">Email</div>\n            <div class=\"detail-val\"><a href=\"mailto:info@dakia-events.com\" data-track=\"email_click\">info@dakia-events.com</a></div>\n          </div>\n        </div>\n        <div class=\"detail-item\">\n          <div class=\"detail-icon\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>\n          </div>\n          <div>\n            <div class=\"detail-label\">Response Time</div>\n            <div class=\"detail-val\">Within 2 business hours</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <form id=\"quoteForm\" class=\"contact-form reveal reveal-delay-2\" novalidate>\n      <input class=\"honeypot\" type=\"text\" name=\"website\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\">\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label for=\"fullName\">Full Name *</label>\n          <input id=\"fullName\" name=\"fullName\" type=\"text\" autocomplete=\"name\" minlength=\"2\" maxlength=\"100\" required placeholder=\"Your name\">\n          <span class=\"error\" id=\"fullNameError\" role=\"alert\"></span>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"company\">Company</label>\n          <input id=\"company\" name=\"company\" type=\"text\" autocomplete=\"organization\" maxlength=\"120\" placeholder=\"Your company\">\n        </div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label for=\"email\">Email Address *</label>\n          <input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" maxlength=\"160\" required placeholder=\"you@example.com\">\n          <span class=\"error\" id=\"emailError\" role=\"alert\"></span>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"phone\">Phone Number *</label>\n          <input id=\"phone\" name=\"phone\" type=\"tel\" autocomplete=\"tel\" maxlength=\"30\" required placeholder=\"+971 50 123 4567\">\n          <span class=\"error\" id=\"phoneError\" role=\"alert\"></span>\n        </div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label for=\"eventType\">Event Type *</label>\n          <select id=\"eventType\" name=\"eventType\" required>\n            <option value=\"\">Select event type</option>\n            <option>Sports / FIBA</option>\n            <option>Music Concert</option>\n            <option>Corporate Event</option>\n            <option>Concert / Live Show</option>\n            <option>Exhibition</option>\n            <option>Conference</option>\n            <option>Government Event</option>\n            <option>Wedding / Private Event</option>\n            <option>Other</option>\n          </select>\n          <span class=\"error\" id=\"eventTypeError\" role=\"alert\"></span>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"eventDate\">Event Date</label>\n          <input id=\"eventDate\" name=\"eventDate\" type=\"date\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"budget\">Estimated Budget</label>\n        <select id=\"budget\" name=\"budget\">\n          <option value=\"\">Select range (optional)</option>\n          <option>Under AED 10,000</option>\n          <option>AED 10,000 – 50,000</option>\n          <option>AED 50,000 – 150,000</option>\n          <option>AED 150,000 – 500,000</option>\n          <option>AED 500,000+</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"details\">Tell us about your event *</label>\n        <textarea id=\"details\" name=\"details\" minlength=\"20\" maxlength=\"3000\" required placeholder=\"Date, venue, audience size, specific technical requirements, preferred vendors or riders…\"></textarea>\n        <span class=\"error\" id=\"detailsError\" role=\"alert\"></span>\n      </div>\n      <div class=\"form-submit\">\n        <button id=\"submitBtn\" class=\"btn-primary\" type=\"submit\">Send Inquiry <span style=\"margin-left:0.5rem\">→</span></button>\n        <p id=\"formStatus\" class=\"form-status\" role=\"status\" aria-live=\"polite\"></p>\n      </div>\n      <p class=\"privacy-note\">By submitting this form, you agree that Dakia Events may use the provided information to respond to your enquiry. Read our <a href=\"/privacy\">Privacy Policy</a> and <a href=\"/terms\">Terms &amp; Conditions</a>.</p>\n    </form>\n  </div>\n</section>\n\n</main>\n\n<!-- FOOTER -->\n<footer role=\"contentinfo\">\n  <div class=\"footer-main\">\n    <div class=\"footer-brand\">\n      <a href=\"#hero\" class=\"nav-logo\" aria-label=\"Dakia Events home\">\n        <img src=\"/assets/dakia-logo.webp\" alt=\"\" width=\"40\" height=\"40\" onerror=\"this.onerror=null;this.src='/assets/dakia-logo.png';\">\n        <span class=\"nav-logo-wordmark\"><strong>DAKIA</strong><small>EVENTS</small></span>\n      </a>\n      <p>Professional arena operations and event production company based in Ajman, UAE. Delivering world-class LED, sound, lighting, staging and technical event production across the UAE and GCC — including FIBA and sports venue technology.</p>\n      <div class=\"footer-social\">\n        <a class=\"social-btn\" href=\"#\" aria-label=\"LinkedIn\" data-social=\"linkedin\">IN</a>\n        <a class=\"social-btn\" href=\"#\" aria-label=\"Instagram\" data-social=\"instagram\">IG</a>\n        <a class=\"social-btn\" href=\"#\" aria-label=\"YouTube\" data-social=\"youtube\">YT</a>\n        <a class=\"social-btn\" href=\"https://wa.me/971525089299\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"WhatsApp\">WA</a>\n      </div>\n    </div>\n    <div class=\"footer-col\">\n      <h4>Services</h4>\n      <div class=\"footer-links\">\n        <a href=\"#services\">LED Video Walls</a>\n        <a href=\"#services\">Sound Systems</a>\n        <a href=\"#services\">Lighting Design</a>\n        <a href=\"#services\">Stage &amp; Rigging</a>\n        <a href=\"#services\">Event Production</a>\n        <a href=\"#services\">AV Rental</a>\n      </div>\n    </div>\n    <div class=\"footer-col\">\n      <h4>Events</h4>\n      <div class=\"footer-links\">\n        <a href=\"#events\">Sports &amp; FIBA</a>\n        <a href=\"#events\">Music Concerts</a>\n        <a href=\"#events\">Corporate Events</a>\n        <a href=\"#events\">Conferences</a>\n        <a href=\"#events\">Exhibitions</a>\n        <a href=\"#events\">Private Events</a>\n      </div>\n    </div>\n    <div class=\"footer-col\">\n      <h4>Company</h4>\n      <div class=\"footer-links\">\n        <a href=\"#about\">About Dakia</a>\n        <a href=\"#capabilities\">Capabilities</a>\n        <a href=\"#process\">Our Process</a>\n        <a href=\"#projects\">Projects</a>\n        <a href=\"/privacy\">Privacy Policy</a>\n        <a href=\"/terms\">Terms &amp; Conditions</a>\n        <a href=\"/intel\">Sitemap</a>\n        <a href=\"#contact\">Contact Us</a>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer-bottom\">\n    <div class=\"footer-copy\">© 2026 Dakia Events · Ajman, UAE. All Rights Reserved.</div>\n    <div class=\"footer-copy\">LED · AV · SOUND · LIGHTING · STAGING · EVENT PRODUCTION</div>\n  </div>\n</footer>\n";
function productFromTitle(title) {
	const t = title.toLowerCase();
	if (t.includes("led")) return "LED_VIDEO_WALL";
	if (t.includes("sound")) return "SOUND_SYSTEM";
	if (t.includes("light")) return "LIGHTING";
	if (t.includes("stage") || t.includes("rigging")) return "STAGE_RIGGING";
	if (t.includes("production")) return "EVENT_PRODUCTION";
	if (t.includes("rental") || t.includes("av")) return "AV_RENTAL";
	return "UNKNOWN";
}
function projectType(name) {
	const t = name.toLowerCase();
	if (t.includes("sport") || t.includes("fiba")) return "SPORTS";
	if (t.includes("concert") || t.includes("music")) return "CONCERT";
	if (t.includes("exhibit")) return "EXHIBITION";
	if (t.includes("conference")) return "CONFERENCE";
	if (t.includes("corporate")) return "CORPORATE";
	if (t.includes("private")) return "PRIVATE";
	return "OTHER";
}
function mountDakiaRuntime(root) {
	const cleanups = [];
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const cursor = root.querySelector("#cursor");
	const ring = root.querySelector("#cursorRing");
	if (cursor && ring && window.matchMedia("(pointer: fine)").matches) {
		let mx = 0, my = 0, rx = 0, ry = 0;
		const onMove = (e) => {
			mx = e.clientX;
			my = e.clientY;
			cursor.style.left = `${mx - 4}px`;
			cursor.style.top = `${my - 4}px`;
		};
		document.addEventListener("mousemove", onMove);
		let raf = 0;
		const anim = () => {
			rx += (mx - rx) * .12;
			ry += (my - ry) * .12;
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
	const navLinks = [...root.querySelectorAll("#desktopNav a[href^=\"#\"], .mobile-nav a[href^=\"#\"]")];
	const sections = [...root.querySelectorAll("main section[id]")];
	const navObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const id = entry.target.id;
			navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
		});
	}, {
		rootMargin: "-35% 0px -55% 0px",
		threshold: 0
	});
	sections.forEach((s) => navObserver.observe(s));
	cleanups.push(() => navObserver.disconnect());
	const mobileNav = root.querySelector("#mobileNav");
	const menuButton = root.querySelector("#hamburger");
	const setMenu = (open) => {
		if (!mobileNav || !menuButton) return;
		mobileNav.classList.toggle("open", open);
		mobileNav.hidden = !open;
		menuButton.setAttribute("aria-expanded", String(open));
		menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
	};
	window.toggleMobile = () => setMenu(!mobileNav?.classList.contains("open"));
	window.closeMobile = () => setMenu(false);
	mobileNav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
	const onKey = (e) => {
		if (e.key === "Escape") setMenu(false);
	};
	document.addEventListener("keydown", onKey);
	cleanups.push(() => document.removeEventListener("keydown", onKey));
	const revealEls = root.querySelectorAll(".reveal");
	const revealObs = new IntersectionObserver((entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("visible");
				revealObs.unobserve(e.target);
			}
		});
	}, {
		threshold: .12,
		rootMargin: "0px 0px -40px 0px"
	});
	revealEls.forEach((el) => revealObs.observe(el));
	revealEls.forEach((el, i) => {
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) window.setTimeout(() => el.classList.add("visible"), i * 60);
	});
	cleanups.push(() => revealObs.disconnect());
	const eventsTrack = root.querySelector("#eventsTrack");
	const scrollEvents = (amount) => eventsTrack?.scrollBy({
		left: amount,
		behavior: reduced ? "auto" : "smooth"
	});
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
		let isDragging = false, startX = 0, scrollLeft = 0;
		const down = (e) => {
			isDragging = true;
			startX = e.pageX - eventsTrack.offsetLeft;
			scrollLeft = eventsTrack.scrollLeft;
		};
		const up = () => {
			isDragging = false;
		};
		const move = (e) => {
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
		const grid = root.querySelector(".hero-grid-lines");
		if (grid) grid.style.transform = `translateY(${window.scrollY * .3}px)`;
	};
	window.addEventListener("scroll", onParallax, { passive: true });
	cleanups.push(() => window.removeEventListener("scroll", onParallax));
	root.querySelectorAll("[data-track]").forEach((el) => {
		const handler = () => track(el.dataset.track || "click", { label: (el.textContent || "").trim().slice(0, 80) });
		el.addEventListener("click", handler);
		cleanups.push(() => el.removeEventListener("click", handler));
	});
	root.querySelectorAll("a[href^=\"tel:\"]").forEach((a) => {
		const handler = () => track("phone_click");
		a.addEventListener("click", handler);
		cleanups.push(() => a.removeEventListener("click", handler));
	});
	root.querySelectorAll("a[href^=\"mailto:\"]").forEach((a) => {
		const handler = () => track("email_click");
		a.addEventListener("click", handler);
		cleanups.push(() => a.removeEventListener("click", handler));
	});
	root.querySelectorAll("a[href*=\"wa.me\"]").forEach((a) => {
		const handler = () => track("whatsapp_click");
		a.addEventListener("click", handler);
		cleanups.push(() => a.removeEventListener("click", handler));
	});
	root.querySelectorAll("[data-social]").forEach((a) => {
		const handler = (e) => {
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
	const viewObs = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const el = entry.target;
			if (el.classList.contains("service-card")) {
				const title = el.querySelector(".service-title")?.textContent?.trim() || "service";
				const product = productFromTitle(title);
				track("product_view", {
					product_type: product,
					item_name: title,
					rental_or_sale: "RENTAL"
				});
				if (product === "LED_VIDEO_WALL") track("led_product_view", {
					product_type: product,
					item_name: title
				});
			}
			if (el.classList.contains("event-card")) {
				const name = el.querySelector(".event-name")?.textContent?.trim() || "event";
				const type = projectType(name);
				track("project_view", {
					project_type: type,
					item_name: name
				});
				if (type === "SPORTS") track("fiba_project_view", {
					project_type: type,
					venue_type: "ARENA"
				});
				if (type === "CONCERT") track("concert_project_view", { project_type: type });
				if (type === "EXHIBITION") track("exhibition_project_view", { project_type: type });
				track("event_project_view", { project_type: type });
			}
			if (el.classList.contains("project-card")) {
				const name = el.querySelector("b")?.textContent?.trim() || "project";
				track("sports_project_view", {
					project_type: projectType(name),
					item_name: name
				});
			}
			viewObs.unobserve(el);
		});
	}, { threshold: .45 });
	root.querySelectorAll(".service-card, .event-card, .project-card").forEach((el) => viewObs.observe(el));
	cleanups.push(() => viewObs.disconnect());
	const form = root.querySelector("#quoteForm");
	const status = root.querySelector("#formStatus");
	const submit = root.querySelector("#submitBtn");
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
			fullName: form.querySelector("#fullName"),
			email: form.querySelector("#email"),
			phone: form.querySelector("#phone"),
			eventType: form.querySelector("#eventType"),
			details: form.querySelector("#details")
		};
		const error = (key) => form.querySelector(`#${key}Error`);
		const setError = (key, message) => {
			const field = fields[key];
			const box = error(key);
			field?.setAttribute("aria-invalid", message ? "true" : "false");
			if (box) box.textContent = message;
		};
		const emailOK = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
		const phoneOK = (value) => /^[+()\d\s.-]{7,30}$/.test(value);
		const arrowSpan = submit.querySelector("span");
		const onSubmit = async (event) => {
			event.preventDefault();
			Object.keys(fields).forEach((k) => setError(k, ""));
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
				details: String(values.details).slice(0, 3e3),
				website: ""
			};
			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify(safePayload),
					credentials: "same-origin"
				});
				const result = await response.json().catch(() => ({}));
				if (!response.ok) throw new Error(result.message || `HTTP ${response.status}`);
				form.reset();
				started = false;
				status.textContent = "✓ ENQUIRY RECEIVED — Dakia will review your brief and respond soon.";
				status.className = "form-status success";
				const eventType = safePayload.eventType;
				track("form_submit", { event_type: eventType });
				track("contact_form_submit", { event_type: eventType });
				track("quotation_submit", {
					event_type: eventType,
					rental_or_sale: "RENTAL"
				});
				track("lead_generated", { event_type: eventType });
				if (/fiba|sport/i.test(eventType)) track("led_quote_request", {
					event_type: eventType,
					product_type: "LED_VIDEO_WALL"
				});
			} catch {
				status.textContent = "We could not submit the form. Please email info@dakiaevents.com or call +971 54 582 6560.";
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
function DakiaSite() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		return mountDakiaRuntime(ref.current);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dakia-root",
		ref,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: dakia_body_default }
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsRoot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DakiaSite, {}) });
}
//#endregion
export { Home as component };
