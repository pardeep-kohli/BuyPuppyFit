import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../../../Screens/bottom/Account";
import EditProfile from "../../../Screens/EditProfile";
import CheckoutScreen from "../../../Screens/CheckoutScreen";
import CheckoutStack from "../checkoutstack/CheckoutStack";
import MyAddress from "../../../Screens/MyAddress";
import AddAddress from "../../../Screens/AddAddress";
import UpdateAddress from "../../../Screens/UpdateAddress";
const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Account"}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="CheckoutStack" component={CheckoutStack} />
      <Stack.Screen name="UpdateAddress" component={UpdateAddress} />

      {/* <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> */}
    </Stack.Navigator>
  );
}
