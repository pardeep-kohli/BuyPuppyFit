import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";

export default function Heading({ HeadLine }) {
  return (
    <View style={styles.HeadLine}>
      <Text style={styles.text}>{HeadLine}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  HeadLine: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 15,
    paddingVertical: 10,

    marginVertical: 10,
  },
  text: {
    color: "white",
    fontFamily: "RubikBold",
    // fontWeight: "bold",
    fontSize: 15,
    color: color.text_primary,
  },
});
