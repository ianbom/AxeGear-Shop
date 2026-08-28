import { t as ShopLayout } from "./shop-layout-CsqyMCOU.js";
import { Head, Link } from "@inertiajs/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Feather, Mountain, ShieldCheck, Target } from "lucide-react";
//#region resources/js/pages/about/index.tsx
var heroImage = "https://plus.unsplash.com/premium_photo-1661962327591-1b7072da3242?q=80&w=1306&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
var storyImage = "https://images.unsplash.com/photo-1626130569162-f90681b6982a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
var values = [
	{
		title: "Functionality Products",
		body: "Design products that combine functionality with modern aesthetics.",
		icon: Target
	},
	{
		title: "Quality Materials",
		body: "Deliver reliable quality through carefully selected materials and craftsmanship.",
		icon: ShieldCheck
	},
	{
		title: "Sustainable Practices",
		body: "Continuously innovate to meet the evolving needs of our customers.",
		icon: Feather
	},
	{
		title: "Customer Trust",
		body: "Provide exceptional products and experiences that build long-term trust.",
		icon: Mountain
	}
];
var disciplines = [
	{
		title: "Moto",
		image: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?q=80&w=1100&auto=format&fit=crop"
	},
	{
		title: "MTB",
		image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=1100&auto=format&fit=crop"
	},
	{
		title: "Cycling",
		image: "https://images.unsplash.com/photo-1716331710125-b0b849479686?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		title: "Running",
		image: "https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=1100&auto=format&fit=crop"
	},
	{
		title: "Outdoor",
		image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1100&auto=format&fit=crop"
	},
	{
		title: "Snow",
		image: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?q=80&w=1100&auto=format&fit=crop"
	}
];
var timeline = [
	{
		year: "1",
		title: "Functionality",
		body: "Every feature is designed with a purpose—to make every journey easier and more efficient."
	},
	{
		year: "2",
		title: "Quality",
		body: "We are committed to delivering products crafted with durable materials and meticulous attention to detail."
	},
	{
		year: "3",
		title: "Innovation",
		body: "We continuously improve our designs and develop solutions that adapt to modern lifestyles."
	},
	{
		year: "4",
		title: "Adventure",
		body: "We believe great gear should inspire confidence and accompany every journey, from everyday routines to extraordinary adventures."
	},
	{
		year: "5",
		title: "Trust",
		body: "Our commitment is to provide exceptional products and experiences that build lasting trust and empower every adventure."
	}
];
function AboutPage() {
	return /* @__PURE__ */ jsxs(ShopLayout, { children: [/* @__PURE__ */ jsxs(Head, { children: [/* @__PURE__ */ jsx("title", { children: "About AxeGear Shop" }), /* @__PURE__ */ jsx("meta", {
		name: "description",
		content: "Learn how AxeGear Shop builds premium performance eyewear and gear for athletes who demand clarity, durability, and confidence."
	})] }), /* @__PURE__ */ jsxs("div", {
		className: "bg-white",
		children: [
			/* @__PURE__ */ jsx(HeroSection, {}),
			/* @__PURE__ */ jsx(WhoWeAreSection, {}),
			/* @__PURE__ */ jsx(ValuesSection, {}),
			/* @__PURE__ */ jsx(DisciplinesSection, {}),
			/* @__PURE__ */ jsx(JourneySection, {})
		]
	})] });
}
function HeroSection() {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-[#D9D9D9] bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[0.98fr_1.02fr]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex items-center px-6 py-10 md:px-10 lg:px-14 lg:py-16",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-[650px]",
					children: [
						/* @__PURE__ */ jsx(SectionTag, { children: "About AxeGear Shop" }),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-6 text-[52px] leading-[0.9] font-black text-[#1A1A1A] uppercase italic md:text-[74px] xl:text-[92px]",
							children: "Built for Every Journey."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-[600px] text-[18px] leading-8 font-medium text-[#2E2E2E]",
							children: "AXEGEAR is an Indonesian brand dedicated to creating functional bags and gear for people with active, dynamic, and adventurous lifestyles. We believe that every journey—whether it's commuting to work, riding through new routes, traveling, or exploring the outdoors—deserves reliable gear that keeps up with every move. Our products are designed with a balance of functionality, durability, and modern aesthetics. Every detail is carefully considered to ensure that each product not only looks great but also delivers practical solutions for everyday carry and outdoor activities. From sling bags and waist bags to travel accessories and essential gear, AXEGEAR is committed to providing products that offer comfort, organization, and confidence wherever life takes you. At AXEGEAR, we see every product as more than just a bag or an accessory. We create dependable companions that support your daily adventures, helping you stay prepared for every destination and every challenge."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ jsx(Link, {
								href: "/list",
								className: "inline-flex h-13 items-center justify-center bg-[#F58220] px-9 text-[14px] font-black tracking-[0.06em] text-white uppercase hover:bg-[#E67312]",
								children: "Shop Collection"
							}), /* @__PURE__ */ jsx("a", {
								href: "#our-story",
								className: "inline-flex h-13 items-center justify-center border border-[#1A1A1A] bg-white px-9 text-[14px] font-black tracking-[0.06em] text-[#1A1A1A] uppercase hover:bg-[#1A1A1A] hover:text-white",
								children: "Our Story"
							})]
						})
					]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "min-h-[360px] lg:min-h-[620px]",
				children: /* @__PURE__ */ jsx("img", {
					src: heroImage,
					alt: "Cyclist wearing AxeGear performance eyewear",
					className: "h-full w-full object-cover"
				})
			})]
		})
	});
}
function WhoWeAreSection() {
	return /* @__PURE__ */ jsx("section", {
		id: "our-story",
		className: "border-b border-[#E5E5E5] bg-white px-6 py-8 md:px-10 lg:px-12 lg:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1600px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-[560px]",
				children: [
					/* @__PURE__ */ jsx(SectionTag, { children: "Who We Are" }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-5 text-[46px] leading-[0.92] font-black text-[#1A1A1A] uppercase italic md:text-[56px]",
						children: "Our Vision."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-[17px] leading-8 font-medium text-[#2E2E2E]",
						children: "To become a trusted Indonesian gear brand by delivering innovative, high-quality, and functional products that empower people to embrace an active lifestyle."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 text-[17px] leading-8 font-black text-[#1A1A1A]",
						children: "Built Different. Built for You."
					})
				]
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", {
				src: storyImage,
				alt: "AxeGear performance eyewear on rock surface",
				className: "aspect-[16/7] w-full border border-[#E5E5E5] object-cover"
			}) })]
		})
	});
}
function ValuesSection() {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-[#E5E5E5] bg-white px-6 py-8 md:px-10 lg:px-12 lg:py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-8 flex justify-center lg:justify-start",
				children: /* @__PURE__ */ jsx(SectionTag, { children: "Our Missions" })
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 border-y border-[#E5E5E5] sm:grid-cols-2 lg:grid-cols-4",
				children: values.map((item, index) => {
					const Icon = item.icon;
					return /* @__PURE__ */ jsxs("article", {
						className: `flex flex-col items-center px-6 py-7 text-center ${index > 0 ? "lg:border-l lg:border-[#E5E5E5]" : ""} ${index > 1 ? "sm:border-t sm:border-[#E5E5E5] lg:border-t-0" : ""}`,
						children: [
							/* @__PURE__ */ jsx(Icon, {
								size: 56,
								strokeWidth: 1.5,
								className: "text-[#1A1A1A]"
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-5 text-[24px] leading-tight font-black text-[#1A1A1A] uppercase",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-[270px] text-[15px] leading-7 font-medium text-[#2E2E2E]",
								children: item.body
							})
						]
					}, item.title);
				})
			})]
		})
	});
}
function DisciplinesSection() {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-[#E5E5E5] bg-white px-6 py-9 md:px-10 lg:px-12 lg:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px]",
			children: [/* @__PURE__ */ jsx(CenteredTag, { children: "Engineered for every discipline" }), /* @__PURE__ */ jsx("div", {
				className: "mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
				children: disciplines.map((item) => /* @__PURE__ */ jsxs("article", {
					className: "relative aspect-[1.55] overflow-hidden border border-[#E5E5E5]",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: item.image,
							alt: item.title,
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" }),
						/* @__PURE__ */ jsx("p", {
							className: "absolute right-4 bottom-3 left-4 text-[28px] leading-none font-black text-white uppercase italic md:text-[32px]",
							children: item.title
						})
					]
				}, item.title))
			})]
		})
	});
}
function JourneySection() {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-[#E5E5E5] bg-white px-6 py-9 md:px-10 lg:px-12 lg:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ jsx(CenteredTag, { children: "Our Values" }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-9 hidden items-center px-6 lg:flex",
					children: [
						/* @__PURE__ */ jsx("div", { className: "h-[2px] flex-1 bg-[#F58220]" }),
						timeline.map((item) => /* @__PURE__ */ jsx("div", {
							className: "relative flex-1",
							children: /* @__PURE__ */ jsx("div", { className: "mx-auto h-3 w-3 rounded-full bg-[#F58220]" })
						}, item.year)),
						/* @__PURE__ */ jsx("div", { className: "h-[2px] flex-1 bg-[#F58220]" })
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-6 lg:grid-cols-5 lg:gap-8",
					children: timeline.map((item) => /* @__PURE__ */ jsxs("article", {
						className: "border-t border-[#E5E5E5] pt-5 lg:border-t-0 lg:pt-0",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-[18px] font-black text-[#F58220]",
								children: item.year
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-3 text-[24px] leading-tight font-black text-[#1A1A1A] uppercase",
								children: item.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-[15px] leading-7 font-medium text-[#2E2E2E]",
								children: item.body
							})
						]
					}, item.year))
				})
			]
		})
	});
}
function SectionTag({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "inline-flex items-center gap-3 text-[13px] font-black tracking-[0.06em] text-[#1A1A1A] uppercase",
		children: [/* @__PURE__ */ jsx("span", { className: "h-[3px] w-10 bg-[#F58220]" }), children]
	});
}
function CenteredTag({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center gap-3 text-center text-[14px] font-black tracking-[0.03em] text-[#1A1A1A] uppercase italic",
		children: [/* @__PURE__ */ jsx("span", { className: "h-[3px] w-8 bg-[#F58220]" }), /* @__PURE__ */ jsx("span", { children })]
	});
}
//#endregion
export { AboutPage as default };

//# sourceMappingURL=about-BU9tEJo7.js.map