import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { i as PageHeader, t as ActiveBadge, u as formatPrice } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { n as StatusBadge } from "./shared-CHrI43eL.js";
import { Head, Link } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Edit } from "lucide-react";
//#region resources/js/pages/admin/customer-addresses/show.tsx
function CustomerAddressShow({ address }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Address ${address.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Customer Management",
			title: address.label ?? address.recipient_name,
			description: `${address.customer ?? "-"} · ${address.city}, ${address.province}`,
			action: /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ jsxs(Link, {
						href: "/admin/customer-addresses",
						children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Back"]
					})
				}), /* @__PURE__ */ jsx(Button, {
					asChild: true,
					children: /* @__PURE__ */ jsxs(Link, {
						href: `/admin/customer-addresses/${address.id}/edit`,
						children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
					})
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Address Detail" }), /* @__PURE__ */ jsx(CardDescription, { children: address.is_default ? /* @__PURE__ */ jsx(ActiveBadge, { active: true }) : "Secondary address" })] }), /* @__PURE__ */ jsxs(CardContent, {
				className: "grid gap-3 text-sm",
				children: [
					/* @__PURE__ */ jsx(Row, {
						label: "Recipient",
						value: address.recipient_name
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Phone",
						value: address.recipient_phone
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Province",
						value: address.province
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "City",
						value: address.city
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "District",
						value: address.district
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Subdistrict",
						value: address.subdistrict ?? "-"
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Postal Code",
						value: address.postal_code
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Full Address",
						value: address.full_address
					}),
					/* @__PURE__ */ jsx(Row, {
						label: "Note",
						value: address.note ?? "-"
					})
				]
			})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Related Orders" }), /* @__PURE__ */ jsxs(CardDescription, { children: [address.orders_count, " order memakai alamat ini"] })] }), /* @__PURE__ */ jsx(CardContent, {
				className: "grid gap-3",
				children: address.orders.map((order) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-3 rounded-lg border p-3 text-sm",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
						className: "font-medium text-primary underline",
						href: `/admin/orders/${order.id}`,
						children: order.order_number
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: order.created_at ?? "-"
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "text-right",
						children: [/* @__PURE__ */ jsx("div", { children: formatPrice(order.grand_total) }), /* @__PURE__ */ jsx(StatusBadge, { status: order.order_status })]
					})]
				}, order.id))
			})] })]
		})]
	})] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { CustomerAddressShow as default };

//# sourceMappingURL=show-Dd7zRjCK.js.map