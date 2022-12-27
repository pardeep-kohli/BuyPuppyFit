import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function UserInput({placeholder}) {
  return (
    <View style={styles.TextInput}>
    <TextInput placeholder={placeholder}/>
    </View>
  )
}
const styles = StyleSheet.create({
  TextInput:{
  borderWidth: 1,
  borderColor:'#9D9D9D',
  paddingHorizontal:20,
  paddingVertical:10,
  marginHorizontal: 25,
  borderRadius: 4,
  }
});