import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import color from "../../assets/theme/color";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../component/Header";
import AccountDetail from "../../component/AccountDetail";
import Heading from "../../component/Heading";
import { SIZES } from "../../assets/theme/theme";
export default function Account({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <View style={{ flexDirection: "row" }}>
          <AccountDetail
            AccountHolderName={"Deepak Singh"}
            PhoneNumber={"9876543210"}
            EmailId={"deepak@gmail.com"}
          />
          <View style={{ position: "absolute", top: 20, right: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Heading HeadLine="MY ACCOUNT" />
        <View style={styles.Address}>
          <View style={styles.homeIcon}>
            <Entypo name="home" size={24} color="black" />
          </View>
          <View style={styles.txtView}>
            <Text style={{ fontFamily: "RubikRegular", fontSize: SIZES.h3 }}>
              Manage Address
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("MyAddress")}>
            <FontAwesome name="angle-right" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  Address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  txtView: {
    alignItems: "flex-start",
    flex: 0.8,
  },
  text: {
    color: color.black,
    fontFamily: "RubikMed",
    fontSize: SIZES.h3,
  },
});
