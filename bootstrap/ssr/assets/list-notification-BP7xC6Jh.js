import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Check, Heart, Package, Star, Tag, Truck } from "lucide-react";
//#region resources/js/actions/App/Http/Controllers/Customer/NotificationController.ts
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/notifications"
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::index
* @see app/Http/Controllers/Customer/NotificationController.php:16
* @route '/notifications'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAllAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
var markAllAsRead = (options) => ({
	url: markAllAsRead.url(options),
	method: "post"
});
markAllAsRead.definition = {
	methods: ["post"],
	url: "/notifications/read-all"
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAllAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
markAllAsRead.url = (options) => {
	return markAllAsRead.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAllAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
markAllAsRead.post = (options) => ({
	url: markAllAsRead.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAllAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
var markAllAsReadForm = (options) => ({
	action: markAllAsRead.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAllAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:21
* @route '/notifications/read-all'
*/
markAllAsReadForm.post = (options) => ({
	action: markAllAsRead.url(options),
	method: "post"
});
markAllAsRead.form = markAllAsReadForm;
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
var markAsRead = (args, options) => ({
	url: markAsRead.url(args, options),
	method: "post"
});
markAsRead.definition = {
	methods: ["post"],
	url: "/notifications/{notification}/read"
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
markAsRead.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { notification: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { notification: args.id };
	if (Array.isArray(args)) args = { notification: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { notification: typeof args.notification === "object" ? args.notification.id : args.notification };
	return markAsRead.definition.url.replace("{notification}", parsedArgs.notification.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
markAsRead.post = (args, options) => ({
	url: markAsRead.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
var markAsReadForm = (args, options) => ({
	action: markAsRead.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\NotificationController::markAsRead
* @see app/Http/Controllers/Customer/NotificationController.php:28
* @route '/notifications/{notification}/read'
*/
markAsReadForm.post = (args, options) => ({
	action: markAsRead.url(args, options),
	method: "post"
});
markAsRead.form = markAsReadForm;
//#endregion
//#region resources/js/pages/customer/notification/list-notification.tsx
var notificationTypeConfig = {
	order: {
		icon: Package,
		color: "bg-emerald-100 text-emerald-600"
	},
	payment: {
		icon: Check,
		color: "bg-emerald-100 text-emerald-600"
	},
	promo: {
		icon: Tag,
		color: "bg-orange-100 text-orange-600"
	},
	shipping: {
		icon: Truck,
		color: "bg-blue-100 text-blue-600"
	},
	system: {
		icon: Star,
		color: "bg-surface-soft text-primary"
	},
	wishlist: {
		icon: Heart,
		color: "bg-primary-soft text-primary"
	}
};
function ListNotification({ notifications }) {
	const [activeTab, setActiveTab] = useState("all");
	const items = useMemo(() => notifications.data.map((notification) => ({
		...notification,
		isRead: notification.is_read,
		...notificationTypeConfig[notification.type] ?? {
			icon: Bell,
			color: "bg-surface-soft text-primary"
		}
	})), [notifications.data]);
	const unreadCount = items.filter((n) => !n.isRead).length;
	const filteredNotifications = items.filter((n) => {
		if (activeTab === "unread") return !n.isRead;
		return true;
	});
	const markAllAsRead$1 = () => {
		router.post(markAllAsRead.url(), {}, {
			preserveScroll: true,
			preserveState: true
		});
	};
	const markAsRead$1 = (id) => {
		const target = items.find((notification) => notification.id === id);
		if (!target || target.isRead) return;
		router.post(markAsRead.url(id), {}, {
			preserveScroll: true,
			preserveState: true
		});
	};
	return /* @__PURE__ */ jsxs(ProfileLayout, {
		title: "Notifications",
		pageTitle: "Notifications",
		subtitle: "Stay updated with your orders and exclusive offers.",
		activePath: "notifications",
		breadcrumbs: [
			{
				label: "Home",
				href: "/"
			},
			{
				label: "My Account",
				href: "/my-profile"
			},
			{ label: "Notifications" }
		],
		children: [
			" ",
			/* @__PURE__ */ jsxs("div", {
				className: "animate-fade-in-up mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
				style: { animationDelay: "100ms" },
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "flex w-fit space-x-2 rounded-[6px] border border-hairline-strong bg-white p-1",
						children: [
							" ",
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setActiveTab("all"),
								className: `rounded-md px-4 py-2 text-[13px] font-medium transition-all ${activeTab === "all" ? "bg-surface-soft text-ink" : "text-muted-foreground hover:text-ink"}`,
								children: [
									" ",
									"All",
									" "
								]
							}),
							" ",
							/* @__PURE__ */ jsxs("button", {
								onClick: () => setActiveTab("unread"),
								className: `flex items-center rounded-md px-4 py-2 text-[13px] font-medium transition-all ${activeTab === "unread" ? "bg-surface-soft text-ink" : "text-muted-foreground hover:text-ink"}`,
								children: [
									" ",
									"Unread",
									" ",
									unreadCount > 0 && /* @__PURE__ */ jsxs("span", {
										className: "ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white",
										children: [
											" ",
											unreadCount,
											" "
										]
									}),
									" "
								]
							}),
							" "
						]
					}),
					" ",
					unreadCount > 0 && /* @__PURE__ */ jsxs("button", {
						onClick: markAllAsRead$1,
						className: "flex items-center text-[12px] font-semibold text-ink transition-colors hover:text-primary",
						children: [
							" ",
							/* @__PURE__ */ jsx(Check, {
								size: 14,
								className: "mr-1.5"
							}),
							" Mark all as read",
							" "
						]
					}),
					" "
				]
			}),
			" ",
			" ",
			filteredNotifications.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "animate-fade-in-up flex flex-col items-center justify-center rounded-[8px] border border-hairline-strong bg-white px-6 py-20 text-center",
				style: { animationDelay: "150ms" },
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "relative mb-6 flex h-24 w-24 items-center justify-center",
						children: [
							" ",
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-surface-soft opacity-60 blur-xl" }),
							" ",
							/* @__PURE__ */ jsxs("div", {
								className: "relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-hairline-strong bg-white",
								children: [
									" ",
									/* @__PURE__ */ jsx(Bell, {
										size: 28,
										className: "text-muted-foreground"
									}),
									" "
								]
							}),
							" "
						]
					}),
					" ",
					/* @__PURE__ */ jsxs("h2", {
						className: "mb-2 text-xl text-ink",
						children: [
							" ",
							"No notifications yet",
							" "
						]
					}),
					" ",
					/* @__PURE__ */ jsxs("p", {
						className: "mb-8 max-w-[280px] text-[13px] text-muted-foreground",
						children: [
							" ",
							activeTab === "unread" ? "You've read all your notifications." : "When you get updates on your orders or exclusive offers, they'll show up here.",
							" "
						]
					}),
					" ",
					/* @__PURE__ */ jsxs(Link, {
						href: "/",
						children: [
							" ",
							/* @__PURE__ */ jsxs("button", {
								className: "rounded-[6px] bg-primary px-8 py-3 text-[12px] font-bold tracking-wider text-white transition-all hover:bg-[#E67312] active:scale-[0.98]",
								children: [
									" ",
									"Continue Shopping",
									" "
								]
							}),
							" "
						]
					}),
					" "
				]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "animate-fade-in-up overflow-hidden rounded-[8px] border border-hairline-strong bg-white",
				style: { animationDelay: "150ms" },
				children: [
					" ",
					/* @__PURE__ */ jsxs("div", {
						className: "divide-y divide-hairline-strong",
						children: [
							" ",
							filteredNotifications.map((notification) => {
								const IconComponent = notification.icon;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => markAsRead$1(notification.id),
									className: `group relative flex w-full items-start gap-4 p-5 text-left transition-all duration-300 hover:bg-white md:p-6 ${!notification.isRead ? "bg-white/50" : "bg-white"}`,
									children: [
										" ",
										" ",
										!notification.isRead && /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-0 w-1 bg-primary" }),
										" ",
										/* @__PURE__ */ jsxs("div", {
											className: `flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${notification.color}`,
											children: [
												" ",
												/* @__PURE__ */ jsx(IconComponent, {
													size: 20,
													className: "md:h-6 md:w-6"
												}),
												" "
											]
										}),
										" ",
										/* @__PURE__ */ jsxs("div", {
											className: "min-w-0 flex-1 pr-4",
											children: [
												" ",
												/* @__PURE__ */ jsxs("div", {
													className: "mb-1 flex flex-col sm:flex-row sm:items-start sm:justify-between",
													children: [
														" ",
														/* @__PURE__ */ jsxs("h3", {
															className: `truncate text-[14px] font-bold md:text-[15px] ${!notification.isRead ? "text-ink" : "text-muted-foreground"}`,
															children: [
																" ",
																notification.title,
																" "
															]
														}),
														" ",
														/* @__PURE__ */ jsxs("span", {
															className: "mt-1 flex-shrink-0 text-[11px] whitespace-nowrap text-muted-foreground sm:mt-0",
															children: [
																" ",
																notification.time,
																" "
															]
														}),
														" "
													]
												}),
												" ",
												/* @__PURE__ */ jsxs("p", {
													className: `text-[12px] leading-relaxed md:text-[13px] ${!notification.isRead ? "font-medium text-muted-foreground" : "text-muted-foreground"}`,
													children: [
														" ",
														notification.message,
														" "
													]
												}),
												" "
											]
										}),
										" ",
										!notification.isRead && /* @__PURE__ */ jsx("div", { className: "mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" }),
										" "
									]
								}, notification.id);
							}),
							" "
						]
					}),
					" "
				]
			}),
			" "
		]
	});
}
//#endregion
export { ListNotification as default };

//# sourceMappingURL=list-notification-BP7xC6Jh.js.map