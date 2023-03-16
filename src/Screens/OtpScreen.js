import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import color from "../assets/theme/color";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Email from "../component/Email";
import { FontAwesome } from "@expo/vector-icons";
import VioletButton2 from "../component/VioletButton2";
import BackButton from "../component/Backbutton";
import Input from "../component/inputs/Input";
import { connect, useSelector } from "react-redux";
import {
  setForRecovery,
  storeNewUser,
  storeUser,
  verifyNewUser,
} from "../store/user/Action";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import * as qs from "qs";
import { storeAsyncData } from "../utils";
import {
  API_LINK,
  EMAIL_VERIFY_ENDPOINT,
  HEADER,
  ASYNC_LOGIN_KEY,
} from "../constants/Strings";

const OtpScreen = ({
  navigation,
  route,
  reduxUser,
  rdStoreUser,
  rdVerifyNewUser,
}) => {
  const { user_id, user_otp } = route.params;
  console.log("data", user_otp);

  // console.log("reduxuser", reduxUser);

  const [otp, setOtp] = useState("");

  const [apiStatus, setApiStatus] = useState(false);

  const [otpError, setOtpError] = useState(false);

  const processOtpVerify = () => {
    var valid = true;

    if (otp == "") {
      valid = false;
      setOtpError("Please enter a valid OTP");
    } else {
      setOtpError(false);
    }

    if (valid) {
      setApiStatus(!apiStatus);

      // var Otpdata = qs.stringify({
      //   verify_otp: "1",
      //   otp: user_otp,
      //   user_id: user_id,
      // });

      var Otpdata = new FormData();
      Otpdata.append("verify_otp", "1"),
        Otpdata.append("otp", 1234),
        Otpdata.append("user_id", user_id);

      var otpHeader = new Headers();
      otpHeader.append("accept", "application/json");
      otpHeader.append("Content-Type", "application/x-www-form-urlencoded");
      otpHeader.append(
        "access_token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImFjY2Vzc190b2tlbiI6IjEyMzQ1NiJ9.6QKlCUhW2RcT8lCTdOOi3SZ3ZOjF3yqohUv-4chmG1s"
      );

      otpHeader.append("Cookie", "PHPSESSID=nehnia6krhurg27720gse7s4pp");
      console.log("headerData", Otpdata);

      axios
        .post("https://codewraps.in/beypuppy/appdata/webservice.php", Otpdata, {
          headers: otpHeader,
        })
        .then(function (response) {
          console.log("Verifyotp", response);

          if (response.data.success == 1) {
            const user = {
              id: response.data.data.user_details.id,
              name: response.data.data.user_details.first_name,
              mobile: response.data.data.user_details.mobile,
              email: response.data.data.user_details.email,
              // lang_id: response.data.data.user_details.lang_id,
              // otp: otp,
            };

            console.log("user", user);
            // storeAsyncData(ASYNC_LOGIN_KEY, user);
            rdStoreUser(user);
            // rdVerifyNewUser();

            showMessage({
              message: "success",
              description: response.data.message,
              type: "default",
              backgroundColor: "green",
            });
            // navigation.navigate("Login");
          } else {
            showMessage({
              message: "Error",
              description: response.data.message,
              type: "default",
              backgroundColor: color.red,
            });
          }
          setApiStatus(false);
          console.log("API STATUS ====>", apiStatus);
        })
        .catch((error) => {
          console.log("err", error);
        });
    }
  };
  // console.log("reduxuser", reduxUser);
  return (
    <ScrollView
      style={{ paddingHorizontal: 15, backgroundColor: color.primary_color }}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <StatusBar backgroundColor={color.primary_color} />
      <View style={{ alignSelf: "center", paddingTop: 30 }}>
        <Image
          style={{ height: hp(40), width: hp(40) }}
          source={require("../images/forgetpassword.png")}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={styles.heading}>Please Enter your Otp.</Text>
      </View>
      {/* <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            marginBottom: 20,
            textAlign: "center",
            color: color.white,
            fontFamily: "RobotoRegular",
          }}
        >
          Enter the otp
        </Text>
      </View> */}
      <Input
        iconName={"lock"}
        placeholder={"OTP"}
        value={otp}
        onChangeText={(otp) => setOtp(otp)}
        password
      />
      {otpError && <Text style={{ left: 30 }}>{otpError}</Text>}
      <View style={{ paddingVertical: 40 }}>
        <VioletButton2
          buttonName="SEND"
          // onPress={() => navigation.navigate("ForgetPassword2")}
          onPress={processOtpVerify}
        />
        {/* {!apiStatus ? (
          <VioletButton2
            buttonName="SEND"
          
            onPress={processOtpVerify}
          />
        ) : (
          <ActivityIndicator />
        )} */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontFamily: "SegoeUIBold",
    fontSize: 20,
    color: color.text_primary,
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // rdVerifyNewUser: () => dispatch(verifyNewUser()),

    rdStoreUser: (user) => dispatch(storeUser(user)),
    // rdStoreRecovery: (info) => dispatch(setForRecovery(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
