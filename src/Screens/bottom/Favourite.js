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
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import * as qs from "qs";
import { showMessage } from "react-native-flash-message";
import { storeOnSaleRemove } from "../../store/wishlist/WishAction";

const Favourite = ({ navigation, rdStoreRemove }) => {
  const reduxUser = useSelector((state) => state.user);
  const reduxWish = useSelector((state) => state.wish);

  const [saveFavList, setSaveFavList] = useState([]);

  const getFavList = () => {
    var favHeader = new Headers();
    favHeader.append("accept", "application/json");
    favHeader.append("Content-Type", "application/x-www-form-urlencoded");
    favHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var favData = qs.stringify({
      wishlist: "1",
      user_id: reduxUser.customer.id,
      lang_id: "1",
    });

    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", favData, {
        headers: favHeader,
      })
      .then(function (response) {
        console.log("favlist", response.data.data);
        if (response.data.success == 1) {
          // setSaveFavList(response.data.data);
          setSaveFavList(response?.data?.data || []);
        } else {
          setSaveFavList([]);
        }
      });
  };
  const processRemoveWislist = (product_id) => {
    let payload = new FormData();
    payload.append("removewishlist", "1");
    payload.append("user_id", reduxUser.customer.id);
    payload.append("product_id", product_id);

    fetch("https://codewraps.in/beypuppy/appdata/webservice.php", {
      body: payload,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Deleted", response);
        if (response?.success == 1) {
          const updatedFav = saveFavList.filter(
            (item) => item.product_id != product_id
          );

          setSaveFavList(updatedFav);
          rdStoreRemove(product_id);

          showMessage({
            message: "Success",
            description: response?.message,
            type: "default",
            backgroundColor: color.text_primary,
          });
        } else {
          showMessage({
            message: "Error",
            description: response?.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      })
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    getFavList();
    navigation.addListener("focus", () => getFavList());
  }, []);

  const renderItem = ({ item, index }) => {
    console.log("item====>", item);
    return (
      <>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
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
                source={{ uri: item.product_image }}
              />
            </View>
            {/* {icon && ( */}
            <View style={styles.iconView}>
              <TouchableOpacity
                onPress={() => processRemoveWislist(item.product_id)}
                z-index={10}
                // onPress={ProcessAddwishlist}
              >
                {/* {isLiked == false ? ( */}
                {/* <Ionicons name="ios-heart-outline" size={25} color={color.text_primary} /> */}
                {/* ) : ( */}
                {/* <Ionicons name="ios-heart-sharp" size={25} color={color.label_bg} /> */}
                {/* )} */}
                {item.wishlist == 1 ? (
                  <Ionicons
                    name="ios-heart-sharp"
                    size={25}
                    color={color.label_bg}
                  />
                ) : (
                  <Ionicons
                    name="ios-heart-outline"
                    size={25}
                    color={color.text_primary}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* )} */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal:10
              }}
            >
              <Text style={styles.typeTxt} numberOfLines={1}>{item.product_name}</Text>
              <Text style={styles.nameTxt} numberOfLines={1}>{item.product_name}</Text>
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
                  ${item.product_price}
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
        // data={reduxWish.wish}
        data={saveFavList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.product_id}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={emptyComponent}
      />
    </View>
    // </View>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreRemove: (newWish) => dispatch(storeOnSaleRemove(newWish)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);

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
