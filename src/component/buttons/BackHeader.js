import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../../assets/theme/color";
import { SIZES, FONTS } from "../../assets/theme/theme";
export default function BackHeader({ navigation, cart, header, hide }) {
  return (
    <View style={styles.parent}>
      <TouchableOpacity onPress={navigation}>
        {hide ? null : <Ionicons name="chevron-back" size={26} color="white" />}
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* <Text style={styles.headerText}>{header}</Text> */}
        <Image
          source={require("../../images/logo2.png")}
          resizeMode="contain"
          style={{ height: SIZES.height / 14, width: SIZES.width / 2 }}
        />
      </View>
      <TouchableOpacity style={{ width: 26 }}>
        {/* <FontAwesome5 name="shopping-cart" size={26} color="#781C45" /> */}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    borderColor: "#DADADA",
    // height:80,
    alignItems: "center",
    padding: 10,
    backgroundColor: color.primary_color,
  },
  headerText: {
    fontFamily: "Bold",
    color: color.white,
    fontSize: 16,
  },
});
