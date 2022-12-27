import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../assets/theme/color";

import { SIZES, FONTS } from "../assets/theme/theme";
import BackButton from "../component/Backbutton";
import Email from "../component/Email";
import VioletButton from "../component/VioletButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import Input from "../component/inputs/Input";
export default function Login({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    // <ScrollView style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: color.primary_color,
      }}
    >
      <StatusBar backgroundColor={color.primary_color} />

      <BackButton />
      <View>
        <Text style={styles.text}>Log in to your account</Text>
      </View>
      <Input iconName={"email"} placeholder={"Email"} />
      <Input iconName={"lock"} placeholder={"Password"} />
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View style={{}}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{ paddingTop: 10, paddingBottom: 20 }}
        >
          <Text style={{ color: color.white, fontWeight: "500" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <VioletButton
          buttonName="LOGIN"
          onPress={() => navigation.navigate("DrawerNavigator")}
        />
      </View>
      <View style={styles.SignUpOption}>
        <View>
          <Text
            style={{
              color: color.white,
              fontSize: SIZES.h4,
              fontWeight: "500",
            }}
          >
            Don't have an account?
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isKeyboardVisible == false && (
        <View style={styles.ImageView}>
          <ImageBackground
            resizeMode="contain"
            style={{
              height: SIZES.height / 3.5,
              width: SIZES.width / 1.18,
              position: "relative",
              bottom: 0,
            }}
            source={require("../images/logopagesnap2.png")}
          />
        </View>
      )}
    </View>
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.text_primary,
    marginVertical: 20,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "grey",
    alignItems: "center",
  },
  TextBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 20,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 25,
  },
  Text: {
    paddingLeft: 10,
  },
  text2: {
    color: color.text_primary,
    fontWeight: "bold",
  },
  SignUpOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  ImageView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
