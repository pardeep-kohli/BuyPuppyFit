import {
  STOREUSER,
  VERIFYNEWUSER,
  RECOVER,
  RESETRECOVER,
  LOGOUT,
  UPDATE_PIC,
} from "./ActionTypes";

const initialState = {
  isLoggedIn: false,
  redirectToLogin: false,
  profileImage: "",
  customer: {
    id: "",
    name: "",
    email: "",
    mobile: "",
    country_code: "",
    image: "",
    //   middleName: "",
    // lastName: "",
    // address: "",
    // dob: "",
    // gender: "",
  },
  recoverFor: {
    password: "",
  },
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOREUSER:
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        customer: payload.customer,
      };
    case VERIFYNEWUSER:
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
      };
    case RESETRECOVER:
      return {
        ...state,
        recoverFor: "",
      };

    case RECOVER:
      return {
        ...state,
        recoverFor: payload.recoverFor,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        customer: {
          id: "",
          name: "",
          email: "",
          mobile: "",
          country_code: "",
          image: "",
          // middleName: "",
          // lastName: "",
          // address: "",
          // dob: "",
          // gender: "",
        },
        recoverFor: {
          email: "",
        },
        redirectToLogin: true,
      };
    case UPDATE_PIC:
      return {
        ...state,
        profileImage: payload.image,
      };
    default:
      return state;
  }
};

export default userReducer;
