import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, c as Thumbnail, i as PageHeader, s as TableShell, t as ActiveBadge } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
//#region resources/js/pages/admin/gallery/index.tsx
function GalleryIndex({ images, categories, filters }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		category: filters.category ?? "",
		is_active: filters.is_active ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/gallery", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Gallery" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: "Gallery",
			description: "Kelola gambar, kategori, urutan, dan visibilitas gallery customer.",
			action: /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/gallery/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), " Add Image"]
				})
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Gallery Images",
			description: `${images.total} gambar tercatat`,
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mb-5 grid gap-3 md:grid-cols-[1fr_220px_180px_auto]",
					children: [
						/* @__PURE__ */ jsx(Input, {
							value: data.search,
							onChange: (event) => setData("search", event.target.value),
							placeholder: "Search alt text"
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.category,
							onChange: (event) => setData("category", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 text-sm",
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "All Categories"
							}), categories.map((category) => /* @__PURE__ */ jsx("option", {
								value: category.id,
								children: category.name
							}, category.id))]
						}),
						/* @__PURE__ */ jsxs("select", {
							value: data.is_active,
							onChange: (event) => setData("is_active", event.target.value),
							className: "rounded-md border border-input bg-transparent px-3 text-sm",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All Statuses"
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
									children: "Image"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Categories"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "pr-4 pb-3 font-medium",
									children: "Order"
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
							children: images.data.map((image) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-muted/40",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx(Thumbnail, {
												src: image.image_url,
												alt: image.alt_text ?? ""
											}), /* @__PURE__ */ jsx("span", {
												className: "max-w-72 truncate",
												children: image.alt_text ?? "-"
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: image.categories.join(", ")
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: image.sort_order
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ jsx(ActiveBadge, { active: image.is_active })
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
													href: `/admin/gallery/${image.id}/edit`,
													children: [/* @__PURE__ */ jsx(Edit, {}), " Edit"]
												})
											}), /* @__PURE__ */ jsx(Button, {
												asChild: true,
												size: "sm",
												variant: "outline",
												children: /* @__PURE__ */ jsxs(Link, {
													href: `/admin/gallery/${image.id}`,
													method: "delete",
													as: "button",
													children: [/* @__PURE__ */ jsx(Trash2, {}), " Delete"]
												})
											})]
										})
									})
								]
							}, image.id))
						})]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: images })
			]
		})]
	})] });
}
//#endregion
export { GalleryIndex as default };

//# sourceMappingURL=gallery-0pX8_7jj.js.map