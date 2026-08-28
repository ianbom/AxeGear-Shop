import { i as detail, o as list, t as cart } from "./routes-EPw8WZ-p.js";
import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { t as HTMLRender } from "./HTMLRender-COKIm72z.js";
import { t as addProductVariantToCart } from "./CartController-BSN3yJE9.js";
import { n as destroyProduct, r as store } from "./WishlistController-DHNxYZQ_.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp, Heart, Minus, Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
//#region resources/js/pages/customer/products/detail-product.tsx
var formatPrice = (value) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(value);
var uniqueValues = (values) => Array.from(new Set(values.filter(Boolean)));
function DetailProduct({ product, relatedProducts, recentProducts }) {
	return /* @__PURE__ */ jsx(DetailProductContent, {
		product,
		relatedProducts,
		recentProducts
	}, product.id);
}
function DetailProductContent({ product, relatedProducts, recentProducts }) {
	const variants = useMemo(() => [...product.variants].sort((left, right) => {
		const leftAvailable = left.available_stock > 0 ? 1 : 0;
		const rightAvailable = right.available_stock > 0 ? 1 : 0;
		if (leftAvailable !== rightAvailable) return rightAvailable - leftAvailable;
		return left.id - right.id;
	}), [product.variants]);
	const gallery = useMemo(() => {
		const images = product.images.length > 0 ? product.images : [];
		if (images.length > 0) return images;
		return [];
	}, [product]);
	const colorVariants = useMemo(() => variants.filter((variant) => variant.color_name || variant.color_hex).filter((variant, index, variants) => variants.findIndex((candidate) => candidate.color_name === variant.color_name && candidate.color_hex === variant.color_hex) === index), [variants]);
	const initialVariant = useMemo(() => variants.find((variant) => variant.available_stock > 0) ?? variants[0], [variants]);
	const [mainImage, setMainImage] = useState(gallery[0]?.url ?? null);
	const [selectedVariantId, setSelectedVariantId] = useState(initialVariant?.id ?? null);
	const [quantity, setQuantity] = useState(1);
	const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted);
	const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
	const cartForm = useForm({ quantity: 1 });
	const selectedVariant = useMemo(() => variants.find((variant) => variant.id === selectedVariantId) ?? initialVariant, [
		initialVariant,
		selectedVariantId,
		variants
	]);
	const selectedColor = selectedVariant?.color_name ?? "";
	selectedVariant?.size;
	useMemo(() => uniqueValues(variants.filter((variant) => selectedColor === "" || variant.color_name === selectedColor).map((variant) => variant.size)), [selectedColor, variants]);
	const variantPrice = selectedVariant?.sale_price ?? selectedVariant?.regular_price ?? (product.sale_price ?? product.price) + (selectedVariant?.additional_price ?? 0);
	const basePrice = selectedVariant?.regular_price ?? product.price + (selectedVariant?.additional_price ?? 0);
	const selectedAvailableStock = selectedVariant?.available_stock ?? product.available_stock;
	const selectedCartQuantity = selectedVariant?.cart_quantity ?? 0;
	const remainingStock = Math.max(0, selectedAvailableStock - selectedCartQuantity);
	const maxQuantity = Math.max(1, selectedAvailableStock);
	const effectiveQuantity = Math.min(quantity, maxQuantity);
	const cartStockExceeded = selectedVariant !== void 0 && selectedCartQuantity + effectiveQuantity > selectedAvailableStock;
	const isAvailable = product.available_stock > 0 && selectedAvailableStock > 0;
	const productDescription = product.description || product.short_description;
	const railProducts = relatedProducts.length > 0 ? relatedProducts : recentProducts;
	const decreaseQuantity = () => {
		const nextQuantity = Math.max(1, effectiveQuantity - 1);
		setQuantity(nextQuantity);
		cartForm.setData("quantity", nextQuantity);
	};
	const increaseQuantity = () => {
		const nextQuantity = Math.min(maxQuantity, effectiveQuantity + 1);
		setQuantity(nextQuantity);
		cartForm.setData("quantity", nextQuantity);
	};
	const selectVariant = (variantId) => {
		setSelectedVariantId(variantId);
		setQuantity(1);
		cartForm.setData("quantity", 1);
		const nextVariant = variants.find((variant) => variant.id === variantId);
		if (nextVariant?.image_url) setMainImage(nextVariant.image_url);
	};
	const addProductVariantToCart$1 = (event) => {
		event.preventDefault();
		if (!selectedVariant || !isAvailable || cartForm.processing) return;
		if (cartStockExceeded) {
			toast.error("Cart quantity exceeds available stock.");
			return;
		}
		cartForm.setData("quantity", effectiveQuantity);
		cartForm.submit(addProductVariantToCart(selectedVariant.id), { preserveScroll: true });
	};
	const buyItNow = () => {
		if (!selectedVariant || !isAvailable || cartForm.processing) return;
		if (selectedCartQuantity > 0) {
			router.visit(cart.url());
			return;
		}
		if (cartStockExceeded) {
			toast.error("Cart quantity exceeds available stock.");
			return;
		}
		cartForm.setData("quantity", effectiveQuantity);
		cartForm.submit(addProductVariantToCart(selectedVariant.id), {
			preserveScroll: true,
			onSuccess: () => router.visit(cart.url())
		});
	};
	const toggleWishlist = () => {
		if (isWishlistProcessing) return;
		setIsWishlistProcessing(true);
		const options = {
			preserveScroll: true,
			onSuccess: () => setIsWishlisted((current) => !current),
			onFinish: () => setIsWishlistProcessing(false)
		};
		if (isWishlisted) {
			router.delete(destroyProduct.url(product.id), options);
			return;
		}
		router.post(store.url(product.id), {}, options);
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: `${product.title} - AxeGear` }),
		/* @__PURE__ */ jsx("main", {
			className: "bg-white text-[#1A1A1A]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1760px] px-4 py-5 md:px-8 md:py-6",
				children: [
					/* @__PURE__ */ jsx(Breadcrumb, { product }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12 xl:grid-cols-[940px_1fr]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-6",
							children: [/* @__PURE__ */ jsx(FadeInOnScroll, { children: /* @__PURE__ */ jsx(ProductGallery, {
								gallery,
								mainImage,
								productTitle: product.title,
								onSelectImage: setMainImage
							}) }), /* @__PURE__ */ jsx(FadeInOnScroll, {
								delay: 40,
								children: /* @__PURE__ */ jsx(ProductSpecs, {
									product,
									productDescription
								})
							})]
						}), /* @__PURE__ */ jsx(FadeInOnScroll, {
							delay: 80,
							children: /* @__PURE__ */ jsxs("section", {
								className: "pt-1 lg:pt-6",
								children: [
									/* @__PURE__ */ jsx(ProductHeader, {
										product,
										price: variantPrice,
										basePrice,
										isWishlisted,
										isWishlistProcessing,
										onToggleWishlist: toggleWishlist
									}),
									colorVariants.length > 0 && /* @__PURE__ */ jsx(StylePicker, {
										variants,
										colorVariants,
										selectedColor,
										onSelectVariant: selectVariant
									}),
									/* @__PURE__ */ jsxs("form", {
										onSubmit: addProductVariantToCart$1,
										className: "mt-5 border-y border-[#CFCFCF] py-4",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "grid gap-3 sm:grid-cols-[92px_160px_1fr] sm:items-center",
												children: [
													/* @__PURE__ */ jsx("label", {
														className: "text-sm font-black",
														children: "Quantity"
													}),
													/* @__PURE__ */ jsx(QuantityControl, {
														quantity: effectiveQuantity,
														onDecrease: decreaseQuantity,
														onIncrease: increaseQuantity,
														disableDecrease: quantity <= 1,
														disableIncrease: effectiveQuantity >= maxQuantity || !isAvailable
													}),
													/* @__PURE__ */ jsx("button", {
														type: "submit",
														disabled: !isAvailable || !selectedVariant || cartForm.processing,
														className: "h-12 bg-[#F58220] px-8 text-sm font-black tracking-[0.06em] text-white uppercase transition-colors hover:bg-[#E67312] disabled:bg-[#CFCFCF] disabled:text-[#707070]",
														children: cartForm.processing ? "Adding..." : "Add to Cart"
													})
												]
											}),
											cartForm.errors.product_variant_id && /* @__PURE__ */ jsx("p", {
												className: "mt-3 text-sm font-bold text-[#C81E1E]",
												children: cartForm.errors.product_variant_id
											}),
											selectedCartQuantity > 0 && /* @__PURE__ */ jsx("p", {
												className: `mt-3 text-sm font-bold ${cartStockExceeded ? "text-[#C81E1E]" : "text-[#707070]"}`,
												children: cartStockExceeded ? "Cart quantity exceeds available stock." : `In cart: ${selectedCartQuantity}. Remaining stock: ${remainingStock}.`
											})
										]
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: buyItNow,
										disabled: !isAvailable || !selectedVariant || cartForm.processing,
										className: "sr-only",
										children: "Buy it now"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ jsx(OtherStyles, { products: railProducts })
				]
			})
		}),
		isSizeGuideOpen && /* @__PURE__ */ jsx(SizeGuideModal, { onClose: () => setIsSizeGuideOpen(false) })
	] });
}
function Breadcrumb({ product }) {
	return /* @__PURE__ */ jsxs("nav", {
		className: "mb-6 flex flex-wrap items-center gap-3 text-sm font-medium text-[#1A1A1A]",
		children: [
			/* @__PURE__ */ jsx(Link, {
				href: list.url(),
				className: "hover:text-[#F58220]",
				children: "Shop"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "text-[#707070]",
				children: "/"
			}),
			product.category && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Link, {
				href: list.url({ query: { category: product.category_slug } }),
				className: "hover:text-[#F58220]",
				children: product.category
			}), /* @__PURE__ */ jsx("span", {
				className: "text-[#707070]",
				children: "/"
			})] }),
			/* @__PURE__ */ jsx("span", { children: product.collection ?? product.title })
		]
	});
}
function ProductGallery({ gallery, mainImage, productTitle, onSelectImage }) {
	const galleryItems = gallery.slice(0, 6);
	return /* @__PURE__ */ jsxs("section", {
		className: "grid gap-4 md:grid-cols-[110px_1fr]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:items-center md:overflow-visible md:pb-0",
			children: [
				galleryItems.length > 0 && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "hidden h-8 w-8 items-center justify-center md:flex",
					"aria-label": "Previous thumbnails",
					children: /* @__PURE__ */ jsx(ChevronUp, {
						size: 22,
						strokeWidth: 1.8
					})
				}),
				galleryItems.map((image, index) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => onSelectImage(image.url),
					className: `h-[84px] w-[100px] shrink-0 border bg-white p-2 transition-colors md:h-[90px] md:w-[104px] ${mainImage === image.url ? "border-[#F58220]" : "border-[#D8D8D8] hover:border-[#1A1A1A]"}`,
					children: /* @__PURE__ */ jsx("img", {
						src: image.url,
						alt: image.alt,
						className: "h-full w-full object-contain",
						loading: "lazy",
						decoding: "async"
					})
				}, `${image.url}-${index}`)),
				galleryItems.length > 0 && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "hidden h-8 w-8 items-center justify-center md:flex",
					"aria-label": "Next thumbnails",
					children: /* @__PURE__ */ jsx(ChevronDown, {
						size: 22,
						strokeWidth: 1.8
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "group relative order-1 flex min-h-[420px] items-center justify-center border border-[#D8D8D8] bg-white p-5 md:order-2 lg:min-h-[560px] xl:min-h-[640px]",
			children: [mainImage ? /* @__PURE__ */ jsx("img", {
				src: mainImage,
				alt: productTitle,
				className: "h-full max-h-[620px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]",
				decoding: "async"
			}) : /* @__PURE__ */ jsx("p", {
				className: "text-sm font-bold text-[#707070]",
				children: "No product image available."
			}), mainImage && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#D8D8D8] bg-white text-[#1A1A1A] transition-colors hover:border-[#F58220] hover:text-[#F58220]",
				"aria-label": "Zoom product image",
				children: /* @__PURE__ */ jsx(Search, {
					size: 24,
					strokeWidth: 1.8
				})
			})]
		})]
	});
}
function ProductHeader({ product, price, basePrice, isWishlisted, isWishlistProcessing, onToggleWishlist }) {
	const hasSale = product.sale_price !== null || price < basePrice;
	return /* @__PURE__ */ jsxs("header", {
		className: "relative pr-14",
		children: [
			(product.collection ?? product.category) && /* @__PURE__ */ jsx("p", {
				className: "mb-3 text-xs font-black tracking-[0.08em] text-[#F58220] uppercase",
				children: product.collection ?? product.category
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "max-w-[720px] text-[30px] leading-[0.98] font-black tracking-normal text-[#1A1A1A] uppercase md:text-[38px]",
				children: product.title
			}),
			product.short_description && /* @__PURE__ */ jsx("p", {
				className: "mt-3 max-w-[620px] text-sm leading-6 font-medium text-[#707070]",
				children: product.short_description
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onToggleWishlist,
				disabled: isWishlistProcessing,
				className: "absolute top-8 right-0 flex h-11 w-11 items-center justify-center text-[#1A1A1A] transition-colors hover:text-[#F58220] disabled:opacity-45",
				"aria-label": isWishlisted ? "Remove product from wishlist" : "Add product to wishlist",
				children: /* @__PURE__ */ jsx(Heart, {
					size: 29,
					fill: isWishlisted ? "currentColor" : "none",
					strokeWidth: 1.7
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 flex flex-wrap items-end gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-[28px] leading-none font-black tabular-nums",
					children: formatPrice(price)
				}), hasSale && /* @__PURE__ */ jsx("span", {
					className: "text-base font-bold text-[#9A9A9A] tabular-nums line-through",
					children: formatPrice(basePrice)
				})]
			})
		]
	});
}
function StylePicker({ variants, colorVariants, selectedColor, onSelectVariant }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "mb-3 text-sm font-black uppercase",
			children: "Other styles"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-3 gap-3 sm:grid-cols-4",
			children: colorVariants.slice(0, 8).map((variant) => {
				const colorAvailable = variants.some((candidate) => candidate.color_name === (variant.color_name ?? "") && candidate.available_stock > 0);
				const isSelected = selectedColor === (variant.color_name ?? "");
				const variantImage = variant.image_url;
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					disabled: !colorAvailable,
					onClick: () => {
						onSelectVariant(variants.find((candidate) => candidate.color_name === variant.color_name && candidate.available_stock > 0)?.id ?? variant.id);
					},
					className: `border bg-white p-2 text-left transition-colors ${isSelected ? "border-[#F58220]" : "border-[#D8D8D8] hover:border-[#1A1A1A]"} ${!colorAvailable ? "cursor-not-allowed opacity-45" : ""}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "block aspect-[1.7] bg-[#F8F8F8] p-1",
						children: variantImage && /* @__PURE__ */ jsx("img", {
							src: variantImage,
							alt: variant.color_name ?? "",
							className: "h-full w-full object-contain",
							loading: "lazy",
							decoding: "async"
						})
					}), (variant.color_name ?? variant.color_hex) && /* @__PURE__ */ jsx("span", {
						className: "mt-2 block truncate text-[11px] font-black uppercase",
						children: variant.color_name ?? variant.color_hex
					})]
				}, `${variant.color_name}-${variant.color_hex}`);
			})
		})]
	});
}
function QuantityControl({ quantity, onDecrease, onIncrease, disableDecrease, disableIncrease }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-grid h-12 w-[150px] grid-cols-3 border border-[#CFCFCF] bg-white text-base font-black",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onDecrease,
				disabled: disableDecrease,
				className: "flex items-center justify-center text-[#9A9A9A] transition-colors hover:bg-[#F8F8F8] hover:text-[#1A1A1A] disabled:opacity-35",
				"aria-label": "Decrease quantity",
				children: /* @__PURE__ */ jsx(Minus, {
					size: 18,
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ jsx("span", {
				className: "flex items-center justify-center tabular-nums",
				children: quantity
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onIncrease,
				disabled: disableIncrease,
				className: "flex items-center justify-center transition-colors hover:bg-[#FFF3E8] hover:text-[#F58220] disabled:opacity-35",
				"aria-label": "Increase quantity",
				children: /* @__PURE__ */ jsx(Plus, {
					size: 20,
					strokeWidth: 2.4
				})
			})
		]
	});
}
function ProductSpecs({ product, productDescription }) {
	return /* @__PURE__ */ jsx("section", {
		className: "py-6",
		children: /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-base font-black uppercase",
				children: "Product Description"
			}),
			productDescription && /* @__PURE__ */ jsx(HTMLRender, {
				html: productDescription,
				className: "mt-4 text-sm leading-6 font-medium text-[#2E2E2E] [&_a]:text-[#F58220] [&_h1]:text-lg [&_h2]:text-base [&_strong]:font-black [&_strong]:text-[#1A1A1A] [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5"
			}),
			/* @__PURE__ */ jsx("dl", {
				className: "mt-5 grid gap-2 text-sm font-medium text-[#2E2E2E] sm:grid-cols-2",
				children: [
					["Product Line", product.product_line],
					["Style Name", product.style_name],
					["Weight", product.weight === null ? null : `${product.weight} gram`],
					["Length", product.dimensions.length === null ? null : `${product.dimensions.length} cm`],
					["Width", product.dimensions.width === null ? null : `${product.dimensions.width} cm`],
					["Height", product.dimensions.height === null ? null : `${product.dimensions.height} cm`]
				].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
					className: "flex justify-between gap-4 border-b border-[#E5E5E5] py-2",
					children: [/* @__PURE__ */ jsx("dt", {
						className: "font-black text-[#1A1A1A]",
						children: label
					}), /* @__PURE__ */ jsx("dd", {
						className: "text-right",
						children: value ?? "—"
					})]
				}, label))
			})
		] })
	});
}
function OtherStyles({ products }) {
	if (products.length === 0) return null;
	return /* @__PURE__ */ jsxs(FadeInOnScroll, {
		className: "mt-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "mb-2 text-2xl font-black tracking-normal uppercase",
			children: "Other Recommendations"
		}), /* @__PURE__ */ jsx("div", {
			className: "grid gap-5 md:grid-cols-3 xl:grid-cols-6",
			children: products.slice(0, 6).map((product) => /* @__PURE__ */ jsxs(Link, {
				href: detail.url({ query: { product: product.slug } }),
				className: "group border border-[#D8D8D8] bg-white p-4 transition-colors hover:border-[#1A1A1A]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[1.7] bg-[#F8F8F8] p-2",
					children: product.image && /* @__PURE__ */ jsx("img", {
						src: product.image,
						alt: product.title,
						className: "h-full w-full object-contain transition-transform duration-500 group-hover:scale-105",
						loading: "lazy",
						decoding: "async"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "line-clamp-2 text-sm leading-tight font-black uppercase",
						children: product.title
					}), /* @__PURE__ */ jsx("span", {
						className: "shrink-0 text-sm font-black tabular-nums",
						children: formatPrice(product.sale_price ?? product.price)
					})]
				})]
			}, product.id))
		})]
	});
}
function SizeGuideModal({ onClose }) {
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Size guide",
		onClick: onClose,
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative max-h-[90vh] w-full max-w-3xl overflow-hidden bg-white shadow-[0_24px_60px_rgba(26,26,26,0.22)]",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-[#CFCFCF] px-5 py-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-black tracking-[0.08em] uppercase",
					children: "Size Guide"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm font-medium text-[#707070]",
					children: "Use this guide before selecting a size."
				})] }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onClose,
					className: "flex h-10 w-10 items-center justify-center border border-[#CFCFCF] hover:border-[#F58220] hover:text-[#F58220]",
					"aria-label": "Close size guide",
					children: /* @__PURE__ */ jsx(X, { size: 18 })
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-h-[calc(90vh-80px)] overflow-auto bg-[#F8F8F8] p-4",
				children: /* @__PURE__ */ jsx("img", {
					src: "/size-guide.webp",
					alt: "Size guide",
					className: "mx-auto h-auto w-full max-w-full object-contain"
				})
			})]
		})
	});
}
function FadeInOnScroll({ children, className = "", delay = 0 }) {
	const [visible, setVisible] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.unobserve(entry.target);
			}
		}, {
			rootMargin: "0px 0px -12% 0px",
			threshold: .16
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: `${className} transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
		style: { transitionDelay: `${delay}ms` },
		children
	});
}
//#endregion
export { DetailProduct as default };

//# sourceMappingURL=detail-product-72ovQ_k3.js.map