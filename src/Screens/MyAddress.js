import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import UserAddress from "../component/UserAddress";
import VioletButton from "../component/VioletButton";
import CategoryHeading2 from "../component/CategorryHeading2";
import { Divider } from "react-native-paper";
import { SIZES } from "../assets/theme/theme";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";

export default function MyAddress({ navigation }) {
  const reduxUser = useSelector((state) => state.user);

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
            message: "success",
            description: response.data.message,
            type: "default",
            backgroundColor: "green",
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      {/* <CategoryHeading2 CategoryName={"MY ADDRESS"} /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>MY ADDRESS</Text>
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
                Place={"Home"}
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
                Place={"Others"}
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
          buttonName={"Add New Address"}
          onPress={() => navigation.navigate("AddAddress")}
        />
      </View>
      {/* <View style={{ marginTop: 10 }}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  Button: {
    paddingTop: 50,
    marginHorizontal: 40,
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
