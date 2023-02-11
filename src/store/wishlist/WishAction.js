import { STORE_WISH, EMPTY_WISH } from "./WishActionType";

export const storeWish = (wish) => ({
  type: STORE_WISH,
  payload: {
    wish: wish,
  },
});

export const emptyWish = () => ({
  type: EMPTY_WISH,
});
