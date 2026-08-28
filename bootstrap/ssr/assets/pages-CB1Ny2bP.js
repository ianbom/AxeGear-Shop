import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, i as PageHeader, s as TableShell, t as ActiveBadge } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/pages/index.tsx
function PagesIndex({ pages, filters, types }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		type: filters.type ?? "",
		is_active: filters.is_active ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/pages", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Pages" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: "Pages",
			description: "Kelola halaman statis, policy, FAQ, SEO title, dan status publikasi.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/pages/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Create Page"]
				})
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Static Pages",
			description: `${pages.total} page tersimpan`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Title or slug..."
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.type,
							onChange: (event) => setData("type", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "All type"
							}), types.map((type) => /* @__PURE__ */ jsx("option", {
								value: type,
								children: type
							}, type))]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.is_active,
							onChange: (event) => setData("is_active", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All status"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "active",
									children: "Active"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "inactive",
									children: "Inactive"
								})
							]
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "submit",
							variant: "outline",
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
									className: "w-14 pr-4 pb-3 font-medium",
									children: "No"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Page"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "SEO"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Updated"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pb-3 text-right font-medium",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y",
							children: pages.data.map((page, index) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
										children: (pages.from ?? 1) + index
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "py-3 pr-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "font-medium",
											children: page.title
										}), /* @__PURE__ */ jsxs("div", {
											className: "text-xs text-muted-foreground",
											children: ["/", page.slug]
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: page.type
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: page.meta_title ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(ActiveBadge, { active: page.is_active })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: page.updated_at ?? "-"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex justify-end gap-2",
											children: [
												/* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/${page.slug}`,
														children: [/* @__PURE__ */ jsx(Eye, {}), " Preview"]
													})
												}),
												/* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/admin/pages/${page.id}/edit`,
														children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
													})
												}),
												/* @__PURE__ */ jsx(Button, {
													asChild: true,
													size: "sm",
													variant: "outline",
													children: /* @__PURE__ */ jsxs(Link, {
														href: `/admin/pages/${page.id}`,
														method: "delete",
														as: "button",
														children: [/* @__PURE__ */ jsx(Trash2, {}), " Delete"]
													})
												})
											]
										})
									})
								]
							}, page.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: pages })
			]
		})]
	})] });
}
//#endregion
export { PagesIndex as default };

//# sourceMappingURL=pages-CB1Ny2bP.js.map