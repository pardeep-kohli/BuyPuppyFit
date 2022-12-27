import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SIZES } from "../assets/theme/theme";
import color from "../assets/theme/color";

export default function ItemDetail({
  ImgSrc,
  BreedType,
  Availability,
  BreedName,
  bornDate,
  leaveDate,
  fatherName,
  motherName,
}) {
  return (
    <View style={styles.ParentView}>
      <View
        style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}
      >
        <Image resizeMode="contain" style={styles.imageStyle} source={ImgSrc} />
      </View>
      <View
        style={{
          flex: 0.6,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text style={styles.txt1}>{Availability}</Text>
        <View style={styles.dtlView}>
          <Text style={styles.txt2}>BREED: </Text>
          <Text style={styles.txt3}>{BreedType}</Text>
        </View>
        <Text style={styles.txt4}>{BreedName}</Text>
        <View style={styles.dtlView}>
          <Text style={styles.txt5}>BORN: </Text>
          <Text style={styles.txt3}>{bornDate}</Text>
        </View>
        <View style={styles.dtlView}>
          <Text style={styles.txt5}>LEAVE: </Text>
          <Text style={styles.txt3}>{leaveDate}</Text>
        </View>
        <View style={styles.dtlView}>
          <Text style={styles.txt5}>FATHER: </Text>
          <Text style={[styles.txt3, { fontSize: SIZES.h4 - 0.5 }]}>
            {fatherName}
          </Text>
        </View>
        <View style={styles.dtlView}>
          <Text style={styles.txt5}>MOTHER: </Text>
          <Text style={[styles.txt3, { fontSize: SIZES.h4 - 0.5 }]}>
            {motherName}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ParentView: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingTop: 20,
    paddingHorizontal: 20,
  },
  imageStyle: {
    height: hp(15),
    width: hp(20),
  },
  dtlView: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  txt1: {
    color: "#2E6900",
    fontWeight: "bold",
    fontSize: SIZES.h3,
    marginBottom: 5,
  },
  txt2: {
    color: color.black,
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  txt3: {
    color: color.black,
    fontSize: SIZES.h3,
  },
  txt4: {
    fontSize: SIZES.h3 + 2,
    color: color.black,
    fontWeight: "bold",
    marginBottom: 15,
  },
  txt5: {
    fontWeight: "bold",
    fontSize: 15,
    color: color.light_grey,
  },
});
