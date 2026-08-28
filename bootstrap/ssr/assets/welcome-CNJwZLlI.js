import { o as list } from "./routes-EPw8WZ-p.js";
import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/welcome.tsx
var fallbackImage = "https://orcapowergear.com/_next/image?url=%2Fasset%2Fbanner%2Fwebbanner-orca.webp&w=3840&q=75";
var fallbackSlide = {
	id: 0,
	title: "AxeGear performance banner",
	subtitle: null,
	image_desktop_url: fallbackImage,
	image_mobile_url: null,
	button_text: null,
	button_url: null
};
function Welcome({ heroBanners = [], collectionBanners = [], collections = [] }) {
	const heroSlides = useMemo(() => heroBanners.filter((banner) => banner !== null), [heroBanners]);
	const performanceBanner = collectionBanners.find((banner) => banner !== null) ?? null;
	const tiles = collections.slice(0, 4);
	const slides = heroSlides.length > 0 ? heroSlides : [fallbackSlide];
	const [activeSlide, setActiveSlide] = useState(0);
	useEffect(() => {
		if (slides.length <= 1) return;
		const timer = window.setInterval(() => {
			setActiveSlide((current) => (current + 1) % slides.length);
		}, 5e3);
		return () => window.clearInterval(timer);
	}, [slides.length]);
	const goToSlide = (index) => {
		setActiveSlide((index + slides.length) % slides.length);
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "AxeGear" }), /* @__PURE__ */ jsxs("main", {
		className: "bg-white text-[#1A1A1A]",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative h-[100svh] overflow-hidden border-b-2 border-[#101010] bg-black sm:h-[105svh] lg:h-[110svh]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex h-full transition-transform duration-700 ease-out",
					style: { transform: `translateX(-${activeSlide * 100}%)` },
					children: slides.map((slide, index) => {
						const slideContent = /* @__PURE__ */ jsxs("picture", {
							className: "block h-full w-full",
							children: [/* @__PURE__ */ jsx("source", {
								media: "(max-width: 767px)",
								srcSet: slide.image_mobile_url ?? slide.image_desktop_url
							}), /* @__PURE__ */ jsx("img", {
								src: slide.image_desktop_url ?? slide.image_mobile_url ?? fallbackImage,
								alt: slide.title,
								className: "h-full w-full object-cover object-center",
								loading: index === 0 ? "eager" : "lazy",
								decoding: "async"
							})]
						});
						const className = `relative block h-full min-w-full ${slide.button_url ? "cursor-pointer" : ""}`;
						return slide.button_url ? /^https?:\/\//.test(slide.button_url) ? /* @__PURE__ */ jsx("a", {
							href: slide.button_url,
							className,
							children: slideContent
						}, `${slide.id}-${index}`) : /* @__PURE__ */ jsx(Link, {
							href: slide.button_url,
							className,
							children: slideContent
						}, `${slide.id}-${index}`) : /* @__PURE__ */ jsx("div", {
							className,
							children: slideContent
						}, `${slide.id}-${index}`);
					})
				}), slides.length > 1 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Previous slide",
					onClick: () => goToSlide(activeSlide - 1),
					className: "absolute top-1/2 left-3 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[8px] border border-white/70 bg-black/55 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-black sm:left-5",
					children: "«"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": "Next slide",
					onClick: () => goToSlide(activeSlide + 1),
					className: "absolute top-1/2 right-3 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-[8px] border border-white/70 bg-black/55 text-xl font-semibold text-white transition-colors hover:bg-white hover:text-black sm:right-5",
					children: "»"
				})] })]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "h-[100svh] overflow-hidden border-b-2 border-[#101010] bg-[#8fd6ff] sm:h-[105svh] lg:h-[110svh]",
				children: /* @__PURE__ */ jsxs("picture", {
					className: "block h-full w-full",
					children: [/* @__PURE__ */ jsx("source", {
						media: "(max-width: 767px)",
						srcSet: performanceBanner?.image_mobile_url ?? performanceBanner?.image_desktop_url ?? fallbackImage
					}), /* @__PURE__ */ jsx("img", {
						src: performanceBanner?.image_desktop_url ?? performanceBanner?.image_mobile_url ?? fallbackImage,
						alt: "AxeGear performance campaign",
						className: "h-full w-full object-cover object-center"
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b-2 border-[#1A1A1A] bg-white px-5 py-6 sm:px-8 lg:px-12 xl:px-16",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto grid max-w-[1600px] grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8 xl:gap-10",
					children: tiles.length > 0 && tiles.map((tile) => /* @__PURE__ */ jsxs(Link, {
						href: list.url({ query: { collection: tile.slug } }),
						"aria-label": tile.name,
						className: "group relative block h-[78svh] overflow-hidden bg-white lg:h-[100svh]",
						children: [/* @__PURE__ */ jsx("img", {
							src: tile.banner_mobile_url ?? fallbackImage,
							alt: tile.name,
							className: "h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]",
							loading: "lazy",
							decoding: "async"
						}), /* @__PURE__ */ jsx("div", {
							className: "absolute top-5 right-6 z-10 text-right text-[28px] leading-none font-semibold tracking-[-0.02em] text-white italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] lg:top-6 lg:right-7 lg:text-[20px]",
							children: tile.name
						})]
					}, tile.slug))
				})
			})
		]
	})] });
}
Welcome.layout = (page) => page;
//#endregion
export { Welcome as default };

//# sourceMappingURL=welcome-CNJwZLlI.js.map