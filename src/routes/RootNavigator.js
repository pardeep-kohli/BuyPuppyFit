import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import FlashMessage from "react-native-flash-message";

export default function RootNavigator() {
  return (
    <>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      {/* <FlashMessage position="top" /> */}
    </>
  );
}
