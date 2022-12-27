import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import UserAddress from "../component/UserAddress";
import VioletButton from "../component/VioletButton";
import CategoryHeading2 from "../component/CategorryHeading2";
import { Divider } from "react-native-paper";
export default function MyAddress({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <CategoryHeading2 CategoryName={"MY ADDRESS"} />
      <View style={{ marginTop: 10 }}>
        <UserAddress
          Address={
            "J326 Dakshinpuri new delhi 110062  j Block dakshinpuri ambedkar nagar sec 5 , Near Kali building school"
          }
          place={"Home"}
        />
        <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} />
        <UserAddress Address={"J326 "} place={"Home"} />
        <Divider style={{ marginHorizontal: 20, marginVertical: 10 }} />
        <View style={styles.Button}>
          <VioletButton
            buttonName={"Add New Address"}
            onPress={() => navigation.navigate("AddAddress")}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Button: {
    paddingTop: 50,
    marginHorizontal: 10,
  },
});
