import {
  STORE_WISH,
  EMPTY_WISH,
  ADD_ON_SALE,
  ADD_ON_SALE_FAV,
  REMOVE_ON_SALE_FAV,
  ADD_RECOMMENDED,
  ADD_HOT,
} from "./WishActionType";
const initialState = {
  wish: [],
  wishId: [],
  wishCount: 0,
  onSale: [],
  recommended: [],
  hot: [],
};

const wishReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_WISH:
      return {
        ...state,
        wish: [...state.wish, payload.wish],
        // wishId: payload.wish.wishId,
        // wishCount: payload.wish.wishCount,
      };
    case ADD_ON_SALE:
      return {
        ...state,
        onSale: payload.sale,
      };
    case ADD_RECOMMENDED:
      return {
        ...state,
        recommended: payload.recommended,
      };
    case ADD_HOT:
      return {
        ...state,
        hot: payload.hot,
      };
    case ADD_ON_SALE_FAV:
      const updatedSale = state.onSale?.map((item) => {
        if (item.product_id == payload.id) {
          return {
            ...item,
            wishlist: "1",
          };
        } else {
          return item;
        }
      });
      const updatedRecommended = state.recommended?.map((item) => {
        if (item.product_id == payload.id) {
          return {
            ...item,
            wishlist: "1",
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        onSale: updatedSale,
        recommended: updatedRecommended,
      };
    case REMOVE_ON_SALE_FAV:
      const updatedSaleData = state.onSale?.map((item) => {
        if (item.product_id == payload.id) {
          return {
            ...item,
            wishlist: "0",
          };
        } else {
          return item;
        }
      });
      const updatedRecommendedData = state.recommended?.map((item) => {
        if (item.product_id == payload.id) {
          return {
            ...item,
            wishlist: "0",
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        onSale: updatedSaleData,
        recommended: updatedRecommendedData,
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
