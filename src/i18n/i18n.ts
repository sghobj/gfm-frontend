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

// Handle direction change (RTL / LTR)
const updateHtmlDirection = (lng: string) => {
    document.documentElement.setAttribute("lang", lng);
};

updateHtmlDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
    updateHtmlDirection(lng);
});

export default i18n;
