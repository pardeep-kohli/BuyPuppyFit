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
import { FontAwesome } from "@expo/vector-icons";
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

const EditProfile = ({ navigation, reduxUser, rdStoreUser }) => {
  console.log("redux", reduxUser);

  const [id, setId] = useState(reduxUser.customer.id);
  const [name, setName] = useState(reduxUser.customer.name);
  const [mobile, setMobile] = useState(reduxUser.customer.mobile);
  const [email, setEmail] = useState(reduxUser.customer.email);

  const [apiStatus, setApiStatus] = useState(false);

  const processUpdateProfile = () => {
    var valid = true;

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
        user_id: id,
        name: name,
        mobile: mobile,
        email: email,
      });

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
              user_id: id,
              name: name,
              email: email,
              mobile: mobile,
            };
            console.log("updateddata", user);
            storeAsyncData(ASYNC_LOGIN_KEY, user);
            rdStoreUser(user);
            showMessage({
              message: "success",
              description: response.data.message,
              type: "default",
              backgroundColor: "green",
            });
          }
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary_color} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      {/* <CategoryHeading2 CategoryName="EDIT PROFILE" /> */}
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>UPDATE PROFILE</Text>
      </View>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.FirstView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: color.grey,
              }}
            >
              <Text style={styles.text2}>Profile Image</Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.image}
                  source={require("../images/EditPage/profilePicture.png")}
                />
              </View>
              <TouchableOpacity>
                <Text style={[styles.text2, { fontFamily: "RubikSemiBold" }]}>
                  Add Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.InputOuterView}>
            <Input2
              label={"First Name"}
              placeholder={name}
              value={name}
              onChangeText={(name) => setName(name)}
            />
            <Input2
              label={"Email Address"}
              placeholder={email}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <Input2
              label={"Mobile Number"}
              placeholder={mobile}
              value={mobile}
              onChangeText={(mobile) => setMobile(mobile)}
            />
          </View>
        </View>
        <View style={styles.Button}>
          <VioletButton
            buttonName={"SAVE"}
            // onPress={() => navigation.navigate("Account")}
            onPress={processUpdateProfile}
          />
        </View>
      </ScrollView>
    </View>
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
    marginHorizontal: 15,
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
    marginHorizontal: 60,
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
