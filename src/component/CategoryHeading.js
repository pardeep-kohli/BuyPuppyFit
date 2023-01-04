import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";

export default function CategoryHeading({ CategoryName, number }) {
  return (
    <Text style={styles.text}>
      <Text style={styles.CategoryName}>{CategoryName}</Text>
      <Text
        style={{
          color: color.black,
          fontFamily: "RubikRegular",
          fontSize: SIZES.h3,
        }}
      >
        {" "}
        ({number} Items)
      </Text>
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
    color: color.black,
    fontSize: SIZES.h3,
  },
});
