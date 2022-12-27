import { View, Text, StatusBar,StyleSheet ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import color from '../theme/color'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import {FontAwesome } from '@expo/vector-icons';
import Header from "../component/Header"
import AccountDetail from "../component/AccountDetail"
import Heading from '../component/Heading';
export default function Account() {
  return (
    <View>
   <StatusBar  backgroundColor={color.violet}/>
   <ScrollView>
<Header/>
 <AccountDetail
AccountHolderName={"deepak"}
 EmailId={"deepak@gmail.com"}/> 

   <Heading HeadLine="MY ACCOUNT" />
   <View style={styles.Address}>
   <Entypo  name="home" size={24} color="black" />
   <View>
    <Text>Manage Address</Text>
   </View>
   <TouchableOpacity>
   <FontAwesome name="angle-right" size={24} color="black" />
   </TouchableOpacity>
   </View>
   </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
  Address:{
    flexDirection:'row',
    
    marginHorizontal:10,

  }
})