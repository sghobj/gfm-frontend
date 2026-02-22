export const hasNonEmptyText = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;

export const hasAnyLocalizedContent = (...values: unknown[]): boolean =>
    values.some((value) => hasLocalizedContent(value));

export const hasLocalizedContent = (value: unknown): boolean => {
    if (value == null) return false;

    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return true;
    }

    if (Array.isArray(value)) {
        return value.some((item) => hasLocalizedContent(item));
    }

    if (typeof value === "object") {
        return Object.values(value as Record<string, unknown>).some((item) =>
            hasLocalizedContent(item),
        );
    }

    return false;
};

export const normalizeLocaleCode = (value: unknown): "en" | "ar" | null => {
    if (typeof value !== "string") return null;
    const normalized = value.trim().toLowerCase();
    if (normalized.startsWith("ar")) return "ar";
    if (normalized.startsWith("en")) return "en";
    return null;
};

export const isContentForLocale = (contentLocale: unknown, activeLocale: "en" | "ar"): boolean => {
    const normalized = normalizeLocaleCode(contentLocale);
    return normalized === activeLocale;
};
