import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const height = Dimensions.get('screen').height;

const ForgotUsername = ({navigation}) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >FIND YOUR ACCOUNT</Text>
        <Text style={{textAlign:'center',paddingHorizontal:20}} >Enter the username or the email linked to your account.</Text>
        <TextInput placeholder='username or email' style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:20,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotCode')} style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:20}} ><Text style={{color:'white',textAlign:'center'}} >Next</Text></TouchableOpacity>
       </View>
      </View>
  )
}

export default ForgotUsername