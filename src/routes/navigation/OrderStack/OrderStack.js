import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Home from "../../../Screens/Home";
import MyOrder from "../../../Screens/bottom/MyOrder";
import OrderTrackScreen from "../../../Screens/OrderTrackScreen";

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="OrderTrackScreen" component={OrderTrackScreen} />

      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
