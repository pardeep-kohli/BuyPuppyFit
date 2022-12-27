import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../component/Header";
import color from "../assets/theme/color";
import CategoryHeading from "../component/CategoryHeading.js";
import SearchBox from "../component/SearchBox";
import MyBagClubCard from "../component/MyBagClubCard";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES } from "../assets/theme/theme";

export default function Categories({ navigation }) {
  const data = [
    {
      id: "1",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "2",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "3",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "4",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "5",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "6",
      img: require("../images/puppy.png"),
      breedName: "BREED: German Shepherd",
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
            price={item.price}
            disPrice={item.disPrice}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <ScrollView>
        <SearchBox onPress={() => navigation.navigate("Filter")} />
        <CategoryHeading CategoryName="GERMAN SHEPHERD" number={"8"} />

        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  // cardView: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-around",
  //   paddingHorizontal: 10,
  //   marginTop: 10,
  // },
});
