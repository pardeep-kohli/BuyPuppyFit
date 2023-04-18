import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function VioletButton({
  buttonName,
  onPress,
  loading = false,
  ...props
}) {
  return (
    <>
      {loading ? (
        <View
          style={{
            backgroundColor: color.primary_color,
            borderRadius: 6,
            paddingVertical: 12,
            // paddingHorizontal: 12,
            width: "100%",
          }}
          {...props}
        >
          <ActivityIndicator color={"white"} size={"small"} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={styles.button}
          activeOpacity={0.5}
        >
          <View>
            <Text
              style={{
                color: color.text_primary,
                fontFamily: "SegoeUIBold",
                fontSize: SIZES.h3,
              }}
            >
              {buttonName}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: color.primary_color,
    width: "100%",
  },
});
