import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import MyBagClubCard from "../component/MyBagClubCard";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
import Header from "../component/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import * as qs from "qs";
import axios from "axios";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "../component/buttons/BackHeader";
import { useTranslation } from "react-i18next";

const WhathotList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const searchRef = useRef();
  const { t } = useTranslation();

  const [searchData, setSearchData] = useState([]);

  const reduxOnHot = useSelector((state) => state.wish.hot);
  const reduxUser = useSelector((state) => state.user);

  const lang_id = localStorage.getItem("lang_id");
  // const [whathot, setWhathot] = useState([]);

  // useEffect(() => {
  //   var homeHeader = new Headers();
  //   homeHeader.append("accept", "application/json");
  //   homeHeader.append("Content-Type", "application/x-www-form-urlencoded");
  //   homeHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  //   var HomeData = qs.stringify({
  //     gethomepage: "1",
  //     lang_id: "1",
  //   });

  //   axios
  //     .post("https://codewraps.in/beypuppy/appdata/webservice.php", HomeData, {
  //       headers: homeHeader,
  //     })
  //     .then(function (response) {
  //       console.log("homeRes", response);

  //       if (response.data.success == 1) {
  //         setWhathot(response.data.data.discount_offer);
  //       }
  //     });
  // }, []);

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
      lang_id: lang_id,
    });

    console.log("searchHeaderData", searchHeaderData);
    // setIsLoading(true);
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        searchHeaderData,
        { headers: searchHeader }
      )
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
        return (
          item.product_name?.toLowerCase().indexOf(text?.toLowerCase()) > -1
        );
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

  const renderItem = ({ item, index }) => {
    // console.log("item ======>", item);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
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
                  placeholder={t("Search")}
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

        <View style={styles.headingView}>
          <Text style={styles.headingTxt}>{t("WHAT'S HOT")}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            // key={discount.product_id}
            // ref={flatListRef}
            // initialScrollIndex={index}
            extraData={reduxOnHot}
            data={reduxOnHot}
            // horizontal
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.product_id}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
//   };
// };

export default connect(mapStateToProps)(WhathotList);
// export default WhathotList;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 10,
    paddingVertical: 10,
    // marginTop: 10,
    // backgroundColor: color.primary_color,
  },
  headingTxt: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: color.primary_color,
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
