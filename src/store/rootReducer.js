import { combineReducers } from "redux";
import cartReducer from "./cart/cartReducer";
import categoryReducer from "./category/CategoryReducer";
import userReducer from "./user/UserReducer";
import wishReducer from "./wishlist/WishReducer";
// import OnsaleReducer from "./onSale/OnSaleReducer";
// import recommendReducer from "./recommend/RecommendReducer";

// import whathotReducer from "./whathot/WhathotReducer";
// import courseReducer from "./courses/courseReducer";
// import blogReducer from "./Blogs/blogReducer";
// import storeReducer from "./Store/storeReducer";
// import orderReducer from "./Order/orderReducer";
// import myquestionReducer from "./myQuestions/myquestionReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer,
  wish: wishReducer,
  // onsale: OnsaleReducer,
  // recommend: recommendReducer,
  // whathot: whathotReducer,

  //   course: courseReducer,
  //   blog: blogReducer,
  //   product: storeReducer,
  //   order: orderReducer,
  //   myquestions: myquestionReducer
});
export default rootReducer;
