import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function InputBox({ label, star, ...props }) {
  return (
    <View>
      <Text style={{paddingBottom:10}}> 
        <Text>{label}</Text>
        <Text style={{ color: "red" }}>{star}</Text>
      </Text>
      <View style={styles.TextStyle}>
        <TextInput style={{ paddingHorizontal: 10 }} {...props} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TextStyle: {
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 5,
    marginBottom: 10,
  },
});
