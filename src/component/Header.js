import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SIZES, FONTS } from "../assets/theme/theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";
export default function Header({ navigation, onPress, cart }) {
  return (
    <View style={styles.parent}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Ionicons name="ios-menu" size={40} color={color.white} />
      </TouchableOpacity>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={{ height: SIZES.height / 14, width: SIZES.width / 2 }}
          source={require("../images/logo2.png")}
        />
      </View>
      <TouchableOpacity onPress={cart}>
        <FontAwesome5 name="shopping-cart" size={26} color={color.white} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#DADADA",
    alignItems: "center",
    padding: 10,
    backgroundColor: color.primary_color,
  },
});
