import { View, StatusBar, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import Input2 from "../component/inputs/Input2";
import CheckBox from "../component/Checkbox";
import CategoryHeading2 from "../component/CategorryHeading2";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";
import PriceDropdown from "../component/PriceDropdown";
import CountryDropdown from "../component/CountryDropdown";
import StateDropdown from "../component/StateDropdown";
import CityDropdown from "../component/CityDropdown";

export default function AddAddress({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      {/* <CategoryHeading2 CategoryName="ADD ADDRESS" /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>ADD ADDRESS</Text>
      </View>
      <ScrollView>
        <View style={styles.parent}>
          <Input2 label={"Address"} placeholder="Address" />
          <View style={styles.dropdownView}>
            <CountryDropdown label={"Country"} />
          </View>
          <View style={styles.dropdownView}>
            <StateDropdown label={"State"} />
          </View>
          <View style={styles.dropdownView}>
            <CityDropdown label={"City"} />
          </View>
          <Input2 label={"zip"} placeholder="Enter here" />

          <View style={styles.checkBoxouterView}>
            <View style={styles.CheckBoxView}>
              <CheckBox optionName={"Home"} />
            </View>
            {/* <View style={styles.CheckBoxView}>
              <CheckBox optionName={"Work"} />
            </View> */}
            <View style={styles.CheckBoxView}>
              <CheckBox optionName={"Other"} />
            </View>
          </View>
          <View style={styles.btnView}>
            <VioletButton
              buttonName={"Save"}
              onPress={() => navigation.navigate("Account")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  checkBoxouterView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  CheckBoxView: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  parent: {
    paddingHorizontal: 15,
  },
  btnView: {
    marginVertical: SIZES.height / 10,
    paddingHorizontal: SIZES.width / 10,
  },
  headerView: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
  dropdownView: {
    marginVertical: 5,
  },
});
