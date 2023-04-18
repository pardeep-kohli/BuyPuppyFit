import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../../assets/theme/color";
import VioletButton from "../../component/VioletButton";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import Header from "../../component/Header";
import BackButton from "../../component/Backbutton";
import { SIZES } from "../../assets/theme/theme";
import { useDispatch, useSelector } from "react-redux";
import * as qs from "qs";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import { emptyCart } from "../../store/cart/cartAction";
import { showMessage } from "react-native-flash-message";
import BackHeader from "../../component/buttons/BackHeader";
import { TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";

const ManageCheckout = ({ navigation }) => {
  //   const { price } = route.params;
  //   console.log("price", price);
  const [data, setData] = useState(0);

  const reduxUser = useSelector((state) => state.user);
  const reduxCart = useSelector((state) => state.cart);
  const [userId, setUserId] = useState(reduxUser.customer.id);
  const [addressData, setAddressData] = useState([]);
  const [addresschecked, setAddressChecked] = React.useState("");
  const [paymentchecked, setPaymentChecked] = React.useState("");
  const dispatch = useDispatch();

  const ProcessGetAddress = () => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    // var urlencoded = new FormData();
    // urlencoded.append("addresslist", "1");
    // urlencoded.append("user_id", userId);

    var urlencoded = qs.stringify({
      addresslist: "1",
      user_id: userId,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        urlencoded,
        { headers: myHeaders }
      )
      .then(function (response) {
        console.log("AddressList", response);

        if (response.data.success == 1) {
          setAddressData(response.data.data);
        }
      });
  };

  useEffect(() => {
    ProcessGetAddress();
    // navigation.addListener("focus", () => ProcessGetAddress());
  }, []);

  var placeOrder_Header = new Headers();
  placeOrder_Header.append("accept", "application/json");
  placeOrder_Header.append("Content-Type", "application/x-www-form-urlencoded");
  placeOrder_Header.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

  var placeOrder_Data = qs.stringify({
    placeorder: "1",
    lang_id: "1",
    user_id: userId,
    amount: reduxCart.grandTotal,
    payment_method: paymentchecked,
    address_id: addresschecked,
  });

  console.log("placedata", placeOrder_Data);
  const PlaceOrder = () => {
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        placeOrder_Data,
        { headers: placeOrder_Header }
      )
      .then(function (response) {
        console.log("place order res", response);
        if (response.data.success == 1) {
          dispatch(emptyCart());
          showMessage({
            message: "success",
            description: response.data.message,
            type: "default",
            backgroundColor: "green",
          });
          navigation.navigate("OrderSuccess");
        } else {
          showMessage({
            message: "fail",
            description: response.data.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      });
  };

  const renderPages = () => {
    if (data === 0) {
      return (
        <>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {addressData.map((item) => (
                <TouchableOpacity
                  style={styles.addressView}
                  onPress={() => setAddressChecked(item.id)}
                >
                  <View style={styles.addressType1}>
                    {item.place == "1" ? (
                      <Text style={styles.txt1}>Home</Text>
                    ) : (
                      <Text style={styles.txt1}>Other</Text>
                    )}

                    <Text style={styles.txt2}>
                      {item.address}
                      {item.country}
                      {item.province}
                      {item.city}-{item.postcode}
                    </Text>
                  </View>
                  <View style={styles.radioBtnView}>
                    {Platform.OS === "ios" ? (
                      <RadioButton.IOS
                        color={color.primary_color}
                        value={item.id}
                        status={
                          addresschecked === item.id ? "checked" : "unchecked"
                        }
                        onPress={() => setAddressChecked(item.id)}
                      />
                    ) : (
                      <RadioButton
                        color={color.primary_color}
                        value={item.id}
                        status={
                          addresschecked === item.id ? "checked" : "unchecked"
                        }
                        onPress={() => setAddressChecked(item.id)}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </>
      );
    } else if (data === 1) {
      return (
        <View>
          <TouchableOpacity
            style={styles.paymentView}
            onPress={() => setPaymentChecked("cod")}
          >
            <Text style={[styles.txt1, { fontSize: SIZES.h3 }]}>COD</Text>

            {Platform.OS === "ios" ? (
              <RadioButton.IOS
                color={color.primary_color}
                value="cod"
                status={paymentchecked === "cod" ? "checked" : "unchecked"}
                onPress={() => setPaymentChecked("cod")}
              />
            ) : (
              <RadioButton
                color={color.primary_color}
                value="cod"
                status={paymentchecked === "cod" ? "checked" : "unchecked"}
                onPress={() => setPaymentChecked("cod")}
              />
            )}
          </TouchableOpacity>
          {/* <Vie
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "red",
            }}
          >
            <VioletButton
              buttonName={"SUBMIT"}
              // onPress={() => navigation.navigate("OrderSuccess")}
              onPress={PlaceOrder}
            />
          </Vie> */}
        </View>
      );
    } else {
      console.log("something wrong");
    }
  };

  const handleBackpress = () => {
    if (data === 0) {
      navigation.goBack();
    } else if (data === 1) {
      setData(0);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        {/* <Header /> */}
        {/* <BackButton> */}
        <BackHeader navigation={handleBackpress} />
        <View style={styles.parentView}>
          <View style={styles.mainView}>
            <View
              style={[
                styles.tabView,
                { borderBottomWidth: data === 0 ? 2 : 0 },
              ]}
            >
              <Text
                style={{
                  fontFamily: "SemiBold",
                  color: color.primary_color,
                  fontSize: 14,
                }}
              >
                DELIVERY ADDRESS
              </Text>
            </View>

            <View
              style={[
                styles.tabView,
                { borderBottomWidth: data === 1 ? 2 : 0 },
              ]}
            >
              <Text
                style={{
                  fontFamily: "SemiBold",
                  color: color.primary_color,
                  fontSize: 14,
                }}
              >
                PAYMENT METHOD
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>{renderPages()}</ScrollView>
          </View>
        </View>
        {!addresschecked ? null : (
          <View style={styles.btnView}>
            {data === 0 ? (
              <VioletButton
                buttonName={"Continue"}
                onPress={() => setData(1)}
              />
            ) : (
              <VioletButton buttonName={"Submit"} onPress={PlaceOrder} />
            )}
          </View>
        )}

        <View style={styles.btnView}>
          {data === 0 ? (
            <VioletButton
              buttonName={"Add Address"}
              onPress={() => navigation.navigate("AccountStack")}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
  },
  parentView: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  mainView: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  tabView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderColor: color.primary_color,
  },
  btnView: {
    marginBottom: 10,
  },
  addressView: {
    paddingVertical: SIZES.height / 50,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.width / 30,
    borderBottomWidth: 2,
    borderColor: color.primary_color,
  },
  addressType1: {
    flex: 0.8,
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: SIZES.width / 40,
  },
  txt1: {
    fontSize: SIZES.h2 - 2,
    fontFamily: "RubikSemiBold",
    marginBottom: SIZES.height / 64,
  },
  txt2: {
    textAlign: "justify",
    fontSize: SIZES.h3 - 3,
    fontFamily: "RubikRegular",
  },
  radioBtnView: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  paymentView: {
    marginTop: SIZES.height / 50,
    marginBottom: SIZES.height / 64 - 10,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: SIZES.width / 30,
    borderBottomWidth: 2,
    paddingVertical: 10,
    borderColor: color.primary_color,
  },
  bottomView: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ManageCheckout;
