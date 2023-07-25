import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import styles from "../../Screens/onboarding/styles";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
const Screen3 = ({ reduxLang }) => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, backgroundColor: color.primary_color }}>
      <View style={styles.parent}>
        {/* <View style={styles.RoundedCircle}>
          <Text style={{ fontSize: 20, color: color.white }}>3</Text>
        </View> */}
        <View>{/* <Text style={{ fontSize: 10 }}>Skip</Text> */}</View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../images/splashimg3.png")}
        />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.text}>{t("GOOD BLOODLINE PET’S")}</Text>
      </View>
      <View style={styles.desView}>
        <Text style={styles.DescriptionText}>
          {t(
            "A five generations listed in its bloodline. But a pup's bloodline will tell more than just parentage."
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

export default connect(mapStateToProps)(Screen3);
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
