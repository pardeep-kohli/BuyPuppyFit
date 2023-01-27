import {
  STOREUSER,
  VERIFYNEWUSER,
  RECOVER,
  LOGOUT,
  UPDATE_PIC,
} from "./ActionTypes";

export const storeUser = (user) => ({
  type: STOREUSER,
  payload: {
    customer: user,
    isLoggedIn: true,
  },
});

export const storeNewUser = (user) => ({
  type: STOREUSER,
  payload: {
    customer: user,
    // isLoggedIn: "OTPverify",
    isLoggedIn: true,
  },
});

export const updatePic = (img) => ({
  type: UPDATE_PIC,
  payload: {
    image: img,
  },
});

export const verifyNewUser = () => ({
  type: VERIFYNEWUSER,
  payload: {
    isLoggedIn: true,
  },
});

export const setForRecovery = (info) => ({
  type: RECOVER,
  payload: {
    recoverFor: info,
  },
});

export const resetRecovery = () => ({
  type: RESETRECOVER,
});

export const Logout = () => ({
  type: LOGOUT,
});
