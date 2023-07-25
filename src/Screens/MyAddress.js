import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import UserAddress from "../component/UserAddress";
import VioletButton from "../component/VioletButton";
import CategoryHeading2 from "../component/CategorryHeading2";
import { Divider } from "react-native-paper";
import { SIZES } from "../assets/theme/theme";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../component/buttons/BackHeader";
import { useTranslation } from "react-i18next";

const MyAddress = ({ navigation, reduxLang }) => {
  const reduxUser = useSelector((state) => state.user);

  const { t } = useTranslation();

  const [userId, setUserId] = useState(reduxUser.customer.id);

  const [addressData, setAddressData] = useState([]);

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
        if (response.data.success == 1) {
          setAddressData(response.data.data);
        }
      });
  };

  useEffect(() => {
    ProcessGetAddress();
    navigation.addListener("focus", () => ProcessGetAddress());
  }, []);

  const processDeleteAddress = (id) => {
    var deleteHeader = new Headers();
    deleteHeader.append("accept", "application/json");
    deleteHeader.append("Content-Type", "application/x-www-form-urlencoded");
    deleteHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var deleteData = qs.stringify({
      deleteaddress: "1",
      address_id: id,
      user_id: userId,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        deleteData,
        { headers: deleteHeader }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          const updatedAdd = addressData.filter((item) => item.id != id);
          setAddressData(updatedAdd);
          showMessage({
            message: `${t("Success")}`,
            description: response.data.message,
            type: "default",
            backgroundColor: "red",
          });
        } else {
          showMessage({
            message: `${t("Fail")}`,
            description: response.data.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  console.log("address====>", addressData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      {/* <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      /> */}
      <BackHeader navigation={() => navigation.goBack()} />
      {/* <CategoryHeading2 CategoryName={"MY ADDRESS"} /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>{t("MY ADDRESS")}</Text>
      </View>
      {/* <FlatList data={addressData} renderItem={renderAddress} keyExtractor={item => item.id}/> */}
      <ScrollView>
        {addressData.map((item, index) => (
          <View style={{ marginTop: 10 }}>
            {item.place == "1" && (
              <UserAddress
                Address={item.address}
                country={item.country}
                province={item.province}
                city={item.city}
                postcode={item.postcode}
                Place={`${t("Home")}`}
                deleteOnPress={() => processDeleteAddress(item.id)}
                onPress={() =>
                  navigation.navigate("UpdateAddress", {
                    addressData: addressData[index],
                  })
                }
              />
            )}

            {/* <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} /> */}
            {item.place == "2" && (
              <UserAddress
                Address={item.address}
                country={item.country}
                province={item.province}
                city={item.city}
                postcode={item.postcode}
                Place={`${t("Others")}`}
                deleteOnPress={() => processDeleteAddress(item.id)}
                onPress={() =>
                  navigation.navigate("UpdateAddress", {
                    addressData: addressData[index],
                  })
                }
              />
            )}
            <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.Button}>
        <VioletButton
          buttonName={`${t("Add New Address")}`}
          onPress={() => navigation.navigate("AddAddress")}
        />
      </View>
      {/* <SafeAreaView style={{ marginTop: 10 }}>
        <UserAddress
          Address={
            "J326 Dakshinpuri new delhi 110062  j Block dakshinpuri ambedkar nagar sec 5 , Near Kali building school"
          }
          Place={"Home"}
        />
        <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} />
        <UserAddress
          Address={
            "J326 Dakshinpuri new delhi 110062  j Block dakshinpuri ambedkar nagar sec 5 , Near Kali building school"
          }
          Place={"Home2"}
        />
        <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} />
        <View style={styles.Button}>
          <VioletButton
            buttonName={"Add New Address"}
            onPress={() => navigation.navigate("AddAddress")}
            />
        </View>
            {/* <UserAddress Address={"J326 "} place={"Home2"} /> */}
      {/* </View>  */}
      {/* */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Button: {
    paddingTop: 50,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  headerView: {
    marginVertical: 30,
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
    reduxLang: state.lang,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
//   };
// };

export default connect(mapStateToProps)(MyAddress);
