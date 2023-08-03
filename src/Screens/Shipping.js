import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import * as qs from "qs";
import axios from "axios";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
import { connect, useSelector } from "react-redux";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { storeCart } from "../store/cart/cartAction";
import { showMessage } from "react-native-flash-message";
import RenderHTML from "react-native-render-html";

const Shipping = ({ navigation, rdStoreCart }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [shippingContent, setShippingContent] = useState([]);
  const [pageTitle, setPageTitle] = useState("");

  const isFocused = useIsFocused();

  const reduxUser = useSelector((state) => state.user);
  const lang_id = localStorage.getItem("lang_id");

  useEffect(() => {
    var shippingHeader = new Headers();
    shippingHeader.append("accept", "application/json");
    shippingHeader.append("Content-Type", "application/x-www-form-urlencoded");
    shippingHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var shippingData = qs.stringify({
      get_content: "1",
      page_name: "Shipping",
      lang_id: lang_id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        shippingData,
        {
          headers: shippingHeader,
        }
      )
      .then(function (response) {
        console.log("re===", response);
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setShippingContent(response.data.data.content);

          setPageTitle(response.data.data.title);
        }
      });
  }, []);
  const source = {
    html: `<div style="color:white">
    ${shippingContent}
    </div>`,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <StatusBar backgroundColor={color.primary_color} />
        <Header
          navigation={navigation}
          cart={() =>
            reduxUser.customer.id == ""
              ? showMessage({
                  message: "Please Login",
                  description: "Please login before check you cart",
                  type: "default",
                  backgroundColor: color.red,
                })
              : navigation.navigate("CheckoutStack")
          }
        />
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{pageTitle}</Text>
        </View>
        {/* <CategoryHeading2 CategoryName="ABOUT US" /> */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.parent}>
            <View style={styles.descriptionView}>
              <RenderHTML
                source={source}
                contentWidth={Dimensions.get("window").width}
              />
              {/* <Text style={styles.text}>{shippingContent.content}</Text> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  descriptionView: {
    paddingTop: 20,
    minHeight: hp(40),
  },
  parent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: color.primary_color,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  descriptiontext2: {
    paddingTop: 20,
  },
  text: {
    fontFamily: "RubikLight",
    textAlign: "justify",
    color: color.white,
    fontSize: SIZES.h4 + 2,
  },
  heading: {
    color: color.text_primary,
    fontFamily: "RubikBold",
    fontSize: 20,
  },
  headingView: {
    paddingTop: 10,
  },
  headerView: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
});
const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(Shipping);
// export default Shipping;
