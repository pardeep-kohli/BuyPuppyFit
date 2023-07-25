import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import Swiper from "react-native-swiper";
import Next_Button from "../../component/buttons/Next_Button";

import { Screen1, Screen2, Screen3 } from "./";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../../assets/theme/color";
import { FONTS } from "../../assets/theme/theme";
import Previous_Button from "../../component/buttons/Previous_button";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const renderPagination = (index, total, context) => {
  const lang_id = localStorage.getItem("lang_id");
  console.log("langid====", lang_id);
  return (
    <>
      <View style={styles.paginationStyle}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MotiView
            animate={{
              backgroundColor: index === 0 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
          <MotiView
            animate={{
              backgroundColor: index === 1 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
          <MotiView
            animate={{
              backgroundColor: index === 2 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
        </View>
      </View>
    </>
  );
};

const OnboardingScreens = ({ navigation, reduxLang }) => {
  const [idxActive, setIdxActive] = useState(0);
  const swiperRef = useRef(null); // Create a ref using useRef hook
  const { t, i18n } = useTranslation();

  const onPressPrev = () => {
    if (idxActive > 0) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const onPressNext = () => {
    if (idxActive === 2) {
      navigation.replace("DrawerNavigator");
    }
    if (idxActive < 2) {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: hp(2),
          backgroundColor: color.primary_color,
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: color.white,
            height: hp(3.5),
            width: hp(3.5),
            justifyContent: "center",
            borderRadius: hp(3) / 2,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(1.8),
              alignSelf: "center",
              color: color.white,
              justifyContent: "center",
              fontFamily: "Bold",
            }}
          >
            {idxActive + 1}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.skip_button}
          onPress={() => navigation.replace("DrawerNavigator")}
        >
          <View>
            {idxActive < 1 && (
              <Text style={styles.skip_text}>{t("Skip")} </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Swiper
        style={styles.wrapper}
        renderPagination={renderPagination}
        onIndexChanged={(index) => setIdxActive(index)}
        showsButtons={false}
        loop={false}
        ref={swiperRef} // Attach the ref to the Swiper component
      >
        <Screen1 />
        <Screen2 />
        <Screen3 />
      </Swiper>
      <View style={[styles.buttoncontainer2]}>
        <Previous_Button onPress={onPressPrev} title={"previous"} />
      </View>
      <View style={styles.buttoncontainer}>
        <Next_Button
          onPress={onPressNext}
          title={idxActive < 2 ? `${t("Next")}` : `${t("Done")}`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttoncontainer: {
    position: "absolute",
    bottom: hp(5),
    right: 20,
    backgroundColor: "transparent",
  },
  buttoncontainer2: {
    position: "absolute",
    bottom: hp(5),
    left: 20,
    backgroundColor: "transparent",
  },
  dots: {
    width: hp(2),
    height: hp(2),
    borderRadius: hp(2.5) / 2.0,
    marginRight: 5,
    borderWidth: 1,
    borderColor: color.primary_color,
    left: 10,
    top: 5,
  },
  skip_button: {
    zIndex: 1,
    justifyContent: "center",
  },
  skip_text: {
    fontSize: hp(1.8),
    color: color.white,
    fontFamily: "Bold",
  },
  paginationStyle: {
    position: "absolute",
    bottom: hp(7),
    left: "40%",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(OnboardingScreens);
