import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "../locales/en/common.json";
import arCommon from "../locales/ar/common.json";

const resources = {
    en: {
        common: enCommon,
    },
    ar: {
        common: arCommon,
    },
} as const;

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        supportedLngs: ["en", "ar"],
        defaultNS: "common",
        ns: ["common"],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            // optional: fine-tune detection
            order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"],
        },
    });

const toDocumentDirection = (lng: string) => (lng?.startsWith("ar") ? "rtl" : "ltr");
const toDocumentLanguage = (lng: string) => (lng?.startsWith("ar") ? "ar" : "en");

// Keep global language and text direction in sync with i18n language.
const updateDocumentLanguageAndDirection = (lng: string) => {
    if (typeof document === "undefined") return;

    const normalizedLang = toDocumentLanguage(lng);
    const direction = toDocumentDirection(lng);

    document.documentElement.setAttribute("lang", normalizedLang);
    document.documentElement.setAttribute("dir", direction);
    document.body?.setAttribute("dir", direction);
};

updateDocumentLanguageAndDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
    updateDocumentLanguageAndDirection(lng);
});

export default i18n;
