import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SIZES } from "../assets/theme/theme";
export default function UserAddress({
  Address,
  Place,
  country,
  province,
  city,
  postcode,
  onPress,
  deleteOnPress,
}) {
  return (
    <View style={styles.parent}>
      <View style={styles.homeIconView}>
        <MaterialCommunityIcons
          name="home"
          size={24}
          color={color.light_grey}
        />
      </View>
      <View style={styles.addressView}>
        <Text style={styles.txt}>{Place}</Text>
        <Text style={styles.UserAddress}>
          {Address},{country},{province},{city}-{postcode}
        </Text>
        <View style={styles.IconView}>
          <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color={color.primary_color}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}} onPress={deleteOnPress}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color={color.red}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  UserAddress: {
    textAlign: "justify",
    fontFamily: "RubikLight",
    fontSize: SIZES.h3 - 4,
  },
  parent: {
    flexDirection: "row",
    paddingHorizontal: 20,
    // justifyContent: "center",
  },
  IconView: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  txt: {
    fontFamily: "RubikBold",
    color: color.black,
    marginBottom: 10,
  },

  addressView: {
    paddingHorizontal: 10,
  },
});
