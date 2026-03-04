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
    loading: boolean;
};

const DEFAULT_SALES_EMAIL = "sales@gfm.jo";
const DEFAULT_WHATSAPP_NUMBER = "962779500599";
const DEFAULT_WHATSAPP_LINK = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}`;

const ContactLinksContext = createContext<ContactLinksContextValue | undefined>(undefined);

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

        return {
            salesEmail,
            infoEmail,
            whatsappNumber,
            whatsappLink,
            loading,
        };
    }, [
        data?.contactUs?.info_email,
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
