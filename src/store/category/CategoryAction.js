import { STORE_CATEGORY } from "./CategoryActionType";
export const storeCategory = (category) => ({
  type: STORE_CATEGORY,
  payload: {
    category: category,
  },
});
