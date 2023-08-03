import { View, Text, StatusBar, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading2 from "../component/CategorryHeading2";
import { SIZES } from "../assets/theme/theme";
import axios from "axios";
import * as qs from "qs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native";
import { connect, useSelector } from "react-redux";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { storeCart } from "../store/cart/cartAction";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native";
import RenderHTML from "react-native-render-html";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = ({ navigation, rdStoreCart }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [policyContent, setPolicyContent] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const reduxUser = useSelector((state) => state.user);
  const lang_id = localStorage.getItem("lang_id");

  useEffect(() => {
    var policyHeader = new Headers();
    policyHeader.append("accept", "application/json");
    policyHeader.append("Content-Type", "application/x-www-form-urlencoded");
    policyHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var policyData = qs.stringify({
      get_content: "1",
      page_name: "Privacy Policy",
      lang_id: lang_id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        policyData,
        {
          headers: policyHeader,
        }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setPolicyContent(response.data.data.content);
          setPageTitle(response.data.data.title);
        }
      });
  }, []);
  const source = {
    html: `<div style="color:white">
    ${policyContent}
    </div>`,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <StatusBar backgroundColor={color.primary_color} />
        <Header
          navigation={navigation}
          cart={() =>
            reduxUser.customer.id == ""
              ? showMessage({
                  message: `${t("Please Login")}`,
                  description: `${t("Please login before check you cart")}`,
                  type: "default",
                  backgroundColor: color.red,
                })
              : navigation.navigate("CheckoutStack")
          }
        />
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{pageTitle}</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.parent}>
            <View style={styles.descriptionView}>
              <RenderHTML
                source={source}
                contentWidth={Dimensions.get("window").width}
              />
              {/* <Text style={styles.text}>{policyContent.content}</Text> */}
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

export default connect(mapStateToProps)(PrivacyPolicy);
// export default PrivacyPolicy;
