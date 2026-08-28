import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { i as PageHeader, u as formatPrice } from "./shared-BHhPoPN8.js";
import { n as StatusBadge, t as JsonBlock } from "./shared-CHrI43eL.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { RefreshCw } from "lucide-react";
//#region resources/js/pages/admin/payments/show.tsx
function PaymentShow({ payment }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Payment ${payment.midtrans_order_id ?? payment.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsx(PageHeader, {
				eyebrow: "Sales Management",
				title: payment.midtrans_order_id ?? `Payment #${payment.id}`,
				description: "Detail transaksi Midtrans, related order, raw response, dan payment logs.",
				action: /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => router.post(`/admin/payments/${payment.id}/sync`, {}, { preserveScroll: true }),
					children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Sync Status"]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Metric, {
						label: "Amount",
						value: formatPrice(payment.gross_amount)
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Status",
						value: /* @__PURE__ */ jsx(StatusBadge, { status: payment.transaction_status })
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Fraud",
						value: payment.fraud_status ?? "-"
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Method",
						value: payment.payment_method ?? "-"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Payment Summary" }), /* @__PURE__ */ jsx(CardDescription, { children: payment.payment_provider })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-3 text-sm",
					children: [
						/* @__PURE__ */ jsx(Row, {
							label: "Order",
							value: /* @__PURE__ */ jsx(Link, {
								className: "text-primary underline",
								href: `/admin/orders/${payment.order_id}`,
								children: payment.order_number ?? "-"
							})
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Customer",
							value: payment.customer ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Transaction ID",
							value: payment.midtrans_transaction_id ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Paid At",
							value: payment.paid_at ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Expired At",
							value: payment.expired_at ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Redirect URL",
							value: payment.midtrans_redirect_url ?? "-"
						})
					]
				})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Raw Response" }), /* @__PURE__ */ jsx(CardDescription, { children: "Payload terakhir yang tersimpan." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(JsonBlock, { value: payment.raw_response }) })] })]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Payment Logs" }), /* @__PURE__ */ jsxs(CardDescription, { children: [payment.logs.length, " event tersimpan."] })] }), /* @__PURE__ */ jsx(CardContent, {
				className: "grid gap-3",
				children: payment.logs.map((log) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border p-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: log.event_type ?? "-"
						}), /* @__PURE__ */ jsx(StatusBadge, { status: log.transaction_status })]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: log.processed_at ?? "-"
					})]
				}, log.id))
			})] })
		]
	})] });
}
function Metric({ label, value }) {
	return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardDescription, { children: label }), /* @__PURE__ */ jsx(CardTitle, {
		className: "text-2xl",
		children: value
	})] }) });
}
function Row({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { PaymentShow as default };

//# sourceMappingURL=show-DKPHW3qY2.js.map