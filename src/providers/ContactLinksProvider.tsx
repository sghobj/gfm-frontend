/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery } from "@apollo/client/react";
import { ContactLinksDocument } from "../graphql/gql/graphql";
import {
    buildSafeWhatsAppHref,
    normalizeEmailRecipient,
    normalizeWhatsAppNumber,
} from "../utils/contactLinks";

type ContactLinksContextValue = {
    salesEmail: string | null;
    infoEmail: string | null;
    whatsappNumber: string | null;
    whatsappLink: string | null;
    mapsEmbedUrl: string | null;
    contactHeroTitle: string | null;
    contactHeroSubtitle: string | null;
    contactHeroNote: string | null;
    loading: boolean;
};

const DEFAULT_SALES_EMAIL = "sales@gfm.jo";
const DEFAULT_WHATSAPP_NUMBER = "962779500599";
const DEFAULT_WHATSAPP_LINK = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`;

const ContactLinksContext = createContext<ContactLinksContextValue | undefined>(undefined);

function normalizeNonEmptyText(value: string | null | undefined): string | null {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
}

function normalizeHttpUrl(value: string | null | undefined): string | null {
    const candidate = normalizeNonEmptyText(value);
    if (!candidate) return null;

    try {
        const parsed = new URL(candidate);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return parsed.toString();
        }
    } catch {
        return null;
    }

    return null;
}

export function ContactLinksProvider({ children }: { children: ReactNode }) {
    const { data, loading } = useQuery(ContactLinksDocument, {
        context: { skipAuth: true },
        errorPolicy: "ignore",
    });

    const value = useMemo<ContactLinksContextValue>(() => {
        const salesEmail =
            normalizeEmailRecipient(data?.contactUs?.sales_email) ?? DEFAULT_SALES_EMAIL;
        const infoEmail =
            normalizeEmailRecipient(data?.contactUs?.info_email) ??
            normalizeEmailRecipient(data?.contactUs?.sales_email);
        const whatsappNumber =
            normalizeWhatsAppNumber(data?.contactUs?.whatsapp_link) ?? DEFAULT_WHATSAPP_NUMBER;
        const whatsappLink =
            buildSafeWhatsAppHref(data?.contactUs?.whatsapp_link) ?? DEFAULT_WHATSAPP_LINK;
        const mapsEmbedUrl = normalizeHttpUrl(data?.contactUs?.mapsUrl);
        const contactHeroTitle = normalizeNonEmptyText(data?.contactUs?.hero?.title);
        const contactHeroSubtitle = normalizeNonEmptyText(data?.contactUs?.hero?.subtitle);
        const contactHeroNote = normalizeNonEmptyText(data?.contactUs?.hero?.description);

        return {
            salesEmail,
            infoEmail,
            whatsappNumber,
            whatsappLink,
            mapsEmbedUrl,
            contactHeroTitle,
            contactHeroSubtitle,
            contactHeroNote,
            loading,
        };
    }, [
        data?.contactUs?.hero?.description,
        data?.contactUs?.hero?.subtitle,
        data?.contactUs?.hero?.title,
        data?.contactUs?.info_email,
        data?.contactUs?.mapsUrl,
        data?.contactUs?.sales_email,
        data?.contactUs?.whatsapp_link,
        loading,
    ]);

    return <ContactLinksContext.Provider value={value}>{children}</ContactLinksContext.Provider>;
}

export function useContactLinks() {
    const context = useContext(ContactLinksContext);
    if (!context) {
        throw new Error("useContactLinks must be used within ContactLinksProvider.");
    }

    return context;
}
