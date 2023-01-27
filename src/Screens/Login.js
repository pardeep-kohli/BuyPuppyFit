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
import { Header } from "react-native-elements";
import axios from "axios";

import validation from "../constants/Validation";
import { storeUser } from "../store/user/Action";
import { connect } from "react-redux";
import { storeAsyncData } from "../utils";
import ASYNC_LOGIN_KEY from "../constants/Strings";
import { showMessage } from "react-native-flash-message";

const Login = ({ navigation, rdStoreUser }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [apiStatus, setApiStatus] = useState(false);

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

  var Login_header = new Headers();
  Login_header.append("accept", "application/json");
  Login_header.append("Content-Type", "application/x-www-form-urlencoded");
  Login_header.append("Cookie", "PHPSESSID=1ohrn47v9meifrdj11pnbl77tv");

  var data = new FormData();
  data.append("login", "1");
  data.append("email", email);
  data.append("password", password);

  const processLogin = () => {
    var valid = true;

    if (email.trim() == "") {
      valid = false;
      setEmailError("Please Enter Valid Email");
    } else if (!validation.VALID_EMAIL.test(email.trim(""))) {
      valid = false;
      setEmailError("Enter valid Email type");
    } else {
      setEmailError(false);
    }

    if (password.trim() == "") {
      valid = false;
      setPasswordError("Please enter your Password");
    } else {
      setPasswordError(false);
    }

    if (valid) {
      setApiStatus(!apiStatus);

      axios
        .post(
          "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
          data,
          { headers: Login_header }
        )
        .then(function (response) {
          console.log("LoginRes", response);
          if (response.data.message == "Login Successfully") {
            const user = {
              id: response.data.data.user_details.id,
              name: response.data.data.user_details.name,
              email: response.data.data.user_details.email,
              mobile: response.data.data.user_details.mobile,
            };

            storeAsyncData(ASYNC_LOGIN_KEY, user);

            rdStoreUser(user);
            showMessage({
              message: "Success",
              description: response.data.message,
              type: "default",
              backgroundColor: color.text_primary,
            });
          }
          setApiStatus(false);
        })
        .catch(function (error) {
          console.log("Error", error);
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

      <BackButton />
      <View>
        <Text style={styles.text}>Log in to your account</Text>
      </View>
      <Input
        iconName={"email"}
        placeholder={"Email"}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      {emailError && (
        <Text style={{ left: 30, color: color.red }}>{emailError}</Text>
      )}

      <Input
        iconName={"lock"}
        placeholder={"Password"}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      {passwordError && (
        <Text style={{ left: 30, color: color.red }}>{passwordError}</Text>
      )}
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View style={{}}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgetPassword")}
          style={{ paddingTop: 10, paddingBottom: 20 }}
        >
          <Text style={{ color: color.white, fontFamily: "RobotoRegular" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <VioletButton2
          buttonName="LOGIN"
          onPress={processLogin}
          // onPress={() => navigation.navigate("DrawerNavigator")}
        />
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
            Don't have an account?
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isKeyboardVisible == false && (
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
      )}
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
    paddingVertical: 20,
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
    rdStoreUser: (user) => dispatch(storeUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
