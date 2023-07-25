import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import color from "../assets/theme/color";
import Header from "../component/Header";
import Input2 from "../component/inputs/Input2";
import CheckBox from "../component/Checkbox";
import CategoryHeading2 from "../component/CategorryHeading2";
import VioletButton from "../component/VioletButton";
import { SIZES, FONTS } from "../assets/theme/theme";
import PriceDropdown from "../component/PriceDropdown";
import CountryDropdown from "../component/CountryDropdown";
import StateDropdown from "../component/StateDropdown";
import CityDropdown from "../component/CityDropdown";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import SelectDropdown from "react-native-select-dropdown";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";
import { SafeAreaView } from "react-native";
import BackHeader from "../component/buttons/BackHeader";
import { useTranslation } from "react-i18next";
// import { styles } from "../component/Styles";

// import { Checkbox } from "react-native-paper";

const AddAddress = ({ navigation }) => {
  const reduxUser = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [userid, setUserId] = useState(reduxUser.customer.id);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [stateId, setStateId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const [CountryList, setCountryList] = useState([]);
  const [getStateList, setStateList] = useState([]);
  const down_img = require("../assets/images/down.png");

  console.log("countryid", countryId);

  const [placeid, setPlaceId] = useState("");

  const handleCheck = () => {
    setIsChecked(!isChecked);
    if (isChecked2) {
      setIsChecked2(!isChecked2);
    }
    setPlaceId("1");
  };
  const handleCheck2 = () => {
    setIsChecked2(!isChecked2);
    if (isChecked) {
      setIsChecked(!isChecked);
    }
    setPlaceId("2");
  };

  var myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  // var formdata = new FormData();
  // formdata.append("addaddress", "1");
  // formdata.append("user_id", userid);
  // formdata.append("address", address);
  // formdata.append("country_id", countryId);
  // formdata.append("province_id", stateId);
  // formdata.append("postcode", zipCode);
  // formdata.append("place", placeid);
  // formdata.append("city", city);

  var formdata = qs.stringify({
    addaddress: "1",
    user_id: userid,
    address: address,
    country_id: countryId,
    province_id: stateId,
    postcode: zipCode,
    place: placeid,
    city: city,
  });

  console.log("formdata", formdata);

  const ProcessAddAddress = () => {
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", formdata, {
        headers: myHeaders,
      })
      .then(function (response) {
        console.log("AddAddress res", response);
        if (response.data.success == 1) {
          showMessage({
            message: `${t("Success")}`,
            description: response.data.message,
            type: "default",
            backgroundColor: color.green,
          });
          navigation.goBack();
        } else {
          showMessage({
            message: `${t("Fail")}`,
            description: `${t("Please enter all required field")}`,
            type: "default",
            backgroundColor: color.red,
          });
        }
      });
  };

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

  // console.log("countrylist", CountryList);

  const ProcessGetState = () => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    // var formdata = new FormData();
    // formdata.append("countrylist", "1");
    var formdata = qs.stringify({
      statelist: "1",
      country_id: countryId,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php?statelist=1&country_id=1",
        formdata,
        { headers: myHeaders }
      )
      .then(function (response) {
        if (response.data.success == 1) {
          setStateList(response.data.data);
        } else {
          console.log("state data not found");
        }
      });
  };
  console.log("statelist", getStateList);

  useEffect(() => {
    ProcessGetCountry();
    ProcessGetState();
  }, [countryId]);

  // console.log("statelist", getStateList);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: color.white, flex: 1 }}>
        <StatusBar backgroundColor={color.primary_color} />
        {/* <Header
          navigation={navigation}
          cart={() => navigation.navigate("CheckoutStack")}
        /> */}
        <BackHeader navigation={() => navigation.goBack()} />
        {/* <CategoryHeading2 CategoryName="ADD ADDRESS" /> */}
        <View style={styles.headerView}>
          <Text style={styles.headerTxt}>{t("ADD ADDRESS")}</Text>
        </View>
        <ScrollView>
          <View style={styles.parent}>
            <Input2
              label={`${t("Address")}`}
              placeholder={`${t("Address")}`}
              value={address}
              onChangeText={(address) => setAddress(address)}
            />
            <View style={styles.dropdownView}>
              <Text style={styles.label_text}>{t("Country")}</Text>

              <View style={{ flexDirection: "row" }}>
                <SelectDropdown
                  // data={CountryList.map((list, index) => list.country)}
                  data={CountryList.map((item) => item.country)}
                  onSelect={(selectedItem, index) => {
                    console.log("selectedItem", selectedItem);
                    setCountryId(CountryList[index].id);
                    // console.log("contryid", countryId);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    CountryList[index].country;

                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown}
                  buttonTextStyle={styles.text_button}
                  rowTextStyle={styles.row_text}
                  dropdownStyle={styles.dropdown_style}
                />

                <Image style={styles.downimg} source={down_img}></Image>
              </View>
            </View>
            <View style={styles.dropdownView}>
              <Text style={styles.label_text}>{t("State")}</Text>
              <View style={{ flexDirection: "row" }}>
                <SelectDropdown
                  // data={CountryList.map((list, index) => list.country)}
                  data={getStateList.map((item) => item.province)}
                  onSelect={(selectedItem, index) => {
                    console.log("selectedItem", selectedItem);
                    setStateId(getStateList[index].id);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    getStateList[index].province;

                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown}
                  buttonTextStyle={styles.text_button}
                  rowTextStyle={styles.row_text}
                  dropdownStyle={styles.dropdown_style}
                />

                <Image style={styles.downimg} source={down_img}></Image>
              </View>
            </View>
            {/* <View style={styles.dropdownView}>
            <CityDropdown label={"City"} />
          </View> */}
            <Input2
              label={`${t("City")}`}
              placeholder={t("Enter here")}
              value={city}
              onChangeText={(city) => setCity(city)}
            />
            <Input2
              label={`${t("zip")}`}
              placeholder={t("Enter here")}
              value={zipCode}
              onChangeText={(zipCode) => setZipCode(zipCode)}
            />

            <View style={styles.checkBoxouterView}>
              <View style={styles.parent2}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Checkbox
                    styles={styles.CheckBox}
                    value={isChecked}
                    onValueChange={handleCheck}
                    color={isChecked == true ? color.primary_color : undefined}
                  />
                </View>
                <View style={styles.optionName}>
                  <Text style={styles.optionName}>{t("Home")}</Text>
                </View>
              </View>

              <View style={styles.CheckBoxView}>
                <View style={[styles.parent2, { marginLeft: 10 }]}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Checkbox
                      styles={styles.CheckBox}
                      value={isChecked2}
                      onValueChange={handleCheck2}
                      color={
                        isChecked2 == true ? color.primary_color : undefined
                      }
                    />
                  </View>
                  <View style={styles.optionName}>
                    <Text style={styles.optionName}>{t("Others")}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.btnView}>
              <VioletButton
                buttonName={`${t("Save")}`}
                // onPress={() => navigation.navigate("Account")}
                onPress={ProcessAddAddress}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  checkBoxouterView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  CheckBoxView: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  parent: {
    paddingHorizontal: 15,
  },
  btnView: {
    marginVertical: SIZES.height / 14,
    // paddingHorizontal: SIZES.width / 10,
    width: "100%",
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
  dropdownView: {
    marginVertical: 5,
  },
  parent2: {
    flexDirection: "row",
    // justifyContent:'space-between',
    // borderWidth:1,
    // width:'100%',
  },
  optionName: {
    fontFamily: "RubikRegular",
    color: color.black,
    marginLeft: 3,
    marginTop: 1.5,
  },
  CheckBox: {
    borderColor: color.grey,
  },

  dropdown: {
    borderRadius: 5,
    width: "100%",
    borderWidth: 2,
    borderColor: "#C6C6C8",
    backgroundColor: color.white,
  },
  label_text: {
    // color: color.black,
    // fontSize: 13,
    fontFamily: "FONTS.Rubik_medium",
    marginBottom: 5,
  },
  downimg: {
    position: "absolute",
    right: 0,
    // alignSelf:'center',
    height: 8,
    resizeMode: "contain",
    top: "40%",
    tintColor: "black",
  },
  text_button: {
    textAlign: "left",
    fontSize: 14,
    alignSelf: "center",
    justifyContent: "center",
    color: color.black,
    fontFamily: "Medium",
    marginLeft: -1,
  },
  row_text: {
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center",
    color: color.black,
    fontFamily: "Montserrat-Medium",
  },
  dropdown_style: {
    borderRadius: 10,
    // backgroundColor: 'red',
  },
});
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

export default connect(mapStateToProps)(AddAddress);
