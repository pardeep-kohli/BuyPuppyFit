import React, { useEffect, useState } from "react";
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
  ImageBackground,
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

import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

export default function DetailedScreen({ navigation, route }) {
  const reduxUser = useSelector((state) => state.user);

  console.log("reduxbyuser", reduxUser);
  const [productData, setProductData] = useState([]);

  const { product_id } = route.params;
  console.log("Product ID", product_id);

  const [selSection, setSelSection] = useState("Description");

  const changeSelection = (selChange) => {
    setSelSection(selChange);
  };

  var detailedHeader = new Headers();

  detailedHeader.append("accept", "application/json");
  detailedHeader.append("Content-Type", "application/x-www-form-urlencoded");
  detailedHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  var detailData = new FormData();
  detailData.append("getproductdetail", "1");
  detailData.append("lang_id", "1");
  detailData.append("product_id", product_id);

  useEffect(() => {
    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
        detailData,
        { headers: detailedHeader }
      )
      .then(function (response) {
        console.log("productDetail Res", response);
        if (response.data.success == 1) {
          setProductData(response.data.data.product_detail);
        }
      });
  }, []);

  var AddtoCartHeader = new Headers();
  AddtoCartHeader.append("accept", "application/json");
  AddtoCartHeader.append("Content-Type", "application/x-www-form-urlencoded");
  AddtoCartHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  var AddtocartData = new FormData();
  AddtocartData.append("addtocart", "1");
  AddtocartData.append("lang_id", "1");
  AddtocartData.append("product_id", productData.product_id);
  AddtocartData.append("qty", "1");
  AddtocartData.append("user_id", reduxUser.customer.id);
  AddtocartData.append("sell_price", productData.product_sell_price);

  const processAddtoCart = () => {
    axios
      .post(
        "http://13.126.10.232/development/beypuppy/appdata/webservice.php",
        AddtocartData,
        { headers: AddtoCartHeader }
      )
      .then(function (response) {
        console.log("addtocart", response);
        if (response.data.success == 1) {
          showMessage({
            message: "Success",
            description: response.data.message,
            type: "default",
            backgroundColor: color.text_primary,
          });
        } else {
          showMessage({
            message: "Error",
            description: response.data.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      });
  };

  // console.log("ProductData", productData);

  return (
    <>
      <StatusBar backgroundColor={color.violet} />
      {/* <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      /> */}
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <ScrollView>
          <ImageBackground
            style={styles.bannerImg}
            source={{ uri: productData.product_image }}
          >
            <View style={styles.headerView}>
              <View style={styles.headerBtnView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.headerBtn}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color={color.text_primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.cartSecView}>
                <TouchableOpacity style={styles.headerBtn}>
                  <Ionicons name="heart" color={color.text_primary} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.headerBtn}
                  onPress={() => navigation.navigate("CheckoutStack")}
                >
                  <Ionicons name="cart" color={color.text_primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.petDetailView}>
            <View style={styles.firstView}>
              <Text style={styles.breedNameTxt}>
                {productData.product_breed}
              </Text>
              <Text style={styles.stockTxt}>In stock</Text>
            </View>
            <View style={styles.secondView}>
              <Text style={styles.petNameTxt}>{productData.product_name}</Text>
              <View style={styles.ratingView}>
                <Entypo name="star" color={color.primary_color} size={20} />
                <Text style={styles.ratingTxt}>
                  {" "}
                  {productData.product_rating}
                </Text>
              </View>
              <Text style={styles.priceTxt}>
                ${productData.product_sell_price}
              </Text>
            </View>

            <View style={styles.bornDtlView}>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>BORN:</Text>
                <Text style={styles.dateTxt2}> {productData.product_born}</Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>LEAVE:</Text>
                <Text style={styles.dateTxt2}>
                  {" "}
                  {productData.product_leave_date}
                </Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>FATHER:</Text>
                <Text style={styles.dateTxt2}>
                  {" "}
                  {productData.product_father_name}
                </Text>
              </View>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>MOTHER:</Text>
                <Text style={styles.dateTxt2}>
                  {" "}
                  {productData.product_mother_name}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cartBtn}
              // onPress={() => navigation.navigate("CheckoutStack")}
              onPress={processAddtoCart}
            >
              <Ionicons name="cart" color={color.text_primary} size={30} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.SubParent}>
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
          </View> */}

          <View
            style={{
              backgroundColor: color.primary_color,
              paddingVertical: 20,
              borderRadius: 10,
              marginHorizontal: 15,
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.headingView}>
              <Text style={styles.txt3}>PRODUCT DETAIL</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                // padding: 5,
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
                  <Text style={[styles.txt2, { color: color.light_grey }]}>
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
                  <Text style={[styles.txt2, { color: color.light_grey }]}>
                    Reviews
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => changeSelection("Delevary")}
            >
              {selSection == "Delevary" ? (
                <View style={styles.payView1}>
                  <Text style={styles.txt2}>Delevary</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, { color: color.light_grey }]}>
                    Delevary
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {selSection == "Description" && (
            <View style={styles.detailView}>
              <Text style={styles.detailTxt}>{productData.description}</Text>
            </View>
          )}
          {selSection == "Delevary" && (
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
        {/* <View style={styles.btnView2}>
          <VioletButton
            buttonName={"ADD TO CART"}
            onPress={() => navigation.navigate("CheckoutStack")}
          />
        </View> */}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bannerImg: {
    height: SIZES.height / 3,
    flex: 1,
  },
  headerView: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cartSecView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBtn: {
    backgroundColor: color.primary_color,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 20,
    marginTop: 10,
  },
  cartBtn: {
    backgroundColor: color.primary_color,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    borderRadius: 25,
    position: "absolute",
    right: 5,
    bottom: 20,
  },
  petDetailView: {
    backgroundColor: color.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  firstView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breedNameTxt: {
    fontFamily: "RubikRegular",
    color: color.text_primary,
    fontSize: SIZES.h3 - 2,
  },
  stockTxt: {
    fontFamily: "RobotoSemi",
    color: "green",
  },
  petNameTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 3,
    color: color.primary_color2,
  },
  ratingTxt: {
    fontFamily: "RubikSemiBold",
    color: color.primary_color,
    fontSize: SIZES.h3,
  },
  priceTxt: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.primary_color2,
  },
  bornDtlView: {
    marginTop: 10,
  },
  dateView: {
    flexDirection: "row",
  },
  dateTxt: {
    fontFamily: "RubikBold",
    color: color.primary_color2,
    marginBottom: 10,
  },
  dateTxt2: {
    fontFamily: "RubikRegular",
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  txt3: {
    fontFamily: "RubikBold",
    fontSize: SIZES.h2 - 2,
    color: color.text_primary,
  },
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

  multiView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.height / 40,
    marginHorizontal: SIZES.width / 30,
    borderBottomColor: color.primary_color,
    borderBottomWidth: 1,
  },
  payView1: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: color.primary_color,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.height / 64,
    borderColor: color.primary_color,
  },
  payView2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.height / 64,
  },
  txt2: {
    flex: 1,
    color: color.text_primary,
    fontSize: SIZES.h3 - 3,
    fontFamily: "RubikBold",
  },
  detailView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  detailTxt: {
    fontFamily: "RubikRegular",
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
