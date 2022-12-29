import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import color from "../assets/theme/color";
import ItemDetail from "../component/ItemDetail";
import Header from "../component/Header";
import PriceAndRating from "../component/PriceAndRating";
import Description from "../component/Description";
import { SIZES, FONTS } from "../assets/theme/theme";
import Entypo from "react-native-vector-icons/Entypo";
import VioletButton from "../component/VioletButton";
import PetDetail from "../component/PetDetail";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default function DetailedScreen({ navigation }) {
  const [selSection, setSelSection] = useState("Description");

  const changeSelection = (selChange) => {
    setSelSection(selChange);
  };

  const reportData = [
    {
      id: "1",
      img: require("../images/health.png"),
      reportTxt: "HEALTH CHECKED",
    },
    {
      id: "2",
      img: require("../images/dimond.png"),
      reportTxt: "FCI DEPARTMENT",
    },
    {
      id: "3",
      img: require("../images/champion.png"),
      reportTxt: "CHAMPION BLOODLINE",
    },
    {
      id: "4",
      img: require("../images/fatherpad.png"),
      reportTxt: "FATHER’S PADIGREE",
    },
    {
      id: "5",
      img: require("../images/motherpad.png"),
      reportTxt: "MOTHER’S PADIGREE",
    },
  ];

  const renderReport = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.mainView}>
        <View style={styles.imgView}>
          <Image resizeMode="contain" style={styles.img} source={item.img} />
        </View>

        <View style={styles.txtView}>
          <Text style={styles.txt}>{item.reportTxt}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={color.violet} />
      <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      />
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <ScrollView>
          <View style={styles.SubParent}>
            <ItemDetail
              ImgSrc={require("../images/puppy.png")}
              BreedType="German Shepherd"
              BreedName={"Kennel Esthund"}
              Availability="in stock"
              bornDate={"19.11.2022"}
              leaveDate={"19.12.2022"}
              fatherName={"Matteo from Wattenschild"}
              motherName={"Esthund Great Guccy"}
            />

            <PriceAndRating
              AprroxRating="100+ Ratings"
              Price="$46"
              // Time="90 min"
              Rating="4.1"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              backgroundColor: color.primary_color,
              // padding: 5,
              paddingVertical: 10,
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <PetDetail
              img={require("../images/health.png")}
              reportTxt={"HEALTH CHECKED"}
            />
            <PetDetail
              img={require("../images/dimond.png")}
              reportTxt={"FCI DEPARTMENT"}
            />
            <PetDetail
              img={require("../images/champion.png")}
              reportTxt={"CHAMPION BLOODLINE"}
            />

            <PetDetail
              img={require("../images/fatherpad.png")}
              reportTxt={"FATHER’S PADIGREE"}
            />
            <PetDetail
              img={require("../images/motherpad.png")}
              reportTxt={"MOTHER'S PADIGREE"}
            />
            <PetDetail
              img={require("../images/heart.png")}
              reportTxt={"FAVOURITE"}
            />
          </View>

          {/* <FlatList
            data={reportData}
            renderItem={renderReport}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{
              flex: 1,
              margin: SIZES.base,
              backgroundColor: color.primary_color,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          /> */}

          <View style={styles.multiView}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => changeSelection("Description")}
            >
              {selSection == "Description" ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Description</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, { color: color.black }]}>
                    Description
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => changeSelection("Reviews")}
            >
              {selSection == "Reviews" ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Reviews</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, { color: color.primary_color }]}>
                    Reviews
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => changeSelection("Delevary")}
            >
              {selSection == "Delevary" ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Delevary & Return</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, { color: color.primary_color }]}>
                    Delevary & Return
                  </Text>
                </View>
              )}
            </TouchableOpacity> */}
          </View>

          {selSection == "Description" && (
            <View style={styles.detailView}>
              <Text style={styles.detailTxt}>
                Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
                enim magnis velit eget. Vitae massa neque cursus consectetur
                mauris dolor risus donec elementum. Arcu praesent pharetra amet
                est eget donec quam leo vitae.
              </Text>

              <Text style={styles.detailTxt}>
                Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
                enim magnis velit eget. Vitae massa neque cursus consectetur
                mauris dolor risus donec elementum. Arcu praesent pharetra amet
                est eget donec quam leo vitae.
              </Text>
            </View>
          )}
          {/* {selSection == "Delevary" && (
            <View style={styles.detailView}>
              <Text style={styles.detailTxt}>
                Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
                enim magnis velit eget. Vitae massa neque cursus consectetur
                mauris dolor risus donec elementum. Arcu praesent pharetra amet
                est eget donec quam leo vitae.
              </Text>

              <Text style={styles.detailTxt}>
                Lorem ipsum dolor sit amet consectetur. At eget ultrices feugiat
                enim magnis velit eget. Vitae massa neque cursus consectetur
                mauris dolor risus donec elementum. Arcu praesent pharetra amet
                est eget donec quam leo vitae.
              </Text>
            </View>
          )} */}
          {selSection == "Reviews" && (
            <View style={styles.reviewMainView}>
              <View style={styles.starView}>
                <Entypo
                  name="star-outlined"
                  size={30}
                  color={color.primary_color}
                />
                <Entypo
                  name="star-outlined"
                  size={30}
                  color={color.primary_color}
                />
                <Entypo
                  name="star-outlined"
                  size={30}
                  color={color.primary_color}
                />
                <Entypo
                  name="star-outlined"
                  size={30}
                  color={color.primary_color}
                />
                <Entypo
                  name="star-outlined"
                  size={30}
                  color={color.primary_color}
                />
              </View>

              <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                  <TextInput style={styles.input} placeholder="Name" />
                </View>
                <View style={styles.inputView2}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                </View>
              </View>
              <View style={styles.messageInputView}>
                <TextInput
                  style={styles.messageInput}
                  textAlignVertical="top"
                  placeholder="Message"
                  numberOfLines={4}
                />
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnTxt}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.btnView2}>
          <VioletButton
            buttonName={"ADD TO CART"}
            onPress={() => navigation.navigate("CheckoutStack")}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  SubParent: {
    marginHorizontal: 10,
  },
  mainView: {
    // flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: color.text_primary,
    paddingVertical: SIZES.height / 36,
    height: 100,
    width: 107,
    borderRadius: 6,
    // marginHorizontal: 10,

    margin: SIZES.base,
  },
  imgView: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: SIZES.height / 18,
    width: SIZES.width / 7,
    tintColor: color.text_primary,
  },
  txtView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  txt: {
    textAlign: "center",
    fontSize: SIZES.h4 - 6,
    fontWeight: "bold",
    color: color.white,
  },
  // multiView: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  //   marginTop: SIZES.height / 40,
  //   // backgroundColor: "red",
  //   marginHorizontal: SIZES.width / 30,
  //   borderBottomColor: color.primary_color,
  //   borderBottomWidth: 1,
  // },
  // payView1: {
  //   flex: 1,
  //   borderWidth: 1,
  //   backgroundColor: color.text_primary,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: SIZES.height / 64,
  //   // marginHorizontal: 20,
  //   width: SIZES.width / 3.5,
  //   borderColor: color.text_primary,
  // },
  // payView2: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: SIZES.height / 64,
  //   width: SIZES.width / 3.5,
  // },
  // txt2: {
  //   flex: 1,
  //   color: color.black,
  //   fontSize: SIZES.h3 - 3,
  //   fontWeight: "500",
  // },
  multiView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.height / 40,
    marginHorizontal: SIZES.width / 30,
    borderBottomColor: color.text_primary,
    borderBottomWidth: 1,
  },
  payView1: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: color.text_primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.height / 64,
    // marginHorizontal: 20,
    // width: SIZES.width / 3.5,
    borderColor: color.text_primary,
  },
  payView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.height / 64,
    // width: SIZES.width / 3.5,
  },
  txt2: {
    flex: 1,
    color: color.black,
    fontSize: SIZES.h3 - 3,
    fontWeight: "500",
  },
  detailView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  detailTxt: {
    // fontFamily: FONTS.Rubik_medium,
    textAlign: "justify",
    color: color.black,
    marginVertical: 5,
  },
  reviewMainView: {
    marginVertical: SIZES.height / 64,
  },
  starView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputMainView: {
    paddingHorizontal: SIZES.width / 20,
    marginTop: SIZES.height / 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputView: {
    borderWidth: 0.5,
    borderColor: color.black,
    width: SIZES.width / 3.5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    height: SIZES.height / 20,
  },
  inputView2: {
    borderWidth: 0.5,
    borderColor: color.black,
    width: SIZES.width / 1.7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  messageInputView: {
    borderWidth: 0.5,
    borderColor: color.black,
    marginHorizontal: SIZES.width / 20,
    marginTop: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  messageInput: {
    paddingVertical: 5,
  },
  btnView: {
    marginVertical: SIZES.height / 64,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: SIZES.width / 20,
  },
  btn: {
    backgroundColor: color.primary_color,
    paddingHorizontal: SIZES.width / 10,
    paddingVertical: SIZES.height / 64,
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: SIZES.h3,
    color: color.white,
    fontWeight: "bold",
  },
});
