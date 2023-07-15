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
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../assets/theme/color";

import * as qs from "qs";

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
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { storeCart } from "../store/cart/cartAction";

const Login = ({ navigation, rdStoreUser, rdStoreCart }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errors, setErrors] = React.useState({});

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
  Login_header.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

  // var data = new FormData();
  // data.append("login", "1");
  // data.append("email", email);
  // data.append("password", password);
  // data.append("lang_id", "1");

  var data = qs.stringify({
    login: "1",
    email: inputs.email,
    password: inputs.password,
    lang_id: "1",
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const getCartData = (userId) => {
    var CheckoutHeader = new Headers();
    CheckoutHeader.append("accept", "application/json");
    CheckoutHeader.append("Content-Type", "application/x-www-form-urlencoded");
    CheckoutHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var CheckoutData = qs.stringify({
      viewcart: "1",
      user_id: userId,
      lang_id: "1",
    });

    console.log("form", CheckoutData);

    // if (!isDataLoaded) {
    // console.log("is", isDataLoaded);

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        CheckoutData,
        { headers: CheckoutHeader }
      )
      .then(function (response) {
        console.log("cartresponse", response);
        if (response.data.success == 1) {
          var CartListData = response.data.data;
          var CartCount = CartListData.length;
          var CartSubTotal = response.data.subtotal;
          var CartDeliverChage = parseInt(response.data.delivery_charge);
          var CartGrandTotal = response.data.geranttotal;

          console.log("CartListData===>", CartListData);

          var CartId = [];
          var CartArray = [];

          for (var y = 0; y < CartCount; y++) {
            if (CartListData[y].product_id == null) {
              continue;
            }
            var temp = {
              id: CartListData[y].product_id,
              name: CartListData[y].product_name,
              slug: CartListData[y].product_slug,
              image: CartListData[y].product_image,
              price: CartListData[y].product_price,
            };
            CartArray.push(temp);

            CartId.push(CartListData[y].product_id);
          }

          var newCart = {
            cart: CartArray,
            cartCount: CartCount,
            cartId: CartId,
            subTotal: CartSubTotal,
            shipping: parseInt(CartDeliverChage),
            grandTotal: CartGrandTotal,
          };

          rdStoreCart(newCart);
          console.log("newCart", newCart);
        } else {
          // showMessage({
          //   message: "fail",
          //   description: response.data.message,
          //   type: "default",
          //   backgroundColor: "red",
          // });
        }
      })
      .catch(function (error) {
        console.log("Error", error);
      });
    // }
  };

  const processLogin = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!inputs.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please enter your password", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;
    }

    // if (email.trim() == "") {
    //   valid = false;
    //   setEmailError("Please Enter Valid Email");
    // } else if (!validation.VALID_EMAIL.test(email.trim(""))) {
    //   valid = false;
    //   setEmailError("Enter valid Email type");
    // } else {
    //   setEmailError(false);
    // }

    // if (password.trim() == "") {
    //   valid = false;
    //   setPasswordError("Please enter your Password");
    // } else {
    //   setPasswordError(false);
    // }

    if (valid) {
      setApiStatus(!apiStatus);
      setLoading(true);

      axios
        .post("https://codewraps.in/beypuppy/appdata/webservice.php", data, {
          headers: Login_header,
        })
        .then(function (response) {
          console.log("LoginRes", response);
          if (response.data.success == 1) {
            setLoading(false);
            const user = {
              id: response.data.data.user_details.id,
              name: response.data.data.user_details.name,
              email: response.data.data.user_details.email,
              mobile: response.data.data.user_details.mobile,
              country_code: response.data.data.user_details.country_code,
              image: response.data.data.user_details.country_image,
            };

            storeAsyncData(ASYNC_LOGIN_KEY, response.data.data.user_details);
            getCartData(response.data.data.user_details.id);
            rdStoreUser(user);
            showMessage({
              message: "Success",
              description: response.data.message,
              type: "default",
              backgroundColor: color.green,
            });
          } else {
            setLoading(false);
            showMessage({
              message: "Not Valid",
              description: response.data.message,
              type: "default",
              backgroundColor: color.red,
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
    // <View
    //   style={{
    //     flex: 1,
    //     paddingHorizontal: 20,
    //     backgroundColor: color.primary_color,
    //   }}
    // >
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: color.primary_color,
        }}
      >
        <ScrollView bounces={false}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: color.primary_color }}
            behavior={"position"}
          >
            <StatusBar backgroundColor={color.primary_color} />

            <BackButton onPress={() => navigation.goBack()} />
            <View>
              <Text style={styles.text}>Log in to your account</Text>
            </View>
            <Input
              iconName={"email"}
              placeholder={"Email"}
              value={inputs.email}
              // onChangeText={(email) => setEmail(email)}
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              error={errors.email}
              keyboardType={"email-address"}
            />
            {/* {emailError && (
        <Text style={{ left: 0, color: color.red, bottom: 10 }}>
          {emailError}
        </Text>
      )} */}

            <Input
              iconName={"lock"}
              placeholder={"Password"}
              value={inputs.password}
              // onChangeText={(password) => setPassword(password)}
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              error={errors.password}
              password
            />
            {/* {passwordError && (
          <Text style={{ left: 0, color: color.red, bottom: 10 }}>
            {passwordError}
          </Text>
        )} */}
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
                style={{ paddingTop: 10, paddingBottom: 20 }}
              >
                <Text style={{ color: color.white, fontFamily: "RobotoBold" }}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <VioletButton2
                buttonName="LOGIN"
                onPress={processLogin}
                // onPress={() => navigation.navigate("DrawerNavigator")}
                loading={loading}
              />
            </View>
            <View style={styles.SignUpOption}>
              <View>
                <Text
                  style={{
                    color: color.white,
                    fontSize: SIZES.h4,
                    fontFamily: "RobotoBold",
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
            {/* {isKeyboardVisible == false && (
          <View style={styles.ImageView}>
            <ImageBackground
              // resizeMode="contain"
              style={{
                height: SIZES.height / 2.3,
                width: SIZES.width / 1.1,
                position: "relative",
                bottom: 0,
              }}
              source={require("../images/puppy3.png")}
            />
          </View>
        )} */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    fontFamily: "RobotoBold",
  },
  SignUpOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  ImageView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
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
    rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
