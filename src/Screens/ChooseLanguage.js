import React, { useState, useEffect, useCallback } from "react";
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
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { updateLanguage } from "../store/lang/actions";

const spanish = require("../images/spain-flag.png");
const uk = require("../images/uk.png");

// SplashScreen.preventAutoHideAsync();
import { storeUser } from "../store/user/Action";
import { getAsyncData } from "../utils";
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import "localstorage-polyfill";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
const ChooseLanguage = ({
  navigation,
  reduxUser,
  rdStoreUser,
  reduxChangeLang,
  reduxLang,
}) => {
  console.log("reduxLang", reduxLang);

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [init, setInit] = useState("Loading");
  const [selLangId, setSelLangId] = useState("1");
  const [currentLanguage, setLanguage] = useState(false);
  const [activeLang, setactiveLang] = useState(reduxLang.activeLang);

  const selectEnglish = () => {
    reduxChangeLang("en");
    changeLanguage("en");
    changeLangId("1");
    console.log("Change ", reduxLang);
    setactiveLang("en");
  };

  const selectFrench = () => {
    reduxChangeLang("sp");
    changeLanguage("sp");
    changeLangId("2");
    console.log("Change ", reduxLang);
    setactiveLang("sp");
  };

  // const handlefunction = (id, language) => {
  //   changeLangId(id);

  //   selectFrench(language);
  //   selectEnglish(language);
  // };

  const changeLangId = (lang) => {
    setSelLangId(lang);
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };
  console.log("langua", currentLanguage);

  const handleButton = () => {
    localStorage.setItem("lang_id", selLangId);
    if (selLangId == "1") {
      navigation.replace("OnboardingScreens");
    } else if (selLangId == "2") {
      navigation.replace("OnboardingScreens");
    }
  };
  console.log("id", selLangId);

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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={color.primary_color} translucent />
      {init != "Not Found" ? (
        <View
          style={{
            flex: 1,
            backgroundColor: color.primary_color,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: SIZES.width - wp(20.3),
              width: SIZES.width - wp(20.3),
            }}
            source={require("../images/logo5.png")}
          />
          <ActivityIndicator color={color.white} size={40} />
        </View>
      ) : (
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

          <>
            <View style={styles.headingView}>
              <Text style={styles.headingTxt}>{t("SELECT LANGUAGE")}</Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={selectEnglish}
                style={[
                  styles.lang_box,
                  {
                    backgroundColor:
                      activeLang === "en" ? color.text_primary : color.white,
                  },
                ]}
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
                  {activeLang === "en" && (
                    <Entypo name="check" size={hp(2)} color={color.white} />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.lang_box,
                  {
                    backgroundColor:
                      activeLang === "sp" ? color.text_primary : color.white,
                  },
                ]}
                activeOpacity={0.4}
                onPress={selectFrench}
              >
                <Image source={spanish} style={styles.flag_style} />
                <Text style={{ fontFamily: "Bold", fontSize: 15, flex: 1 }}>
                  Española
                </Text>
                <View
                  style={[
                    styles.check_circle,
                    {
                      backgroundColor: color.primary_color,
                    },
                  ]}
                >
                  {activeLang === "sp" && (
                    <Entypo name="check" size={hp(2)} color={color.white} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <VioletButton2
                buttonName={t("PROCEED")}
                onPress={() => handleButton()}
              />
            </View>
          </>
        </View>
      )}
    </SafeAreaView>
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
    fontSize: hp(2.5),
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
    marginTop: SIZES.height / 7,
    marginHorizontal: 20,
  },
  flag_style: {
    height: hp(4),
    width: hp(7),
    borderRadius: 5,
    marginRight: 20,
  },
  lang_box: {
    paddingVertical: hp(1),
    backgroundColor: color.text_primary,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  check_circle: {
    borderWidth: 3,
    borderColor: color.primary_color,
    height: hp(3),
    width: hp(3),
    borderRadius: hp(3) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
    reduxLang: state.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreUser: (user) => dispatch(dispatch(storeUser(user))),
    reduxChangeLang: (lang) => dispatch(updateLanguage(lang)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLanguage);
