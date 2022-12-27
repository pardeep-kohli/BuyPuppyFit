import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import color from "../theme/color";

import CategoryHeading from "../component/CategoryHeading";
import MyBagClubCard from "../component/MyBagClubCard";
import Header from "../component/Header";
export default function WishList() {
  return (
    <View>
      <StatusBar backgroundColor={color.violet} />
      <Header />
      <CategoryHeading CategoryName="WISHLIST" />
      <View style={styles.cardView}>
        <MyBagClubCard
          Description="AFFINITI for Wm B Woods US 10AAAA ..."
          CategoryName="Women's Heels"
          OldPrice="$45"
          NewPrice="$56"
          imageSrc={require("../images/Demo_pic.png")}
        />
        <MyBagClubCard
          Description="AFFINITI for Wm B Woods US 10AAAA ..."
          CategoryName="Women's Heels"
          OldPrice="$45"
          NewPrice="$56"
          imageSrc={require("../images/Demo_pic.png")}
        />
        <MyBagClubCard
          Description="AFFINITI for Wm B Woods US 10AAAA ..."
          CategoryName="Women's Heels"
          OldPrice="$45"
          NewPrice="$56"
          imageSrc={require("../images/Demo_pic.png")}
        />
        <MyBagClubCard
          Description="AFFINITI for Wm B Woods US 10AAAA ..."
          CategoryName="Women's Heels"
          OldPrice="$45"
          NewPrice="$56"
          imageSrc={require("../images/Demo_pic.png")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
