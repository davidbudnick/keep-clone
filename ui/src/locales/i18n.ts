import translationEN from "./en/translations.json";
import translationES from "./es/translations.json";

export const resources = {
    en: {
        translation: translationEN,
    },
    es: {
        translation: translationES,
    },
} as const;


export const locales = {
    en: "en",
    es: "es",
} as const;

export const localStorageKey = "i18nextLng";
