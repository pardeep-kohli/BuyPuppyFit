import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import CategoryHeading2 from "../component/CategorryHeading2";
import Input2 from "../component/inputs/Input2";
import VioletButton from "../component/VioletButton";
export default function ContactUs({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <ScrollView>
        <CategoryHeading2 CategoryName="CONTACT US" />

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require("../images/contactUs/contactus.png")}
          />
        </View>

        <Text style={styles.heading}>GET IN TOUCH!</Text>

        <View style={styles.inputOuterView}>
          <Input2 label={"First Name"} placeholder="Enter here" />
          <Input2 label={"Email"} placeholder="Enter here" />
          <Input2 label={"Message"} placeholder="Enter here" />
        </View>
        <View style={styles.buttonView}>
          <VioletButton
            buttonName="SEND"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: hp(30),
    width: hp(48),
    // backgroundColor: "red",
  },
  heading: {
    textAlign: "center",
    fontFamily: "Bold",
    color: color.primary_color,
    fontSize: 20,
  },

  inputOuterView: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  buttonView: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
});
