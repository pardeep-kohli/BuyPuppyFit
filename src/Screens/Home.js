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
import React, { useEffect, useRef, useState } from "react";
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

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { storeCategory } from "../store/category/CategoryAction";
const Home = ({ navigation, reduxUser, rdStoreCategory, reduxCategory }) => {
  // const reduxUser2 = useSelector((state) => state.user);

  const [catData2, setCatData2] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [recommend, setRecommend] = useState([]);

  const [isLiked, setisLiked] = useState(false);

  // const [isDataLoaded, setIsDataLoaded] = useState(false);

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

  console.log("reduxCategory", reduxCategory);

  var homeHeader = new Headers();
  homeHeader.append("accept", "application/json");
  homeHeader.append("Content-Type", "application/x-www-form-urlencoded");
  homeHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  var HomeData = new FormData();
  HomeData.append("gethomepage", "1");
  HomeData.append("lang_id", "1");

  useEffect(() => {
    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
        HomeData,
        { headers: homeHeader }
      )
      .then(function (response) {
        console.log("homeRes", response);

        if (response.data.success == 1) {
          var categoryData = response.data.data.category;
          var getCount = categoryData.length;
          var categoryArray = [];

          for (var x = 0; x < getCount; x++) {
            var temp = {
              id: categoryData[x].cat_id,
              name: categoryData[x].cat_name,
              image: categoryData[x].cat_image,
            };
            categoryArray.push(temp);
          }
          var newCategory = {
            category: categoryArray,
            categoryCount: getCount,
          };

          rdStoreCategory(newCategory);
          setCatData2(newCategory.category);
          setDiscount(response.data.data.discount_offer);
          setOnSale(response.data.data.on_sale);
          setRecommend(response.data.data.recommended);
        } else {
          console.log("api not call");
        }
      });
  }, []);

  const renderBreedCat = ({ item }) => {
    // console.log("items", item);
    return (
      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Categories", { cat_id: item.id })}
        >
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: item.image }}
            />
            <Text style={styles.TextView}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
            })
          }
        >
          <MyBagClubCard
            img={{ uri: item.product_image }}
            breedName={item.product_name}
            breedType={item.product_name}
            // price={item.price}
            disPrice={item.product_sell_price}
            icon
            {...item}
            onLikePost={(product_id) =>
              setOnSale(() => {
                return onSale.map((post) => {
                  if (post.product_id === product_id) {
                    return { ...post, isLiked: !post.isLiked };
                  }

                  return post;
                });
              })
            }
          />
        </TouchableOpacity>
      </>
    );
  };

  const renderItem2 = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
            })
          }
        >
          <MyBagClubCard
            img={{ uri: item.product_image }}
            breedName={item.product_name}
            breedType={item.product_name}
            // price={item.price}
            disPrice={item.product_sell_price}
            icon
            {...item}
            onLikePost={(product_id) =>
              setRecommend(() => {
                return recommend.map((post) => {
                  if (post.product_id === product_id) {
                    return { ...post, isLiked: !post.isLiked };
                  }

                  return post;
                });
              })
            }
          />
        </TouchableOpacity>
      </>
    );
  };

  const renderItem3 = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
            })
          }
        >
          <MyBagClubCard
            img={{ uri: item.product_image }}
            breedName={item.product_name}
            breedType={item.product_name}
            // price={item.price}
            disPrice={item.product_sell_price}
            icon
            {...item}
            onLikePost={(product_id) =>
              setDiscount(() => {
                return discount.map((post) => {
                  if (post.product_id === product_id) {
                    return { ...post, isLiked: !post.isLiked };
                  }

                  return post;
                });
              })
            }
          />
        </TouchableOpacity>
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
      <SearchBox onPress={() => navigation.navigate("Filter")} />
      <ScrollView style={{ backgroundColor: color.background_color }}>
        <View>
          <Carousel />

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.text}>DOG’S BREED</Text>
          </View>
          <View>
            <FlatList
              data={catData2}
              renderItem={renderBreedCat}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
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
              // onPress={() => {
              //   if (index === 0) {
              //     return index;
              //   }
              //   setIndex(index - 1);
              // }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                // key={discount.product_id}
                // ref={flatListRef}
                // initialScrollIndex={index}
                data={onSale}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.product_id}
                renderItem={renderItem}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
              // onPress={() => {
              //   if (index === onSale.length - 1) {
              //     return;
              //   }
              //   setIndex(index + 1);
              // }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>

            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text style={styles.ShowallTxt}>Show All</Text>
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
              // onPress={() => {
              //   if (index2 === 0) {
              //     return;
              //   }
              //   setIndex2(index2 - 1);
              // }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                // key={recommend.product_id}
                // ref={flatListRef2}
                // initialScrollIndex={index2}
                data={recommend}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.product_id}
                renderItem={renderItem2}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
              // onPress={() => {
              //   if (index2 === recommend.length - 1) {
              //     return;
              //   }
              //   setIndex2(index2 + 1);
              // }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text style={styles.ShowallTxt}>Show All</Text>
              </TouchableOpacity>
            </View>
            <Heading HeadLine="WHAT’S HOT" />
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
              // onPress={() => {
              //   if (index3 === 0) {
              //     return;
              //   }
              //   setIndex3(index3 - 1);
              // }}
              >
                <AntDesign name="left" size={25} color={color.primary_color} />
              </TouchableOpacity>
              <FlatList
                // key={"id"}
                // ref={flatListRef3}
                // initialScrollIndex={index3}
                data={discount}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.product_id}
                renderItem={renderItem3}
              />
              {/* <View style={styles.ButtonBox}> */}
              <TouchableOpacity
              // onPress={() => {
              //   if (index3 === discount.length - 1) {
              //     return;
              //   }
              //   setIndex3(index3 + 1);
              // }}
              >
                <AntDesign name="right" size={25} color={color.primary_color} />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={styles.ShowAll}>
              <TouchableOpacity>
                <Text style={styles.ShowallTxt}>Show All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          zIndex: 9999,
          left: 20,
          right: 0,
          bottom: 10,
        }}
      >
        <TouchableOpacity activeOpacity={0.4}>
          <Image
            resizeMode="contain"
            style={styles.whatsappImg}
            source={require("../assets/images/social_icons/whatsapp2.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 4,
    marginTop: 20,
    color: color.primary_color,
  },
  categories: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 9,
    // backgroundColor: "red",
    // marginHorizontal: 8,
  },
  imageView: {
    borderWidth: 1,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderColor: color.primary_color,
  },
  image: {
    height: hp(4),
    width: hp(4),
  },
  TextView: {
    fontSize: 10,
    fontFamily: "RubikMed",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  ShowAll: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 35,
    paddingTop: 10,
    paddingBottom: 30,
  },
  ShowallTxt: {
    fontFamily: "RubikMed",
    color: color.black,
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
  whatsappImg: {
    height: SIZES.height / 16,
    width: SIZES.width / 6,
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
    reduxCategory: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreCategory: (newCategory) => dispatch(storeCategory(newCategory)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
