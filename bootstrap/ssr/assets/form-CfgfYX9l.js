import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ImageIcon, Save, Upload } from "lucide-react";
//#region resources/js/pages/admin/gallery/form.tsx
function GalleryForm({ mode, image, categories }) {
	const isEdit = mode === "edit" && image !== null;
	const inputRef = useRef(null);
	const [preview, setPreview] = useState(image?.image_url ?? null);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		image: null,
		alt_text: image?.alt_text ?? "",
		category_ids: image?.category_ids ?? [],
		sort_order: String(image?.sort_order ?? 0),
		is_active: image?.is_active ?? true
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/gallery/${image.id}` : "/admin/gallery", { forceFormData: true });
	};
	const toggleCategory = (categoryId) => setData("category_ids", data.category_ids.includes(categoryId) ? data.category_ids.filter((id) => id !== categoryId) : [...data.category_ids, categoryId]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Gallery Image" : "Add Gallery Image" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: isEdit ? "Edit Gallery Image" : "Add Gallery Image",
			description: "Upload gambar dan pilih satu atau lebih kategori gallery."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Gallery Image" }), /* @__PURE__ */ jsx(CardDescription, { children: "Gambar baru wajib diupload. Gambar lama tetap digunakan bila edit tanpa upload baru." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ jsx("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (event) => {
							const file = event.target.files?.[0] ?? null;
							setData("image", file);
							setPreview(file ? URL.createObjectURL(file) : image?.image_url ?? null);
						}
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						className: "flex min-h-60 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground",
						children: preview ? /* @__PURE__ */ jsx("img", {
							src: preview,
							alt: "Gallery preview",
							className: "max-h-80 w-full object-contain"
						}) : /* @__PURE__ */ jsxs("span", {
							className: "flex flex-col items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(ImageIcon, {}),
								/* @__PURE__ */ jsx("span", { children: "Click to upload image" }),
								/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" })
							]
						})
					}),
					/* @__PURE__ */ jsx(InputError, { message: errors.image }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Alt Text" }),
								/* @__PURE__ */ jsx(Input, {
									value: data.alt_text,
									onChange: (event) => setData("alt_text", event.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.alt_text })
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Sort Order" }),
								/* @__PURE__ */ jsx(Input, {
									type: "number",
									min: "0",
									value: data.sort_order,
									onChange: (event) => setData("sort_order", event.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.sort_order })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ jsx(Label, { children: "Categories" }),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: categories.map((category) => /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-3 rounded-md border p-3 text-sm",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: data.category_ids.includes(category.id),
										onChange: () => toggleCategory(category.id)
									}), category.name]
								}, category.id))
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.category_ids })
						]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-3 text-sm font-medium",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: data.is_active,
							onChange: (event) => setData("is_active", event.target.checked)
						}), " Show on public gallery"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/gallery",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save Image"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
//#endregion
export { GalleryForm as default };

//# sourceMappingURL=form-CfgfYX9l.js.map