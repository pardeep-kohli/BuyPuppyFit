import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import FilterBackButton from "./FilterBackButton";
export default function FilterList({ navigation }) {
  return (
    <View style={styles.parent}>
      <FilterBackButton onPress={() => navigation.goBack()} />
      <View style={styles.TextView}>
        <Text style={styles.text}>Select Sort</Text>

        <Text style={styles.text2}>Best Selling</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    paddingBottom: 10,
    backgroundColor: color.text_primary,
    flexDirection: "row",
    paddingTop: 20,
    elevation: 8,
  },

  text: {
    fontSize: 12,
    color: color.black,
    fontFamily: "Bold",
  },
  text2: {
    fontSize: 15,
    color: color.black,
    fontFamily: "Bold",
  },

  TextView: {
    paddingHorizontal: 10,
  },
});
