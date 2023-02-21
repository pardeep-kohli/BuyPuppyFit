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

import { storeWish } from "../store/wishlist/WishAction";
import { connect } from "react-redux";
const MyBagClubCard = ({
  breedName,
  breedType,
  // price,
  disPrice,
  img,
  icon,
  product_id,
  isLiked = false,
  onLikePost = () => {},
  reduxWish,
  rdStoreWish,
  item,
}) => {
  // const [selFav, setSelFav] = useState();
  var wishIdArray = reduxWish.wishId;

  const reduxUser = useSelector((state) => state.user);

  // console.log("item");
  // console.log("wishIdArray", wishIdArray);

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  var urlencoded = qs.stringify({
    addwishlist: "1",
    lang_id: "1",
    user_id: reduxUser.customer.id,
    product_id: product_id,
  });

  const ProcessAddwishlist = () => {
    console.log("urlllll", urlencoded);

    if (!wishIdArray.includes(product_id)) {
      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          urlencoded,
          { headers: myHeaders }
        )
        .then(function (response) {
          console.log("addwish", response);

          if (response.data.success == 1) {
            if (
              reduxWish.wishId.length > 0 &&
              reduxWish.wishId.includes(product_id)
            ) {
              showMessage({
                message: "Error ",
                description: "Item Already in Wishlist",
                type: "error",
              });
            } else {
              var WishItem = {
                id: product_id,
                name: breedName,
                image: img,
                // rating: item.item.rating_total,
                price: parseInt(disPrice),
              };
              console.log("the  wish item", WishItem.image);
              var rWish = reduxWish.wish;
              var rWishId = reduxWish.wishId;
              rWishId.push(product_id);
              rWish.push(WishItem);
              var wishCount = rWishId.length;

              console.log("rWishId", rWishId);
            }
            var newWish = {
              wish: rWish,
              wishId: rWishId,
              wishCount: wishCount,
            };
            rdStoreWish(newWish);
            console.log("newwish", newWish);
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
        .catch((error) => console.log("err", error));
    }
  };
  // console.log("processadd", ProcessAddwishlist());

  const processRemoveWislist = () => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var deleteData = qs.stringify({
      removewishlist: "1",
      user_id: reduxUser.customer.id,
      product_id: product_id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        deleteData,
        { headers: myHeaders }
      )
      .then(function (response) {
        console.log("delewish", response);
        if (response.data.success == 1) {
          var WishItemId = product_id;
          var WishIdArray = reduxWish.wishId;
          // console.log("wISHID", wishIdArray);
          // console.log("WishItemId====>", WishItemId);
          var getIndexofwishObj = WishIdArray.indexOf(WishItemId);

          WishIdArray.splice(getIndexofwishObj, 1);
          var reduxWishData = reduxWish.wish;
          reduxWishData.splice(getIndexofwishObj, 1);
          // console.log("reduxCartData", reduxWishData);

          showMessage({
            message: "Success",
            description: response.data.message,
            type: "default",
            backgroundColor: color.text_primary,
          });

          var newWish = {
            wish: reduxWishData,
            wishId: WishIdArray,
            wishCount: parseInt(reduxWish.wishCount) - 1,
          };
          rdStoreWish(newWish);
          console.log("redux wish after delete", newWish);
        } else {
          showMessage({
            message: "Error",
            description: response.data.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      });
  };

  // const checkWishId = () => {
  //   return reduxWish.wishId.includes(product_id) ? true : false;
  // };

  // console.log("bool", isLiked);
  const handleCheck = () => {
    onLikePost(product_id);
    // console.log("isLike", isLiked);
    if (!isLiked) {
      ProcessAddwishlist();
    } else {
      processRemoveWislist();
    }
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
          <TouchableOpacity
            onPress={() => handleCheck()}
            // onPress={ProcessAddwishlist}
          >
            {isLiked == false ? (
              <Ionicons
                name="ios-heart-outline"
                size={25}
                color={color.text_primary}
              />
            ) : (
              <Ionicons
                name="ios-heart-sharp"
                size={25}
                color={color.label_bg}
              />
            )}
          </TouchableOpacity>
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
const mapStateToProps = (state) => {
  return {
    reduxWish: state.wish,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreWish: (newWish) => dispatch(storeWish(newWish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBagClubCard);
