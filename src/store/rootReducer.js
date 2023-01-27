import { combineReducers } from "redux";
import categoryReducer from "./category/CategoryReducer";
import userReducer from "./user/UserReducer";
// import courseReducer from "./courses/courseReducer";
// import blogReducer from "./Blogs/blogReducer";
// import storeReducer from "./Store/storeReducer";
// import orderReducer from "./Order/orderReducer";
// import myquestionReducer from "./myQuestions/myquestionReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  //   course: courseReducer,
  //   blog: blogReducer,
  //   product: storeReducer,
  //   order: orderReducer,
  //   myquestions: myquestionReducer
});
export default rootReducer;
