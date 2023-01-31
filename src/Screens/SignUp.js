import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../assets/theme/color";

import { SIZES, FONTS } from "../assets/theme/theme";
import BackButton from "../component/Backbutton";
import Email from "../component/Email";
import VioletButton2 from "../component/VioletButton2";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import Input from "../component/inputs/Input";
import { storeNewUser } from "../store/user/Action";
import { connect } from "react-redux";
import validation from "../constants/Validation";
import { Header } from "react-native-elements";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";

const SignUp = ({ navigation, rdStoreUser }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("1234");

  const [apiStatus, setApiStatus] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobNumberError, setMobNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  // const goToOtp = () => {
  //   navigation.navigate("OtpScreen");
  // };

  const processSignup = () => {
    var valid = true;

    if (name.trim() == "") {
      valid = false;
      setNameError("Please enter Your full name");
    } else if (!validation.VALID_ALPHA.test(name.trim(""))) {
      valid = false;
      setNameError("Enter Only Alphabets");
    } else {
      setNameError(false);
    }

    if (email.trim() == "") {
      valid = false;
      setEmailError("Please Enter Your Email");
    } else if (!validation.VALID_EMAIL.test(email.trim(""))) {
      valid = false;
      setEmailError("Enter valid email type");
    } else {
      setEmailError(false);
    }

    if (mobileNo.trim() == "") {
      valid = false;
      setMobNumberError("Please Enter your Mobile Number");
    } else if (!validation.VALID_NUM.test(mobileNo.trim(""))) {
      valid = false;
      setMobNumberError("Enter only numbers");
    } else {
      setMobNumberError(false);
    }

    if (password.trim() == "") {
      valid = false;
      setPasswordError("Please enter your Password");
    } else {
      setPasswordError(false);
    }

    if (confirmPassword.trim() == "") {
      valid = false;
      setConfirmPasswordError("please re-enter Your Password");
    } else if (password != confirmPassword) {
      valid = false;
      setConfirmPasswordError("password is not match");
    } else {
      setConfirmPasswordError(false);
    }

    if (valid) {
      setApiStatus(!apiStatus);

      // var data = new FormData();

      // data.append("registration", "1");
      // data.append("lang_id", "1");
      // data.append("name", name);
      // data.append("mobile", mobileNo);
      // data.append("email", email);
      // data.append("password", password);
      // data.append("confirm_password", confirmPassword);

      var data = qs.stringify({
        registration: "1",
        lang_id: "1",
        name: name,
        mobile: mobileNo,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      });
      var SignUpHeader = new Headers();
      SignUpHeader.append("accept", "application/json");
      SignUpHeader.append("Content-Type", "application/x-www-form-urlencoded");
      SignUpHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

      console.log("Header&data", SignUpHeader, data);

      axios
        .post("https://codewraps.in/beypuppy/appdata/webservice.php", data, {
          headers: SignUpHeader,
        })
        .then(function (response) {
          console.log("Response", response);

          if (response.data.success == 1) {
            const user = {
              id: response.data.data.user_details.id,
              name: name,
              mobile: mobileNo,
              email: email,
              // lang_id: response.data.data.user_details.lang_id,
              // otp: otp,
            };
            console.log("UserData", user);
            // rdStoreUser(user);
            goToLogin();
            // goToOtp();
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

  return (
    // <ScrollView style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: color.primary_color,
      }}
    >
      <StatusBar backgroundColor={color.primary_color} />

      <BackButton onPress={() => navigation.goBack()} />
      <View>
        <Text style={styles.text}>Create An Account</Text>
      </View>
      <Input
        iconName={"account"}
        placeholder={"Full Name"}
        value={name}
        onChangeText={(name) => setName(name)}
      />

      {nameError && <Text style={{ left: 30, color: "red" }}>{nameError}</Text>}
      <Input
        iconName={"cellphone"}
        placeholder={"Mobile No"}
        value={mobileNo}
        onChangeText={(mobileNo) => setMobileNo(mobileNo)}
      />
      {mobNumberError && (
        <Text style={{ left: 30, color: "red" }}>{mobNumberError}</Text>
      )}

      <Input
        iconName={"email"}
        placeholder={"Email"}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      {emailError && (
        <Text style={{ left: 30, color: "red" }}>{emailError}</Text>
      )}

      <Input
        iconName={"lock"}
        placeholder={"Password"}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      {passwordError && (
        <Text style={{ left: 30, color: "red" }}>{passwordError}</Text>
      )}

      <Input
        iconName={"lock"}
        placeholder={"Confirm Password"}
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      {confirmPasswordError && (
        <Text style={{ left: 30, color: "red" }}>{confirmPasswordError}</Text>
      )}

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <VioletButton2 buttonName="SIGNUP" onPress={processSignup} />
      </View>
      <View style={styles.SignUpOption}>
        <View>
          <Text
            style={{
              color: color.white,
              fontSize: SIZES.h4,
              fontWeight: "400",
            }}
          >
            Already have an account?
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text2}> Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {isKeyboardVisible == false && (
        <View style={styles.ImageView}>
          <ImageBackground
            resizeMode="contain"
            style={{
              height: SIZES.height / 2.3,
              width: SIZES.width / 1.1,
              marginLeft: 30,
            }}
            source={require("../images/puppy3.png")}
          />
        </View>
      )} */}
    </View>
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "SegoeSemiBold",
    color: color.text_primary,
    marginVertical: 20,
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "grey",
    alignItems: "center",
  },
  TextBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 20,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 25,
  },
  Text: {
    paddingLeft: 10,
  },
  text2: {
    color: color.text_primary,
    fontWeight: "bold",
  },
  SignUpOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  ImageView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreUser: (user) => dispatch(storeNewUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
