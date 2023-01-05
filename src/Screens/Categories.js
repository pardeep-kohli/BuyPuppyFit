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
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Categories({ navigation }) {
  const data = [
    {
      id: "1",
      img: require("../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "2",
      img: require("../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "3",
      img: require("../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "4",
      img: require("../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "5",
      img: require("../images/banner.png"),
      breedName: "German Shepherd",
      breedType: "Kennel Esthund",
      price: "$599.99",
      disPrice: "$549.99",
    },
    {
      id: "6",
      img: require("../images/banner.png"),
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
          activeOpacity={0.7}
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
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <SearchBox onPress={() => navigation.navigate("Filter")} />
      {/* <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      > */}
      <View style={styles.FiltermainView}>
        <View style={styles.filerTxtView}>
          <Text style={styles.fileterTxt}>Filter</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Categories </Text>
            <Ionicons name="chevron-down" color={color.white} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
            <Text style={styles.btnTxt}>Price: LOW TO HIGH </Text>
            <Ionicons name="chevron-down" color={color.white} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.breedheadingView}>
        <Text style={styles.breedheadingTxt}>GERMEN SHEPHERD</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      {/* </ScrollView> */}
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
  FiltermainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  filerTxtView: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fileterTxt: {
    fontFamily: "SegoeUIBold",
    fontSize: SIZES.h3 + 1,
    textTransform: "uppercase",
  },
  btnView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: color.primary_color,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: SIZES.height / 21,
  },
  btnTxt: {
    color: color.text_primary,
    fontFamily: "RobotoSemi",
    fontSize: SIZES.h4 - 1,
    textTransform: "uppercase",
  },
  breedheadingView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  breedheadingTxt: {
    fontSize: SIZES.h2 - 2,
    fontFamily: "RubikBold",
    color: color.primary_color2,
  },
});
