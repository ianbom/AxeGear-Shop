import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import { Head, Link, useForm } from "@inertiajs/react";
import * as React$1 from "react";
import { useEffect, useMemo, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Bold, Code2, CornerDownLeft, DollarSign, Eraser, GripVertical, Heading1, Heading2, Highlighter, Image, Italic, Layers, LayoutGrid, List, ListOrdered, Package, Pencil, Plus, Quote, Redo2, Sparkles, Star, Strikethrough, Tag, Trash2, TrendingUp, Undo2, X } from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region resources/js/components/ui/switch.tsx
var Switch = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region resources/js/pages/admin/products/form.tsx
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
var blankImage = () => ({
	image: null,
	image_url: null,
	alt_text: "",
	sort_order: 0,
	is_primary: false
});
var blankVariant = () => ({
	sku: "",
	variant_name: "Default Title",
	color_name: "",
	color_hex: "",
	size: "",
	package_type: "",
	regular_price: "",
	sale_price: "",
	stock: 0,
	reserved_stock: 0,
	weight: "",
	length: "",
	width: "",
	height: "",
	image_url: "",
	image: null,
	is_active: true
});
function SectionCard({ title, description, children, icon }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3 border-b border-zinc-100 px-6 py-4",
			children: [icon && /* @__PURE__ */ jsx("div", {
				className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50",
				children: icon
			}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-zinc-900",
				children: title
			}), description && /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-zinc-500",
				children: description
			})] })]
		}), /* @__PURE__ */ jsx("div", {
			className: "p-6",
			children
		})]
	});
}
function FieldRow({ children, cols = 1, className = "" }) {
	const gridClass = {
		1: "grid-cols-1",
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-3",
		4: "grid-cols-2 sm:grid-cols-4"
	}[cols];
	return /* @__PURE__ */ jsx("div", {
		className: `grid ${gridClass} gap-4 ${className}`,
		children
	});
}
function FieldGroup({ label, hint, required, error, children, charCount, maxChar }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs(Label, {
					className: "text-xs font-medium text-zinc-700",
					children: [label, required && /* @__PURE__ */ jsx("span", {
						className: "ml-0.5 text-red-500",
						children: "*"
					})]
				}), maxChar !== void 0 && /* @__PURE__ */ jsxs("span", {
					className: `text-[11px] tabular-nums ${(charCount ?? 0) > maxChar * .9 ? "text-amber-500" : "text-zinc-400"}`,
					children: [
						charCount ?? 0,
						"/",
						maxChar
					]
				})]
			}),
			children,
			error && /* @__PURE__ */ jsxs("p", {
				className: "flex items-center gap-1 text-[11px] text-red-500",
				children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-3 w-3" }), error]
			}),
			hint && !error && /* @__PURE__ */ jsx("p", {
				className: "text-[11px] text-zinc-400",
				children: hint
			})
		]
	});
}
function editorButtonClass(active = false, disabled = false) {
	return [
		"inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-xs font-semibold transition-colors",
		active ? "border-[#B98B63] bg-[#F8F0E5] text-[#9A6B45]" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900",
		disabled ? "cursor-not-allowed opacity-50" : ""
	].join(" ");
}
function ToolbarButton({ active = false, children, disabled, label, onClick }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		"aria-label": label,
		title: label,
		disabled,
		onClick,
		className: editorButtonClass(active, disabled),
		children
	});
}
function RichTextEditor({ error, onChange, value }) {
	const editor = useEditor({
		extensions: useMemo(() => [StarterKit.configure({ heading: { levels: [1, 2] } }), Highlight.configure({ multicolor: true })], []),
		content: value,
		editorProps: { attributes: { class: [
			"min-h-[180px] px-4 py-3 text-sm leading-6 text-zinc-800 outline-none",
			"[&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-zinc-950",
			"[&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900",
			"[&_p]:mb-2 [&_p:last-child]:mb-0",
			"[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5",
			"[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5",
			"[&_blockquote]:border-l-4 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-600",
			"[&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-zinc-950 [&_pre]:p-3 [&_pre]:text-xs [&_pre]:text-zinc-50",
			"[&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs"
		].join(" ") } },
		onUpdate: ({ editor }) => {
			onChange(editor.isEmpty ? "" : editor.getHTML());
		}
	});
	useEffect(() => {
		if (!editor || editor.getHTML() === value) return;
		editor.commands.setContent(value, { emitUpdate: false });
	}, [editor, value]);
	const disabled = !editor;
	const buttonGroups = [
		[
			{
				label: "Bold",
				active: editor?.isActive("bold") ?? false,
				icon: /* @__PURE__ */ jsx(Bold, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleBold().run()
			},
			{
				label: "Italic",
				active: editor?.isActive("italic") ?? false,
				icon: /* @__PURE__ */ jsx(Italic, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleItalic().run()
			},
			{
				label: "Strikethrough",
				active: editor?.isActive("strike") ?? false,
				icon: /* @__PURE__ */ jsx(Strikethrough, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleStrike().run()
			},
			{
				label: "Highlight",
				active: editor?.isActive("highlight") ?? false,
				icon: /* @__PURE__ */ jsx(Highlighter, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleHighlight({ color: "#fef08a" }).run()
			}
		],
		[
			{
				label: "Paragraph",
				active: editor?.isActive("paragraph") ?? false,
				icon: /* @__PURE__ */ jsx("span", {
					className: "px-0.5",
					children: "P"
				}),
				run: () => editor?.chain().focus().setParagraph().run()
			},
			{
				label: "Heading 1",
				active: editor?.isActive("heading", { level: 1 }) ?? false,
				icon: /* @__PURE__ */ jsx(Heading1, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
			},
			{
				label: "Heading 2",
				active: editor?.isActive("heading", { level: 2 }) ?? false,
				icon: /* @__PURE__ */ jsx(Heading2, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
			}
		],
		[
			{
				label: "Bullet points",
				active: editor?.isActive("bulletList") ?? false,
				icon: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleBulletList().run()
			},
			{
				label: "Numbered points",
				active: editor?.isActive("orderedList") ?? false,
				icon: /* @__PURE__ */ jsx(ListOrdered, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleOrderedList().run()
			},
			{
				label: "Quote",
				active: editor?.isActive("blockquote") ?? false,
				icon: /* @__PURE__ */ jsx(Quote, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleBlockquote().run()
			},
			{
				label: "Code block",
				active: editor?.isActive("codeBlock") ?? false,
				icon: /* @__PURE__ */ jsx(Code2, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().toggleCodeBlock().run()
			}
		],
		[
			{
				label: "Enter line break",
				active: false,
				icon: /* @__PURE__ */ jsx(CornerDownLeft, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().setHardBreak().run()
			},
			{
				label: "Undo",
				active: false,
				icon: /* @__PURE__ */ jsx(Undo2, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().undo().run()
			},
			{
				label: "Redo",
				active: false,
				icon: /* @__PURE__ */ jsx(Redo2, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().redo().run()
			},
			{
				label: "Clear formatting",
				active: false,
				icon: /* @__PURE__ */ jsx(Eraser, { className: "h-4 w-4" }),
				run: () => editor?.chain().focus().unsetAllMarks().clearNodes().run()
			}
		]
	];
	return /* @__PURE__ */ jsxs("div", {
		className: `overflow-hidden rounded-lg border bg-white shadow-sm transition-colors ${error ? "border-red-300" : "border-zinc-200 focus-within:border-[#151515]"}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-1 border-b border-zinc-100 bg-zinc-50 p-2",
			children: buttonGroups.map((group, groupIndex) => /* @__PURE__ */ jsx("div", {
				className: "flex flex-wrap gap-1 border-r border-zinc-200 pr-1 last:border-r-0 last:pr-0",
				children: group.map((button) => /* @__PURE__ */ jsx(ToolbarButton, {
					label: button.label,
					active: button.active,
					disabled,
					onClick: button.run,
					children: button.icon
				}, button.label))
			}, groupIndex))
		}), /* @__PURE__ */ jsx(EditorContent, { editor })]
	});
}
function ProductForm({ mode, product, options }) {
	const isEdit = mode === "edit" && product !== null;
	const { data, setData, post, processing, errors, transform } = useForm({
		category_id: product?.category_id ?? "",
		collection_ids: product?.collection_ids ?? [],
		name: product?.name ?? "",
		slug: product?.slug ?? "",
		sku: product?.sku ?? "",
		brand_name: product?.brand_name ?? "Axegear",
		product_line: product?.product_line ?? "",
		style_name: product?.style_name ?? "",
		short_description: product?.short_description ?? "",
		description: product?.description ?? "",
		regular_price: product?.regular_price ?? "",
		sale_price: product?.sale_price ?? "",
		weight: product?.weight ?? "",
		length: product?.length ?? "",
		width: product?.width ?? "",
		height: product?.height ?? "",
		status: product?.status ?? "draft",
		is_featured: product?.is_featured ?? false,
		is_new_arrival: product?.is_new_arrival ?? false,
		is_best_seller: product?.is_best_seller ?? false,
		images: product?.images?.length ? product.images.map((image) => ({
			...image,
			image: null
		})) : [blankImage()],
		variants: product?.variants?.length ? product.variants.map((variant) => ({
			...variant,
			image: null
		})) : []
	});
	const fieldError = (key) => errors[key];
	const [previews, setPreviews] = useState(() => (product?.images ?? [{ image_url: null }]).map((img) => img.image_url ?? null));
	const [variantModalOpen, setVariantModalOpen] = useState(false);
	const [editingVariantIndex, setEditingVariantIndex] = useState(null);
	const [variantDraft, setVariantDraft] = useState(blankVariant());
	const [variantDraftPreview, setVariantDraftPreview] = useState(null);
	const [variantPreviews, setVariantPreviews] = useState(() => (product?.variants ?? []).map((variant) => variant.image_url || null));
	useEffect(() => {
		return () => {
			previews.forEach((url) => {
				if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
			});
			variantPreviews.forEach((url) => {
				if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
			});
		};
	}, []);
	const updateImage = (index, field, value) => {
		const next = [...data.images];
		next[index] = {
			...next[index],
			[field]: value
		};
		setData("images", next);
	};
	const updateVariant = (index, field, value) => {
		const next = [...data.variants];
		next[index] = {
			...next[index],
			[field]: value
		};
		setData("variants", next);
	};
	const openVariantModal = (index = null) => {
		setEditingVariantIndex(index);
		setVariantDraft(index === null ? blankVariant() : { ...data.variants[index] });
		setVariantDraftPreview(index === null ? null : variantPreviews[index] ?? null);
		setVariantModalOpen(true);
	};
	const closeVariantModal = () => {
		const isSavedPreview = variantPreviews.some((preview) => preview === variantDraftPreview);
		if (variantDraftPreview?.startsWith("blob:") && !isSavedPreview) URL.revokeObjectURL(variantDraftPreview);
		setVariantModalOpen(false);
		setEditingVariantIndex(null);
		setVariantDraft(blankVariant());
		setVariantDraftPreview(null);
	};
	const saveVariantDraft = () => {
		const draft = { ...variantDraft };
		if (editingVariantIndex === null) {
			setData("variants", [...data.variants, draft]);
			setVariantPreviews([...variantPreviews, variantDraftPreview]);
		} else {
			const next = [...data.variants];
			next[editingVariantIndex] = draft;
			setData("variants", next);
			const previousPreview = variantPreviews[editingVariantIndex];
			if (previousPreview?.startsWith("blob:") && previousPreview !== variantDraftPreview) URL.revokeObjectURL(previousPreview);
			const nextPreviews = [...variantPreviews];
			nextPreviews[editingVariantIndex] = variantDraftPreview;
			setVariantPreviews(nextPreviews);
		}
		setVariantModalOpen(false);
		setEditingVariantIndex(null);
		setVariantDraft(blankVariant());
		setVariantDraftPreview(null);
	};
	const setPrimaryImage = (index) => {
		setData("images", data.images.map((image, imageIndex) => ({
			...image,
			is_primary: imageIndex === index
		})));
	};
	const submit = (event) => {
		event.preventDefault();
		if (isEdit) {
			transform((data) => ({
				...data,
				_method: "put"
			}));
			post(`/admin/products/${product.id}`, { forceFormData: true });
			return;
		}
		transform((data) => data);
		post("/admin/products", { forceFormData: true });
	};
	const variantsCount = data.variants.filter((v) => v.sku).length;
	const getPreview = (index) => previews[index] ?? data.images[index]?.image_url ?? null;
	const getVariantPreview = (index) => variantPreviews[index] ?? data.variants[index]?.image_url ?? null;
	const primaryIndex = data.images.findIndex((i) => i.is_primary);
	const primaryPreview = getPreview(primaryIndex >= 0 ? primaryIndex : 0);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Product" : "Create Product" }),
		/* @__PURE__ */ jsxs("div", {
			className: "min-h-screen bg-zinc-50/50",
			children: [/* @__PURE__ */ jsx("div", {
				className: "sticky top-0 z-20 border-b border-zinc-200 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex h-14 items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: isEdit ? `/admin/products/${product?.id}` : "/admin/products",
									className: "text-zinc-400 transition-colors hover:text-zinc-700",
									children: /* @__PURE__ */ jsx("svg", {
										className: "h-5 w-5",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 1.5,
											d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
										})
									})
								}),
								/* @__PURE__ */ jsx("div", { className: "h-5 w-px bg-zinc-200" }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
									className: "text-sm font-semibold text-zinc-900",
									children: isEdit ? `Edit: ${product?.name ?? "Product"}` : "Create Product"
								}), /* @__PURE__ */ jsx("p", {
									className: "hidden text-[11px] text-zinc-400 sm:block",
									children: isEdit ? "Update product details, images, and variants" : "Fill in details to create a new product"
								})] })
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ jsx(Badge, {
								className: `border-0 text-[11px] font-medium capitalize ${{
									draft: "bg-zinc-100 text-zinc-600",
									published: "bg-emerald-100 text-emerald-700",
									archived: "bg-rose-100 text-rose-700"
								}[data.status] ?? "bg-zinc-100 text-zinc-600"}`,
								children: data.status
							})
						})]
					})
				})
			}), /* @__PURE__ */ jsx("form", {
				onSubmit: submit,
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_320px]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-5",
							children: [
								/* @__PURE__ */ jsx(SectionCard, {
									title: "Basic Information",
									description: "Essential details about your product",
									icon: /* @__PURE__ */ jsx(Tag, { className: "h-4 w-4 text-zinc-500" }),
									children: /* @__PURE__ */ jsxs("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ jsxs(FieldRow, {
												cols: 2,
												children: [/* @__PURE__ */ jsx(FieldGroup, {
													label: "Product Name",
													required: true,
													error: errors.name,
													children: /* @__PURE__ */ jsx(Input, {
														value: data.name,
														onChange: (e) => {
															setData("name", e.target.value);
															if (!isEdit) setData("slug", slugify(e.target.value));
														},
														placeholder: "e.g. Axegear Hydropack Enduro 2L",
														className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
													})
												}), /* @__PURE__ */ jsx(FieldGroup, {
													label: "SKU",
													required: true,
													error: errors.sku,
													hint: "Unique product identifier",
													children: /* @__PURE__ */ jsx(Input, {
														value: data.sku,
														onChange: (e) => setData("sku", e.target.value),
														placeholder: "e.g. AXG-HYD-END-001",
														className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
													})
												})]
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "URL Slug",
												required: true,
												error: errors.slug,
												hint: "Used in the product URL — lowercase letters, numbers, hyphens only",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ jsx(Input, {
														value: data.slug,
														onChange: (e) => setData("slug", slugify(e.target.value)),
														placeholder: "e.g. axegear-hydropack-enduro-2l",
														className: "h-9 flex-1 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
													}), /* @__PURE__ */ jsx(Button, {
														type: "button",
														variant: "outline",
														size: "sm",
														className: "h-9 shrink-0 border-zinc-200 px-3 text-xs",
														onClick: () => setData("slug", slugify(data.name)),
														children: "Generate"
													})]
												})
											}),
											/* @__PURE__ */ jsxs(FieldRow, {
												cols: 2,
												children: [/* @__PURE__ */ jsx(FieldGroup, {
													label: "Category",
													error: errors.category_id,
													children: /* @__PURE__ */ jsxs("select", {
														value: data.category_id,
														onChange: (e) => setData("category_id", e.target.value),
														className: "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-[#151515] focus:ring-1 focus:ring-[#151515] focus:outline-none",
														children: [/* @__PURE__ */ jsx("option", {
															value: "",
															children: "No category"
														}), options.categories.map((c) => /* @__PURE__ */ jsx("option", {
															value: c.id,
															children: c.name
														}, c.id))]
													})
												}), /* @__PURE__ */ jsx(FieldGroup, {
													label: "Collections",
													error: errors.collection_ids || errors["collection_ids.0"],
													children: /* @__PURE__ */ jsx("div", {
														className: "grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-md border border-zinc-200 bg-white p-3",
														children: options.collections.length === 0 ? /* @__PURE__ */ jsx("span", {
															className: "col-span-2 text-sm text-zinc-400",
															children: "No collections available"
														}) : options.collections.map((c) => {
															return /* @__PURE__ */ jsxs("label", {
																className: "flex items-center gap-2 rounded-md border border-zinc-100 p-2 hover:bg-zinc-50 cursor-pointer",
																children: [/* @__PURE__ */ jsx("input", {
																	type: "checkbox",
																	checked: data.collection_ids.includes(c.id),
																	onChange: (e) => {
																		if (e.target.checked) setData("collection_ids", [...data.collection_ids, c.id]);
																		else setData("collection_ids", data.collection_ids.filter((id) => id !== c.id));
																	},
																	className: "h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-[#151515]"
																}), /* @__PURE__ */ jsx("span", {
																	className: "text-sm text-zinc-700",
																	children: c.name
																})]
															}, c.id);
														})
													})
												})]
											}),
											/* @__PURE__ */ jsxs(FieldRow, {
												cols: 3,
												children: [
													/* @__PURE__ */ jsx(FieldGroup, {
														label: "Brand",
														error: errors.brand_name,
														children: /* @__PURE__ */ jsx(Input, {
															value: data.brand_name,
															onChange: (e) => setData("brand_name", e.target.value),
															placeholder: "Axegear",
															className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
														})
													}),
													/* @__PURE__ */ jsx(FieldGroup, {
														label: "Product Line",
														error: errors.product_line,
														children: /* @__PURE__ */ jsx(Input, {
															value: data.product_line,
															onChange: (e) => setData("product_line", e.target.value),
															placeholder: "Hydropack",
															className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
														})
													}),
													/* @__PURE__ */ jsx(FieldGroup, {
														label: "Style Name",
														error: errors.style_name,
														children: /* @__PURE__ */ jsx(Input, {
															value: data.style_name,
															onChange: (e) => setData("style_name", e.target.value),
															placeholder: "Trail Enduro",
															className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
														})
													})
												]
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Short Description",
												required: true,
												error: errors.short_description,
												charCount: data.short_description?.length,
												maxChar: 160,
												children: /* @__PURE__ */ jsx(Input, {
													value: data.short_description,
													onChange: (e) => setData("short_description", e.target.value),
													placeholder: "Lightweight hydropack for trail rides and daily adventures",
													className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Description",
												required: true,
												error: errors.description,
												children: /* @__PURE__ */ jsx(RichTextEditor, {
													value: data.description,
													onChange: (value) => setData("description", value),
													error: errors.description
												})
											})
										]
									})
								}),
								/* @__PURE__ */ jsx(SectionCard, {
									title: "Pricing",
									description: "Set regular and sale prices (IDR)",
									icon: /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-zinc-500" }),
									children: /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ jsx(FieldGroup, {
												label: "Regular Price (IDR)",
												required: true,
												error: errors.regular_price,
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.regular_price,
													onChange: (e) => setData("regular_price", e.target.value),
													placeholder: "0",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											}), /* @__PURE__ */ jsx(FieldGroup, {
												label: "Sale Price (IDR)",
												error: errors.sale_price,
												hint: "Must be lower than or equal to regular price",
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.sale_price,
													onChange: (e) => setData("sale_price", e.target.value),
													placeholder: "Leave empty for no discount",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col justify-between rounded-lg border border-zinc-100 bg-zinc-50 p-4",
											children: [/* @__PURE__ */ jsx("p", {
												className: "mb-3 text-[11px] font-medium tracking-wider text-zinc-500 uppercase",
												children: "Price Summary"
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-2",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between text-sm",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-zinc-500",
															children: "Regular"
														}), /* @__PURE__ */ jsxs("span", {
															className: "font-mono text-zinc-900",
															children: [
																"IDR",
																" ",
																Number(data.regular_price || 0).toLocaleString("id-ID")
															]
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between text-sm",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-zinc-500",
															children: "Sale"
														}), /* @__PURE__ */ jsxs("span", {
															className: "font-mono text-zinc-900",
															children: [
																"IDR",
																" ",
																Number(data.sale_price || 0).toLocaleString("id-ID")
															]
														})]
													}),
													/* @__PURE__ */ jsx("div", {
														className: "mt-2 border-t border-dashed border-zinc-200 pt-2",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ jsx("span", {
																className: "text-sm font-semibold text-zinc-900",
																children: "Final"
															}), /* @__PURE__ */ jsxs("span", {
																className: "font-mono text-base font-bold text-[#151515]",
																children: [
																	"IDR",
																	" ",
																	Number(data.sale_price || data.regular_price || 0).toLocaleString("id-ID")
																]
															})]
														})
													}),
													data.sale_price && Number(data.sale_price) < Number(data.regular_price) && /* @__PURE__ */ jsx("div", {
														className: "mt-1 flex items-center gap-1.5",
														children: /* @__PURE__ */ jsxs(Badge, {
															className: "border-0 bg-emerald-100 text-[10px] font-medium text-emerald-700",
															children: [Math.round((1 - Number(data.sale_price) / Number(data.regular_price)) * 100), "% OFF"]
														})
													})
												]
											})]
										})]
									})
								}),
								/* @__PURE__ */ jsx(SectionCard, {
									title: "Shipping & Dimensions",
									description: "Used for shipping cost calculations",
									icon: /* @__PURE__ */ jsx(Package, { className: "h-4 w-4 text-zinc-500" }),
									children: /* @__PURE__ */ jsxs(FieldRow, {
										cols: 4,
										children: [
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Weight (g)",
												required: true,
												error: errors.weight,
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.weight,
													onChange: (e) => setData("weight", e.target.value),
													placeholder: "0",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Length (cm)",
												required: true,
												error: errors.length,
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.length,
													onChange: (e) => setData("length", e.target.value),
													placeholder: "0",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Width (cm)",
												required: true,
												error: errors.width,
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.width,
													onChange: (e) => setData("width", e.target.value),
													placeholder: "0",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											}),
											/* @__PURE__ */ jsx(FieldGroup, {
												label: "Height (cm)",
												required: true,
												error: errors.height,
												children: /* @__PURE__ */ jsx(Input, {
													type: "number",
													min: "0",
													value: data.height,
													onChange: (e) => setData("height", e.target.value),
													placeholder: "0",
													className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
												})
											})
										]
									})
								}),
								/* @__PURE__ */ jsxs(SectionCard, {
									title: "Product Images",
									description: "Upload high-quality product photos (recommended: 800×1067px)",
									icon: /* @__PURE__ */ jsx(Image, { className: "h-4 w-4 text-zinc-500" }),
									children: [/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
										children: [data.images.map((image, index) => /* @__PURE__ */ jsxs("div", {
											className: `group relative overflow-hidden rounded-lg border-2 transition-all ${image.is_primary ? "border-[#151515] ring-2 ring-[#151515]/20" : "border-zinc-200 hover:border-zinc-300"}`,
											children: [/* @__PURE__ */ jsxs("div", {
												className: "relative flex aspect-[3/4] items-center justify-center bg-zinc-50",
												children: [
													getPreview(index) ? /* @__PURE__ */ jsx("img", {
														src: getPreview(index),
														className: "h-full w-full object-cover",
														alt: image.alt_text
													}) : /* @__PURE__ */ jsxs("div", {
														className: "flex flex-col items-center gap-1 text-zinc-300",
														children: [/* @__PURE__ */ jsx(Image, { className: "h-7 w-7" }), /* @__PURE__ */ jsx("span", {
															className: "text-[10px]",
															children: "Click to upload"
														})]
													}),
													/* @__PURE__ */ jsx("input", {
														type: "file",
														accept: "image/*",
														className: "absolute inset-0 cursor-pointer opacity-0",
														onChange: (e) => {
															const file = e.target.files?.[0] ?? null;
															updateImage(index, "image", file);
															const next = [...previews];
															if (next[index] && next[index].startsWith("blob:")) URL.revokeObjectURL(next[index]);
															next[index] = file ? URL.createObjectURL(file) : null;
															setPreviews(next);
														}
													}),
													/* @__PURE__ */ jsx("button", {
														type: "button",
														onClick: () => {
															if (previews[index]?.startsWith("blob:")) URL.revokeObjectURL(previews[index]);
															setData("images", data.images.filter((_, i) => i !== index));
															setPreviews(previews.filter((_, i) => i !== index));
														},
														className: "absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-500 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:border-red-200 hover:text-red-500",
														children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
													}),
													image.is_primary && /* @__PURE__ */ jsx("div", {
														className: "absolute bottom-1.5 left-1.5 z-10 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase",
														children: "Primary"
													})
												]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-1 border-t border-zinc-100 bg-white px-2 py-1.5",
												children: [/* @__PURE__ */ jsx("input", {
													type: "text",
													value: image.alt_text,
													onChange: (e) => updateImage(index, "alt_text", e.target.value),
													placeholder: "Alt text",
													className: "w-full rounded border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 text-[10px] text-zinc-700 placeholder:text-zinc-300 focus:border-zinc-300 focus:ring-0"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ jsxs("label", {
														className: "flex cursor-pointer items-center gap-1",
														children: [/* @__PURE__ */ jsx("input", {
															type: "radio",
															checked: image.is_primary,
															onChange: () => setPrimaryImage(index),
															className: "h-3 w-3 accent-[#151515]"
														}), /* @__PURE__ */ jsx("span", {
															className: "text-[10px] text-zinc-500",
															children: "Primary"
														})]
													}), /* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-0.5",
														children: [/* @__PURE__ */ jsx("span", {
															className: "text-[10px] text-zinc-400",
															children: "Order:"
														}), /* @__PURE__ */ jsx("input", {
															type: "number",
															value: image.sort_order,
															onChange: (e) => updateImage(index, "sort_order", Number(e.target.value)),
															className: "w-8 rounded border border-zinc-100 bg-zinc-50 py-0 text-center text-[10px] focus:border-zinc-300 focus:ring-0"
														})]
													})]
												})]
											})]
										}, index)), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => {
												setData("images", [...data.images, blankImage()]);
												setPreviews([...previews, null]);
											},
											className: "flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 text-zinc-400 transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-600",
											children: [/* @__PURE__ */ jsx(Plus, { className: "h-6 w-6" }), /* @__PURE__ */ jsx("span", {
												className: "text-[11px] font-medium",
												children: "Add Image"
											})]
										})]
									}), fieldError("images") && /* @__PURE__ */ jsxs("p", {
										className: "mt-3 flex items-center gap-1 text-[11px] text-red-500",
										children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-3 w-3" }), fieldError("images")]
									})]
								}),
								/* @__PURE__ */ jsxs(SectionCard, {
									title: "Product Variants",
									description: "Add size/color combinations with individual stock and pricing",
									icon: /* @__PURE__ */ jsx(Layers, { className: "h-4 w-4 text-zinc-500" }),
									children: [/* @__PURE__ */ jsxs("div", {
										className: "overflow-hidden rounded-lg border border-zinc-200",
										children: [/* @__PURE__ */ jsx("div", {
											className: "overflow-x-auto",
											children: /* @__PURE__ */ jsxs("table", {
												className: "w-full min-w-[760px] text-xs",
												children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
													className: "border-b border-zinc-200 bg-zinc-50",
													children: [
														/* @__PURE__ */ jsx("th", { className: "w-8 px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500" }),
														/* @__PURE__ */ jsx("th", {
															className: "px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500",
															children: "Variant SKU"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500",
															children: "Color Name"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-20 px-3 py-2.5 text-left text-[11px] font-medium text-zinc-500",
															children: "Size"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-16 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500",
															children: "Image"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-24 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500",
															children: "Price"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-20 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500",
															children: "Stock"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-20 px-3 py-2.5 text-right text-[11px] font-medium text-zinc-500",
															children: "Reserved"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-16 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500",
															children: "Active"
														}),
														/* @__PURE__ */ jsx("th", {
															className: "w-20 px-3 py-2.5 text-center text-[11px] font-medium text-zinc-500",
															children: "Actions"
														})
													]
												}) }), /* @__PURE__ */ jsxs("tbody", {
													className: "divide-y divide-zinc-100 bg-white",
													children: [data.variants.map((variant, index) => /* @__PURE__ */ jsxs("tr", {
														className: "group transition-colors hover:bg-zinc-50/60",
														children: [
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-center",
																children: /* @__PURE__ */ jsx(GripVertical, { className: "h-3.5 w-3.5 cursor-grab text-zinc-300" })
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 font-mono text-xs text-zinc-700",
																children: variant.sku || /* @__PURE__ */ jsx("span", {
																	className: "text-zinc-300",
																	children: "—"
																})
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2",
																children: /* @__PURE__ */ jsxs("div", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ jsx("span", {
																		className: "h-3.5 w-3.5 rounded-full border border-zinc-200",
																		style: { backgroundColor: variant.color_hex || "#ffffff" }
																	}), /* @__PURE__ */ jsx("span", {
																		className: "text-zinc-700",
																		children: variant.color_name || "—"
																	})]
																})
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2",
																children: /* @__PURE__ */ jsx("span", {
																	className: "rounded bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700",
																	children: variant.size || "—"
																})
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-center",
																children: getVariantPreview(index) ? /* @__PURE__ */ jsx("img", {
																	src: getVariantPreview(index),
																	alt: variant.sku,
																	className: "mx-auto h-8 w-8 rounded border border-zinc-200 object-cover"
																}) : /* @__PURE__ */ jsx(Image, { className: "mx-auto h-4 w-4 text-zinc-300" })
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-right font-mono text-zinc-700",
																children: Number(variant.sale_price || variant.regular_price || 0).toLocaleString("id-ID")
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-right font-mono text-zinc-700",
																children: variant.stock
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-right font-mono text-zinc-500",
																children: variant.reserved_stock
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-center",
																children: /* @__PURE__ */ jsx(Switch, {
																	checked: variant.is_active,
																	onCheckedChange: (v) => updateVariant(index, "is_active", v),
																	className: "scale-[0.8] data-[state=checked]:bg-primary"
																})
															}),
															/* @__PURE__ */ jsx("td", {
																className: "px-3 py-2 text-center",
																children: /* @__PURE__ */ jsxs("div", {
																	className: "flex justify-center gap-1",
																	children: [/* @__PURE__ */ jsx("button", {
																		type: "button",
																		onClick: () => openVariantModal(index),
																		className: "flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition-all hover:bg-zinc-100 hover:text-zinc-700",
																		children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
																	}), /* @__PURE__ */ jsx("button", {
																		type: "button",
																		onClick: () => {
																			const preview = variantPreviews[index];
																			if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
																			setData("variants", data.variants.filter((_, i) => i !== index));
																			setVariantPreviews(variantPreviews.filter((_, i) => i !== index));
																		},
																		className: "flex h-6 w-6 items-center justify-center rounded text-zinc-300 transition-all hover:bg-red-50 hover:text-red-500",
																		children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
																	})]
																})
															})
														]
													}, index)), data.variants.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
														colSpan: 10,
														className: "px-3 py-8 text-center text-xs text-zinc-400",
														children: "No variants yet. Click Add Variant to create one."
													}) })]
												})]
											})
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-3 py-2.5",
											children: [/* @__PURE__ */ jsxs(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: () => openVariantModal(),
												className: "h-7 gap-1.5 border-zinc-200 bg-white text-xs text-zinc-700",
												children: [/* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }), "Add Variant"]
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[11px] text-zinc-400",
												children: [
													variantsCount,
													" variant",
													variantsCount !== 1 ? "s" : "",
													" ",
													"with SKU"
												]
											})]
										})]
									}), fieldError("variants") && /* @__PURE__ */ jsxs("p", {
										className: "mt-2 flex items-center gap-1 text-[11px] text-red-500",
										children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-3 w-3" }), fieldError("variants")]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between pt-2 pb-8",
									children: [/* @__PURE__ */ jsx(Button, {
										asChild: true,
										variant: "outline",
										className: "h-10 border-zinc-200 px-5 text-zinc-600 hover:bg-zinc-50",
										children: /* @__PURE__ */ jsx(Link, {
											href: isEdit ? `/admin/products/${product?.id}` : "/admin/products",
											children: "Cancel"
										})
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ jsx(Button, {
											type: "submit",
											className: "h-10 bg-primary px-6 font-medium text-white shadow-sm hover:bg-primary/90",
											disabled: processing,
											children: processing ? /* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsxs("svg", {
													className: "h-3.5 w-3.5 animate-spin",
													fill: "none",
													viewBox: "0 0 24 24",
													children: [/* @__PURE__ */ jsx("circle", {
														className: "opacity-25",
														cx: "12",
														cy: "12",
														r: "10",
														stroke: "currentColor",
														strokeWidth: "4"
													}), /* @__PURE__ */ jsx("path", {
														className: "opacity-75",
														fill: "currentColor",
														d: "M4 12a8 8 0 018-8v8H4z"
													})]
												}), "Saving..."]
											}) : isEdit ? "Save Changes" : "Save Product"
										})
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 xl:sticky xl:top-[57px]",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "border-b border-zinc-100 px-5 py-4",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-sm font-semibold text-zinc-900",
											children: "Publishing"
										}), /* @__PURE__ */ jsx("p", {
											className: "mt-0.5 text-[11px] text-zinc-500",
											children: "Control product visibility"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-4 p-5",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ jsxs(Label, {
														className: "text-xs font-medium text-zinc-700",
														children: [
															"Status",
															" ",
															/* @__PURE__ */ jsx("span", {
																className: "text-red-500",
																children: "*"
															})
														]
													}),
													/* @__PURE__ */ jsx("select", {
														value: data.status,
														onChange: (e) => setData("status", e.target.value),
														className: "h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-[#151515] focus:ring-1 focus:ring-[#151515] focus:outline-none",
														children: options.statuses.map((s) => /* @__PURE__ */ jsx("option", {
															value: s,
															children: s.charAt(0).toUpperCase() + s.slice(1)
														}, s))
													}),
													errors.status && /* @__PURE__ */ jsx("p", {
														className: "text-[11px] text-red-500",
														children: errors.status
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-1.5 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-[11px] text-zinc-500",
												children: [
													/* @__PURE__ */ jsxs("p", { children: [
														/* @__PURE__ */ jsx("span", {
															className: "font-semibold text-zinc-700",
															children: "Draft"
														}),
														" ",
														"— Not visible to customers"
													] }),
													/* @__PURE__ */ jsxs("p", { children: [
														/* @__PURE__ */ jsx("span", {
															className: "font-semibold text-zinc-700",
															children: "Published"
														}),
														" ",
														"— Live and visible in store"
													] }),
													/* @__PURE__ */ jsxs("p", { children: [
														/* @__PURE__ */ jsx("span", {
															className: "font-semibold text-zinc-700",
															children: "Archived"
														}),
														" ",
														"— Hidden and unavailable"
													] })
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "space-y-3 border-t border-zinc-100 pt-4",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx(Star, { className: `h-4 w-4 ${data.is_featured ? "text-amber-500" : "text-zinc-300"}` }), /* @__PURE__ */ jsx(Label, {
																htmlFor: "is_featured",
																className: "cursor-pointer text-xs text-zinc-700",
																children: "Featured"
															})]
														}), /* @__PURE__ */ jsx(Switch, {
															id: "is_featured",
															checked: data.is_featured,
															onCheckedChange: (v) => setData("is_featured", v),
															className: "scale-90 data-[state=checked]:bg-primary"
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx(Sparkles, { className: `h-4 w-4 ${data.is_new_arrival ? "text-emerald-500" : "text-zinc-300"}` }), /* @__PURE__ */ jsx(Label, {
																htmlFor: "is_new_arrival",
																className: "cursor-pointer text-xs text-zinc-700",
																children: "New Arrival"
															})]
														}), /* @__PURE__ */ jsx(Switch, {
															id: "is_new_arrival",
															checked: data.is_new_arrival,
															onCheckedChange: (v) => setData("is_new_arrival", v),
															className: "scale-90 data-[state=checked]:bg-primary"
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx(TrendingUp, { className: `h-4 w-4 ${data.is_best_seller ? "text-rose-500" : "text-zinc-300"}` }), /* @__PURE__ */ jsx(Label, {
																htmlFor: "is_best_seller",
																className: "cursor-pointer text-xs text-zinc-700",
																children: "Best Seller"
															})]
														}), /* @__PURE__ */ jsx(Switch, {
															id: "is_best_seller",
															checked: data.is_best_seller,
															onCheckedChange: (v) => setData("is_best_seller", v),
															className: "scale-90 data-[state=checked]:bg-primary"
														})]
													})
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "border-b border-zinc-100 px-5 py-4",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-sm font-semibold text-zinc-900",
											children: "Preview"
										}), /* @__PURE__ */ jsx("p", {
											className: "mt-0.5 text-[11px] text-zinc-500",
											children: "How it appears in the store"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "p-5",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100",
												children: primaryPreview ? /* @__PURE__ */ jsx("img", {
													src: primaryPreview,
													className: "h-full w-full object-cover",
													alt: "Preview"
												}) : /* @__PURE__ */ jsx(Image, { className: "h-5 w-5 text-zinc-300" })
											}), /* @__PURE__ */ jsxs("div", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ jsx("h4", {
														className: "mb-0.5 line-clamp-2 text-sm leading-tight font-semibold text-zinc-900",
														children: data.name || /* @__PURE__ */ jsx("span", {
															className: "text-zinc-300",
															children: "Product Name"
														})
													}),
													/* @__PURE__ */ jsx("p", {
														className: "mb-1.5 text-[11px] text-zinc-400",
														children: options.categories.find((c) => c.id.toString() === data.category_id.toString())?.name || "No Category"
													}),
													/* @__PURE__ */ jsx("div", { children: data.sale_price ? /* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-1.5",
														children: [/* @__PURE__ */ jsxs("span", {
															className: "text-xs text-zinc-400 line-through",
															children: [
																"IDR",
																" ",
																Number(data.regular_price || 0).toLocaleString("id-ID")
															]
														}), /* @__PURE__ */ jsxs("span", {
															className: "text-sm font-bold text-[#151515]",
															children: [
																"IDR",
																" ",
																Number(data.sale_price).toLocaleString("id-ID")
															]
														})]
													}) : /* @__PURE__ */ jsxs("span", {
														className: "text-sm font-bold text-zinc-900",
														children: [
															"IDR",
															" ",
															Number(data.regular_price || 0).toLocaleString("id-ID")
														]
													}) }),
													/* @__PURE__ */ jsxs("div", {
														className: "mt-1.5 flex flex-wrap gap-1",
														children: [
															data.is_featured && /* @__PURE__ */ jsx(Badge, {
																className: "border-0 bg-amber-100 px-1.5 py-0 text-[9px] text-amber-700",
																children: "Featured"
															}),
															data.is_new_arrival && /* @__PURE__ */ jsx(Badge, {
																className: "border-0 bg-emerald-100 px-1.5 py-0 text-[9px] text-emerald-700",
																children: "New"
															}),
															data.is_best_seller && /* @__PURE__ */ jsx(Badge, {
																className: "border-0 bg-rose-100 px-1.5 py-0 text-[9px] text-rose-700",
																children: "Best Seller"
															})
														]
													})
												]
											})]
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm",
									children: [/* @__PURE__ */ jsx("div", {
										className: "border-b border-zinc-100 px-5 py-4",
										children: /* @__PURE__ */ jsx("h3", {
											className: "text-sm font-semibold text-zinc-900",
											children: "Summary"
										})
									}), /* @__PURE__ */ jsx("div", {
										className: "space-y-0 p-5",
										children: [
											{
												icon: /* @__PURE__ */ jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
												label: "Category",
												value: options.categories.find((c) => c.id.toString() === data.category_id.toString())?.name || "—"
											},
											{
												icon: /* @__PURE__ */ jsx(Layers, { className: "h-3.5 w-3.5" }),
												label: "Collections",
												value: data.collection_ids?.length > 0 ? options.collections.filter((c) => data.collection_ids.includes(c.id)).map((c) => c.name).join(", ") : "—"
											},
											{
												icon: /* @__PURE__ */ jsx(Tag, { className: "h-3.5 w-3.5" }),
												label: "SKU",
												value: data.sku || "—"
											},
											{
												icon: /* @__PURE__ */ jsx(DollarSign, { className: "h-3.5 w-3.5" }),
												label: "Regular Price",
												value: data.regular_price ? `IDR ${Number(data.regular_price).toLocaleString("id-ID")}` : "—"
											},
											{
												icon: /* @__PURE__ */ jsx(Package, { className: "h-3.5 w-3.5" }),
												label: "Variants",
												value: `${variantsCount} with SKU`
											},
											{
												icon: /* @__PURE__ */ jsx(Image, { className: "h-3.5 w-3.5" }),
												label: "Images",
												value: `${data.images.filter((i) => i.image || i.image_url).length} uploaded`
											}
										].map(({ icon, label, value }) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between border-b border-zinc-50 py-2 last:border-0",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "flex items-center gap-2 text-[11px] text-zinc-400",
												children: [icon, label]
											}), /* @__PURE__ */ jsx("span", {
												className: "max-w-[120px] truncate text-right text-[11px] font-medium text-zinc-700",
												children: value
											})]
										}, label))
									})]
								}),
								/* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2" })
							]
						})]
					})
				})
			})]
		}),
		variantModalOpen && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm",
			onMouseDown: (event) => {
				if (event.target === event.currentTarget) closeVariantModal();
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex max-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between gap-4 border-b border-zinc-100 px-6 py-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-sm font-semibold text-zinc-900",
							children: editingVariantIndex === null ? "Add Variant" : "Edit Variant"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-zinc-500",
							children: "Input size, color, stock, price, and image file."
						})] }), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: closeVariantModal,
							className: "flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid max-h-[calc(100vh-11rem)] grid-cols-1 gap-4 overflow-y-auto px-6 py-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-x-6",
						children: [
							/* @__PURE__ */ jsx(FieldRow, {
								className: "lg:col-start-2",
								children: /* @__PURE__ */ jsx(FieldGroup, {
									label: "Variant SKU",
									required: true,
									children: /* @__PURE__ */ jsx(Input, {
										value: variantDraft.sku,
										onChange: (e) => setVariantDraft({
											...variantDraft,
											sku: e.target.value
										}),
										placeholder: "e.g. AXG-HYD-END-BLK-2L",
										className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
									})
								})
							}),
							/* @__PURE__ */ jsxs(FieldRow, {
								cols: 3,
								className: "lg:col-start-2",
								children: [
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Variant Name",
										children: /* @__PURE__ */ jsx(Input, {
											value: variantDraft.variant_name,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												variant_name: e.target.value
											}),
											placeholder: "Black / 2L",
											className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									}),
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Size",
										children: /* @__PURE__ */ jsx(Input, {
											value: variantDraft.size,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												size: e.target.value
											}),
											placeholder: "e.g. 2L, 5L, 10L",
											className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									}),
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Package Type",
										children: /* @__PURE__ */ jsx(Input, {
											value: variantDraft.package_type,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												package_type: e.target.value
											}),
											placeholder: "Hydropack, Sling Bag, Waist Bag",
											className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs(FieldRow, {
								cols: 2,
								className: "lg:col-start-2",
								children: [/* @__PURE__ */ jsx(FieldGroup, {
									label: "Color Name",
									children: /* @__PURE__ */ jsx(Input, {
										value: variantDraft.color_name,
										onChange: (e) => setVariantDraft({
											...variantDraft,
											color_name: e.target.value
										}),
										placeholder: "e.g. Black, Olive, Sand",
										className: "h-9 border-zinc-200 text-sm focus:border-[#151515] focus:ring-[#151515]"
									})
								}), /* @__PURE__ */ jsx(FieldGroup, {
									label: "Color Hex",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-2 shadow-sm focus-within:border-[#151515] focus-within:ring-1 focus-within:ring-[#151515]",
										children: [/* @__PURE__ */ jsx("input", {
											type: "color",
											value: variantDraft.color_hex || "#000000",
											onChange: (e) => setVariantDraft({
												...variantDraft,
												color_hex: e.target.value
											}),
											className: "h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: variantDraft.color_hex || "#000000",
											onChange: (e) => setVariantDraft({
												...variantDraft,
												color_hex: e.target.value
											}),
											className: "h-full flex-1 border-0 bg-transparent p-0 font-mono text-sm text-zinc-700 focus:ring-0"
										})]
									})
								})]
							}),
							/* @__PURE__ */ jsxs(FieldRow, {
								cols: 4,
								className: "lg:col-start-2",
								children: [
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Regular Price",
										children: /* @__PURE__ */ jsx(Input, {
											type: "number",
											min: "0",
											value: variantDraft.regular_price,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												regular_price: e.target.value
											}),
											className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									}),
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Sale Price",
										children: /* @__PURE__ */ jsx(Input, {
											type: "number",
											min: "0",
											value: variantDraft.sale_price,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												sale_price: e.target.value
											}),
											className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									}),
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Stock",
										children: /* @__PURE__ */ jsx(Input, {
											type: "number",
											min: "0",
											value: variantDraft.stock,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												stock: e.target.value
											}),
											className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									}),
									/* @__PURE__ */ jsx(FieldGroup, {
										label: "Reserved",
										children: /* @__PURE__ */ jsx(Input, {
											type: "number",
											min: "0",
											value: variantDraft.reserved_stock,
											onChange: (e) => setVariantDraft({
												...variantDraft,
												reserved_stock: e.target.value
											}),
											className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
										})
									})
								]
							}),
							/* @__PURE__ */ jsx(FieldRow, {
								cols: 4,
								className: "lg:col-start-2",
								children: [
									"weight",
									"length",
									"width",
									"height"
								].map((field) => /* @__PURE__ */ jsx(FieldGroup, {
									label: field === "weight" ? "Weight (g)" : `${field[0].toUpperCase()}${field.slice(1)} (cm)`,
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										min: "0",
										value: variantDraft[field],
										onChange: (e) => setVariantDraft({
											...variantDraft,
											[field]: e.target.value
										}),
										className: "h-9 border-zinc-200 font-mono text-sm focus:border-[#151515] focus:ring-[#151515]"
									})
								}, field))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "order-first rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 lg:col-start-1 lg:row-span-6 lg:row-start-1 lg:self-start",
								children: /* @__PURE__ */ jsxs(FieldGroup, {
									label: "Variant Image",
									hint: "Stored in Laravel public storage. JPG, PNG, WEBP up to 4MB.",
									children: [/* @__PURE__ */ jsx("label", {
										htmlFor: "variant-image-input",
										className: "flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-white p-5 text-center transition-colors hover:border-primary hover:bg-primary/5",
										children: variantDraftPreview ? /* @__PURE__ */ jsx("img", {
											src: variantDraftPreview,
											alt: "Variant preview",
											className: "h-full w-full object-cover"
										}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
											/* @__PURE__ */ jsx("span", {
												className: "flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100",
												children: /* @__PURE__ */ jsx(Image, { className: "h-7 w-7 text-zinc-500" })
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-sm font-medium text-zinc-700",
												children: "Drag & drop an image here"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-zinc-400",
												children: "or click to browse"
											})
										] })
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx(Input, {
											id: "variant-image-input",
											type: "file",
											accept: "image/*",
											onChange: (e) => {
												const file = e.target.files?.[0] ?? null;
												const isSavedPreview = variantPreviews.some((preview) => preview === variantDraftPreview);
												if (variantDraftPreview?.startsWith("blob:") && !isSavedPreview) URL.revokeObjectURL(variantDraftPreview);
												setVariantDraft({
													...variantDraft,
													image: file
												});
												setVariantDraftPreview(file ? URL.createObjectURL(file) : variantDraft.image_url || null);
											},
											className: "h-10 border-zinc-200 bg-white text-sm file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-xs file:text-zinc-700 hover:file:bg-zinc-200"
										}), variantDraft.image_url && /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => {
												const isSavedPreview = variantPreviews.some((preview) => preview === variantDraftPreview);
												if (variantDraftPreview?.startsWith("blob:") && !isSavedPreview) URL.revokeObjectURL(variantDraftPreview);
												setVariantDraft({
													...variantDraft,
													image: null,
													image_url: ""
												});
												setVariantDraftPreview(null);
											},
											className: "text-xs font-medium text-red-500 hover:text-red-600",
											children: "Remove current image"
										})]
									})]
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 lg:col-start-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "cursor-pointer text-xs font-medium text-zinc-700",
									children: "Active Variant"
								}), /* @__PURE__ */ jsx(Switch, {
									checked: variantDraft.is_active,
									onCheckedChange: (value) => setVariantDraft({
										...variantDraft,
										is_active: value
									}),
									className: "scale-90 data-[state=checked]:bg-primary"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2 border-t border-zinc-100 bg-zinc-50 px-6 py-4",
						children: [/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: closeVariantModal,
							className: "h-9 border-zinc-200 px-4 text-xs text-zinc-700",
							children: "Cancel"
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							onClick: saveVariantDraft,
							className: "h-9 bg-primary px-5 text-xs font-medium text-white hover:bg-primary/90",
							children: editingVariantIndex === null ? "Add Variant" : "Save Changes"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { ProductForm as default };

//# sourceMappingURL=form-N3ytG-kR.js.map