import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { u as formatPrice } from "./shared-BHhPoPN8.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, Download, Search } from "lucide-react";
//#region resources/js/pages/admin/reports/index.tsx
function metricValue(metric) {
	return metric.format === "currency" ? formatPrice(metric.value) : new Intl.NumberFormat("id-ID").format(metric.value);
}
function titleCase(value) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
function ReportIndex({ type, tabs, filters, options, report }) {
	const { data, setData, get, processing } = useForm(filters);
	const submit = (event) => {
		event.preventDefault();
		get(`/admin/reports/${type}`, {
			preserveState: true,
			replace: true
		});
	};
	const query = new URLSearchParams(Object.entries(data).filter(([, value]) => value !== "")).toString();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${type} Report` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-8 bg-white p-4 text-zinc-900 md:p-6",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("p", {
						className: "mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-[#151515]/50 uppercase",
						children: [/* @__PURE__ */ jsx(BarChart3, {
							className: "size-4",
							strokeWidth: 1.7
						}), "Reports"]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-serif text-4xl leading-tight text-zinc-900",
						children: [titleCase(type), " Report"]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 max-w-2xl text-sm leading-6 text-zinc-400",
						children: "Ringkasan data toko untuk order, produk, customer, shipment, dan voucher."
					})
				] }), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					className: "h-9 rounded-lg bg-primary px-4 text-white shadow-none hover:bg-primary/90 active:scale-[0.98]",
					children: /* @__PURE__ */ jsxs("a", {
						href: `/admin/reports/${type}/export?${query}`,
						children: [/* @__PURE__ */ jsx(Download, { className: "size-4" }), " Export CSV"]
					})
				})]
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "flex flex-wrap gap-2 border-b border-zinc-200 pb-3",
				children: tabs.map((tab) => /* @__PURE__ */ jsx(Link, {
					href: `/admin/reports/${tab}`,
					className: `rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${tab === type ? "border-[#151515] bg-primary text-white" : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`,
					children: titleCase(tab)
				}, tab))
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-3 rounded-2xl border border-zinc-200 p-4 md:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ jsx(Input, {
						type: "date",
						value: data.date_from,
						onChange: (event) => setData("date_from", event.target.value),
						className: "h-9 rounded-lg border-zinc-200 bg-white text-sm shadow-none"
					}),
					/* @__PURE__ */ jsx(Input, {
						type: "date",
						value: data.date_to,
						onChange: (event) => setData("date_to", event.target.value),
						className: "h-9 rounded-lg border-zinc-200 bg-white text-sm shadow-none"
					}),
					/* @__PURE__ */ jsxs("select", {
						value: data.payment_status,
						onChange: (event) => setData("payment_status", event.target.value),
						className: "h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 transition-colors outline-none focus:border-[#151515]",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "All payment"
						}), options.paymentStatuses.map((status) => /* @__PURE__ */ jsx("option", {
							value: status,
							children: status
						}, status))]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: data.order_status,
						onChange: (event) => setData("order_status", event.target.value),
						className: "h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 transition-colors outline-none focus:border-[#151515]",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "All order"
						}), options.orderStatuses.map((status) => /* @__PURE__ */ jsx("option", {
							value: status,
							children: status
						}, status))]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: data.category_id,
						onChange: (event) => setData("category_id", event.target.value),
						className: "h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 transition-colors outline-none focus:border-[#151515]",
						children: [/* @__PURE__ */ jsx("option", {
							value: "",
							children: "All categories"
						}), options.categories.map((category) => /* @__PURE__ */ jsx("option", {
							value: category.id,
							children: category.name
						}, category.id))]
					}),
					/* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: processing,
						className: "h-9 rounded-lg border-zinc-200 bg-white text-zinc-600 shadow-none hover:bg-zinc-50",
						children: [/* @__PURE__ */ jsx(Search, { className: "size-4" }), " Apply"]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "grid overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:grid-cols-2 xl:grid-cols-5",
				children: report.metrics.map((metric) => /* @__PURE__ */ jsxs("div", {
					className: "border-r border-b border-zinc-200 px-5 py-5 last:border-r-0",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-semibold text-zinc-500",
						children: metric.label
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-2xl font-bold tracking-tight text-zinc-900",
						children: metricValue(metric)
					})]
				}, metric.label))
			}),
			report.tables.map((table) => /* @__PURE__ */ jsxs("section", {
				className: "rounded-2xl border border-zinc-200 p-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-5 flex items-end justify-between gap-4",
					children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold tracking-tight text-zinc-900",
						children: table.title
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-sm text-zinc-400",
						children: [table.rows.length, " rows"]
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full min-w-[760px] border-y border-zinc-200 text-sm",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "border-b border-zinc-200 bg-zinc-50/70 text-xs tracking-wider text-zinc-500 uppercase",
							children: /* @__PURE__ */ jsxs("tr", {
								className: "text-left",
								children: [/* @__PURE__ */ jsx("th", {
									className: "w-14 py-4 pr-4 pl-4 font-semibold",
									children: "No"
								}), table.columns.map((column) => /* @__PURE__ */ jsx("th", {
									className: "py-4 pr-4 font-semibold",
									children: column.replaceAll("_", " ")
								}, column))]
							})
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-zinc-200",
							children: [table.rows.map((row, index) => /* @__PURE__ */ jsxs("tr", {
								className: "transition-colors hover:bg-zinc-50/70",
								children: [/* @__PURE__ */ jsx("td", {
									className: "py-4 pr-4 pl-4 text-xs font-medium text-zinc-400",
									children: index + 1
								}), table.columns.map((column) => /* @__PURE__ */ jsx("td", {
									className: "py-4 pr-4 text-zinc-600",
									children: formatCell(column, row[column])
								}, column))]
							}, index)), table.rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: table.columns.length + 1,
								className: "px-4 py-8 text-center text-sm text-zinc-400",
								children: "No report data found."
							}) })]
						})]
					})
				})]
			}, table.title))
		]
	})] });
}
function formatCell(column, value) {
	if (value === null || value === void 0 || value === "") return "-";
	if ([
		"grand_total",
		"revenue",
		"total_spending",
		"total_discount"
	].includes(column)) return formatPrice(Number(value));
	return String(value);
}
//#endregion
export { ReportIndex as default };

//# sourceMappingURL=reports-CvTcUyZ1.js.map