import { STORE_ONSALE } from "./OnSaleActionType";
const initialState = {
  onsale: [],
  onsaleCount: 0,
};
const OnsaleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_ONSALE:
      return {
        ...state,
        onsale: payload.onsale.onsale,
        onsaleCount: payload.onsale.onsaleCount,
      };
    default:
      return state;
  }
};
export default OnsaleReducer;
