import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import color from "../assets/theme/color";
const BackButton = ({ onPress }) => {
  return (
    <View style={{ backgroundColor: color.primary_color, paddingVertical: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={30} color={color.white} />
      </TouchableOpacity>
    </View>
  );
};
export default BackButton;
