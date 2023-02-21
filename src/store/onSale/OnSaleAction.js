import { STORE_ONSALE } from "./OnSaleActionType";
export const storeOnSale = (onsale) => ({
  type: STORE_ONSALE,
  payload: {
    onsale: onsale,
  },
});
