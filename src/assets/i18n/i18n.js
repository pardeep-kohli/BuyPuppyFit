import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import hi from "./hi.json";
import fr from "./fr.json";
import sp from "./sp.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: en,
    sp: sp,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
