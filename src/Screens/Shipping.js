import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";

import { ScrollView } from "react-native-gesture-handler";
import CategoryHeading2 from "../component/CategorryHeading2";

export default function Shipping({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <ScrollView>
        <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        />
        <CategoryHeading2 CategoryName="SHIPPING" />
        <View style={styles.parent}>
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: "Regular",
    textAlign: "justify",
  },
  parent: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  textView: {
    paddingVertical: 10,
  },
  outertext: {
    paddingTop: 10,
  },
});
