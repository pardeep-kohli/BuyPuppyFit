import * as React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

import color from "../assets/theme/color";
import { Icon, Avatar, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomNavigation from "./BottomNavigation";
import {
  AboutUs,
  PrivacyPolicy,
  ContactUs,
  TermCondition,
  FAQ,
} from "../Screens";
import DrawerContent from "../component/DrawerContent";
import { FONTS, SIZES } from "../assets/theme/theme";
import Shipping from "../Screens/Shipping";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AccountStack from "./navigation/AccountStack/AccountStack";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearAsyncData } from "../utils";
import { showMessage } from "react-native-flash-message";
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { Logout } from "../store/user/Action";
import { emptyCart } from "../store/cart/cartAction";
import { useNavigation } from "@react-navigation/native";

function CustomDrawerContent(props) {
  const reduxUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const _logout = async () => {
    dispatch(Logout());
    dispatch(emptyCart());

    await clearAsyncData(ASYNC_LOGIN_KEY);
    showMessage({
      message: "Success",
      description: "You have logged out successfully",
      type: "success",
    });
    props.navigation.replace("Login");
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawer}>
          <View style={styles.avatar}>
            <View
              style={{
                borderRadius: 40,
                height: 80,
                width: 80,
                borderColor: color.text_primary,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
              }}
            >
              <FontAwesome5 name="user" color={color.text_primary} size={45} />
            </View>
            {/* <Avatar
              rounded
              source={require("../assets/images/profile_demo.png")}
              size={100}
            /> */}
          </View>
          <View style={styles.profile}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.login}>
              {reduxUser.customer.name == ""
                ? "Guest"
                : reduxUser.customer.name}
            </Text>
          </View>
        </View>

        <View style={styles.HomeSection}>
          <View>
            <DrawerItem
              label={"Home"}
              onPress={() => props.navigation.navigate("HomeStack")}
              labelStyle={{
                fontFamily: "RubikSemiBold",
                // width: SIZES.width,
                color: color.black,
              }}
              icon={({ size, color }) => (
                <Image
                  source={require("../assets/images/ham_icons/home.png")}
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: color,
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
          <DrawerItem
            label={"My Account"}
            onPress={() => props.navigation.navigate("AccountStack")}
            labelStyle={{
              fontFamily: "RubikSemiBold",
              width: SIZES.width,
              color: color.black,
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
          {/* <DrawerItem
            label={"Sign In"}
            onPress={() => props.navigation.navigate("Login")}
            labelStyle={{
              fontFamily: "RubikSemiBold",
              width: SIZES.width,
              color: color.black,
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
          /> */}

          {reduxUser.customer.userId == "" ? (
            <DrawerItem
              label={"Sign In"}
              // onPress={() => props.navigation.navigate("Login")}
              onPress={() => navigation.navigate("Login")}
              labelStyle={{
                fontFamily: "RubikSemiBold",
                width: SIZES.width,
                color: color.black,
              }}
              icon={({ color, size }) => (
                <Image
                  source={require("../assets/images/ham_icons/log_out.png")}
                  style={{ height: 22, width: 22, tintColor: color }}
                />
              )}
            />
          ) : (
            <DrawerItem
              label={"Log Out"}
              // onPress={() => props.navigation.navigate("Login")}
              onPress={_logout}
              labelStyle={{
                fontFamily: "RubikSemiBold",
                width: SIZES.width,
                color: color.black,
              }}
              icon={({ color, size }) => (
                <Image
                  source={require("../assets/images/ham_icons/log_out.png")}
                  style={{ height: 22, width: 22, tintColor: color }}
                />
              )}
            />
          )}
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
        <DrawerItem
          label={"About Us"}
          onPress={() => props.navigation.navigate("AboutUs")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/about.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        <DrawerItem
          label={"Help and FAQ"}
          onPress={() => props.navigation.navigate("FAQ")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/help.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        <DrawerItem
          label={"Shipping"}
          onPress={() => props.navigation.navigate("Shipping")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/shipping.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        <DrawerItem
          label={"Contact Us"}
          onPress={() => props.navigation.navigate("ContactUs")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/contact.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        <DrawerItem
          label={"Privacy Policy"}
          onPress={() => props.navigation.navigate("PrivacyPolicy")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/privacy.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        <DrawerItem
          label={"Terms & Conditions"}
          onPress={() => props.navigation.navigate("TermCondition")}
          activeBackgroundColor={color.primary_color}
          activeTintColor={color.blue}
          labelStyle={{
            fontFamily: "RubikSemiBold",
            width: SIZES.width,
            color: color.black,
          }}
          icon={({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/term.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          )}
        />
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
    </View>
  );
}

const DrawerNavigator = ({ navigation, reduxUser }) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        // options={{
        //   title: "Home",
        //   drawerLabelStyle: {
        //     fontFamily: FONTS.primarytext5,
        //   },

        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/home.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        // options={{
        //   title: "About Us",
        //   drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/about.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />

      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          title: "Help and FAQ",
          drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
          drawerIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/ham_icons/help.png")}
              style={{ height: 22, width: 22, tintColor: color }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Shipping"
        component={Shipping}
        // options={{
        //   title: "Shipping",
        //   drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/shipping.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />

      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        // options={{
        //   title: "Contact Us",
        //   drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/contact.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />

      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        // options={{
        //   title: "Privacy Policy",
        //   drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/privacy.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />
      <Drawer.Screen
        name="TermCondition"
        component={TermCondition}
        // options={{
        //   title: "Term & Condition",
        //   drawerLabelStyle: { fontFamily: FONTS.primarytext5 },
        //   drawerIcon: ({ color, size }) => (
        //     <Image
        //       source={require("../assets/images/ham_icons/term.png")}
        //       style={{ height: 22, width: 22, tintColor: color }}
        //     />
        //   ),
        // }}
      />
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxLogout: () => dispatch(Logout()),
  };
};
export default connect(mapStateToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  icons: {
    width: 30,
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
    // backgroundColor: "red",
  },
  icons: {
    width: 30,
  },
  profile: {
    justifyContent: "center",
  },
  HomeSection: {
    borderBottomColor: color.light_grey,
    borderBottomWidth: 0.4,
    paddingVertical: 20,
    marginBottom: 10,
  },
});
