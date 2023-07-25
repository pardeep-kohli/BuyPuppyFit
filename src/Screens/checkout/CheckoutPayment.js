import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { emptyCart } from "../../store/cart/cartAction";
import * as qs from "qs";
import axios from "axios";

const CheckoutPayment = ({ navigation, route }) => {
  // const { addresschecked } = route.params;
  // console.log("add", addresschecked);

  const reduxCart = useSelector((state) => state.cart);
  const reduxUser = useSelector((state) => state.user);
  const [userId, setUserId] = useState(reduxUser.customer.id);
  const [paymentchecked, setPaymentChecked] = React.useState("");
  const dispatch = useDispatch();
  const lang_id = localStorage.getItem("lang_id");
  console.log("reduxcart", reduxCart);

  var placeOrder_Header = new Headers();
  placeOrder_Header.append("accept", "application/json");
  placeOrder_Header.append("Content-Type", "application/x-www-form-urlencoded");
  placeOrder_Header.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

  var placeOrder_Data = qs.stringify({
    placeorder: "1",
    lang_id: lang_id,
    user_id: userId,
    amount: reduxCart.grandTotal,
    payment_method: paymentchecked,
    address_id: "",
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
            backgroundColor: color.green,
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

  return (
    <View>
      <Text>CheckoutPayment</Text>
    </View>
  );
};

export default CheckoutPayment;

const styles = StyleSheet.create({});
