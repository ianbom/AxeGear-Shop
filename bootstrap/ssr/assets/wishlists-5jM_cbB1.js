import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as Pagination, c as Thumbnail, i as PageHeader, o as StatusBadge, s as TableShell } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
//#region resources/js/pages/admin/wishlists/index.tsx
function WishlistsIndex({ products, filters, categories, recent }) {
	const { data, setData, get, processing } = useForm({
		search: filters.search ?? "",
		category_id: filters.category_id ?? ""
	});
	const submit = (event) => {
		event.preventDefault();
		get("/admin/wishlists", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Wishlist Insights" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Marketing Insight",
			title: "Wishlist Insights",
			description: "Produk yang paling sering disimpan customer untuk insight campaign dan stok."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 xl:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ jsxs(TableShell, {
				title: "Favorite Products",
				description: `${products.total} produk memiliki wishlist`,
				children: [
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mb-4 grid gap-3 md:grid-cols-3",
						children: [
							/* @__PURE__ */ jsx(Input, {
								value: data.search,
								onChange: (event) => setData("search", event.target.value),
								placeholder: "Product or SKU..."
							}),
							/* @__PURE__ */ jsxs("select", {
								value: data.category_id,
								onChange: (event) => setData("category_id", event.target.value),
								className: "rounded-md border border-input bg-transparent px-3 py-2 text-sm",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "All categories"
								}), categories.map((category) => /* @__PURE__ */ jsx("option", {
									value: category.id,
									children: category.name
								}, category.id))]
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
										children: "Product"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "pr-4 pb-3 font-medium",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "pb-3 text-right font-medium",
										children: "Wishlist"
									})
								]
							}) }), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y",
								children: products.data.map((product, index) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-muted/40",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
											children: (products.from ?? 1) + index
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3 pr-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx(Thumbnail, {
													src: product.thumbnail,
													alt: product.name
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
													className: "font-medium text-primary underline",
													href: `/admin/products/${product.id}`,
													children: product.name
												}), /* @__PURE__ */ jsxs("div", {
													className: "text-xs text-muted-foreground",
													children: [
														product.sku ?? "-",
														" ",
														"·",
														" ",
														product.category ?? "-"
													]
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3 pr-4",
											children: /* @__PURE__ */ jsx(StatusBadge, { status: product.status })
										}),
										/* @__PURE__ */ jsx("td", {
											className: "py-3 text-right text-xl font-semibold",
											children: product.wishlists_count
										})
									]
								}, product.id))
							})]
						})
					}),
					/* @__PURE__ */ jsx(Pagination, { paginator: products })
				]
			}), /* @__PURE__ */ jsx(TableShell, {
				title: "Recent Wishlist",
				description: "Aktivitas terbaru",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid gap-3",
					children: recent.map((item) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border p-3 text-sm",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "font-medium",
								children: item.customer ?? "-"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-muted-foreground",
								children: item.product ?? "-"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: item.created_at ?? "-"
							})
						]
					}, item.id))
				})
			})]
		})]
	})] });
}
//#endregion
export { WishlistsIndex as default };

//# sourceMappingURL=wishlists-5jM_cbB1.js.map