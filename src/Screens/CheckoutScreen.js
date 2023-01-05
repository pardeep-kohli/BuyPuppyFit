import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Header from "../component/Header";
import CategoryHeading from "../component/CategoryHeading";
import color from "../assets/theme/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SIZES } from "../assets/theme/theme";
import VioletButton from "../component/VioletButton";

export default function CheckoutScreen({ navigation }) {
  const orderData = [
    {
      id: "1",
      img: require("../images/banner.png"),
      dogName: "Kennel Esthund",
      amount: "$549.99",
      price: "PRICE",
    },
    {
      id: "2",
      img: require("../images/banner.png"),
      dogName: "Kennel Esthund",
      amount: "$549.99",
      price: "PRICE",
    },
    {
      id: "3",
      img: require("../images/banner.png"),
      dogName: "Kennel Esthund",
      amount: "$549.99",
      price: "PRICE",
    },
  ];

  const renderOrder = ({ item, index }) => {
    return (
      <>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.mainView}>
            <View style={styles.imgView}>
              <ImageBackground
                // resizeMode="contain"
                style={styles.img}
                source={item.img}
                imageStyle={{ borderRadius: 10 }}
              />
            </View>
            <View style={styles.dtlView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: SIZES.height / 64,
                }}
              >
                <View>
                  <Text style={styles.dogTxt}>{item.dogName}</Text>
                </View>
                <View style={styles.quantityView}>
                  <TouchableOpacity>
                    <FontAwesome
                      name="minus-circle"
                      size={25}
                      color={color.black}
                    />
                  </TouchableOpacity>
                  <Text style={styles.txt2}>1</Text>
                  <TouchableOpacity>
                    <FontAwesome
                      name="plus-circle"
                      size={25}
                      color={color.text_primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{ borderWidth: 0.3, borderColor: color.light_grey }}
              ></View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: SIZES.height / 64,
                }}
              >
                <Text style={styles.priceTxt}>{item.price}</Text>
                <Text style={styles.amountTxt}>{item.amount}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.background_color }}>
      <Header navigation={navigation} />
      <CategoryHeading CategoryName={"REVIEW YOUR CART"} number={"6"} />

      <View style={styles.view1}>
        <Text style={styles.txt1}>
          Swipe left to remove a product from the cart.
        </Text>
      </View>
      <FlatList
        data={orderData}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Total(1 items)</Text>

        <Text style={[styles.txt1, { fontFamily: "RubikMed" }]}>
          Total(1 items)
        </Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Shipping</Text>

        <Text style={[styles.amountTxt, { fontFamily: "RubikRegular" }]}>
          $5
        </Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Taxes</Text>

        <Text style={[styles.amountTxt, { fontFamily: "RubikRegular" }]}>
          $0.00
        </Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.priceTxt}>Grand Total</Text>

        <Text
          style={[
            styles.amountTxt,
            { color: color.primary_color2, fontFamily: "RubikBold" },
          ]}
        >
          $549.99
        </Text>
      </View>
      <VioletButton
        buttonName={"CHECKOUT"}
        onPress={() => navigation.navigate("CheckoutAddress")}
      />
      {/* <View style={styles.btnView2}>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnTxt2}>CHECKOUT</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  txt1: {
    fontFamily: "RubikSemiBold",
    color: color.light_grey,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // paddingHorizontal: SIZES.base,
    marginVertical: SIZES.height / 64 - 10,
    backgroundColor: color.white,
    flex: 1,
    paddingHorizontal: 10,
  },
  imgView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // overflow: "hidden",
    // backgroundColor: "red",
  },
  img: {
    height: SIZES.height / 10,
    width: "100%",
  },
  dtlView: {
    flex: 1,
    paddingHorizontal: 10,
    // alignItems: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dogTxt: {
    fontSize: SIZES.h2 - 3,
    fontFamily: "RubikBold",
  },
  txt2: {
    fontSize: SIZES.h2 - 3,
    marginHorizontal: SIZES.width / 64,
  },
  priceTxt: {
    fontSize: SIZES.h3 + 2,
    fontFamily: "RubikBold",
    color: color.light_grey,
  },
  amountTxt: {
    color: color.light_grey,
    fontSize: SIZES.h3 + 2,
    fontFamily: "RubikSemiBold",
  },
  totalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 40,
    paddingVertical: SIZES.width / 40,
    backgroundColor: color.white,
    borderBottomColor: color.black,
    borderBottomWidth: 0.2,
  },
});
