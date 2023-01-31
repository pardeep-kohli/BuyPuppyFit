import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SIZES, FONTS } from "../assets/theme/theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../assets/theme/color";

import { useSelector } from "react-redux";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";

export default function Header({ navigation, onPress, cart }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [apistatus, setApiStatus] = useState(false);

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
          console.log("ress===>", response);
          if (response.data.success == 1) {
            setIsDataLoaded(true);

            setTotalItems(response.data.total_product);

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

  useEffect(() => {
    getCartData();
    navigation.addListener("focus", () => getCartData());
  }, []);

  return (
    <View style={styles.parent}>
      <View
        style={{
          position: "absolute",
          right: 5,
          top: 12,
          backgroundColor: color.text_primary,
          height: 20,
          width: 20,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Text style={{ fontFamily: "RobotoSemi", fontSize: SIZES.h4 - 4 }}>
          {totalItems == "" ? 0 : totalItems}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Ionicons name="ios-menu" size={40} color={color.white} />
      </TouchableOpacity>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={{ height: SIZES.height / 14, width: SIZES.width / 2 }}
          source={require("../images/logo2.png")}
        />
      </View>
      <TouchableOpacity onPress={cart}>
        <FontAwesome5 name="shopping-cart" size={26} color={color.white} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#DADADA",
    alignItems: "center",
    padding: 10,
    backgroundColor: color.primary_color,
  },
});
