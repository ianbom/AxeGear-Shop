import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import "./shared-BHhPoPN8.js";
import { jsx } from "react/jsx-runtime";
//#region resources/js/pages/admin/sales/shared.tsx
function StatusBadge({ status, tone = "neutral" }) {
	const value = status ?? "-";
	const resolvedTone = tone !== "neutral" ? tone : [
		"paid",
		"settlement",
		"capture",
		"completed",
		"delivered"
	].includes(value) ? "good" : [
		"pending",
		"pending_payment",
		"processing",
		"ready_to_ship",
		"confirmed",
		"allocated",
		"picked",
		"in_transit"
	].includes(value) ? "warn" : [
		"expired",
		"failed",
		"cancelled",
		"cancel",
		"deny",
		"failure",
		"problem"
	].includes(value) ? "bad" : "info";
	return /* @__PURE__ */ jsx(Badge, {
		variant: "outline",
		className: cn(resolvedTone === "good" && "border-emerald-200 bg-emerald-50 text-emerald-700", resolvedTone === "warn" && "border-amber-200 bg-amber-50 text-amber-700", resolvedTone === "bad" && "border-red-200 bg-red-50 text-red-700", resolvedTone === "info" && "border-blue-200 bg-blue-50 text-blue-700"),
		children: value
	});
}
function JsonBlock({ value }) {
	return /* @__PURE__ */ jsx("pre", {
		className: "max-h-[520px] overflow-auto rounded-lg border bg-muted/40 p-4 text-xs",
		children: JSON.stringify(value ?? {}, null, 2)
	});
}
//#endregion
export { StatusBadge as n, JsonBlock as t };

//# sourceMappingURL=shared-CHrI43eL.js.map