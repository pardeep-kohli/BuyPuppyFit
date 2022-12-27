import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import color from "../theme/color";
export default function FilterBackButton({ navigation, onPress }) {
  return (
    <TouchableOpacity>
      <View>
        <MaterialIcons
          style={styles.icon}
          name="arrow-back"
          size={30}
          color={color.white}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});
