import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ImageIcon, Plus, Save, Trash2, Upload, X } from "lucide-react";
//#region resources/js/pages/admin/new-product/form.tsx
var emptyImage = (sortOrder) => ({
	image_url: "",
	image: null,
	alt_text: "",
	sort_order: sortOrder,
	is_active: true
});
function NewProductForm({ page, galleryImages }) {
	const { data, setData, put, processing, errors } = useForm({
		...Object.fromEntries(Object.entries(page).filter(([key]) => key !== "id")),
		hero_image: null,
		story_image: null,
		gallery_images: galleryImages.map((image) => ({
			...image,
			image: null
		}))
	});
	const submit = (event) => {
		event.preventDefault();
		put("/admin/new-product", {
			preserveScroll: true,
			forceFormData: true
		});
	};
	const updateImage = (index, values) => {
		setData("gallery_images", data.gallery_images.map((image, imageIndex) => imageIndex === index ? {
			...image,
			...values
		} : image));
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "New Product Page" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: "New Product Page",
			description: "Kelola Hero, Story, dan Closer Look. Upload gambar langsung dari perangkat admin."
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "grid max-w-6xl gap-6",
			children: [
				/* @__PURE__ */ jsx(Section, {
					title: "Hero",
					description: "Konten utama, produk, harga, CTA, dan gambar hero.",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Internal Name",
								value: data.name,
								onChange: (value) => setData("name", value),
								error: errors.name
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Eyebrow",
								value: data.hero_eyebrow,
								onChange: (value) => setData("hero_eyebrow", value),
								error: errors.hero_eyebrow
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Hero Title",
								value: data.hero_title,
								onChange: (value) => setData("hero_title", value),
								error: errors.hero_title
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Product Name",
								value: data.product_name,
								onChange: (value) => setData("product_name", value),
								error: errors.product_name
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Description",
								value: data.hero_description,
								onChange: (value) => setData("hero_description", value),
								error: errors.hero_description
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Price",
								value: data.price_label,
								onChange: (value) => setData("price_label", value),
								error: errors.price_label
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Shop Button Text",
								value: data.shop_now_text,
								onChange: (value) => setData("shop_now_text", value),
								error: errors.shop_now_text
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Shop Button URL",
								value: data.shop_now_url,
								onChange: (value) => setData("shop_now_url", value),
								error: errors.shop_now_url
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Secondary Button Text",
								value: data.specifications_text,
								onChange: (value) => setData("specifications_text", value),
								error: errors.specifications_text
							}),
							/* @__PURE__ */ jsx(ImageUpload, {
								label: "Hero Image",
								currentUrl: data.hero_image_url,
								onFile: (file) => setData("hero_image", file),
								error: errors.hero_image
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(Section, {
					title: "Story",
					description: "Cerita peluncuran dan gambar pendukung.",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Eyebrow",
								value: data.story_eyebrow,
								onChange: (value) => setData("story_eyebrow", value),
								error: errors.story_eyebrow
							}),
							/* @__PURE__ */ jsx(TextArea, {
								label: "Title",
								value: data.story_title,
								onChange: (value) => setData("story_title", value),
								error: errors.story_title
							}),
							/* @__PURE__ */ jsx("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ jsx(TextArea, {
									label: "Body",
									rows: 8,
									value: data.story_body,
									onChange: (value) => setData("story_body", value),
									error: errors.story_body
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "md:col-span-2",
								children: /* @__PURE__ */ jsx(ImageUpload, {
									label: "Story Image",
									currentUrl: data.story_image_url,
									onFile: (file) => setData("story_image", file),
									error: errors.story_image
								})
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs(Section, {
					title: "Closer Look",
					description: "Tambah, hapus, aktifkan, dan urutkan gambar galeri.",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Section Heading",
							value: data.gallery_heading,
							onChange: (value) => setData("gallery_heading", value),
							error: errors.gallery_heading
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-4",
							children: data.gallery_images.map((image, index) => /* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 rounded-lg border p-4 md:grid-cols-[1.2fr_1fr_110px_auto]",
								children: [
									/* @__PURE__ */ jsx(ImageUpload, {
										label: "Image",
										currentUrl: image.image_url,
										onFile: (file) => updateImage(index, { image: file }),
										error: nestedError(errors, `gallery_images.${index}.image`),
										compact: true
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Alt Text",
										value: image.alt_text ?? "",
										onChange: (value) => updateImage(index, { alt_text: value }),
										error: nestedError(errors, `gallery_images.${index}.alt_text`)
									}),
									/* @__PURE__ */ jsx(NumberField, {
										label: "Order",
										value: image.sort_order,
										onChange: (value) => updateImage(index, { sort_order: value })
									}),
									/* @__PURE__ */ jsx(RowActions, {
										active: image.is_active,
										onActive: (value) => updateImage(index, { is_active: value }),
										onRemove: () => setData("gallery_images", data.gallery_images.filter((_, imageIndex) => imageIndex !== index))
									})
								]
							}, index))
						}),
						/* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setData("gallery_images", [...data.gallery_images, emptyImage(data.gallery_images.length)]),
							children: [/* @__PURE__ */ jsx(Plus, { className: "size-4" }), " Add Image"]
						})
					]
				}),
				/* @__PURE__ */ jsx(Section, {
					title: "Publishing",
					description: "Atur apakah halaman tampil untuk customer.",
					children: /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: data.is_active,
							onChange: (event) => setData("is_active", event.target.checked)
						}), " Page active"]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "sticky bottom-4 flex justify-end",
					children: /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						size: "lg",
						disabled: processing,
						children: [
							/* @__PURE__ */ jsx(Save, { className: "size-4" }),
							" ",
							processing ? "Saving..." : "Save Page"
						]
					})
				})
			]
		})]
	})] });
}
function ImageUpload({ label, currentUrl, onFile, error, compact = false }) {
	const inputRef = useRef(null);
	const [preview, setPreview] = useState(null);
	const display = preview ?? currentUrl;
	const clear = () => {
		if (preview) URL.revokeObjectURL(preview);
		setPreview(null);
		onFile(null);
		if (inputRef.current) inputRef.current.value = "";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsxs("div", {
				className: compact ? "grid gap-3" : "flex flex-col gap-3 sm:flex-row sm:items-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: `relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted ${compact ? "h-28 w-full" : "h-32 w-56"}`,
					children: display ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("img", {
						src: display,
						alt: label,
						className: "h-full w-full object-cover"
					}), preview ? /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: clear,
						className: "absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-black/65 text-white",
						children: /* @__PURE__ */ jsx(X, { className: "size-4" })
					}) : null] }) : /* @__PURE__ */ jsx(ImageIcon, { className: "size-10 text-muted-foreground/40" })
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					className: "flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground hover:border-primary/60 hover:bg-muted/50",
					children: [
						/* @__PURE__ */ jsx(Upload, { className: "size-5" }),
						" Pilih gambar",
						/* @__PURE__ */ jsx("span", {
							className: "text-xs",
							children: "JPG, PNG, WEBP · Maks. 4 MB"
						}),
						/* @__PURE__ */ jsx("input", {
							ref: inputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (event) => {
								const file = event.target.files?.[0] ?? null;
								if (preview) URL.revokeObjectURL(preview);
								onFile(file);
								setPreview(file ? URL.createObjectURL(file) : null);
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-xs text-muted-foreground",
				children: "Biarkan kosong untuk mempertahankan gambar saat ini."
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
function Section({ title, description, children }) {
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: title }), /* @__PURE__ */ jsx(CardDescription, { children: description })] }), /* @__PURE__ */ jsx(CardContent, {
		className: "grid gap-5",
		children
	})] });
}
function Field({ label, value, onChange, error }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx(Input, {
				value,
				onChange: (event) => onChange(event.target.value)
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
function TextArea({ label, value, onChange, error, rows = 4 }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx("textarea", {
				rows,
				className: textInputClass(),
				value,
				onChange: (event) => onChange(event.target.value)
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
function NumberField({ label, value, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ jsx(Label, { children: label }), /* @__PURE__ */ jsx(Input, {
			type: "number",
			min: 0,
			value,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
function RowActions({ active, onActive, onRemove }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-end gap-3 pb-1",
		children: [/* @__PURE__ */ jsxs("label", {
			className: "flex items-center gap-2 text-xs",
			children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: active,
				onChange: (event) => onActive(event.target.checked)
			}), " Active"]
		}), /* @__PURE__ */ jsx(Button, {
			type: "button",
			size: "icon",
			variant: "destructive",
			onClick: onRemove,
			children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
		})]
	});
}
function nestedError(errors, key) {
	return errors[key];
}
//#endregion
export { NewProductForm as default };

//# sourceMappingURL=form-BLhlDfHM.js.map