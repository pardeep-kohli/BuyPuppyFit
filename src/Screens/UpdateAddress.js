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
import { useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import SelectDropdown from "react-native-select-dropdown";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";
import BackHeader from "../component/buttons/BackHeader";
import { SafeAreaView } from "react-native-safe-area-context";
// import { styles } from "../component/Styles";

// import { Checkbox } from "react-native-paper";

export default function UpdateAddress({ navigation, route }) {
  const { addressData } = route.params;
  console.log("address", addressData);

  const reduxUser = useSelector((state) => state.user);
  const [userid, setUserId] = useState(reduxUser.customer.id);
  const [address, setAddress] = useState(addressData.address);
  const [addressId, setAddressId] = useState(addressData.id);

  const [stateId, setStateId] = useState("");
  const [countryId, setCountryId] = useState("");
  const [zipCode, setZipCode] = useState(addressData.postcode);
  const [city, setCity] = useState(addressData.city);

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
  // formdata.append("updateaddress", "1");
  // formdata.append("user_id", userid);
  // formdata.append("address", address);
  // formdata.append("country_id", countryId);
  // formdata.append("province_id", stateId);
  // formdata.append("postcode", zipCode);
  // formdata.append("place", placeid);
  // formdata.append("city", city);
  // formdata.append("address_id", addressId);

  var formdata = qs.stringify({
    updateaddress: "1",
    user_id: userid,
    address: address,
    country_id: countryId,
    province_id: stateId,
    postcode: zipCode,
    place: placeid,
    city: city,
    address_id: addressId,
  });

  console.log("formdata", formdata);

  const ProcessUpdateAddress = () => {
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", formdata, {
        headers: myHeaders,
      })
      .then(function (response) {
        console.log("update res", response);
        if (response.data.success == 1) {
          showMessage({
            message: "Success",
            description: response.data.message,
            type: "default",
            backgroundColor: color.text_primary,
          });
          navigation.navigate("Account");
        } else {
          showMessage({
            message: "Fail",
            description: response.data.message,
            type: "default",
            backgroundColor: color.text_primary,
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
        { headers: CountryListData }
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
      countrylist: "1",
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

  useEffect(() => {
    ProcessGetCountry();
    ProcessGetState();
  }, []);

  // console.log("statelist", getStateList);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      {/* <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      /> */}
      <BackHeader navigation={()=>navigation.goBack()}/>
      {/* <CategoryHeading2 CategoryName="ADD ADDRESS" /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>UPDATE ADDRESS</Text>
      </View>
      <ScrollView>
        <View style={styles.parent}>
          <Input2
            label={"Address"}
            placeholder={address}
            value={address}
            onChangeText={(address) => setAddress(address)}
          />
          <View style={styles.dropdownView}>
            <Text style={styles.label_text}>Country</Text>

            <View style={{ flexDirection: "row" }}>
              <SelectDropdown
                // data={CountryList.map((list, index) => list.country)}
                data={CountryList.map((item) => item.country)}
                onSelect={(selectedItem) => {
                  console.log("selectedItem", selectedItem);
                  setCountryId(CountryList[0].id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  CountryList[index].country;

                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={addressData.country}
                buttonStyle={styles.dropdown}
                buttonTextStyle={styles.text_button}
                rowTextStyle={styles.row_text}
                dropdownStyle={styles.dropdown_style}
              />

              <Image style={styles.downimg} source={down_img}></Image>
            </View>
          </View>
          <View style={styles.dropdownView}>
            <Text style={styles.label_text}>State</Text>
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
                defaultButtonText={addressData.province}
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
            label={"City"}
            placeholder={city}
            value={city}
            onChangeText={(city) => setCity(city)}
          />
          <Input2
            label={"Zip Code"}
            placeholder={zipCode}
            value={zipCode}
            onChangeText={(zipCode) => setZipCode(zipCode)}
          />

          <View style={styles.checkBoxouterView}>
            <View style={styles.parent2}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Checkbox
                  styles={styles.CheckBox}
                  value={isChecked}
                  onValueChange={handleCheck}
                  color={isChecked == true ? color.primary_color : undefined}
                />
              </View>
              <View style={styles.optionName}>
                <Text style={styles.optionName}>Home</Text>
              </View>
            </View>

            <View style={styles.CheckBoxView}>
              <View style={styles.parent2}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Checkbox
                    styles={styles.CheckBox}
                    value={isChecked2}
                    onValueChange={handleCheck2}
                    color={isChecked2 == true ? color.primary_color : undefined}
                  />
                </View>
                <View style={styles.optionName}>
                  <Text style={styles.optionName}>Others</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.btnView}>
            <VioletButton
              buttonName={"Save"}
              // onPress={() => navigation.navigate("Account")}
              onPress={ProcessUpdateAddress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  checkBoxouterView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  CheckBoxView: {
    // marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:20
  },
  parent: {
    paddingHorizontal: 15,
  },
  btnView: {
    marginVertical: SIZES.height / 10,
    // paddingHorizontal: SIZES.width / 10,
    width:'100%'
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
    fontFamily: "SemiBold",
  },
  dropdown_style: {
    borderRadius: 10,
    // backgroundColor: 'red',
  },
});
