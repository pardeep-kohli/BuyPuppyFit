import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import CategoryHeading2 from "../component/CategorryHeading2";
import Input2 from "../component/inputs/Input2";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";
import { SafeAreaView } from "react-native";
import * as qs from "qs";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import BackButton from "../component/Backbutton";
import VioletButton2 from "../component/VioletButton2";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
const ContactUs = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    message: "",
  });

  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  var enquiryHeader = new Headers();
  enquiryHeader.append("accept", "application/json");
  enquiryHeader.append("Content-Type", "application/x-www-form-urlencoded");
  enquiryHeader.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

  var enquirydata = qs.stringify({
    submit_enquiry: "1",
    name: inputs.name,
    email: inputs.email,
    message: inputs.message,
  });

  const processAddEnquiry = () => {
    Keyboard.dismiss();
    var valid = true;
    if (!inputs.name) {
      valid = false;
      handleError(`${t("Please enter name")}`, "name");
    } else if (!inputs.name.match(/^[A-Z a-z]+$/i)) {
      handleError(`${t("Enter Only Alphabets")}`, "name");
      valid = false;
    } else {
      handleError(false);
    }

    // var emailValid = false;
    if (!inputs.email) {
      handleError(`${t("Please enter your email")}`, "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError(`${t("Please input a valid email")}`, "email");
      valid = false;
    }
    if (!inputs.message) {
      handleError(`${t("Please enter your message")}`, "message");
      valid = false;
    }

    if (valid) {
      setLoading(true);
      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          enquirydata,
          { headers: enquiryHeader }
        )
        .then(function (response) {
          console.log("enqresponce", response);
          if (response.data.success == 1) {
            setLoading(false);
            setInputs("");
            showMessage({
              message: "Success",
              description: response.data.message,
              type: "default",
              backgroundColor: color.primary_color2,
            });
          } else {
            setLoading(false);
            showMessage({
              message: "Error",
              description: response.data.message,
              type: "default",
              backgroundColor: color.red,
            });
          }
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <StatusBar backgroundColor={color.primary_color} />
        {/* <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        /> */}
        <BackButton onPress={() => navigation.goBack()} />
        <ScrollView>
          {/* <CategoryHeading2 CategoryName="CONTACT US" /> */}
          <View style={styles.headerView}>
            <Text style={styles.headerTxt}>{t("CONTACT US")}</Text>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../images/contactUs/contactus3.png")}
            />
          </View>

          <Text style={styles.heading}>{t("GET IN TOUCH!")}</Text>

          <View style={styles.inputOuterView}>
            <Input2
              value={inputs.name}
              label={`${t("First Name")}`}
              placeholder={t("Enter here")}
              error={errors.name}
              onChangeText={(text) => handleOnchange(text, "name")}
              onFocus={() => handleError(null, "name")}
            />
            <Input2
              value={inputs.email}
              label={`${t("Email")}`}
              placeholder={t("Enter here")}
              error={errors.email}
              onFocus={() => handleError(null, "email")}
              onChangeText={(text) => handleOnchange(text, "email")}
            />
            <Input2
              value={inputs.message}
              label={`${t("Message")}`}
              placeholder={t("Enter here")}
              onChangeText={(text) => handleOnchange(text, "message")}
              onFocus={() => handleError(null, "message")}
              error={errors.message}
              numberOfLines={4}
              textAlignVertical={"top"}
            />
          </View>
          <View style={styles.buttonView}>
            <VioletButton
              buttonName={t("SEND")}
              // onPress={() => navigation.navigate("Home")}
              onPress={processAddEnquiry}
              loading={loading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    height: hp(30),
    width: hp(48),
    // backgroundColor: "red",
  },
  heading: {
    textAlign: "center",
    fontFamily: "RubikBold",
    color: color.primary_color2,
    fontSize: 25,
  },

  inputOuterView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  buttonView: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  headerView: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
});
const mapStateToProps = (state) => {
  return {
    reduxLang: state.lang,
  };
};

export default connect(mapStateToProps)(ContactUs);
