import { i as detail, n as checkout, o as list } from "./routes-EPw8WZ-p.js";
import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { n as removeCartItem, r as updateCartItemQuantity } from "./CartController-BSN3yJE9.js";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { BadgeCheck, ChevronLeft, Info, Minus, Plus, RotateCcw, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
//#region resources/js/pages/customer/cart/my-cart.tsx
var fallbackImages = [
	"https://www.100percent.com/cdn/shop/files/59057-00001-P_1.jpg?v=1764788225&width=1100",
	"https://www.100percent.com/cdn/shop/files/SP26_SPEEDCRAFT_SL_60008-00025_3Q.jpg?v=1772487312&width=500",
	"https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Staple_20Tee_0010_Layer_2015.jpg?v=1764633157&width=1200",
	"https://www.100percent.com/cdn/shop/files/2000x2000-eComm_20PDP-Casual_Region_20Tee_0001_Layer_2030.jpg?v=1764633177&width=1200",
	"https://www.100percent.com/cdn/shop/files/FA25_LS_OS_TEE_REGION__2020142-10002_F-002.jpg?v=1764633155&width=1100"
];
var formatPrice = (price) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
}).format(price).replace("Rp", "Rp ");
var itemMeta = (item) => [item.color, item.size].filter(Boolean).join(" / ") || "AxeGear Performance";
function MyCart({ cartItems, summary, suggestedProducts }) {
	const { errors } = usePage().props;
	const [processingItemId, setProcessingItemId] = useState(null);
	const [processingAction, setProcessingAction] = useState(null);
	const isEmpty = cartItems.length === 0;
	const errorMessage = errors.quantity || errors.cart_item || errors.product_variant_id;
	const checkoutHref = useMemo(() => checkout.url(), []);
	const hasStockIssues = useMemo(() => cartItems.filter((item) => !item.is_available), [cartItems]).length > 0;
	const stockIssueMessage = (item) => {
		if (item.available_stock <= 0) return "Product is out of stock. Checkout is unavailable.";
		if (item.available_stock < item.quantity) return `Only ${item.available_stock} left in stock. Update quantity before checkout.`;
		return "Product is unavailable. Checkout is unavailable.";
	};
	const continueToCheckout = () => {
		if (hasStockIssues) {
			toast.error("Update unavailable cart items before checkout.");
			return;
		}
		router.visit(checkoutHref);
	};
	const updateQuantity = (item, nextQuantity) => {
		if (processingItemId !== null || nextQuantity < 1 || nextQuantity === item.quantity || nextQuantity > Math.max(1, item.available_stock)) return;
		setProcessingItemId(item.id);
		setProcessingAction("update");
		router.patch(updateCartItemQuantity(item.id), { quantity: nextQuantity }, {
			preserveScroll: true,
			preserveState: true,
			onFinish: () => {
				setProcessingItemId(null);
				setProcessingAction(null);
			}
		});
	};
	const removeItem = (item) => {
		if (processingItemId !== null) return;
		setProcessingItemId(item.id);
		setProcessingAction("remove");
		router.delete(removeCartItem(item.id), {
			preserveScroll: true,
			preserveState: true,
			onFinish: () => {
				setProcessingItemId(null);
				setProcessingAction(null);
			}
		});
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "My Cart - AxeGear" }), /* @__PURE__ */ jsx("main", {
		className: "bg-white px-4 py-5 text-[#1A1A1A] md:px-9 md:py-7",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1760px]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8 flex items-center gap-2 text-sm font-medium",
				children: [
					/* @__PURE__ */ jsx(Link, {
						href: "/",
						className: "hover:text-[#F58220]",
						children: "Home"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-[#707070]",
						children: "/"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "font-extrabold",
						children: "My Cart"
					})
				]
			}), !isEmpty ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
				/* @__PURE__ */ jsx("div", {
					className: "mb-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,430px)] lg:items-end",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "text-[36px] leading-none font-black tracking-normal md:text-[46px]",
							children: "My Cart"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-base font-medium text-[#2E2E2E]",
							children: "Review your items before checkout."
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: list.url(),
							className: "mt-2 inline-flex items-center gap-1 text-sm font-extrabold hover:text-[#F58220]",
							children: [/* @__PURE__ */ jsx(ChevronLeft, {
								size: 18,
								className: "text-[#F58220]"
							}), "Continue Shopping"]
						})
					] })
				}),
				(errorMessage || hasStockIssues) && /* @__PURE__ */ jsx("div", {
					className: "mb-8 border border-[#F7B06A] bg-[#FFF3E8] px-4 py-3 text-sm font-bold text-[#1A1A1A]",
					children: errorMessage || "Some items are out of stock or unavailable. Update your cart before checkout."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-12 grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(320px,430px)] lg:items-start",
					children: [/* @__PURE__ */ jsx("section", {
						className: "min-w-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "overflow-hidden border border-[#CFCFCF]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "hidden grid-cols-[1fr_170px_190px_170px_50px] border-b border-[#CFCFCF] bg-white px-6 py-4 text-xs font-black tracking-[0.04em] uppercase lg:grid",
								children: [
									/* @__PURE__ */ jsx("span", { children: "Product" }),
									/* @__PURE__ */ jsx("span", { children: "Price" }),
									/* @__PURE__ */ jsx("span", { children: "Quantity" }),
									/* @__PURE__ */ jsx("span", { children: "Subtotal" }),
									/* @__PURE__ */ jsx("span", {})
								]
							}), cartItems.map((item, index) => {
								const isUpdating = processingItemId === item.id && processingAction === "update";
								const isRemoving = processingItemId === item.id && processingAction === "remove";
								const itemDisabled = isUpdating || isRemoving;
								const productHref = item.product_slug ? detail.url({ query: { product: item.product_slug } }) : void 0;
								const canIncrease = item.is_available && item.quantity < Math.max(1, item.available_stock);
								const image = item.image ?? fallbackImages[index % fallbackImages.length];
								return /* @__PURE__ */ jsxs("article", {
									className: "relative grid min-w-0 gap-4 border-b border-[#D8D8D8] bg-white p-4 last:border-b-0 lg:grid-cols-[1fr_170px_190px_170px_50px] lg:items-center lg:px-6 lg:py-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "grid min-w-0 grid-cols-[88px_minmax(0,1fr)] items-center gap-3 pr-12 sm:grid-cols-[118px_minmax(0,1fr)] sm:gap-4 md:grid-cols-[260px_1fr] lg:pr-0",
											children: [productHref ? /* @__PURE__ */ jsx(Link, {
												href: productHref,
												className: "block h-[96px] p-2 sm:h-[110px] md:h-[118px]",
												children: /* @__PURE__ */ jsx("img", {
													src: image,
													alt: item.title,
													className: "h-full w-full object-contain",
													loading: "lazy",
													decoding: "async"
												})
											}) : /* @__PURE__ */ jsx("div", {
												className: "h-[96px] p-2 sm:h-[110px] md:h-[118px]",
												children: /* @__PURE__ */ jsx("img", {
													src: image,
													alt: item.title,
													className: "h-full w-full object-contain",
													loading: "lazy",
													decoding: "async"
												})
											}), /* @__PURE__ */ jsxs("div", { children: [
												productHref ? /* @__PURE__ */ jsx(Link, {
													href: productHref,
													className: "text-base font-black tracking-normal uppercase hover:text-[#F58220]",
													children: item.title
												}) : /* @__PURE__ */ jsx("h2", {
													className: "text-base font-black tracking-normal uppercase",
													children: item.title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm font-medium text-[#2E2E2E]",
													children: itemMeta(item)
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-1 text-sm font-medium text-[#2E2E2E]",
													children: item.variant.sku ?? "AxeGear"
												}),
												!item.is_available && /* @__PURE__ */ jsx("p", {
													className: "mt-2 text-xs font-extrabold text-[#C81E1E]",
													children: stockIssueMessage(item)
												})
											] })]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between lg:block",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-black text-[#707070] uppercase lg:hidden",
												children: "Price"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-black tabular-nums",
												children: formatPrice(item.price)
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between lg:block",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-black text-[#707070] uppercase lg:hidden",
												children: "Quantity"
											}), /* @__PURE__ */ jsx(QuantityControl, {
												quantity: item.quantity,
												disabled: itemDisabled,
												canIncrease,
												onDecrease: () => updateQuantity(item, item.quantity - 1),
												onIncrease: () => updateQuantity(item, item.quantity + 1)
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between lg:block",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-black text-[#707070] uppercase lg:hidden",
												children: "Subtotal"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-black tabular-nums",
												children: formatPrice(item.subtotal)
											})]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => removeItem(item),
											disabled: itemDisabled,
											className: "absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-[#1A1A1A] transition-colors hover:text-[#F58220] disabled:opacity-40 lg:static lg:justify-self-end",
											"aria-label": "Remove item",
											children: /* @__PURE__ */ jsx(Trash2, {
												size: 18,
												strokeWidth: 1.8
											})
										})
									]
								}, item.id);
							})]
						})
					}), /* @__PURE__ */ jsx(OrderSummary, {
						summary,
						hasStockIssues,
						onCheckout: continueToCheckout
					})]
				}),
				suggestedProducts.length > 0 && /* @__PURE__ */ jsx(SuggestedProducts, { products: suggestedProducts })
			] }) : /* @__PURE__ */ jsx(EmptyCart, {})]
		})
	})] });
}
function QuantityControl({ quantity, disabled, canIncrease, onDecrease, onIncrease }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-grid h-10 grid-cols-3 border border-[#CFCFCF] bg-white text-sm font-black",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onDecrease,
				disabled: disabled || quantity <= 1,
				className: "flex w-10 items-center justify-center transition-colors hover:bg-[#F8F8F8] disabled:opacity-35",
				"aria-label": "Decrease quantity",
				children: /* @__PURE__ */ jsx(Minus, {
					size: 16,
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ jsx("span", {
				className: "flex w-10 items-center justify-center tabular-nums",
				children: quantity
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onIncrease,
				disabled: disabled || !canIncrease,
				className: "flex w-10 items-center justify-center text-[#F58220] transition-colors hover:bg-[#FFF3E8] disabled:opacity-35",
				"aria-label": "Increase quantity",
				children: /* @__PURE__ */ jsx(Plus, {
					size: 17,
					strokeWidth: 2.4
				})
			})
		]
	});
}
function OrderSummary({ summary, hasStockIssues, onCheckout }) {
	return /* @__PURE__ */ jsxs("aside", {
		className: "min-w-0 border border-[#CFCFCF] bg-white p-6 lg:p-7",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "mb-5 text-2xl font-black tracking-normal uppercase",
				children: "Order Summary"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "space-y-4 text-base font-medium",
				children: [
					/* @__PURE__ */ jsx(SummaryRow, {
						label: `Subtotal (${summary.item_count} items)`,
						value: formatPrice(summary.subtotal)
					}),
					/* @__PURE__ */ jsx(SummaryRow, {
						label: "Estimated Shipping",
						value: formatPrice(summary.shipping),
						icon: /* @__PURE__ */ jsx(Info, {
							size: 17,
							strokeWidth: 1.8
						})
					}),
					/* @__PURE__ */ jsx(SummaryRow, {
						label: "Discount",
						value: `-${formatPrice(summary.discount)}`,
						accent: true
					})
				]
			}),
			/* @__PURE__ */ jsx("div", { className: "my-6 border-t border-[#CFCFCF]" }),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-3 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-2xl font-black uppercase",
					children: "Total"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[30px] leading-none font-black text-[#F58220] tabular-nums",
					children: formatPrice(summary.total)
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-7 text-sm font-medium text-[#2E2E2E]",
				children: "Taxes and shipping calculated at checkout."
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onCheckout,
				disabled: hasStockIssues,
				className: "h-12 w-full bg-[#F58220] text-sm font-black tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#E67312] disabled:bg-[#CFCFCF] disabled:text-[#707070]",
				children: "Proceed to Checkout"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 grid grid-cols-3 gap-3 text-center text-xs font-medium",
				children: [
					/* @__PURE__ */ jsx(TrustItem, {
						icon: ShieldCheck,
						label: "Secure Checkout"
					}),
					/* @__PURE__ */ jsx(TrustItem, {
						icon: RotateCcw,
						label: "30-Day Returns"
					}),
					/* @__PURE__ */ jsx(TrustItem, {
						icon: BadgeCheck,
						label: "1-Year Warranty"
					})
				]
			})
		]
	});
}
function SummaryRow({ label, value, accent = false, icon }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex items-start justify-between gap-4 ${accent ? "font-black text-[#F58220]" : ""}`,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex min-w-0 items-center gap-2",
			children: [label, icon]
		}), /* @__PURE__ */ jsx("span", {
			className: "shrink-0 font-black tabular-nums",
			children: value
		})]
	});
}
function TrustItem({ icon: Icon, label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ jsx(Icon, {
			className: "h-8 w-8",
			strokeWidth: 1.7
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
}
function SuggestedProducts({ products }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "mt-8 pb-3",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "mb-2 text-2xl font-black tracking-normal uppercase",
			children: "You May Also Like"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4",
			children: products.slice(0, 4).map((product, index) => /* @__PURE__ */ jsxs(Link, {
				href: detail.url({ query: { product: product.slug } }),
				className: "grid min-h-[132px] grid-cols-[180px_1fr] border border-[#E5E5E5] bg-white p-4 transition-colors hover:border-[#1A1A1A]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "bg-[#F8F8F8] p-2",
					children: /* @__PURE__ */ jsx("img", {
						src: product.image ?? fallbackImages[index % fallbackImages.length],
						alt: product.title,
						className: "h-full w-full object-contain",
						loading: "lazy",
						decoding: "async"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col pl-4",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-base leading-tight font-black uppercase",
							children: product.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm font-medium text-[#2E2E2E]",
							children: "AxeGear Performance"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm font-black",
							children: formatPrice(product.price)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "mt-auto flex h-8 items-center justify-center border border-[#F58220] text-xs font-black tracking-[0.05em] text-[#F58220] uppercase hover:bg-[#F58220] hover:text-white",
							children: "View Product"
						})
					]
				})]
			}, product.id))
		})]
	});
}
function EmptyCart() {
	return /* @__PURE__ */ jsxs("section", {
		className: "flex min-h-[520px] flex-col items-center justify-center border border-[#CFCFCF] bg-white px-6 py-20 text-center",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-[40px] leading-none font-black uppercase md:text-[56px]",
				children: "Your cart is empty"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 max-w-md text-base font-medium text-[#707070]",
				children: "Add performance eyewear, goggles, and race-day essentials before checkout."
			}),
			/* @__PURE__ */ jsx(Link, {
				href: list.url(),
				className: "mt-8 inline-flex h-12 items-center justify-center bg-[#F58220] px-8 text-sm font-black tracking-[0.06em] text-white uppercase hover:bg-[#E67312]",
				children: "Continue Shopping"
			})
		]
	});
}
//#endregion
export { MyCart as default };

//# sourceMappingURL=my-cart-BNf2U2PB.js.map