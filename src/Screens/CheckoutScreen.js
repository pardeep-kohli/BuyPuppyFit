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
import BackHeader from "../component/buttons/BackHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../component/Header";
import CategoryHeading from "../component/CategoryHeading";
import color from "../assets/theme/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SIZES } from "../assets/theme/theme";
import VioletButton from "../component/VioletButton";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

import * as qs from "qs";
import { storeCart } from "../store/cart/cartAction";
import { round } from "react-native-reanimated";
import { SafeAreaView } from "react-native";

const CheckoutScreen = ({ navigation, route, rdStoreCart }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [apistatus, setApiStatus] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [shipping, setShipping] = useState("0");
  const [totalItems, setTotalItems] = useState("");

  const reduxUser = useSelector((state) => state.user);

  const reduxCart = useSelector((state) => state.cart);
  console.log("reduxCart", reduxCart);

  const getCartData = () => {
    var CheckoutHeader = new Headers();
    CheckoutHeader.append("accept", "application/json");
    CheckoutHeader.append("Content-Type", "application/x-www-form-urlencoded");
    CheckoutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var CheckoutData = qs.stringify({
      viewcart: "1",
      user_id: reduxUser.customer.id,
      lang_id: "1",
    });

    if (!isDataLoaded) {
      // console.log("is", isDataLoaded);

      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          CheckoutData,
          { headers: CheckoutHeader }
        )
        .then(function (response) {
          console.log("cartresponse", response);
          if (response.data.success == 1) {
            setShipping(response.data.delivery_charge);
          }
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    }
  };

  const deleteSelectedElement = (id) => {
    // console.log("id", id);
    Promise.resolve()
      .then(() => {
        setApiStatus(!apistatus);
        // console.log("apistatus", apistatus);
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
              getCartData();
              var CartItemId = id;
              var cartIdArray = reduxCart.cartId;
              var getIndexofcartObj = cartIdArray.indexOf(CartItemId);

              cartIdArray.splice(getIndexofcartObj, 1);
              var reduxCartData = reduxCart.cart;
              console.log("reduxCartData", reduxCartData);
              reduxCartData[getIndexofcartObj].quantity;

              var newSubtotal =
                parseInt(reduxCart.subTotal) -
                parseInt(
                  // reduxCartData[getIndexofcartObj].quantity *
                  reduxCartData[getIndexofcartObj].price
                );

              console.log("newsubTOtal", newSubtotal);
              var shippingTotal = parseInt(reduxCart.shipping);
              // parseInt(reduxCartData[getIndexofcartObj].shipping);
              console.log("shippingTotal", shippingTotal);

              var newGrandtotal =
                parseInt(reduxCart.grandTotal) -
                parseInt(
                  // reduxCartData[getIndexofcartObj].quantity *
                  reduxCartData[getIndexofcartObj].price
                );
              console.log("newGrandtotal", newGrandtotal);

              reduxCartData.splice(getIndexofcartObj, 1);

              var newCart = {
                cart: reduxCartData,
                cartId: cartIdArray,
                cartCount: parseInt(reduxCart.cartCount) - 1,
                subTotal: newSubtotal,
                // tax: 0,
                shipping: shippingTotal,
                grandTotal: newGrandtotal,
              };
              rdStoreCart(newCart);
              console.log("cart data after delete", newCart);
              showMessage({
                message: "Success ",
                description: "Item Removed Successfully",
                type: "success",
              });
            }
          })
          .catch((error) => console.log("error", error));
      });
  };

  console.log("reduxCart.length", reduxCart.cart.length);

  useEffect(() => {
    getCartData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getCartData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderCart = ({ item, index }) => {
    // console.log("item===>", item);
    return (
      <>
        <View style={styles.mainView}>
          <View style={styles.imgView}>
            <ImageBackground
              // resizeMode="contain"
              style={styles.img}
              source={{ uri: item.image }}
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
              <View style={{ width: "60%" }}>
                <Text style={styles.dogTxt}>{item.name}</Text>
              </View>

              <TouchableOpacity
                // onPress={() => processDeleteItem(item.product_id)}
                onPress={() => deleteSelectedElement(item.id)}
              >
                <MaterialCommunityIcons
                  name="delete"
                  size={24}
                  color={color.red}
                />
                {/* <Text style={{color:color.red,fontFamily:'SemiBold'}}>Remove</Text> */}
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
              <Text style={styles.amountTxt}>${item.price}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        {/* <Header navigation={navigation} /> */}
        <BackHeader navigation={() => navigation.goBack()} />
        <View></View>
        <CategoryHeading
          CategoryName={"REVIEW YOUR CART"}
          number={reduxCart.cartCount}
        />

        {/* <View style={styles.view1}>
        <Text style={styles.txt1}>
          Swipe left to remove a product from the cart.
        </Text>
      </View> */}

        <FlatList
          data={reduxCart.cart}
          keyExtractor={(item) => item.id}
          renderItem={renderCart}
        />

        <View style={styles.totalView}>
          <Text style={styles.priceTxt}>Total</Text>

          <Text style={[styles.txt1, { fontFamily: "RubikMed" }]}>
            ({reduxCart.cartCount} items)
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
            ${reduxCart.subTotal}
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
            ${reduxCart.cart.length == 0 ? "0" : shipping}
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

          {reduxCart.subTotal == 0 ? (
            <Text
              style={[
                styles.amountTxt,
                { color: color.black, fontFamily: "RubikBold" },
              ]}
            >
              $0
            </Text>
          ) : (
            <Text
              style={[
                styles.amountTxt,
                { color: color.black, fontFamily: "RubikBold" },
              ]}
            >
              ${parseInt(reduxCart.grandTotal)}
            </Text>
          )}
        </View>
        {reduxCart.cartCount === 0 ? null : (
          <VioletButton
            buttonName={"CHECKOUT"}
            onPress={() =>
              navigation.navigate("ManageCheckout", {
                price: parseInt(reduxCart.grandTotal),
              })
            }
          />
        )}

        {/* <View style={styles.btnView2}>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnTxt2}>CHECKOUT</Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </SafeAreaView>
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
    marginBottom: 10,
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

const mapStateToProps = (state) => {
  return {
    reduxCart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
