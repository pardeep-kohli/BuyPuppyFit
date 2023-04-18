import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { RadioButton } from "react-native-paper";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";

import Backbutton from "../../component/Backbutton";
import VioletButton from "../../component/VioletButton";
import { useNavigation } from "@react-navigation/native";

const CheckoutAddress = ({ navigation }) => {
  // const navigation = useNavigation();
  // const { price } = route.params;
  const reduxUser = useSelector((state) => state.user);
  const reduxCart = useSelector((state) => state.cart);
  const [userId, setUserId] = useState(reduxUser.customer.id);

  const [addressData, setAddressData] = useState([]);
  const [addresschecked, setAddressChecked] = React.useState("");

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Backbutton />
        <ScrollView style={{ flex: 2, flexGrow: 12 }}>
          {addressData.map((item) => (
            <View style={styles.addressView}>
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
                <RadioButton
                  color={color.primary_color}
                  value={item.id}
                  status={addresschecked === item.id ? "checked" : "unchecked"}
                  onPress={() => setAddressChecked(item.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        {/* <View style={styles.btnView}>
        <VioletButton
          buttonName={"Continue"}
          onPress={() =>
            navigation.navigate("CheckoutPayment", {
              addresschecked: addresschecked,
            })
          }
          />
        </View> */}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addressView: {
    marginVertical: SIZES.height / 50,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 30,
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
});

export default CheckoutAddress;
