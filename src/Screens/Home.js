import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header.js";
import SearchBox from "../component/SearchBox.js";
import * as qs from "qs";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Heading from "../component/Heading";
import MyBagClubCard from "../component/MyBagClubCard";
import { SIZES } from "../assets/theme/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Carousel from "../component/Carousel";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { storeCategory } from "../store/category/CategoryAction";
import { storeWish, storeOnSale, storeRecommended, storeHot } from "../store/wishlist/WishAction";
import { storeCart } from "../store/cart/cartAction";
// import { storeOnSale, storeWish } from "../store/onSale/OnSaleAction";
import { storeRecommend } from "../store/recommend/RecommendAction";
import { storeWhathot } from "../store/whathot/WhathotAction";
import Icon from "react-native-vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";
const Home = ({
  navigation,
  rdStoreCategory,
  rdStoreWish,
  reduxWish,
  rdStoreCart,
  rdStoreWhathot,
  rdStoreOnSale,
  reduxOnSale,
  reduxOnRecommend,
  rdStoreOnRecommended,
  rdStoreOnHot,
  reduxOnHot,
}) => {
  // const reduxWish = useSelector((state) => state.wish);
  const reduxUser = useSelector((state) => state.user);
  // const reduxOnsale = useSelector((state) => state.onsale);

  // console.log("reduxOnsale", reduxOnsale.onsale);

  const [catData2, setCatData2] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [saveFavList, setSaveFavList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);

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

  // console.log("reduxCategory", reduxCategory);

  // var HomeData = new FormData();
  // HomeData.append("gethomepage", "1");
  // HomeData.append("lang_id", "1");

  useEffect(() => {
    var homeHeader = new Headers();
    homeHeader.append("accept", "application/json");
    homeHeader.append("Content-Type", "application/x-www-form-urlencoded");
    homeHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var HomeData = qs.stringify({
      gethomepage: "1",
      lang_id: "1",
      user_id: reduxUser.customer.id,
    });

    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", HomeData, {
        headers: homeHeader,
      })
      .then(function (response) {
        console.log("homeRes", response);

        if (response.data.success == 1) {
          setIsDataLoaded(true);
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

          setCatData2(newCategory.category);

          rdStoreCategory(newCategory);
          rdStoreOnRecommended(response.data.data.recommended);
          rdStoreOnSale(response.data.data.on_sale);
          rdStoreOnHot(response.data.data.discount_offer);
        } else {
          showMessage({
            message: "Error ",
            description: "Some error occur",
            type: "error",
          });
        }
      });
  }, []);

  console.log("onsaleapires====>", onSale);

  const getCartData = () => {
    var CheckoutHeader = new Headers();
    CheckoutHeader.append("accept", "application/json");
    CheckoutHeader.append("Content-Type", "application/x-www-form-urlencoded");
    CheckoutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var CheckoutData = qs.stringify({
      viewcart: "1",
      user_id: reduxUser.customer.id,
      lang_id: "1",
    });

    if (!isDataLoaded) {
      // console.log("is", isDataLoaded);

      axios
        .post("https://codewraps.in/beypuppy/appdata/webservice.php", CheckoutData, { headers: CheckoutHeader })
        .then(function (response) {
          console.log("cartresponse", response);
          if (response.data.success == 1) {
            var CartListData = response.data.data;
            var CartCount = CartListData.length;
            var CartSubTotal = response.data.subtotal;
            var CartDeliverChage = parseInt(response.data.delivery_charge);
            var CartGrandTotal = response.data.geranttotal;

            console.log("CartListData===>", CartListData);

            var CartId = [];
            var CartArray = [];

            for (var y = 0; y < CartCount; y++) {
              if (CartListData[y].product_id == null) {
                continue;
              }
              var temp = {
                id: CartListData[y].product_id,
                name: CartListData[y].product_name,
                slug: CartListData[y].product_slug,
                image: CartListData[y].product_image,
                price: CartListData[y].product_price,
              };
              CartArray.push(temp);
              // console.log("FavListData ===>", FavListData[y].product_id);

              CartId.push(CartListData[y].product_id);

              // console.log("favid", FavId);
            }

            // var CartCount2 = .length;

            var newCart = {
              cart: CartArray,
              cartCount: CartCount,
              cartId: CartId,
              subTotal: CartSubTotal,
              shipping: parseInt(CartDeliverChage),
              grandTotal: CartGrandTotal,
            };

            rdStoreCart(newCart);
            console.log("newCart", newCart);
          } else {
            // showMessage({
            //   message: "fail",
            //   description: response.data.message,
            //   type: "default",
            //   backgroundColor: "red",
            // });
          }
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    }
  };

  // console.log("cartdata ===>", cartData);

  useEffect(() => {
    getCartData();
    navigation.addListener("focus", () => getCartData());
  }, []);

  useEffect(() => {
    console.log("checking data");
    if (!isLoading) {
      console.log("checking");
      onSearch();
    }
  }, []);
  const onSearch = (text) => {
    var searchHeader = new Headers();
    searchHeader.append("accept", "application/json");
    searchHeader.append("Content-Type", "application/x-www-form-urlencoded");
    searchHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var searchHeaderData = qs.stringify({
      getsearchproducts: "1",
      keysearch: search,
      lang_id: "1",
    });

    console.log("searchHeaderData", searchHeaderData);
    // setIsLoading(true);
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", searchHeaderData, { headers: searchHeader })
      .then(function (responce) {
        console.log("res", responce);
        if (responce.data.success == 1) {
          setSearchData(responce.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    if (text !== "") {
      let tempList = searchData?.filter((item) => {
        return item.product_name?.toLowerCase().indexOf(text?.toLowerCase()) > -1;
      });
      setSearchData(tempList);
    } else {
      resetSearch();
    }
  };

  const resetSearch = () => {
    setSearch("");
    setSearchData([]);
    Keyboard.dismiss();
  };

  // console.log("alldata", allData);

  const renderBreedCat = ({ item }) => {
    // console.log("items", item);
    return (
      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Categories", {
              cat_id: item.id,
              cat_name: item.name,
              categoryList: catData2,
            })
          }
        >
          <View style={styles.imageView}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: item.image }} />
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
        style={{backgroundColor:color.white}}
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
            disPrice={item.product_sell_price}
            icon
            // setOnSale={setOnSale}
            // onSale={onSale}
            // onSale={reduxOnSale}
            item={item}
            {...item}
          />
        </TouchableOpacity>
      </>
    );
  };

  const renderItem2 = ({ item, index }) => {
    // console.log("item", item);
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
            disPrice={item.product_sell_price}
            icon
            // setOnSale={setOnSale}
            // onSale={onSale}
            // onSale={reduxOnSale}
            item={item}
            {...item}
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
            disPrice={item.product_sell_price}
            icon
            // setOnSale={setOnSale}
            // onSale={onSale}
            // onSale={reduxOnSale}
            item={item}
            {...item}
          />
        </TouchableOpacity>
      </>
    );
  };

  const renderDropdown = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleOnPress(),
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
            });
        }}
      >
        <View
          style={{
            // backgroundColor: "red",
            marginVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: color.light_grey,
          }}
        >
          <Text style={styles.listTxt}>{item.product_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOnPress = () => {
    return setSearch(false);
  };

  return (
    <>
      <StatusBar backgroundColor={color.primary_color} />
      <Header navigation={navigation} cart={() => navigation.navigate("CheckoutStack")} />

      <View
        style={{
          // flex: 1,
          backgroundColor: color.primary_color,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 30,
        }}
      >
        <View style={styles.parent}>
          <View
            style={{
              flex: 0.2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="search1" size={20} color={color.primary_color} />
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            {/* <View>
          <Text style={{fontWeight:'bold'}}>Delivering To:</Text>
        </View> */}
            <View
              style={{
                // marginHorizontal: 10,
                // backgroundColor: "red",
                width: wp(74),
              }}
            >
              <TextInput
                ref={searchRef}
                placeholder="Search"
                onChangeText={(text) => {
                  setSearch(text);
                  onSearch(text);
                  // setSearchData(searchData);
                }}
                value={search}
              />
            </View>
          </View>

          <View style={styles.ImageView}>
            {search == "" ? null : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    searchRef.current.clear();
                    onSearch("");
                    setSearch("");
                  }}
                >
                  <Icon
                    name="close"
                    size={25}
                    color="black"
                    style={{
                      marginTop: 0,
                      right: 10,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
      {search == "" ? null : (
        <View style={styles.dropdownView}>
          <FlatList data={searchData} renderItem={renderDropdown} keyExtractor={(item) => item.product_id} />
        </View>
      )}
      {/* <SearchBox
      // onPress={() => navigation.navigate("Filter")}
      /> */}
      <ScrollView style={{ backgroundColor: color.white }}>
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
                // data={onSale}
                extraData={reduxOnSale}
                data={reduxOnSale}
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
              <TouchableOpacity onPress={() => navigation.navigate("OnSaleList")}>
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
                extraData={reduxOnRecommend}
                data={reduxOnRecommend}
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
              <TouchableOpacity onPress={() => navigation.navigate("RecommendList")}>
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
                extraData={reduxOnHot}
                data={reduxOnHot}
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
              <TouchableOpacity onPress={() => navigation.navigate("WhathotList")}>
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
          alignItems: "center",
          justifyContent: "center",
          width: 60,
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
    borderColor: color.primary_color
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

  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    // marginTop: 20,
    paddingVertical: 10,
    borderColor: color.primary_color,
    paddingHorizontal: 8,
    backgroundColor: color.white,
  },
  ImageView: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownView: {
    width: SIZES.width / 1.2,
    height: SIZES.height / 5,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 999,
    top: 160,
    bottom: 0,
    left: 35,
    right: 0,
  },
  listTxt: {
    fontWeight: "bold",
    marginVertical: 8,
    fontSize: SIZES.h3,
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
    reduxCategory: state.category,
    reduxWish: state.wish,
    reduxOnSale: state.wish.onSale,
    reduxOnRecommend: state.wish.recommended,
    reduxOnHot: state.wish.hot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreCategory: (newCategory) => dispatch(storeCategory(newCategory)),
    rdStoreWish: (newWish) => dispatch(storeWish(newWish)),
    rdStoreOnSale: (newWish) => dispatch(storeOnSale(newWish)),
    rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
    rdStoreOnRecommended: (newWish) => dispatch(storeRecommended(newWish)),
    rdStoreOnHot: (newWish) => dispatch(storeHot(newWish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
