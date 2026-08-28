import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { i as PageHeader } from "./shared-BHhPoPN8.js";
import { i as textInputClass } from "./shared-CZeQyB1e.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/pages/form.tsx
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function PageForm({ mode, page, types }) {
	const isEdit = mode === "edit" && page !== null;
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		title: String(page?.title ?? ""),
		slug: String(page?.slug ?? ""),
		content: String(page?.content ?? ""),
		type: String(page?.type ?? "about"),
		meta_title: String(page?.meta_title ?? ""),
		meta_description: String(page?.meta_description ?? ""),
		is_active: Boolean(page?.is_active ?? true)
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/pages/${page.id}` : "/admin/pages");
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Page" : "Create Page" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: isEdit ? "Edit Page" : "Create Page",
			description: "Kelola konten statis dan metadata SEO untuk halaman customer."
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Page Content" }), /* @__PURE__ */ jsx(CardDescription, { children: "Gunakan textarea sebagai rich-content baseline; konten bisa ditulis HTML/markdown sesuai kebutuhan render customer." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Title" }),
								/* @__PURE__ */ jsx(Input, {
									value: data.title,
									onChange: (event) => {
										setData("title", event.target.value);
										if (!data.slug) setData("slug", slugify(event.target.value));
									}
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.title })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Slug" }),
								/* @__PURE__ */ jsx(Input, {
									value: data.slug,
									onChange: (event) => setData("slug", slugify(event.target.value))
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.slug })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Type" }),
								/* @__PURE__ */ jsx("select", {
									value: data.type,
									onChange: (event) => setData("type", event.target.value),
									className: textInputClass(),
									children: types.map((type) => /* @__PURE__ */ jsx("option", {
										value: type,
										children: type
									}, type))
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.type })
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Meta Title" }),
								/* @__PURE__ */ jsx(Input, {
									value: data.meta_title,
									onChange: (event) => setData("meta_title", event.target.value)
								}),
								/* @__PURE__ */ jsx(InputError, { message: errors.meta_title })
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ jsx(Label, { children: "Content" }),
						/* @__PURE__ */ jsx("textarea", {
							value: data.content,
							onChange: (event) => setData("content", event.target.value),
							className: `${textInputClass()} min-h-80 font-mono`
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.content })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ jsx(Label, { children: "Meta Description" }),
						/* @__PURE__ */ jsx("textarea", {
							value: data.meta_description,
							onChange: (event) => setData("meta_description", event.target.value),
							className: `${textInputClass()} min-h-24`
						}),
						/* @__PURE__ */ jsx(InputError, { message: errors.meta_description })
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
						children: "Active page"
					}), /* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "Page inactive tidak ditampilkan ke customer."
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t pt-5",
					children: [/* @__PURE__ */ jsx(Button, {
						asChild: true,
						type: "button",
						variant: "outline",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/admin/pages",
							children: "Cancel"
						})
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: processing,
						children: [/* @__PURE__ */ jsx(Save, {}), " Save Page"]
					})]
				})
			]
		}) })] })]
	})] });
}
//#endregion
export { PageForm as default };

//# sourceMappingURL=form-Dm8Ofd9J2.js.map