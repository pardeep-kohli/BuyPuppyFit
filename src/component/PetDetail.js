import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
export default function PetDetail({ reportTxt, img }) {
  return (
    <TouchableOpacity style={styles.mainView}>
      <View style={styles.imgView}>
        <Image resizeMode="contain" style={styles.img} source={img} />
      </View>

      <View style={styles.txtView}>
        <Text style={styles.txt}>{reportTxt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.text_primary,
    paddingVertical: SIZES.height / 36,
    height: wp(22),
    width: wp(27),
    borderRadius: 6,
    marginVertical: 10,
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: SIZES.height / 20,
    width: SIZES.width / 7,
    tintColor: color.text_primary,
  },
  txtView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  txt: {
    textAlign: "center",
    fontSize: SIZES.h4 - 6,
    fontWeight: "bold",
    color: color.white,
  },
});
