import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { SIZES } from "../../assets/theme/theme";
import color from "../../assets/theme/color";
import VioletButton from "../../component/VioletButton";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const OrderSuccess = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color.background_color,
        }}
      >
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require("../../images/logo3.png")}
          />
        </View>
        <View style={styles.view2}>
          <Text style={styles.thankTxt}>{t("Thank you for your order!")}</Text>
          <Text style={styles.dtlTxt}>
            {t(
              "We’ve received your order and it will be dispatched during your delivery window. You can access your order details at any time on your orders page."
            )}
          </Text>
        </View>
        <View style={styles.btnView}>
          <VioletButton
            buttonName={`${t("CONTINUE SHOPPING")}`}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
//   };
// };

export default connect(mapStateToProps)(OrderSuccess);

const styles = StyleSheet.create({
  imgView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  img: {
    height: SIZES.height / 8,
    width: SIZES.width / 2,
  },
  view2: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.width / 15,
  },
  thankTxt: {
    fontSize: SIZES.h2,
    fontFamily: "RubikBold",
    color: color.primary_color,
    marginBottom: SIZES.height / 50,
  },
  dtlTxt: {
    textAlign: "center",
    fontSize: SIZES.h4 - 2,
    color: color.primary_color,
    fontFamily: "RubikRegular",
  },
  btnView: {
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 40,
    position: "absolute",
    width: SIZES.width / 1.1,
  },
});
