import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-ds21r-rh.js";
import { i as PageHeader, l as formatPrice } from "./shared-BJCPnCKB.js";
import { n as StatusBadge, t as JsonBlock } from "./shared-CuiRlwi-.js";
import { i as sync } from "./payments-BkRcak6x.js";
import { n as show } from "./orders-xI95CqU5.js";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { RefreshCw } from "lucide-react";
//#region resources/js/pages/admin/payments/show.tsx
function PaymentShow({ payment }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Payment ${payment.provider_reference ?? payment.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsx(PageHeader, {
				eyebrow: "Sales Management",
				title: payment.provider_reference ?? `Payment #${payment.id}`,
				description: "Detail pembayaran DOKU, referensi invoice, status rekonsiliasi, dan audit pembayaran.",
				action: /* @__PURE__ */ jsxs(Button, {
					type: "button",
					onClick: () => router.post(sync.url(payment.id), {}, { preserveScroll: true }),
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
						label: "Last Sync",
						value: payment.last_synced_at ?? "-"
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Method",
						value: payment.payment_method_label ?? payment.payment_method ?? "-"
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
								href: show.url(payment.order_id),
								children: payment.order_number ?? "-"
							})
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Customer",
							value: payment.customer ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Create Request ID",
							value: payment.create_request_id
						}),
						payment.failure_reason && /* @__PURE__ */ jsx(Row, {
							label: "Perlu Pemeriksaan",
							value: payment.failure_reason
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
							label: "Payment Deadline",
							value: payment.expires_at ?? "-"
						})
					]
				})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Rekonsiliasi DOKU" }) }), /* @__PURE__ */ jsx(CardContent, {
					className: "text-sm",
					children: "Deadline lokal dan percobaan gagal bukan bukti invoice berakhir. Status belum pasti ditahan untuk pemeriksaan; sinkronisasi tidak membatalkan pembayaran atau melepas reservasi."
				})] })]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Payment Logs" }), /* @__PURE__ */ jsxs(CardDescription, { children: [payment.logs.length, " event tersimpan."] })] }), /* @__PURE__ */ jsx(CardContent, {
				className: "grid gap-3",
				children: payment.logs.map((log) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border p-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: log.event_type ?? "-"
							}), /* @__PURE__ */ jsx(StatusBadge, { status: log.transaction_status })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: log.processed_at ?? "-"
						}),
						/* @__PURE__ */ jsx(JsonBlock, { value: log.payload })
					]
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

//# sourceMappingURL=show-CB3sIcfY.js.map