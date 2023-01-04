import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";

export default function MyBagClubCard({
  breedName,
  breedType,
  price,
  disPrice,
  img,
  icon,
}) {
  const [selFav, setSelFav] = useState();

  const handleChecked = () => {
    setSelFav(!selFav);
  };
  return (
    <View style={styles.parent}>
      <View style={styles.imgView}>
        <ImageBackground
          // resizeMode="contain"
          style={{
            height: SIZES.height / 5,
            width: "100%",
          }}
          imageStyle={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }}
          source={img}
        />
      </View>
      {icon && (
        <View style={styles.iconView}>
          {!selFav ? (
            <TouchableOpacity onPress={handleChecked}>
              <Ionicons
                name="ios-heart-outline"
                size={25}
                color={color.text_primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleChecked}>
              <Ionicons
                name="ios-heart-sharp"
                size={25}
                color={color.label_bg}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.typeTxt}>{breedType}</Text>
        <Text style={styles.nameTxt}>{breedName}</Text>
      </View>

      <View style={styles.price}>
        {/* <Text style={styles.OldPrice}>{price}</Text> */}
        <View>
          <Text
            style={{
              color: color.primary_color,
              fontFamily: "RubikBold",
              fontSize: SIZES.h2 - 2,
            }}
          >
            {disPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  price: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  parent: {
    flex: 1,
    // borderWidth: 0.5,
    borderRadius: 25,
    borderColor: color.primary_color,
    marginHorizontal: SIZES.width / 64,
    marginVertical: SIZES.height / 64,
    paddingBottom: SIZES.height / 64,
    // paddingHorizontal: SIZES.width / ,
    backgroundColor: color.white,

    width: SIZES.width / 2.55,
    // overflow: "hidden",
    elevation: 4,

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
    overflow: "hidden",
    marginBottom: 10,
  },
  nameTxt: {
    fontSize: SIZES.h3 - 4,
    color: color.text_primary,
    fontFamily: "RubikMed",
    // marginBottom: 5,
  },
  typeTxt: {
    color: color.primary_color,
    fontSize: SIZES.h2 - 6,
    fontFamily: "RubikSemiBold",
  },

  OldPrice: {
    textDecorationLine: "line-through",
    color: color.light_grey,
    fontWeight: "500",
  },
  iconView: {
    position: "absolute",
    left: 8,
    bottom: 0,
    top: 10,
  },
});
