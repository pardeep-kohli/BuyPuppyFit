import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

import color from "../assets/theme/color";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
export default function ratingView() {
  const [data, setData] = useState();

  // if (data == 0) {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // } else if (data == 1) {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // } else if (data == 2) {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // } else if (data == 3) {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // } else if (data == 4) {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star-outlined" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View style={{ flexDirection: "row" }}>
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //       <Entypo name="star" size={30} color={color.primary_color} />
  //     </View>
  //   );
  // }
  return (
    <View>
      <TouchableOpacity>
        <Entypo name="star-outlined" size={30} color={color.primary_color} />
      </TouchableOpacity>
    </View>
  );
}
