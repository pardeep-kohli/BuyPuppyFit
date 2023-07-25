import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
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
import { connect } from "react-redux";
import { setForRecovery, storeUser } from "../store/user/Action";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import * as qs from "qs";
import { SafeAreaView } from "react-native-safe-area-context";

import validation from "../constants/Validation";
import { useTranslation } from "react-i18next";

const ForgetPassword = ({ navigation, rdStoreRecovery, reduxUser }) => {
  const [inputs, setInputs] = useState({
    email: "",
  });

  const [errors, setErrors] = React.useState({});
  const [apiStatus, setApiStatus] = useState(false);

  const { t } = useTranslation();
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const processForgetPassword = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!inputs.email) {
      handleError(`${t("Please enter your email")}`, "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError(`${t("Please input a valid email")}`, "email");
      valid = false;
    }

    Promise.resolve()
      .then(() => {
        setApiStatus(!apiStatus);
      })
      .then(() => {
        // var data = new FormData();
        // data.append("forgotpassword", "1"), data.append("email", email);

        var data = qs.stringify({
          forgotpassword: "1",
          email: inputs.email,
        });

        console.log("for ====>", data);

        var forgetHeader = new Headers();
        forgetHeader.append("accept", "application/json");
        forgetHeader.append(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        forgetHeader.append("Cookie", "PHPSESSID=qcr7r8hiv53bldi9ra5ja5bb46");

        console.log("apistatus", apiStatus);
        if (valid) {
          axios
            .post(
              "https://codewraps.in/beypuppy/appdata/webservice.php",
              data,
              {
                headers: forgetHeader,
              }
            )
            .then(function (response) {
              console.log("forgetRes", response);

              if (response.data.success == 1) {
                const info = {
                  password: response.data.data.password,
                };
                rdStoreRecovery(info);
                console.log("info", info);
                navigation.navigate("ForgetPassword2");
                showMessage({
                  message: "Success",
                  description: `${t("Password sent on your email")}`,
                  type: "default",
                  backgroundColor: color.green,
                });
              } else {
                showMessage({
                  message: "Error",
                  description: response.data.message,
                  type: "default",
                  backgroundColor: "red",
                });
                setApiStatus(false);
              }
            });
        }
      });
  };
  console.log("reduxuser", reduxUser);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 15, backgroundColor: color.primary_color }}
        bounces={false}
      >
        <KeyboardAvoidingView
          style={styles.addQuestionBar}
          behavior={"position"}
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
            <Text style={styles.heading}>{t("Forget Password?")}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: hp(1.6),
                marginBottom: 20,
                textAlign: "center",
                color: color.white,
                fontFamily: "RobotoRegular",
              }}
            >
              {t("Enter the email address associated with your account")}
            </Text>
          </View>
          <Input
            iconName={"email"}
            placeholder={`${t("Email")}`}
            value={inputs.email}
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />
          {/* {emailError && (
        <Text style={{ left: 0, color: color.red, bottom: 10 }}>
          {emailError}
        </Text>
      )} */}

          <View style={{ paddingVertical: 40 }}>
            <VioletButton2
              buttonName={t("SEND")}
              // onPress={() => navigation.navigate("ForgetPassword2")}
              onPress={processForgetPassword}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
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
    reduxLang: state.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreUser: (user) => dispatch(storeUser(user)),
    rdStoreRecovery: (info) => dispatch(setForRecovery(info)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
