import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { t as JsonBlock } from "./shared-CHrI43eL.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/biteship-webhook-logs/show.tsx
function BiteshipWebhookLogShow({ log }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Biteship Webhook #${log.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Sales Management",
			title: `Biteship Webhook #${log.id}`,
			description: "Raw payload Biteship webhook untuk audit/debugging.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/admin/biteship-webhook-logs",
					children: "Back"
				})
			})
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: log.event_type ?? "-" }), /* @__PURE__ */ jsxs(CardDescription, { children: [
			log.waybill_id ?? "-",
			" · ",
			log.processed_at ?? "-"
		] })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(JsonBlock, { value: log.payload }) })] })]
	})] });
}
//#endregion
export { BiteshipWebhookLogShow as default };

//# sourceMappingURL=show-BYd1ffjU.js.map