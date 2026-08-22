import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LegalShell-CsBcM_M7.js
var import_jsx_runtime = require_jsx_runtime();
function LegalShell({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-ink px-6 py-20 text-paper md:px-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-cond text-[11px] tracking-[0.28em] text-gold uppercase",
					children: "Dakia Events"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-5xl tracking-wide",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-5 text-sm leading-relaxed text-mute [&_h2]:mt-8 [&_h2]:font-cond [&_h2]:text-xs [&_h2]:tracking-[0.2em] [&_h2]:text-gold [&_h2]:uppercase [&_a]:text-gold",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex gap-6 font-cond text-xs tracking-[0.16em] uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-paper",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/intel",
							className: "text-gold",
							children: "Intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "text-mute",
							children: "Terms"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LegalShell as t };
