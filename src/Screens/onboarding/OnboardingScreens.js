import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from "react-native";
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

const renderPagination = (index, total, context) => {
  return (
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
      this.props.navigation.replace("Login");
    }
    if (idxActive < 2) {
      this.refs.swiper.scrollBy(+1);
    }
  };

  render() {
    console.log(this.state.idxActive);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.skip_button}
          onPress={() => this.props.navigation.replace("Login")}
        >
          <View>
            {this.state.idxActive < 3 && (
              <Text style={styles.skip_text}>Skip </Text>
            )}
          </View>
        </TouchableOpacity>
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

        {/* <View style={styles.buttoncontainer}>
          <Button onPress={this.onPressPrev} title="previous"></Button>

          <Next_Button onPress={this.onPressNext} title="next" />
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  buttoncontainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  dots: {
    width: hp(2),
    height: hp(2),
    borderRadius: hp(2.5) / 2.0,
    marginRight: 5,
    borderWidth: 1,
    borderColor: color.primary_color,
  },
  skip_button: {
    position: "absolute",
    right: 20,
    top: 30,
    zIndex: 1,
    // alignSelf:'flex-end'
  },
  skip_text: {
    fontSize: 16,
    color: color.white,
    fontFamily: FONTS.primarytext1,
  },
  paginationStyle: {
    // position: "absolute",
    bottom: 70,
    alignItems: "center",
    justifyContent: "center",
    // left: 20,
  },
});
