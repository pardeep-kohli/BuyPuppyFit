import React from "react";
import color from "../assets/theme/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Account, Recent, MyOrder, Home } from "../../src/Screens/bottom";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import HomeStack from "./navigation/home/HomeStack";
import AccountStack from "./navigation/AccountStack/AccountStack";
import OrderStack from "./navigation/OrderStack/OrderStack";
import Favourite from "../Screens/bottom/Favourite";

const ClientTab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <ClientTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.text_primary,
        tabBarInactiveTintColor: color.light_grey,
        tabBarStyle: {
          backgroundColor: color.primary_color,
          height: 60,
          paddingBottom: 5,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <ClientTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
      />

      <ClientTab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarLabel: "Favourite",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={30} color={color} />
          ),
        }}
      />
      {/* <ClientTab.Screen
        name="Recent"
        component={Recent}
        options={{
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="back-in-time" size={28} color={color} />
          ),
        }}
      /> */}

      <ClientTab.Screen
        name="OrderStack"
        component={OrderStack}
        options={{
          tabBarLabel: "MyOrder",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" size={30} color={color} />
          ),
        }}
      />

      <ClientTab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: "Account ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </ClientTab.Navigator>
  );
}
