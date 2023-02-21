import { STORE_WHATHOT } from "./WhathotActionType";
export const storeWhathot = (whathot) => ({
  type: STORE_WHATHOT,
  payload: {
    whathot: whathot,
  },
});
