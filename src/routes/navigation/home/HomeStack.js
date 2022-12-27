import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "../../../Screens/Home";
import Categories from "../../../Screens/Categories";
import Filter from "../../../Screens/Filter";
import DetailedScreen from "../../../Screens/DetailedScreen";
// import CheckoutScreen from "../../../Screens/CheckoutScreen";
import CheckoutStack from "../checkoutstack/CheckoutStack";
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="DetailedScreen" component={DetailedScreen} />
      <Stack.Screen name="CheckoutStack" component={CheckoutStack} />

      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
