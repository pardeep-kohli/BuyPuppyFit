import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { styles } from "../component/Styles";
const down_img = require("../assets/images/down.png");
const state = [
  "Delhi",
  "Haryana",
  "Punjab",
  "Bihar",
  "Uttar Pradesh",
  "Delhi",
  "Haryana",
  "Punjab",
  "Bihar",
];

export default function StateDropdown({ label, ...props }) {
  return (
    <View>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={state}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.text_button}
          rowTextStyle={styles.row_text}
          dropdownStyle={styles.dropdown_style}
          {...props}
        />
        <Image style={styles.downimg} source={down_img}></Image>
      </View>
    </View>
  );
}
