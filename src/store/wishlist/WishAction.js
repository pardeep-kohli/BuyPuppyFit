import {
  STORE_WISH,
  EMPTY_WISH,
  ADD_ON_SALE,
  ADD_ON_SALE_FAV,
  REMOVE_ON_SALE_FAV,
  ADD_RECOMMENDED,
  ADD_HOT,
} from "./WishActionType";

export const storeWish = (wish) => ({
  type: STORE_WISH,
  payload: {
    wish: wish,
  },
});
export const storeOnSale = (sale) => ({
  type: ADD_ON_SALE,
  payload: {
    sale: sale,
  },
});
export const storeRecommended = (recommended) => ({
  type: ADD_RECOMMENDED,
  payload: {
    recommended: recommended,
  },
});
export const storeHot = (hot) => ({
  type: ADD_HOT,
  payload: {
    hot: hot,
  },
});
export const storeOnSaleFav = (id) => ({
  type: ADD_ON_SALE_FAV,
  payload: {
    id: id,
  },
});
export const storeOnSaleRemove = (id) => ({
  type: REMOVE_ON_SALE_FAV,
  payload: {
    id: id,
  },
});

export const emptyWish = () => ({
  type: EMPTY_WISH,
});
