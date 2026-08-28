import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Search } from "lucide-react";
//#region resources/js/pages/blog/index.tsx
var heroImage = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=88&w=1800";
function Blog({ articles, categories, filters }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search,
		category: filters.category,
		sort: filters.sort
	});
	const submit = (event) => {
		event.preventDefault();
		get("/blog", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, {
		title: "AxeGear Journal",
		children: /* @__PURE__ */ jsx("meta", {
			name: "description",
			content: "AxeGear athlete stories, performance technology, product guides, and riding tips."
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "bg-white text-[14px] text-[#111111]",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "relative h-[320px] overflow-hidden sm:h-[340px]",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: heroImage,
					alt: "AxeGear cyclist riding through mountain terrain",
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
								children: [/* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-[#F58220]" }), "AxeGear Journal"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]",
								children: [
									"Stories Built",
									/* @__PURE__ */ jsx("br", {}),
									"for Performance"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 max-w-[420px] text-[16px] leading-[1.5]",
								children: "Discover athlete stories, gear guides, product technology, riding tips, and the latest news from the world of AxeGear."
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "#articles",
								className: "mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]",
								children: ["Explore Latest Stories ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ jsx("main", {
			id: "articles",
			className: "mx-auto max-w-[1640px] px-5 py-4 sm:px-11 lg:px-[60px]",
			children: /* @__PURE__ */ jsxs("section", {
				className: "py-8",
				children: [
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "grid gap-4 md:grid-cols-[1fr_220px_180px_auto]",
						children: [
							/* @__PURE__ */ jsxs("label", {
								className: "flex h-12 items-center border border-[#D4D4D4] px-4",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "sr-only",
										children: "Search articles"
									}),
									/* @__PURE__ */ jsx(Search, { className: "mr-3 h-5 w-5 text-[#777777]" }),
									/* @__PURE__ */ jsx("input", {
										value: data.search,
										onChange: (event) => setData("search", event.target.value),
										placeholder: "Search articles, guides, and stories",
										className: "w-full bg-transparent outline-none"
									})
								]
							}),
							/* @__PURE__ */ jsxs("select", {
								value: data.category,
								onChange: (event) => setData("category", event.target.value),
								className: "h-12 border border-[#D4D4D4] bg-white px-4 outline-none",
								children: [/* @__PURE__ */ jsx("option", { children: "All Stories" }), categories.map((category) => /* @__PURE__ */ jsx("option", { children: category }, category))]
							}),
							/* @__PURE__ */ jsxs("select", {
								value: data.sort,
								onChange: (event) => setData("sort", event.target.value),
								className: "h-12 border border-[#D4D4D4] bg-white px-4 outline-none",
								children: [/* @__PURE__ */ jsx("option", {
									value: "latest",
									children: "Latest First"
								}), /* @__PURE__ */ jsx("option", {
									value: "oldest",
									children: "Oldest First"
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "h-12 bg-[#F58220] px-6 font-bold text-white uppercase disabled:opacity-50",
								children: "Apply"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex items-end justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-[12px] font-bold tracking-[0.05em] text-[#F58220] uppercase",
							children: "AxeGear Journal"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-2 text-[30px] font-black sm:text-[38px]",
							children: "Latest Articles"
						})] }), /* @__PURE__ */ jsxs("p", {
							className: "text-[13px] text-[#666666]",
							children: [articles.total, " stories"]
						})]
					}),
					articles.data.length > 0 ? /* @__PURE__ */ jsx("div", {
						className: "mt-7 grid gap-6 md:grid-cols-2",
						children: articles.data.map((article) => /* @__PURE__ */ jsx(ArticleCard, { article }, article.id))
					}) : /* @__PURE__ */ jsxs("div", {
						className: "mt-7 border border-[#DEDEDE] px-6 py-16 text-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-black uppercase",
							children: "No stories found"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2 text-sm text-[#666666]",
							children: "Try another keyword or category."
						})]
					}),
					articles.last_page > 1 && /* @__PURE__ */ jsx("nav", {
						className: "mt-8 flex items-center justify-center gap-2 text-[14px]",
						"aria-label": "Blog pagination",
						children: articles.links.map((link, index) => link.url ? /* @__PURE__ */ jsx(Link, {
							href: link.url,
							preserveState: true,
							className: `inline-flex h-10 min-w-10 items-center justify-center border px-3 ${link.active ? "border-[#F58220] bg-[#F58220] text-white" : "border-[#D4D4D4]"}`,
							children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } })
						}, index) : /* @__PURE__ */ jsx("span", {
							className: "inline-flex h-10 min-w-10 items-center justify-center px-3 text-[#999999]",
							children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } })
						}, index))
					})
				]
			})
		})]
	})] });
}
function ArticleCard({ article }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "border border-[#DEDEDE] bg-white",
		children: [/* @__PURE__ */ jsx(Link, {
			href: `/blog/${article.slug}`,
			"aria-label": `Read ${article.title}`,
			children: /* @__PURE__ */ jsx("img", {
				src: article.image_url,
				alt: article.title,
				className: "aspect-[1.9/1] w-full object-cover"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[12px] font-bold tracking-[0.03em] text-[#F58220] uppercase",
					children: article.category
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-2 text-[20px] leading-[1.25] font-semibold",
					children: /* @__PURE__ */ jsx(Link, {
						href: `/blog/${article.slug}`,
						children: article.title
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-4 text-[12px] text-[#555555]",
					children: [
						article.published_at ?? "Draft",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "px-1",
							children: "•"
						}),
						article.reading_minutes,
						" min read ",
						/* @__PURE__ */ jsx("span", {
							className: "px-1",
							children: "•"
						}),
						article.author_name
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 line-clamp-3 text-sm leading-6 text-[#555555]",
					children: article.excerpt
				}),
				/* @__PURE__ */ jsxs(Link, {
					href: `/blog/${article.slug}`,
					className: "mt-4 inline-flex items-center gap-2 text-[13px] font-semibold",
					children: ["Read More ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-[#F58220]" })]
				})
			]
		})]
	});
}
//#endregion
export { Blog as default };

//# sourceMappingURL=blog-33oL8Qx4.js.map