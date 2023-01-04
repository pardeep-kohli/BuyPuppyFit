import { View, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { styles } from "../component/Styles";
const down_img = require("../assets/images/down.png");
const category = ["Goverment", "Private", "Self-Employee"];
export default function CategoryDropdown({ label, ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label_text}>{label}</Text>
      <View style={{ flexDirection: "row" }}>
        <SelectDropdown
          data={category}
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
