import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import color from "../assets/theme/color";
import CategoryHeading from "../component/CategoryHeading.js";
import SearchBox from "../component/SearchBox";
import MyBagClubCard from "../component/MyBagClubCard";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES } from "../assets/theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import * as qs from "qs";

const Categories = ({ navigation, route }) => {
  const reduxCategory = useSelector((state) => state.category);
  const [data, setData] = useState([]);
  const [catDetail, setCatDetail] = useState([]);

  console.log("reduxCategory", reduxCategory.category);

  const { cat_id } = route.params;
  console.log("categoryId", cat_id);

  var Categories_Header = new Headers();
  Categories_Header.append("accept", "application/json");
  Categories_Header.append("Content-Type", "application/x-www-form-urlencoded");
  Categories_Header.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  // var catData = new FormData();
  // catData.append("getcatproduct", "1");
  // catData.append("category_id", cat_id);
  // catData.append("lang_id", "1");

  var catData = qs.stringify({
    getcatproduct: "1",
    category_id: cat_id,
    lang_id: "1",
  });

  useEffect(() => {
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", catData, {
        headers: Categories_Header,
      })
      .then(function (response) {
        console.log("Cate_res", response);

        if (response.data.success == 1) {
          setData(response.data.subcategory.subcategory[0].products);
          setCatDetail(response.data.subcategory.subcategory[0]);
        } else {
          console.log("api not call");
        }
      });
  }, []);

  console.log("data", catDetail);
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
            {...item}
            onLikePost={(product_id) =>
              setData(() => {
                return data.map((post) => {
                  console.log("Post", post);
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
        <Text style={styles.breedheadingTxt}>{catDetail.cat_name}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.cat_id}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      {/* </ScrollView> */}
    </View>
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

// const mapStateToProps = (state) => {
//   return {
//     reduxUser: state.user,
//   };
// };

export default Categories;
// connect(mapStateToProps)
