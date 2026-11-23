//#region resources/js/lib/pagination.ts
function getPaginationDirection(label) {
	const normalized = label.trim().toLowerCase();
	if (/(?:^|\s)(?:pagination\.)?previous(?:\s|$)|&laquo;|«|←/.test(normalized)) return "previous";
	if (/(?:^|\s)(?:pagination\.)?next(?:\s|$)|&raquo;|»|→/.test(normalized)) return "next";
	return null;
}
//#endregion
export { getPaginationDirection as t };

//# sourceMappingURL=pagination-CzLB24nl.js.map