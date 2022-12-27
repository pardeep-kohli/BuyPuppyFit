import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import color from "../theme/color";
import Checkbox from "expo-checkbox";

export default function CheckBox({ optionName }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.parent}>
      <View>
        <Checkbox
          styles={styles.CheckBox}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked == true ? color.violet : undefined}
        />
      </View>
      <View style={styles.optionName}>
        <Text style={styles.optionName}>{optionName}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    // justifyContent:'space-between',
    // borderWidth:1,
    // width:'100%',
  },
  optionName: {
    fontFamily: "Regular",
    color: color.black,
    marginLeft: 3,
  },
  CheckBox: {
    borderColor: color.grey,
  },
});
