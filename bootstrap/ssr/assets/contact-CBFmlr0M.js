import { t as ShopLayout } from "./shop-layout-LeQNKbyq.js";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Clock3, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
//#region resources/js/pages/contact/index.tsx
var unsplash = (id, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${width}`;
function httpUrl(value) {
	try {
		const url = new URL(value ?? "");
		return ["https:", "http:"].includes(url.protocol) ? url.href : null;
	} catch {
		return null;
	}
}
var fieldClass = "h-11 w-full rounded-none border border-[#BEBEBE] bg-white px-3 text-[13px] text-[#252525] outline-none focus:border-[#F58220] focus:ring-0";
function ContactIndex({ contactSettings }) {
	const [messageLength, setMessageLength] = useState(0);
	const [error, setError] = useState("");
	const settings = contactSettings;
	const digits = (settings.store_phone ?? "").replace(/[\s()+.-]/g, "");
	const internationalPhone = digits.startsWith("0") ? "62" + digits.slice(1) : digits;
	const whatsappPhone = /^[1-9]\d{7,14}$/.test(internationalPhone) ? internationalPhone : null;
	const email = settings.store_email?.trim();
	const emailHref = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "mailto:" + encodeURIComponent(email) : void 0;
	const latitude = Number(settings.store_latitude);
	const longitude = Number(settings.store_longitude);
	const mapQuery = Boolean(settings.store_latitude?.trim() && settings.store_longitude?.trim()) && Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180 ? latitude + "," + longitude : settings.store_address?.trim();
	const mapEmbedUrl = mapQuery ? "https://www.google.com/maps?q=" + encodeURIComponent(mapQuery) + "&output=embed" : null;
	const mapLink = httpUrl(settings.contact_maps_url) ?? (mapQuery ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapQuery) : null);
	const supportInfo = [
		{
			icon: Clock3,
			title: "Support Hours",
			content: settings.business_hours || "—"
		},
		{
			icon: Mail,
			title: "Customer Support Email",
			content: email || "—",
			href: emailHref
		},
		{
			icon: Phone,
			title: "Phone / WhatsApp",
			content: settings.store_phone || "—",
			href: whatsappPhone ? "tel:+" + whatsappPhone : void 0
		},
		{
			icon: MapPin,
			title: "Head Office",
			content: [settings.store_name, settings.store_address].filter(Boolean).join("\n") || "—"
		}
	];
	const socialLinks = [{
		icon: Instagram,
		label: "Instagram",
		url: httpUrl(settings.instagram_url)
	}, {
		icon: MessageCircle,
		label: "TikTok",
		url: httpUrl(settings.tiktok_url)
	}].filter((social) => social.url);
	const submitContact = (event) => {
		event.preventDefault();
		setError("");
		const form = new FormData(event.currentTarget);
		const name = String(form.get("full_name") ?? "").trim();
		const message = String(form.get("message") ?? "").trim();
		if (!name || !message || message.length > 1e3) {
			setError("Isi nama dan pesan. Pesan maksimal 1.000 karakter.");
			return;
		}
		if (!whatsappPhone) {
			setError("Nomor WhatsApp toko belum tersedia.");
			return;
		}
		const text = "Halo " + (settings.store_name?.trim() || "toko") + ", saya ingin menghubungi customer support.\n\nNama: " + name + "\n\nPesan:\n" + message;
		window.location.assign("https://wa.me/" + whatsappPhone + "?text=" + encodeURIComponent(text));
	};
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsx(Head, { title: "Contact Us" }), /* @__PURE__ */ jsxs("div", {
		className: "bg-white text-[13px] text-[#171717] [&_a]:text-[12px] [&_button]:text-[12px] [&_input]:text-[13px] [&_label]:text-[12px] [&_p]:text-[13px] [&_select]:text-[13px] [&_textarea]:text-[13px]",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "relative h-[320px] overflow-hidden sm:h-[340px]",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: unsplash("photo-1558981806-ec527fa84c39", 1800),
					alt: "Enduro rider exploring an outdoor trail",
					className: "absolute inset-0 h-full w-full object-cover object-[65%_45%]"
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/0" }),
				/* @__PURE__ */ jsx("div", {
					className: "relative mx-auto flex h-full max-w-[1640px] items-center px-7 py-9 sm:px-11 lg:px-[76px]",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-[390px]",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-3 text-[13px] font-bold tracking-[0.04em] uppercase",
								children: [/* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-[#F58220]" }), "Customer Support"]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-3 text-[38px] leading-[0.93] font-black tracking-[-0.035em] uppercase sm:text-[50px]",
								children: "Let’s Talk"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 max-w-[420px] text-[16px] leading-[1.5]",
								children: "Questions about products, orders, shipping, or warranty? Our team is here to help you find the answers you need."
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "#contact-form",
								className: "mt-5 inline-flex items-center gap-3 text-[14px] font-bold text-[#F58220]",
								children: [
									"Contact Support",
									" ",
									/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
								]
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1450px] px-4 py-5 sm:px-8 lg:px-[52px]",
			children: [/* @__PURE__ */ jsxs("section", {
				className: "mt-5 grid gap-5 lg:grid-cols-[1.55fr_1fr]",
				children: [/* @__PURE__ */ jsxs("form", {
					id: "contact-form",
					onSubmit: submitContact,
					className: "border border-[#D8D8D8] p-5 sm:p-8",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[11px] font-bold tracking-[0.04em] text-[#F58220] uppercase",
							children: "Send Us a Message"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-1 text-[29px] leading-none font-black",
							children: "How Can We Help?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 text-[10px] text-[#666]",
							children: "Isi nama dan pesan untuk membuka draft WhatsApp. Kirim pesan melalui WhatsApp setelah chat terbuka."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-5",
							children: /* @__PURE__ */ jsx(Field, {
								label: "Full Name",
								required: true,
								children: /* @__PURE__ */ jsx("input", {
									required: true,
									name: "full_name",
									autoComplete: "name",
									"aria-describedby": error ? "contact-error" : void 0,
									className: fieldClass,
									placeholder: "Rizky Pratama"
								})
							})
						}),
						/* @__PURE__ */ jsxs(Field, {
							label: "Message",
							required: true,
							className: "mt-4",
							children: [/* @__PURE__ */ jsx("textarea", {
								required: true,
								name: "message",
								"aria-describedby": error ? "contact-message-count contact-error" : "contact-message-count",
								maxLength: 1e3,
								onChange: (event) => setMessageLength(event.target.value.length),
								className: "h-[150px] w-full resize-none rounded-none border border-[#BEBEBE] p-3 text-[13px] outline-none focus:border-[#F58220]",
								placeholder: "Tell us how we can help you."
							}), /* @__PURE__ */ jsxs("span", {
								id: "contact-message-count",
								className: "block text-right text-[9px] text-[#777]",
								children: [messageLength, " / 1000"]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-5 flex justify-end",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: !whatsappPhone,
								className: "min-h-12 w-full rounded-none bg-[#F58220] px-6 py-3 text-[13px] font-bold text-white uppercase hover:bg-[#E67312] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
								children: "Lanjutkan ke WhatsApp"
							})
						}),
						!whatsappPhone && /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm text-[#555]",
							children: "Nomor WhatsApp toko belum tersedia."
						}),
						error && /* @__PURE__ */ jsx("p", {
							id: "contact-error",
							role: "alert",
							className: "mt-3 text-sm text-destructive",
							children: error
						})
					]
				}), /* @__PURE__ */ jsxs("aside", {
					className: "bg-[linear-gradient(145deg,#181818,#080808)] px-7 py-8 text-white sm:px-10",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-[18px] font-black text-white uppercase",
							children: "Support Information"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-4",
							children: supportInfo.map(({ icon: Icon, title, content, href }) => /* @__PURE__ */ jsxs("div", {
								className: "flex gap-5 border-b border-white/20 py-5",
								children: [/* @__PURE__ */ jsx(Icon, {
									className: "h-7 w-7 shrink-0 text-[#F58220]",
									strokeWidth: 1.7
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-[11px] font-black tracking-[0.03em] text-white uppercase",
										children: title
									}), /* @__PURE__ */ jsx("div", {
										className: "mt-1 text-[11px] leading-[1.5] wrap-anywhere whitespace-pre-line text-white/85",
										children: href ? /* @__PURE__ */ jsx("a", {
											href,
											className: "underline underline-offset-2",
											children: content
										}) : content
									})]
								})]
							}, title))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 max-w-[350px] text-[11px] leading-[1.5] text-white/75",
							children: "Jelaskan kebutuhan Anda dengan jelas agar tim support dapat membantu melalui WhatsApp."
						})
					]
				})]
			}), /* @__PURE__ */ jsxs("section", {
				className: "mt-5 grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative min-h-[260px] overflow-hidden border border-[#D8D8D8]",
					children: [mapEmbedUrl ? /* @__PURE__ */ jsx("iframe", {
						title: "Lokasi " + (settings.store_name || "toko"),
						src: mapEmbedUrl,
						className: "absolute inset-0 h-full w-full border-0 grayscale-[25%]",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade"
					}) : /* @__PURE__ */ jsx("p", {
						className: "p-5 text-sm text-[#555]",
						children: "Lokasi toko belum tersedia."
					}), mapLink && /* @__PURE__ */ jsx("a", {
						href: mapLink,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "absolute right-3 bottom-3 bg-white px-3 py-2 font-medium underline shadow-sm",
						children: "Buka Google Maps"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "border border-[#D8D8D8] p-5",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[10px] font-bold text-[#F58220] uppercase",
							children: "Stay Connected"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-2 max-w-[520px] text-[10px] leading-[1.45] text-[#555]",
							children: [
								"Follow ",
								settings.store_name || "our store",
								" for product launches, athlete stories, riding inspiration, and event updates."
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-10 grid grid-cols-2 gap-4 text-center",
							children: socialLinks.map(({ icon: Icon, label, url }) => /* @__PURE__ */ jsxs("a", {
								href: url ?? void 0,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "flex flex-col items-center gap-3 text-[8px]",
								children: [/* @__PURE__ */ jsx(Icon, {
									className: "h-9 w-9",
									strokeWidth: 2
								}), /* @__PURE__ */ jsx("span", { children: label })]
							}, label))
						})
					]
				})]
			})]
		})]
	})] });
}
function Field({ label, required = false, className = "", children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `block text-[9px] font-medium text-[#333] ${className}`,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "mb-1.5 block",
			children: [label, required && /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: " required"
			})]
		}), children]
	});
}
//#endregion
export { ContactIndex as default };

//# sourceMappingURL=contact-CBFmlr0M.js.map