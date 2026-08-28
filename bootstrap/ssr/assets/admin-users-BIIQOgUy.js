import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-D4LqnWpI.js";
import { t as Badge } from "./badge-CJFf2u6W.js";
import { t as PerPageSelect } from "./pagination-e7PNUKKI.js";
import { Head, Link, useForm } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Edit, Plus, Search } from "lucide-react";
//#region resources/js/pages/admin/admin-users/index.tsx
function AdminUsersIndex({ admins, filters }) {
	const { data, setData, get, processing } = useForm({ search: filters.search ?? "" });
	const submit = (event) => {
		event.preventDefault();
		get("/admin/admin-users", {
			preserveState: true,
			replace: true
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Admin Users" }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col gap-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col justify-between gap-4 md:flex-row md:items-end",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: "Settings"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Admin Users"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 max-w-2xl text-sm text-muted-foreground",
					children: "Kelola akun internal dengan role admin dan status aktif."
				})
			] }), /* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					href: "/admin/admin-users/create",
					children: [/* @__PURE__ */ jsx(Plus, {}), "Create Admin"]
				})
			})]
		}), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "gap-4 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Admin Accounts" }), /* @__PURE__ */ jsxs(CardDescription, { children: [admins.total, " admin terdaftar"] })] }), /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "flex w-full gap-2 md:w-auto",
				children: [/* @__PURE__ */ jsx(Input, {
					value: data.search,
					onChange: (event) => setData("search", event.target.value),
					placeholder: "Search admin...",
					className: "md:w-72"
				}), /* @__PURE__ */ jsxs(Button, {
					type: "submit",
					variant: "outline",
					disabled: processing,
					children: [/* @__PURE__ */ jsx(Search, {}), "Search"]
				})]
			})]
		}), /* @__PURE__ */ jsxs(CardContent, { children: [
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b text-left text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "w-14 pr-4 pb-3 font-medium",
								children: "No"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "pr-4 pb-3 font-medium",
								children: "Name"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "pr-4 pb-3 font-medium",
								children: "Contact"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "pr-4 pb-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "hidden pr-4 pb-3 font-medium md:table-cell",
								children: "Created"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "pb-3 text-right font-medium",
								children: "Action"
							})
						]
					}) }), /* @__PURE__ */ jsx("tbody", {
						className: "divide-y",
						children: admins.data.map((admin, index) => /* @__PURE__ */ jsxs("tr", {
							className: "transition-colors hover:bg-muted/40",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "py-3 pr-4 text-xs font-medium text-muted-foreground",
									children: (admins.from ?? 1) + index
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "py-3 pr-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-medium",
										children: admin.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "text-xs text-muted-foreground",
										children: ["#", admin.id]
									})]
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "py-3 pr-4",
									children: [/* @__PURE__ */ jsx("div", { children: admin.email }), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: admin.phone ?? "-"
									})]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 pr-4",
									children: /* @__PURE__ */ jsx(Badge, {
										variant: "outline",
										className: admin.is_active ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300" : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
										children: admin.is_active ? "Active" : "Inactive"
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "hidden py-3 pr-4 text-muted-foreground md:table-cell",
									children: admin.created_at ?? "-"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-3 text-right",
									children: /* @__PURE__ */ jsx(Button, {
										asChild: true,
										variant: "outline",
										size: "sm",
										children: /* @__PURE__ */ jsxs(Link, {
											href: admin.edit_url,
											children: [/* @__PURE__ */ jsx(Edit, {}), "Edit"]
										})
									})
								})
							]
						}, admin.id))
					})]
				})
			}),
			admins.data.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground",
				children: "Tidak ada admin yang cocok dengan pencarian."
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 flex flex-col justify-between gap-3 border-t pt-4 text-sm text-muted-foreground md:flex-row md:items-center",
				children: [/* @__PURE__ */ jsxs("span", { children: [
					"Showing ",
					admins.from ?? 0,
					"-",
					admins.to ?? 0,
					" of",
					" ",
					admins.total
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [admins.links.map((link) => link.url ? /* @__PURE__ */ jsx(Button, {
						asChild: true,
						size: "sm",
						variant: link.active ? "secondary" : "outline",
						children: /* @__PURE__ */ jsx(Link, {
							href: link.url,
							children: link.label.replace("&laquo;", "").replace("&raquo;", "").trim()
						})
					}, `${link.label}-${link.url}`) : /* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: "outline",
						disabled: true,
						children: link.label.replace("&laquo;", "").replace("&raquo;", "").trim()
					}, link.label)), /* @__PURE__ */ jsx(PerPageSelect, { paginator: admins })]
				})]
			})
		] })] })]
	})] });
}
//#endregion
export { AdminUsersIndex as default };

//# sourceMappingURL=admin-users-BIIQOgUy.js.map