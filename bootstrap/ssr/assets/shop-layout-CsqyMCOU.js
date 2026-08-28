import { s as login } from "./routes-EPw8WZ-p.js";
import { t as Toaster } from "./sonner-D1SF8OoB.js";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ChevronDown, Facebook, Instagram, Menu, ShoppingCart, User, X, Youtube, Zap } from "lucide-react";
//#region resources/js/components/Footer.tsx
var columns = [
	{
		title: "SHOP",
		links: [
			{
				label: "Enduro",
				href: "#"
			},
			{
				label: "MTB",
				href: "#"
			},
			{
				label: "Running",
				href: "#"
			},
			{
				label: "Adventure",
				href: "#"
			},
			{
				label: "New Product",
				href: "#"
			}
		]
	},
	{
		title: "EXPLORE",
		links: [
			{
				label: "About Axegear",
				href: "/about"
			},
			{
				label: "Brand Ambassador",
				href: "#"
			},
			{
				label: "Gallery",
				href: "/gallery"
			},
			{
				label: "Blog",
				href: "/blog"
			}
		]
	},
	{
		title: "SUPPORT",
		links: [{
			label: "FAQ",
			href: "#"
		}, {
			label: "Contact Us",
			href: "#"
		}]
	}
];
var socialLinks = [
	{
		label: "Instagram",
		href: "/",
		icon: Instagram
	},
	{
		label: "Facebook",
		href: "/",
		icon: Facebook
	},
	{
		label: "YouTube",
		href: "/",
		icon: Youtube
	},
	{
		label: "Athletes",
		href: "/",
		icon: Zap
	}
];
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		id: "contact",
		className: "bg-[#0d0d0d] text-white",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-white/10 bg-[#0c0c0c]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1728px] gap-10 px-6 py-9 sm:px-8 md:grid-cols-[1.25fr_0.7fr_0.7fr_0.7fr_1.45fr] md:gap-0 md:px-[68px] md:py-10",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "pr-0 md:pr-12",
						children: [
							/* @__PURE__ */ jsxs(Link, {
								href: "/",
								className: "inline-flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("img", {
									src: "/logo-shay/axegear-logo-transparant.webp",
									alt: "AxeGear",
									className: "h-16 w-auto object-contain brightness-100 invert-0 sm:h-18"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[28px] leading-none font-black tracking-[-0.08em] text-white uppercase sm:text-[34px] md:text-[42px]",
									children: "AxeGear"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-5 max-w-[310px] text-[16px] leading-[1.45] font-medium text-white/76",
								children: "Performance eyewear and gear engineered for athletes who refuse to slow down."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-7 flex items-center gap-5",
								children: socialLinks.map(({ label, href, icon: Icon }) => /* @__PURE__ */ jsx(Link, {
									href,
									"aria-label": label,
									className: "inline-flex h-8 w-8 items-center justify-center text-white transition-colors hover:text-[#F58220]",
									children: /* @__PURE__ */ jsx(Icon, {
										className: "h-[22px] w-[22px]",
										strokeWidth: 2.1
									})
								}, label))
							})
						]
					}),
					columns.map((column) => /* @__PURE__ */ jsxs("section", {
						className: "md:border-l md:border-white/10 md:px-10",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-[15px] leading-none font-extrabold tracking-[0.04em] text-white uppercase",
							children: column.title
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-6 grid gap-3.5",
							children: column.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								href: link.href,
								onClick: (event) => {
									if (link.href === "#") event.preventDefault();
								},
								className: "text-[16px] leading-none font-medium text-white/82 transition-colors hover:text-[#F58220]",
								children: link.label
							}) }, link.label))
						})]
					}, column.title)),
					/* @__PURE__ */ jsxs("section", {
						className: "md:border-l md:border-white/10 md:pl-12",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "text-[15px] leading-none font-extrabold tracking-[0.04em] text-white uppercase",
								children: "STAY CONNECTED"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-[16px] leading-[1.4] font-medium text-white/86",
								children: "Be the first to know."
							}),
							/* @__PURE__ */ jsx("form", {
								className: "mt-5",
								onSubmit: (event) => event.preventDefault(),
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex h-[56px] items-center border border-white/14 bg-[#101010] px-5",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "footer-stay-connected",
											className: "sr-only",
											children: "Email address"
										}),
										/* @__PURE__ */ jsx("input", {
											id: "footer-stay-connected",
											type: "email",
											placeholder: "Enter your email",
											className: "h-full min-w-0 flex-1 bg-transparent text-[16px] font-medium text-white outline-none placeholder:text-white/52"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											"aria-label": "Submit email",
											className: "inline-flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-[#F58220]",
											children: /* @__PURE__ */ jsx(ArrowRight, {
												className: "h-5 w-5",
												strokeWidth: 2.2
											})
										})
									]
								})
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "bg-[#0b0b0b]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-[1728px] flex-col gap-4 px-6 py-5 text-[15px] font-medium text-white/72 sm:px-8 md:flex-row md:items-center md:justify-between md:px-[68px]",
				children: [/* @__PURE__ */ jsx("p", { children: "© 2024 AxeGear Shop. All Rights Reserved." }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3 text-white/78",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: "/privacy-policy",
							className: "transition-colors hover:text-[#F58220]",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-white/35",
							children: "|"
						}),
						/* @__PURE__ */ jsx(Link, {
							href: "/terms-conditions",
							className: "transition-colors hover:text-[#F58220]",
							children: "Terms of Service"
						})
					]
				})]
			})
		})]
	});
}
//#endregion
//#region resources/js/components/Navbar.tsx
var navItems = [
	{
		label: "About Us",
		href: "/about",
		hasDropdown: false
	},
	{
		label: "Shop By Product",
		href: "/list",
		hasDropdown: true
	},
	{
		label: "New Product",
		href: "/new-product",
		hasDropdown: false
	},
	{
		label: "Gallery",
		href: "/gallery",
		hasDropdown: false
	},
	{
		label: "Blog",
		href: "/blog",
		hasDropdown: false
	},
	{
		label: "Contact Us",
		href: "/contact",
		hasDropdown: false
	}
];
function AxeGearWordmark() {
	return /* @__PURE__ */ jsx("span", {
		className: "text-[28px] leading-none font-black tracking-[-0.08em] text-ink uppercase sm:text-[34px] lg:text-[42px]",
		children: "AxeGear"
	});
}
function Navbar({ cartCount = 0, collections = [], currentUrl = "/", isAuthenticated = false }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isShopOpen, setIsShopOpen] = useState(false);
	const cartBadge = cartCount > 99 ? "99+" : String(cartCount);
	const accountHref = isAuthenticated ? "/my-profile" : login.url();
	const [pathname] = currentUrl.split("?");
	const isActive = (href) => {
		if (href === "/list") return pathname === "/list";
		return pathname === href;
	};
	const closeMobileMenu = () => {
		setIsOpen(false);
		setIsShopOpen(false);
	};
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 border-b-2 border-ink bg-canvas",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex h-[72px] items-center justify-between px-5 sm:px-8 lg:h-[78px] lg:px-9",
				children: [
					/* @__PURE__ */ jsx(Link, {
						href: "/",
						"aria-label": "AxeGear home",
						className: "shrink-0 transition-opacity hover:opacity-80",
						children: /* @__PURE__ */ jsx(AxeGearWordmark, {})
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden items-stretch gap-5 text-[11px] leading-none font-extrabold tracking-[0.03em] text-ink uppercase md:flex lg:gap-8 lg:text-[13px]",
						children: navItems.map((item) => item.hasDropdown ? /* @__PURE__ */ jsxs("div", {
							className: "group relative flex items-stretch",
							children: [/* @__PURE__ */ jsxs(Link, {
								href: item.href,
								className: `flex items-center gap-1.5 py-7 transition-colors group-focus-within:text-primary group-hover:text-primary hover:text-primary ${isActive(item.href) ? "text-primary" : "text-ink"}`,
								children: [item.label, /* @__PURE__ */ jsx(ChevronDown, { className: "h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" })]
							}), /* @__PURE__ */ jsxs("div", {
								className: "invisible absolute top-full left-1/2 z-50 w-[280px] -translate-x-1/2 translate-y-2 border border-[#D9D9D9] bg-white p-3 opacity-0 shadow-[0_18px_42px_rgba(0,0,0,0.14)] transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
								children: [/* @__PURE__ */ jsx("p", {
									className: "border-b border-[#E5E5E5] px-3 py-2 text-[9px] font-bold tracking-[0.08em] text-[#707070] uppercase",
									children: "Featured Collections"
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-1 grid",
									children: collections.length > 0 ? collections.map((collection) => /* @__PURE__ */ jsxs(Link, {
										href: `/list?collection=${collection.slug}`,
										className: "flex items-center justify-between px-3 py-3 text-[12px] font-bold tracking-normal text-[#1A1A1A] normal-case hover:bg-[#FFF3E8] hover:text-[#F58220]",
										children: [collection.name, /* @__PURE__ */ jsx(ArrowMark, {})]
									}, collection.id)) : /* @__PURE__ */ jsxs(Link, {
										href: "/list",
										className: "flex items-center justify-between px-3 py-3 text-[12px] font-bold tracking-normal text-[#1A1A1A] normal-case hover:bg-[#FFF3E8] hover:text-[#F58220]",
										children: ["View All Products", /* @__PURE__ */ jsx(ArrowMark, {})]
									})
								})]
							})]
						}, item.label) : /* @__PURE__ */ jsx(Link, {
							href: item.href,
							className: `flex items-center py-7 transition-colors hover:text-primary ${isActive(item.href) ? "text-primary" : "text-ink"}`,
							children: item.label
						}, item.label))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 text-ink sm:gap-5",
						children: [
							/* @__PURE__ */ jsx(Link, {
								href: accountHref,
								"aria-label": isAuthenticated ? "Open account" : "Login account",
								className: "hidden size-10 items-center justify-center hover:text-primary sm:flex",
								children: /* @__PURE__ */ jsx(User, {
									size: 27,
									strokeWidth: 2.1
								})
							}),
							/* @__PURE__ */ jsxs(Link, {
								href: "/my-cart",
								"aria-label": "Open cart",
								className: "relative flex size-10 items-center justify-center hover:text-primary",
								children: [/* @__PURE__ */ jsx(ShoppingCart, {
									size: 29,
									strokeWidth: 2.2
								}), /* @__PURE__ */ jsx("span", {
									className: "absolute top-0 right-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] leading-none font-extrabold text-white",
									children: cartBadge
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": "Open menu",
								onClick: () => setIsOpen(true),
								className: "flex size-10 items-center justify-center hover:text-primary md:hidden",
								children: /* @__PURE__ */ jsx(Menu, {
									size: 29,
									strokeWidth: 2.2
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Close menu overlay",
				onClick: closeMobileMenu,
				className: `fixed inset-0 z-[70] bg-black/50 transition-opacity md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: `fixed top-0 right-0 bottom-0 z-[80] w-[min(88vw,380px)] border-l border-ink bg-canvas p-5 transition-transform md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-8 flex items-center justify-between border-b border-ink pb-5",
					children: [/* @__PURE__ */ jsx(AxeGearWordmark, {}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Close menu",
						onClick: closeMobileMenu,
						className: "flex size-10 items-center justify-center border border-hairline hover:border-ink hover:text-primary",
						children: /* @__PURE__ */ jsx(X, { size: 24 })
					})]
				}), /* @__PURE__ */ jsxs("nav", {
					className: "grid divide-y divide-hairline text-[15px] font-extrabold tracking-[0.03em] uppercase",
					children: [navItems.map((item) => item.hasDropdown ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center",
						children: [/* @__PURE__ */ jsx(Link, {
							href: item.href,
							onClick: closeMobileMenu,
							className: `flex-1 py-4 hover:text-primary ${isActive(item.href) ? "text-primary" : "text-ink"}`,
							children: item.label
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": "Toggle product collections",
							"aria-expanded": isShopOpen,
							onClick: () => setIsShopOpen((value) => !value),
							className: "flex size-12 items-center justify-center rounded-none hover:text-primary",
							children: /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 transition-transform ${isShopOpen ? "rotate-180" : ""}` })
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: `grid overflow-hidden transition-[grid-template-rows] ${isShopOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
						children: /* @__PURE__ */ jsx("div", {
							className: "min-h-0",
							children: /* @__PURE__ */ jsx("div", {
								className: "mb-3 grid border-l-2 border-[#F58220] bg-[#F8F8F8] px-4 py-2 text-[13px] tracking-normal normal-case",
								children: collections.length > 0 ? collections.map((collection) => /* @__PURE__ */ jsx(Link, {
									href: `/list?collection=${collection.slug}`,
									onClick: closeMobileMenu,
									className: "py-3 hover:text-primary",
									children: collection.name
								}, collection.id)) : /* @__PURE__ */ jsx(Link, {
									href: "/list",
									onClick: closeMobileMenu,
									className: "py-3 hover:text-primary",
									children: "View All Products"
								})
							})
						})
					})] }, item.label) : /* @__PURE__ */ jsx(Link, {
						href: item.href,
						onClick: closeMobileMenu,
						className: `py-4 hover:text-primary ${isActive(item.href) ? "text-primary" : "text-ink"}`,
						children: item.label
					}, item.label)), /* @__PURE__ */ jsx(Link, {
						href: accountHref,
						onClick: closeMobileMenu,
						className: "py-4 hover:text-primary",
						children: isAuthenticated ? "ACCOUNT" : "LOGIN"
					})]
				})]
			})
		]
	});
}
function ArrowMark() {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		className: "text-[#F58220]",
		children: "→"
	});
}
//#endregion
//#region resources/js/layouts/shop-layout.tsx
function ShopLayout({ children }) {
	const { url, props } = usePage();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink selection:bg-primary selection:text-white",
		children: [
			/* @__PURE__ */ jsx(Navbar, {
				cartCount: props.shop?.cart_count ?? 0,
				collections: props.shop?.featured_collections ?? [],
				currentUrl: url,
				isAuthenticated: Boolean(props.auth.user)
			}),
			/* @__PURE__ */ jsx("main", {
				className: "w-full flex-grow bg-canvas",
				children
			}),
			/* @__PURE__ */ jsx(Toaster, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { ShopLayout as t };

//# sourceMappingURL=shop-layout-CsqyMCOU.js.map