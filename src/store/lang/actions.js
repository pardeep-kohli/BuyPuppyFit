import { UPDATE_LANGUAGE } from "./actionTypes";

export const updateLanguage = (lang) => ({
  type: UPDATE_LANGUAGE,
  payload: {
    lang: lang,
  },
});
