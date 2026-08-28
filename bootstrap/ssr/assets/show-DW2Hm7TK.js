import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { n as StatusBadge, t as JsonBlock } from "./shared-CHrI43eL.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/payment-logs/show.tsx
function PaymentLogShow({ log }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Payment Log #${log.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Sales Management",
			title: `Payment Log #${log.id}`,
			description: "Raw payload payment log untuk audit/debugging.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/admin/payment-logs",
					children: "Back"
				})
			})
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: log.event_type ?? "-" }), /* @__PURE__ */ jsxs(CardDescription, { children: [
			log.provider,
			" · ",
			log.order_number ?? "-"
		] })] }), /* @__PURE__ */ jsxs(CardContent, {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap gap-3 text-sm",
				children: [/* @__PURE__ */ jsx(StatusBadge, { status: log.transaction_status }), /* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground",
					children: log.processed_at ?? log.created_at ?? "-"
				})]
			}), /* @__PURE__ */ jsx(JsonBlock, { value: log.payload })]
		})] })]
	})] });
}
//#endregion
export { PaymentLogShow as default };

//# sourceMappingURL=show-DW2Hm7TK.js.map