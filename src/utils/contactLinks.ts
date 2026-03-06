const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const WHATSAPP_HOSTS = new Set(["wa.me", "www.wa.me", "api.whatsapp.com"]);
const DIGIT_PATTERN = /^\d{8,15}$/;

function stripToDigits(value: string): string {
    return value.replace(/\D+/g, "");
}

function decodeSafely(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export function normalizeEmailRecipient(rawValue: string | null | undefined): string | null {
    if (!rawValue) return null;

    const trimmed = rawValue.trim();
    if (!trimmed) return null;

    let candidate = trimmed;
    if (trimmed.toLowerCase().startsWith("mailto:")) {
        candidate = decodeSafely(trimmed.slice("mailto:".length));
    }

    const address = candidate.split("?")[0]?.trim().toLowerCase() ?? "";
    if (!EMAIL_PATTERN.test(address)) return null;

    return address;
}

export function normalizeWhatsAppNumber(rawValue: string | null | undefined): string | null {
    if (!rawValue) return null;

    const trimmed = rawValue.trim();
    if (!trimmed) return null;

    if (
        trimmed.toLowerCase().startsWith("http://") ||
        trimmed.toLowerCase().startsWith("https://")
    ) {
        try {
            const url = new URL(trimmed);
            const host = url.hostname.toLowerCase();
            if (url.protocol !== "https:" || !WHATSAPP_HOSTS.has(host)) return null;

            if (host === "wa.me" || host === "www.wa.me") {
                const digits = stripToDigits(url.pathname.replace(/^\/+/, ""));
                return DIGIT_PATTERN.test(digits) ? digits : null;
            }

            if (host === "api.whatsapp.com" && url.pathname === "/send") {
                const phone = url.searchParams.get("phone") ?? "";
                const digits = stripToDigits(phone);
                return DIGIT_PATTERN.test(digits) ? digits : null;
            }
        } catch {
            return null;
        }

        return null;
    }

    const digits = stripToDigits(trimmed);
    return DIGIT_PATTERN.test(digits) ? digits : null;
}

export function buildSafeMailtoHref(rawEmail: string | null | undefined): string | null {
    const email = normalizeEmailRecipient(rawEmail);
    if (!email) return null;
    return `mailto:${email}`;
}

export function buildSafeMailtoLink(
    rawEmail: string | null | undefined,
    subject: string,
    body: string,
): string | null {
    const base = buildSafeMailtoHref(rawEmail);
    if (!base) return null;
    return `${base}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildSafeWhatsAppHref(rawValue: string | null | undefined): string | null {
    const digits = normalizeWhatsAppNumber(rawValue);
    if (!digits) return null;
    return `https://wa.me/${digits}`;
}

export function buildSafeWhatsAppLink(
    rawNumber: string | null | undefined,
    message: string,
): string | null {
    const base = buildSafeWhatsAppHref(rawNumber);
    if (!base) return null;
    return `${base}?text=${encodeURIComponent(message)}`;
}
