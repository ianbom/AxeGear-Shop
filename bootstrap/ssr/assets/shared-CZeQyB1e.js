import { t as Badge } from "./badge-CJFf2u6W.js";
import "./shared-BHhPoPN8.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/marketing/shared.tsx
function ReadBadge({ read }) {
	return /* @__PURE__ */ jsx(Badge, {
		variant: "outline",
		className: read ? "border-zinc-200 bg-zinc-50 text-zinc-600" : "border-blue-200 bg-blue-50 text-blue-700",
		children: read ? "Read" : "Unread"
	});
}
function MetricCard({ label, value, detail }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border bg-card p-4 shadow-xs",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 text-2xl font-semibold tracking-tight",
				children: value
			}),
			detail ? /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: detail
			}) : null
		]
	});
}
function textInputClass() {
	return "border-input focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]";
}
function booleanLabel(value) {
	return value ? "Active" : "Inactive";
}
//#endregion
export { textInputClass as i, ReadBadge as n, booleanLabel as r, MetricCard as t };

//# sourceMappingURL=shared-CZeQyB1e.js.map