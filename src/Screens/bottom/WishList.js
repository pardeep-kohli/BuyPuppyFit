import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import color from "../../assets/theme/color";
import Header from "../../component/Header";
import Categories from "../Categories";
import PriceAndRating from "../../component/PriceAndRating";
import CategoryHeading from "../../component/CategoryHeading";
import MyBagClubCard from "../../component/MyBagClubCard";
export default function WishList({ navigation }) {
  const data = [
    {
      id: "1",
      img: require("../../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "2",
      img: require("../../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "3",
      img: require("../../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "4",
      img: require("../../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "5",
      img: require("../../images/puppy.png"),
      breedName: "BREED: German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "6",
      img: require("../../images/puppy.png"),
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
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.violet} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <CategoryHeading CategoryName={"WishList"} number={"6"} />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
    // </View>
  );
}
