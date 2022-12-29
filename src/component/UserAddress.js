import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SIZES } from "../assets/theme/theme";
export default function UserAddress({ Address, Place }) {
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
        <Text style={styles.UserAddress}>{Address}</Text>
        <View style={styles.IconView}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color={color.light_grey}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={color.light_grey}
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
    fontFamily: "Regular",
    fontSize: SIZES.h3 - 4,
  },
  parent: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  IconView: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  txt: {
    fontWeight: "bold",
    color: color.black,
    marginBottom: 10,
  },

  addressView: {
    paddingHorizontal: 10,
  },
});
