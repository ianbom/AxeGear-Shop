import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, c as Thumbnail, i as PageHeader, s as TableShell, t as ActiveBadge } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/banners/index.tsx
function BannersIndex({ banners, filters, placements }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		placement: filters.placement ?? "",
		is_active: filters.is_active ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/banners", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Banners" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: "Banners",
			description: "Atur banner homepage, collection, dan promo berdasarkan status aktif.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/banners/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Create Banner"]
				})
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Banner List",
			description: `${banners.total} banner terdaftar`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-4 grid gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Title or subtitle..."
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.placement,
							onChange: (event) => setData("placement", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "All placement"
							}), placements.map((placement) => /* @__PURE__ */ jsx("option", {
								value: placement,
								children: placement
							}, placement))]
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
									children: "Banner"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Placement"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Sort"
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
							children: banners.data.map((banner, index) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
										children: (banners.from ?? 1) + index
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx(Thumbnail, {
												src: banner.image_desktop_url,
												alt: banner.title
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
												className: "font-medium",
												children: banner.title
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: banner.subtitle ?? "-"
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: banner.placement
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: banner.sort_order
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(ActiveBadge, { active: banner.is_active })
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												children: /* @__PURE__ */ jsxs(Link, {
													href: `/admin/banners/${banner.id}/edit`,
													children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
												})
											}), /* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												children: /* @__PURE__ */ jsxs(Link, {
													href: `/admin/banners/${banner.id}`,
													method: "delete",
													as: "button",
													children: [/* @__PURE__ */ jsx(Trash2, {}), " Delete"]
												})
											})]
										})
									})
								]
							}, banner.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: banners })
			]
		})]
	})] });
}
//#endregion
export { BannersIndex as default };

//# sourceMappingURL=banners-Dds4xBtA.js.map