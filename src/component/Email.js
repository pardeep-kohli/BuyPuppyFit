import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const Email = ({ icon, placeholder }) => {
  return (
    <View style={styles.TextBox}>
      <View style={styles.icon}>{icon}</View>
      <View style={{ paddingVertical:5,borderWidth:1,width:'80%'}}>
        <TextInput style={styles.Text} placeholder={placeholder} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TextBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 20,
    width:'100%',

    // justifyContent: "center",
    borderRadius: 8,
  },
  icon: {
    width:"12%",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "grey",
    justifyContent:'center',
  },
  Text: {
    
    paddingLeft: 10,
  },
});
export default Email;
