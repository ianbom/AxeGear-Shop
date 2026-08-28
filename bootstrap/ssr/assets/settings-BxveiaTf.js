import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Save } from "lucide-react";
//#region resources/js/pages/admin/settings/index.tsx
var sectionLinks = {
	store: "/admin/settings/store",
	contact: "/admin/settings/contact",
	payment: "/admin/settings/payment",
	shipping: "/admin/settings/shipping"
};
function AdminSettingsIndex({ activeSection, sections, values }) {
	const coordinateInputProps = (field) => {
		if (field.key === "store_latitude") return {
			max: 90,
			min: -90,
			step: "any"
		};
		if (field.key === "store_longitude") return {
			max: 180,
			min: -180,
			step: "any"
		};
		return {};
	};
	const current = sections[activeSection];
	const { data, setData, put, processing, errors, recentlySuccessful } = useForm(current.fields.reduce((carry, field) => {
		carry[field.key] = values[field.key] ?? "";
		return carry;
	}, {}));
	const submit = (event) => {
		event.preventDefault();
		put("/admin/settings", { preserveScroll: true });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Admin Settings" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col justify-between gap-3 md:flex-row md:items-end",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: "Settings"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: current.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 max-w-2xl text-sm text-muted-foreground",
					children: current.description
				})
			] }), recentlySuccessful ? /* @__PURE__ */ jsx("span", {
				className: "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
				children: "Settings tersimpan"
			}) : null]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]",
			children: [/* @__PURE__ */ jsx(Card, {
				className: "h-fit py-3",
				children: /* @__PURE__ */ jsxs(CardContent, {
					className: "flex flex-col gap-1 px-3",
					children: [Object.entries(sections).map(([key, section]) => /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: key === activeSection ? "secondary" : "ghost",
						className: cn("justify-start", key === activeSection && "bg-primary/10 text-primary hover:bg-primary/15"),
						children: /* @__PURE__ */ jsx(Link, {
							href: sectionLinks[key] ?? "/admin/settings",
							children: section.title
						})
					}, key)), /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "ghost",
						className: "justify-start",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/admin/admin-users",
							children: "Admin Users"
						})
					})]
				})
			}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: current.title }), /* @__PURE__ */ jsx(CardDescription, { children: "Sensitive API keys seperti Midtrans server key dan Biteship API key tetap dikelola dari file environment." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "space-y-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid gap-5 md:grid-cols-2",
					children: current.fields.map((field) => /* @__PURE__ */ jsxs("div", {
						className: cn("grid gap-2", field.input === "textarea" && "md:col-span-2"),
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: field.key,
								children: field.label
							}),
							field.input === "textarea" ? /* @__PURE__ */ jsx("textarea", {
								id: field.key,
								value: data[field.key] ?? "",
								onChange: (event) => setData(field.key, event.target.value),
								className: "min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
							}) : field.input === "select" ? /* @__PURE__ */ jsxs("select", {
								id: field.key,
								value: data[field.key] ?? "",
								onChange: (event) => setData(field.key, event.target.value),
								className: "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Select option"
								}), field.options?.map((option) => /* @__PURE__ */ jsx("option", {
									value: option,
									children: option
								}, option))]
							}) : /* @__PURE__ */ jsx(Input, {
								id: field.key,
								type: field.input ?? "text",
								...coordinateInputProps(field),
								value: data[field.key] ?? "",
								onChange: (event) => setData(field.key, event.target.value)
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors[field.key] })
						]
					}, field.key))
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-end gap-3 border-t pt-6",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							href: "/admin/dashboard",
							children: "Cancel"
						})
					}), /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: processing,
						children: [/* @__PURE__ */ jsx(Save, {}), processing ? "Saving..." : "Save Settings"]
					})]
				})]
			}) })] })]
		})]
	})] });
}
//#endregion
export { AdminSettingsIndex as default };

//# sourceMappingURL=settings-BxveiaTf.js.map