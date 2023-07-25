import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import color from "../../assets/theme/color";
import styles from "../../Screens/onboarding/styles";
import { SIZES } from "../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
const Screen2 = ({ reduxLang }) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={{ flex: 1, backgroundColor: color.primary_color }}>
      <View style={styles.parent}>
        {/* <View style={styles.RoundedCircle}>
          <Text style={{ fontSize: 20, color: color.white }}>2</Text>
        </View> */}
        <View>{/* <Text style={{ fontSize: 20 }}>Skip</Text> */}</View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../images/splashimg2.png")}
        />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.text}>{t("NEW FAMILY MEMBER WAITING!")}</Text>
      </View>
      <View style={styles.desView}>
        <Text style={styles.DescriptionText}>
          {t(
            "All processes are done within the app. It’s super fast and you can request for buying from anywhere."
          )}
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(Screen2);
// const styles = StyleSheet.create({
//   parent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 10,
//     marginTop: 20,
//   },
//   RoundedCircle: {
//     height: 30,
//     width: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     alignItems: "center",
//     borderColor: color.white,
//     justifyContent: "center",
//   },
//   image: {
//     height: SIZES.height / 1.9,
//     width: SIZES.width / 1.15,
//     borderWidth:5,
//     borderColor:color.white,
//     borderRadius:20
//   },
//   headingView: {
//     marginTop: SIZES.height / 16,
//     paddingHorizontal: SIZES.width / 16,
//   },
//   text: {
//     color: color.text_primary,
//     fontFamily: "SegoeSemiBold",
//     fontSize: 20,
//   },
//   desView: {
//     marginTop: SIZES.height / 36,
//     paddingHorizontal: SIZES.width / 16,
//   },
//   DescriptionText: {
//     fontSize: 19,
//     fontFamily: "RobotoRegular",
//     textAlign: "justify",
//     color: color.white,
//   },
// });
