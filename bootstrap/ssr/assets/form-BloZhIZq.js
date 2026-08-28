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
import { ImageIcon, Plus, Save, Trash2, Upload } from "lucide-react";
//#region resources/js/pages/admin/blogs/form.tsx
var emptySection = () => ({
	heading: "",
	paragraphs: [""]
});
function BlogForm({ mode, article }) {
	const isEdit = mode === "edit" && article !== null;
	const inputRef = useRef(null);
	const [preview, setPreview] = useState(article?.image_url ?? null);
	const { data, setData, post, processing, errors } = useForm({
		_method: isEdit ? "PUT" : "POST",
		title: article?.title ?? "",
		slug: article?.slug ?? "",
		category: article?.category ?? "",
		author_name: article?.author_name ?? "AxeGear Editorial",
		excerpt: article?.excerpt ?? "",
		intro: article?.intro ?? "",
		sections: article?.sections.length ? article.sections : [emptySection()],
		quote: article?.quote ?? "",
		tips: article?.tips.length ? article.tips : [""],
		conclusion: article?.conclusion ?? "",
		image: null,
		reading_minutes: String(article?.reading_minutes ?? 5),
		published_at: article?.published_at ?? "",
		is_published: article?.is_published ?? false
	});
	const submit = (event) => {
		event.preventDefault();
		post(isEdit ? `/admin/blogs/${article.id}` : "/admin/blogs", { forceFormData: true });
	};
	const updateSection = (index, value) => setData("sections", data.sections.map((section, itemIndex) => itemIndex === index ? {
		...section,
		...value
	} : section));
	const updateParagraph = (sectionIndex, paragraphIndex, value) => updateSection(sectionIndex, { paragraphs: data.sections[sectionIndex].paragraphs.map((paragraph, itemIndex) => itemIndex === paragraphIndex ? value : paragraph) });
	const nestedError = (key) => errors[key];
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: isEdit ? "Edit Blog Article" : "Create Blog Article" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Content Management",
			title: isEdit ? "Edit Blog Article" : "Create Blog Article",
			description: "Artikel published tampil di AxeGear Journal. Draft tetap tersimpan di admin."
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "grid max-w-5xl gap-6",
			children: [
				/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Article Information" }), /* @__PURE__ */ jsx(CardDescription, { children: "Data yang tampil pada card dan header artikel." })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Field, {
							label: "Title",
							value: data.title,
							onChange: (value) => setData("title", value),
							error: errors.title
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Slug",
							value: data.slug,
							onChange: (value) => setData("slug", value),
							error: errors.slug
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Category",
							value: data.category,
							onChange: (value) => setData("category", value),
							error: errors.category
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Author",
							value: data.author_name,
							onChange: (value) => setData("author_name", value),
							error: errors.author_name
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Reading Minutes",
							type: "number",
							value: data.reading_minutes,
							onChange: (value) => setData("reading_minutes", value),
							error: errors.reading_minutes
						}),
						/* @__PURE__ */ jsx(Field, {
							label: "Published Date",
							type: "date",
							value: data.published_at,
							onChange: (value) => setData("published_at", value),
							error: errors.published_at
						}),
						/* @__PURE__ */ jsx(TextArea, {
							label: "Excerpt",
							value: data.excerpt,
							onChange: (value) => setData("excerpt", value),
							error: errors.excerpt,
							className: "md:col-span-2"
						}),
						/* @__PURE__ */ jsx(TextArea, {
							label: "Introduction",
							value: data.intro,
							onChange: (value) => setData("intro", value),
							error: errors.intro,
							className: "md:col-span-2"
						})
					]
				})] }),
				/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Cover Image" }), /* @__PURE__ */ jsx(CardDescription, { children: "Upload gambar utama artikel, maksimum 4 MB." })] }), /* @__PURE__ */ jsxs(CardContent, { children: [
					/* @__PURE__ */ jsx("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (event) => {
							const file = event.target.files?.[0] ?? null;
							setData("image", file);
							setPreview(file ? URL.createObjectURL(file) : article?.image_url ?? null);
						}
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						className: "flex min-h-52 w-full items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground",
						children: preview ? /* @__PURE__ */ jsx("img", {
							src: preview,
							alt: "Article preview",
							className: "max-h-64 w-full object-contain"
						}) : /* @__PURE__ */ jsxs("span", {
							className: "flex flex-col items-center gap-2",
							children: [
								/* @__PURE__ */ jsx(ImageIcon, {}),
								/* @__PURE__ */ jsx("span", { children: "Click to upload cover image" }),
								/* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" })
							]
						})
					}),
					/* @__PURE__ */ jsx(InputError, {
						message: errors.image,
						className: "mt-2"
					})
				] })] }),
				/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Article Sections" }), /* @__PURE__ */ jsx(CardDescription, { children: "Atur heading dan paragraf yang tampil di detail artikel." })] }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-5",
					children: [data.sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-md border p-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsxs(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									disabled: data.sections.length === 1,
									onClick: () => setData("sections", data.sections.filter((_, index) => index !== sectionIndex)),
									children: [/* @__PURE__ */ jsx(Trash2, {}), " Remove Section"]
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Heading",
								value: section.heading,
								onChange: (value) => updateSection(sectionIndex, { heading: value }),
								error: nestedError(`sections.${sectionIndex}.heading`)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-4 grid gap-3",
								children: section.paragraphs.map((paragraph, paragraphIndex) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("textarea", {
										value: paragraph,
										onChange: (event) => updateParagraph(sectionIndex, paragraphIndex, event.target.value),
										className: `${textInputClass()} min-h-24 flex-1`,
										placeholder: "Paragraph"
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										size: "icon",
										disabled: section.paragraphs.length === 1,
										onClick: () => updateSection(sectionIndex, { paragraphs: section.paragraphs.filter((_, index) => index !== paragraphIndex) }),
										children: /* @__PURE__ */ jsx(Trash2, {})
									})]
								}, paragraphIndex))
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								className: "mt-3",
								onClick: () => updateSection(sectionIndex, { paragraphs: [...section.paragraphs, ""] }),
								children: [/* @__PURE__ */ jsx(Plus, {}), " Add Paragraph"]
							})
						]
					}, sectionIndex)), /* @__PURE__ */ jsxs(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setData("sections", [...data.sections, emptySection()]),
						children: [/* @__PURE__ */ jsx(Plus, {}), " Add Section"]
					})]
				})] }),
				/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Supporting Content" }) }), /* @__PURE__ */ jsxs(CardContent, {
					className: "grid gap-5",
					children: [
						/* @__PURE__ */ jsx(TextArea, {
							label: "Quote",
							value: data.quote,
							onChange: (value) => setData("quote", value),
							error: errors.quote
						}),
						/* @__PURE__ */ jsx(TextArea, {
							label: "Conclusion",
							value: data.conclusion,
							onChange: (value) => setData("conclusion", value),
							error: errors.conclusion
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx(Label, { children: "Tips" }),
								data.tips.map((tip, index) => /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx(Input, {
										value: tip,
										onChange: (event) => setData("tips", data.tips.map((value, itemIndex) => itemIndex === index ? event.target.value : value))
									}), /* @__PURE__ */ jsx(Button, {
										type: "button",
										variant: "outline",
										size: "icon",
										disabled: data.tips.length === 1,
										onClick: () => setData("tips", data.tips.filter((_, itemIndex) => itemIndex !== index)),
										children: /* @__PURE__ */ jsx(Trash2, {})
									})]
								}, index)),
								/* @__PURE__ */ jsxs(Button, {
									type: "button",
									variant: "outline",
									onClick: () => setData("tips", [...data.tips, ""]),
									children: [/* @__PURE__ */ jsx(Plus, {}), " Add Tip"]
								})
							]
						})
					]
				})] }),
				/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
					className: "flex flex-wrap items-center justify-between gap-4 pt-6",
					children: [/* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-3 text-sm font-medium",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: data.is_published,
							onChange: (event) => setData("is_published", event.target.checked)
						}), " Publish article"]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ jsx(Link, {
								href: "/admin/blogs",
								children: "Cancel"
							})
						}), /* @__PURE__ */ jsxs(Button, {
							type: "submit",
							disabled: processing,
							children: [/* @__PURE__ */ jsx(Save, {}), " Save Article"]
						})]
					})]
				}) })
			]
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
function TextArea({ label, value, onChange, error, className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `grid gap-2 ${className}`,
		children: [
			/* @__PURE__ */ jsx(Label, { children: label }),
			/* @__PURE__ */ jsx("textarea", {
				value,
				onChange: (event) => onChange(event.target.value),
				className: `${textInputClass()} min-h-28`
			}),
			/* @__PURE__ */ jsx(InputError, { message: error })
		]
	});
}
//#endregion
export { BlogForm as default };

//# sourceMappingURL=form-BloZhIZq.js.map