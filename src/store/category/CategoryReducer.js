import { STORE_CATEGORY } from "./CategoryActionType";
const initialState = {
  category: [],
  categoryCount: 0,
};
const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STORE_CATEGORY:
      return {
        ...state,
        category: payload.category.category,
        categoryCount: payload.category.categoryCount,
      };
    default:
      return state;
  }
};
export default categoryReducer;
