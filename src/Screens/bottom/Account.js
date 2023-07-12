import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import color from "../../assets/theme/color";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../component/Header";
import AccountDetail from "../../component/AccountDetail";
import Heading from "../../component/Heading";
import { SIZES } from "../../assets/theme/theme";
import { connect, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import { storeCart } from "../../store/cart/cartAction";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import * as qs from "qs";
import axios from "axios";

const Account = ({ navigation, rdStoreCart }) => {
  const reduxUser = useSelector((state) => state.user);

  // const isFocused = useIsFocused();
  // const getCartData = () => {
  //   var CheckoutHeader = new Headers();
  //   CheckoutHeader.append("accept", "application/json");
  //   CheckoutHeader.append("Content-Type", "application/x-www-form-urlencoded");
  //   CheckoutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  //   var CheckoutData = qs.stringify({
  //     viewcart: "1",
  //     user_id: reduxUser.customer.id,
  //     lang_id: "1",
  //   });

  //   // if (!isDataLoaded) {
  //   // console.log("is", isDataLoaded);

  //   axios
  //     .post(
  //       "https://codewraps.in/beypuppy/appdata/webservice.php",
  //       CheckoutData,
  //       { headers: CheckoutHeader }
  //     )
  //     .then(function (response) {
  //       console.log("cartresponse", response);
  //       if (response.data.success == 1) {
  //         var CartListData = response.data.data;
  //         var CartCount = CartListData.length;
  //         var CartSubTotal = response.data.subtotal;
  //         var CartDeliverChage = parseInt(response.data.delivery_charge);
  //         var CartGrandTotal = response.data.geranttotal;

  //         console.log("CartListData===>", CartListData);

  //         var CartId = [];
  //         var CartArray = [];

  //         for (var y = 0; y < CartCount; y++) {
  //           if (CartListData[y].product_id == null) {
  //             continue;
  //           }
  //           var temp = {
  //             id: CartListData[y].product_id,
  //             name: CartListData[y].product_name,
  //             slug: CartListData[y].product_slug,
  //             image: CartListData[y].product_image,
  //             price: CartListData[y].product_price,
  //           };
  //           CartArray.push(temp);

  //           CartId.push(CartListData[y].product_id);
  //         }

  //         var newCart = {
  //           cart: CartArray,
  //           cartCount: CartCount,
  //           cartId: CartId,
  //           subTotal: CartSubTotal,
  //           shipping: parseInt(CartDeliverChage),
  //           grandTotal: CartGrandTotal,
  //         };

  //         rdStoreCart(newCart);
  //         console.log("newCart", newCart);
  //       } else {
  //         // showMessage({
  //         //   message: "fail",
  //         //   description: response.data.message,
  //         //   type: "default",
  //         //   backgroundColor: "red",
  //         // });
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log("Error", error);
  //     });
  //   // }
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (isFocused) {
  //       getCartData();
  //     }
  //   }, [isFocused])
  // );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <View style={{ flexDirection: "row" }}>
          <AccountDetail
            AccountHolderName={
              reduxUser.customer.name == "" ? "Guest" : reduxUser.customer.name
            }
            PhoneNumber={reduxUser.customer.mobile}
            EmailId={reduxUser.customer.email}
          />
          <View style={{ position: "absolute", top: 20, right: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.text}>
                {reduxUser.customer.id == "" ? "" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Heading HeadLine="MY ACCOUNT" />

        {reduxUser.customer.id == "" ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{ height: SIZES.height / 2, width: "100%" }}
              source={require("../../images/login3.png")}
            />
            <Text style={{ fontSize: SIZES.h2, fontWeight: "bold" }}>
              Please Login
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyAddress")}
            style={{
              elevation: 5,
              borderRadius: 5,
              backgroundColor: color.white,
              paddingVertical: 15,
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            <View style={styles.Address}>
              <View style={styles.homeIcon}>
                <Entypo name="home" size={24} color="black" />
              </View>
              <View style={styles.txtView}>
                <Text
                  style={{ fontFamily: "RubikRegular", fontSize: SIZES.h3 }}
                >
                  Manage Address
                </Text>
              </View>
              <FontAwesome name="angle-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  txtView: {
    alignItems: "flex-start",
    flex: 0.8,
  },
  text: {
    color: color.black,
    fontFamily: "RubikMed",
    fontSize: SIZES.h3,
  },
});
// const mapStateToProps = (state) => {
//   return {
//     reduxUser: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Account);
export default Account;
