import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";
export default function SearchBox({ onPress }) {
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: color.primary_color,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30,
      }}
    >
      <View style={styles.parent}>
        <View
          style={{
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="search1" size={20} color={color.primary_color} />
        </View>
        <View style={{ flexDirection: "row", flex: 2, alignItems: "center" }}>
          {/* <View>
          <Text style={{fontWeight:'bold'}}>Delivering To:</Text>
        </View> */}
          <View
            style={{
              // marginHorizontal: 10,
              // backgroundColor: "red",
              width: wp(74),
            }}
          >
            <TextInput placeholder="Search" />
          </View>
        </View>
        <View style={styles.ImageView}>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{
                height: hp(2.5),
                width: hp(2.5),
                marginRight: 10,
                tintColor: color.primary_color,
              }}
              source={require("../images/filter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    // marginTop: 20,
    paddingVertical: 10,
    borderColor: color.primary_color,
    paddingHorizontal: 8,
    backgroundColor: color.white,
  },
  ImageView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
