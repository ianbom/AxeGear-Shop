import { i as detail, o as list, s as login } from "./routes-EPw8WZ-p.js";
import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { n as destroyProduct, r as store } from "./WishlistController-DHNxYZQ_.js";
import { Head, InfiniteScroll, Link, router, usePage } from "@inertiajs/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDown, Heart, Search } from "lucide-react";
//#region resources/js/pages/customer/products/list-product.tsx
var defaultFilters = {
	search: "",
	category: "",
	collection: "",
	type: "all",
	availability: "all",
	price: "all",
	color: "",
	size: "",
	sort: "featured",
	order: "desc",
	per_page: "12"
};
var availabilityOptions = [
	{
		value: "all",
		label: "All"
	},
	{
		value: "in_stock",
		label: "In Stock"
	},
	{
		value: "out_of_stock",
		label: "Out of Stock"
	}
];
var fallbackImages = [
	"/img/abdul-raheem-kannath-aNWfK46QWto-unsplash.webp",
	"/img/ainur-iman-qcNmigFPTQM-unsplash.webp",
	"/img/atiyeh-fathi-CvdzGjVX9DA-unsplash.webp",
	"/img/hasan-almasi-_X2UAmIcpko-unsplash.webp",
	"/img/ike-ellyana-2F70bGqQVa4-unsplash.webp"
];
var formatPrice = (value) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(value).replace("IDR", "Rp").trim();
var cleanQuery = (filters) => Object.fromEntries(Object.entries(filters).filter(([key, value]) => {
	if (value === "") return false;
	if (key === "per_page") return value !== defaultFilters.per_page;
	return value !== defaultFilters[key];
}));
function ListProduct({ products, filters, options, collectionBanner }) {
	const { auth } = usePage().props;
	const isAuthenticated = Boolean(auth.user);
	const [form, setForm] = useState(useMemo(() => ({
		...filters,
		per_page: String(filters.per_page ?? defaultFilters.per_page)
	}), [filters]));
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const openFilter = useCallback(() => setIsFilterOpen(true), []);
	const closeFilter = useCallback(() => setIsFilterOpen(false), []);
	useEffect(() => {
		if (form.search === (filters.search ?? "")) return;
		const timeout = window.setTimeout(() => {
			router.get(list.url(), cleanQuery(form), {
				preserveScroll: true,
				preserveState: true,
				replace: true
			});
		}, 350);
		return () => window.clearTimeout(timeout);
	}, [filters.search, form]);
	const visit = (nextFilters) => {
		setForm(nextFilters);
		router.get(list.url(), cleanQuery(nextFilters), {
			preserveScroll: true,
			preserveState: true,
			replace: true
		});
	};
	const setFilter = (key, value) => {
		visit({
			...form,
			[key]: value,
			...key === "collection" && value !== "" ? { search: "" } : {}
		});
	};
	const resetFilters = () => {
		visit(defaultFilters);
	};
	const submitSearch = (event) => {
		event.preventDefault();
		visit(form);
	};
	const pageTitle = options.collections.find((collection) => collection.slug === filters.collection)?.name ?? "All Products";
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, { title: `${pageTitle} - AxeGear` }), /* @__PURE__ */ jsxs("section", {
		className: "pb-9",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Close filter overlay",
				onClick: closeFilter,
				className: `fixed inset-0 z-[70] bg-black/50 transition-opacity lg:hidden ${isFilterOpen ? "opacity-100" : "pointer-events-none opacity-0"}`
			}),
			/* @__PURE__ */ jsxs("aside", {
				"aria-label": "Mobile filters",
				className: `fixed top-0 bottom-0 left-0 z-[80] flex w-[min(88vw,360px)] flex-col overflow-hidden border-r border-ink bg-canvas p-5 transition-transform lg:hidden ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-5 flex items-center justify-between border-b border-hairline-strong pb-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-[22px] font-extrabold text-ink",
							children: "Filter:"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: closeFilter,
							className: "h-10 border border-hairline-strong px-4 text-[12px] font-extrabold uppercase hover:border-ink",
							children: "Close"
						})]
					}),
					/* @__PURE__ */ jsx(FilterPanel, {
						form,
						options,
						setFilter,
						resetFilters,
						submitSearch,
						setSearch: (value) => setForm((current) => ({
							...current,
							search: value,
							collection: value.trim() === "" ? current.collection : ""
						})),
						compact: true
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-3 border-t border-hairline pt-4",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: resetFilters,
							className: "h-12 border border-hairline-strong text-[12px] font-extrabold uppercase hover:border-ink",
							children: "Clear"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: closeFilter,
							className: "h-12 bg-ink text-[12px] font-extrabold text-white uppercase hover:bg-primary",
							children: "Apply"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "mb-8 w-full overflow-hidden bg-[#F2F2F2]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative aspect-[16/6] min-h-[180px] w-full sm:min-h-[220px] lg:aspect-[16/4.8] lg:min-h-[260px]",
					children: [
						/* @__PURE__ */ jsxs("picture", { children: [/* @__PURE__ */ jsx("source", {
							media: "(max-width: 767px)",
							srcSet: collectionBanner.banner_mobile_url ?? collectionBanner.banner_desktop_url ?? fallbackImages[1]
						}), /* @__PURE__ */ jsx("img", {
							src: collectionBanner.banner_desktop_url ?? collectionBanner.banner_mobile_url ?? fallbackImages[0],
							alt: collectionBanner.title,
							className: "absolute inset-0 h-full w-full object-cover"
						})] }),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/15" }),
						!collectionBanner.is_default && /* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 flex items-center justify-center px-6 text-center",
							children: /* @__PURE__ */ jsx("h1", {
								className: "text-[32px] leading-none font-extrabold tracking-[-0.03em] text-white sm:text-[40px] lg:text-[52px]",
								children: collectionBanner.title
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto mb-8 grid max-w-[1728px] gap-5 px-6 sm:px-8 md:grid-cols-[280px_minmax(0,1fr)] md:items-start lg:grid-cols-[300px_minmax(0,1fr)] lg:px-9",
				children: [/* @__PURE__ */ jsxs("nav", {
					"aria-label": "Breadcrumb",
					className: "flex items-center gap-3 text-[17px] text-ink",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: list.url(),
							className: "font-normal hover:text-primary",
							children: "Shop"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-extrabold",
							children: pageTitle
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-between gap-4 md:justify-end",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: openFilter,
							className: "h-11 border border-ink px-5 text-[13px] font-extrabold uppercase hover:bg-ink hover:text-white lg:hidden",
							children: "Filter"
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: submitSearch,
							className: "relative w-full sm:w-72 lg:w-80",
							children: [/* @__PURE__ */ jsx(Search, {
								className: "absolute top-1/2 left-3 -translate-y-1/2 text-ink",
								size: 18
							}), /* @__PURE__ */ jsx("input", {
								type: "search",
								value: form.search,
								onChange: (event) => setForm((current) => ({
									...current,
									search: event.target.value
								})),
								placeholder: "Search products",
								className: "h-11 w-full border border-hairline-strong bg-canvas pr-4 pl-10 text-[14px] text-ink placeholder:text-muted-foreground focus:border-ink focus:ring-0 focus:outline-none"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-3 text-[17px] text-ink",
							children: [/* @__PURE__ */ jsx("span", { children: "Sort by:" }), /* @__PURE__ */ jsx("select", {
								value: form.sort,
								onChange: (event) => setFilter("sort", event.target.value),
								className: "border-0 bg-transparent py-0 pr-8 pl-0 text-[17px] font-medium text-ink focus:ring-0",
								children: options.sorts.map((sort) => /* @__PURE__ */ jsx("option", {
									value: sort.value,
									children: sort.label
								}, sort.value))
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1728px] gap-9 px-6 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-9",
				children: [/* @__PURE__ */ jsxs("aside", {
					className: "hidden lg:block",
					"aria-label": "Filters",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "mb-7 text-[25px] leading-none font-extrabold text-ink",
						children: "Filter:"
					}), /* @__PURE__ */ jsx(FilterPanel, {
						form,
						options,
						setFilter,
						resetFilters,
						submitSearch,
						setSearch: (value) => setForm((current) => ({
							...current,
							search: value,
							collection: value.trim() === "" ? current.collection : ""
						}))
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "min-w-0",
					children: products.data.length > 0 ? /* @__PURE__ */ jsx(ProductGrid, {
						products: products.data,
						isAuthenticated
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex min-h-[460px] flex-col items-center justify-center border border-hairline bg-surface-soft px-6 text-center",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[18px] font-extrabold tracking-[0.02em] text-ink uppercase",
								children: "No products found"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-sm text-[14px] leading-6 text-body",
								children: "Try a different keyword or clear active filters to reload the catalog."
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: resetFilters,
								className: "mt-6 h-12 bg-ink px-7 text-[13px] font-extrabold text-white uppercase hover:bg-primary",
								children: "Clear filters"
							})
						]
					})
				})]
			})
		]
	})] });
}
function FilterPanel({ form, options, setFilter, submitSearch, setSearch, compact = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: compact ? "min-h-0 flex-1 overflow-y-auto" : "",
		children: [
			compact && /* @__PURE__ */ jsxs("form", {
				onSubmit: submitSearch,
				className: "relative mb-5",
				children: [/* @__PURE__ */ jsx(Search, {
					className: "absolute top-1/2 left-3 -translate-y-1/2 text-ink",
					size: 18
				}), /* @__PURE__ */ jsx("input", {
					type: "search",
					value: form.search,
					onChange: (event) => setSearch(event.target.value),
					placeholder: "Search products",
					className: "h-12 w-full border border-hairline-strong bg-canvas pr-4 pl-10 text-[14px] focus:border-ink focus:ring-0 focus:outline-none"
				})]
			}),
			/* @__PURE__ */ jsxs(FilterSection, {
				title: "Category",
				children: [/* @__PURE__ */ jsx(FilterRadio, {
					label: "All Categories",
					active: form.category === "",
					onClick: () => setFilter("category", "")
				}), options.categories.map((category) => /* @__PURE__ */ jsx(FilterRadio, {
					label: category.name ?? "Untitled",
					active: form.category === category.slug,
					onClick: () => setFilter("category", category.slug ?? "")
				}, category.id ?? category.slug))]
			}),
			/* @__PURE__ */ jsxs(FilterSection, {
				title: "Collections",
				children: [/* @__PURE__ */ jsx(FilterRadio, {
					label: "All Collections",
					active: form.collection === "",
					onClick: () => setFilter("collection", "")
				}), options.collections.map((collection) => /* @__PURE__ */ jsx(FilterRadio, {
					label: collection.name ?? "Untitled",
					active: form.collection === collection.slug,
					onClick: () => setFilter("collection", collection.slug ?? "")
				}, collection.id ?? collection.slug))]
			}),
			/* @__PURE__ */ jsx(FilterSection, {
				title: "Price",
				children: options.priceRanges.map((price) => /* @__PURE__ */ jsx(FilterRadio, {
					label: price.label,
					active: form.price === price.value,
					onClick: () => setFilter("price", price.value)
				}, price.value))
			}),
			/* @__PURE__ */ jsx(FilterSection, {
				title: "Availability",
				children: availabilityOptions.map((availability) => /* @__PURE__ */ jsx(FilterRadio, {
					label: availability.label,
					active: form.availability === availability.value,
					onClick: () => setFilter("availability", availability.value)
				}, availability.value))
			})
		]
	});
}
function FilterSection({ title, children }) {
	const [isOpen, setIsOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "border-b border-hairline-strong py-[18px] first:pt-0",
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: () => setIsOpen(!isOpen),
			className: "flex w-full items-center justify-between text-[17px] font-extrabold text-ink hover:text-primary",
			children: [/* @__PURE__ */ jsx("span", { children: title }), /* @__PURE__ */ jsx(ChevronDown, {
				size: 25,
				strokeWidth: 2.4,
				className: `transition-transform ${isOpen ? "rotate-180" : ""}`
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: `grid transition-[grid-template-rows,opacity,padding] duration-200 ${isOpen ? "grid-rows-[1fr] pt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`,
			children: /* @__PURE__ */ jsx("div", {
				className: "grid gap-2 overflow-hidden",
				children
			})
		})]
	});
}
function FilterRadio({ label, active, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: "group flex min-h-8 items-center gap-3 text-left text-[14px] text-body hover:text-ink",
		children: [/* @__PURE__ */ jsx("span", { className: `size-3 border ${active ? "border-primary bg-primary" : "border-hairline-strong"}` }), /* @__PURE__ */ jsx("span", {
			className: active ? "font-extrabold text-ink" : "",
			children: label
		})]
	});
}
var ProductGrid = memo(function ProductGrid({ products, isAuthenticated }) {
	return /* @__PURE__ */ jsx(InfiniteScroll, {
		data: "products",
		buffer: 400,
		children: ({ loading }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4",
			children: products.map((product, index) => /* @__PURE__ */ jsx(ProductTile, {
				product,
				index,
				isAuthenticated
			}, product.id))
		}), loading && /* @__PURE__ */ jsx(ProductGridSkeleton, {})] })
	});
});
function ProductGridSkeleton() {
	return /* @__PURE__ */ jsx("div", {
		className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4",
		children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", {
			className: "border border-hairline p-4",
			children: [
				/* @__PURE__ */ jsx("div", { className: "aspect-square animate-pulse bg-surface-muted" }),
				/* @__PURE__ */ jsx("div", { className: "mt-4 h-4 w-4/5 animate-pulse bg-surface-muted" }),
				/* @__PURE__ */ jsx("div", { className: "mt-2 h-4 w-1/2 animate-pulse bg-surface-muted" })
			]
		}, index))
	});
}
var ProductTile = memo(function ProductTile({ product, index, isAuthenticated }) {
	const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(product.is_wishlisted);
	const isSoldOut = product.available_stock <= 0;
	const productHref = detail.url({ query: { product: product.slug } });
	const subtitle = product.collection ?? product.category ?? product.sku;
	const visibleColors = product.colors.slice(0, 4);
	const toggleWishlist = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (isWishlistProcessing) return;
		if (!isAuthenticated) {
			router.visit(login.url());
			return;
		}
		setIsWishlistProcessing(true);
		const previous = isWishlisted;
		setIsWishlisted(!previous);
		try {
			if (!(await fetch(previous ? destroyProduct.url(product.id) : store.url(product.id), {
				method: previous ? "DELETE" : "POST",
				headers: {
					Accept: "application/json",
					"X-Requested-With": "XMLHttpRequest",
					"X-CSRF-TOKEN": document.querySelector("meta[name=\"csrf-token\"]")?.content ?? ""
				}
			})).ok) setIsWishlisted(previous);
		} catch {
			setIsWishlisted(previous);
		} finally {
			setIsWishlistProcessing(false);
		}
	};
	return /* @__PURE__ */ jsxs("article", {
		className: "group relative border border-hairline bg-canvas transition-colors hover:border-hairline-strong",
		children: [
			/* @__PURE__ */ jsx(Link, {
				href: productHref,
				className: "block",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative aspect-square overflow-hidden bg-white p-5 sm:p-6",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: product.image ?? fallbackImages[index % fallbackImages.length],
							alt: product.title,
							loading: "lazy",
							decoding: "async",
							className: `h-full w-full object-contain transition duration-300 group-hover:scale-[1.035] ${isSoldOut ? "opacity-45 grayscale" : ""}`
						}),
						!isSoldOut && product.badge && /* @__PURE__ */ jsx("span", {
							className: "absolute top-4 left-0 z-10 flex min-h-26 w-9 items-center justify-center bg-primary px-1 py-2 text-[11px] font-extrabold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[12px]",
							children: product.badge === "DISCOUNT" ? "SALE" : product.badge
						}),
						isSoldOut && /* @__PURE__ */ jsx("span", {
							className: "absolute top-4 left-0 z-10 flex min-h-26 w-9 items-center justify-center bg-ink px-1 py-2 text-[10px] font-extrabold tracking-[0.08em] text-white uppercase [writing-mode:vertical-rl] [text-orientation:mixed] [transform:rotate(180deg)] sm:w-10 sm:text-[11px]",
							children: "Sold Out"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": isWishlisted ? "Remove product from wishlist" : "Add product to wishlist",
				onClick: toggleWishlist,
				disabled: isWishlistProcessing,
				className: `absolute top-3 right-3 z-10 hidden size-10 items-center justify-center border border-hairline bg-white text-ink shadow-subtle group-hover:flex hover:border-ink hover:text-primary ${isWishlisted ? "border-primary text-primary" : "text-ink"}`,
				children: /* @__PURE__ */ jsx(Heart, {
					"aria-hidden": "true",
					className: `size-5 ${isWishlisted ? "fill-current" : ""}`,
					strokeWidth: 2.2
				})
			}),
			/* @__PURE__ */ jsxs(Link, {
				href: productHref,
				className: "block px-4 pt-1 pb-4 sm:px-5",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "line-clamp-1 text-[16px] leading-5 font-extrabold text-ink uppercase",
						children: product.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 line-clamp-1 text-[15px] leading-5 text-body",
						children: subtitle ?? "Performance Gear"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1 flex min-h-5 flex-wrap items-center gap-1.5",
						children: visibleColors.length > 0 ? visibleColors.map((color, colorIndex) => /* @__PURE__ */ jsx("span", {
							"aria-label": color.name ?? color.hex,
							className: "size-4 border border-hairline-strong",
							style: { backgroundColor: color.hex }
						}, `${color.hex}-${color.name ?? colorIndex}`)) : /* @__PURE__ */ jsx("span", {
							className: "line-clamp-1 text-[15px] leading-5 text-body",
							children: product.sku || "AxeGear Edition"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-2 flex flex-wrap items-center gap-4 text-[18px] leading-none font-extrabold",
						children: [product.sale_price !== null && /* @__PURE__ */ jsx("span", {
							className: "text-ink line-through decoration-1",
							children: formatPrice(product.price)
						}), /* @__PURE__ */ jsx("span", {
							className: product.sale_price !== null ? "text-primary" : "text-ink",
							children: formatPrice(product.sale_price ?? product.price)
						})]
					})
				]
			})
		]
	});
});
//#endregion
export { ListProduct as default };

//# sourceMappingURL=list-product-BoS6CkGn.js.map