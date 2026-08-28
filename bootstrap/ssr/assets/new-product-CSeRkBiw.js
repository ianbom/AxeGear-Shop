import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
//#region resources/js/pages/new-product/index.tsx
function NewProductPage({ page, gallery }) {
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, {
		title: page.product_name,
		children: /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: page.hero_description
		})
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-white text-[#111111]",
		children: [
			/* @__PURE__ */ jsx(HeroSection, { page }),
			/* @__PURE__ */ jsx(StorySection, { page }),
			/* @__PURE__ */ jsx(GallerySection, {
				heading: page.gallery_heading,
				gallery
			})
		]
	})] });
}
function HeroSection({ page }) {
	return /* @__PURE__ */ jsx("section", {
		className: "overflow-hidden border-b border-[#E8E8E8] bg-[radial-gradient(circle_at_67%_55%,#fff4e8_0%,#ffffff_38%,#f7f7f7_100%)]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid min-h-[620px] max-w-[1600px] items-center gap-8 px-6 py-14 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-14 lg:py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 max-w-[520px]",
				children: [
					/* @__PURE__ */ jsx(SectionLabel, { children: page.hero_eyebrow }),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-6 text-[54px] leading-[0.84] font-black tracking-[-0.045em] uppercase sm:text-[70px] xl:text-[86px]",
						children: /* @__PURE__ */ jsx(Lines, { value: page.hero_title })
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-7 text-[25px] leading-none font-black tracking-[0.02em] uppercase",
						children: page.product_name
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 max-w-[390px] text-[16px] leading-7 text-[#333333]",
						children: page.hero_description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-7 flex items-center gap-5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[24px] font-black",
							children: page.price_label
						}), /* @__PURE__ */ jsx("span", {
							className: "bg-[#F15A24] px-2.5 py-1 text-[11px] font-black text-white uppercase",
							children: "New"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-7 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ jsxs("a", {
							href: page.shop_now_url,
							className: "inline-flex h-14 items-center justify-center gap-5 bg-[#F15A24] px-9 text-[13px] font-black text-white uppercase hover:bg-[#D94813]",
							children: [
								page.shop_now_text,
								" ",
								/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
							]
						}), /* @__PURE__ */ jsx("a", {
							href: "#closer-look",
							className: "inline-flex h-14 items-center justify-center border border-[#111111] bg-white px-9 text-[13px] font-black uppercase hover:bg-[#111111] hover:text-white",
							children: page.specifications_text
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative min-h-[360px] lg:min-h-[500px]",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-x-[8%] bottom-[8%] h-[28%] rounded-[50%] bg-[#F15A24]/10 blur-3xl" }), /* @__PURE__ */ jsx("img", {
					src: page.hero_image_url,
					alt: page.product_name,
					className: "absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
				})]
			})]
		})
	});
}
function StorySection({ page }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "grid border-b border-[#E8E8E8] lg:grid-cols-[0.82fr_1.18fr]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex items-center px-6 py-12 md:px-10 lg:px-14 lg:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[520px] lg:mx-0",
				children: [
					/* @__PURE__ */ jsx(SectionLabel, { children: page.story_eyebrow }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-[48px] leading-[0.88] font-black tracking-[-0.035em] uppercase md:text-[64px]",
						children: /* @__PURE__ */ jsx(Lines, { value: page.story_title })
					}),
					page.story_body.split(/\n\s*\n/).map((paragraph, index) => /* @__PURE__ */ jsx("p", {
						className: "mt-5 text-[16px] leading-7 text-[#333333]",
						children: paragraph
					}, index))
				]
			})
		}), /* @__PURE__ */ jsx("img", {
			src: page.story_image_url,
			alt: page.story_title,
			className: "h-full min-h-[480px] w-full object-cover",
			loading: "lazy"
		})]
	});
}
function GallerySection({ heading, gallery }) {
	return /* @__PURE__ */ jsx("section", {
		id: "closer-look",
		className: "scroll-mt-24 border-b border-[#E8E8E8] px-5 py-12 md:px-10 lg:px-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1500px]",
			children: [/* @__PURE__ */ jsx(CenteredHeading, { children: heading }), /* @__PURE__ */ jsx("div", {
				className: "mt-8 grid auto-rows-[210px] grid-cols-2 gap-3 lg:auto-rows-[275px] lg:grid-cols-6",
				children: gallery.map((image, index) => /* @__PURE__ */ jsx("div", {
					className: `overflow-hidden bg-[#F1F1F1] ${index < 3 ? "col-span-2" : index === 3 || index === 6 ? "col-span-2 lg:col-span-1" : "col-span-1"}`,
					children: /* @__PURE__ */ jsx("img", {
						src: image.src,
						alt: image.alt ?? "",
						className: "h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]",
						loading: "lazy"
					})
				}, `${image.src}-${index}`))
			})]
		})
	});
}
function Lines({ value }) {
	const lines = value.split("\n");
	return /* @__PURE__ */ jsx(Fragment, { children: lines.map((line, index) => /* @__PURE__ */ jsxs("span", { children: [line, index < lines.length - 1 ? /* @__PURE__ */ jsx("br", {}) : null] }, `${line}-${index}`)) });
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-4 text-[12px] font-black tracking-[0.04em] text-[#F15A24] uppercase",
		children: [/* @__PURE__ */ jsx("span", { className: "h-[2px] w-7 bg-[#F15A24]" }), children]
	});
}
function CenteredHeading({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center gap-4 text-center text-[14px] font-black uppercase",
		children: [/* @__PURE__ */ jsx("span", { className: "h-[2px] w-7 bg-[#F15A24]" }), /* @__PURE__ */ jsx("h2", { children })]
	});
}
//#endregion
export { NewProductPage as default };

//# sourceMappingURL=new-product-CSeRkBiw.js.map