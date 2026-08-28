import { t as Button } from "./button-D_r5eKEZ.js";
import { i as detail } from "./routes-EPw8WZ-p.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import { i as PageHeader, t as ActiveBadge, u as formatPrice } from "./shared-BHhPoPN8.js";
import { t as HTMLRender } from "./HTMLRender-COKIm72z.js";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Archive, ArrowLeft, Box, CheckCircle2, Eye, Image, Info, Layers, Package, Pencil, ShoppingBag, Tag, Trash2, TrendingUp } from "lucide-react";
//#region resources/js/pages/admin/products/show.tsx
var STATUS_STYLES = {
	published: {
		label: "Published",
		dot: "bg-emerald-400",
		badge: "border-emerald-200 bg-emerald-50 text-emerald-700"
	},
	draft: {
		label: "Draft",
		dot: "bg-amber-400",
		badge: "border-amber-200 bg-amber-50 text-amber-700"
	},
	archived: {
		label: "Archived",
		dot: "bg-zinc-400",
		badge: "border-zinc-200 bg-zinc-100 text-zinc-600"
	}
};
var STOCK_LOG_TYPES = {
	adjustment: "border-blue-200 bg-blue-50 text-blue-700",
	sale: "border-red-200 bg-red-50 text-red-700",
	restock: "border-emerald-200 bg-emerald-50 text-emerald-700",
	cancel: "border-amber-200 bg-amber-50 text-amber-700"
};
function ProductShow({ product }) {
	const [activeImage, setActiveImage] = useState(product.images.find((img) => img.is_primary) ?? product.images[0] ?? null);
	const totalStock = product.variants.reduce((sum, v) => sum + Number(v.stock), 0);
	const totalReserved = product.variants.reduce((sum, v) => sum + Number(v.reserved_stock), 0);
	const activeVariants = product.variants.filter((v) => v.is_active).length;
	const status = STATUS_STYLES[product.status] ?? STATUS_STYLES["draft"];
	const doAction = (url, method = "post") => router[method](url, {}, { preserveScroll: true });
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: product.name }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ jsx(PageHeader, {
				eyebrow: "Product Management",
				title: product.name,
				description: `SKU: ${product.sku || "-"} · ${product.category ?? "No Category"} · ${product.collection ?? "No Collection"}`,
				action: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ jsxs(Badge, {
							variant: "outline",
							className: `gap-1.5 ${status.badge}`,
							children: [/* @__PURE__ */ jsx("span", { className: `size-1.5 rounded-full ${status.dot}` }), status.label]
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsxs(Link, {
								href: "/admin/products",
								children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "size-3.5" }), " Back"]
							})
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsxs(Link, {
								href: `/admin/products/${product.id}/edit`,
								children: [/* @__PURE__ */ jsx(Pencil, { className: "size-3.5" }), " Edit"]
							})
						}),
						product.status !== "published" && /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							onClick: () => doAction(`/admin/products/${product.id}/publish`),
							children: [
								/* @__PURE__ */ jsx(CheckCircle2, { className: "size-3.5" }),
								" ",
								"Publish"
							]
						}),
						product.status !== "archived" && /* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => doAction(`/admin/products/${product.id}/archive`),
							children: [/* @__PURE__ */ jsx(Archive, { className: "size-3.5" }), " Archive"]
						}),
						/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ jsxs(Link, {
								href: detail.url({ query: { product: product.slug } }),
								children: [/* @__PURE__ */ jsx(Eye, { className: "size-3.5" }), " Lihat"]
							})
						}),
						/* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							className: "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700",
							onClick: () => {
								if (confirm("Delete " + product.name + "?")) doAction(`/admin/products/${product.id}`, "delete");
							},
							children: [/* @__PURE__ */ jsx(Trash2, { className: "size-3.5" }), " Delete"]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(MetricCard, {
						icon: /* @__PURE__ */ jsx(Tag, { className: "size-5 text-violet-600" }),
						iconBg: "bg-violet-50",
						label: "Regular Price",
						value: formatPrice(product.regular_price),
						sub: product.sale_price ? `Sale: ${formatPrice(product.sale_price)}` : "No sale price"
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: /* @__PURE__ */ jsx(Box, { className: "size-5 text-blue-600" }),
						iconBg: "bg-blue-50",
						label: "Total Stock",
						value: totalStock.toString(),
						sub: `${totalReserved} reserved`
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: /* @__PURE__ */ jsx(Layers, { className: "size-5 text-amber-600" }),
						iconBg: "bg-amber-50",
						label: "Variants",
						value: product.variants.length.toString(),
						sub: `${activeVariants} active`
					}),
					/* @__PURE__ */ jsx(MetricCard, {
						icon: /* @__PURE__ */ jsx(TrendingUp, { className: "size-5 text-emerald-600" }),
						iconBg: "bg-emerald-50",
						label: "Order Items",
						value: product.orders.length.toString(),
						sub: "recent orders"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs(Card, {
							className: "overflow-hidden",
							children: [/* @__PURE__ */ jsxs(CardHeader, {
								className: "pb-3",
								children: [/* @__PURE__ */ jsxs(CardTitle, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ jsx(Image, { className: "size-4 text-muted-foreground" }), "Product Images"]
								}), /* @__PURE__ */ jsxs(CardDescription, { children: [product.images.length, " image(s)"] })]
							}), /* @__PURE__ */ jsxs(CardContent, {
								className: "p-0",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "relative aspect-[3/4] w-full overflow-hidden bg-zinc-50",
										children: [activeImage?.image_url ? /* @__PURE__ */ jsx("img", {
											src: activeImage.image_url,
											alt: activeImage.alt_text || product.name,
											className: "size-full object-cover"
										}) : /* @__PURE__ */ jsx("div", {
											className: "flex size-full items-center justify-center",
											children: /* @__PURE__ */ jsx(Image, { className: "size-16 text-muted-foreground opacity-20" })
										}), activeImage?.is_primary && /* @__PURE__ */ jsx("span", {
											className: "absolute top-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white",
											children: "Primary"
										})]
									}),
									product.images.length > 0 && /* @__PURE__ */ jsx("div", {
										className: "flex gap-2 overflow-x-auto p-3",
										children: product.images.map((img) => /* @__PURE__ */ jsxs("button", {
											onClick: () => setActiveImage(img),
											className: ["relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all", activeImage?.id === img.id ? "border-zinc-800 shadow-sm" : "border-transparent hover:border-zinc-300"].join(" "),
											children: [img.image_url ? /* @__PURE__ */ jsx("img", {
												src: img.image_url,
												alt: img.alt_text,
												className: "size-full object-cover"
											}) : /* @__PURE__ */ jsx("div", {
												className: "flex size-full items-center justify-center bg-zinc-100 text-[10px] text-zinc-400",
												children: "N/A"
											}), img.is_primary && /* @__PURE__ */ jsx("span", {
												className: "absolute right-0 bottom-0 left-0 bg-black/50 py-0.5 text-center text-[8px] leading-tight text-white",
												children: "Main"
											})]
										}, img.id))
									}),
									product.images.length === 0 && /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ jsx(Image, { className: "size-8 opacity-30" }), "No images uploaded"]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, {
							className: "pb-3",
							children: /* @__PURE__ */ jsxs(CardTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ jsx(Info, { className: "size-4 text-muted-foreground" }), "Product Information"]
							})
						}), /* @__PURE__ */ jsxs(CardContent, {
							className: "grid gap-3 text-sm",
							children: [
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Category",
									value: product.category ?? "-"
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Collection",
									value: product.collection ?? "-"
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "SKU",
									value: product.sku || "-",
									mono: true
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Slug",
									value: product.slug || "-",
									mono: true
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Status",
									value: /* @__PURE__ */ jsxs(Badge, {
										variant: "outline",
										className: `gap-1 ${status.badge}`,
										children: [/* @__PURE__ */ jsx("span", { className: `size-1.5 rounded-full ${status.dot}` }), status.label]
									})
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Weight",
									value: product.weight ? `${product.weight} g` : "-"
								}),
								/* @__PURE__ */ jsx(InfoRow, {
									label: "Dimensions",
									value: product.length && product.width && product.height ? `${product.length} × ${product.width} × ${product.height} cm` : "-"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-1.5 pt-1",
									children: [
										/* @__PURE__ */ jsx(FlagPill, {
											active: product.is_featured,
											label: "Featured"
										}),
										/* @__PURE__ */ jsx(FlagPill, {
											active: product.is_new_arrival,
											label: "New Arrival"
										}),
										/* @__PURE__ */ jsx(FlagPill, {
											active: product.is_best_seller,
											label: "Best Seller"
										})
									]
								})
							]
						})] }),
						(product.short_description || product.description) && /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, {
							className: "pb-3",
							children: /* @__PURE__ */ jsx(CardTitle, {
								className: "text-base",
								children: "Description"
							})
						}), /* @__PURE__ */ jsxs(CardContent, {
							className: "space-y-3 text-sm text-muted-foreground",
							children: [product.short_description && /* @__PURE__ */ jsx("p", { children: product.short_description }), product.description && /* @__PURE__ */ jsx(HTMLRender, {
								html: product.description,
								className: "text-sm text-muted-foreground"
							})]
						})] })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-6",
					children: [
						/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, {
							className: "pb-3",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs(CardTitle, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ jsx(Package, { className: "size-4 text-muted-foreground" }), "Variants"]
								}), /* @__PURE__ */ jsxs(CardDescription, {
									className: "mt-0.5",
									children: [product.variants.length, " variant(s)"]
								})] }), /* @__PURE__ */ jsx(Button, {
									asChild: true,
									size: "sm",
									variant: "outline",
									children: /* @__PURE__ */ jsxs(Link, {
										href: `/admin/products/${product.id}/variants`,
										children: [
											/* @__PURE__ */ jsx(Layers, { className: "size-3.5" }),
											" ",
											"Manage"
										]
									})
								})]
							})
						}), /* @__PURE__ */ jsx(CardContent, {
							className: "p-0",
							children: product.variants.length > 0 ? /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-sm",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b bg-zinc-50/60 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-left font-medium",
												children: "Variant"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-left font-medium",
												children: "SKU"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "+Price"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Stock"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Reserved"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-center font-medium",
												children: "Status"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y",
										children: product.variants.map((variant) => /* @__PURE__ */ jsxs("tr", {
											className: "transition-colors hover:bg-zinc-50/50",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3",
													children: /* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-2.5",
														children: [variant.image_url ? /* @__PURE__ */ jsx("img", {
															src: variant.image_url,
															alt: variant.color_name ?? "variant",
															className: "size-8 rounded-md border object-cover"
														}) : /* @__PURE__ */ jsx("div", {
															className: "size-8 rounded-md border",
															style: { backgroundColor: variant.color_hex ?? "#e5e7eb" }
														}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
															className: "font-medium",
															children: variant.variant_name ?? variant.color_name ?? "-"
														}), /* @__PURE__ */ jsx("div", {
															className: "text-xs text-muted-foreground",
															children: [variant.package_type, variant.size].filter(Boolean).join(" / ") || "-"
														})] })]
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3 font-mono text-xs text-muted-foreground",
													children: variant.sku
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3 text-right",
													children: Number(variant.sale_price ?? variant.regular_price) > 0 ? formatPrice(variant.sale_price ?? variant.regular_price ?? 0) : /* @__PURE__ */ jsx("span", {
														className: "text-muted-foreground",
														children: "—"
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3 text-right",
													children: /* @__PURE__ */ jsx("span", {
														className: ["font-semibold", Number(variant.stock) === 0 ? "text-red-600" : Number(variant.stock) <= 5 ? "text-amber-600" : "text-emerald-600"].join(" "),
														children: variant.stock
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3 text-right text-muted-foreground",
													children: variant.reserved_stock
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-3 text-center",
													children: /* @__PURE__ */ jsx(ActiveBadge, { active: variant.is_active })
												})
											]
										}, variant.id))
									})]
								})
							}) : /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Package, { className: "size-8 opacity-30" }), "No variants found."]
							})
						})] }),
						/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
							className: "pb-3",
							children: [/* @__PURE__ */ jsxs(CardTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ jsx(TrendingUp, { className: "size-4 text-muted-foreground" }), "Recent Stock Logs"]
							}), /* @__PURE__ */ jsx(CardDescription, { children: "Last 10 stock movements across all variants" })]
						}), /* @__PURE__ */ jsx(CardContent, {
							className: "p-0",
							children: product.stock_logs.length > 0 ? /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-sm",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b bg-zinc-50/60 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-left font-medium",
												children: "Variant SKU"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-center font-medium",
												children: "Type"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Qty"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Before"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "After"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Date"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y",
										children: product.stock_logs.map((log) => /* @__PURE__ */ jsxs("tr", {
											className: "transition-colors hover:bg-zinc-50/50",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 font-mono text-xs",
													children: log.variant
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-center",
													children: /* @__PURE__ */ jsx(Badge, {
														variant: "outline",
														className: `text-[10px] ${STOCK_LOG_TYPES[log.type] ?? "border-zinc-200 bg-zinc-50 text-zinc-600"}`,
														children: log.type
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right font-medium",
													children: /* @__PURE__ */ jsxs("span", {
														className: log.quantity >= 0 ? "text-emerald-600" : "text-red-600",
														children: [log.quantity >= 0 ? "+" : "", log.quantity]
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right text-muted-foreground",
													children: log.stock_before
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right font-medium",
													children: log.stock_after
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right text-xs text-muted-foreground",
													children: log.created_at ?? "-"
												})
											]
										}, log.id))
									})]
								})
							}) : /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx(TrendingUp, { className: "size-8 opacity-30" }), "No stock logs yet."]
							})
						})] }),
						/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
							className: "pb-3",
							children: [/* @__PURE__ */ jsxs(CardTitle, {
								className: "flex items-center gap-2 text-base",
								children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "size-4 text-muted-foreground" }), "Recent Orders"]
							}), /* @__PURE__ */ jsx(CardDescription, { children: "Last 10 order items containing this product" })]
						}), /* @__PURE__ */ jsx(CardContent, {
							className: "p-0",
							children: product.orders.length > 0 ? /* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-sm",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "border-b bg-zinc-50/60 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-left font-medium",
												children: "Order ID"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Qty"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Subtotal"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "px-4 py-2.5 text-right font-medium",
												children: "Date"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "divide-y",
										children: product.orders.map((order) => /* @__PURE__ */ jsxs("tr", {
											className: "transition-colors hover:bg-zinc-50/50",
											children: [
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/admin/orders/${order.order_id}`,
														className: "font-medium text-primary underline-offset-4 hover:underline",
														children: ["#", order.order_id]
													})
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right",
													children: order.quantity
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right font-medium",
													children: formatPrice(order.subtotal)
												}),
												/* @__PURE__ */ jsx("td", {
													className: "px-4 py-2.5 text-right text-xs text-muted-foreground",
													children: order.created_at ?? "-"
												})
											]
										}, order.id))
									})]
								})
							}) : /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx(ShoppingBag, { className: "size-8 opacity-30" }), "No orders yet."]
							})
						})] })
					]
				})]
			})
		]
	})] });
}
function MetricCard({ icon, iconBg, label, value, sub }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-xl border bg-card p-4 shadow-xs",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1.5 text-2xl font-semibold tracking-tight",
					children: value
				}),
				sub && /* @__PURE__ */ jsx("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: sub
				})
			] }), /* @__PURE__ */ jsx("div", {
				className: `rounded-lg p-2 ${iconBg}`,
				children: icon
			})]
		})
	});
}
function InfoRow({ label, value, mono = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ jsx("span", {
			className: "shrink-0 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			className: `text-right ${mono ? "font-mono text-xs" : "font-medium"}`,
			children: value
		})]
	});
}
function FlagPill({ active, label }) {
	return /* @__PURE__ */ jsx("span", {
		className: ["inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", active ? "border-violet-200 bg-violet-50 text-violet-700" : "border-zinc-200 bg-zinc-50 text-zinc-400"].join(" "),
		children: label
	});
}
//#endregion
export { ProductShow as default };

//# sourceMappingURL=show-KsXC6vgg.js.map