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
import axios from "axios";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";

import {
  storeOnSaleFav,
  storeOnSaleRemove,
  storeWish,
} from "../store/wishlist/WishAction";
import { connect } from "react-redux";

const MyBagClubCard = ({
  breedName,
  breedType,
  disPrice,
  img,
  icon,
  product_id,
  reduxWish,
  wishlist,
  rdStoreFav,
  rdStoreRemove,
  onLikePost,
  onRemovePost,
}) => {
  const reduxUser = useSelector((state) => state.user);

  const ProcessAddWishlist = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("addwishlist", "1");
    bodyFormData.append("lang_id", "1");
    bodyFormData.append("user_id", reduxUser.customer.id);
    bodyFormData.append("product_id", product_id);

    fetch("https://codewraps.in/beypuppy/appdata/webservice.php", {
      body: bodyFormData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.success == 1) {
          rdStoreFav(product_id);
          onLikePost && onLikePost(product_id);
          showMessage({
            message: "Success ",
            description: "Item added to wishlist",
            type: "success",
          });
        } else {
          showMessage({
            message: "Error ",
            description: "Item Already Exists in Wishlist",
            type: "error",
          });
        }
      })
      .catch((error) =>
        showMessage({
          message: "Error ",
          description: "Some error occur",
          type: "error",
        })
      );
    // }
  };

  const processRemoveWishlist = () => {
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
        if (response?.success == 1) {
          rdStoreRemove(product_id);
          onRemovePost && onRemovePost(product_id);
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
      .catch((err) =>
        showMessage({
          message: "Error ",
          description: "Some error occur",
          type: "error",
        })
      );
  };

  const handleCheck = () => {
    if (+wishlist) {
      processRemoveWishlist();
    } else {
      ProcessAddWishlist();
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.imgView}>
        <ImageBackground
          // resizeMode="contain"
          style={{
            height: SIZES.height / 5,
            width: SIZES.height / 5,
          }}
          imageStyle={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }}
          source={img}
        />
      </View>
      {icon && (
        <View style={styles.iconView}>
          <TouchableOpacity
            onPress={() => handleCheck()}
            // onPress={() => rdStoreWish(item)}
          >
            {wishlist == 1 ? (
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
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal:10,
        }}
      >
        <Text style={styles.typeTxt} numberOfLines={1}>{breedName}</Text>
        <Text style={styles.nameTxt} numberOfLines={1}>{breedType}</Text>
      </View>

      <View style={styles.price}>
        {/* <Text style={styles.OldPrice}>{price}</Text> */}
        <View>
          <Text
            style={{
              color: color.primary_color,
              fontFamily: "RubikSemiBold",
              fontSize: SIZES.h2 - 2,
            }}
          >
            ${disPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};
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
    marginBottom: 5,
    borderTopLeftRadius:25,
    borderTopRightRadius:25
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
    fontFamily: "RubikBold",
  },
  iconView: {
    position: "absolute",
    left: 8,
    bottom: 0,
    top: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    reduxWish: state.wish,
    reduxOnSale: state.wish.onSale,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreWish: (newWish) => dispatch(storeWish(newWish)),
    rdStoreFav: (newWish) => dispatch(storeOnSaleFav(newWish)),
    rdStoreRemove: (newWish) => dispatch(storeOnSaleRemove(newWish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBagClubCard);
