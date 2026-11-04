//#region resources/js/lib/slug.ts
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
//#endregion
export { slugify as t };

//# sourceMappingURL=slug-wkPeX5Oj.js.map