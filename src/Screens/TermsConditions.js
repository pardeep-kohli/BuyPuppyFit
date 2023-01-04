import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
export default function TermsConditions({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>TERMS & CONDITIONS</Text>
      </View>
      {/* <CategoryHeading2 CategoryName="ABOUT US" /> */}
      <View style={styles.parent}>
        <View style={styles.descriptionView}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
            tellus enim dignissim odio. A auctor erat magna nisl. Senectus orci
            mattis nisi aliquam montes, cursus vel. Nunc vulputate et dictum nec
            mattis enim. Blandit pulvinar nulla urna condimentum aenean rhoncus.
            Scelerisque eget eget pellentesque purus. Et nibh iaculis
            ullamcorper malesuada aliquet mi. Gravida quisque tristique vitae
            commodo praesent ut. Magnis libero sed sodales cum. Cursus pharetra
            placerat cursus dolor, augue volutpat, imperdiet justo, leo.
            Ultricies in facilisis neque, justo. Viverra viverra mi facilisi
            ullamcorper sed sed. Ultrices fusce risus amet, fringilla dolor
            purus dis. Phasellus elementum fringilla scelerisque diam orci,
            maecenas.
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  descriptionView: {
    paddingTop: 20,
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
