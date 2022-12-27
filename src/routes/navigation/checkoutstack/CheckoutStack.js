import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutAddress from "../../../Screens/checkout/CheckoutAddress";
import CheckoutScreen from "../../../Screens/CheckoutScreen";
import OrderSuccess from "../../../Screens/checkout/OrderSuccess";
const Stack = createStackNavigator();

export default function CheckoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutAddress" component={CheckoutAddress} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
