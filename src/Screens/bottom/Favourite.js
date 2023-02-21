import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import color from "../../assets/theme/color";
import Header from "../../component/Header";
import Categories from "../Categories";
import PriceAndRating from "../../component/PriceAndRating";
import CategoryHeading from "../../component/CategoryHeading";
import MyBagClubCard from "../../component/MyBagClubCard";
import { SIZES } from "../../assets/theme/theme";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import * as qs from "qs";

export default function Favourite({ navigation }) {
  const reduxUser = useSelector((state) => state.user);
  const reduxWish = useSelector((state) => state.wish);
  console.log("reduxwish", reduxWish.wish);

  // const [saveFavList, setSaveFavList] = useState([]);

  const renderItem = ({ item, index }) => {
    console.log("item====>", item);
    return (
      <>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.id,
            })
          }
        >
          <View style={styles.parent}>
            <View style={styles.imgView}>
              <ImageBackground
                // resizeMode="contain"
                style={{
                  height: SIZES.height / 5,
                  width: "100%",
                }}
                imageStyle={{
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                }}
                source={{ uri: item.image }}
              />
            </View>
            {/* {icon && ( */}
            <View style={styles.iconView}>
              <TouchableOpacity
              // onPress={() => handleCheck()}
              // onPress={ProcessAddwishlist}
              >
                {/* {isLiked == false ? ( */}
                <Ionicons
                  name="ios-heart-outline"
                  size={25}
                  color={color.text_primary}
                />
                {/* ) : ( */}
                {/* <Ionicons name="ios-heart-sharp" size={25} color={color.label_bg} /> */}
                {/* )} */}
              </TouchableOpacity>
            </View>
            {/* )} */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.typeTxt}>{item.name}</Text>
              <Text style={styles.nameTxt}>{item.name}</Text>
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
                  ${item.price}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const emptyComponent = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>
          No Record Found
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <StatusBar backgroundColor={color.violet} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>Favourite Item</Text>
        {/* <Text style={styles.qunTxt}>(6 Items)</Text> */}
      </View>
      <FlatList
        data={reduxWish.wish}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.product_id}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={emptyComponent}
      />
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  headingView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headingTxt: {
    fontSize: SIZES.h2,
    color: color.primary_color2,
    fontFamily: "RubikBold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  qunTxt: {
    color: color.text_primary,
    fontFamily: "RubikMed",
  },
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
