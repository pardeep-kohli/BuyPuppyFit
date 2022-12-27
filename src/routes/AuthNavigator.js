import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  OnboardingScreens,
  Login,
  ForgetPassword,
  ForgetPassword2,
  SignUp,
  ResetPassword,
} from "../Screens";
import DrawerNavigator from "./DrawerNavigator";

const AuthStack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="OnboardingScreens"
        component={OnboardingScreens}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalFadeTransition,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />

      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword2"
        component={ForgetPassword2}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />

      <AuthStack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}
      />
    </AuthStack.Navigator>
  );
}
