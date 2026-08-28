import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, i as PageHeader, s as TableShell } from "./shared-BHhPoPN8.js";
import "./shared-CHrI43eL.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Eye, Search } from "lucide-react";
//#region resources/js/pages/admin/biteship-webhook-logs/index.tsx
function BiteshipWebhookLogsIndex({ logs, filters }) {
	const { data, setData, get, processing } = useForm({
		event_type: filters.event_type ?? "",
		waybill_id: filters.waybill_id ?? "",
		date_from: filters.date_from ?? "",
		date_to: filters.date_to ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/biteship-webhook-logs", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Biteship Webhook Logs" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Sales Management",
			title: "Biteship Webhook Logs",
			description: "Audit webhook Biteship untuk tracking dan status pengiriman."
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Webhook Logs",
			description: `${logs.total} Biteship webhook log`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.event_type,
							onChange: (event) => setData("event_type", event.target.value),
							placeholder: "Event type"
						}),
						/* @__PURE__ */ jsx(Input, {
							value: data.waybill_id,
							onChange: (event) => setData("waybill_id", event.target.value),
							placeholder: "Waybill ID"
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
									children: "Event"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Waybill"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Biteship IDs"
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
										children: log.event_type ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.waybill_id ?? "-"
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4 text-xs text-muted-foreground",
										children: [
											log.biteship_order_id ?? "-",
											" /",
											" ",
											log.biteship_tracking_id ?? "-"
										]
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
												href: `/admin/biteship-webhook-logs/${log.id}`,
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
export { BiteshipWebhookLogsIndex as default };

//# sourceMappingURL=biteship-webhook-logs-DYLRk-I_.js.map