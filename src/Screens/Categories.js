import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "../component/Header";
import color from "../assets/theme/color";
import CategoryHeading from "../component/CategoryHeading.js";
import SearchBox from "../component/SearchBox";
import MyBagClubCard from "../component/MyBagClubCard";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES } from "../assets/theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import axios from "axios";
import * as qs from "qs";
import { showMessage } from "react-native-flash-message";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import BackHeader from "../component/buttons/BackHeader";
import { useTranslation } from "react-i18next";

const Categories = ({ navigation, route, categoryList }) => {
  const reduxUser = useSelector((state) => state.user);
  const { t } = useTranslation();

  const reduxCategory = useSelector((state) => state.category);
  const [catDetail, setCatDetail] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const searchRef = useRef();
  const dropdownRef = useRef({});
  const lang_id = localStorage.getItem("lang_id");

  const { cat_id, cat_name } = route.params;

  var Categories_Header = new Headers();
  Categories_Header.append("accept", "application/json");
  Categories_Header.append("Content-Type", "application/x-www-form-urlencoded");
  Categories_Header.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  const getData = (categoryId) => {
    var catData = qs.stringify({
      getcatproduct: "1",
      category_id: categoryId,
      lang_id: lang_id,
      user_id: reduxUser.customer.id,
    });

    console.log("catData", catData);
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", catData, {
        headers: Categories_Header,
      })
      .then(function (response) {
        console.log("cat=====>", response);
        if (response.data.success == 1) {
          const products = response.data.subcategory.subcategory[0].products;
          setData(products ? products : []);
          setCatDetail(response.data.subcategory.subcategory[0]);
        } else {
          showMessage({
            message: "Error ",
            description: "Some error occur",
            type: "error",
          });
        }
      });
  };

  // console.log("data", data[0].product_id);

  useEffect(() => {
    categoryId && getData(categoryId);
  }, [categoryId]);

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => getData(categoryId)}>
        {t("No Data Found")}
      </Text>
    );
  };

  const onSearch = (text) => {
    var searchHeader = new Headers();
    searchHeader.append("accept", "application/json");
    searchHeader.append("Content-Type", "application/x-www-form-urlencoded");
    searchHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var searchHeaderData = qs.stringify({
      getsearchproducts: "1",
      keysearch: search,
      lang_id: lang_id,
    });

    // setIsLoading(true);
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        searchHeaderData,
        { headers: searchHeader }
      )
      .then(function (responce) {
        if (responce.data.success == 1) {
          setSearchData(responce.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
    if (text !== "") {
      let tempList = searchData?.filter((item) => {
        return (
          item.product_name?.toLowerCase().indexOf(text?.toLowerCase()) > -1
        );
      });
      setSearchData(tempList);
    } else {
      resetSearch();
    }
  };
  useEffect(() => {
    if (!isLoading) {
      onSearch();
    }
    setCategoryId(cat_id);
  }, []);

  const resetSearch = () => {
    setSearch("");
    setSearchData([]);
    Keyboard.dismiss();
  };
  // console.log("data =====>", data);

  // console.log("data", data.cat_id);
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
            breedType={item.product_slug}
            disPrice={item.product_sell_price}
            icon
            wishlist={item.wishlist}
            {...item}
            onLikePost={(product_id) => {
              const updatedList = data.map((item) => {
                if (item.product_id == product_id) {
                  return { ...item, wishlist: "1" };
                } else {
                  return item;
                }
              });
              setData(updatedList);
            }}
            onRemovePost={(product_id) => {
              const updatedList = data.map((item) => {
                if (item.product_id == product_id) {
                  return { ...item, wishlist: "0" };
                } else {
                  return item;
                }
              });
              setData(updatedList);
            }}
          />
        </TouchableOpacity>
      </>
    );
  };

  const priceFilter = (id) => {
    if (id == 1) {
      const updatedData = data?.sort((a, b) =>
        a.product_sell_price > b.product_sell_price ? 1 : -1
      );
      setRefresh((prev) => !prev);
      setData(updatedData);
    } else if (id == 2) {
      const updatedData = data?.sort((a, b) =>
        b.product_sell_price > a.product_sell_price ? 1 : -1
      );
      setRefresh((prev) => !prev);
      setData(updatedData);
    } else if (id == 3) {
      const updatedData = data?.sort((a, b) =>
        b.product_name < a.product_name ? 1 : -1
      );
      setRefresh((prev) => !prev);
      setData(updatedData);
    } else if (id == 4) {
      const updatedData = data?.sort((a, b) =>
        b.product_name < a.product_name ? -1 : 1
      );
      setRefresh((prev) => !prev);
      setData(updatedData);
    }
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: color.background_color }}>
        <StatusBar backgroundColor={color.primary_color} />
        {/* <Header navigation={navigation} cart={() => navigation.navigate("CheckoutStack")} /> */}
        <BackHeader navigation={() => navigation.goBack()} />

        <View
          style={{
            // flex: 1,
            backgroundColor: color.primary_color,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 30,
            bottom: 2,
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
            <View
              style={{ flexDirection: "row", flex: 2, alignItems: "center" }}
            >
              <View
                style={{
                  width: wp(74),
                }}
              >
                <TextInput
                  ref={searchRef}
                  placeholder={`${t("Search")}`}
                  onChangeText={(text) => {
                    setSearch(text);
                    onSearch(text);
                  }}
                  value={search}
                />
              </View>
            </View>
            <View style={styles.ImageView}>
              {search == "" ? null : (
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
              )}
            </View>
          </View>
        </View>

        {search == "" ? null : (
          <View style={styles.dropdownView}>
            <FlatList
              data={searchData}
              renderItem={renderDropdown}
              keyExtractor={(item) => item.product_id}
            />
          </View>
        )}

        <View style={styles.filerTxtView}>
          <Text style={styles.fileterTxt}>{t("Filter")}</Text>
        </View>
        <View style={styles.FiltermainView}>
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
              <View>
                {console.log("=====>", categoryList.category)}
                <SelectDropdown
                  data={categoryList.category.map((item) => ({
                    name: item.name,
                    id: item.id,
                  }))}
                  defaultButtonText={cat_name}
                  onSelect={(selectedItem, index) => {
                    setCategoryId(selectedItem.id);
                    dropdownRef.current.reset(); // Reset Filter
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={{
                    overflow: "hidden",
                    width: wp(30),
                    color: color.white,
                    backgroundColor: color.primary_color,
                  }}
                  buttonTextStyle={styles.btnTxt}
                  rowTextStyle={styles.row_text}
                  dropdownStyle={{ width: 200 }}
                />
              </View>
              <Ionicons name="chevron-down" color={color.white} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
              <SelectDropdown
                ref={dropdownRef}
                defaultButtonText={`${t("SELECT")}`}
                data={[
                  { name: `${t("Low to High")}`, id: 1 },
                  { name: `${t("High to Low")}`, id: 2 },
                  { name: `${t("A to Z")}`, id: 3 },
                  { name: `${t("Z to A")}`, id: 4 },
                ].map((item) => ({ name: item.name, id: item.id }))}
                onSelect={(selectedItem, index) => {
                  categoryList.category.length && priceFilter(selectedItem?.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                buttonStyle={{
                  overflow: "hidden",
                  width: wp(30),
                  color: color.white,
                  backgroundColor: color.primary_color,
                }}
                buttonTextStyle={styles.btnTxt}
                rowTextStyle={styles.row_text}
                dropdownStyle={{ width: "50%" }}
              />
              {/* </View> */}
              <Ionicons name="chevron-down" color={color.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.breedheadingView}>
          <Text style={styles.breedheadingTxt}>{catDetail.cat_name}</Text>
        </View>
        {/* <View style={{ padding: wp(7) }}> */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.product_id}
          renderItem={renderItem}
          numColumns={2}
          ListEmptyComponent={EmptyListMessage}
          contentContainerStyle={{ padding: wp(7) }}
          // extraData={refre
          // extraData={data}
        />
        {/* </View> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};
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
    justifyContent: "space-around",
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
    overflow: "hidden",
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
    categoryList: state.category,
    reduxUser: state.user,
    reduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(Categories);
