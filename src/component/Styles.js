import { StyleSheet } from "react-native";
import color from "../assets/theme/color";
import { FONTS } from "../assets/theme/theme";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 5,
    width: "100%",
    borderWidth: 0.8,
    borderColor: color.gray,
    backgroundColor: color.white,
  },
  label_text: {
    // color: color.black,
    // fontSize: 13,
    fontFamily: FONTS.Rubik_medium,
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
    fontFamily: "Montserrat-Medium",
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

export { styles };
