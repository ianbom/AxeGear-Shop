import { t as Button } from "./button-D_r5eKEZ.js";
import { c as logout } from "./routes-EPw8WZ-p.js";
import { t as Spinner } from "./spinner-DkICJePw.js";
import { t as TextLink } from "./text-link-Dxbs4vvP.js";
import { t as send } from "./verification-DFWUXW6K.js";
import { Form, Head } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/auth/verify-email.tsx
function VerifyEmail({ status }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Verifikasi email" }),
		status === "verification-link-sent" && /* @__PURE__ */ jsx("div", {
			className: "mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 font-medium text-green-700",
			children: "Email verifikasi terkirim. Periksa kotak masuk dan klik tautan untuk mengaktifkan akunmu."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mb-6 space-y-4 text-sm leading-6 text-muted-foreground",
			children: [/* @__PURE__ */ jsx("p", { children: "Kami mengirim tautan verifikasi ke alamat email yang dipakai saat registrasi. Akunmu siap digunakan setelah tautan tersebut dibuka." }), /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-muted/40 px-4 py-3 text-left",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-medium text-foreground",
					children: "Tidak menerima email?"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-2 list-disc space-y-1 pl-4",
					children: [
						/* @__PURE__ */ jsx("li", { children: "Periksa folder spam, promosi, atau junk." }),
						/* @__PURE__ */ jsx("li", { children: "Tunggu beberapa menit sebelum meminta tautan baru." }),
						/* @__PURE__ */ jsx("li", { children: "Gunakan tombol di bawah untuk mengirim ulang email verifikasi." })
					]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(Form, {
			...send.form(),
			className: "space-y-5 text-center",
			children: ({ processing }) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Button, {
				disabled: processing,
				variant: "secondary",
				className: "w-full",
				children: [processing && /* @__PURE__ */ jsx(Spinner, {}), processing ? "Mengirim email verifikasi..." : "Kirim ulang email verifikasi"]
			}), /* @__PURE__ */ jsx(TextLink, {
				href: logout(),
				className: "mx-auto block text-sm",
				children: "Keluar"
			})] })
		})
	] });
}
VerifyEmail.layout = {
	title: "Verifikasi email",
	description: "Periksa kotak masuk dan klik tautan verifikasi untuk mengaktifkan akunmu."
};
//#endregion
export { VerifyEmail as default };

//# sourceMappingURL=verify-email-DeLDWCgd.js.map