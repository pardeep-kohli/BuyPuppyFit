import { UPDATE_LANGUAGE } from "./actionTypes";
// import { LANG } from "../../constants/Lang";

const initialState = {
  activeLang: "en",
};

const langReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_LANGUAGE:
      return {
        ...state,
        activeLang: payload.lang,
      };

    default:
      return state;
  }
};

export default langReducer;
