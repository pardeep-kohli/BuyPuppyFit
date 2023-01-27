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
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function Favourite({ navigation }) {
  const reduxUser = useSelector((state) => state.user);

  const [saveFavList, setSaveFavList] = useState([]);

  const getFavList = () => {
    var favHeader = new Headers();
    favHeader.append("accept", "application/json");
    favHeader.append("Content-Type", "application/x-www-form-urlencoded");
    favHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var favData = new FormData();

    favData.append("wishlist", "1");
    favData.append("user_id", reduxUser.customer.id);
    favData.append("lang_id", "1");

    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
        favData,
        { headers: favHeader }
      )
      .then(function (response) {
        console.log("favlist", response);
        if (response.data.success == 1) {
          setSaveFavList(response.data.data);
        }
      });
  };

  useEffect(() => {
    getFavList();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("DetailedScreen", {
              product_id: item.product_id,
            })
          }
        >
          <MyBagClubCard
            img={{ uri: item.product_image }}
            breedName={item.product_slug}
            breedType={item.product_name}
            // price={item.price}
            disPrice={item.product_price}
            icon
            {...item}
            onLikePost={(product_id) =>
              setSaveFavList(() => {
                return saveFavList.map((post) => {
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
        data={saveFavList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.product_id}
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
