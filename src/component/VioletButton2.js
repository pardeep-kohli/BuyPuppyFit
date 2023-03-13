import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function VioletButton2({ buttonName, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.5}
    >
      <View>
        <Text
          style={{
            color: color.primary_color,
            fontFamily: "SegoeUIBold",
            fontSize: SIZES.h3,
          }}
        >
          {buttonName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: color.text_primary,
    width: "100%",
  },
});
