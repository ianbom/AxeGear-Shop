import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ImageIcon, Save, Upload, X } from "lucide-react";
//#region resources/js/pages/admin/product-variants/form.tsx
var formatPrice = (price) => price === null ? "—" : new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(Number(price));
function ProductVariantForm({ mode, variant, products, selectedProductId }) {
	const isEdit = mode === "edit" && variant !== null;
	const fileInputRef = useRef(null);
	const [preview, setPreview] = useState(variant?.image_url ?? null);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		product_id: variant?.product_id ?? selectedProductId ?? "",
		sku: variant?.sku ?? "",
		variant_name: variant?.variant_name ?? "Default Title",
		color_name: variant?.color_name ?? "",
		color_hex: variant?.color_hex ?? "",
		size: variant?.size ?? "",
		package_type: variant?.package_type ?? "",
		regular_price: variant?.regular_price ?? "",
		sale_price: variant?.sale_price ?? "",
		stock: variant?.stock ?? 0,
		reserved_stock: variant?.reserved_stock ?? 0,
		weight: variant?.weight ?? "",
		length: variant?.length ?? "",
		width: variant?.width ?? "",
		height: variant?.height ?? "",
		image: null,
		is_active: variant?.is_active ?? true
	});
	const selectedProduct = products.find((product) => String(product.id) === String(data.product_id)) ?? null;
	const handleFileChange = (event) => {
		const file = event.target.files?.[0] ?? null;
		setData("image", file);
		if (file) setPreview(URL.createObjectURL(file));
	};
	const clearImage = () => {
		setData("image", null);
		setPreview(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/product-variants/${variant.id}` : "/admin/product-variants", { forceFormData: true });
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Variant" : "Create Variant" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Catalog Management",
			title: isEdit ? "Edit Variant" : "Create Variant",
			description: "SKU varian unik, stok tidak negatif, dan reserved stock tidak boleh lebih besar dari stok."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]",
			children: [/* @__PURE__ */ jsxs(Card, {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Variant Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Perubahan stok melalui form ini tetap dicatat ke stock logs." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "flex flex-col gap-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 md:grid-cols-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "product_id",
											children: "Product"
										}),
										/* @__PURE__ */ jsxs(Select, {
											value: data.product_id === "" ? void 0 : String(data.product_id),
											onValueChange: (value) => setData("product_id", value),
											children: [/* @__PURE__ */ jsx(SelectTrigger, {
												id: "product_id",
												className: "w-full min-w-0",
												"aria-invalid": Boolean(errors.product_id),
												children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select product" })
											}), /* @__PURE__ */ jsx(SelectContent, {
												className: "w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]",
												children: products.map((product) => /* @__PURE__ */ jsx(SelectItem, {
													value: String(product.id),
													className: "min-w-0",
													children: /* @__PURE__ */ jsx("span", {
														className: "block max-w-full truncate",
														children: product.name
													})
												}, product.id))
											})]
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.product_id })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "sku",
											children: "SKU"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "sku",
											value: data.sku,
											placeholder: "e.g. AXG-HYD-END-BLK-2L",
											onChange: (event) => setData("sku", event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.sku })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "variant_name",
											children: "Variant Name"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "variant_name",
											value: data.variant_name,
											placeholder: "Black / 2L",
											onChange: (event) => setData("variant_name", event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.variant_name })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "color_name",
										children: "Color Name"
									}), /* @__PURE__ */ jsx(Input, {
										id: "color_name",
										value: data.color_name,
										placeholder: "e.g. Black, Olive, Sand",
										onChange: (event) => setData("color_name", event.target.value)
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "color_hex",
											children: "Color Hex"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(Input, {
												id: "color_hex",
												type: "color",
												value: data.color_hex || "#000000",
												onChange: (event) => setData("color_hex", event.target.value),
												className: "h-9 w-14 p-1"
											}), /* @__PURE__ */ jsx(Input, {
												value: data.color_hex || "#000000",
												placeholder: "#000000",
												readOnly: true,
												className: "font-mono text-xs"
											})]
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.color_hex })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "size",
										children: "Size"
									}), /* @__PURE__ */ jsx(Input, {
										id: "size",
										value: data.size,
										placeholder: "e.g. 2L, 5L, 10L",
										onChange: (event) => setData("size", event.target.value)
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "package_type",
											children: "Package Type"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "package_type",
											value: data.package_type,
											placeholder: "Hydropack, Sling Bag, Waist Bag",
											onChange: (event) => setData("package_type", event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.package_type })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "regular_price",
											children: "Regular Price"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "regular_price",
											type: "number",
											min: "0",
											value: data.regular_price,
											placeholder: "0",
											onChange: (event) => setData("regular_price", event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.regular_price })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "sale_price",
											children: "Sale Price"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "sale_price",
											type: "number",
											min: "0",
											value: data.sale_price,
											placeholder: "Leave empty for no sale",
											onChange: (event) => setData("sale_price", event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.sale_price })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "stock",
											children: "Stock"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "stock",
											type: "number",
											min: "0",
											value: data.stock,
											placeholder: "0",
											onChange: (event) => setData("stock", Number(event.target.value))
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.stock })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: "reserved_stock",
											children: "Reserved Stock"
										}),
										/* @__PURE__ */ jsx(Input, {
											id: "reserved_stock",
											type: "number",
											min: "0",
											value: data.reserved_stock,
											placeholder: "0",
											onChange: (event) => setData("reserved_stock", Number(event.target.value))
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors.reserved_stock })
									]
								}),
								[
									"weight",
									"length",
									"width",
									"height"
								].map((field) => /* @__PURE__ */ jsxs("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ jsx(Label, {
											htmlFor: field,
											children: field === "weight" ? "Weight (g)" : `${field[0].toUpperCase()}${field.slice(1)} (cm)`
										}),
										/* @__PURE__ */ jsx(Input, {
											id: field,
											type: "number",
											min: "0",
											value: data[field],
											placeholder: "0",
											onChange: (event) => setData(field, event.target.value)
										}),
										/* @__PURE__ */ jsx(InputError, { message: errors[field] })
									]
								}, field))
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2 md:col-span-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Variant Image" }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-start",
									children: [/* @__PURE__ */ jsx("div", {
										className: "relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted",
										children: preview ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("img", {
											src: preview,
											alt: "Preview",
											className: "h-full w-full object-cover"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: clearImage,
											className: "absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
											children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
										})] }) : /* @__PURE__ */ jsx(ImageIcon, { className: "h-10 w-10 text-muted-foreground/40" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition hover:border-primary/60 hover:bg-muted/50",
										onClick: () => fileInputRef.current?.click(),
										children: [
											/* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-muted-foreground" }),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-muted-foreground",
												children: "Klik untuk upload atau drag & drop gambar"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground/60",
												children: "JPG, PNG, WEBP — maks. 2 MB"
											}),
											/* @__PURE__ */ jsx("input", {
												ref: fileInputRef,
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: handleFileChange
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.image })
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-start gap-3 rounded-lg border p-4 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: data.is_active,
								onChange: (event) => setData("is_active", event.target.checked),
								className: "mt-1"
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
								className: "block font-medium",
								children: "Active variant"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Varian aktif bisa tampil dan dibeli customer jika stok tersedia."
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-3 border-t pt-5",
							children: [/* @__PURE__ */ jsx(Button, {
								asChild: true,
								type: "button",
								variant: "outline",
								children: /* @__PURE__ */ jsx(Link, {
									href: "/admin/product-variants",
									children: "Cancel"
								})
							}), /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: processing,
								children: [/* @__PURE__ */ jsx(Save, {}), "Save Variant"]
							})]
						})
					]
				}) })]
			}), selectedProduct && /* @__PURE__ */ jsxs(Card, {
				className: "min-w-0 overflow-hidden xl:sticky xl:top-6",
				children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Product Summary" }), /* @__PURE__ */ jsx(CardDescription, { children: "Product yang menerima variant ini." })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border bg-muted",
						children: selectedProduct.image_url ? /* @__PURE__ */ jsx("img", {
							src: selectedProduct.image_url,
							alt: selectedProduct.name,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ jsx(ImageIcon, { className: "h-12 w-12 text-muted-foreground/40" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid min-w-0 gap-4 text-sm",
						children: [
							/* @__PURE__ */ jsx(SummaryItem, {
								label: "Name",
								value: selectedProduct.name
							}),
							/* @__PURE__ */ jsx(SummaryItem, {
								label: "Slug",
								value: selectedProduct.slug,
								mono: true
							}),
							/* @__PURE__ */ jsx(SummaryItem, {
								label: "SKU",
								value: selectedProduct.sku ?? "—",
								mono: true
							}),
							/* @__PURE__ */ jsx(SummaryItem, {
								label: "Price",
								value: formatPrice(selectedProduct.regular_price)
							}),
							/* @__PURE__ */ jsx(SummaryItem, {
								label: "Sale Price",
								value: formatPrice(selectedProduct.sale_price)
							})
						]
					})]
				})]
			})]
		})]
	})] });
}
function SummaryItem({ label, value, mono = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0 border-b pb-3 last:border-0 last:pb-0",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: `mt-1 break-words font-medium text-foreground ${mono ? "font-mono text-xs" : ""}`,
			children: value
		})]
	});
}
//#endregion
export { ProductVariantForm as default };

//# sourceMappingURL=form-o02OOGcm2.js.map