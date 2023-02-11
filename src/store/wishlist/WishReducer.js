import { STORE_WISH, EMPTY_WISH } from "./WishActionType";
const initialState = {
  wish: [],
  wishId: [],
  wishCount: 0,
};

const wishReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_WISH:
      return {
        ...state,
        wish: payload.wish.wish,
        wishId: payload.wish.wishId,
        wishCount: payload.wish.wishCount,
      };
    case EMPTY_WISH:
      return {
        ...state,
        wish: [],
        wishId: [],
        wishCount: 0,
      };
    default:
      return state;
  }
};

export default wishReducer;
