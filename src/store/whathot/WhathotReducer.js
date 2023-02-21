import { STORE_WHATHOT } from "./WhathotActionType";
const initialState = {
  whathot: [],
  whathotCount: 0,
};
const whathotReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_WHATHOT:
      return {
        ...state,
        whathot: payload.whathot.whathot,
        whathotCount: payload.whathot.whathotCount,
      };
    default:
      return state;
  }
};
export default whathotReducer;
