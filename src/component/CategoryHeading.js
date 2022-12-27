import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";

export default function CategoryHeading({ CategoryName, number }) {
  return (
    <Text style={styles.text}>
      <Text style={styles.CategoryName}>{CategoryName}</Text>
      <Text style={{ color: color.black }}> ({number} Item)</Text>
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
    fontFamily: "Bold",
    color: color.black,
  },
});
