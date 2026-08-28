import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, Ban, ChevronDown, Clock, FileText, Mail, MessageCircle, PackageCheck, RefreshCw, ShieldCheck, Truck } from "lucide-react";
//#region resources/js/pages/customer/policy/no-return-policy.tsx
var sidebarItems = [
	{
		id: "final-sales",
		icon: Ban,
		label: "1. Semua Penjualan Final"
	},
	{
		id: "defective-items",
		icon: AlertTriangle,
		label: "2. Barang Rusak atau Cacat"
	},
	{
		id: "incorrect-items",
		icon: PackageCheck,
		label: "3. Barang yang Diterima Salah"
	},
	{
		id: "cancellations",
		icon: RefreshCw,
		label: "4. Pembatalan"
	}
];
var sections = [
	{
		id: "final-sales",
		title: "Semua Penjualan Final",
		content: "Untuk menjaga standar kebersihan dan kualitas tertinggi bagi semua pelanggan, kami menerapkan kebijakan tanpa retur dan tanpa penukaran. Semua penjualan di situs web kami bersifat final. Periksa pesanan dengan cermat sebelum checkout."
	},
	{
		id: "defective-items",
		title: "Barang Rusak atau Cacat",
		content: "Meski setiap barang diperiksa kualitasnya sebelum dikirim, jika kamu menerima produk yang rusak saat pengiriman atau memiliki cacat produksi, hubungi tim layanan pelanggan kami dalam 48 jam dengan nomor pesanan dan bukti foto yang jelas."
	},
	{
		id: "incorrect-items",
		title: "Barang yang Diterima Salah",
		content: "Jika kamu menerima barang yang berbeda dari pesanan, hubungi kami dalam 48 jam setelah barang diterima. Kami akan mengatur pengiriman barang yang benar dan memberi instruksi pengembalian untuk barang yang salah."
	},
	{
		id: "cancellations",
		title: "Pembatalan",
		content: "Pesanan tidak dapat dibatalkan setelah diproses dan dikirim. Jika perlu membatalkan pesanan, hubungi kami segera setelah membuat pesanan. Jika pesanan belum masuk tahap pemenuhan, kami mungkin dapat membantu permintaanmu, tetapi hal ini tidak dijamin."
	}
];
function FeatureBox({ icon: Icon, title }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 border-b border-[#e7e2de] py-4 transition duration-300 hover:border-[#cdb5a4]",
		children: [/* @__PURE__ */ jsx(Icon, {
			size: 22,
			strokeWidth: 1.4,
			className: "shrink-0 text-[#9A6B45]"
		}), /* @__PURE__ */ jsx("span", {
			className: "text-sm leading-snug font-medium text-[#272727] sm:text-base",
			children: title
		})]
	});
}
function AccordionItem({ item, index, isLast }) {
	const [isOpen, setIsOpen] = useState(true);
	return /* @__PURE__ */ jsx("section", {
		id: item.id,
		className: `${isLast ? "" : "border-b border-[#e7e2de]"} scroll-mt-28 py-6`,
		children: /* @__PURE__ */ jsxs("button", {
			type: "button",
			"aria-expanded": isOpen,
			"aria-controls": `${item.id}-content`,
			className: "group flex w-full items-start justify-between gap-5 text-left",
			onClick: () => setIsOpen(!isOpen),
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx("span", {
					className: "w-8 shrink-0 pt-0.5 text-sm font-semibold text-[#bc9e90]",
					children: String(index + 1).padStart(2, "0")
				}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-base font-semibold text-[#272727] sm:text-lg",
					children: item.title
				}), /* @__PURE__ */ jsx("div", {
					id: `${item.id}-content`,
					className: `grid transition-all duration-300 ease-out ${isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-hidden",
						children: /* @__PURE__ */ jsx("p", {
							className: "max-w-3xl text-sm leading-7 text-[#6f6f6f] sm:text-base",
							children: item.content
						})
					})
				})] })]
			}), /* @__PURE__ */ jsx(ChevronDown, {
				size: 20,
				className: `mt-1 shrink-0 text-[#bc9e90] transition duration-300 ${isOpen ? "rotate-180" : ""} group-hover:text-[#9A6B45]`
			})]
		})
	});
}
function NoReturnPolicy() {
	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Kebijakan Retur & Penukaran" }),
		/* @__PURE__ */ jsxs("div", {
			className: "relative w-full overflow-hidden border-b border-[#e7e2de] bg-[#ffffff] pt-8 pb-14 sm:pt-10 lg:pb-20",
			children: [/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-[#f6eee7]" }), /* @__PURE__ */ jsx("div", {
				className: "relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-8 flex items-center text-sm font-medium text-[#6f6f6f]",
								children: [
									/* @__PURE__ */ jsx(Link, {
										href: "/",
										className: "transition-colors hover:text-[#9A6B45]",
										children: "Beranda"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "mx-2 text-[#bc9e90]",
										children: "/"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#272727]",
										children: "Kebijakan Retur & Penukaran"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-4 inline-flex border-l border-[#9A6B45] pl-3 text-xs font-semibold tracking-[0.22em] text-[#9A6B45] uppercase",
								children: "Kebijakan Retur Pelanggan"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mb-5 max-w-xl font-serif text-4xl leading-tight text-[#272727] md:text-5xl lg:text-6xl",
								children: "Kebijakan Retur & Penukaran"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "max-w-xl text-base leading-8 text-[#6f6f6f] sm:text-lg",
								children: "Baca dengan saksama sebelum membeli untuk memahami panduan retur kami."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6f6f6f]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "border-b border-[#dcc8b8] pb-1",
									children: "Terakhir diperbarui: 15 Mei 2024"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => scrollToSection("contact"),
									className: "border-b border-[#272727] pb-1 font-medium text-[#272727] transition hover:text-[#9A6B45] active:scale-[0.98]",
									children: "Hubungi tim dukungan"
								})]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "relative hidden min-h-72 md:block lg:min-h-96",
						children: /* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 flex items-center justify-end",
							children: /* @__PURE__ */ jsx("img", {
								src: "/images/privacy-hero.png",
								alt: "",
								className: "h-full max-h-[26rem] w-auto object-contain",
								onError: (e) => {
									e.currentTarget.style.display = "none";
								}
							})
						})
					})]
				})
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8 lg:py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12",
				children: [/* @__PURE__ */ jsx("div", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ jsxs("div", {
						className: "sticky top-24 border-l border-[#e7e2de] pl-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-5 flex items-center gap-3 text-base text-[#272727]",
							children: [/* @__PURE__ */ jsx(FileText, {
								size: 20,
								strokeWidth: 1.5,
								className: "text-[#9A6B45]"
							}), /* @__PURE__ */ jsx("h2", {
								className: "font-serif",
								children: "Di Halaman Ini"
							})]
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-1.5",
							children: sidebarItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => scrollToSection(item.id),
								className: "flex w-full items-center gap-3 py-2.5 text-left text-sm font-medium text-[#6f6f6f] transition duration-300 hover:translate-x-1 hover:text-[#272727] active:scale-[0.98]",
								children: [/* @__PURE__ */ jsx(item.icon, {
									size: 18,
									strokeWidth: 1.5,
									className: "shrink-0 text-[#bc9e90]"
								}), item.label]
							}) }, item.id))
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mb-10 border-b border-[#e7e2de] pb-8",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-start gap-4 sm:flex-row sm:gap-5",
								children: [/* @__PURE__ */ jsx(AlertTriangle, {
									size: 28,
									strokeWidth: 1.5,
									className: "mt-1 shrink-0 text-[#9A6B45]"
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-2 text-xl font-semibold text-[#272727]",
									children: "Periksa Sebelum Checkout"
								}), /* @__PURE__ */ jsx("p", {
									className: "max-w-3xl leading-7 text-[#6f6f6f]",
									children: "Permintaan retur dan penukaran dibatasi untuk kasus tertentu agar kebersihan, kualitas, dan akurasi pemenuhan produk tetap terlindungi."
								})] })]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Ban,
									title: "Penjualan Final"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: ShieldCheck,
									title: "Tinjauan Cacat"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Truck,
									title: "Bantuan Barang Salah"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Clock,
									title: "Batas Klaim 48 Jam"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mb-10 border-y border-[#e7e2de]",
							children: sections.map((section, index) => /* @__PURE__ */ jsx(AccordionItem, {
								item: section,
								index,
								isLast: index === sections.length - 1
							}, section.id))
						}),
						/* @__PURE__ */ jsxs("div", {
							id: "contact",
							className: "grid scroll-mt-28 gap-5 border-t border-[#e7e2de] pt-8 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "shrink-0 text-[#9A6B45]",
										children: /* @__PURE__ */ jsx(Mail, {
											size: 22,
											strokeWidth: 1.5
										})
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "mb-0.5 text-sm font-medium text-[#272727]",
										children: "Email"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-sm text-[#6f6f6f]",
										children: "support@aureasyari.com"
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 border-t border-[#e7e2de] pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-5",
									children: [/* @__PURE__ */ jsx("div", {
										className: "shrink-0 text-[#9A6B45]",
										children: /* @__PURE__ */ jsx(MessageCircle, {
											size: 22,
											strokeWidth: 1.5
										})
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "mb-0.5 text-sm font-medium text-[#272727]",
										children: "WhatsApp"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-sm text-[#6f6f6f]",
										children: "+62 812-0000-0000"
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 border-t border-[#e7e2de] pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-5",
									children: [/* @__PURE__ */ jsx("div", {
										className: "shrink-0 text-[#9A6B45]",
										children: /* @__PURE__ */ jsx(Clock, {
											size: 22,
											strokeWidth: 1.5
										})
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "mb-0.5 text-sm font-medium text-[#272727]",
										children: "Jam operasional"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-sm text-[#6f6f6f]",
										children: "Senin - Sabtu, 09:00 - 17:00"
									})] })]
								})
							]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { NoReturnPolicy as default };

//# sourceMappingURL=no-return-policy-C8x_3k2B.js.map