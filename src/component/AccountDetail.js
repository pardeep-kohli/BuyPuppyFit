import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import color from "../assets/theme/color";
import { SIZES } from "../assets/theme/theme";

export default function AccountDetail({
  AccountHolderName,
  EmailId,
  PhoneNumber,
}) {
  return (
    <View>
      <View style={styles.parent}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            style={styles.image}
            source={require("../images/EditPage/profilePicture.png")}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={styles.Name}>{AccountHolderName}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 10 }}>{PhoneNumber}</Text>
            <Text
              style={{
                fontSize: SIZES.h4 - 1,
                color: color.black,
                fontWeight: "500",
              }}
            >
              {EmailId}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: hp(8),
    height: hp(8),
  },
  parent: {
    flexDirection: "row",
    marginHorizontal: 20,
    paddingTop: 15,
  },
  Name: {
    fontFamily: "Bold",
    fontSize: 15,
  },
});
