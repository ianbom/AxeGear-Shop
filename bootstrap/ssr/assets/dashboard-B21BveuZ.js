import { t as Button } from "./button-D_r5eKEZ.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowRight, Banknote, Box, CalendarDays, PackageCheck, Shirt, ShoppingBag, Truck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region resources/js/pages/admin/dashboard.tsx
var currencyFormatter = new Intl.NumberFormat("id-ID", {
	currency: "IDR",
	maximumFractionDigits: 0,
	style: "currency"
});
function summaryHref(label) {
	const normalized = label.toLowerCase();
	if (normalized.includes("payment")) return "/admin/payments";
	if (normalized.includes("shipment") || normalized.includes("delivery")) return "/admin/shipments";
	return "/admin/orders";
}
function formatCurrency(value) {
	return currencyFormatter.format(value).replace("IDR", "Rp").trim();
}
function formatSummaryValue(item) {
	return item.format === "currency" ? formatCurrency(item.value) : new Intl.NumberFormat("id-ID").format(item.value);
}
function dashboardStats(summary) {
	return summary.slice(0, 4).map((item, index) => ({
		href: [
			"/admin/reports/sales",
			"/admin/orders",
			"/admin/orders",
			"/admin/stock"
		][index] ?? "/admin/dashboard",
		icon: [
			Banknote,
			ShoppingBag,
			Truck,
			Box
		][index] ?? PackageCheck,
		label: item.label,
		note: [
			"+12% from yesterday",
			"5 waiting to be processed",
			"Paid orders need shipment",
			"Need restock soon"
		][index] ?? "Needs review today",
		value: formatSummaryValue(item)
	}));
}
function badgeTone(value) {
	const normalized = (value ?? "").toLowerCase();
	if ([
		"paid",
		"delivered",
		"completed",
		"shipped",
		"in transit"
	].some((status) => normalized.includes(status))) return "success";
	if ([
		"pending",
		"processing",
		"waiting",
		"need shipment"
	].some((status) => normalized.includes(status))) return "warning";
	if ([
		"failed",
		"cancelled",
		"expired",
		"issue",
		"return",
		"critical"
	].some((status) => normalized.includes(status))) return "danger";
	if (normalized === "-") return "neutral";
	return "info";
}
function AdminDashboard({ filters, summary, salesChart, attentionOrders, recentOrders, lowStockVariants, paymentSummary, shippingSummary }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Dasbor Admin" }), /* @__PURE__ */ jsx("main", {
		className: "flex min-h-[100dvh] flex-1 flex-col bg-canvas p-4 text-ink md:p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex w-full min-w-0 flex-col gap-6 lg:gap-8",
			children: [
				/* @__PURE__ */ jsx(DashboardHeader, { filters }),
				/* @__PURE__ */ jsx(StatCards, { stats: dashboardStats(summary) }),
				/* @__PURE__ */ jsx(StatusSummary, {
					paymentSummary,
					shippingSummary
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 gap-6 border-t border-hairline-strong pt-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] lg:gap-10 lg:pt-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex min-w-0 flex-col gap-6 lg:gap-10",
						children: [/* @__PURE__ */ jsx(SalesTrendCard, { data: salesChart }), /* @__PURE__ */ jsx(RecentOrdersTable, { orders: recentOrders.slice(0, 5) })]
					}), /* @__PURE__ */ jsxs("aside", {
						className: "flex min-w-0 flex-col gap-6 border-t border-hairline-strong pt-6 lg:gap-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8",
						children: [/* @__PURE__ */ jsx(OrdersNeedAttention, { orders: attentionOrders }), /* @__PURE__ */ jsx(LowStockProductsCard, { products: lowStockVariants.slice(0, 4) })]
					})]
				})
			]
		})
	})] });
}
function DashboardHeader({ filters }) {
	const [range, setRange] = useState(filters.range || "30d");
	const [dateFrom, setDateFrom] = useState(filters.date_from || "");
	const [dateTo, setDateTo] = useState(filters.date_to || "");
	const applyRange = (nextRange) => {
		setRange(nextRange);
		if (nextRange !== "custom") router.get("/admin/dashboard", { range: nextRange }, {
			preserveState: true,
			replace: true
		});
	};
	const applyCustomRange = (event) => {
		event.preventDefault();
		router.get("/admin/dashboard", {
			range: "custom",
			date_from: dateFrom,
			date_to: dateTo
		}, {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase",
					children: [/* @__PURE__ */ jsx(Shirt, {
						className: "size-4",
						strokeWidth: 1.7
					}), "AxeGear Admin"]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-[34px] leading-none font-semibold tracking-[-0.02em] text-ink uppercase sm:text-[42px]",
					children: "Dasbor"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
					children: "Pantau aktivitas toko hari ini dan tindakan penting."
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end lg:w-auto lg:justify-end",
			children: [/* @__PURE__ */ jsxs("form", {
				onSubmit: applyCustomRange,
				className: "flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-end sm:justify-end",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-5 rounded-[6px] border border-hairline-strong bg-white p-1 sm:flex",
					children: [
						{
							label: "Today",
							value: "today"
						},
						{
							label: "7D",
							value: "7d"
						},
						{
							label: "30D",
							value: "30d"
						},
						{
							label: "Month",
							value: "month"
						},
						{
							label: "Custom",
							value: "custom"
						}
					].map((item) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => applyRange(item.value),
						className: ["h-8 rounded-[4px] px-2 text-xs font-semibold transition-colors sm:px-3", range === item.value ? "bg-[#1A1A1A] text-white" : "text-muted-foreground hover:bg-surface-soft hover:text-ink"].join(" "),
						children: item.label
					}, item.value))
				}), range === "custom" && /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 gap-2 sm:flex sm:items-end",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "date",
							value: dateFrom,
							onChange: (event) => setDateFrom(event.target.value),
							className: "h-9 w-full cursor-pointer rounded-[6px] border border-hairline-strong bg-white px-3 text-sm text-body shadow-none outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 sm:min-w-[150px]"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "date",
							value: dateTo,
							onChange: (event) => setDateTo(event.target.value),
							className: "h-9 w-full cursor-pointer rounded-[6px] border border-hairline-strong bg-white px-3 text-sm text-body shadow-none outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 sm:min-w-[150px]"
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							variant: "outline",
							className: "h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft hover:text-ink active:scale-[0.98] sm:w-auto",
							children: [/* @__PURE__ */ jsx(CalendarDays, {
								className: "size-4",
								strokeWidth: 1.7
							}), "Apply"]
						})
					]
				})]
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				className: "h-10 w-full rounded-[6px] bg-primary px-5 text-[12px] font-semibold tracking-[0.08em] text-white uppercase shadow-none hover:bg-[#E67312] active:scale-[0.98] sm:w-auto",
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/orders",
					children: ["View Orders", /* @__PURE__ */ jsx(ArrowRight, {
						className: "size-4",
						strokeWidth: 1.7
					})]
				})
			})]
		})]
	});
}
function StatCards({ stats }) {
	return /* @__PURE__ */ jsx("section", {
		className: "grid grid-cols-1 divide-y divide-hairline-strong overflow-hidden rounded-[8px] border border-hairline-strong bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4",
		children: stats.map((stat) => {
			const Icon = stat.icon;
			return /* @__PURE__ */ jsxs(Link, {
				href: stat.href,
				className: "block px-4 py-4 transition-colors hover:bg-primary-soft sm:px-5 sm:py-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex size-9 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground",
							children: /* @__PURE__ */ jsx(Icon, {
								className: "size-5",
								strokeWidth: 1.7
							})
						}), /* @__PURE__ */ jsx("span", {
							className: "rounded-full border border-hairline-strong bg-surface-soft px-3 py-1 text-[11px] font-medium text-muted-foreground",
							children: "Today"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-sm font-semibold text-body sm:mt-5",
						children: stat.label
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl",
						children: stat.value
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: stat.note
					})
				]
			}, stat.label);
		})
	});
}
function StatusSummary({ paymentSummary, shippingSummary }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "grid grid-cols-1 gap-4 border-b border-hairline-strong pb-6 lg:grid-cols-2 lg:gap-8",
		children: [/* @__PURE__ */ jsx(MiniSummaryCard, {
			icon: Banknote,
			items: paymentSummary,
			title: "Payment Summary"
		}), /* @__PURE__ */ jsx(MiniSummaryCard, {
			icon: Truck,
			items: shippingSummary,
			title: "Shipping Summary"
		})]
	});
}
function MiniSummaryCard({ icon: Icon, items, title }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-[8px] border border-hairline-strong p-4 sm:p-5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex size-8 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground",
				children: /* @__PURE__ */ jsx(Icon, {
					className: "size-4",
					strokeWidth: 1.7
				})
			}), /* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-ink",
				children: title
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-y-3 border-t border-hairline-strong pt-3 sm:grid-cols-4 sm:divide-x sm:divide-hairline-strong",
			children: items.map((item) => /* @__PURE__ */ jsxs(Link, {
				href: summaryHref(item.label),
				className: "block px-2 transition-colors first:pl-0 hover:bg-primary-soft sm:px-4 sm:last:pr-0",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground",
					children: item.label
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xl font-bold tracking-tight text-ink",
					children: item.value
				})]
			}, item.label))
		})]
	});
}
function SalesTrendCard({ data }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-[8px] border border-hairline-strong p-4 sm:p-5",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			subtitle: "Revenue and orders from the last 7 days",
			title: "Sales Trend"
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-5 h-[240px] border-y border-hairline-strong bg-surface-soft py-4 sm:h-[310px] sm:py-5",
			children: /* @__PURE__ */ jsx(ResponsiveContainer, {
				height: "100%",
				width: "100%",
				children: /* @__PURE__ */ jsxs(BarChart, {
					data,
					margin: {
						left: 6,
						right: 8,
						top: 12
					},
					children: [
						/* @__PURE__ */ jsx(CartesianGrid, {
							stroke: "#e5e5e5",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ jsx(XAxis, {
							axisLine: false,
							dataKey: "date",
							tick: {
								fill: "#707070",
								fontSize: 11
							},
							tickLine: false
						}),
						/* @__PURE__ */ jsx(YAxis, {
							axisLine: false,
							tick: {
								fill: "#707070",
								fontSize: 11
							},
							tickFormatter: (value) => `Rp ${Number(value) / 1e6}m`,
							tickLine: false,
							width: 58
						}),
						/* @__PURE__ */ jsx(Tooltip, {
							contentStyle: {
								background: "#ffffff",
								border: "1px solid #cfcfcf",
								borderRadius: 8,
								boxShadow: "0 10px 20px -16px rgba(0,0,0,0.3)",
								color: "#1A1A1A"
							},
							formatter: (value) => [formatCurrency(Number(value)), "Revenue"],
							labelStyle: { color: "#707070" }
						}),
						/* @__PURE__ */ jsx(Bar, {
							dataKey: "revenue",
							fill: "#F58220",
							radius: [
								12,
								12,
								4,
								4
							]
						})
					]
				})
			})
		})]
	});
}
function OrdersNeedAttention({ orders }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-[8px] border border-hairline-strong p-4 sm:p-5",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			icon: AlertTriangle,
			subtitle: "Admin actions with highest priority",
			title: "Orders Need Attention"
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 divide-y divide-hairline-strong border-y border-hairline-strong",
			children: [orders.map((order) => /* @__PURE__ */ jsxs("article", {
				className: "-mx-3 px-3 py-4 transition-colors hover:bg-primary-soft",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
						href: `/admin/orders/${order.id}`,
						className: "text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]",
						children: order.order_number
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Customer:",
							" ",
							order.user_id ? /* @__PURE__ */ jsx(Link, {
								href: `/admin/customers/${order.user_id}`,
								className: "transition-colors hover:text-[#1A1A1A]",
								children: order.customer_name
							}) : order.customer_name
						]
					})] }), /* @__PURE__ */ jsx(StatusBadge, { label: order.payment_status })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsx(StatusBadge, { label: order.shipping_status }), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "outline",
						className: "h-8 rounded-[6px] border-hairline-strong bg-white px-3 text-xs text-body shadow-none hover:bg-surface-soft active:scale-[0.98]",
						children: /* @__PURE__ */ jsx(Link, {
							href: `/admin/orders/${order.id}`,
							children: order.action
						})
					})]
				})]
			}, order.id)), orders.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "py-5 text-sm text-muted-foreground",
				children: "No orders need action right now."
			})]
		})]
	});
}
function RecentOrdersTable({ orders }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-[8px] border border-hairline-strong p-4 sm:p-5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				subtitle: "Latest activity from checkout",
				title: "Recent Orders"
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				className: "h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft sm:w-auto",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/admin/orders",
					children: "Open Orders"
				})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-5 overflow-x-auto rounded-[8px] border-y border-hairline-strong",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[760px] text-left text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-hairline-strong bg-surface-soft text-xs tracking-wider text-muted-foreground uppercase",
					children: /* @__PURE__ */ jsx("tr", { children: [
						"Order",
						"Customer",
						"Payment",
						"Order Status",
						"Shipping",
						"Total",
						"Date"
					].map((heading) => /* @__PURE__ */ jsx("th", {
						className: "py-4 pr-5 font-semibold first:pl-4",
						children: heading
					}, heading)) })
				}), /* @__PURE__ */ jsxs("tbody", {
					className: "divide-y divide-hairline-strong",
					children: [orders.map((order, index) => /* @__PURE__ */ jsxs("tr", {
						className: "transition-colors hover:bg-primary-soft",
						children: [
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5 pl-4 font-semibold text-ink",
								children: order.id ? /* @__PURE__ */ jsx(Link, {
									href: `/admin/orders/${order.id}`,
									className: "transition-colors hover:text-[#1A1A1A]",
									children: order.order_number
								}) : order.order_number
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5 text-body",
								children: order.user_id ? /* @__PURE__ */ jsx(Link, {
									href: `/admin/customers/${order.user_id}`,
									className: "transition-colors hover:text-[#1A1A1A]",
									children: order.customer_name
								}) : order.customer_name
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5",
								children: /* @__PURE__ */ jsx(StatusBadge, { label: order.payment_status })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5",
								children: /* @__PURE__ */ jsx(StatusBadge, { label: order.order_status })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5",
								children: /* @__PURE__ */ jsx(StatusBadge, { label: order.shipping_status })
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 pr-5 font-semibold text-ink",
								children: formatCurrency(order.grand_total)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-4 text-muted-foreground",
								children: order.created_at ?? "Today"
							})
						]
					}, `${order.order_number}-${index}`)), orders.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						className: "px-4 py-8 text-center text-sm text-muted-foreground",
						colSpan: 7,
						children: "No recent orders found."
					}) })]
				})]
			})
		})]
	});
}
function LowStockProductsCard({ products }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-[8px] border border-hairline-strong p-4 sm:p-5",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ jsx(SectionHeader, {
				icon: Box,
				subtitle: "Products that need restock soon",
				title: "Low Stock Products"
			}), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				variant: "outline",
				className: "h-9 w-full rounded-[6px] border-hairline-strong bg-white px-4 text-body shadow-none hover:bg-surface-soft sm:w-auto",
				children: /* @__PURE__ */ jsx(Link, {
					href: "/admin/stock",
					children: "Manage Stock"
				})
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-5 divide-y divide-hairline-strong border-y border-hairline-strong",
			children: [products.map((product, index) => {
				const status = stockStatus(product.available_stock);
				return /* @__PURE__ */ jsxs("article", {
					className: "-mx-3 flex flex-col gap-3 px-3 py-4 transition-colors hover:bg-primary-soft sm:flex-row sm:items-center sm:gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex size-10 items-center justify-center rounded-[6px] border border-hairline-strong bg-surface-soft text-muted-foreground",
							children: /* @__PURE__ */ jsx(PackageCheck, {
								className: "size-5",
								strokeWidth: 1.7
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [product.product_id ? /* @__PURE__ */ jsx(Link, {
								href: `/admin/products/${product.product_id}`,
								className: "block truncate text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]",
								children: product.product_name ?? "Unnamed Product"
							}) : /* @__PURE__ */ jsx("p", {
								className: "truncate text-sm font-semibold text-ink",
								children: product.product_name ?? "Unnamed Product"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [product.color_name, product.size && `Size ${product.size}`].filter(Boolean).join(" · ") || "Standard variant"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "w-full text-left sm:w-auto sm:text-right",
							children: [product.id ? /* @__PURE__ */ jsxs(Link, {
								href: `/admin/product-variants/${product.id}/stock-adjustment`,
								className: "text-sm font-semibold text-ink transition-colors hover:text-[#1A1A1A]",
								children: ["Stock: ", product.available_stock]
							}) : /* @__PURE__ */ jsxs("p", {
								className: "text-sm font-semibold text-ink",
								children: ["Stock: ", product.available_stock]
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-1",
								children: /* @__PURE__ */ jsx(StatusBadge, { label: status })
							})]
						})
					]
				}, `${product.product_name}-${index}`);
			}), products.length === 0 && /* @__PURE__ */ jsx("p", {
				className: "py-5 text-sm text-muted-foreground",
				children: "No low stock products right now."
			})]
		})]
	});
}
function SectionHeader({ icon: Icon, subtitle, title }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [Icon && /* @__PURE__ */ jsx(Icon, {
			className: "size-4 text-[#1A1A1A]",
			strokeWidth: 1.7
		}), /* @__PURE__ */ jsx("h2", {
			className: "text-lg font-semibold tracking-tight text-ink",
			children: title
		})]
	}), /* @__PURE__ */ jsx("p", {
		className: "mt-1 text-sm text-muted-foreground",
		children: subtitle
	})] });
}
function StatusBadge({ label }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${{
			danger: "border-red-100 bg-red-50 text-red-600",
			info: "border-blue-200 bg-blue-50 text-blue-700",
			neutral: "border-hairline-strong bg-surface-soft text-muted-foreground",
			success: "border-emerald-100 bg-emerald-50 text-emerald-700",
			warning: "border-amber-200 bg-amber-50 text-amber-700"
		}[badgeTone(label)]}`,
		children: label
	});
}
function stockStatus(stock) {
	if (stock === 0) return "Out of Stock";
	if (stock <= 1) return "Critical";
	return "Low Stock";
}
//#endregion
export { AdminDashboard as default };

//# sourceMappingURL=dashboard-B21BveuZ.js.map