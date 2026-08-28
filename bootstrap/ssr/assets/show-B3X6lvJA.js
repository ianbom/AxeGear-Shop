import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader, u as formatPrice } from "./shared-BHhPoPN8.js";
import { n as StatusBadge, t as JsonBlock } from "./shared-CHrI43eL.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PackagePlus, Printer, RefreshCw, Save } from "lucide-react";
//#region resources/js/pages/admin/shipments/show.tsx
function getLabelUrl(shipment) {
	return shipment.label_url || null;
}
function text(value) {
	if (value === null || value === void 0 || value === "") return "-";
	return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function printBiteshipLabel(shipment) {
	const printWindow = window.open("", "_blank", "width=900,height=700");
	if (!printWindow) {
		window.print();
		return;
	}
	const items = shipment.order?.items ?? [];
	const totalWeight = items.reduce((sum, item) => sum + Number(item.weight ?? 0), 0);
	const itemRows = items.map((item) => `
                <tr>
                    <td>${text(item.product_name)}</td>
                    <td>${text(item.quantity)}</td>
                    <td>${text(item.weight)} gr</td>
                    <td>${text(item.length)} x ${text(item.width)} x ${text(item.height)} cm</td>
                </tr>
            `).join("");
	printWindow.document.write(`
        <!doctype html>
        <html>
            <head>
                <title>Resi ${text(shipment.waybill_id ?? shipment.order_number ?? shipment.id)}</title>
                <style>
                    * { box-sizing: border-box; }
                    body { margin: 0; background: #f4f4f5; color: #18181b; font-family: Arial, sans-serif; }
                    .page { width: 148mm; min-height: 210mm; margin: 16px auto; background: #fff; padding: 18mm; }
                    .header { display: flex; justify-content: space-between; gap: 16px; border-bottom: 2px solid #18181b; padding-bottom: 12px; }
                    .brand { font-size: 20px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
                    .muted { color: #71717a; font-size: 12px; }
                    .waybill { border: 2px solid #18181b; padding: 10px 14px; text-align: center; min-width: 190px; }
                    .waybill-label { font-size: 11px; color: #71717a; text-transform: uppercase; }
                    .waybill-value { margin-top: 4px; font-family: monospace; font-size: 20px; font-weight: 800; }
                    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 16px; }
                    .box { border: 1px solid #d4d4d8; padding: 12px; min-height: 110px; }
                    .box-title { margin-bottom: 8px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #52525b; }
                    .line { margin: 3px 0; font-size: 13px; line-height: 1.4; }
                    .section { margin-top: 16px; }
                    table { width: 100%; border-collapse: collapse; font-size: 12px; }
                    th, td { border: 1px solid #d4d4d8; padding: 8px; text-align: left; vertical-align: top; }
                    th { background: #f4f4f5; font-size: 11px; text-transform: uppercase; color: #52525b; }
                    .footer { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                    .signature { height: 76px; border: 1px dashed #a1a1aa; padding: 10px; font-size: 12px; color: #71717a; }
                    @media print { body { background: #fff; } .page { margin: 0; width: auto; min-height: auto; box-shadow: none; } }
                </style>
            </head>
            <body>
                <main class="page">
                    <section class="header">
                        <div>
                            <div class="brand">Biteship Shipment Label</div>
                            <div class="muted">Generated from admin shipment detail</div>
                            <div class="line"><strong>Order:</strong> ${text(shipment.order_number ?? shipment.order?.order_number)}</div>
                        </div>
                        <div class="waybill">
                            <div class="waybill-label">Waybill / Resi</div>
                            <div class="waybill-value">${text(shipment.waybill_id)}</div>
                        </div>
                    </section>

                    <section class="grid">
                        <div class="box">
                            <div class="box-title">Courier</div>
                            <div class="line"><strong>${text(shipment.courier_company).toUpperCase()}</strong> ${text(shipment.courier_type)}</div>
                            <div class="line">Service: ${text(shipment.courier_service_name)}</div>
                            <div class="line">Tracking ID: ${text(shipment.biteship_tracking_id)}</div>
                            <div class="line">Biteship Order ID: ${text(shipment.biteship_order_id)}</div>
                        </div>
                        <div class="box">
                            <div class="box-title">Package</div>
                            <div class="line">Total weight: ${text(totalWeight)} gr</div>
                            <div class="line">Shipping cost: ${text(shipment.shipping_cost)}</div>
                            <div class="line">ETA: ${text(shipment.estimated_delivery)}</div>
                            <div class="line">Status: ${text(shipment.shipping_status)}</div>
                        </div>
                    </section>

                    <section class="grid">
                        <div class="box">
                            <div class="box-title">Sender</div>
                            <div class="line"><strong>Store / Admin</strong></div>
                            <div class="line">Use origin address configured in Biteship/admin settings.</div>
                        </div>
                        <div class="box">
                            <div class="box-title">Recipient</div>
                            <div class="line"><strong>${text(shipment.address?.recipient_name ?? shipment.order?.customer_name)}</strong></div>
                            <div class="line">${text(shipment.address?.recipient_phone ?? shipment.order?.customer_phone)}</div>
                            <div class="line">${text(shipment.address?.full_address)}</div>
                            <div class="line">${text(shipment.address?.city)} ${text(shipment.address?.postal_code)}</div>
                        </div>
                    </section>

                    <section class="section">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Weight</th>
                                    <th>Dimension</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemRows || "<tr><td colspan=\"4\">No item data.</td></tr>"}
                            </tbody>
                        </table>
                    </section>

                    <section class="footer">
                        <div class="signature">Sender signature</div>
                        <div class="signature">Courier signature</div>
                    </section>
                </main>
                <script>window.onload = () => { window.print(); };<\/script>
            </body>
        </html>
    `);
	printWindow.document.close();
}
function ShipmentShow({ shipment, shippingStatuses }) {
	const form = useForm({
		shipping_status: shipment.shipping_status,
		description: "",
		location: ""
	});
	const createOrderForm = useForm({
		courier_company: shipment.courier_company ?? "",
		courier_type: shipment.courier_type ?? "",
		courier_service_name: shipment.courier_service_name ?? "",
		waybill_id: shipment.waybill_id ?? "",
		estimated_delivery: shipment.estimated_delivery ?? ""
	});
	const createOrderError = createOrderForm.errors.shipment;
	const labelUrl = getLabelUrl(shipment);
	const submit = (event) => {
		event.preventDefault();
		form.post(`/admin/shipments/${shipment.id}/status`, { preserveScroll: true });
	};
	const createBiteshipOrder = (event) => {
		event.preventDefault();
		createOrderForm.post(`/admin/orders/${shipment.order_id}/shipments`, { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Shipment ${shipment.waybill_id ?? shipment.id}` }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsx(PageHeader, {
				eyebrow: "Sales Management",
				title: shipment.waybill_id ?? `Shipment #${shipment.id}`,
				description: "Detail shipment, recipient address, tracking timeline, raw Biteship payload, dan label.",
				action: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						labelUrl && /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ jsxs("a", {
								href: labelUrl,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ jsx(Printer, {}), " Cetak Resi Biteship"]
							})
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							onClick: () => printBiteshipLabel(shipment),
							children: [/* @__PURE__ */ jsx(Printer, {}), " Cetak Resi Biteship"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							onClick: () => router.post(`/admin/shipments/${shipment.id}/refresh-tracking`, {}, { preserveScroll: true }),
							children: [/* @__PURE__ */ jsx(RefreshCw, {}), " Refresh Tracking"]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(Metric, {
						label: "Status",
						value: /* @__PURE__ */ jsx(StatusBadge, { status: shipment.shipping_status })
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Courier",
						value: `${shipment.courier_company} ${shipment.courier_type}`
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "Cost",
						value: formatPrice(shipment.shipping_cost)
					}),
					/* @__PURE__ */ jsx(Metric, {
						label: "ETA",
						value: shipment.estimated_delivery ?? "-"
					})
				]
			}),
			!shipment.biteship_order_id && /* @__PURE__ */ jsxs(Card, {
				className: "border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20",
				children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsxs(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(PackagePlus, { className: "size-5" }), " Create Biteship Order"]
				}), /* @__PURE__ */ jsx(CardDescription, { children: "Shipment ini belum punya Biteship order ID. Submit form ini untuk membuat order pickup ke Biteship API." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
					onSubmit: createBiteshipOrder,
					className: "grid gap-4 md:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto]",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Courier Company",
							value: createOrderForm.data.courier_company,
							error: createOrderForm.errors.courier_company,
							placeholder: "jne",
							onChange: (value) => createOrderForm.setData("courier_company", value)
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Courier Type",
							value: createOrderForm.data.courier_type,
							error: createOrderForm.errors.courier_type,
							placeholder: "reg",
							onChange: (value) => createOrderForm.setData("courier_type", value)
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Service Name",
							value: createOrderForm.data.courier_service_name,
							error: createOrderForm.errors.courier_service_name,
							placeholder: "JNE Reguler",
							onChange: (value) => createOrderForm.setData("courier_service_name", value)
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Waybill ID",
							value: createOrderForm.data.waybill_id,
							error: createOrderForm.errors.waybill_id,
							placeholder: "Opsional",
							onChange: (value) => createOrderForm.setData("waybill_id", value)
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Estimated Delivery",
							value: createOrderForm.data.estimated_delivery,
							error: createOrderForm.errors.estimated_delivery,
							placeholder: "2-3 days",
							onChange: (value) => createOrderForm.setData("estimated_delivery", value)
						}),
						createOrderError && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-destructive md:col-span-2 xl:col-span-5",
							children: createOrderError
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: createOrderForm.processing,
								className: "w-full",
								children: [/* @__PURE__ */ jsx(PackagePlus, {}), createOrderForm.processing ? "Creating..." : "Create Order"]
							})
						})
					]
				}) })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Shipment Summary" }), /* @__PURE__ */ jsx(CardDescription, { children: shipment.order_number ?? "-" })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-3 text-sm",
					children: [
						/* @__PURE__ */ jsx(Row, {
							label: "Order",
							value: /* @__PURE__ */ jsx(Link, {
								className: "text-primary underline",
								href: `/admin/orders/${shipment.order_id}`,
								children: shipment.order_number ?? "-"
							})
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Customer",
							value: shipment.customer ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Service",
							value: shipment.courier_service_name ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Biteship Order ID",
							value: shipment.biteship_order_id ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Biteship Tracking ID",
							value: shipment.biteship_tracking_id ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Shipped At",
							value: shipment.shipped_at ?? "-"
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Delivered At",
							value: shipment.delivered_at ?? "-"
						}),
						labelUrl ? /* @__PURE__ */ jsxs("a", {
							href: labelUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-2 text-sm font-medium text-primary underline",
							children: [/* @__PURE__ */ jsx(Printer, { className: "size-4" }), " Cetak Resi Biteship"]
						}) : null,
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => printBiteshipLabel(shipment),
							className: "inline-flex items-center gap-2 text-sm font-medium text-primary underline",
							children: [/* @__PURE__ */ jsx(Printer, { className: "size-4" }), " Cetak Resi Lokal"]
						})
					]
				})] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Recipient Address" }), /* @__PURE__ */ jsx(CardDescription, { children: "Snapshot alamat order." })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-3 text-sm",
					children: [
						/* @__PURE__ */ jsx(Row, {
							label: "Recipient",
							value: String(shipment.address?.recipient_name ?? "-")
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Phone",
							value: String(shipment.address?.recipient_phone ?? "-")
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "City",
							value: String(shipment.address?.city ?? "-")
						}),
						/* @__PURE__ */ jsx(Row, {
							label: "Address",
							value: String(shipment.address?.full_address ?? "-")
						})
					]
				})] })]
			}),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Manual Shipment Status" }), /* @__PURE__ */ jsx(CardDescription, { children: "Update status manual dan simpan timeline event." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-4 md:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)_auto]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Status" }), /* @__PURE__ */ jsx("select", {
							value: form.data.shipping_status,
							onChange: (event) => form.setData("shipping_status", event.target.value),
							className: "h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm",
							children: shippingStatuses.map((status) => /* @__PURE__ */ jsx("option", {
								value: status,
								children: status
							}, status))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Description" }), /* @__PURE__ */ jsx(Input, {
							value: form.data.description,
							onChange: (event) => form.setData("description", event.target.value)
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx(Label, { children: "Location" }), /* @__PURE__ */ jsx(Input, {
							value: form.data.location,
							onChange: (event) => form.setData("location", event.target.value)
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: form.processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save"]
						})
					})
				]
			}) })] }),
			/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Tracking Timeline" }), /* @__PURE__ */ jsxs(CardDescription, { children: [shipment.trackings.length, " event tracking."] })] }), /* @__PURE__ */ jsx(CardContent, {
				className: "grid gap-3",
				children: shipment.trackings.map((tracking) => /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border p-4 text-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: tracking.status
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: tracking.happened_at ?? "-"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-muted-foreground",
							children: tracking.description ?? "-"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: tracking.location ?? "-"
						})
					]
				}, tracking.id))
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Raw Rate Response" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(JsonBlock, { value: shipment.raw_rate_response }) })] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Raw Order Response" }) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(JsonBlock, { value: shipment.raw_order_response }) })] })]
			})
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
function Field({ label, value, error, placeholder, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx(Input, {
				value,
				placeholder,
				onChange: (event) => onChange(event.target.value)
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { ShipmentShow as default };

//# sourceMappingURL=show-B3X6lvJA.js.map