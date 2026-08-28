import { t as Button } from "./button-D_r5eKEZ.js";
import { t as Input } from "./input-DDYt-tEh.js";
import { t as edit } from "./profile-BIxHBbMP.js";
import { t as Heading } from "./heading-COoAH6p0.js";
import { t as InputError } from "./input-error-NrpA4cu1.js";
import { t as Label } from "./label-C9yoF3Ap.js";
import { t as PasswordInput } from "./password-input-BX5lEUa-.js";
import { t as send } from "./verification-DFWUXW6K.js";
import { t as ProfileController } from "./ProfileController-BnYxdFC1.js";
import { a as DialogFooter, c as DialogTrigger, i as DialogDescription, n as DialogClose, r as DialogContent, s as DialogTitle, t as Dialog } from "./dialog-CK7BMMcU.js";
import { Form, Head, Link, usePage } from "@inertiajs/react";
import { useRef } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/components/delete-user.tsx
function DeleteUser() {
	const passwordInput = useRef(null);
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsx(Heading, {
			variant: "small",
			title: "Hapus akun",
			description: "Hapus akunmu dan semua sumber dayanya"
		}), /* @__PURE__ */ jsxs("div", {
			className: "space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative space-y-0.5 text-red-600 dark:text-red-100",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-medium",
					children: "Peringatan"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm",
					children: "Lanjutkan dengan hati-hati, tindakan ini tidak dapat dibatalkan."
				})]
			}), /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx(Button, {
					variant: "destructive",
					"data-test": "delete-user-button",
					children: "Hapus akun"
				})
			}), /* @__PURE__ */ jsxs(DialogContent, { children: [
				/* @__PURE__ */ jsx(DialogTitle, { children: "Yakin ingin menghapus akun?" }),
				/* @__PURE__ */ jsx(DialogDescription, { children: "Setelah akun dihapus, semua sumber daya dan datanya juga akan dihapus permanen. Masukkan kata sandi untuk mengonfirmasi penghapusan akun permanen." }),
				/* @__PURE__ */ jsx(Form, {
					...ProfileController.destroy.form(),
					options: { preserveScroll: true },
					onError: () => passwordInput.current?.focus(),
					resetOnSuccess: true,
					className: "space-y-6",
					children: ({ resetAndClearErrors, processing, errors }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "password",
								className: "sr-only",
								children: "Kata sandi"
							}),
							/* @__PURE__ */ jsx(PasswordInput, {
								id: "password",
								name: "password",
								ref: passwordInput,
								placeholder: "Kata sandi",
								autoComplete: "current-password"
							}),
							/* @__PURE__ */ jsx(InputError, { message: errors.password })
						]
					}), /* @__PURE__ */ jsxs(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ jsx(DialogClose, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Button, {
								variant: "secondary",
								onClick: () => resetAndClearErrors(),
								children: "Batal"
							})
						}), /* @__PURE__ */ jsx(Button, {
							variant: "destructive",
							disabled: processing,
							asChild: true,
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								"data-test": "confirm-delete-user-button",
								children: "Hapus akun"
							})
						})]
					})] })
				})
			] })] })]
		})]
	});
}
//#endregion
//#region resources/js/pages/settings/profile.tsx
function Profile({ mustVerifyEmail, status }) {
	const { auth } = usePage().props;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
		/* @__PURE__ */ jsx("h1", {
			className: "sr-only",
			children: "Profile settings"
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsx(Heading, {
				variant: "small",
				title: "Profile information",
				description: "Update your name and email address"
			}), /* @__PURE__ */ jsx(Form, {
				...ProfileController.update["/settings/profile"].form(),
				options: { preserveScroll: true },
				className: "space-y-6",
				children: ({ processing, errors }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "name",
								children: "Name"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "name",
								className: "mt-1 block w-full",
								defaultValue: auth.user.name,
								name: "name",
								required: true,
								autoComplete: "name",
								placeholder: "Full name"
							}),
							/* @__PURE__ */ jsx(InputError, {
								className: "mt-2",
								message: errors.name
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "email",
								children: "Email address"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								className: "mt-1 block w-full",
								defaultValue: auth.user.email,
								name: "email",
								required: true,
								autoComplete: "username",
								placeholder: "Email address"
							}),
							/* @__PURE__ */ jsx(InputError, {
								className: "mt-2",
								message: errors.email
							})
						]
					}),
					mustVerifyEmail && auth.user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
						className: "-mt-4 text-sm text-muted-foreground",
						children: [
							"Your email address is unverified.",
							" ",
							/* @__PURE__ */ jsx(Link, {
								href: send(),
								as: "button",
								className: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
								children: "Click here to resend the verification email."
							})
						]
					}), status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
						className: "mt-2 text-sm font-medium text-green-600",
						children: "A new verification link has been sent to your email address."
					})] }),
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-4",
						children: /* @__PURE__ */ jsx(Button, {
							disabled: processing,
							"data-test": "update-profile-button",
							children: "Save"
						})
					})
				] })
			})]
		}),
		/* @__PURE__ */ jsx(DeleteUser, {})
	] });
}
Profile.layout = { breadcrumbs: [{
	title: "Profile settings",
	href: edit()
}] };
//#endregion
export { Profile as default };

//# sourceMappingURL=profile-DLdj7AmI.js.map