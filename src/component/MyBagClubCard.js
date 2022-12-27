import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";

export default function MyBagClubCard({
  breedName,
  breedType,
  price,
  disPrice,
  img,
}) {
  return (
    <View style={styles.parent}>
      <View style={styles.imgView}>
        <Image
          resizeMode="contain"
          style={{
            height: SIZES.height / 8,
            width: SIZES.width / 2,
            alignSelf: "center",
          }}
          source={img}
        />
      </View>
      <Text style={styles.nameTxt}>{breedName}</Text>
      <Text style={styles.typeTxt}>{breedType}</Text>

      <View style={styles.price}>
        <Text style={styles.OldPrice}>{price}</Text>
        <View>
          <Text style={{ color: color.primary_color, fontWeight: "bold" }}>
            {disPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  parent: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: color.primary_color,
    marginHorizontal: SIZES.width / 64,
    marginVertical: SIZES.height / 64,
    paddingVertical: SIZES.height / 50,
    paddingHorizontal: SIZES.width / 40,
    backgroundColor: color.white,

    width: SIZES.width / 2.55,
    overflow: "hidden",
    // elevation: 5,

    // margin: wp(2),
    // borderRadius: wp(2),
    // padding: wp(0),
    // paddingTop: 0,
    // paddingHorizontal: 0,
    // overflow: "hidden",
    // width: wp(90),
    // elevation: 5,
    // marginLeft: 0,
    // padding: wp(2),
    // backgroundColor: "#fff",
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
  },
  nameTxt: {
    fontSize: SIZES.h4 - 3,
    color: color.light_grey,
    fontWeight: "bold",
    // marginBottom: 5,
  },
  typeTxt: {
    color: color.black,
    fontSize: SIZES.h3 - 2,
    fontWeight: "500",
  },

  OldPrice: {
    textDecorationLine: "line-through",
    color: color.light_grey,
    fontWeight: "500",
  },
});
