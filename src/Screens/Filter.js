import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { MaterialIcons } from "@expo/vector-icons";
import FilterList from "../component/FilterList";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";
export default function Filter({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.primary_color} />
      <FilterList />
      <View style={styles.SubHeaderView}>
        <View style={styles.outerView}>
          <MaterialIcons
            style={styles.icon}
            name="arrow-forward"
            size={30}
            color={color.black}
          />

          <View style={styles.filterTextView}>
            <Text style={styles.catText}>Category</Text>
          </View>
        </View>

        <View style={styles.outerView}>
          <MaterialIcons
            style={styles.icon}
            name="arrow-forward"
            size={30}
            color={color.black}
          />
          <View style={styles.filterTextView}>
            <Text style={styles.catText}>Price Range</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonView}>
        <View>
          <VioletButton buttonName="APPLY" />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <VioletButton buttonName="RESET" />
        </View>
      </View>
      <View style={{ paddingVertical: 20 }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
  },
  filterTextView: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  outerView: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: color.white,
    paddingVertical: 14,
  },
  filterTextView1: {
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 250,
    alignItems: "flex-end",
  },
  catText: {
    color: color.black,
    fontWeight: "500",
    fontSize: SIZES.h3,
  },
  SubHeaderView: {
    backgroundColor: color.white,
  },
});
