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
//#region resources/js/pages/admin/collections/form.tsx
function ImageUploadField({ label, currentUrl, previewUrl, onPreviewChange, onFileChange, error, description }) {
	const fileInputRef = useRef(null);
	const handleChange = (event) => {
		const file = event.target.files?.[0] ?? null;
		onFileChange(file);
		if (file) onPreviewChange(URL.createObjectURL(file));
	};
	const clear = () => {
		onFileChange(null);
		onPreviewChange(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const display = previewUrl ?? currentUrl;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: "relative flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted",
					children: display ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("img", {
						src: display,
						alt: "Preview",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: clear,
						className: "absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80",
						children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
					})] }) : /* @__PURE__ */ jsx(ImageIcon, { className: "h-8 w-8 text-muted-foreground/40" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-5 text-center transition hover:border-primary/60 hover:bg-muted/50",
					onClick: () => fileInputRef.current?.click(),
					children: [
						/* @__PURE__ */ jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Klik untuk upload gambar"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground/60",
							children: description
						}),
						/* @__PURE__ */ jsx("input", {
							ref: fileInputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: handleChange
						})
					]
				})]
			}),
			error && /* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
function CollectionForm({ mode, collection }) {
	const isEdit = mode === "edit" && collection !== null;
	const [desktopPreview, setDesktopPreview] = useState(null);
	const [mobilePreview, setMobilePreview] = useState(null);
	const [slugManuallyEdited, setSlugManuallyEdited] = useState(isEdit);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		name: collection?.name ?? "",
		slug: collection?.slug ?? "",
		description: collection?.description ?? "",
		banner_desktop: null,
		banner_mobile: null,
		is_featured: collection?.is_featured ?? false,
		is_active: collection?.is_active ?? true
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/collections/${collection.id}` : "/admin/collections", { forceFormData: true });
	};
	const generateSlug = () => {
		setData("slug", slugify(data.name));
		setSlugManuallyEdited(false);
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Collection" : "Create Collection" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Catalog Management",
			title: isEdit ? "Edit Collection" : "Create Collection",
			description: "Collection aktif bisa dipakai untuk campaign dan assignment produk."
		}), /* @__PURE__ */ jsxs("div", {
			className: `grid items-start gap-6 ${isEdit ? "lg:grid-cols-[minmax(0,1fr)_380px]" : "max-w-3xl"}`,
			children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Collection Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Upload banner desktop (landscape) dan mobile (portrait) untuk collection ini." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
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
									placeholder: "Contoh: Eid Signature Series"
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
										placeholder: "eid-signature-series"
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
					/* @__PURE__ */ jsx(ImageUploadField, {
						label: "Desktop Banner",
						currentUrl: collection?.banner_desktop_url ?? null,
						previewUrl: desktopPreview,
						onPreviewChange: setDesktopPreview,
						onFileChange: (file) => setData("banner_desktop", file),
						error: errors.banner_desktop,
						description: "Landscape — maks. 4 MB (JPG, PNG, WEBP)"
					}),
					/* @__PURE__ */ jsx(ImageUploadField, {
						label: "Mobile Banner",
						currentUrl: collection?.banner_mobile_url ?? null,
						previewUrl: mobilePreview,
						onPreviewChange: setMobilePreview,
						onFileChange: (file) => setData("banner_mobile", file),
						error: errors.banner_mobile,
						description: "Portrait — maks. 2 MB (JPG, PNG, WEBP)"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "flex items-start gap-3 rounded-lg border p-4 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: data.is_featured,
								onChange: (event) => setData("is_featured", event.target.checked),
								className: "mt-1"
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
								className: "block font-medium",
								children: "Featured collection"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Bisa ditampilkan di homepage."
							})] })]
						}), /* @__PURE__ */ jsxs("label", {
							className: "flex items-start gap-3 rounded-lg border p-4 text-sm",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: data.is_active,
								onChange: (event) => setData("is_active", event.target.checked),
								className: "mt-1"
							}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
								className: "block font-medium",
								children: "Active collection"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: "Collection aktif bisa tampil ke customer."
							})] })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/collections",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), "Save Collection"]
						})]
					})
				]
			}) })] }), isEdit && /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsxs(CardTitle, { children: [
				"Products in Collection (",
				collection.products?.length || 0,
				")"
			] }), /* @__PURE__ */ jsx(CardDescription, { children: "Daftar produk yang termasuk dalam koleksi ini." })] }), /* @__PURE__ */ jsx(CardContent, { children: collection.products?.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "flex flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground",
					children: "Belum ada produk di koleksi ini."
				})
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4",
				children: collection.products?.map((product) => /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md",
					children: [/* @__PURE__ */ jsx("div", {
						className: "relative aspect-square w-full bg-muted",
						children: product.primary_image?.image_url ? /* @__PURE__ */ jsx("img", {
							src: product.primary_image.image_url,
							alt: product.name,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ jsx("div", {
							className: "flex h-full w-full items-center justify-center",
							children: /* @__PURE__ */ jsx(ImageIcon, { className: "h-8 w-8 text-muted-foreground/30" })
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "p-3",
						children: /* @__PURE__ */ jsx("p", {
							className: "line-clamp-2 text-xs leading-tight font-medium text-zinc-900",
							title: product.name,
							children: product.name
						})
					})]
				}, product.id))
			}) })] })]
		})]
	})] });
}
//#endregion
export { CollectionForm as default };

//# sourceMappingURL=form-4Y7IOjZg.js.map