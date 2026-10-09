export function getPaginationDirection(label: string) {
    const normalized = label.trim().toLowerCase();

    if (
        /(?:^|\s)(?:pagination\.)?previous(?:\s|$)|&laquo;|«|←/.test(normalized)
    ) {
        return 'previous';
    }

    if (/(?:^|\s)(?:pagination\.)?next(?:\s|$)|&raquo;|»|→/.test(normalized)) {
        return 'next';
    }

    return null;
}
