import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import color from "../assets/theme/color";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import UserInput from "../component/UserInput";
import VioletButton2 from "../component/VioletButton2";
import BackButton from "../component/Backbutton";
import Input2 from "../component/inputs/Input2";
export default function ResetPassword({ navigation }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: color.primary_color,
      }}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ alignSelf: "center", paddingTop: 40 }}>
          <Image
            style={{ height: hp(30), width: hp(30) }}
            source={require("../images/resetpassword3.png")}
          />
        </View>
        <View>
          <Text style={styles.heading}>Create new password</Text>
        </View>
        <Text style={styles.description}>
          <Text>Enter your new password below</Text>
        </Text>
        <Input2 placeholder="New Password" />
        <Input2 placeholder="Confirm Password" />
        <View
          style={{
            paddingVertical: 30,
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <VioletButton2
            buttonName="CREATE"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SegoeUIBold",
    paddingTop: 20,
    color: color.text_primary,
  },

  description: {
    flexWrap: "wrap",
    fontSize: 17,
    textAlign: "center",
    padding: 10,
    marginBottom: 30,
    paddingBottom: 20,
    color: color.white,
    fontFamily: "RobotoRegular",
  },
});
