import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ImageIcon, Save, Upload, X } from "lucide-react";
//#region resources/js/pages/admin/banners/form.tsx
function BannerForm({ mode, banner, placements }) {
	const isEdit = mode === "edit" && banner !== null;
	const [desktopPreview, setDesktopPreview] = useState(null);
	const [mobilePreview, setMobilePreview] = useState(null);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		title: String(banner?.title ?? ""),
		subtitle: String(banner?.subtitle ?? ""),
		image_desktop: null,
		image_mobile: null,
		button_text: String(banner?.button_text ?? ""),
		button_url: String(banner?.button_url ?? ""),
		placement: String(banner?.placement ?? "homepage"),
		sort_order: String(banner?.sort_order ?? 0),
		is_active: Boolean(banner?.is_active ?? true)
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/banners/${banner.id}` : "/admin/banners", { forceFormData: true });
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Banner" : "Create Banner" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: isEdit ? "Edit Banner" : "Create Banner",
			description: "Upload banner melalui Laravel public storage agar bisa diakses dari customer landing page."
		}), /* @__PURE__ */ jsxs(Card, {
			className: "max-w-4xl",
			children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Banner Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Desktop image wajib untuk banner baru. Mobile image opsional." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field, {
								label: "Title",
								value: data.title,
								onChange: (value) => setData("title", value),
								error: errors.title
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Subtitle",
								value: data.subtitle,
								onChange: (value) => setData("subtitle", value),
								error: errors.subtitle
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Button Text",
								value: data.button_text,
								onChange: (value) => setData("button_text", value),
								error: errors.button_text
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Button URL",
								value: data.button_url,
								onChange: (value) => setData("button_url", value),
								error: errors.button_url
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ jsx(Label, { children: "Placement" }),
									/* @__PURE__ */ jsx("select", {
										value: data.placement,
										onChange: (event) => setData("placement", event.target.value),
										className: textInputClass(),
										children: placements.map((placement) => /* @__PURE__ */ jsx("option", {
											value: placement,
											children: placement
										}, placement))
									}),
									/* @__PURE__ */ jsx(InputError, { message: errors.placement })
								]
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Sort Order",
								value: data.sort_order,
								onChange: (value) => setData("sort_order", value),
								error: errors.sort_order
							})
						]
					}),
					/* @__PURE__ */ jsx(ImageUpload, {
						label: "Desktop Image",
						currentUrl: String(banner?.image_desktop_url ?? ""),
						preview: desktopPreview,
						onPreview: setDesktopPreview,
						onFile: (file) => setData("image_desktop", file),
						error: errors.image_desktop
					}),
					/* @__PURE__ */ jsx(ImageUpload, {
						label: "Mobile Image",
						currentUrl: String(banner?.image_mobile_url ?? ""),
						preview: mobilePreview,
						onPreview: setMobilePreview,
						onFile: (file) => setData("image_mobile", file),
						error: errors.image_mobile
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
							children: "Active banner"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-muted-foreground",
							children: "Banner hanya tampil jika aktif dan berada dalam periode tanggal."
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-3 border-t pt-5",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							type: "button",
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/banners",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save Banner"]
						})]
					})
				]
			}) })]
		})]
	})] });
}
function Field({ label, value, onChange, error, type = "text" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx(Input, {
				type,
				value,
				onChange: (event) => onChange(event.target.value)
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
function ImageUpload({ label, currentUrl, preview, onPreview, onFile, error }) {
	const inputRef = useRef(null);
	const display = preview || currentUrl;
	const clear = () => {
		onFile(null);
		onPreview(null);
		if (inputRef.current) inputRef.current.value = "";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-start",
				children: [/* @__PURE__ */ jsx("div", {
					className: "relative flex h-32 w-56 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted",
					children: display ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("img", {
						src: display,
						alt: label,
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: clear,
						className: "absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white",
						children: /* @__PURE__ */ jsx(X, { className: "size-3" })
					})] }) : /* @__PURE__ */ jsx(ImageIcon, { className: "size-10 text-muted-foreground/40" })
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					className: "flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm text-muted-foreground hover:border-primary/60 hover:bg-muted/50",
					children: [
						/* @__PURE__ */ jsx(Upload, { className: "size-5" }),
						" Upload JPG/PNG/WEBP",
						/* @__PURE__ */ jsx("input", {
							ref: inputRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (event) => {
								const file = event.target.files?.[0] ?? null;
								onFile(file);
								if (file) onPreview(URL.createObjectURL(file));
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
//#endregion
export { BannerForm as default };

//# sourceMappingURL=form-CQcIJsql.js.map