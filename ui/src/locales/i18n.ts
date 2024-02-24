import { Resource } from "i18next";
import translationEN from "./en/translations.json";
import translationES from "./es/translations.json";
import translationDE from "./de/translations.json";
import translationJA from "./ja/translations.json";


export const resources: Resource = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES,
    },
    de: {
        translation: translationDE,
    },
    ja: {
        translation: translationJA,
    }
} as const;


export const locales = {
    en: "en",
    es: "es",
    de: "de",
    ja: "ja",
} as const;

export const localStorageKey = "i18nextLng";
