import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SmallButton({ButtonName}) {
  return (
    <TouchableOpacity> 
    <View style={styles.buttonView}>
     <Text style={styles.text}>{ButtonName}</Text>
    </View>
    </TouchableOpacity>

  )
}
const styles=StyleSheet.create({
    text:{
        Fontfamily:'Bold',
    },
    buttonView:{
        
    }
})