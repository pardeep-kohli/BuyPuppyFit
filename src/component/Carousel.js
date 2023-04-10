import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import color from "../assets/theme/color";
import axios from "axios";
import * as qs from "qs";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Carousel() {
  const [dimension, setDimension] = useState(Dimensions.get("window"));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [img, setImg] = useState([]);

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

  var homeHeader = new Headers();
  homeHeader.append("accept", "application/json");
  homeHeader.append("Content-Type", "application/x-www-form-urlencoded");
  homeHeader.append("Cookie", "PHPSESSID=vlr3nr52586op1m8ie625ror6b");

  // var HomeData = new FormData();
  // HomeData.append("gethomepage", "1");
  // HomeData.append("lang_id", "1");
  var HomeData = qs.stringify({
    gethomepage: "1",
    lang_id: "1",
  });

  useEffect(() => {
    axios
      .post("https://codewraps.in/beypuppy/appdata/webservice.php", HomeData, {
        headers: homeHeader,
      })
      .then(function (response) {
        if (response.data.success == 1) {
          setImg(response.data.data.banner);
        } else {
          console.log("api not call");
        }
      });
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

  return (
    <ImageBackground
      style={{
        width: dimension.width,
        // marginTop: 20,
        backgroundColor: color.white,
        paddingVertical: 20,
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
          <View style={{ marginHorizontal: 10 }}>
            <Image
              //   source={{ uri: `${value.url}` }}
              source={{ uri: value.image }}
              style={{
                width: dimension.width - 20,
                height: dimension.width / 3.2,
                resizeMode: "cover",
                borderRadius: 10,
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
            style={
              [key === selectedIndex
                ? { color: color.primary_color }
                : { color: "#fff" },styles.key]
            }
          >
            ⬤
          </Text>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  key:{
    fontSize:hp(1)
  }
});
