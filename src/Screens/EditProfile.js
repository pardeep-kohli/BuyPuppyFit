import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import CategoryHeading from "../component/CategoryHeading";
import Input2 from "../component/inputs/Input2";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CategoryHeading2 from "../component/CategorryHeading2";
import VioletButton from "../component/VioletButton";
import { SIZES } from "../assets/theme/theme";
import { connect, useSelector } from "react-redux";
import { storeUser } from "../store/user/Action";
import axios from "axios";
import { storeAsyncData } from "../utils";
import { ASYNC_LOGIN_KEY } from "../constants/Strings";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";
import BackHeader from "../component/buttons/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { useEffect } from "react";
import Input from "../component/inputs/Input";
import { SelectCountry } from "react-native-element-dropdown";
import validation from "../constants/Validation";

const EditProfile = ({ navigation, reduxUser, rdStoreUser }) => {
  console.log("redux", reduxUser);

  const [id, setId] = useState(reduxUser.customer.id);
  const [name, setName] = useState(reduxUser.customer.name);
  const [mobile, setMobile] = useState(reduxUser.customer.mobile);
  const [email, setEmail] = useState(reduxUser.customer.email);
  const [CountryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState("");

  const [countryCode, setCountryCode] = useState(
    reduxUser.customer.country_code
  );
  const [errors, setErrors] = React.useState({});

  const [inputs, setInputs] = React.useState({
    email: reduxUser.customer.email,
    name: reduxUser.customer.name,
    mobile: reduxUser.customer.mobile,
  });

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const [flag, setFlag] = useState(reduxUser.customer.image);

  const [apiStatus, setApiStatus] = useState(false);

  console.log("id", id);

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
          setCountryList(response.data.data);
        } else {
          console.log("country not found");
        }
      });
  };

  useEffect(() => {
    ProcessGetCountry();
  }, []);

  const processUpdateProfile = () => {
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

    if (!inputs.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    if (!inputs.mobile) {
      valid = false;
      handleError("Please enter mobile number", "mobile");
    } else if (!validation.VALID_NUM.test(inputs.mobile.trim())) {
      handleError("Please enter numbers only", "mobile");
      valid = false;
    }

    if (valid) {
      setApiStatus(!apiStatus);
      var updateHeader = new Headers();
      updateHeader.append("accept", "application/json");
      updateHeader.append("Content-Type", "application/x-www-form-urlencoded");
      updateHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

      // var UpdateData = new FormData();
      // UpdateData.append("editprofile", "1");
      // UpdateData.append("lang_id", "1");
      // UpdateData.append("user_id", id);
      // UpdateData.append("name", name);
      // UpdateData.append("mobile", mobile);
      // UpdateData.append("email", email);

      var UpdateData = qs.stringify({
        editprofile: "1",
        lang_id: "1",
        user_id: reduxUser.customer.id,
        name: inputs.name,
        mobile: inputs.mobile,
        email: inputs.email,
        country_code: countryCode,
      });

      console.log("update", UpdateData);

      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          UpdateData,
          { headers: updateHeader }
        )
        .then(function (response) {
          console.log("updateRes", response);

          if (response.data.success == 1) {
            const user = {
              id: id,
              name: inputs.name,
              email: inputs.email,
              mobile: inputs.mobile,
              country_code: countryCode,
              image: flag,
            };

            console.log("updateddata", user);
            storeAsyncData(ASYNC_LOGIN_KEY, user);
            rdStoreUser(user);
            showMessage({
              message: "success",
              description: response.data.message,
              type: "default",
              backgroundColor: color.green,
            });
            navigation.navigate("Account");
          } else {
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

  console.log("country", CountryList);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <StatusBar backgroundColor={color.primary_color} />
        {/* <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      /> */}
        <BackHeader navigation={() => navigation.goBack()} />
        {/* <CategoryHeading2 CategoryName="EDIT PROFILE" /> */}
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>UPDATE PROFILE</Text>
        </View>
        <ScrollView>
          <View style={styles.parent}>
            <View style={styles.FirstView}></View>
            <View style={styles.InputOuterView}>
              <Input
                iconName={"account"}
                label={"First Name"}
                placeholder={inputs.name}
                value={inputs.name}
                onChangeText={(text) => handleOnchange(text, "name")}
                onFocus={() => handleError(null, "name")}
                error={errors.name}
              />
              <Input
                iconName={"email"}
                label={"Email Address"}
                placeholder={inputs.email}
                value={inputs.email}
                onChangeText={(text) => handleOnchange(text, "email")}
                onFocus={() => handleError(null, "email")}
                error={errors.email}
                editable={false}
              />
              {/* <View style={styles.dropdownView}> */}
              {/* <Text style={styles.label_text}>Country code</Text> */}
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

                <View
                  style={{
                    flex: 1,
                    // bottom: 32,
                  }}
                >
                  <Input
                    iconName={"cellphone"}
                    label={"Mobile Number"}
                    placeholder={inputs.mobile}
                    value={inputs.mobile}
                    onChangeText={(text) => handleOnchange(text, "mobile")}
                    maxLength={15}
                    onFocus={() => handleError(null, "mobileNo")}
                    error={errors.mobile}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* </View> */}
          <View style={styles.Button}>
            <VioletButton
              buttonName={"SAVE"}
              // onPress={() => navigation.navigate("Account")}
              onPress={processUpdateProfile}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    height: hp(8),
    width: hp(8),
  },
  SaveImage: {
    height: hp(2),
    width: hp(2),
  },
  parent: {
    marginHorizontal: 20,
  },
  // FirstView: {
  //   borderBottomWidth: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   borderColor:color.grey,
  //   paddingVertical:hp/50
  // },
  text: {
    fontFamily: "Regular",
    fontSize: 13,
    paddingLeft: 5,
  },

  text2: {
    fontFamily: "RubikRegular",
    textAlign: "center",
    fontSize: 13,
  },
  InputOuterView: {
    paddingTop: 20,
  },
  Button: {
    paddingTop: 50,
    marginHorizontal: 15,
    // width:'100%',
  },
  headerView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
  dropdownView: {
    marginVertical: 10,
  },
  dropdown: {
    borderRadius: 5,
    width: "30%",
    borderWidth: 3,
    borderColor: "#C6C6C8",
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
    height: 53,
    paddingHorizontal: 4,
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
    rdStoreUser: (user) => dispatch(storeUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
