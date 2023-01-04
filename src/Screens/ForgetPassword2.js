import { View, Text, StatusBar, Image } from "react-native";
import React from "react";
import color from "../assets/theme/color";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import VioletButton2 from "../component/VioletButton2";
import BackButton from "../component/Backbutton";
import { SIZES } from "../assets/theme/theme";

export default function ForgetPassword2({ navigation }) {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: color.primary_color,
      }}
    >
      <StatusBar backgroundColor={color.primary_color} />
      <BackButton onPress={() => navigation.goBack()} />
      <View style={{ alignSelf: "center", paddingTop: 30 }}>
        <Image
          resizeMode="contain"
          style={{ height: hp(30), width: hp(30) }}
          source={require("../images/forgetpasswordimg2.png")}
        />
      </View>
      <Text
        style={{
          // flexWrap: "wrap",
          textAlign: "center",
          marginVertical: 10,
          fontSize: 20,
          fontFamily: "SegoeUIBold",
          color: color.text_primary,
        }}
      >
        Check your email
      </Text>
      <Text
        style={{
          fontSize: 19,
          color: color.white,
          textAlign: "center",
          fontFamily: "RobotoRegular",
        }}
      >
        We have sent a password recovery instruction to your email.
      </Text>
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <VioletButton2
          buttonName="OKAY"
          onPress={() => navigation.navigate("ResetPassword")}
        />
      </View>
    </View>
  );
}
