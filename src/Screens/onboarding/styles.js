import {Dimensions, StyleSheet} from 'react-native';
import color from '../../assets/theme/color';
const {height, width} = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../assets/theme/theme';
const styles = StyleSheet.create({
  blue_background: {
    width: width,
    height: height / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deal: {
    height: hp(50),
    width: hp(50),
    marginTop: hp(4),
  },

  skip_button: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  skip_text: {
    fontSize: 16,
    color: color.black,
    fontFamily: 'SemiBold',
  },
  onboard_img: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_container: {
    marginTop: hp(10),
  },
  subHead: {
    fontSize: hp(3),
    fontFamily: FONTS.primarytext3,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: color.black,
  },
  sub_title: {
    fontSize: 18,
    fontFamily: FONTS.primarytext4,
    color: color.black,
  },
  head: {
    fontSize: hp(3),
    textTransform: 'uppercase',
    fontFamily: FONTS.primarytext2,
    color: color.blue,
    marginVertical: hp(1),
    letterSpacing: 3,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default styles;
