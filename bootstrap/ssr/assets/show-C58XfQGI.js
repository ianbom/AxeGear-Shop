import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Quote, Share2, UserRound } from "lucide-react";
//#region resources/js/pages/blog/show.tsx
function BlogShow({ article, relatedArticles }) {
	const [copied, setCopied] = useState(false);
	const shareArticle = async () => {
		const shareData = {
			title: article.title,
			text: article.excerpt,
			url: window.location.href
		};
		const nativeShare = Reflect.get(navigator, "share");
		if (nativeShare) {
			await nativeShare.call(navigator, shareData).catch(() => void 0);
			return;
		}
		await navigator.clipboard.writeText(shareData.url);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, {
		title: `${article.title} | AxeGear Journal`,
		children: /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: article.excerpt
		})
	}), /* @__PURE__ */ jsxs("article", {
		className: "bg-white text-[#171717]",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "mx-auto max-w-[1180px] px-6 pt-10 pb-8 sm:px-10 lg:pt-14",
				children: [/* @__PURE__ */ jsxs("nav", {
					className: "flex flex-wrap items-center gap-2 text-[13px] text-[#777777]",
					children: [
						/* @__PURE__ */ jsx(Link, {
							href: "/",
							children: "Home"
						}),
						/* @__PURE__ */ jsx("span", { children: "/" }),
						/* @__PURE__ */ jsx(Link, {
							href: "/blog",
							children: "Blog"
						}),
						/* @__PURE__ */ jsx("span", { children: "/" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-[#F58220]",
							children: article.category
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-9 max-w-[960px]",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[13px] font-bold tracking-[0.05em] text-[#F58220] uppercase",
							children: article.category
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-3 text-[40px] leading-[1.04] font-black tracking-[-0.035em] sm:text-[56px] lg:text-[68px]",
							children: article.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-[780px] text-[18px] leading-[1.6] text-[#555555]",
							children: article.excerpt
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-7 flex flex-wrap items-center gap-5 text-[13px] text-[#666666]",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4 text-[#F58220]" }), article.published_at ?? "Draft"]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4 text-[#F58220]" }),
										article.reading_minutes,
										" min read"
									]
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(UserRound, { className: "h-4 w-4 text-[#F58220]" }), article.author_name]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: shareArticle,
									className: "inline-flex items-center gap-2 font-semibold text-[#171717]",
									children: [/* @__PURE__ */ jsx(Share2, { className: "h-4 w-4 text-[#F58220]" }), copied ? "Link Copied" : "Share Article"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1180px] px-6 sm:px-10",
				children: /* @__PURE__ */ jsx("img", {
					src: article.image_url,
					alt: article.title,
					className: "aspect-[1.9/1] w-full object-cover"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1180px] gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,780px)_220px] lg:gap-20 lg:py-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-[18px] leading-[1.85] text-[#3F3F3F]",
					children: [
						/* @__PURE__ */ jsx("p", { children: article.intro }),
						article.sections.map((section) => /* @__PURE__ */ jsxs("section", {
							className: "mt-12",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-[30px] leading-tight font-black text-[#171717]",
								children: section.heading
							}), section.paragraphs.map((paragraph) => /* @__PURE__ */ jsx("p", {
								className: "mt-5",
								children: paragraph
							}, paragraph))]
						}, section.heading)),
						article.quote && /* @__PURE__ */ jsxs("blockquote", {
							className: "my-12 border-y border-[#D8D8D8] py-8 text-[26px] leading-[1.35] font-black text-[#171717]",
							children: [
								/* @__PURE__ */ jsx(Quote, { className: "mb-4 h-8 w-8 text-[#F58220]" }),
								"“",
								article.quote,
								"”"
							]
						}),
						article.tips.length > 0 && /* @__PURE__ */ jsxs("section", {
							className: "mt-12",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-[30px] font-black text-[#171717]",
								children: "Before Your Next Session"
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-6 grid gap-4",
								children: article.tips.map((tip) => /* @__PURE__ */ jsxs("li", {
									className: "flex gap-4",
									children: [/* @__PURE__ */ jsx(Check, { className: "mt-1 h-5 w-5 shrink-0 text-[#F58220]" }), tip]
								}, tip))
							})]
						}),
						article.conclusion && /* @__PURE__ */ jsxs("section", {
							className: "mt-12",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-[30px] font-black text-[#171717]",
								children: "Final Takeaway"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-5",
								children: article.conclusion
							})]
						})
					]
				}), /* @__PURE__ */ jsx("aside", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ jsx("p", {
						className: "sticky top-24 border-l-2 border-[#F58220] pl-4 text-[12px] font-bold tracking-[0.06em] uppercase",
						children: "AxeGear Journal"
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-t border-[#D8D8D8] bg-[#F7F7F7] px-6 py-12 sm:px-10 lg:py-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1180px]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-end justify-between gap-5",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-[12px] font-bold text-[#F58220] uppercase",
								children: "Continue Reading"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-[32px] font-black",
								children: "Related Articles"
							})] }), /* @__PURE__ */ jsxs(Link, {
								href: "/blog",
								className: "hidden items-center gap-2 text-[13px] font-semibold sm:inline-flex",
								children: ["View All Stories ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-7 grid gap-6 md:grid-cols-3",
							children: relatedArticles.map((related) => /* @__PURE__ */ jsxs("article", {
								className: "bg-white",
								children: [/* @__PURE__ */ jsx(Link, {
									href: `/blog/${related.slug}`,
									children: /* @__PURE__ */ jsx("img", {
										src: related.image_url,
										alt: related.title,
										className: "aspect-[1.55/1] w-full object-cover"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-5",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-[11px] font-bold text-[#F58220] uppercase",
											children: related.category
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "mt-2 text-[17px] leading-[1.3] font-semibold",
											children: /* @__PURE__ */ jsx(Link, {
												href: `/blog/${related.slug}`,
												children: related.title
											})
										}),
										/* @__PURE__ */ jsxs(Link, {
											href: `/blog/${related.slug}`,
											className: "mt-4 inline-flex items-center gap-2 text-[12px] font-semibold",
											children: ["Read Article ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-[#F58220]" })]
										})
									]
								})]
							}, related.id))
						}),
						/* @__PURE__ */ jsxs(Link, {
							href: "/blog",
							className: "mt-10 inline-flex items-center gap-3 text-[13px] font-bold uppercase",
							children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 text-[#F58220]" }), " Back to Blog"]
						})
					]
				})
			})
		]
	})] });
}
//#endregion
export { BlogShow as default };

//# sourceMappingURL=show-C58XfQGI.js.map