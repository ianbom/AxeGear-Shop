import { n as queryParams, t as applyUrlDefaults } from "./wayfinder-Bgbpuenu.js";
import { t as ProfileLayout } from "./profile-layout-CknzRhQx.js";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, Edit2, LocateFixed, MapPin, Plus, Search, Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";
//#region resources/js/actions/App/Http/Controllers/Customer/AddressController.ts
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
var index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/address"
};
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
var indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::index
* @see app/Http/Controllers/Customer/AddressController.php:17
* @route '/address'
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
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
var store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/address"
};
/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
var storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::store
* @see app/Http/Controllers/Customer/AddressController.php:22
* @route '/address'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
var update = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
update.definition = {
	methods: ["put"],
	url: "/address/{customerAddress}"
};
/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
update.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return update.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
update.put = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
var updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::update
* @see app/Http/Controllers/Customer/AddressController.php:37
* @route '/address/{customerAddress}'
*/
updateForm.put = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
var destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/address/{customerAddress}"
};
/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroy.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") args = { customerAddress: args };
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) args = { customerAddress: args.id };
	if (Array.isArray(args)) args = { customerAddress: args[0] };
	args = applyUrlDefaults(args);
	const parsedArgs = { customerAddress: typeof args.customerAddress === "object" ? args.customerAddress.id : args.customerAddress };
	return destroy.definition.url.replace("{customerAddress}", parsedArgs.customerAddress.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
var destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\Customer\AddressController::destroy
* @see app/Http/Controllers/Customer/AddressController.php:52
* @route '/address/{customerAddress}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
//#endregion
//#region resources/js/actions/App/Http/Controllers/Customer/BiteshipAreaController.ts
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
var BiteshipAreaController = (options) => ({
	url: BiteshipAreaController.url(options),
	method: "get"
});
BiteshipAreaController.definition = {
	methods: ["get", "head"],
	url: "/biteship/areas"
};
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.url = (options) => {
	return BiteshipAreaController.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.get = (options) => ({
	url: BiteshipAreaController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaController.head = (options) => ({
	url: BiteshipAreaController.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
var BiteshipAreaControllerForm = (options) => ({
	action: BiteshipAreaController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaControllerForm.get = (options) => ({
	action: BiteshipAreaController.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\Customer\BiteshipAreaController::__invoke
* @see app/Http/Controllers/Customer/BiteshipAreaController.php:12
* @route '/biteship/areas'
*/
BiteshipAreaControllerForm.head = (options) => ({
	action: BiteshipAreaController.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
BiteshipAreaController.form = BiteshipAreaControllerForm;
//#endregion
//#region resources/js/pages/customer/manage-address/manage-address.tsx
var EMPTY_FORM = {
	label: "",
	recipient_name: "",
	recipient_phone: "",
	full_address: "",
	province: "",
	city: "",
	district: "",
	subdistrict: "",
	postal_code: "",
	biteship_area_id: "",
	latitude: "",
	longitude: "",
	note: "",
	is_default: false
};
var asText = (value) => value === null || value === void 0 ? "" : String(value);
var digitsOnly = (value) => asText(value).replace(/\D/g, "");
var formDataFromAddress = (address) => {
	if (!address) return { ...EMPTY_FORM };
	return {
		label: address.label ?? "",
		recipient_name: address.recipient_name,
		recipient_phone: digitsOnly(address.recipient_phone),
		full_address: address.full_address,
		province: address.province,
		city: address.city,
		district: address.district,
		subdistrict: address.subdistrict ?? "",
		postal_code: digitsOnly(address.postal_code),
		biteship_area_id: address.biteship_area_id ?? "",
		latitude: asText(address.latitude),
		longitude: asText(address.longitude),
		note: address.note ?? "",
		is_default: address.is_default
	};
};
var normalizePayload = (data) => {
	return {
		...data,
		label: data.label.trim() === "" ? null : data.label.trim(),
		recipient_phone: digitsOnly(data.recipient_phone),
		postal_code: digitsOnly(data.postal_code),
		subdistrict: data.subdistrict.trim() === "" ? null : data.subdistrict.trim(),
		note: data.note.trim() === "" ? null : data.note.trim(),
		biteship_area_id: data.biteship_area_id.trim() === "" ? null : data.biteship_area_id.trim(),
		latitude: data.latitude.trim() === "" ? null : data.latitude.trim(),
		longitude: data.longitude.trim() === "" ? null : data.longitude.trim()
	};
};
var payloadFromAddress = (address, overrides = {}) => normalizePayload({
	...formDataFromAddress(address),
	...overrides
});
var areaSearchText = (area) => asText(area.postal_code ?? area.name ?? area.id);
var formatCoordinate = (value) => value.toFixed(7);
var validCoordinates = (latitude, longitude) => Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
var DEFAULT_MAP_CENTER = [-7.257472, 112.752088];
function ManageAddress({ addresses, redirectTo = "" }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
	const [deletingId, setDeletingId] = useState(null);
	const [defaultingId, setDefaultingId] = useState(null);
	const [areaQuery, setAreaQuery] = useState("");
	const [areaResults, setAreaResults] = useState([]);
	const [areaLoading, setAreaLoading] = useState(false);
	const [areaError, setAreaError] = useState("");
	const [mapError, setMapError] = useState("");
	const form = useForm({ ...EMPTY_FORM });
	const editingAddress = useMemo(() => editingId === null ? null : addresses.find((address) => address.id === editingId) ?? null, [addresses, editingId]);
	const canMutateCard = deletingId === null && defaultingId === null;
	const openModal = (id = null) => {
		const selectedAddress = id === null ? void 0 : addresses.find((address) => address.id === id);
		setEditingId(id);
		setShowDeleteConfirm(null);
		form.clearErrors();
		form.setData(formDataFromAddress(selectedAddress));
		setAreaQuery("");
		setAreaResults([]);
		setAreaError("");
		setMapError("");
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setEditingId(null);
		form.clearErrors();
		form.setData({ ...EMPTY_FORM });
		setAreaQuery("");
		setAreaResults([]);
		setAreaError("");
		setMapError("");
	};
	const submit = (event) => {
		event.preventDefault();
		const action = editingAddress ? update(editingAddress.id) : store();
		form.transform((data) => ({
			...normalizePayload(data),
			redirect_to: redirectTo || null
		}));
		form.submit(action, {
			preserveScroll: true,
			onSuccess: () => {
				closeModal();
			},
			onFinish: () => {
				form.transform((data) => data);
			}
		});
	};
	const chooseArea = (area) => {
		const postalCode = digitsOnly(area.postal_code ?? form.data.postal_code);
		form.setData({
			...form.data,
			biteship_area_id: area.id,
			province: area.administrative_division_level_1_name ?? form.data.province,
			city: area.administrative_division_level_2_name ?? form.data.city,
			district: area.administrative_division_level_3_name ?? form.data.district,
			postal_code: postalCode
		});
		setAreaQuery(digitsOnly(areaSearchText(area)));
		setAreaResults([]);
		setAreaError("");
	};
	const searchArea = async (query = areaQuery) => {
		const normalizedQuery = digitsOnly(query).trim();
		if (normalizedQuery.length < 3) return;
		setAreaLoading(true);
		setAreaError("");
		try {
			const response = await fetch(BiteshipAreaController.url({ query: { search: normalizedQuery } }), { headers: { Accept: "application/json" } });
			const payload = await response.json();
			if (!response.ok) {
				setAreaError(payload.message ?? "Gagal mencari area Biteship.");
				setAreaResults([]);
				return;
			}
			setAreaResults(payload.areas ?? []);
		} catch {
			setAreaError("Gagal terhubung ke Biteship.");
			setAreaResults([]);
		} finally {
			setAreaLoading(false);
		}
	};
	useEffect(() => {
		const query = areaQuery.trim();
		if (!isModalOpen || query.length < 5) return;
		const timeout = window.setTimeout(() => {
			searchArea(query);
		}, 500);
		return () => window.clearTimeout(timeout);
	}, [areaQuery, isModalOpen]);
	const updateCoordinates = (latitude, longitude) => {
		if (!validCoordinates(latitude, longitude)) {
			setMapError("Koordinat tidak valid. Pilih titik lain di map.");
			return;
		}
		form.setData({
			...form.data,
			latitude: formatCoordinate(latitude),
			longitude: formatCoordinate(longitude)
		});
		setMapError("");
	};
	const useCurrentLocation = () => {
		if (!navigator.geolocation) {
			setMapError("Browser tidak mendukung deteksi lokasi.");
			return;
		}
		setMapError("Mencari lokasi perangkat...");
		navigator.geolocation.getCurrentPosition((position) => {
			updateCoordinates(position.coords.latitude, position.coords.longitude);
		}, () => {
			setMapError("Gagal mengambil lokasi perangkat. Izinkan akses lokasi atau pilih pin manual.");
		}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	};
	const handleDelete = (addressId) => {
		if (!canMutateCard) return;
		setDeletingId(addressId);
		router.delete(destroy(addressId), {
			preserveScroll: true,
			onFinish: () => {
				setDeletingId(null);
				setShowDeleteConfirm(null);
			}
		});
	};
	const setAsDefault = (address) => {
		if (!canMutateCard || address.is_default) return;
		setDefaultingId(address.id);
		router.put(update(address.id), payloadFromAddress(address, { is_default: true }), {
			preserveScroll: true,
			onFinish: () => {
				setDefaultingId(null);
			}
		});
	};
	return /* @__PURE__ */ jsxs(ProfileLayout, {
		title: "Buku Alamat",
		pageTitle: "Kelola Alamat",
		subtitle: "Kelola alamat pengiriman dan penagihan agar checkout lebih cepat.",
		activePath: "address",
		breadcrumbs: [
			{
				label: "Beranda",
				href: "/"
			},
			{
				label: "Akun Saya",
				href: "/my-profile"
			},
			{ label: "Buku Alamat" }
		],
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "animate-fade-in-up mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center",
				style: { animationDelay: "150ms" },
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "text-xl text-ink",
					children: "Alamat Tersimpan"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-[12px] text-muted-foreground",
					children: [
						"Kamu punya ",
						addresses.length,
						" alamat tersimpan"
					]
				})] }), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => openModal(),
					className: "flex items-center justify-center rounded-[6px] bg-primary px-6 py-2.5 text-[12px] font-bold tracking-wider text-white transition-all hover:bg-[#E67312] active:scale-[0.98]",
					children: [/* @__PURE__ */ jsx(Plus, {
						size: 16,
						className: "mr-2"
					}), " Tambah Alamat Baru"]
				})]
			}),
			addresses.length === 0 ? /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => openModal(),
				className: "group animate-fade-in-up flex min-h-[240px] w-full flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-hairline-strong p-6 text-center transition-all duration-300 hover:border-primary hover:bg-white",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white",
						children: /* @__PURE__ */ jsx(Plus, { size: 24 })
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "mb-1 text-[14px] font-bold text-ink transition-colors group-hover:text-ink",
						children: "Tambah Alamat Pertama"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "max-w-[220px] text-[11px] text-muted-foreground",
						children: "Simpan alamat pengiriman agar checkout lebih cepat."
					})
				]
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 items-start gap-6 lg:grid-cols-2",
				children: addresses.map((address, index) => {
					const deletingThis = deletingId === address.id;
					const defaultingThis = defaultingId === address.id;
					return /* @__PURE__ */ jsxs("div", {
						className: `group relative rounded-[8px] border bg-white p-6 transition-all duration-300 hover:shadow-md md:p-8 ${address.is_default ? "border-primary" : "border-hairline-strong"} animate-fade-in-up`,
						style: { animationDelay: `${200 + index * 50}ms` },
						children: [
							address.is_default && /* @__PURE__ */ jsx("div", {
								className: "absolute top-0 right-8 -translate-y-1/2",
								children: /* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white",
									children: "Alamat Utama"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4 flex items-start justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("div", {
										className: `mr-3 flex h-10 w-10 items-center justify-center rounded-full ${address.is_default ? "bg-surface-soft text-primary" : "bg-white text-muted-foreground"}`,
										children: /* @__PURE__ */ jsx(MapPin, { size: 20 })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "text-[14px] font-bold text-ink",
										children: address.label ?? "Alamat"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-0.5 text-[12px] font-semibold text-muted-foreground",
										children: address.recipient_name
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex space-x-2",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: !canMutateCard,
										onClick: () => openModal(address.id),
										className: "flex h-8 w-8 items-center justify-center rounded-full bg-white text-muted-foreground transition-colors hover:bg-surface-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-60",
										children: /* @__PURE__ */ jsx(Edit2, { size: 14 })
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: !canMutateCard,
										onClick: () => setShowDeleteConfirm(address.id),
										className: "flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60",
										children: /* @__PURE__ */ jsx(Trash2, { size: 14 })
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-6 space-y-1.5 pl-13 text-[13px] text-muted-foreground",
								children: [/* @__PURE__ */ jsx("p", {
									className: "mb-2 text-[11px] font-medium text-muted-foreground",
									children: address.recipient_phone
								}), /* @__PURE__ */ jsxs("p", {
									className: "leading-relaxed",
									children: [
										address.full_address,
										/* @__PURE__ */ jsx("br", {}),
										address.district,
										", ",
										address.city,
										",",
										" ",
										address.province,
										" ",
										address.postal_code
									]
								})]
							}),
							!address.is_default && /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: !canMutateCard,
								onClick: () => setAsDefault(address),
								className: "w-full rounded-[6px] border border-hairline-strong py-2.5 text-[12px] font-bold text-muted-foreground transition-colors hover:border-primary hover:bg-white disabled:cursor-not-allowed disabled:opacity-60",
								children: defaultingThis ? "Menjadikan utama..." : "Jadikan utama"
							}),
							showDeleteConfirm === address.id && /* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[8px] bg-white/95 p-6 text-center backdrop-blur-sm",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600",
										children: /* @__PURE__ */ jsx(AlertCircle, { size: 24 })
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "mb-1 text-[14px] font-bold text-ink",
										children: "Hapus alamat ini?"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mb-4 text-[11px] text-muted-foreground",
										children: "Tindakan ini tidak dapat dibatalkan."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex w-full space-x-3",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											disabled: deletingThis,
											onClick: () => setShowDeleteConfirm(null),
											className: "flex-1 rounded-[6px] border border-hairline-strong py-2 text-[12px] font-bold text-muted-foreground transition-colors hover:bg-white",
											children: "Batal"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											disabled: deletingThis,
											onClick: () => handleDelete(address.id),
											className: "flex-1 rounded-[6px] bg-red-500 py-2 text-[12px] font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70",
											children: deletingThis ? "Menghapus..." : "Hapus"
										})]
									})
								]
							})
						]
					}, address.id);
				})
			}),
			isModalOpen && typeof document !== "undefined" && createPortal(/* @__PURE__ */ jsxs("div", {
				className: "fixed inset-0 z-[10000] flex items-center justify-center p-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
					onClick: closeModal
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-[10001] flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] border border-hairline-strong bg-white",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-b border-hairline-strong bg-white px-6 py-4",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg text-ink",
							children: editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: closeModal,
							className: "p-1 text-muted-foreground transition-colors hover:text-ink",
							children: /* @__PURE__ */ jsx(X, { size: 20 })
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "flex min-h-0 flex-1 flex-col",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "custom-scrollbar space-y-4 overflow-y-auto p-6",
							children: [
								/* @__PURE__ */ jsx(InputBlock, {
									label: "Label Alamat",
									value: form.data.label,
									onChange: (value) => form.setData("label", value),
									placeholder: "mis. Rumah, Kantor",
									error: form.errors.label
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2",
									children: [/* @__PURE__ */ jsx(InputBlock, {
										label: "Nama Penerima",
										value: form.data.recipient_name,
										onChange: (value) => form.setData("recipient_name", value),
										error: form.errors.recipient_name
									}), /* @__PURE__ */ jsx(InputBlock, {
										label: "Nomor Telepon",
										value: form.data.recipient_phone,
										onChange: (value) => form.setData("recipient_phone", digitsOnly(value)),
										error: form.errors.recipient_phone,
										inputMode: "numeric",
										pattern: "[0-9]*"
									})]
								}),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("label", {
										className: "mb-1.5 block text-[11px] font-semibold text-muted-foreground",
										children: "Kode Pos"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: "text",
											value: areaQuery,
											onChange: (event) => setAreaQuery(digitsOnly(event.target.value)),
											inputMode: "numeric",
											pattern: "[0-9]*",
											placeholder: "Masukkan kode pos",
											className: "w-full rounded-[6px] border border-hairline-strong bg-white px-4 py-2.5 text-[13px] text-ink transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
										}), /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => searchArea(areaQuery),
											disabled: areaLoading || areaQuery.trim().length < 3,
											className: "flex items-center gap-2 rounded-md bg-surface-soft px-4 py-2.5 text-[12px] font-bold text-muted-foreground disabled:opacity-60",
											children: [/* @__PURE__ */ jsx(Search, { size: 14 }), areaLoading ? "..." : "Cari"]
										})]
									}),
									form.data.biteship_area_id && /* @__PURE__ */ jsxs("p", {
										className: "mt-1.5 text-[11px] text-muted-foreground",
										children: [
											"Area ID:",
											" ",
											form.data.biteship_area_id
										]
									}),
									areaResults.length > 0 && /* @__PURE__ */ jsx("div", {
										className: "mt-2 max-h-48 overflow-y-auto rounded-[6px] border border-hairline-strong bg-white",
										children: areaResults.map((area) => /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => chooseArea(area),
											className: "block w-full border-b border-hairline px-4 py-2 text-left text-[12px] hover:bg-white",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-ink",
												children: area.name ?? area.id
											}), /* @__PURE__ */ jsx("span", {
												className: "block text-muted-foreground",
												children: [
													area.administrative_division_level_3_name,
													area.administrative_division_level_2_name,
													area.administrative_division_level_1_name,
													area.postal_code
												].filter(Boolean).join(", ")
											})]
										}, area.id))
									}),
									areaError && /* @__PURE__ */ jsx("p", {
										className: "mt-1.5 text-[11px] font-medium text-red-600",
										children: areaError
									}),
									form.errors.biteship_area_id && /* @__PURE__ */ jsx("p", {
										className: "mt-1.5 text-[11px] font-medium text-red-600",
										children: form.errors.biteship_area_id
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2",
									children: [/* @__PURE__ */ jsx(InputBlock, {
										label: "Provinsi",
										value: form.data.province,
										onChange: () => void 0,
										error: form.errors.province,
										readOnly: true
									}), /* @__PURE__ */ jsx(InputBlock, {
										label: "Kota",
										value: form.data.city,
										onChange: () => void 0,
										error: form.errors.city,
										readOnly: true
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 gap-4 md:grid-cols-2",
									children: [/* @__PURE__ */ jsx(InputBlock, {
										label: "Kecamatan",
										value: form.data.district,
										onChange: () => void 0,
										error: form.errors.district,
										readOnly: true
									}), /* @__PURE__ */ jsx(InputBlock, {
										label: "Kode Pos",
										value: form.data.postal_code,
										onChange: () => void 0,
										error: form.errors.postal_code,
										inputMode: "numeric",
										pattern: "[0-9]*",
										readOnly: true
									})]
								}),
								/* @__PURE__ */ jsx(InputBlock, {
									label: "Kelurahan",
									value: form.data.subdistrict,
									onChange: (value) => form.setData("subdistrict", value),
									error: form.errors.subdistrict
								}),
								/* @__PURE__ */ jsx(LocationPicker, {
									latitude: form.data.latitude,
									longitude: form.data.longitude,
									error: mapError || form.errors.latitude || form.errors.longitude,
									onChange: updateCoordinates,
									onUseCurrentLocation: useCurrentLocation
								}),
								/* @__PURE__ */ jsx(TextareaBlock, {
									label: "Alamat Lengkap",
									value: form.data.full_address,
									onChange: (value) => form.setData("full_address", value),
									placeholder: "Nama jalan, gedung, nomor rumah",
									error: form.errors.full_address
								}),
								/* @__PURE__ */ jsx(TextareaBlock, {
									label: "Catatan Alamat (opsional)",
									value: form.data.note,
									onChange: (value) => form.setData("note", value),
									placeholder: "Patokan, catatan pengiriman, dll.",
									error: form.errors.note
								}),
								/* @__PURE__ */ jsxs("label", {
									className: "flex items-center pt-2",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: form.data.is_default,
										onChange: (event) => form.setData("is_default", event.target.checked),
										className: "h-4 w-4 rounded border-hairline-strong text-ink focus:ring-primary"
									}), /* @__PURE__ */ jsx("span", {
										className: "ml-2 cursor-pointer text-[12px] font-medium text-muted-foreground",
										children: "Jadikan alamat utama"
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex justify-end gap-3 border-t border-hairline-strong bg-white px-6 py-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: closeModal,
								className: "rounded-[6px] border border-hairline-strong px-6 py-2.5 text-[12px] font-bold text-muted-foreground transition-colors hover:bg-white",
								children: "Batal"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: form.processing,
								className: "rounded-[6px] bg-primary px-6 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#E67312] disabled:cursor-not-allowed disabled:opacity-70",
								children: form.processing ? "Menyimpan..." : editingAddress ? "Perbarui Alamat" : "Simpan Alamat"
							})]
						})]
					})]
				})]
			}), document.body)
		]
	});
}
function LocationPicker({ latitude, longitude, error, onChange, onUseCurrentLocation }) {
	const [leafletModules, setLeafletModules] = useState(null);
	const [markerIcon, setMarkerIcon] = useState(null);
	const parsedLatitude = Number(latitude);
	const parsedLongitude = Number(longitude);
	const hasCoordinates = validCoordinates(parsedLatitude, parsedLongitude);
	const position = hasCoordinates ? [parsedLatitude, parsedLongitude] : DEFAULT_MAP_CENTER;
	useEffect(() => {
		let isMounted = true;
		Promise.all([
			import("leaflet"),
			Promise.resolve({            }),
			import("react-leaflet")
		]).then(([leaflet, , reactLeaflet]) => {
			if (!isMounted) return;
			setMarkerIcon(leaflet.icon({
				iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
				iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
				shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			}));
			setLeafletModules({
				MapContainer: reactLeaflet.MapContainer,
				Marker: reactLeaflet.Marker,
				TileLayer: reactLeaflet.TileLayer,
				useMap: reactLeaflet.useMap,
				useMapEvents: reactLeaflet.useMapEvents
			});
		});
		return () => {
			isMounted = false;
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
				className: "block text-[11px] font-semibold text-muted-foreground",
				children: "Titik Lokasi"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: "Klik map atau drag pin ke titik rumah."
			})] }), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onUseCurrentLocation,
				className: "inline-flex items-center justify-center gap-2 rounded-[6px] border border-hairline-strong bg-white px-3 py-2 text-[11px] font-bold text-muted-foreground transition-colors hover:border-primary hover:bg-white",
				children: [/* @__PURE__ */ jsx(LocateFixed, { size: 14 }), " Gunakan Lokasi Saat Ini"]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "overflow-hidden rounded-[8px] border border-hairline-strong bg-white",
			children: leafletModules && markerIcon ? /* @__PURE__ */ jsx(ClientMap, {
				hasCoordinates,
				markerIcon,
				modules: leafletModules,
				onChange,
				position
			}) : /* @__PURE__ */ jsx("div", {
				className: "flex h-[320px] w-full items-center justify-center text-[12px] font-medium text-muted-foreground",
				children: "Memuat peta..."
			})
		}),
		hasCoordinates && /* @__PURE__ */ jsxs("p", {
			className: "mt-2 text-[11px] text-muted-foreground",
			children: [
				"Koordinat: ",
				latitude,
				", ",
				longitude
			]
		}),
		error && /* @__PURE__ */ jsx("p", {
			className: "mt-1.5 text-[11px] font-medium text-red-600",
			children: error
		})
	] });
}
function ClientMap({ hasCoordinates, markerIcon, modules, onChange, position }) {
	const { MapContainer, Marker, TileLayer } = modules;
	const zoom = hasCoordinates ? 17 : 12;
	return /* @__PURE__ */ jsxs(MapContainer, {
		center: position,
		zoom,
		scrollWheelZoom: true,
		className: "h-[320px] w-full",
		children: [
			/* @__PURE__ */ jsx(TileLayer, {
				attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
				url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			}),
			/* @__PURE__ */ jsx(MapUpdater, {
				center: position,
				modules,
				zoom
			}),
			/* @__PURE__ */ jsx(MapClickHandler, {
				modules,
				onChange
			}),
			hasCoordinates && /* @__PURE__ */ jsx(Marker, {
				draggable: true,
				icon: markerIcon,
				position,
				eventHandlers: { dragend: (event) => {
					const nextPosition = event.target.getLatLng();
					onChange(nextPosition.lat, nextPosition.lng);
				} }
			})
		]
	});
}
function MapUpdater({ center, modules, zoom }) {
	const map = modules.useMap();
	useEffect(() => {
		map.invalidateSize();
		map.setView(center, zoom);
	}, [
		center,
		map,
		zoom
	]);
	return null;
}
function MapClickHandler({ modules, onChange }) {
	modules.useMapEvents({ click: (event) => {
		onChange(event.latlng.lat, event.latlng.lng);
	} });
	return null;
}
function InputBlock({ label, value, onChange, placeholder, error, readOnly = false, inputMode = "text", pattern }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("label", {
			className: "mb-1.5 block text-[11px] font-semibold text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ jsx("input", {
			type: "text",
			value,
			onChange: (event) => onChange(event.target.value),
			placeholder,
			readOnly,
			inputMode,
			pattern,
			className: `w-full rounded-[6px] border border-hairline-strong px-4 py-2.5 text-[13px] text-ink transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none ${readOnly ? "bg-white text-muted-foreground" : "bg-white"}`
		}),
		error && /* @__PURE__ */ jsx("p", {
			className: "mt-1.5 text-[11px] font-medium text-red-600",
			children: error
		})
	] });
}
function TextareaBlock({ label, value, onChange, placeholder, error }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("label", {
			className: "mb-1.5 block text-[11px] font-semibold text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ jsx("textarea", {
			rows: 3,
			value,
			onChange: (event) => onChange(event.target.value),
			placeholder,
			className: "w-full resize-none rounded-[6px] border border-hairline-strong bg-white px-4 py-2.5 text-[13px] text-ink transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
		}),
		error && /* @__PURE__ */ jsx("p", {
			className: "mt-1.5 text-[11px] font-medium text-red-600",
			children: error
		})
	] });
}
//#endregion
export { ManageAddress as default };

//# sourceMappingURL=manage-address-BwktobZv.js.map