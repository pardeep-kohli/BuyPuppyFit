import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import color from "../../assets/theme/color";
import AntDesign from "react-native-vector-icons/AntDesign";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FONTS } from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";

export default function Previous_Button({ onPress }) {
  const { t, i18n } = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        borderWidth: 2,
        width: wp(30),
        borderRadius: 20,
        padding: 5,
        backgroundColor: color.text_primary,
        borderColor: color.white,
      }}
    >
      <View
        // colors={[color.dark_theme, color.light_theme]}
        // start={{ x: 0, y: 0.75 }}
        // end={{ x: 1, y: 0.25 }}
        style={styles.button}
      >
        {/* <AntDesign
          name="arrowleft"
          size={20}
          color={color.white}
          style={{ marginRight: 10 }}
        /> */}
        <Text style={styles.next}>{t("Previous")}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    // backgroundColor: color.text_primary,
  },
  next: {
    fontSize: hp(2),
    color: color.primary_color,
    fontFamily: "Bold",
  },
});
