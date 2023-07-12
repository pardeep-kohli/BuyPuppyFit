import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import axios from "axios";
import * as qs from "qs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
import { connect, useSelector } from "react-redux";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { storeCart } from "../store/cart/cartAction";

const TermsConditions = ({ navigation, rdStoreCart }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [conditionContent, setConditionContent] = useState([]);
  const isFocused = useIsFocused();

  const reduxUser = useSelector((state) => state.user);

  useEffect(() => {
    var conditionHeader = new Headers();
    conditionHeader.append("accept", "application/json");
    conditionHeader.append("Content-Type", "application/x-www-form-urlencoded");
    conditionHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var conditionData = qs.stringify({
      get_content: "1",
      page_name: "Terms and Conditions",
      lang_id: "1",
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        conditionData,
        {
          headers: conditionHeader,
        }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setConditionContent(response.data.data);
        }
      });
  }, []);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <StatusBar backgroundColor={color.primary_color} />
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{conditionContent.title}</Text>
        </View>
        {/* <CategoryHeading2 CategoryName="ABOUT US" /> */}
        <View style={styles.parent}>
          <View style={styles.descriptionView}>
            <Text style={styles.text}>{conditionContent.content}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  descriptionView: {
    paddingTop: 20,
    minHeight: hp(40),
  },
  parent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: color.primary_color,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  descriptiontext2: {
    paddingTop: 20,
  },
  text: {
    fontFamily: "RubikLight",
    textAlign: "justify",
    color: color.white,
    fontSize: SIZES.h4 + 2,
  },
  heading: {
    color: color.text_primary,
    fontFamily: "RubikBold",
    fontSize: 20,
  },
  headingView: {
    paddingTop: 10,
  },
  headerView: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
});
// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);
export default TermsConditions;
