import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../component/Header";

import color from "../assets/theme/color";
import { FONTS, SIZES } from "../assets/theme/theme";
import { Divider, List } from "react-native-paper";
import CategoryHeading2 from "../component/CategorryHeading2";
import axios from "axios";
import * as qs from "qs";
import { SafeAreaView } from "react-native";
import { connect, useSelector } from "react-redux";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { storeCart } from "../store/cart/cartAction";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

const HelpFAQ = ({ navigation, rdStoreCart }) => {
  const [expendedSec1, setExpandedSec1] = useState(true);
  const [expendedSec2, setExpandedSec2] = useState(true);
  const [faq, setFaq] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const lang_id = localStorage.getItem("lang_id");
  const reduxUser = useSelector((state) => state.user);

  const handleexpendedSec1 = () => setExpandedSec1(!expendedSec1);

  const handleexpendedSec2 = () => setExpandedSec2(!expendedSec2);

  useEffect(() => {
    var policyHeader = new Headers();
    policyHeader.append("accept", "application/json");
    policyHeader.append("Content-Type", "application/x-www-form-urlencoded");
    policyHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var policyData = qs.stringify({
      get_faq: "1",
      lang_id: lang_id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        policyData,
        {
          headers: policyHeader,
        }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setFaq(response.data.data);
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
      <View style={styles.container}>
        <Header
          navigation={navigation}
          cart={() =>
            reduxUser.customer.id == ""
              ? showMessage({
                  message: `${t("Please Login")}`,
                  description: `${t("Please login before check you cart")}`,
                  type: "default",
                  backgroundColor: color.red,
                })
              : navigation.navigate("CheckoutStack")
          }
        />
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{t("FAQ")}</Text>
        </View>
        {/* <CategoryHeading2 CategoryName={"HELP AND FAQ"} /> */}
        {/* <HamburgerHeader hamTitle={"FAQ"} /> */}
        <ScrollView style={{ backgroundColor: color.background_color }}>
          <List.Section>
            <List.Accordion
              style={{
                elevation: 6,
                shadowColor: color.black,
                backgroundColor: color.primary_color,
                marginHorizontal: 10,
                borderRadius: 5,
                // marginTop: 20,
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
              titleStyle={{ color: "black", fontSize: 18, fontWeight: "bold" }}
              title={
                <View>
                  <Text
                    style={{
                      fontFamily: "RubikMed",
                      color: color.text_primary,
                      fontSize: SIZES.h3,
                    }}
                  >
                    {faq.question}
                  </Text>
                </View>
              }
              right={(props) =>
                expendedSec1 ? (
                  // <List.Icon {...props} icon="chevron-down" color="black" />
                  <View style={{ flexDirection: "row" }}>
                    {/* <List.Icon {...props} icon="download" color="black" /> */}
                    <List.Icon
                      {...props}
                      icon="minus-circle"
                      color={color.text_primary}
                    />
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <List.Icon
                      {...props}
                      icon="plus-circle"
                      color={color.text_primary}
                    />
                  </View>
                )
              }
              expended={expendedSec1}
              onPress={handleexpendedSec1}
            >
              <List.Accordion
                right={(props) => <List.Icon {...props} />}
                titleStyle={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  // marginHorizontal: 10,
                }}
                title={faq.answer}
              ></List.Accordion>
            </List.Accordion>
          </List.Section>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background_color,
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
const mapStateToProps = (state) => {
  return {
    redduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(HelpFAQ);
// export default HelpFAQ;
