import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import axios from "axios";
import * as qs from "qs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
export default function TermsConditions({ navigation }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [conditionContent, setConditionContent] = useState([]);

  useEffect(() => {
    var conditionHeader = new Headers();
    conditionHeader.append("accept", "application/json");
    conditionHeader.append("Content-Type", "application/x-www-form-urlencoded");
    conditionHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var conditionData = qs.stringify({
      get_content: "1",
      page_name: "Terms and Conditions",
      lang_id: "1",
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        conditionData,
        {
          headers: conditionHeader,
        }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setConditionContent(response.data.data);
        }
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <StatusBar backgroundColor={color.primary_color} />
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{conditionContent.title}</Text>
        </View>
        {/* <CategoryHeading2 CategoryName="ABOUT US" /> */}
        <View style={styles.parent}>
          <View style={styles.descriptionView}>
            <Text style={styles.text}>{conditionContent.content}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  descriptionView: {
    paddingTop: 20,
    minHeight: hp(40),
  },
  parent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: color.primary_color,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  descriptiontext2: {
    paddingTop: 20,
  },
  text: {
    fontFamily: "RubikLight",
    textAlign: "justify",
    color: color.white,
    fontSize: SIZES.h4 + 2,
  },
  heading: {
    color: color.text_primary,
    fontFamily: "RubikBold",
    fontSize: 20,
  },
  headingView: {
    paddingTop: 10,
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
});
