import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import color from "../assets/theme/color";
import { SIZES, FONTS } from "../assets/theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import VioletButton from "../component/VioletButton";
import VioletButton2 from "../component/VioletButton2";

import { storeUser } from "../store/user/Action";
import { getAsyncData } from "../utils";
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { connect } from "react-redux";

const ChooseLanguage = ({ navigation, reduxUser, rdStoreUser }) => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [init, setInit] = useState("Loading");
  const [selLang, setSelLang] = useState("English");

  const changeLang = (lang) => {
    setSelLang(lang);
  };

  if (reduxUser.redirectToLogin) {
    navigation.navigate("Login");
  }

  useEffect(() => {
    if (!infoLoaded) {
      getAsyncData(ASYNC_LOGIN_KEY).then((asUser) => {
        console.log("AS", asUser);
        //console.log('AS',JSON.parse(asUser));

        if (asUser != null) {
          setInit("Found");
          var temp = JSON.parse(asUser);
          if (temp.hasOwnProperty("email") && temp.email != "") {
            rdStoreUser(temp);
          }
        } else {
          setInit("Not Found");
        }
      });
      setInfoLoaded(true);
    }
  }, [infoLoaded]);

  return (
    <View style={styles.page}>
      <View style={styles.chooseLangMainView}>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require("../images/splashimg1.png")}
          />
        </View>
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>CHOOSE LANGUAGE</Text>
      </View>
      <View style={styles.selectLangView}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => changeLang("English")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: SIZES.height / 8,
            width: SIZES.width / 3,
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor:
              selLang == "English" ? color.text_primary : color.white,
          }}
        >
          <View
            style={{
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Text style={styles.langTxt}>English</Text>
          </View>
          {selLang == "English" && (
            <View style={styles.checkbox}>
              <MaterialCommunityIcons
                name="check-circle"
                color={color.primary_color}
                size={20}
              />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => changeLang("French")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: SIZES.height / 8,
            width: SIZES.width / 3,
            justifyContent: "center",
            borderRadius: 10,
            backgroundColor:
              selLang == "French" ? color.text_primary : color.white,
          }}
        >
          <View
            style={{
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Text style={styles.langTxt}>Français</Text>
          </View>
          {selLang == "French" && (
            <View style={styles.checkbox}>
              <MaterialCommunityIcons
                name="check-circle"
                color={color.primary_color}
                size={20}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <VioletButton2
          buttonName={"PROCEED"}
          onPress={() => navigation.navigate("OnboardingScreens")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: color.primary_color,
  },
  chooseLangMainView: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: SIZES.height / 2,
    width: SIZES.width / 1.2,
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingTxt: {
    fontSize: SIZES.h2,
    fontFamily: "SegoeSemiBold",
    color: color.text_primary,
  },
  selectLangView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: SIZES.height / 20,
  },

  langTxt: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
  },
  checkbox: {
    left: 40,
    // flex: 0.5,
    // alignSelf: "flex-end",
  },
  btnView: {
    marginTop: SIZES.height / 6,
    marginHorizontal: SIZES.width / 10,
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreUser: (user) => dispatch(dispatch(storeUser(user))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);
