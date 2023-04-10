import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";

// import SignUp from "./src/Screens/SignUp";
// import Login from "./src/Screens/Login";
// import Home from "./src/Screens/Home";
// import ForgetPassword from "./src/Screens/ForgetPassword";
// import ForgetPassword2 from "./src/Screens/ForgetPassword2";
// import ResetPassword from "./src/Screens/ResetPassword";
// import Filter from "./src/Screens/Filter";
// import BottomNavigation from "./routes/navigation/BottomNavigation";
import useFonts from "./src/api/useFonts";
// import TermsConditions from "./src/Screens/TermsConditions";
// import PrivacyPolicy from "./src/Screens/PrivacyPolicy";
// import Shipping from "./src/Screens/Shipping";
// import AboutUs from "./src/Screens/AboutUs";
// import ContactUs from "./src/Screens/ContactUs";
// import AddAddress from "./src/Screens/AddAddress";
// import EditProfile from "./src/Screens/EditProfile";
// import Account from "./src/Screens/Account";
// import MyAddress from "./src/Screens/MyAddress";
import RootNavigator from "./src/routes/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const Stack = createStackNavigator();
  useEffect(() => {
    useFonts();
  }, []);

  return (
    <>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <RootNavigator />
          <FlashMessage position={{ top: 0, left: 0, right: 0 }} />
        </SafeAreaView>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
