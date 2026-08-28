import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, i as PageHeader, s as TableShell } from "./shared-BHhPoPN8.js";
import { n as StatusBadge } from "./shared-CHrI43eL.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Eye, Search } from "lucide-react";
//#region resources/js/pages/admin/payment-logs/index.tsx
function PaymentLogsIndex({ logs, filters }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		provider: filters.provider ?? "",
		transaction_status: filters.transaction_status ?? "",
		date_from: filters.date_from ?? "",
		date_to: filters.date_to ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/payment-logs", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Payment Logs" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Sales Management",
			title: "Payment Logs",
			description: "Audit webhook/payment notification Midtrans. Data read-only untuk debugging."
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Webhook Logs",
			description: `${logs.total} payment log`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-5",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Order number"
						}),
						/* @__PURE__ */ jsx(Input, {
							value: data.provider,
							onChange: (event) => setData("provider", event.target.value),
							placeholder: "Provider"
						}),
						/* @__PURE__ */ jsx(Input, {
							value: data.transaction_status,
							onChange: (event) => setData("transaction_status", event.target.value),
							placeholder: "Status"
						}),
						/* @__PURE__ */ jsx(Input, {
							type: "date",
							value: data.date_from,
							onChange: (event) => setData("date_from", event.target.value)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Input, {
								type: "date",
								value: data.date_to,
								onChange: (event) => setData("date_to", event.target.value)
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								variant: "outline",
								disabled: processing,
								children: /* @__PURE__ */ jsx(Search, {})
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b text-left text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "w-14 pr-4 pb-3 font-medium",
									children: "No"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Order"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Provider"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Event"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Processed"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pb-3 text-right font-medium",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y",
							children: logs.data.map((log, index) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
										children: (logs.from ?? 1) + index
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.order_number ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.provider
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.event_type ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(StatusBadge, { status: log.transaction_status })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.processed_at ?? log.created_at ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 text-right",
										children: /* @__PURE__ */ jsx(Button, {
											asChild: true,
											variant: "outline",
											size: "sm",
											children: /* @__PURE__ */ jsxs(Link, {
												href: `/admin/payment-logs/${log.id}`,
												children: [/* @__PURE__ */ jsx(Eye, {}), " View"]
											})
										})
									})
								]
							}, log.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: logs })
			]
		})]
	})] });
}
//#endregion
export { PaymentLogsIndex as default };

//# sourceMappingURL=payment-logs-B0geBAtg.js.map