import { STORE_RECOMMEND } from "./RecommendActionType";
const initialState = {
  recommend: [],
  recommendCount: 0,
};
const recommendReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_RECOMMEND:
      return {
        ...state,
        recommend: payload.recommend.recommend,
        recommendCount: payload.recommend.recommendCount,
      };
    default:
      return state;
  }
};
export default recommendReducer;
