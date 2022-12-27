import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { MotiView } from "moti";
import Swiper from "react-native-swiper";
import Next_Button from "../../components/buttons/Next_Button";

import { Screen1, Screen2, Screen3 } from "./";
const { height, width } = Dimensions.get("window");
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import color from "../../assets/theme/color";

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      {/* <Text style={{ color: "grey" }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text> */}
       <View
            style={{
              position: "absolute",
              left: 20,
              bottom: 20,
              flexDirection: "row",
            }}
          >
            <View
              style={[
                styles.dots,
                { backgroundColor: index == 0 ? "yellow" : "green" },
              ]}
            ></View>
            <View style={styles.dots}></View>
            <View style={styles.dots}></View>
          </View>
    </View>
  );
};

export default class Test extends Component {
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
    if (idxActive == 4) {
      Alert.alert("last Page");
    }
    if (idxActive < 5) {
      this.refs.swiper.scrollBy(+1);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.skip_button}
          onPress={() => Alert.alert("hello guys")}
        >
          <View>
            <Text style={styles.skip_text}>Skip </Text>
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

        <View style={styles.buttoncontainer}>
          {/* <Button
            onPress={this.onPressPrev}
            title="previous">
          </Button> */}
         

          <Next_Button onPress={this.onPressNext} title="next"></Next_Button>
        </View>
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
    width: hp(2.5),
    height: hp(2.5),
    backgroundColor: "red",
    borderRadius: hp(2.5) / 2.0,
    marginRight: 5,
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
    color: color.black,
    fontFamily: "Medium",
  },
});
