import { View, Text, StyleSheet, TextInput, Animated } from "react-native";
import React, { useState } from "react";
import color from "../../assets/theme/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Input2({
  label,
  iconName,
  error,
  password,
  compulsory,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={styles.inputView}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label_style}>{label}</Text>
        <View>{compulsory && <Text style={styles.star}>* </Text>}</View>
      </View>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? color.red
              : isFocused
              ? color.text_primary
              : color.grey,
          },
        ]}
      >
        <TextInput
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          autoCorrect={false}
          style={styles.input}
          secureTextEntry={hidePassword}
          {...props}
        />
        {password && (
          <View style={styles.eye_container}>
            <MaterialCommunityIcons
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword == false ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={hidePassword == false ? color.primary_color : color.grey}
            />
          </View>
        )}
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  inputView: {
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: hp(2),
    color: color.grey,
  },
  inputContainer: {
    backgroundColor: color.white,
    flexDirection: "row",
    borderWidth: 1.5,
    borderRadius: 8,
  },
  input: {
    color: color.violet,
    flex: 1,
    paddingHorizontal: 2,
    fontFamily: "Regular",
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 10,
  },
  error: {
    color: color.red,
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
  icon_container: {
    borderRightWidth: 1.5,
    borderColor: color.grey,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  eye_container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  label_style: {
    color: color.black,
    marginBottom: 5,
    fontFamily: "RubikRegular",
  },
  star: {
    color: color.red,
  },
});
