import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Baby, Ban, Box, Calendar, CheckCircle2, ChevronDown, Clock, Cookie, CreditCard, FileText, Lock, Mail, Megaphone, MessageCircle, RefreshCw, Share2, Shield, ShieldCheck, Truck, User } from "lucide-react";
//#region resources/js/pages/customer/policy/privacy-policy.tsx
var sidebarItems = [
	{
		id: "introduction",
		icon: CheckCircle2,
		label: "1. Pendahuluan"
	},
	{
		id: "info-collect",
		icon: User,
		label: "2. Informasi yang Kami Kumpulkan"
	},
	{
		id: "use-info",
		icon: Box,
		label: "3. Cara Kami Menggunakan Informasi"
	},
	{
		id: "payment",
		icon: CreditCard,
		label: "4. Informasi Pembayaran"
	},
	{
		id: "shipping",
		icon: Truck,
		label: "5. Data Pengiriman & Pengantaran"
	},
	{
		id: "cookies",
		icon: Cookie,
		label: "6. Cookie & Teknologi Pelacakan"
	},
	{
		id: "protect",
		icon: ShieldCheck,
		label: "7. Cara Kami Melindungi Data"
	},
	{
		id: "sharing",
		icon: Share2,
		label: "8. Berbagi Data dengan Pihak Ketiga"
	},
	{
		id: "account",
		icon: User,
		label: "9. Data Akun & Profil Pengguna"
	},
	{
		id: "marketing",
		icon: Megaphone,
		label: "10. Komunikasi Pemasaran"
	},
	{
		id: "retention",
		icon: Calendar,
		label: "11. Retensi Data"
	},
	{
		id: "rights",
		icon: Shield,
		label: "12. Hak Pengguna"
	},
	{
		id: "children",
		icon: Baby,
		label: "13. Privasi Anak"
	},
	{
		id: "changes",
		icon: RefreshCw,
		label: "14. Perubahan Kebijakan Ini"
	},
	{
		id: "contact",
		icon: Mail,
		label: "15. Informasi Kontak"
	}
];
var sections = [
	{
		id: "introduction",
		title: "Pendahuluan",
		content: "Kebijakan Privasi ini menjelaskan cara Auréa Syar'i mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadimu saat menggunakan situs web kami."
	},
	{
		id: "info-collect",
		title: "Informasi yang Kami Kumpulkan",
		content: "Kami mengumpulkan informasi pribadi yang kamu berikan langsung, seperti nama, alamat email, nomor telepon, alamat pengiriman, dan detail pesanan."
	},
	{
		id: "use-info",
		title: "Cara Kami Menggunakan Informasi",
		content: "Kami menggunakan informasimu untuk memproses pesanan, mengirim produk, meningkatkan layanan, berkomunikasi denganmu, dan mempersonalisasi pengalamanmu."
	},
	{
		id: "payment",
		title: "Informasi Pembayaran",
		content: "Pembayaran aman diproses melalui Midtrans."
	},
	{
		id: "shipping",
		title: "Data Pengiriman & Pengantaran",
		content: "Opsi pengiriman dan estimasi pengantaran dapat dihitung menggunakan Biteship."
	},
	{
		id: "cookies",
		title: "Cookie & Teknologi Pelacakan",
		content: "Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman jelajah, menganalisis trafik situs, dan mendukung upaya pemasaran kami."
	},
	{
		id: "protect",
		title: "Cara Kami Melindungi Data",
		content: "Kami menerapkan langkah keamanan berstandar industri untuk melindungi informasi pribadimu dari akses atau pengungkapan tanpa izin."
	},
	{
		id: "sharing",
		title: "Berbagi Data dengan Pihak Ketiga",
		content: "Kami tidak menjual informasi pribadimu. Kami dapat membagikan data kepada penyedia layanan tepercaya yang membantu operasional bisnis kami."
	},
	{
		id: "account",
		title: "Data Akun & Profil Pengguna",
		content: "Informasi akunmu membantu kami menyediakan pengalaman belanja yang personal dan menyimpan preferensi untuk pesanan berikutnya."
	},
	{
		id: "marketing",
		title: "Komunikasi Pemasaran",
		content: "Kamu dapat berhenti berlangganan komunikasi pemasaran kapan saja."
	},
	{
		id: "retention",
		title: "Retensi Data",
		content: "Kami menyimpan informasimu hanya selama diperlukan untuk memenuhi tujuan dalam kebijakan ini atau sesuai kewajiban hukum."
	},
	{
		id: "rights",
		title: "Hak Pengguna",
		content: "Kamu berhak mengakses, memperbarui, memperbaiki, atau menghapus informasi pribadimu. Hubungi kami untuk bantuan."
	},
	{
		id: "children",
		title: "Privasi Anak",
		content: "Situs web kami tidak ditujukan untuk anak di bawah 13 tahun. Kami tidak secara sadar mengumpulkan informasi pribadi dari anak-anak."
	},
	{
		id: "changes",
		title: "Perubahan Kebijakan Ini",
		content: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan ditampilkan di halaman ini beserta tanggal pembaruan."
	},
	{
		id: "contact",
		title: "Informasi Kontak",
		content: "Jika ada pertanyaan tentang Kebijakan Privasi ini, hubungi kami melalui detail di bawah."
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
function PrivacyPolicy() {
	const scrollToSection = (id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Kebijakan Privasi" }),
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
										children: "Kebijakan Privasi"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-4 inline-flex border-l border-[#9A6B45] pl-3 text-xs font-semibold tracking-[0.22em] text-[#9A6B45] uppercase",
								children: "Kebijakan Data Pelanggan"
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mb-5 max-w-xl font-serif text-4xl leading-tight text-[#272727] md:text-5xl lg:text-6xl",
								children: "Kebijakan Privasi"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "max-w-xl text-base leading-8 text-[#6f6f6f] sm:text-lg",
								children: "Pelajari cara kami mengumpulkan, menggunakan, melindungi, dan mengelola informasi pribadimu saat berbelanja di Auréa Syar'i."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6f6f6f]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "border-b border-[#dcc8b8] pb-1",
									children: "Terakhir diperbarui: 28 April 2026"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => scrollToSection("contact"),
									className: "border-b border-[#272727] pb-1 font-medium text-[#272727] transition hover:text-[#9A6B45] active:scale-[0.98]",
									children: "Hubungi tim privasi"
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
							children: sidebarItems.map((item) => {
								return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => scrollToSection(item.id),
									className: "flex w-full items-center gap-3 py-2.5 text-left text-sm font-medium text-[#6f6f6f] transition duration-300 hover:translate-x-1 hover:text-[#272727] active:scale-[0.98]",
									children: [/* @__PURE__ */ jsx(item.icon, {
										size: 18,
										strokeWidth: 1.5,
										className: "shrink-0 text-[#bc9e90]"
									}), item.label]
								}) }, item.id);
							})
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mb-10 border-b border-[#e7e2de] pb-8",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-start gap-4 sm:flex-row sm:gap-5",
								children: [/* @__PURE__ */ jsx(ShieldCheck, {
									size: 28,
									strokeWidth: 1.5,
									className: "mt-1 shrink-0 text-[#9A6B45]"
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-2 text-xl font-semibold text-[#272727]",
									children: "Privasimu Penting"
								}), /* @__PURE__ */ jsx("p", {
									className: "max-w-3xl leading-7 text-[#6f6f6f]",
									children: "Kami hanya mengumpulkan informasi yang diperlukan untuk memproses pesanan, mengirim pembelian, meningkatkan pengalaman belanja, dan menyediakan dukungan pelanggan."
								})] })]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mb-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Lock,
									title: "Pembayaran Aman"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: ShieldCheck,
									title: "Data Pribadi Terlindungi"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Truck,
									title: "Mitra Pengiriman Tepercaya"
								}),
								/* @__PURE__ */ jsx(FeatureBox, {
									icon: Ban,
									title: "Tidak Menjual Data"
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
							className: "grid gap-5 border-t border-[#e7e2de] pt-8 md:grid-cols-3",
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
										children: "privacy@aureasyari.com"
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
export { PrivacyPolicy as default };

//# sourceMappingURL=privacy-policy-DdH7lGo7.js.map