import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import color from "../../assets/theme/color";
import Header from "../../component/Header";
import Categories from "../Categories";
import PriceAndRating from "../../component/PriceAndRating";
import CategoryHeading from "../../component/CategoryHeading";
import MyBagClubCard from "../../component/MyBagClubCard";
import { SIZES } from "../../assets/theme/theme";
export default function Favourite({ navigation }) {
  const data = [
    {
      id: "1",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "2",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "3",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "4",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "5",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "6",
      img: require("../../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("DetailedScreen")}
        >
          <MyBagClubCard
            img={item.img}
            breedName={item.breedName}
            breedType={item.breedType}
            // price={item.price}
            disPrice={item.disPrice}
            icon
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.violet} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>Favourite Item</Text>
        <Text style={styles.qunTxt}>(6 Items)</Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  headingView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  headingTxt: {
    fontSize: SIZES.h2,
    color: color.primary_color2,
    fontFamily: "RubikBold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  qunTxt: {
    color: color.text_primary,
    fontFamily: "RubikMed",
  },
});
