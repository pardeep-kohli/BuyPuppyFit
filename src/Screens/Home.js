import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header.js";
import SearchBox from "../component/SearchBox.js";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Heading from "../component/Heading";
import MyBagClubCard from "../component/MyBagClubCard";
import { SIZES } from "../assets/theme/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Carousel from "../component/Carousel";
export default function Home({ navigation }) {
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

  const flatListRef = useRef();
  const flatListRef2 = useRef();
  const flatListRef3 = useRef();

  React.useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }, [index]);
  React.useEffect(() => {
    flatListRef2.current?.scrollToIndex({
      index: index2,
      animated: true,
    });
  }, [index2]);
  React.useEffect(() => {
    flatListRef3.current?.scrollToIndex({
      index: index3,
      animated: true,
    });
  }, [index3]);

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
  const data2 = [
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
  ];
  const data3 = [
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
  ];

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.3}
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

  const renderItem2 = ({ item, index }) => {
    return (
      <>
        <MyBagClubCard
          img={item.img}
          breedName={item.breedName}
          breedType={item.breedType}
          price={item.price}
          disPrice={item.disPrice}
        />
      </>
    );
  };

  const renderItem3 = ({ item, index }) => {
    return (
      <>
        <MyBagClubCard
          img={item.img}
          breedName={item.breedName}
          breedType={item.breedType}
          price={item.price}
          disPrice={item.disPrice}
        />
      </>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <ScrollView style={{ backgroundColor: color.white }}>
        <View>
          <SearchBox onPress={() => navigation.navigate("Filter")} />
          <Carousel />

          <View style={{ paddingHorizontal: 15 }}>
            <Text style={styles.text}>DOG’S BREED</Text>
          </View>
          <View>
            <View style={styles.categories}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categories")}
              >
                <View style={styles.imageView}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require("../images/german.png")}
                  />
                  <Text style={styles.TextView}>German Shepherd</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categories")}
              >
                <View style={styles.imageView}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require("../images/french.png")}
                  />

                  <Text style={styles.TextView}>French Bulldog</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categories")}
              >
                <View style={styles.imageView}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require("../images/cavalier.png")}
                  />
                  <Text style={styles.TextView}>Cavalier King</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Categories")}
              >
                <View style={styles.imageView}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require("../images/belg.png")}
                  />
                  <Text style={styles.TextView}>Belgian Shepherd</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Heading HeadLine="ON SALE" />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (index === 0) {
                    return;
                  }
                  setIndex(index - 1);
                }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                ref={flatListRef}
                initialScrollIndex={index}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
                onPress={() => {
                  if (index === data.length - 1) {
                    return;
                  }
                  setIndex(index + 1);
                }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>

            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text>Show All</Text>
              </TouchableOpacity>
            </View>
            <Heading HeadLine="RECOMMENDED" />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (index2 === 0) {
                    console.log("touch");
                    return;
                  }
                  setIndex2(index2 - 1);
                }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                key={"id"}
                ref={flatListRef2}
                initialScrollIndex={index2}
                data={data2}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem2}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
                onPress={() => {
                  if (index2 === data2.length - 1) {
                    return;
                  }
                  setIndex2(index2 + 1);
                }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text>Show All</Text>
              </TouchableOpacity>
            </View>
            <Heading HeadLine="DISCOUNT OFFER" />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (index3 === 0) {
                    return;
                  }
                  setIndex3(index3 - 1);
                }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                key={"id"}
                ref={flatListRef3}
                initialScrollIndex={index3}
                data={data3}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={renderItem3}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
                onPress={() => {
                  if (index3 === data3.length - 1) {
                    return;
                  }
                  setIndex3(index3 + 1);
                }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text>Show All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: SIZES.h2 - 4,
    marginTop: 20,
    color: color.text_primary,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageView: {
    borderWidth: 1,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderColor: color.text_primary,
  },
  image: {
    height: hp(4),
    width: hp(4),
  },
  TextView: {
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  ShowAll: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 30,
  },
  // ButtonBox: {
  //   backgroundColor: "red",
  //   flex: 1,
  //   // position: "absolute",
  //   // flexDirection: "row",
  //   // right: ,
  //   // justifyContent: "space-between",
  //   width: wp(20),
  //   padding: wp(2),
  // },
});
