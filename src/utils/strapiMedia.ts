export function resolveStrapiMediaUrl(url?: string | undefined) {
    if (!url) return undefined;

    // already absolute (Cloudinary, CDN, etc.)
    if (/^https?:\/\//i.test(url)) return url;

    const base = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";
    return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}
