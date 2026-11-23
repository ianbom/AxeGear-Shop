import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { n as edit, r as index, t as destroy } from "./EmailNotificationController-BOlFisr5.js";
import { t as Label } from "./label-CffNwx8n.js";
import { a as Pagination, i as PageHeader, s as TableShell } from "./shared-BJCPnCKB.js";
import { n as RecipientForm } from "./form-CHr8wrK_.js";
import { c as DialogTrigger, i as DialogDescription, o as DialogHeader, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CSSq8IzT.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/email-notifications/index.tsx
function EmailNotificationsIndex({ recipients, filters }) {
	const form = useForm({ search: filters.search });
	const [deletingId, setDeletingId] = useState(null);
	const [showCreate, setShowCreate] = useState(false);
	function search(event) {
		event.preventDefault();
		form.get(index.url(), {
			preserveState: true,
			replace: true
		});
	}
	function remove(recipient) {
		if (!window.confirm(`Hapus ${recipient.email} dari penerima notifikasi pembelian?`)) return;
		setDeletingId(recipient.id);
		router.delete(destroy(recipient.id), {
			preserveScroll: true,
			onFinish: () => setDeletingId(null)
		});
	}
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Head, { title: "Email Notifikasi Pembelian" }), /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 p-4 md:p-6",
		children: [/* @__PURE__ */ jsx(PageHeader, {
			eyebrow: "Sistem",
			title: "Email Notifikasi Pembelian",
			description: "Penerima aktif mendapat email ketika pembayaran pesanan berhasil dikonfirmasi.",
			action: /* @__PURE__ */ jsxs(Dialog, {
				open: showCreate,
				onOpenChange: setShowCreate,
				children: [/* @__PURE__ */ jsx(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx(Button, {
						type: "button",
						className: "bg-foreground text-background hover:bg-foreground/90",
						children: "Tambah penerima"
					})
				}), /* @__PURE__ */ jsxs(DialogContent, {
					className: "max-h-[calc(100dvh-2rem)] overflow-y-auto",
					children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: "Tambah penerima email" }), /* @__PURE__ */ jsx(DialogDescription, { children: "Email ini akan menerima ringkasan pesanan yang sudah dibayar." })] }), /* @__PURE__ */ jsx(RecipientForm, {
						onSuccess: () => setShowCreate(false),
						onCancel: () => setShowCreate(false)
					})]
				})]
			})
		}), /* @__PURE__ */ jsxs(TableShell, {
			title: "Penerima email",
			description: "Kelola alamat email dan status penerima notifikasi pembelian.",
			children: [
				/* @__PURE__ */ jsxs("form", {
					onSubmit: search,
					className: "mb-6 flex flex-wrap items-end gap-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid w-full max-w-sm gap-2",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "search",
								children: "Cari email"
							}), /* @__PURE__ */ jsx(Input, {
								id: "search",
								type: "search",
								value: form.data.search,
								onChange: (event) => form.setData("search", event.target.value)
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							variant: "outline",
							disabled: form.processing,
							children: "Cari"
						}),
						filters.search && /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "ghost",
							children: /* @__PURE__ */ jsx(Link, {
								href: index(),
								children: "Reset pencarian"
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-left text-sm",
						children: [
							/* @__PURE__ */ jsx("caption", {
								className: "sr-only",
								children: "Daftar penerima notifikasi pembelian"
							}),
							/* @__PURE__ */ jsx("thead", {
								className: "border-b",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "p-3",
										children: "Email"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "p-3",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										scope: "col",
										className: "p-3 text-right",
										children: "Aksi"
									})
								] })
							}),
							/* @__PURE__ */ jsxs("tbody", { children: [recipients.data.map((recipient) => /* @__PURE__ */ jsxs("tr", {
								className: "border-b",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-3 break-all",
										children: recipient.email
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-3 whitespace-nowrap",
										children: recipient.is_active ? "Aktif" : "Tidak aktif"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-3",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ jsx(Button, {
												asChild: true,
												variant: "outline",
												size: "sm",
												children: /* @__PURE__ */ jsx(Link, {
													href: edit(recipient.id),
													"aria-label": `Edit ${recipient.email}`,
													children: "Edit"
												})
											}), /* @__PURE__ */ jsx(Button, {
												type: "button",
												variant: "destructive",
												size: "sm",
												disabled: deletingId !== null,
												onClick: () => remove(recipient),
												"aria-label": `Hapus ${recipient.email}`,
												children: deletingId === recipient.id ? "Menghapus…" : "Hapus"
											})]
										})
									})
								]
							}, recipient.id)), recipients.data.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 3,
								className: "p-6 text-center",
								children: filters.search ? "Tidak ada email yang cocok dengan pencarian." : "Belum ada penerima. Tambahkan email untuk menerima notifikasi pembelian."
							}) })] })
						]
					})
				}),
				/* @__PURE__ */ jsx(Pagination, { paginator: recipients })
			]
		})]
	})] });
}
//#endregion
export { EmailNotificationsIndex as default };

//# sourceMappingURL=email-notifications-CmWsr2rC.js.map