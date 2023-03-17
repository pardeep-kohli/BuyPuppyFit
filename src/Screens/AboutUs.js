import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import * as qs from "qs";
import axios from "axios";
export default function AboutUs({ navigation }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [aboutusContent, setAboutusContent] = useState([]);

  useEffect(() => {
    var aboutHeader = new Headers();
    aboutHeader.append("accept", "application/json");
    aboutHeader.append("Content-Type", "application/x-www-form-urlencoded");
    aboutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var aboutData = qs.stringify({
      get_content: "1",
      page_name: "About us",
      lang_id: "1",
    });

    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", aboutData, {
        headers: aboutHeader,
      })
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setAboutusContent(response.data.data);
        }
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: color.background_color, }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>{aboutusContent.title}</Text>
      </View>
      {/* <CategoryHeading2 CategoryName="ABOUT US" /> */}
      <View style={styles.parent}>
        <View style={styles.headingView}>
          <Text style={styles.heading}> Who is Buyapuppy.eu?</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.text}>{aboutusContent.content}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  descriptionView: {
    paddingTop: 20,
    minHeight:hp(40)
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
