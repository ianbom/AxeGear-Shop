import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, c as Thumbnail, i as PageHeader, s as TableShell, t as ActiveBadge } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/blogs/index.tsx
function BlogIndex({ articles, categories, filters }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		category: filters.category ?? "",
		status: filters.status ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/blogs", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Blog Articles" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: "Blog Articles",
			description: "Kelola artikel, kategori, gambar, dan status publikasi AxeGear Journal.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/blogs/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Create Article"]
				})
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Articles",
			description: `${articles.total} artikel tercatat`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-5 grid gap-3 md:grid-cols-[1fr_220px_180px_auto]",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Search title or slug"
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.category,
							onChange: (event) => setData("category", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "All Categories"
							}), categories.map((category) => /* @__PURE__ */ jsx("option", { children: category }, category))]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.status,
							onChange: (event) => setData("status", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All Statuses"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "published",
									children: "Published"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "draft",
									children: "Draft"
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Search, {}), " Filter"]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b text-left text-muted-foreground",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Article"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Category"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Published"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pb-3 text-right font-medium",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y",
							children: articles.data.map((article) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx(Thumbnail, {
												src: article.image_url,
												alt: article.title
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
												className: "font-medium",
												children: article.title
											}), /* @__PURE__ */ jsxs("div", {
												className: "text-xs text-muted-foreground",
												children: ["/", article.slug]
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: article.category
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: article.published_at ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(ActiveBadge, { active: article.is_published })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex justify-end gap-2",
											children: [
												article.is_published && /* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/blog/${article.slug}`,
														children: [/* @__PURE__ */ jsx(Eye, {}), " Preview"]
													})
												}),
												/* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/admin/blogs/${article.id}/edit`,
														children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
													})
												}),
												/* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/admin/blogs/${article.id}`,
														method: "delete",
														as: "button",
														children: [/* @__PURE__ */ jsx(Trash2, {}), " Delete"]
													})
												})
											]
										})
									})
								]
							}, article.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: articles })
			]
		})]
	})] });
}
//#endregion
export { BlogIndex as default };

//# sourceMappingURL=blogs-D45BQQIQ.js.map