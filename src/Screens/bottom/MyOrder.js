import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import Header from "../../component/Header";
import CategoryHeading2 from "../../component/CategorryHeading2";
import Ionicons from "react-native-vector-icons/Ionicons";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import VioletButton from "../../component/VioletButton";
export default function MyOrder({ navigation }) {
  const orderData = [
    {
      id: "1",
      img: require("../../images/puppy.png"),
      name: "Kennel Esthund",
      address: "Dakshinpuri new delhi 110062",
      receivedTime: "Received 8 oct 21, 20:30PM",
      price: "$549.99",
    },
  ];

  const renderOrderList = ({ item, index }) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          <View style={styles.imgView}>
            <Image resizeMode="contain" style={styles.img} source={item.img} />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.nameTxt}>{item.name}</Text>
            <Text style={styles.addrsTxt}>{item.address}</Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("OrderTrackScreen")}
            >
              <Text style={styles.btnTxt}>View Details</Text>
            </TouchableOpacity>
            {/* <VioletButton buttonName={"Reorder"} /> */}
          </View>
        </View>
        <View style={styles.secondView}>
          <Text style={styles.timeTxt}>{item.receivedTime}</Text>
          <Text style={styles.priceTxt}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <CategoryHeading2 CategoryName={"MY ORDERS"} />
      <View style={styles.view1}>
        <Text style={styles.txt1}>This Month</Text>
        <View style={styles.iconView}>
          <Text style={styles.txt2}>Filter</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={35} color={color.light_grey} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={orderData}
        renderItem={renderOrderList}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.width / 30,
    marginVertical: SIZES.height / 50,
  },
  txt1: {
    fontSize: SIZES.h3,
    color: color.black,
    fontWeight: "bold",
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt2: {
    fontSize: SIZES.h3,
    fontWeight: "600",
  },
  mainView: {
    borderWidth: 0.3,
    borderColor: color.black,
    borderRadius: 5,
    paddingHorizontal: SIZES.width / 50,
    paddingVertical: SIZES.height / 64 - 40,
    marginHorizontal: SIZES.width / 30,
  },
  firstView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    borderBottomColor: color.black,
    paddingVertical: SIZES.height / 50,
    paddingHorizontal: 10,
  },
  imgView: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 0.22,
  },
  img: {
    height: SIZES.height / 14,
    width: SIZES.width / 5,
  },
  nameView: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  btnView: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    backgroundColor: color.text_primary,
    paddingHorizontal: SIZES.width / 30,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
  },
  btnTxt: {
    color: color.black,
    fontWeight: "bold",
    fontSize: SIZES.h4 - 3,
  },
  secondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SIZES.height / 40,
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  nameTxt: {
    fontSize: SIZES.h3 + 1,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addrsTxt: {
    fontSize: SIZES.h4 - 1,
    color: color.light_grey,
  },
  timeTxt: {
    fontSize: SIZES.h3,
  },
  priceTxt: {
    fontWeight: "bold",
    fontSize: SIZES.h3,
    color: color.light_grey,
  },
});
