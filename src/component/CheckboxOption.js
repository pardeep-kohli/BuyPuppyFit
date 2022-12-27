import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from './Checkbox'

export default function CheckboxOption({OptionName}) {
  return (
    <View style={styles.parent}>
    <View>
   <CheckBox/>
   </View>
   <View>
   <Text>{OptionName}</Text>
   </View>
    </View>
  )
}
const styles=StyleSheet.create({

})