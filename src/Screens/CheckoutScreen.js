import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  RefreshControl,
} from "react-native";
import Header from "../component/Header";
import CategoryHeading from "../component/CategoryHeading";
import color from "../assets/theme/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SIZES } from "../assets/theme/theme";
import VioletButton from "../component/VioletButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

import * as qs from "qs";

const CheckoutScreen = ({ navigation, route }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [apistatus, setApiStatus] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [shipping, setShipping] = useState("");
  const [totalItems, setTotalItems] = useState("");

  const reduxUser = useSelector((state) => state.user);

  const getCartData = () => {
    var CheckoutHeader = new Headers();
    CheckoutHeader.append("accept", "application/json");
    CheckoutHeader.append("Content-Type", "application/x-www-form-urlencoded");
    CheckoutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    // var CheckoutData = new FormData();
    // CheckoutData.append("viewcart", "1");
    // CheckoutData.append("user_id", reduxUser.customer.id);
    // CheckoutData.append("lang_id", "1");

    var CheckoutData = qs.stringify({
      viewcart: "1",
      user_id: reduxUser.customer.id,
      lang_id: "1",
    });

    if (!isDataLoaded) {
      console.log("is", isDataLoaded);

      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          CheckoutData,
          { headers: CheckoutHeader }
        )
        .then(function (response) {
          console.log("response", response.data);
          if (response.data.success == 1) {
            // setIsDataLoaded(true);
            setCartData(response.data.data);
            setGrandTotal(response.data.geranttotal);
            setShipping(response.data.delivery_charge);
            setTotalItems(response.data.total_product);
            setSubTotal(response.data.subtotal);
            showMessage({
              message: "success",
              description: response.data.message,
              type: "default",
              backgroundColor: "green",
            });
          } else {
            showMessage({
              message: "fail",
              description: response.data.message,
              type: "default",
              backgroundColor: "red",
            });
          }
        });
    }
  };

  console.log("cartdata", cartData);

  useEffect(() => {
    getCartData();
    navigation.addListener("focus", () => getCartData());
  }, []);

  const deleteSelectedElement = (id) => {
    Promise.resolve()
      .then(() => {
        setApiStatus(!apistatus);
        console.log("apistatus", apistatus);
      })
      .then(() => {
        // var deleteData = new FormData();
        // deleteData.append("removeformcart", "1");
        // deleteData.append("lang_id", "1");
        // deleteData.append("user_id", reduxUser.customer.id);
        // deleteData.append("product_id", id);

        var deleteData = qs.stringify({
          removeformcart: "1",
          lang_id: "1",
          user_id: reduxUser.customer.id,
          product_id: id,
        });

        var deleteHeader = new Headers();
        deleteHeader.append("accept", "application/json");
        deleteHeader.append(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        deleteHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

        axios
          .post(
            "https://codewraps.in/beypuppy/appdata/webservice.php",
            deleteData,
            { headers: deleteHeader }
          )
          .then(function (response) {
            console.log("deleteres", response);
            if (response.data.success == 1) {
              let temp = [];
              cartData.forEach((item) => {
                if (item.id !== id) temp.push(item);
                showMessage({
                  message: "success",
                  description: response.data.message,
                  type: "default",
                  backgroundColor: "green",
                });
                getCartData();
              });
            } else {
              showMessage({
                message: "Fail",
                description: response.data.message,
                type: "default",
                backgroundColor: "red",
              });
            }
          })
          .catch((error) => console.log("error", error));
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCartData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <Header navigation={navigation} />
      <CategoryHeading CategoryName={"REVIEW YOUR CART"} number={totalItems} />

      <View style={styles.view1}>
        <Text style={styles.txt1}>
          Swipe left to remove a product from the cart.
        </Text>
      </View>
      <>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cartData.map((item) => (
            // console.log("mapItem", item)

            <View style={styles.mainView}>
              <View style={styles.imgView}>
                <ImageBackground
                  // resizeMode="contain"
                  style={styles.img}
                  source={{ uri: item.product_image }}
                  imageStyle={{ borderRadius: 10 }}
                />
              </View>
              <View style={styles.dtlView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: SIZES.height / 64,
                  }}
                >
                  <View>
                    <Text style={styles.dogTxt}>{item.product_name}</Text>
                  </View>

                  <TouchableOpacity
                    // onPress={() => processDeleteItem(item.product_id)}
                    onPress={() => deleteSelectedElement(item.product_id)}
                  >
                    <Text>remove</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ borderWidth: 0.3, borderColor: color.light_grey }}
                ></View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: SIZES.height / 64,
                  }}
                >
                  <Text style={styles.priceTxt}>PRICE</Text>
                  <Text style={styles.amountTxt}>${item.product_price}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Total</Text>

          <Text style={[styles.txt1, { fontFamily: "RubikMed" }]}>
            ({totalItems} items)
          </Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Sub Total</Text>

          <Text
            style={[
              styles.amountTxt,
              { color: color.primary_color2, fontFamily: "RubikBold" },
            ]}
          >
            ${subTotal}
          </Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Shipping</Text>

          <Text
            style={[
              styles.amountTxt,
              { fontFamily: "RubikRegular", color: color.primary_color2 },
            ]}
          >
            ${shipping}
          </Text>
        </View>
        {/* <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Taxes</Text>

          <Text style={[styles.amountTxt, { fontFamily: "RubikRegular" }]}>
            $0.00
          </Text>
        </View> */}

        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Grand Total</Text>

          <Text
            style={[
              styles.amountTxt,
              { color: color.black, fontFamily: "RubikBold" },
            ]}
          >
            ${grandTotal}
          </Text>
        </View>
      </>

      <VioletButton
        buttonName={"CHECKOUT"}
        onPress={() =>
          navigation.navigate("CheckoutAddress", { price: grandTotal })
        }
      />
      {/* <View style={styles.btnView2}>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnTxt2}>CHECKOUT</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  txt1: {
    fontFamily: "RubikSemiBold",
    color: color.light_grey,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // paddingHorizontal: SIZES.base,
    marginVertical: SIZES.height / 64 - 10,
    backgroundColor: color.white,
    flex: 1,
    paddingHorizontal: 10,
  },
  imgView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // overflow: "hidden",
    // backgroundColor: "red",
  },
  img: {
    height: SIZES.height / 10,
    width: "100%",
  },
  dtlView: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dogTxt: {
    fontSize: SIZES.h2 - 3,
    fontFamily: "RubikBold",
  },
  txt2: {
    fontSize: SIZES.h2 - 3,
    marginHorizontal: SIZES.width / 64,
  },
  priceTxt: {
    fontSize: SIZES.h3 + 2,
    fontFamily: "RubikBold",
    color: color.light_grey,
  },
  amountTxt: {
    color: color.light_grey,
    fontSize: SIZES.h3 + 2,
    fontFamily: "RubikSemiBold",
  },
  totalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 40,
    paddingVertical: SIZES.width / 40,
    backgroundColor: color.white,
    borderBottomColor: color.black,
    borderBottomWidth: 0.2,
  },
});

export default CheckoutScreen;
