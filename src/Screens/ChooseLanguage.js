import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
import color from "../assets/theme/color";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SIZES, FONTS } from "../assets/theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import VioletButton from "../component/VioletButton";
import VioletButton2 from "../component/VioletButton2";
const france = require("../images/france.png");
const uk = require("../images/uk.png");

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
    <>
      <StatusBar backgroundColor={color.primary_color} />
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
          <Text style={styles.headingTxt}>SELECT LANGUAGE</Text>
        </View>
        {/* <View style={styles.selectLangView}>
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
        </View> */}
        <View>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => changeLang("English")}
            style={[styles.lang_box,{backgroundColor:selLang==='English'?color.text_primary:color.white}]}
          >
            <Image source={uk} style={styles.flag_style} />
            <Text style={{ fontFamily: "Bold", fontSize: 15, flex: 1 }}>
              English
            </Text>
            <View
              style={[
                styles.check_circle,
                {
                  backgroundColor: color.primary_color,
                },
              ]}
            >
              {selLang === "English" && (
                <Entypo name="check" size={20} color={color.white} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.lang_box,{backgroundColor:selLang==='French'?color.text_primary:color.white}]}
            activeOpacity={0.4}
            onPress={() => changeLang("French")}
          >
            <Image source={france} style={styles.flag_style} />
            <Text style={{ fontFamily: "Bold", fontSize: 15, flex: 1 }}>
              Français
            </Text>
            <View
              style={[
                styles.check_circle,
                {
                  backgroundColor: color.primary_color,
                },
              ]}
            >
              {selLang === "French" && (
                <Entypo name="check" size={20} color={color.white} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btnView}>
          <VioletButton2
            buttonName={"PROCEED"}
            onPress={() => navigation.replace("OnboardingScreens")}
          />
        </View>
      </View>
    </>
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
    width: SIZES.width / 0.8,
  },
  headingView: {
    // alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    paddingVertical: 20,
  },
  headingTxt: {
    fontSize: SIZES.h2,
    fontFamily: "SegoeSemiBold",
    color: color.text_primary,
    marginTop: hp(2),
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
  },
  btnView: {
    marginTop: SIZES.height / 6,
    marginHorizontal: 20,
  },
  flag_style: {
    height: hp(4),
    width: hp(7),
    borderRadius: 5,
    marginRight: 20,
  },
  lang_box: {
    paddingVertical: 10,
    backgroundColor: color.text_primary,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal:20
  },
  check_circle: {
    borderWidth: 3,
    borderColor: color.primary_color,
    height: hp(3),
    width: hp(3),
    borderRadius: hp(3) / 2,
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
