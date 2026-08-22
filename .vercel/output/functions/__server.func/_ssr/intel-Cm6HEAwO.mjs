import { o as __toESM } from "../_runtime.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as summarizeForAi } from "./engine-CfoH9ADi.mjs";
import { r as loadConsent } from "./consent-DuG9pQXb.mjs";
import { a as Shield, c as Earth, d as Activity, i as Sparkles, l as Brain, o as Radio, r as Table2, s as Funnel, t as Workflow, u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intel-Cm6HEAwO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateDailyIntelligence = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("9fcfb67a1ddb797c5252384dcd5259962da8b397c956eca5b01d9ac764e0f760"));
var getIntelSnapshot = createServerFn({ method: "GET" }).validator((input) => ({ rangeDays: [
	7,
	30,
	90
].includes(Number(input?.rangeDays)) ? Number(input.rangeDays) : 30 })).handler(createSsrRpc("6965dde659a9df9761e56f679ed55ad254108c59bed38275fa2b9720d6fd9031"));
var NAV = [
	{
		id: "overview",
		label: "Overview",
		icon: Activity
	},
	{
		id: "acquisition",
		label: "Acquisition",
		icon: Earth
	},
	{
		id: "funnel",
		label: "Funnels",
		icon: Funnel
	},
	{
		id: "leads",
		label: "Leads",
		icon: Table2
	},
	{
		id: "realtime",
		label: "Realtime",
		icon: Radio
	},
	{
		id: "debugger",
		label: "Debugger",
		icon: Workflow
	},
	{
		id: "ai",
		label: "AI Analyst",
		icon: Brain
	},
	{
		id: "architecture",
		label: "Blueprint",
		icon: Sparkles
	},
	{
		id: "privacy",
		label: "Privacy",
		icon: Shield
	}
];
var GOLD = "#c9a84c";
var MUTE = "#888480";
function n(v) {
	return new Intl.NumberFormat("en-AE").format(Math.round(v));
}
function pct(v) {
	return `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`;
}
function aed(v) {
	return `AED ${n(v)}`;
}
function IntelApp() {
	const [view, setView] = (0, import_react.useState)("overview");
	const [range, setRange] = (0, import_react.useState)(30);
	const [snap, setSnap] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		const load = async () => {
			try {
				const data = await getIntelSnapshot({ data: { rangeDays: range } });
				if (alive) {
					setSnap(data);
					setError("");
				}
			} catch (err) {
				if (alive) setError(err instanceof Error ? err.message : "Failed to load intelligence");
			}
		};
		load();
		const t = window.setInterval(load, 12e3);
		return () => {
			alive = false;
			window.clearInterval(t);
		};
	}, [range]);
	if (!snap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-ink text-mute",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-cond text-sm tracking-[0.2em] uppercase",
			children: error || "Loading warehouse…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-56 shrink-0 flex-col border-r border-line bg-elev md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[10px] tracking-[0.32em] text-gold uppercase",
						children: "Dakia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-wide",
						children: "INTELLIGENCE"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-0.5 p-3",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = view === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setView(item.id),
							className: `flex min-h-11 items-center gap-3 px-3 text-left font-cond text-[13px] tracking-[0.12em] uppercase ${active ? "bg-raised text-gold" : "text-mute hover:bg-raised hover:text-paper"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								strokeWidth: 1.6
							}), item.label]
						}, item.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-h-11 items-center gap-2 border-t border-line px-5 py-4 text-mute hover:text-gold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-cond text-[12px] tracking-[0.16em] uppercase",
						children: "Site"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[10px] tracking-[0.28em] text-gold uppercase",
						children: "Website Intelligence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide md:text-4xl",
						children: NAV.find((x) => x.id === view)?.label
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: [
							7,
							30,
							90
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setRange(d),
							className: `min-h-11 px-3 font-cond text-xs tracking-[0.16em] uppercase ${range === d ? "bg-gold text-ink" : "border border-line text-mute hover:text-paper"}`,
							children: [d, "d"]
						}, d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto border-b border-line px-3 py-2 md:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView(item.id),
						className: `min-h-11 shrink-0 px-3 font-cond text-[11px] tracking-[0.14em] uppercase ${view === item.id ? "bg-gold text-ink" : "text-mute"}`,
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-b border-line px-4 py-2 text-xs text-faint md:px-8",
					children: [
						n(snap.seededEvents),
						" seeded rows · ",
						n(snap.liveEventsCount),
						" live consented events · KPIs derived from event records, not hardcoded shares"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 overflow-auto p-4 md:p-8",
					children: [
						view === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { snap }),
						view === "acquisition" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Acquisition, { snap }),
						view === "funnel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelView, { snap }),
						view === "leads" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadsView, { snap }),
						view === "realtime" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeView, { snap }),
						view === "debugger" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebuggerView, { snap }),
						view === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiView, { snap }),
						view === "architecture" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Architecture, {}),
						view === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyView, {})
					]
				})
			]
		})]
	});
}
function Card({ label, value, hint, delta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-elev p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-cond text-[10px] tracking-[0.22em] text-mute uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl tracking-wide text-paper tabular-nums md:text-4xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-center gap-2 text-xs",
				children: [typeof delta === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `tabular-nums ${delta >= 0 ? "text-ok" : "text-bad"}`,
					children: pct(delta)
				}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-faint",
					children: hint
				}) : null]
			})
		]
	});
}
function Overview({ snap }) {
	const series = snap.daily.map((d) => ({
		date: d.date.slice(5),
		users: d.users,
		leads: d.leads,
		value: d.conversionValue
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Users",
						value: n(snap.users),
						delta: snap.usersDelta,
						hint: "vs prior period"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Sessions",
						value: n(snap.sessions),
						hint: `${(snap.engagementRate * 100).toFixed(1)}% engaged`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Leads",
						value: n(snap.leads),
						delta: snap.leadsDelta,
						hint: `${n(snap.qualifiedLeads)} qualified`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						label: "Lead value",
						value: aed(snap.conversionValue),
						hint: `${(snap.conversionRate * 100).toFixed(2)}% conv.`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "Users and leads"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: series,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#1c1c1c",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "date",
									stroke: MUTE,
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: MUTE,
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "#111",
									border: "1px solid #2a2618",
									color: "#f0ede8"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "users",
									stroke: GOLD,
									fill: "rgba(201,168,76,0.16)",
									strokeWidth: 1.6
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "leads",
									stroke: "#e8c96a",
									fill: "rgba(232,201,106,0.08)",
									strokeWidth: 1.6
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-elev p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
						children: "Top pages"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: snap.topPages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-cond tracking-wide text-paper",
								children: p.path
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-mute",
								children: [
									n(p.views),
									" · ",
									p.conversions,
									" conv"
								]
							})]
						}, p.path))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-elev p-4 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
						children: "Anomalies"
					}), snap.anomalies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mute",
						children: "No z-score flags above 2.4 in this window."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: snap.anomalies.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								a.date,
								" · ",
								a.metric
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: a.direction === "up" ? "text-ok tabular-nums" : "text-bad tabular-nums",
								children: [
									a.direction,
									" z=",
									a.z
								]
							})]
						}, `${a.date}-${a.metric}`))
					})]
				})]
			})
		]
	});
}
function Acquisition({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-4 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "Channels"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: snap.channelMix,
							layout: "vertical",
							margin: { left: 24 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#1c1c1c",
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									stroke: MUTE,
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									stroke: MUTE,
									fontSize: 11,
									tickLine: false,
									axisLine: false,
									width: 78
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "#111",
									border: "1px solid #2a2618",
									color: "#f0ede8"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "users",
									fill: GOLD,
									radius: 0
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-4 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
						children: "Device conversion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4",
						children: snap.deviceMix.map((d) => {
							const rate = d.users ? d.leads / d.users : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex justify-between font-cond text-sm uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-mute",
									children: [
										n(d.users),
										" · ",
										(rate * 100).toFixed(2),
										"%"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 bg-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-gold",
									style: { width: `${Math.min(100, rate * 800)}%` }
								})
							})] }, d.name);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm leading-relaxed text-mute",
						children: "Lead rates are counted from sessions that fired quotation_submit or lead_generated, grouped by the device on those same sessions — not allocated from a global percentage."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-4 md:p-6 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "Geography"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: snap.geoMix.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-line bg-ink p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-cond text-xs tracking-[0.16em] text-mute uppercase",
								children: g.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl tabular-nums",
								children: n(g.users)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-gold tabular-nums",
								children: [g.leads, " leads"]
							})
						]
					}, g.name))
				})]
			})
		]
	});
}
function FunnelView({ snap }) {
	const max = snap.funnel[0]?.count || 1;
	const forecastLeads = snap.forecast.filter((f) => f.kind === "forecast").reduce((n0, f) => n0 + f.leads, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-line bg-elev p-4 md:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
				children: "Lead funnel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: snap.funnel.map((step, i) => {
					const prev = snap.funnel[i - 1]?.count ?? step.count;
					const drop = prev ? step.count / prev : 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-cond tracking-wide uppercase",
							children: step.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-mute",
							children: [n(step.count), i > 0 ? ` · ${(drop * 100).toFixed(0)}%` : ""]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-gold",
							style: { width: `${step.count / max * 100}%` }
						})
					})] }, step.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-line bg-elev p-4 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "30-day lead forecast"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-mute",
					children: "Baseline linear model on the last 30 actual days. Not a guaranteed MAPE."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 font-display text-3xl tabular-nums",
					children: [n(forecastLeads), " projected leads"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: snap.forecast.slice(-60),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#1c1c1c",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "date",
									hide: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: MUTE,
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "#111",
									border: "1px solid #2a2618",
									color: "#f0ede8"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "leads",
									stroke: GOLD,
									fill: "rgba(201,168,76,0.14)"
								})
							]
						})
					})
				})
			]
		})]
	});
}
function LeadsView({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-2xl text-sm leading-relaxed text-mute",
			children: "Scores are feature-based (pages, product, source, device) on a 0–100 scale from that session’s event set. They are not CRM outcomes. Qualification is score ≥ 61. PII never enters this table."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-elev font-cond text-[11px] tracking-[0.16em] text-mute uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"When",
						"Event",
						"Product",
						"Source",
						"City",
						"Device",
						"Score",
						"Band"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: snap.leadsList.slice(0, 40).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular-nums text-mute",
							children: new Date(l.ts).toISOString().slice(0, 10)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: l.eventType
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-mute",
							children: l.productType
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: l.source
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: l.city
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: l.device
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular-nums text-gold",
							children: l.score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 uppercase tracking-wide",
							children: l.band.replace("_", " ")
						})
					]
				}, l.id)) })]
			})
		})]
	});
}
function RealtimeView({ snap }) {
	const byCity = snap.realtime.reduce((acc, v) => {
		acc[v.city] = (acc[v.city] ?? 0) + 1;
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
						children: "Active now"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-6xl tabular-nums",
						children: snap.realtime.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-mute",
						children: "Sessions with events in the last 30 minutes."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-5 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "By city"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 md:grid-cols-3",
					children: Object.entries(byCity).map(([city, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between border border-line px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: city }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-gold",
							children: count
						})]
					}, city))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-5 lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
					children: "Active pages"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: snap.realtime.slice(0, 12).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-paper",
							children: v.page
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-mute",
							children: [
								v.city,
								" · ",
								v.device
							]
						})]
					}, v.id))
				})]
			})
		]
	});
}
function DebuggerView({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-mute",
			children: [
				"Last ",
				snap.liveEvents.length,
				" warehouse events (seed + live). Parameters are PII-stripped. Unknown event names are rejected at the collector."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-elev font-cond text-[11px] tracking-[0.16em] text-mute uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Time",
						"Event",
						"Origin",
						"Group",
						"Source",
						"Client"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: snap.liveEvents.slice(0, 50).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 tabular-nums text-mute",
							children: new Date(e.timestamp).toISOString().slice(11, 19)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-gold",
							children: e.event
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 uppercase",
							children: e.origin ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: String(e.params.content_group ?? "—")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: String(e.params.lead_source ?? "—")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-[11px] text-faint",
							children: e.client_id.slice(0, 18)
						})
					]
				}, `${e.timestamp}-${i}`)) })]
			})
		})]
	});
}
function AiView({ snap }) {
	const [text, setText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const run = async () => {
		setBusy(true);
		setNote("");
		try {
			const result = await generateDailyIntelligence({ data: { summary: summarizeForAi(snap) } });
			setText(result.text);
			setNote(result.ok ? "Generated from aggregated metrics only." : result.error);
		} catch (err) {
			setNote(err instanceof Error ? err.message : "Request failed");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-mute",
				children: "The analyst receives curated totals — never emails, phones, names or raw clickstreams. Generation is user-initiated and capped."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy,
				onClick: () => void run(),
				className: "min-h-11 bg-gold px-5 font-cond text-xs tracking-[0.2em] text-ink uppercase disabled:opacity-60",
				children: busy ? "Generating…" : "Generate daily intelligence"
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: note
			}) : null,
			text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "whitespace-pre-wrap border border-line bg-elev p-5 font-sans text-sm leading-relaxed text-paper",
				children: text
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-dashed border-line p-8 text-sm text-mute",
				children: "No briefing yet."
			})
		]
	});
}
function Architecture() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-mute",
				children: "Implementation of GA4 Analytics Architecture v2.0 against the existing Dakia marketing site. Site copy, services, testimonials and contact details are unchanged. Measurement is layered on."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-4",
				children: [
					["Collection", "Data layer → client tags → Consent Mode v2 (default denied) → first-party /api/collect"],
					["Server collector", "Known-event allowlist, PII strip, payload limits, rate limit, consent required — ssGTM analogue"],
					["GA4", "Measurement ID G-PK86GP1MGY, send_page_view off, IP anonymized, no PII, no user_id"],
					["Warehouse", "Postgres event rows (seed + live). Every KPI is grouped from those rows, not hardcoded shares"],
					["Intelligence", "Session funnel, feature lead scoring, z-score anomalies, 30-day linear forecast"],
					["Activation", "This desk, consent banner, assigned AED lead values — not claimed revenue"]
				].map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border border-line bg-elev p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
						children: [
							String(i + 1).padStart(2, "0"),
							" · ",
							t
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: d
					})]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 font-cond text-[11px] tracking-[0.22em] text-gold uppercase",
				children: "Event taxonomy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 text-sm text-mute",
				children: [
					"page_view, session_start, first_visit, user_engagement, scroll",
					"product_view, led_product_view, project_view, fiba_project_view, concert_project_view, exhibition_project_view",
					"form_start, quotation_start, quotation_submit, contact_form_submit, lead_generated",
					"phone_click, whatsapp_click, email_click, consent_update"
				].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-l border-gold pl-3",
					children: e
				}, e))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-line p-5 text-sm leading-relaxed text-mute",
				children: "Corrections applied from the spec: no user_id, no PII, no manual traffic_source overwrite, no fake engagement_time on every hit, consent default denied and first-party gated, conversion values treated as assigned lead values rather than revenue, forecast without a promised error bound, and reconciliation instead of “zero data loss”. Google’s hosted server-side GTM is not running here; /api/collect is the first-party equivalent."
			})
		]
	});
}
function PrivacyView() {
	const c = typeof window !== "undefined" ? loadConsent() : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-mute",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Consent Mode v2 starts denied. Advertising storage stays denied even when analytics is granted — this desk is lead intelligence, not ads personalization. First-party collection is off until you accept." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line bg-elev p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-cond text-[11px] tracking-[0.2em] text-gold uppercase",
					children: "Current state"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-paper",
					children: [
						"Analytics: ",
						c?.analytics_storage ?? "denied",
						" · Decided: ",
						c?.decided ? "yes" : "no"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Forbidden in GA4 payloads: email, phone, name, address, free-text enquiry bodies. The contact API accepts those fields to fulfil the enquiry and does not forward them to measurement." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/privacy",
				className: "inline-flex min-h-11 items-center text-gold",
				children: "Full privacy policy"
			})
		]
	});
}
function IntelPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelApp, {});
}
//#endregion
export { IntelPage as component };
