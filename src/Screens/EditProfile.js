import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading from "../component/CategoryHeading";
import Input2 from "../component/inputs/Input2";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import CategoryHeading2 from "../component/CategorryHeading2";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";

export default function EditProfile({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      {/* <CategoryHeading2 CategoryName="EDIT PROFILE" /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>MY ADDRESS</Text>
      </View>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.FirstView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: color.grey,
              }}
            >
              <Text style={styles.text2}>Profile Image</Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.image}
                  source={require("../images/EditPage/profilePicture.png")}
                />
              </View>
              <TouchableOpacity>
                <Text style={[styles.text2, { fontFamily: "RubikSemiBold" }]}>
                  Add Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.InputOuterView}>
            <Input2 label={"First Name"} placeholder="First Name" />
            <Input2 label={"Last Name"} placeholder="Last here" />
            <Input2 label={"Phone no."} placeholder="Phone number" />
            <Input2 label={"Email Address"} placeholder="Email Address" />
          </View>
        </View>
        <View style={styles.Button}>
          <VioletButton
            buttonName={"SAVE"}
            onPress={() => navigation.navigate("Account")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: hp(8),
    width: hp(8),
  },
  SaveImage: {
    height: hp(2),
    width: hp(2),
  },
  parent: {
    marginHorizontal: 15,
  },
  // FirstView: {
  //   borderBottomWidth: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   borderColor:color.grey,
  //   paddingVertical:hp/50
  // },
  text: {
    fontFamily: "Regular",
    fontSize: 13,
    paddingLeft: 5,
  },

  text2: {
    fontFamily: "RubikRegular",
    textAlign: "center",
    fontSize: 13,
  },
  InputOuterView: {
    paddingTop: 20,
  },
  Button: {
    paddingTop: 50,
    marginHorizontal: 60,
  },
  headerView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
});
