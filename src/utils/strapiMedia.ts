const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL ?? "").replace(/\/$/, "");

// url can be "/uploads/..", "uploads/..", "https://..", or even "//res.cloudinary.com/.."
export function resolveStrapiMediaUrl(url?: string | null) {
    if (!url) return "";

    const trimmed = url.trim();

    // absolute or protocol-relative → return as-is (protocol-relative gets https)
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith("//")) return `https:${trimmed}`;

    // relative → must have base URL
    if (!STRAPI_BASE_URL) {
        // this is the #1 cause of "still wrong url" in prod
        console.error("VITE_STRAPI_URL is not set. Cannot resolve relative media URL:", trimmed);
        return trimmed; // return raw so you see what's happening
    }

    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${STRAPI_BASE_URL}${path}`;
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
