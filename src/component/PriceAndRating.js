import { View, Text, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Entypo from "react-native-vector-icons/Entypo";
import { SIZES } from "../assets/theme/theme";
import { colorsDark } from "react-native-elements/dist/config";

export default function PriceAndRating({
  AprroxRating,
  SizeDescription,
  Price,
  Time,
  Rating,
}) {
  return (
    <View style={styles.middleView}>
      <View style={styles.DescriptionRow}>
        <View style={styles.DescriptionRow1}>
          <View style={styles.item}>
            <Text style={styles.text}>{Price}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.text, { color: color.white }]}>{Time}</Text>
          </View>
          <View style={[styles.item, { flexDirection: "row" }]}>
            <Entypo name="star" color={color.text_primary} size={20} />
            <Text style={[styles.text, { color: color.white }]}> {Rating}</Text>
          </View>
        </View>
        <View style={styles.DescriptionRow2}>
          <View style={styles.item}>
            <Text style={styles.txt2}>MRP</Text>
          </View>
          <View style={styles.item}>
            {/* <Text style={styles.txt2}>Delivery Time</Text> */}
          </View>
          <View style={styles.item}>
            <Text style={styles.txt2}>{AprroxRating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  middleView: {
    marginVertical: 20,
    backgroundColor: color.primary_color,
    borderRadius: 10,
  },
  DescriptionRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  DescriptionRow2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  DescriptionRow: {
    paddingVertical: 10,
  },
  text: {
    fontWeight: "500",
    color: color.text_primary,
    fontSize: SIZES.h3 + 1,
  },
  txt2: {
    fontSize: SIZES.h3 - 1,
    color: color.white,
  },
});
