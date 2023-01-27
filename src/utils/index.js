import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { CURRENCY } from "../constants/String";

export const storeAsyncData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("Data Stored");
  } catch (e) {
    console.log("e", e);
  }
};

export const getAsyncData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // console.log('LOADING ASYNC ',key);
    // console.log('ASYNC DATA',jsonValue);
    return jsonValue;
    // setasyncUser(jsonValue);
    //return jsonValue != null ? JSON.parse(jsonValue) : null;
    //return jsonValue != null && jsonValue != undefined ? jsonValue : null;
  } catch (e) {
    // error reading value
  }
};

export const clearAsyncData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

// export function showPrice(price) {
//   return CURRENCY + "" + price;
// }
