import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategorryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import StepIndicator from "react-native-step-indicator";
import { Divider } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import * as qs from "qs";
import axios from "axios";

const labels = ["Cart", "Delivery Address", "Order Summary"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 13,
  stepStrokeCurrentColor: "green",
  stepStrokeWidth: 13,
  stepStrokeFinishedColor: "green",
  stepStrokeUnFinishedColor: "green",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "white",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "red",
  labelColor: "red",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

export default function OrderTrackScreen({ navigation, route }) {
  const { order_id } = route.params;

  console.log("orderid", order_id);

  const [currentPosition, setCurrentPosition] = React.useState(0);

  const [orderDetail, setOrderDetail] = useState([]);
  const [orderItem, setOrderItem] = useState([]);

  const showOrderDetail = () => {
    var DetailHeader = new Headers();

    DetailHeader.append("accept", "application/json");
    DetailHeader.append("Content-Type", "application/x-www-form-urlencoded");
    DetailHeader.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

    var Detail_Data = qs.stringify({
      vieworderdetails: "1",
      order_id: order_id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        Detail_Data,
        { headers: DetailHeader }
      )
      .then(function (response) {
        console.log("detail res", response);
        if (response.data.success == 1) {
          setOrderDetail(response.data.data);
          setOrderItem(response.data.data.item[0]);
        }
      });
  };

  console.log("orderItem", orderItem.product_image);

  useEffect(() => {
    showOrderDetail();
    navigation.addListener("focus", () => showOrderDetail());
  }, []);

  // const setpData = [
  //   {
  //     label: "Ordered",
  //     date: "Thu, 15 Dec ‘2022",
  //   },
  //   {
  //     label: "On the way",
  //     date: "Thu, 15 Dec ‘2022",
  //   },
  //   {
  //     label: "Delivered",
  //     date: "Arriving in 45 min",
  //   },
  // ];

  return (
    <View style={styles.page}>
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />

      {/* <CategorryHeading2 CategoryName={"VIEW DETAILS"} /> */}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.firstView}>
            <View style={styles.imgView}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={{ uri: orderItem.product_image }}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.nameTxt}>{orderItem.product_name}</Text>
              <Text style={styles.breedTxt}>Germen shepherd</Text>
            </View>
            <TouchableOpacity>
              <Entypo name="cross" color={color.light_grey} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.orderDateView}>
            <Text style={styles.orderTxt}>
              Order id: {orderDetail.order_id}
            </Text>
            <Text style={styles.dateTxt}>
              Date of order: {orderDetail.order_date}
            </Text>
          </View>
          <View style={styles.indicatorView}>
            {/* <View style={styles.indicatorContainer}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                direction="vertical"
                stepCount={3}
                renderLabel={({ position, stepStatus, label, date }) => {
                  return (
                    <View style={styles.labelContainer}>
                      <Text style={styles.lblTxt}>
                        {setpData[position].label}
                      </Text>
                      <Text style={[styles.lblTxt, { fontWeight: "300" }]}>
                        {setpData[position].date}
                      </Text>
                    </View>
                  );
                }}
              />
            </View> */}
            <View style={styles.paytypeView}>
              <Text style={styles.payTxt}>PAYMENT METHOD</Text>
              <Text style={styles.payTxt2}>{orderDetail.payment_method}</Text>
            </View>
            <View style={styles.timeView}>
              <Text style={styles.txt1}>Delivery Time</Text>
              <Text style={styles.txt2}>{orderDetail.delivered_date}</Text>
              <Text style={styles.txt3}>(Approx)</Text>
            </View>
          </View>

          <View style={styles.addrsView}>
            <Text style={styles.addrsTxt1}>DELIVERY ADDRESS</Text>
            <Text style={styles.addrsTxt2}>
              {orderDetail.address}
              {orderDetail.country},{orderDetail.city},{orderDetail.state}-
              {orderDetail.postal_code}
            </Text>
          </View>
          <Divider style={{ borderWidth: 0.19, marginHorizontal: 10 }} />
          <View style={styles.secondView}>
            {/* <Text style={styles.timeTxt}>Arriving in 45 Min</Text> */}
            <Text style={styles.timeTxt}>Price</Text>

            <Text style={styles.priceTxt}>${orderItem.price}</Text>
          </View>
          <Divider
            style={{
              borderWidth: 0.19,
              marginBottom: 30,
              marginHorizontal: 10,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.background_color,
  },
  firstView: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    borderBottomColor: color.black,
    paddingVertical: SIZES.height / 60,
    paddingHorizontal: 10,
  },

  imgView: {
    // flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 15,
    height: SIZES.height / 11.3,
    width: SIZES.width / 5.5,
  },
  img: {
    // height: 71,
    // width: 80,
    height: SIZES.height / 6,
    width: SIZES.width / 4,
  },
  nameView: {
    flex: 0.9,
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "red",
    // paddingBottom: 20,
  },
  container: {
    // flex: 1,
    backgroundColor: color.white,
    borderRadius: 15,
    borderWidth: 0.5,
    borderBottomColor: color.black,
    padding: SIZES.base,
    marginTop: SIZES.height / 15,
    marginHorizontal: 15,
    marginVertical: 10,
    borderColor: color.light_grey,
  },
  nameTxt: {
    fontSize: SIZES.h3 + 1,
    fontFamily: "RubikSemiBold",
    color: color.primary_color2,
  },
  breedTxt: {
    fontSize: SIZES.h4,
    color: color.text_primary,
    fontFamily: "RubikMed",
  },
  addrsTxt: {
    fontSize: SIZES.h3,
    color: color.light_grey,
  },
  orderDateView: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  orderTxt: {
    fontFamily: "RubikMed",
    fontSize: SIZES.h4 + 4,
  },
  dateTxt: {
    fontFamily: "RubikLight",
    fontSize: SIZES.h4 + 2,
  },
  indicatorView: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  // indicatorContainer: {
  //   height: SIZES.height - 580,
  //   // padding: 30,
  //   // paddingBottom: 0,
  // },
  // labelContainer: {
  //   // marginTop: 25,
  //   paddingLeft: 5,
  //   // width: SIZES.width - 100,
  // },
  // lblTxt: {
  //   fontSize: SIZES.h4,
  //   color: color.black,
  //   fontWeight: "500",
  // },
  timeView: {
    alignItems: "flex-end",
    marginTop: 20,
    justifyContent: "flex-start",
  },
  txt1: {
    fontSize: SIZES.h3,
    fontFamily: "RubikMed",
    color: color.black,
    marginBottom: 5,
  },
  txt2: {
    fontSize: SIZES.h2 - 8,
    marginBottom: 5,
    fontFamily: "RubikLight",
  },
  txt3: {
    fontSize: SIZES.h3 - 3,
    fontFamily: "RubikLight",
  },
  paytypeView: {
    // marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  payTxt: {
    fontSize: SIZES.h3,
    fontFamily: "RubikSemiBold",
    color: color.black,
    marginBottom: 5,
  },
  payTxt2: {
    fontSize: SIZES.h3 + 1,
    fontFamily: "RubikLight",
  },
  addrsView: {
    marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  addrsTxt1: {
    fontSize: SIZES.h3,
    fontFamily: "RobotoSemi",
    marginBottom: 5,
  },
  addrsTxt2: {
    color: color.light_grey,
    fontFamily: "RubikLight",
  },
  secondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SIZES.height / 60,
    // borderBottomWidth: 0.3,
    // paddingBottom: 10,
    marginHorizontal: 20,
  },
  timeTxt: {
    fontSize: SIZES.h3 - 2,
    fontFamily: "RubikSemiBold",
    color: "green",
  },
  priceTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h3 + 2,
    color: color.light_grey,
  },
});
