import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";

export default function CategoryHeading2({ CategoryName, number }) {
  return (
    <Text style={styles.text}>
      <Text style={styles.CategoryName}>{CategoryName}</Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    backgroundColor: color.text_primary,
    color: "white",
    paddingVertical: 10,
  },
  CategoryName: {
    fontFamily: "RubikBold",
    color: color.primary_color2,
    fontSize: SIZES.h3,
  },
});
