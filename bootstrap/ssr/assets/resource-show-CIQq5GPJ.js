import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Eye, Pencil } from "lucide-react";
//#region resources/js/pages/admin/resource-show.tsx
function displayValue(value) {
	if (typeof value === "boolean") return value ? /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200",
		children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }), "Yes"]
	}) : /* @__PURE__ */ jsxs("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-500 ring-1 ring-stone-200",
		children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-stone-400" }), "No"]
	});
	return value ?? "—";
}
function ResourceShow({ definition, record }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${definition.title} Detail` }),
		/* @__PURE__ */ jsx("style", { children: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .anim-fadeinup { animation: fadeInUp 0.45s ease-out both; }
                .anim-delay-1  { animation-delay: 0.05s; }
                .anim-delay-2  { animation-delay: 0.12s; }
                .field-card    { animation: fadeInUp 0.4s ease-out both; }
            ` }),
		/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-6 px-4 py-6 lg:px-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "anim-fadeinup relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] lg:p-8",
				children: [
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/5 blur-3xl" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-6 left-1/4 h-28 w-28 rounded-full bg-amber-300/10 blur-2xl" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex flex-col justify-between gap-4 lg:flex-row lg:items-center",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-2 text-xs font-semibold tracking-widest text-stone-400 uppercase",
								children: [/* @__PURE__ */ jsx(Eye, { size: 12 }), definition.group]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-2 text-3xl font-bold text-white lg:text-4xl",
								children: [definition.title, /* @__PURE__ */ jsx("span", {
									className: "ml-3 text-stone-400",
									children: "Detail"
								})]
							}),
							record?.id && /* @__PURE__ */ jsxs("p", {
								className: "mt-1 font-mono text-xs text-stone-400",
								children: ["ID: ", String(record.id)]
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsxs(Link, {
								href: `/admin/${definition.key}`,
								className: "inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 16 }), "Back"]
							}), !definition.readonly && record?.id && /* @__PURE__ */ jsxs(Link, {
								href: `/admin/${definition.key}/${record.id}/edit`,
								className: "inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-stone-900 shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]",
								children: [/* @__PURE__ */ jsx(Pencil, { size: 15 }), "Edit"]
							})]
						})]
					})
				]
			}), !record ? /* @__PURE__ */ jsxs("div", {
				className: "anim-fadeinup anim-delay-1 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-stone-200 bg-stone-50 py-20 text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-400",
						children: /* @__PURE__ */ jsx(Eye, { size: 28 })
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "font-semibold text-stone-600",
						children: "Record not found"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-stone-400",
						children: "The requested record does not exist or has been removed."
					})] }),
					/* @__PURE__ */ jsxs(Link, {
						href: `/admin/${definition.key}`,
						className: "inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-900 hover:text-white",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { size: 14 }), "Go back"]
					})
				]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "anim-fadeinup anim-delay-1 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "border-b border-stone-100 bg-stone-50/60 px-6 py-4",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold tracking-wider text-stone-400 uppercase",
						children: "Record Fields"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-0 divide-y divide-stone-50 md:grid-cols-2 md:divide-y-0",
					children: Object.entries(record).map(([key, value], idx) => /* @__PURE__ */ jsxs("div", {
						className: "field-card group flex flex-col gap-1.5 border-b border-stone-50 px-6 py-5 transition-colors duration-150 hover:bg-stone-50/60",
						style: { animationDelay: `${.12 + idx * .04}s` },
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-semibold tracking-widest text-stone-400 uppercase",
							children: key.replaceAll("_", " ")
						}), /* @__PURE__ */ jsx("div", {
							className: "text-sm font-medium break-words text-stone-800",
							children: displayValue(value)
						})]
					}, key))
				})]
			})]
		})
	] });
}
//#endregion
export { ResourceShow as default };

//# sourceMappingURL=resource-show-CIQq5GPJ.js.map