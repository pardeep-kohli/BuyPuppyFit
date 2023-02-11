import { STORE_CART, EMPTY_CART } from "./cartActionType";

export const storeCart = (cart) => ({
  type: STORE_CART,
  payload: {
    cart: cart,
  },
});

export const emptyCart = () => ({
  type: EMPTY_CART,
});
