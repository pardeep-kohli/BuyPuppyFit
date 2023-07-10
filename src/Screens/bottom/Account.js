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
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";

export default function Account({ navigation }) {
  const reduxUser = useSelector((state) => state.user);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <View style={{ flexDirection: "row" }}>
          <AccountDetail
            AccountHolderName={
              reduxUser.customer.name == "" ? "Guest" : reduxUser.customer.name
            }
            PhoneNumber={reduxUser.customer.mobile}
            EmailId={reduxUser.customer.email}
          />
          <View style={{ position: "absolute", top: 20, right: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.text}>
                {reduxUser.customer.userId == "" ? "" : Edit}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Heading HeadLine="MY ACCOUNT" />

        <TouchableOpacity
          onPress={() =>
            reduxUser.customer.userId == ""
              ? showMessage({
                  message: "Please Login",
                  type: "default",
                  backgroundColor: color.red,
                })
              : navigation.navigate("MyAddress")
          }
          style={{
            elevation: 5,
            borderRadius: 5,
            backgroundColor: color.white,
            paddingVertical: 15,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <View style={styles.Address}>
            <View style={styles.homeIcon}>
              <Entypo name="home" size={24} color="black" />
            </View>
            <View style={styles.txtView}>
              <Text style={{ fontFamily: "RubikRegular", fontSize: SIZES.h3 }}>
                Manage Address
              </Text>
            </View>
            <FontAwesome name="angle-right" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
