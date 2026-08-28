import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { t as slugify } from "./slug-COlP2TeS.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ImageIcon, Save, Upload, X } from "lucide-react";
//#region resources/js/pages/admin/categories/form.tsx
function CategoryForm({ mode, category }) {
	const isEdit = mode === "edit" && category !== null;
	const fileInputRef = useRef(null);
	const [preview, setPreview] = useState(category?.image_url ?? null);
	const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		name: category?.name ?? "",
		slug: category?.slug ?? "",
		description: category?.description ?? "",
		image: null,
		is_active: category?.is_active ?? true
	});
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
		post(isEdit ? `/admin/categories/${category.id}` : "/admin/categories", { forceFormData: true });
	};
	const generateSlug = () => {
		setData("slug", slugify(data.name));
		setSlugManuallyEdited(false);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Category" : "Create Category" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Catalog Management",
			title: isEdit ? "Edit Category" : "Create Category",
			description: "Nama dan slug category digunakan sebagai pengelompokan katalog customer."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-3xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Category Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Upload gambar category langsung dari komputer kamu (maks. 2 MB)." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, {
									htmlFor: "name",
									children: "Name"
								}),
								/* @__PURE__ */ jsx(Input, {
									id: "name",
									value: data.name,
									onChange: (event) => {
										const name = event.target.value;
										setData({
											...data,
											name,
											slug: slugManuallyEdited ? data.slug : slugify(name)
										});
									},
									placeholder: "Contoh: Dress Muslim"
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.name })
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, {
									htmlFor: "slug",
									children: "Slug"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx(Input, {
										id: "slug",
										value: data.slug,
										onChange: (event) => {
											setSlugManuallyEdited(true);
											setData("slug", slugify(event.target.value));
										},
										placeholder: "dress-muslim"
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										onClick: generateSlug,
										disabled: !data.name.trim(),
										children: "Generate"
									})]
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.slug })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "description",
								children: "Description"
							}),
							/* @__PURE__ */ jsx("textarea", {
								id: "description",
								value: data.description,
								onChange: (event) => setData("description", event.target.value),
								className: "min-h-28 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.description })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, { children: "Category Image" }),
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
							children: "Active category"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Category aktif bisa ditampilkan sebagai filter customer."
						})] })]
					}),
					/* @__PURE__ */ jsx(InputError, { message: errors.is_active }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/categories",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), "Save Category"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
//#endregion
export { CategoryForm as default };

//# sourceMappingURL=form-DIr2l4Wu.js.map