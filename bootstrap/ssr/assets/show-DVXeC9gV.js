import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { c as Thumbnail, i as PageHeader, t as ActiveBadge, u as formatPrice } from "./shared-BHhPoPN8.js";
import { n as ReadBadge, t as MetricCard } from "./shared-CZeQyB1e.js";
import { n as StatusBadge } from "./shared-CHrI43eL.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Bell, Heart, MapPin, Power, ShoppingBag } from "lucide-react";
//#region resources/js/pages/admin/customers/show.tsx
function CustomerShow({ customer }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: customer.name }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsx(PageHeader, {
				eyebrow: "Customer Management",
				title: customer.name,
				description: `${customer.email} · ${customer.phone ?? "No phone"} · registered ${customer.registered_at ?? "-"}`,
				action: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ jsxs(Link, {
							href: "/admin/customers",
							children: [/* @__PURE__ */ jsx(ArrowLeft, {}), " Back"]
						})
					}), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						onClick: () => router.post(`/admin/customers/${customer.id}/toggle-active`, {}, { preserveScroll: true }),
						children: [/* @__PURE__ */ jsx(Power, {}), " Toggle Active"]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Total Spent",
						value: formatPrice(customer.total_spent)
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Orders",
						value: customer.orders_count
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Wishlist",
						value: customer.wishlists_count
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						label: "Status",
						value: /* @__PURE__ */ jsx(ActiveBadge, { active: customer.is_active })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 xl:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(MapPin, { className: "size-4" }), " Addresses"]
				}), /* @__PURE__ */ jsxs(CardDescription, { children: [customer.addresses_count, " saved address"] })] }), /* @__PURE__ */ jsx(CardContent, {
					className: "grid gap-3",
					children: customer.addresses.map((address) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border p-4 text-sm",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: address.label ?? address.recipient_name
								}), address.is_default ? /* @__PURE__ */ jsx(ActiveBadge, { active: true }) : null]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground",
								children: address.city
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2",
								children: address.full_address
							}),
							/* @__PURE__ */ jsx(Button, {
								asChild: true,
								className: "mt-3",
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ jsx(Link, {
									href: `/admin/customer-addresses/${address.id}`,
									children: "Open Address"
								})
							})
						]
					}, address.id))
				})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "size-4" }), " Order History"]
				}), /* @__PURE__ */ jsxs(CardDescription, { children: ["Last order: ", customer.last_order_at ?? "-"] })] }), /* @__PURE__ */ jsx(CardContent, {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsx("table", {
						className: "w-full text-sm",
						children: /* @__PURE__ */ jsx("tbody", {
							className: "divide-y",
							children: customer.orders.map((order) => /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsxs("td", {
									className: "py-3 pr-4",
									children: [/* @__PURE__ */ jsx(Link, {
										className: "font-medium text-primary underline",
										href: `/admin/orders/${order.id}`,
										children: order.order_number
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: order.created_at
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 pr-4",
									children: formatPrice(order.grand_total)
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 pr-4",
									children: /* @__PURE__ */ jsx(StatusBadge, { status: order.payment_status })
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3",
									children: /* @__PURE__ */ jsx(StatusBadge, { status: order.order_status })
								})
							] }, order.id))
						})
					})
				})] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Heart, { className: "size-4" }), " Wishlist Products"]
				}) }), /* @__PURE__ */ jsx(CardContent, {
					className: "grid gap-3",
					children: customer.wishlists.map((wishlist) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 rounded-lg border p-3 text-sm",
						children: [/* @__PURE__ */ jsx(Thumbnail, {
							src: wishlist.product_image,
							alt: wishlist.product_name ?? "Product"
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-medium",
							children: wishlist.product_name ?? "-"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: wishlist.created_at ?? "-"
						})] })]
					}, wishlist.id))
				})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Bell, { className: "size-4" }), " Notifications"]
				}) }), /* @__PURE__ */ jsx(CardContent, {
					className: "grid gap-3",
					children: customer.notifications.map((notification) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border p-3 text-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: notification.title
							}), /* @__PURE__ */ jsx(ReadBadge, { read: notification.is_read })]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground",
							children: [
								notification.type,
								" ·",
								" ",
								notification.created_at ?? "-"
							]
						})]
					}, notification.id))
				})] })]
			})
		]
	})] });
}
//#endregion
export { CustomerShow as default };

//# sourceMappingURL=show-DVXeC9gV.js.map