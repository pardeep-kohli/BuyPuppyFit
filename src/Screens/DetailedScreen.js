import React, { useEffect, useState, useCallback, useRef } from "react";
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
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../assets/theme/color";
import ItemDetail from "../component/ItemDetail";
import Header from "../component/Header";
import PriceAndRating from "../component/PriceAndRating";
import Description from "../component/Description";
import { SIZES, FONTS } from "../assets/theme/theme";
import Entypo from "react-native-vector-icons/Entypo";
import VioletButton from "../component/VioletButton";
import PetDetail from "../component/PetDetail";
import Input from "../component/inputs/Input";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import * as qs from "qs";
import { storeCart } from "../store/cart/cartAction";
import Input2 from "../component/inputs/Input2";
import ratingView from "../utils/myHealper";
import {
  storeOnSaleFav,
  storeOnSaleRemove,
  storeWish,
} from "../store/wishlist/WishAction";

// import BannerCarousel from "../component/BannerCarousel";

const DetailedScreen = ({
  navigation,
  route,
  reduxCart,
  rdStoreCart,
  rdStoreFav,
  rdStoreRemove,
}) => {
  const reduxUser = useSelector((state) => state.user);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dimension, setDimension] = useState(Dimensions.get("window"));

  const [productData, setProductData] = useState([]);
  const [qty, setQty] = useState(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [rating, setRating] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);

  const { product_id, wishData } = route.params;
  console.log("Product ID", product_id, wishData);

  const [selSection, setSelSection] = useState("Description");
  const [inputs, setInputs] = React.useState({
    email: "",
    name: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get("window"));
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const onSlideChange = useCallback(() => {
    const newIndex = selectedIndex === img.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 30000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  // const carouselImages = [
  //   { url: require("../images/carousel.png") },
  //   { url: require("../images/carousel.png") },
  //   { url: require("../images/carousel.png") },
  // ];

  const setIndex = (event) => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  const changeSelection = (selChange) => {
    setSelSection(selChange);
  };

  const ProcessAddWishlist = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("addwishlist", "1");
    bodyFormData.append("lang_id", "1");
    bodyFormData.append("user_id", reduxUser.customer.id);
    bodyFormData.append("product_id", product_id);

    fetch("https://codewraps.in/beypuppy/appdata/webservice.php", {
      body: bodyFormData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.success == 1) {
          // rdStoreFav(product_id);
          getDetailData();
          showMessage({
            message: "Success ",
            description: "Item added to wishlist",
            type: "success",
          });
        } else {
          showMessage({
            message: "Error ",
            description: "Item Already Exists in Wishlist",
            type: "error",
          });
        }
      })
      .catch((error) =>
        showMessage({
          message: "Error ",
          description: "Some error occur",
          type: "error",
        })
      );
    // }
  };

  const processRemoveWishlist = () => {
    let payload = new FormData();
    payload.append("removewishlist", "1");
    payload.append("user_id", reduxUser.customer.id);
    payload.append("product_id", product_id);

    fetch("https://codewraps.in/beypuppy/appdata/webservice.php", {
      body: payload,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.success == 1) {
          // rdStoreRemove(product_id);
          getDetailData();
          showMessage({
            message: "Success",
            description: response?.message,
            type: "default",
            backgroundColor: color.text_primary,
          });
        } else {
          showMessage({
            message: "Error",
            description: response?.message,
            type: "default",
            backgroundColor: "red",
          });
        }
      })
      .catch((err) =>
        showMessage({
          message: "Error ",
          description: "Some error occur",
          type: "error",
        })
      );
  };

  const handleCheck = () => {
    if (productData.wishlist == 1) {
      rdStoreRemove(product_id);
      processRemoveWishlist();
    } else {
      rdStoreFav(product_id);
      ProcessAddWishlist();
    }
  };

  const getDetailData = () => {
    var detailedHeader = new Headers();
    detailedHeader.append("accept", "application/json");
    detailedHeader.append("Content-Type", "application/x-www-form-urlencoded");
    detailedHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

    var detailData = qs.stringify({
      getproductdetail: "1",
      product_id: product_id,
      lang_id: "1",
      user_id: reduxUser.customer.id,
    });

    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        detailData,
        { headers: detailedHeader }
      )
      .then(function (response) {
        // console.log("productDetail Res", response);
        if (response.data.success == 1) {
          setIsDataLoaded(true);
          setProductData(response.data.data.product_detail);
          setUpdatedData(response.data.data.product_detail);
          setImg(response.data.data.product_detail.gallery);
        }
      })
      .catch((err) => console.log("err", err));
  };
  console.log("prod===>", productData);

  useEffect(() => {
    getDetailData();
    navigation.addListener("focus", () => getDetailData());
  }, []);

  // console.log("gall===>", img);

  var AddtoCartHeader = new Headers();
  AddtoCartHeader.append("accept", "application/json");
  AddtoCartHeader.append("Content-Type", "application/x-www-form-urlencoded");
  AddtoCartHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  var AddtocartData = qs.stringify({
    addtocart: "1",
    lang_id: "1",
    product_id: productData.product_id,
    qty: "1",
    user_id: reduxUser.customer.id,
    sell_price: productData.product_sell_price,
  });

  const processAddtoCart = () => {
    setLoading(true);
    axios
      .post(
        "https://codewraps.in/beypuppy/appdata/webservice.php",
        AddtocartData,
        { headers: AddtoCartHeader }
      )
      .then(function (response) {
        // console.log("addtocart", response);
        if (response.data.success == 1) {
          setLoading(false);
          if (
            reduxCart.cartId.length > 0 &&
            reduxCart.cartId.includes(productData.product_id)
          ) {
            setLoading(false);
            showMessage({
              message: "Error ",
              description: "Item Already in Cart",
              type: "error",
            });
          } else {
            setLoading(false);
            var CartItem = {
              id: productData.product_id,
              name: productData.product_name,
              image: productData.product_image,
              price: parseInt(productData.product_sell_price),
              quantity: qty,
            };
            var rCart = reduxCart.cart;
            var rCartId = reduxCart.cartId;
            rCartId.push(productData.product_id);
            rCart.push(CartItem);

            var cartCount = parseInt(reduxCart.cartCount) + qty;
            var subTotal =
              parseInt(reduxCart.subTotal) +
              parseInt(productData.product_sell_price * qty);
            var grandTotal =
              parseInt(reduxCart.grandTotal) +
              parseInt(productData.product_sell_price * qty);

            var newCart = {
              cart: rCart,
              cartId: rCartId,
              cartCount: cartCount,
              subTotal: subTotal,
              tax: 0,
              shipping: 0,
              grandTotal: grandTotal,
            };
            // console.log("this will add", newCart);
            rdStoreCart(newCart);

            showMessage({
              message: "Success",
              description: "Item Added to Cart",
              type: "success",
            });
          }
        } else if (
          reduxCart.cartId.length > 0 &&
          reduxCart.cartId.includes(productData.product_id)
        ) {
          setLoading(false);
          showMessage({
            message: "Please Check Your Cart!",
            description: "Pet Already in a Cart",
            type: "error",
          });
        }
      });
  };

  // console.log("ProductData", productData);

  var reviewHeader = new Headers();
  reviewHeader.append("accept", "application/json");
  reviewHeader.append("Content-Type", "application/x-www-form-urlencoded");
  reviewHeader.append("Cookie", "PHPSESSID=1kl3o5lrc91q5tcc0t08rt1bq0");

  var Reviewdata = qs.stringify({
    product_review: "1",
    user_id: reduxUser.customer.id,
    product_id: productData.product_id,
    name: inputs.name,
    email: inputs.email,
    comments: inputs.message,
    rating: rating,
  });

  console.log("enqdata", Reviewdata);

  const processAddEnquiry = () => {
    Keyboard.dismiss();
    var valid = true;
    if (!inputs.name) {
      valid = false;
      handleError("Please enter name", "name");
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

    if (!inputs.message) {
      handleError("Please enter your message", "message");
      valid = false;
    }

    if (valid) {
      setLoading(true);
      axios
        .post(
          "https://codewraps.in/beypuppy/appdata/webservice.php",
          Reviewdata,
          { headers: reviewHeader }
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
      <StatusBar backgroundColor={color.violet} />
      {/* <Header
        navigation={navigation}
        cart={() => navigation.navigate("CheckoutStack")}
      /> */}
      <View style={{ flex: 1, backgroundColor: color.background_color }}>
        <ScrollView bounces={false}>
          <ImageBackground
            style={{
              width: dimension.width,
              // marginTop: 20,
              backgroundColor: color.white,
              // paddingVertical: 20,
            }}
          >
            <ScrollView
              horizontal
              ref={scrollRef}
              onMomentumScrollEnd={setIndex}
              showsHorizontalScrollIndicator={false}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              pagingEnabled
            >
              {img.map((value, key) => (
                <View>
                  <Image
                    //   source={{ uri: `${value.url}` }}
                    source={{ uri: value.image }}
                    style={{
                      width: SIZES.width,
                      height: SIZES.height / 2.1,
                      resizeMode: "cover",
                      // borderRadius: 10,
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 30,
                alignSelf: "center",

                // backgroundColor: 'red',
              }}
            >
              {img.map((val, key) => (
                <Text
                  key={key}
                  style={[
                    key === selectedIndex
                      ? { color: color.primary_color }
                      : { color: "#fff" },
                    { fontSize: hp(1.5) },
                  ]}
                >
                  ⬤
                </Text>
              ))}
            </View>
          </ImageBackground>

          <View style={styles.headerView}>
            <View>
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
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => handleCheck()}
              >
                {productData.wishlist == 1 ? (
                  <Ionicons name="heart" color={color.text_primary} size={20} />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    color={color.text_primary}
                    size={20}
                  />
                )}
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

          {/* <BannerCarousel /> */}

          <View style={styles.petDetailView}>
            <View style={styles.ratingView}>
              <Entypo name="star" color={color.primary_color} size={20} />
              <Text style={styles.ratingTxt}>
                {" "}
                {productData.product_rating}
              </Text>
              <View style={styles.firstView}>
                <Text style={styles.breedNameTxt}>
                  {productData.product_breed}
                </Text>
                <Text style={styles.stockTxt}>In stock</Text>
              </View>
            </View>
            <View style={styles.secondView}>
              <View style={{ width: "70%" }}>
                <Text style={styles.petNameTxt}>
                  {productData.product_name}
                </Text>
              </View>

              <Text style={styles.priceTxt}>
                ${productData.product_sell_price}
              </Text>
            </View>

            <View style={styles.bornDtlView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={styles.dateView}>
                    <Text style={styles.dateTxt}>BORN:</Text>
                    <Text style={styles.dateTxt2}>
                      {" "}
                      {productData.product_born}
                    </Text>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.dateTxt}>LEAVE:</Text>
                    <Text style={styles.dateTxt2}>
                      {" "}
                      {productData.product_leave_date}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.cartBtn,
                    {
                      backgroundColor: reduxCart.cartId.includes(
                        productData.product_id
                      )
                        ? "#18A558"
                        : color.primary_color,
                    },
                  ]}
                  // onPress={() => navigation.navigate("CheckoutStack")}
                  onPress={processAddtoCart}
                >
                  {loading ? (
                    <View style={styles.cartBtn}>
                      <ActivityIndicator color={"white"} size={"small"} />
                    </View>
                  ) : (
                    <Ionicons
                      name="cart"
                      color={color.text_primary}
                      size={25}
                    />
                  )}
                </TouchableOpacity>
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
                // justifyContent: "space-around",
                // paddingRight: 10,
                justifyContent: "center",
              }}
            >
              {productData.health_checked == "1" ? (
                <PetDetail
                  img={require("../images/health.png")}
                  reportTxt={"HEALTH CHECKED"}
                  marginRight={wp(1.5)}
                />
              ) : (
                ""
              )}

              {productData.fci_department == "1" ? (
                <PetDetail
                  img={require("../images/dimond.png")}
                  reportTxt={"FCI DEPARTMENT"}
                  marginRight={wp(1.5)}
                />
              ) : (
                ""
              )}

              {productData.champion_bloodline == "1" ? (
                <PetDetail
                  img={require("../images/champion.png")}
                  reportTxt={"CHAMPION BLOODLINE"}
                />
              ) : (
                ""
              )}

              {productData.father_padigree == "1" ? (
                <PetDetail
                  img={require("../images/fatherpad.png")}
                  reportTxt={"FATHER’S PADIGREE"}
                  marginRight={wp(1.5)}
                />
              ) : (
                ""
              )}
              {productData.mother_padigree == "1" ? (
                <PetDetail
                  img={require("../images/motherpad.png")}
                  reportTxt={"MOTHER'S PADIGREE"}
                  marginRight={wp(1.5)}
                />
              ) : (
                ""
              )}
              {/* {productData.wishlist == "1" ? ( */}
              <PetDetail
                img={require("../images/heart.png")}
                reportTxt={"FAVOURITE"}
              />
              {/* ) : (
                ""
              )} */}
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
                  <Text style={styles.txt2}>Delivery</Text>
                </View>
              ) : (
                <View style={styles.payView2}>
                  <Text style={[styles.txt2, { color: color.light_grey }]}>
                    Delivery
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
              <Text style={styles.detailTxt}>{`${productData.delivery}`}</Text>
            </View>
          )}
          {selSection == "Reviews" && (
            <View style={styles.reviewMainView}>
              <View style={styles.starView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(1)}
                >
                  <Entypo
                    name={rating >= 1 ? "star" : "star-outlined"}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(2)}
                >
                  <Entypo
                    name={rating >= 2 ? "star" : "star-outlined"}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(3)}
                >
                  <Entypo
                    name={rating >= 3 ? "star" : "star-outlined"}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(4)}
                >
                  <Entypo
                    name={rating >= 4 ? "star" : "star-outlined"}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setRating(5)}
                >
                  <Entypo
                    name={rating >= 5 ? "star" : "star-outlined"}
                    size={30}
                    color={color.primary_color}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                  {/* <TextInput style={styles.input} placeholder="Name" /> */}

                  {/* <TextInput
                    iconName={"account"}
                    placeholder={"name"}
                    value={inputs.name}
                    // onChangeText={(email) => setEmail(email)}
                    onChangeText={(text) => handleOnchange(text, "name")}
                    onFocus={() => handleError(null, "name")}
                    error={errors.name}
                    style={styles.input_box}
                  /> */}
                  <Input2
                    value={inputs.name}
                    label={"Name"}
                    placeholder="Enter here"
                    error={errors.name}
                    onChangeText={(text) => handleOnchange(text, "name")}
                    onFocus={() => handleError(null, "name")}
                  />
                </View>
                <View style={styles.inputView2}>
                  {/* <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                  /> */}

                  <Input2
                    value={inputs.email}
                    label={"Email"}
                    placeholder="Enter here"
                    error={errors.email}
                    onFocus={() => handleError(null, "email")}
                    onChangeText={(text) => handleOnchange(text, "email")}
                  />
                </View>
              </View>
              <View style={styles.messageInputView}>
                <Input2
                  value={inputs.message}
                  label={"Message"}
                  placeholder="Enter here"
                  onChangeText={(text) => handleOnchange(text, "message")}
                  onFocus={() => handleError(null, "message")}
                  error={errors.message}
                  numberOfLines={4}
                  textAlignVertical={"top"}
                />
              </View>
              <View style={styles.btnView}>
                <VioletButton
                  buttonName={"SUBMIT"}
                  onPress={processAddEnquiry}
                  loading={loading}
                />
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bannerImg: {
    height: SIZES.height / 3,
    flex: 1,
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
  },
  cartSecView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
    // marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    height: hp(6),
    width: hp(6),
    borderRadius: hp(6) / 2,
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
    alignSelf: "center",
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
    minHeight: hp(10),
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
    // backgroundColor: "red",
  },
  inputView: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    width: SIZES.width / 2.9,
    // paddingHorizontal: 10,
    // borderRadius: 5,
    // backgroundColor: color.red,
  },
  input: {
    height: SIZES.height / 20,
  },
  inputView2: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    width: SIZES.width / 1.9,
    // paddingHorizontal: 10,
    // borderRadius: 5,
  },
  messageInputView: {
    // borderWidth: 0.5,
    // borderColor: color.black,
    marginHorizontal: SIZES.width / 20,
    // marginTop: 15,
    // paddingHorizontal: 10,
    // borderRadius: 5,
    marginTop: 10,
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

    paddingVertical: hp(1),
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: SIZES.h3,
    color: color.white,
    fontWeight: "bold",
  },
  input_box: {
    borderWidth: 2,
    borderColor: color.primary_color,
    borderRadius: 4,
    fontFamily: "SemiBold",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    reduxCart: state.cart,
    reduxWish: state.wish,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rdStoreCart: (newCart) => dispatch(storeCart(newCart)),
    rdStoreWish: (newWish) => dispatch(storeWish(newWish)),
    rdStoreFav: (newWish) => dispatch(storeOnSaleFav(newWish)),
    rdStoreRemove: (newWish) => dispatch(storeOnSaleRemove(newWish)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedScreen);
