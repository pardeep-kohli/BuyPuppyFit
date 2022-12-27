import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Linking,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Button, Icon } from "react-native-elements";
import color from "../assets/theme/color";
import { useNavigation } from "@react-navigation/native";
// import App_Button from "../component/";
import { FONTS, SIZES } from "../assets/theme/theme";
import { Drawer } from "react-native-paper";

export default function DrawerContent(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              source={require("../assets/images/profile_demo.png")}
              size={100}
            />
          </View>
          <View style={styles.profile}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.login}>Guest</Text>
          </View>
        </View>
        {/* <View style={styles.button_container}>
          <App_Button title={"Sign Up"} />
        </View> */}

        <View style={styles.HomeSection}>
          <View style={{ backgroundColor: color.primary_color2 }}>
            <DrawerItem
              label={"Home"}
              onPress={() => navigation.navigate("Home")}
              labelStyle={{
                fontFamily: FONTS.primarytext5,
                width: SIZES.width,
                color: color.text_primary,
              }}
              icon={({ size }) => (
                <Image
                  source={require("../assets/images/ham_icons/home.png")}
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: color.text_primary,
                  }}
                />
              )}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: color.light_bg2,
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: color.light_grey, fontWeight: "bold" }}>
            PROFILE
          </Text>
        </View>
        <View style={{ borderBottomWidth: 0.5, marginBottom: 10 }}>
          <Drawer.Section showDivider={false}>
            <DrawerItem
              label={"My Account"}
              onPress={() => navigation.navigate("AccountStack")}
              labelStyle={{
                fontFamily: FONTS.primarytext5,
                width: SIZES.width,
              }}
              icon={({ color, size }) => (
                <Image
                  source={require("../assets/images/ham_icons/myaccount.png")}
                  style={{
                    height: 24,
                    width: 22,
                    tintColor: color,
                  }}
                />
              )}
            />
            <DrawerItem
              label={"Sign In"}
              onPress={() => navigation.navigate("Login")}
              labelStyle={{
                fontFamily: FONTS.primarytext5,
                width: SIZES.width,
              }}
              icon={({ color, size }) => (
                <Image
                  source={require("../assets/images/ham_icons/signin.png")}
                  style={{
                    height: 20,
                    width: 22,
                    tintColor: color,
                  }}
                />
              )}
            />
            <DrawerItem
              label={"Log Out"}
              onPress={() => navigation.navigate("Login")}
              labelStyle={{ fontFamily: FONTS.primarytext5 }}
              icon={({ color, size }) => (
                <Image
                  source={require("../assets/images/ham_icons/log_out.png")}
                  style={{ height: 22, width: 22, tintColor: color }}
                />
              )}
            />
          </Drawer.Section>
        </View>
        <View
          style={{
            backgroundColor: color.light_bg2,
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <Text style={{ color: color.light_grey, fontWeight: "bold" }}>
            QUICK LINKS
          </Text>
        </View>
        <Drawer.Section showDivider={false} style={{ marginTop: 15 }}>
          <DrawerItemList {...props} />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flexDirection: "row",
    paddingVertical: 20,
    backgroundColor: color.primary_color,
    marginTop: -5,
  },
  welcome: {
    color: color.white,
    fontSize: 18,
    fontWeight: "normal",
    fontFamily: FONTS.primarytext5,
    textTransform: "uppercase",
  },
  login: {
    color: color.white,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: FONTS.primarytext5,
  },
  avatar: {
    marginHorizontal: 20,
  },
  icons: {
    width: 30,
  },
  profile: {
    justifyContent: "center",
  },
  button_container: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.grey,
    marginBottom: 20,
  },
  HomeSection: {
    borderBottomColor: color.light_grey,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
    marginBottom: 10,
  },
});
