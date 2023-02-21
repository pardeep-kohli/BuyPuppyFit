import { STORE_RECOMMEND } from "./RecommendActionType";
export const storeRecommend = (recommend) => ({
  type: STORE_RECOMMEND,
  payload: {
    recommend: recommend,
  },
});
