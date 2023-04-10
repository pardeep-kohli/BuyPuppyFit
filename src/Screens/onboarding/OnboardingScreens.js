import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import { MotiView } from "moti";
import Swiper from "react-native-swiper";
import Next_Button from "../../component/buttons/Next_Button";

import { Screen1, Screen2, Screen3 } from "./";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../../assets/theme/color";
import { FONTS } from "../../assets/theme/theme";
import Previous_Button from "../../component/buttons/Previous_button";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const renderPagination = (index, total, context) => {
  return (
    <>
      <View style={styles.paginationStyle}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <MotiView
            animate={{
              backgroundColor: index === 0 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
          <MotiView
            animate={{
              backgroundColor: index === 1 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
          <MotiView
            animate={{
              backgroundColor: index === 2 ? color.text_primary : color.white,
            }}
            transition={{ duration: 80 }}
            style={[styles.dots]}
          />
        </View>
      </View>
    </>
  );
};

export default class OnboardingScreens extends Component {
  constructor(props) {
    super(props);
    this.onPressNext = this.onPressNext.bind(this);
    this.state = {
      idxActive: 0,
    };
  }

  onPressPrev = () => {
    const { idxActive } = this.state;
    if (idxActive > 0) {
      this.refs.swiper.scrollBy(-1);
    }
  };

  onPressNext = () => {
    const { idxActive } = this.state;
    // Probably best set as a constant somewhere vs a hardcoded 5
    if (idxActive == 2) {
      this.props.navigation.replace("SignUp");
    }
    if (idxActive < 2) {
      this.refs.swiper.scrollBy(+1);
    }
  };

  render() {
    console.log(this.state.idxActive);
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: hp(2),
            backgroundColor: color.primary_color,
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: color.white,
              height: hp(3.5),
              width: hp(3.5),
              justifyContent: "center",
              borderRadius: hp(3) / 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(1.8),
                alignSelf: "center",
                color: color.white,
                justifyContent: "center",
                fontFamily: "Bold",
              }}
            >
              {this.state.idxActive + 1}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.skip_button}
            onPress={() => this.props.navigation.replace("SignUp")}
          >
            <View>
              {this.state.idxActive < 1 && (
                <Text style={styles.skip_text}>Skip </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.skip_button}
          onPress={() => this.props.navigation.replace("SignUp")}
        >
          <View>
            {this.state.idxActive < 3 && (
              <Text style={styles.skip_text}>Skip </Text>
            )}
          </View>
        </TouchableOpacity> */}
        <Swiper
          style={styles.wrapper}
          renderPagination={renderPagination}
          onIndexChanged={(idxActive) => this.setState({ idxActive })}
          showsButtons={false}
          loop={false}
          ref={"swiper"}
        >
          <Screen1 />
          <Screen2 />
          <Screen3 />
        </Swiper>
        <View style={[styles.buttoncontainer2]}>
          <Previous_Button onPress={this.onPressPrev} title="previous" />
        </View>
        <View style={styles.buttoncontainer}>
          <Next_Button
            onPress={this.onPressNext}
            title={this.state.idxActive < 2 ? "Next" : "Done"}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: color.white,
  },
  buttoncontainer: {
    position: "absolute",
    bottom: hp(5),
    right: 20,
    backgroundColor: "transparent",
  },
  buttoncontainer2: {
    position: "absolute",
    bottom: hp(5),
    left: 20,
    backgroundColor: "transparent",
  },
  dots: {
    width: hp(2),
    height: hp(2),
    borderRadius: hp(2.5) / 2.0,
    marginRight: 5,
    borderWidth: 1,
    borderColor: color.primary_color,
    left: 10,
    top: 5,
  },
  skip_button: {
    // position: "absolute",
    // right: 20,
    // top: 30,
    zIndex: 1,
    // alignSelf:'flex-end'
    justifyContent: "center",
  },
  skip_text: {
    fontSize: hp(1.8),
    color: color.white,
    fontFamily: "Bold",
  },
  paginationStyle: {
    position: "absolute",
    bottom: hp(7),
    left: "40%",
    alignItems: "center",
  },
  // wrapper: {
  //   backgroundColor: "red",
  //   flex: 1,
  // },
});
