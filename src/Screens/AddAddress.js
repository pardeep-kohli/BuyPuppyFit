import { View, StatusBar, StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import Input2 from "../component/inputs/Input2";
import CheckBox from "../component/Checkbox";
import CategoryHeading2 from "../component/CategorryHeading2";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";

export default function AddAddress({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <CategoryHeading2 CategoryName="ADD ADDRESS" />
      <ScrollView>
        <View style={styles.parent}>
          <Input2 label={"Address"} placeholder="Address" />
          <Input2 label={"Country"} placeholder="India" />
          <Input2 label={"State"} placeholder="Delhi" />
          <Input2 label={"City"} placeholder="Enter your postal code" />
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
  },
  parent: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  btnView: {
    marginVertical: SIZES.height / 10,
    paddingHorizontal: SIZES.width / 10,
  },
});
