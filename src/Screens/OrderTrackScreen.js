import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategorryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import StepIndicator from "react-native-step-indicator";
import { Divider } from "react-native-paper";

const labels = ["Cart", "Delivery Address", "Order Summary"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 15,
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

export default function OrderTrackScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const setpData = [
    {
      label: "Ordered",
      date: "Thu, 15 Dec ‘2022",
    },
    {
      label: "On the way",
      date: "Thu, 15 Dec ‘2022",
    },
    {
      label: "Delivered",
      date: "Arriving in 45 min",
    },
  ];

  return (
    <View style={styles.page}>
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />

      <CategorryHeading2 CategoryName={"VIEW DETAILS"} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.firstView}>
            <View style={styles.imgView}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require("../images/puppy.png")}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.nameTxt}>Order Id</Text>
              <Text style={styles.addrsTxt}>Date of order</Text>
            </View>
          </View>
          <View style={styles.indicatorView}>
            <View style={styles.indicatorContainer}>
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
            </View>
            <View style={styles.timeView}>
              <Text style={styles.txt1}>Delivery Time</Text>
              <Text style={styles.txt2}>9:30PM</Text>
              <Text style={styles.txt3}>(Approx)</Text>
            </View>
          </View>
          <View style={styles.paytypeView}>
            <Text style={styles.payTxt}>PAYMENT METHOD</Text>
            <Text style={styles.payTxt2}>Paytm UPI</Text>
          </View>
          <View style={styles.addrsView}>
            <Text style={styles.addrsTxt1}>DELIVERY ADDRESS</Text>
            <Text style={styles.addrsTxt2}>
              J326 Dakshinpuri new delhi 110062 j Block dakshinpuri ambedkar
              nagar sec 5...
            </Text>
          </View>
          <Divider style={{ borderWidth: 0.19 }} />
          <View style={styles.secondView}>
            <Text style={styles.timeTxt}>Arriving in 45 Min</Text>
            <Text style={styles.priceTxt}>$549.99</Text>
          </View>
          <Divider style={{ borderWidth: 0.19, marginBottom: 30 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.white,
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
    flex: 0.3,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  img: {
    height: SIZES.height / 18,
    width: SIZES.width / 5,
  },
  nameView: {
    flex: 0.8,
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "red",
    // paddingBottom: 20,
  },
  container: {
    // flex: 1,
    backgroundColor: color.white,
    borderRadius: 5,
    borderWidth: 0.5,
    borderBottomColor: color.black,
    padding: SIZES.base,
    marginTop: SIZES.height / 40,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  nameTxt: {
    fontSize: SIZES.h3 + 1,
    fontWeight: "bold",
  },
  addrsTxt: {
    fontSize: SIZES.h3,
    color: color.light_grey,
  },
  indicatorView: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  indicatorContainer: {
    height: SIZES.height - 580,
    // padding: 30,
    // paddingBottom: 0,
  },
  labelContainer: {
    // marginTop: 25,
    paddingLeft: 5,
    // width: SIZES.width - 100,
  },
  lblTxt: {
    fontSize: SIZES.h4,
    color: color.black,
    fontWeight: "500",
  },
  timeView: {
    alignItems: "flex-end",
    marginTop: 20,
    justifyContent: "flex-start",
  },
  txt1: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: color.black,
    marginBottom: 5,
  },
  txt2: {
    fontSize: SIZES.h2 - 4,
    marginBottom: 5,
  },
  txt3: {
    fontSize: SIZES.h3 - 3,
  },
  paytypeView: {
    marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  payTxt: {
    fontSize: SIZES.h3 + 2,
    fontWeight: "bold",
    color: color.black,
    marginBottom: 5,
  },
  payTxt2: {
    fontSize: SIZES.h3 + 1,
  },
  addrsView: {
    marginHorizontal: 10,
    marginTop: SIZES.height / 40,
    marginBottom: SIZES.height / 30,
  },
  addrsTxt1: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    marginBottom: 5,
  },
  addrsTxt2: {
    color: color.light_grey,
  },
  secondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SIZES.height / 60,
    // borderBottomWidth: 0.3,
    // paddingBottom: 10,
    marginHorizontal: 10,
  },
  timeTxt: {
    fontSize: SIZES.h3 - 2,
    fontWeight: "bold",
    color: "green",
  },
  priceTxt: {
    fontWeight: "bold",
    fontSize: SIZES.h3 + 2,
    color: color.light_grey,
  },
});
