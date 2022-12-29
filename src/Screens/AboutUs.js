import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
export default function AboutUs({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <CategoryHeading2 CategoryName="ABOUT US" />
      <View style={styles.parent}>
        <View style={styles.headingView}>
          <Text style={styles.heading}> Who is Buyapuppy.eu.</Text>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.text}>
            Who is Pentulista? Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Posuere tellus enim dignissim odio. A auctor erat
            magna nisl. Senectus orci mattis nisi aliquam montes, cursus vel.
            Nunc vulputate et dictum nec mattis enim. Blandit pulvinar nulla
            urna condimentum aenean rhoncus. Scelerisque eget eget pellentesque
            purus. Et nibh iaculis ullamcorper malesuada aliquet mi. Gravida
            quisque tristique vitae commodo praesent ut. Magnis libero sed
            sodales cum. Cursus pharetra placerat cursus dolor, augue volutpat,
            imperdiet justo, leo. Ultricies in facilisis neque, justo. Viverra
            viverra mi facilisi ullamcorper sed sed. Ultrices fusce risus amet,
            fringilla dolor purus dis. Phasellus elementum fringilla scelerisque
            diam orci, maecenas.
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
  },
  descriptiontext2: {
    paddingTop: 20,
  },
  text: {
    fontFamily: "Regular",
    textAlign: "justify",
  },
  heading: {
    color: color.primary_color,
    fontFamily: "Bold",
    fontSize: 20,
  },
  headingView: {
    paddingTop: 10,
  },
});
