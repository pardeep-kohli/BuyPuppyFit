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
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
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
import SelectDropdown from "react-native-select-dropdown";
import { height } from "react-native-bottom-tab/src/AnimatedTabBar/utils";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectCountry } from "react-native-element-dropdown";

const SignUp = ({ navigation, rdStoreUser }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [CountryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [countryCode, setCountryCode] = useState([]);
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    name: "",
    mobileNo: "",
    confirmPassword: "",
  });
  const [apiStatus, setApiStatus] = useState(false);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [selectedCountry, setSelectedCountry] = React.useState(null);

  const countries = [
    {
      label: "United States",
      value: "US",
      icon: () => <Icon name="us" size={18} color="#900" />,
    },
    {
      label: "United Kingdom",
      value: "GB",
      icon: () => <Icon name="gb" size={18} color="#900" />,
    },
    // Add more countries with their respective flags
  ];

  console.log("code=====>>>>", countryCode);

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

  const goToLogin = () => {
    navigation.navigate("Login");
  };
  // const goToOtp = () => {
  //   navigation.navigate("OtpScreen", {
  //     user_id: response.data.data.user_details.id,
  //     otp: response.data.data.user_details.otp,
  //   });
  // };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const processSignup = () => {
    Keyboard.dismiss();
    var valid = true;

    if (!inputs.name) {
      valid = false;
      handleError("Please enter Your full name", "name");
    } else if (!inputs.name.match(/^[A-Z a-z]+$/i)) {
      handleError("Enter Only Alphabets", "name");
      valid = false;
    } else {
      handleError(false);
    }

    // var emailValid = false;
    if (!inputs.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    if (!inputs.mobileNo) {
      valid = false;
      handleError("Please enter mobile number", "mobileNo");
    } else if (!validation.VALID_NUM.test(inputs.mobileNo.trim())) {
      handleError("Please enter numbers only", "mobileNo");
      valid = false;
    }
    // else if (
    //   parseInt(inputs.mobileNo.trim().length) !=
    //   parseInt(validation.VALID_PHONE_LENGTH)
    // ) {
    //   console.log(inputs.mobileNo.length);
    //   console.log(validation.VALID_PHONE_LENGTH);
    //   handleError("Please enter 10 digit mobile number", "mobileNo");
    //   valid = false;
    // }

    if (!inputs.password) {
      valid = false;
      handleError("Please enter your Password", "password");
    } else if (inputs.password.length < 6) {
      handleError("Password should be minimum 6 characters", "password");
    } else if (inputs.password.indexOf(" ") >= 0) {
      handleError("Password cannot contain spaces", "password");
      valid = false;
    }

    if (!inputs.confirmPassword) {
      valid = false;
      handleError("please enter your Confirm Password", "confirmPassword");
    } else if (inputs.password != inputs.confirmPassword) {
      handleError("password is not match", "confirmPassword");
      valid = false;
    }

    if (valid) {
      setLoading(true);
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
        name: inputs.name,
        mobile: inputs.mobileNo,
        email: inputs.email,
        password: inputs.password,
        confirm_password: inputs.confirmPassword,
        country_code: countryCode,
      });

      console.log("signupdata", data);

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
            setLoading(false);
            showMessage({
              message: "success",
              description: response.data.message,
              type: "default",
              backgroundColor: color.green,
            });
            const user = {
              id: response.data.data.user_details.id,
              name: inputs.name,
              mobile: inputs.mobileNo,
              email: inputs.email,
              count_code: response.data.data.user_details.country_code,
              // lang_id: response.data.data.user_details.lang_id,
              // otp: otp,
            };
            console.log("UserData", user);
            // rdStoreUser(user);
            // goToLogin();
            // goToOtp();
            // navigation.navigate("OtpScreen", {
            //   user_id: response.data.data.user_details.id,
            //   user_otp: response.data.data.user_details.otp,
            // });
            navigation.navigate("Login");
          } else {
            setLoading(false);
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

  // get country

  const ProcessGetCountry = () => {
    var CountryListHeader = new Headers();
    CountryListHeader.append("accept", "application/json");
    CountryListHeader.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    CountryListHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    // var CountryListData = new FormData();
    // CountryListData.append("countrylist", "1");

    var CountryListData = qs.stringify({
      countrylist: "1",
    });
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        CountryListData,
        { headers: CountryListHeader }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          console.log("countryLength", response);

          setCountryList(response.data.data);
        } else {
          console.log("country not found");
        }
      });
  };

  useEffect(() => {
    ProcessGetCountry();
  }, []);

  return (
    // <ScrollView style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: color.primary_color,
        }}
      >
        <StatusBar backgroundColor={color.primary_color} barStyle={"default"} />
        <KeyboardAvoidingView
          style={styles.addQuestionBar}
          behavior={"padding"}
        >
          {/* <BackButton onPress={() => navigation.goBack()} /> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.text}>Create An Account</Text>
            </View>
            <Input
              iconName={"account"}
              placeholder={"Full Name"}
              value={inputs.name}
              onChangeText={(text) => handleOnchange(text, "name")}
              onFocus={() => handleError(null, "name")}
              error={errors.name}
            />

            {/* {nameError && (
        <Text style={{ left: 0, color: "red", bottom: 10 }}>{nameError}</Text>
      )} */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={200}
                value={countryCode}
                data={CountryList}
                valueField="country_code"
                labelField="country_code"
                imageField="image"
                placeholder="+"
                searchPlaceholder="Search..."
                onChange={(e) => {
                  setCountryCode(e.country_code);
                }}
              />

              <View style={{ flex: 1 }}>
                <Input
                  iconName={"cellphone"}
                  placeholder={"Mobile No"}
                  value={inputs.mobileNo}
                  onChangeText={(text) => handleOnchange(text, "mobileNo")}
                  onFocus={() => handleError(null, "mobileNo")}
                  error={errors.mobileNo}
                  maxLength={15}

                  // onFocus={() => {
                  //   han
                  // }}
                />
              </View>
            </View>

            {/* {mobNumberError && (
        <Text style={{ left: 0, color: "red", bottom: 10 }}>
          {mobNumberError}
        </Text>
      )} */}

            <Input
              iconName={"email"}
              placeholder={"Email"}
              value={inputs.email}
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              error={errors.email}
              keyboardType="email-address"
            />
            {/* {emailError && (
        <Text style={{ left: 0, color: "red", bottom: 10 }}>{emailError}</Text>
      )} */}

            <Input
              iconName={"lock"}
              placeholder={"Password"}
              value={inputs.password}
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              password
              error={errors.password}
            />
            {/* {passwordError && (
        <Text style={{ left: 0, color: "red", bottom: 10 }}>
          {passwordError}
        </Text>
      )} */}

            <Input
              iconName={"lock"}
              placeholder={"Confirm Password"}
              value={inputs.confirmPassword}
              onChangeText={(text) => handleOnchange(text, "confirmPassword")}
              onFocus={() => handleError(null, "confirmPassword")}
              password
              error={errors.confirmPassword}
            />
            {/* {confirmPasswordError && (
        <Text style={{ left: 0, color: "red", bottom: 10 }}>
          {confirmPasswordError}
        </Text>
      )} */}

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              {/* {!apiStatus ? ( */}
              <VioletButton2
                buttonName="SIGNUP"
                onPress={processSignup}
                loading={loading}
              />
              {/* ) : ( */}
              {/* <ActivityIndicator /> */}
              {/* )} */}
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
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingVertical: 15,
  },
  ImageView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text_button: {
    textAlign: "left",
    fontSize: 20,
    alignSelf: "center",
    justifyContent: "center",
    color: color.black,
    fontFamily: "Medium",
    marginLeft: -1,
  },
  // dropdown: {
  //   borderRadius: 5,
  //   width: "30%",
  //   borderWidth: 2,
  //   borderColor: "#C6C6C8",
  //   backgroundColor: color.white,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   height: 53,
  //   marginLeft: 10,
  // },
  // dropdown style
  dropdown: {
    borderRadius: 5,
    width: "30%",
    borderWidth: 3,
    borderColor: "#C6C6C8",
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
    height: 53,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
