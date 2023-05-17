import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
export default function PetDetail({ reportTxt, img, marginRight }) {
  return (
    <View style={[styles.mainView, { marginRight: marginRight }]}>
      <View style={styles.imgView}>
        <Image resizeMode="contain" style={styles.img} source={img} />
      </View>

      <View style={styles.txtView}>
        <Text style={styles.txt}>{reportTxt}</Text>
      </View>
    </View>
  );
}
console.log("wp", wp(1));

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.text_primary,
    paddingVertical: SIZES.height / 30,
    height: wp(24),
    width: wp(24),
    borderRadius: 6,
    marginVertical: 10,
    // marginHorizontal: wp(1.1),
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: SIZES.height / 25,
    width: SIZES.width / 2,
    tintColor: color.text_primary,
    // marginBottom: 10,
  },
  txtView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  txt: {
    textAlign: "center",
    fontSize: SIZES.h4 - 5,
    fontFamily: "RubikMed",
    color: color.white,
  },
});
