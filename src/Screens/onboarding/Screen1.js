import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
import { connect } from "react-redux";
import { getAsyncData } from "../../utils";
import { ASYNC_LOGIN_KEY } from "../../constants/Strings";
import * as qs from "qs";
import axios from "axios";
import { storeUser } from "../../store/user/Action";

const Screen1 = ({ reduxUser, rdStoreUser, navigation }) => {
  // const [infoLoaded, setInfoLoaded] = useState(false);
  // const [init, setInit] = useState("Loading");

  // if (reduxUser.redirectToLogin) {
  //   navigation.navigate("Login");
  // }

  // useEffect(() => {
  //   if (!infoLoaded) {
  //     getAsyncData(ASYNC_LOGIN_KEY).then((asUser) => {
  //       console.log("AS", asUser);
  //       //console.log('AS',JSON.parse(asUser));

  //       if (asUser != null) {
  //         setInit("Found");
  //         var temp = JSON.parse(asUser);
  //         if (temp.hasOwnProperty("email") && temp.email != "") {
  //           rdStoreUser(temp);
  //         }
  //       } else {
  //         setInit("Not Found");
  //       }
  //     });
  //     setInfoLoaded(true);
  //   }
  // }, [infoLoaded]);

  return (
    <View style={{ flex: 1, backgroundColor: color.primary_color }}>
      <View style={styles.parent}>
        <View style={styles.RoundedCircle}>
          <Text style={{ fontSize: 20, color: color.white }}>1</Text>
        </View>
        <View>{/* <Text style={{ fontSize: 20 }}>Skip</Text> */}</View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../images/splashimg1.png")}
        />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.text}>FIND IDEAL PET</Text>
      </View>
      <View style={styles.desView}>
        <Text style={styles.DescriptionText}>
          Browse pets and see their profiles to know them better. Get a perfect
          pet for your companion.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  RoundedCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    borderColor: color.white,
    justifyContent: "center",
  },
  image: {
    height: SIZES.height / 1.9,
    width: SIZES.width / 1.03,
  },
  headingView: {
    marginTop: SIZES.height / 16,
    paddingHorizontal: SIZES.width / 16,
  },
  text: {
    color: color.text_primary,
    fontSize: 20,
    fontFamily: "SegoeSemiBold",
  },
  desView: {
    marginTop: SIZES.height / 36,
    paddingHorizontal: SIZES.width / 16,
  },
  DescriptionText: {
    fontSize: 19,
    fontFamily: "RobotoRegular",
    textAlign: "justify",
    color: color.white,
  },
});

// const mapStateToProps = (state) => {
//   return {
//     reduxUser: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     rdStoreUser: (user) => dispatch(dispatch(storeUser(user))),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Screen1);
export default Screen1;
