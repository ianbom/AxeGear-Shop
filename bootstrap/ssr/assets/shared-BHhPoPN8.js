import { t as cn } from "./utils-DJjaB2Tv.js";
import { t as Button } from "./button-D_r5eKEZ.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/catalog/shared.tsx
function formatPrice(value) {
	return `Rp ${new Intl.NumberFormat("id-ID").format(Number(value ?? 0))}`;
}
function cleanPageLabel(label) {
	return label.replace("&laquo;", "").replace("&raquo;", "").trim();
}
function PageHeader({ eyebrow, title, description, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: eyebrow
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 max-w-2xl text-sm text-muted-foreground",
				children: description
			})
		] }), action]
	});
}
function TableShell({ title, description, children }) {
	return /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: title }), /* @__PURE__ */ jsx(CardDescription, { children: description })] }), /* @__PURE__ */ jsx(CardContent, { children })] });
}
function Pagination({ paginator }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-6 flex flex-col justify-between gap-3 border-t pt-4 text-sm text-muted-foreground md:flex-row md:items-center",
		children: [/* @__PURE__ */ jsxs("span", { children: [
			"Showing ",
			paginator.from ?? 0,
			"-",
			paginator.to ?? 0,
			" of",
			" ",
			paginator.total
		] }), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [paginator.links.map((link) => link.url ? /* @__PURE__ */ jsx(Button, {
				asChild: true,
				size: "sm",
				variant: link.active ? "secondary" : "outline",
				children: /* @__PURE__ */ jsx(Link, {
					href: link.url,
					children: cleanPageLabel(link.label)
				})
			}, `${link.label}-${link.url}`) : /* @__PURE__ */ jsx(Button, {
				size: "sm",
				variant: "outline",
				disabled: true,
				children: cleanPageLabel(link.label)
			}, link.label)), /* @__PURE__ */ jsx(PerPageSelect, { paginator })]
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ jsx(Badge, {
		variant: "outline",
		className: cn(status === "published" && "border-emerald-200 bg-emerald-50 text-emerald-700", status === "draft" && "border-amber-200 bg-amber-50 text-amber-700", status === "archived" && "border-zinc-200 bg-zinc-50 text-zinc-600"),
		children: status
	});
}
function ActiveBadge({ active }) {
	return /* @__PURE__ */ jsx(Badge, {
		variant: "outline",
		className: active ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-zinc-200 bg-zinc-50 text-zinc-600",
		children: active ? "Active" : "Inactive"
	});
}
function FlagBadge({ active, children }) {
	return /* @__PURE__ */ jsx(Badge, {
		variant: active ? "secondary" : "outline",
		children
	});
}
function Thumbnail({ src, alt }) {
	return src ? /* @__PURE__ */ jsx("img", {
		src,
		alt,
		className: "size-12 rounded-md border object-cover"
	}) : /* @__PURE__ */ jsx("div", {
		className: "flex size-12 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground",
		children: "No img"
	});
}
function EmptyState({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground",
		children
	});
}
//#endregion
export { Pagination as a, Thumbnail as c, PageHeader as i, cleanPageLabel as l, EmptyState as n, StatusBadge as o, FlagBadge as r, TableShell as s, ActiveBadge as t, formatPrice as u };

//# sourceMappingURL=shared-BHhPoPN8.js.map