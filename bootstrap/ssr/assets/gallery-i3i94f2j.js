import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
//#region resources/js/pages/gallery/index.tsx
var heroImage = "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&q=85&w=1800";
function Gallery({ categories, images }) {
	const [activeTab, setActiveTab] = useState("All");
	const visibleImages = useMemo(() => activeTab === "All" ? images : images.filter((image) => image.categories.some((category) => category.name === activeTab)), [activeTab, images]);
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, {
		title: "AxeGear Gallery",
		children: /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures."
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "bg-white text-[14px] text-[#1A1A1A]",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative h-[320px] overflow-hidden sm:h-[340px]",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: heroImage,
						alt: "Mountain cyclist riding across a rocky trail",
						className: "absolute inset-0 h-full w-full object-cover object-[65%_45%]"
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" }),
					/* @__PURE__ */ jsx("div", {
						className: "relative mx-auto flex h-full max-w-[1640px] items-center px-7 py-9 sm:px-11 lg:px-[76px]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "max-w-[390px]",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase",
									children: [/* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-[#F58220]" }), "Visual Showcase"]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]",
									children: "AxeGear Gallery"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-[420px] text-[16px] leading-[1.5]",
									children: "Explore the visual world of AxeGear through performance-driven product imagery, athlete moments, gear details, and lifestyle captures."
								}),
								/* @__PURE__ */ jsxs(Link, {
									href: "/list",
									className: "mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]",
									children: ["View Latest Collection ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-label": "Gallery categories",
				className: "border-b border-[#D9D9D9]",
				children: /* @__PURE__ */ jsx("div", {
					className: "scrollbar-hide flex overflow-x-auto px-5 sm:px-7",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto flex min-w-max items-center gap-7 sm:gap-10 md:gap-[52px]",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							"aria-pressed": activeTab === "All",
							onClick: () => setActiveTab("All"),
							className: `relative rounded-none px-0 py-5 text-[13px] leading-none font-semibold whitespace-nowrap ${activeTab === "All" ? "text-[#F58220]" : "text-[#171717] hover:text-[#F58220]"}`,
							children: ["All", activeTab === "All" && /* @__PURE__ */ jsx("span", { className: "absolute right-[-12px] bottom-0 left-[-12px] h-px bg-[#F58220]" })]
						}), categories.map((category) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							"aria-pressed": activeTab === category.name,
							onClick: () => setActiveTab(category.name),
							className: `relative rounded-none px-0 py-5 text-[13px] leading-none font-semibold whitespace-nowrap ${activeTab === category.name ? "text-[#F58220]" : "text-[#171717] hover:text-[#F58220]"}`,
							children: [category.name, activeTab === category.name && /* @__PURE__ */ jsx("span", { className: "absolute right-[-12px] bottom-0 left-[-12px] h-px bg-[#F58220]" })]
						}, category.id))]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "px-4 py-10 sm:px-7 sm:py-14",
				children: visibleImages.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "grid grid-flow-dense auto-rows-[165px] grid-cols-2 gap-2 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-3",
					children: visibleImages.map((image, index) => /* @__PURE__ */ jsx("div", {
						className: `overflow-hidden bg-[#F1F1F1] ${index === 0 || index === 8 ? "row-span-2" : index === 2 || index === 3 || index === 7 || index === 10 || index === 13 || index === 15 ? "col-span-2" : ""}`,
						children: /* @__PURE__ */ jsx("img", {
							src: image.image_url,
							alt: image.alt_text,
							className: "h-full w-full object-cover"
						})
					}, image.id))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "border border-[#D9D9D9] px-6 py-16 text-center",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-black uppercase",
						children: "No gallery images"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-[#666666]",
						children: "This category does not have any active images yet."
					})]
				})
			})
		]
	})] });
}
//#endregion
export { Gallery as default };

//# sourceMappingURL=gallery-i3i94f2j.js.map