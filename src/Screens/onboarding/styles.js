import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import color from "../../assets/theme/color";
import { SIZES } from "../../assets/theme/theme";
const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  RoundedCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    borderColor: color.white,
    justifyContent: "center",
  },
  image: {
    height: SIZES.height / 2.3,
    width: SIZES.width / 1.2,
    borderWidth:5,
    borderColor:color.white,
    borderRadius:20
  },
  headingView: {
    marginTop: SIZES.height / 16,
    paddingHorizontal: SIZES.width / 16,
    
  },
  text: {
    color: color.text_primary,
    fontSize: hp(3),
    fontFamily: "SegoeSemiBold",
  },
  desView: {
    marginTop: SIZES.height / 36,
    paddingHorizontal: SIZES.width / 16,
  },
  DescriptionText: {
    fontSize: hp(2.5),
    fontFamily: "RobotoRegular",
    textAlign: "justify",
    color: color.white,
  },
});
export default styles;