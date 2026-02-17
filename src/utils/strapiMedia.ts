const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337").replace(
    /\/$/,
    "",
);

export function resolveStrapiMediaUrl(url?: string) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url; // Cloudinary / absolute
    return `${STRAPI_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`; // Local / relative
}

export function toSearchableText(value: unknown): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    // Strapi Blocks / rich content often comes as arrays/objects
    try {
        return JSON.stringify(value);
    } catch {
        return "";
    }
}
