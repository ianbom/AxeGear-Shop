import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, i as PageHeader, n as EmptyState, s as TableShell } from "./shared-BHhPoPN8.js";
import { Head, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
//#region resources/js/pages/admin/audit-logs/index.tsx
function AuditLogsIndex({ filters, logs }) {
	const { data, setData, get, processing } = useForm({
		module: filters.module ?? "",
		action: filters.action ?? "",
		date_from: filters.date_from ?? "",
		date_to: filters.date_to ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/audit-logs", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Audit Logs" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Audit & Logs",
			title: "Admin Activity Logs",
			description: "Pantau aksi admin sensitif. Payment, Biteship, dan stock logs tetap tersedia pada menu masing-masing."
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Activity History",
			description: `${logs.total} activity tercatat`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-[180px_160px_180px_180px_auto]",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.module,
							onChange: (event) => setData("module", event.target.value),
							placeholder: "Module"
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.action,
							onChange: (event) => setData("action", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All action"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "post",
									children: "post"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "put",
									children: "put"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "patch",
									children: "patch"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "delete",
									children: "delete"
								})
							]
						}),
						/* @__PURE__ */ jsx(Input, {
							type: "date",
							value: data.date_from,
							onChange: (event) => setData("date_from", event.target.value)
						}),
						/* @__PURE__ */ jsx(Input, {
							type: "date",
							value: data.date_to,
							onChange: (event) => setData("date_to", event.target.value)
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							variant: "outline",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Search, {}), " Search"]
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
									children: "Admin"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Action"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Module"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Reference"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "IP"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Date"
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
										children: log.admin ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.action
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.module
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4",
										children: [log.reference_type ?? "-", log.reference_id ? ` #${log.reference_id}` : ""]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.ip_address ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: log.created_at ?? "-"
									})
								]
							}, log.id))
						})]
					})
				}),
				logs.data.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { children: "Tidak ada activity log." }) : null,
				/* @__PURE__ */ jsx(Pagination, { paginator: logs })
			]
		})]
	})] });
}
//#endregion
export { AuditLogsIndex as default };

//# sourceMappingURL=audit-logs-C20OFE0L.js.map