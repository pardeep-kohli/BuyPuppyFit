import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CheckoutAddress from "../../../Screens/checkout/CheckoutAddress";
import CheckoutScreen from "../../../Screens/CheckoutScreen";
import OrderSuccess from "../../../Screens/checkout/OrderSuccess";
import ManageCheckout from "../../../Screens/checkout/ManageCheckout";
import CheckoutPayment from "../../../Screens/checkout/CheckoutPayment";
const Stack = createStackNavigator();

export default function CheckoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutAddress" component={CheckoutAddress} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      <Stack.Screen name="ManageCheckout" component={ManageCheckout} />
      <Stack.Screen name="CheckoutPayment" component={CheckoutPayment} />
      {/* <Stack.Screen name="Notificatio nScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
