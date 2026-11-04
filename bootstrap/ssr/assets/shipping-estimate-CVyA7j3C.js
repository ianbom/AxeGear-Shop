import { t as Button } from "./button-D_r5eKEZ.js";
import { n as shippingEstimate } from "./products-C3iescCV.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region resources/js/pages/admin/products/shipping-estimate.tsx
function ProductShippingEstimate({ weight, length, width, height }) {
	const signature = JSON.stringify([
		weight,
		length,
		width,
		height
	]);
	const valid = [
		weight,
		length,
		width,
		height
	].every((value) => Number.isFinite(Number(value)) && Number(value) > 0 && Number(value) <= 1e9);
	const [retry, setRetry] = useState(0);
	const [result, setResult] = useState(null);
	useEffect(() => {
		if (!valid) return;
		const controller = new AbortController();
		const timer = setTimeout(async () => {
			setResult({
				signature,
				status: "loading",
				rates: [],
				error: ""
			});
			const [weight, length, width, height] = JSON.parse(signature).map(Number);
			const token = document.cookie.split("; ").find((cookie) => cookie.startsWith("XSRF-TOKEN="))?.slice(11);
			try {
				const response = await fetch(shippingEstimate.url(), {
					method: "POST",
					credentials: "same-origin",
					signal: controller.signal,
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest",
						...token ? { "X-XSRF-TOKEN": decodeURIComponent(token) } : {}
					},
					body: JSON.stringify({
						weight,
						length,
						width,
						height
					})
				});
				const payload = await response.json().catch(() => ({}));
				if (controller.signal.aborted) return;
				if (!response.ok) {
					const message = response.status === 429 ? "Terlalu banyak permintaan. Tunggu satu menit, lalu coba lagi." : response.status === 419 || response.status === 401 ? "Sesi berakhir. Muat ulang halaman untuk menghitung ongkir." : response.status === 403 ? "Akses estimasi ongkir hanya untuk admin aktif." : Object.values(payload.errors ?? {}).flat()[0] ?? payload.message ?? "Gagal mengambil estimasi ongkir. Silakan coba lagi.";
					throw new Error(String(message));
				}
				if (!Array.isArray(payload.rates)) throw new Error("Respons estimasi ongkir tidak valid. Silakan coba lagi.");
				setResult({
					signature,
					status: "success",
					rates: payload.rates,
					error: ""
				});
			} catch (error) {
				if (!controller.signal.aborted) setResult({
					signature,
					status: "error",
					rates: [],
					error: error instanceof Error ? error.message : "Tidak dapat mengambil ongkir. Periksa koneksi, lalu coba lagi."
				});
			}
		}, 800);
		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	}, [
		signature,
		valid,
		retry
	]);
	const current = valid && result?.signature === signature ? result : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4 min-w-0 space-y-3 border-t border-zinc-100 pt-4",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-sm font-semibold text-zinc-900",
			children: "Estimasi ongkir 1 KM"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-xs leading-relaxed text-zinc-500",
			children: "Simulasi 1 produk, 1 KM garis lurus ke utara dari toko. Jarak jalan dan ongkir checkout dapat berbeda. Menggunakan dimensi produk utama, tanpa asuransi."
		})] }), /* @__PURE__ */ jsx("div", {
			role: "status",
			"aria-live": "polite",
			"aria-busy": valid && (!current || current.status === "loading"),
			children: !valid ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-zinc-500",
				children: "Isi berat, panjang, lebar, dan tinggi dengan angka lebih dari 0 untuk melihat estimasi otomatis."
			}) : !current || current.status === "loading" ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-zinc-500",
				children: "Menghitung estimasi ongkir…"
			}) : current.status === "error" ? /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm text-red-600",
					children: current.error
				}), /* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => {
						setResult(null);
						setRetry((value) => value + 1);
					},
					children: "Coba lagi"
				})]
			}) : current.rates.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-zinc-500",
				children: "Tidak ada layanan kurir untuk lokasi simulasi ini."
			}) : /* @__PURE__ */ jsx("ul", {
				className: "grid gap-2 sm:grid-cols-2",
				children: current.rates.map((rate) => /* @__PURE__ */ jsxs("li", {
					className: "flex min-w-0 flex-wrap items-center justify-between gap-2 rounded-md border border-zinc-200 p-3 text-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 break-words",
						children: [/* @__PURE__ */ jsxs("p", {
							className: "font-medium text-zinc-900",
							children: [
								rate.courier_company.toUpperCase(),
								" ·",
								" ",
								rate.courier_service_name || rate.courier_type
							]
						}), rate.duration && /* @__PURE__ */ jsx("p", {
							className: "text-xs text-zinc-500",
							children: rate.duration
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "shrink-0 font-semibold text-zinc-900",
						children: new Intl.NumberFormat("id-ID", {
							style: "currency",
							currency: "IDR",
							maximumFractionDigits: 0
						}).format(rate.price)
					})]
				}, rate.id))
			})
		})]
	});
}
//#endregion
export { ProductShippingEstimate as t };

//# sourceMappingURL=shipping-estimate-CVyA7j3C.js.map