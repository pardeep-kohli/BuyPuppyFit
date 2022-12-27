import { View, Text } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
export default function ReviewTab() {
  return (
    <View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    <View>
    <Entypo name="star" size={24} color="grey" />
    </View>
      <View>
      <Entypo name="star" size={24} color="grey" />
      </View>
        <View>
        <Entypo name="star" size={24} color="grey" />
        </View>
          <View>
          <Entypo name="star" size={24} color="grey" />
          </View>
          </View>
          <View styles={{borderWidth:1,paddingVertical:10}}>
            <TextInput placeholder='Name'/>
          </View>
          <View styles={{borderWidth:1,paddingVertical:10}}>
            <TextInput placeholder='Email'/>
          </View>
          <View styles={{borderWidth:1,paddingVertical:10}}>
            <TextInput placeholder='Message'/>
          </View>
          </View>
  )
}