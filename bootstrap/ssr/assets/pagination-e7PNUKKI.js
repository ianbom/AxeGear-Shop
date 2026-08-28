import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CtTsjyTX.js";
import { router } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/pagination.tsx
var perPageOptions = [
	10,
	50,
	100
];
function PerPageSelect({ paginator }) {
	return /* @__PURE__ */ jsxs(Select, {
		value: String(paginator.per_page ?? 10),
		onValueChange: (value) => {
			const url = new URL(window.location.href);
			url.searchParams.set("per_page", value);
			url.searchParams.set("page", "1");
			router.get(`${url.pathname}${url.search}`, {}, {
				preserveState: true,
				replace: true
			});
		},
		children: [/* @__PURE__ */ jsx(SelectTrigger, {
			className: "h-8 w-[92px] rounded-lg border-zinc-200 bg-white text-xs text-zinc-600 shadow-none",
			children: /* @__PURE__ */ jsx(SelectValue, {})
		}), /* @__PURE__ */ jsx(SelectContent, {
			align: "end",
			side: "top",
			children: perPageOptions.map((perPage) => /* @__PURE__ */ jsxs(SelectItem, {
				value: String(perPage),
				children: [perPage, "/page"]
			}, perPage))
		})]
	});
}
//#endregion
export { PerPageSelect as t };

//# sourceMappingURL=pagination-e7PNUKKI.js.map