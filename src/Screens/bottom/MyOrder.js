import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useRef } from "react";
import Header from "../../component/Header";
import CategoryHeading2 from "../../component/CategorryHeading2";
import Ionicons from "react-native-vector-icons/Ionicons";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import VioletButton from "../../component/VioletButton";
import { Divider } from "react-native-paper";
import * as qs from "qs";
import { connect, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { storeCart } from "../../store/cart/cartAction";
import { showMessage } from "react-native-flash-message";

const MyOrder = ({ navigation, rdStoreCart }) => {
  const reduxUser = useSelector((state) => state.user);
  console.log("reduxuser", reduxUser);

  const isFocused = useIsFocused();

  const [ordersList, setOrdersList] = useState([]);
  const [filterListdata, setFilterListData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState(reduxUser.customer.id);
  const dropdownRef = useRef({});

  const monthData = [
    // { name: "select", id: "0" },
    { name: "January", id: "01" },
    { name: "February", id: "02" },
    { name: "March", id: "03" },
    { name: "April", id: "04" },
    { name: "May", id: "05" },
    { name: "June", id: "06" },
    { name: "July", id: "07" },
    { name: "August", id: "08" },
    { name: "September", id: "09" },
    { name: "October", id: "10" },
    { name: "November", id: "11" },
    { name: "December", id: "12" },
  ];

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

  const showOrderHistory = () => {
    var orderHeader = new Headers();
    orderHeader.append("accept", "application/json");
    orderHeader.append("Content-Type", "application/x-www-form-urlencoded");
    orderHeader.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

    var Orders_Data = qs.stringify({
      orderhistory: "1",
      user_id: reduxUser.customer.id,
    });

    console.log("orderdata", Orders_Data);

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        Orders_Data,
        { headers: orderHeader }
      )
      .then(function (response) {
        console.log("order res", response);
        if (response.data.success == 1) {
          setOrdersList(response.data.data);
          setFilterListData(response.data.data);
        }
      });
  };
  console.log("list", ordersList);

  useFocusEffect(
    React.useCallback(() => {
      if (isFocused) {
        showOrderHistory();
        // getCartData();
      }
    }, [isFocused])
  );

  const ListFilter = (id) => {
    console.log("id", id);

    // if (id === "0") {
    //   setRefresh((prev) => !prev);
    //   setFilterListData(ordersList);
    // } else {
    const newArray = ordersList.filter(function (a) {
      // console.log("a", a.order_date?.split("-")[1]);
      return a.order_date?.split("-")[1] === id;
    });
    setRefresh((prev) => !prev);
    setFilterListData(newArray);
    // }
  };

  console.log("listdata", filterListdata);

  const EmptyListMessage = ({ item }) => {
    {
      return (
        // Flat List Item
        reduxUser.customer.id == "" ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.height / 7,
            }}
          >
            <Image
              style={{ height: SIZES.height / 2, width: "100%" }}
              source={require("../../images/login3.png")}
            />
            <Text style={styles.emptyListStyle}>Please Login First</Text>
          </View>
        ) : (
          <Text style={styles.emptyListStyle}>No Data Found</Text>
        )
      );
    }
  };

  const renderOrderList = ({ item, index }) => {
    // console.log("item", item);
    return (
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          <View style={styles.imgView}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={{ uri: item.item[index]?.product_image }}
              // source={require("../../images/banner.png")}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>{item.item[index]?.product_name}</Text>
            <Text style={styles.addrsTxt}>
              {item.address},{item.city},{item.state}
            </Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate("OrderTrackScreen", {
                  order_id: item.id,
                })
              }
            >
              <Text style={styles.btnTxt}>View Details</Text>
            </TouchableOpacity>
            {/* <VioletButton buttonName={"Reorder"} /> */}
          </View>
        </View>
        <Divider
          style={{
            borderColor: color.primary_color,
            borderWidth: 0.3,
            marginHorizontal: 10,
          }}
        />
        <View style={styles.secondView}>
          <Text style={styles.timeTxt}>{item.order_date}</Text>
          <Text style={styles.priceTxt}>${item.item[index]?.price}</Text>
        </View>
        <Divider
          style={{
            borderColor: color.primary_color,
            borderWidth: 0.3,
            marginHorizontal: 10,
          }}
        />
      </View>
    );
  };

  // console.log("list", listdata);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <Header
          navigation={navigation}
          cart={() =>
            reduxUser.customer.id == ""
              ? showMessage({
                  message: "Please Login",
                  description: "Please login before check you cart",
                  type: "default",
                  backgroundColor: color.red,
                })
              : navigation.navigate("CheckoutStack")
          }
        />
        {/* <CategoryHeading2 CategoryName={"MY ORDERS"} /> */}

        {reduxUser.customer.id == "" ? (
          ""
        ) : (
          <>
            <View style={styles.headerView}>
              <Text style={styles.headerTxt}>MY ORDER</Text>
              <Text style={styles.itemTxt}>
                ( {ordersList == null ? 0 : ordersList.length} Items )
              </Text>
            </View>
            <View style={styles.view1}>
              <Text style={styles.txt1}>This Month</Text>
              <View style={styles.iconView}>
                <TouchableOpacity>
                  <SelectDropdown
                    ref={dropdownRef}
                    data={monthData}
                    defaultButtonText="Filter"
                    onSelect={(selectedItem, index) => {
                      console.log("select", selectedItem.id);
                      ListFilter(selectedItem.id);
                      // dropdownRef.current.reset();
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.name;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name;
                    }}
                    buttonStyle={{
                      overflow: "hidden",
                      width: wp(31),
                      height: hp(5),
                      color: color.white,
                      backgroundColor: color.primary_color,
                      borderRadius: 5,
                    }}
                    buttonTextStyle={styles.btnTxt2}
                    rowTextStyle={styles.row_text}
                    dropdownStyle={{ width: "32%" }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <Ionicons
                          name={isOpened ? "chevron-up" : "chevron-down"}
                          color={color.text_primary}
                          size={25}
                        />
                      );
                    }}
                    dropdownIconPosition={"right"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <FlatList
          // extraData={filterListdata}
          data={filterListdata}
          renderItem={renderOrderList}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={EmptyListMessage}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refresh}
          //     onRefresh={showOrderHistory()}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
  itemTxt: {
    fontFamily: "RubikMed",
    color: color.text_primary,
  },

  view1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 30,
    marginVertical: SIZES.height / 50,
  },
  txt1: {
    fontSize: SIZES.h3,
    color: color.black,
    fontFamily: "RubikBold",
    alignSelf: "center",
  },
  iconView: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt2: {
    fontSize: SIZES.h3,
    fontFamily: "RubikSemiBold",
  },
  mainView: {
    borderWidth: 0.5,
    borderColor: color.light_grey,
    borderRadius: 10,
    paddingHorizontal: SIZES.width / 60,
    paddingVertical: SIZES.height / 30,
    marginHorizontal: SIZES.width / 30,
    backgroundColor: color.white,
    marginBottom: 10,
  },
  firstView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // borderBottomWidth: 0.4,
    // borderBottomColor: color.black,
    marginBottom: SIZES.height / 50,
    paddingHorizontal: 10,
  },
  imgView: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 0.28,
    overflow: "hidden",
    // backgroundColor: "red",
    // height: 70,
    // width: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  img: {
    height: 71,
    width: 70,
  },
  nameView: {
    flex: 0.7,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  btnView: {
    flex: 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 40,
    paddingVertical: SIZES.height / 64 - 5,
    borderRadius: 5,
    // height: 35,
  },
  btnTxt: {
    color: color.text_primary,
    fontWeight: "bold",
    fontSize: SIZES.h4 - 3,
  },
  btnTxt2: {
    color: color.text_primary,
    fontWeight: "bold",
    fontSize: SIZES.h4,
  },
  secondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SIZES.height / 50,
    // borderBottomWidth: 0.3,
    // paddingBottom: 10,
    marginHorizontal: 20,
  },
  nameTxt: {
    fontSize: SIZES.h3 + 1,
    fontFamily: "RubikBold",
    marginBottom: 5,
  },
  addrsTxt: {
    fontSize: SIZES.h4 - 2,
    color: color.light_grey,
    fontFamily: "RubikLight",
  },
  timeTxt: {
    fontSize: SIZES.h3,
    fontFamily: "RubikRegular",
  },
  priceTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h3,
    color: color.light_grey,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
