import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const height = Dimensions.get('screen').height;

const ForgotPass = () => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{paddingTop:insets.top*4,height:height,backgroundColor:'white'}} >
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >PASSWORD AND CONFIRM PASSWORD</Text>
        <TextInput placeholder='Password' style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TextInput placeholder='Confirm Password' secureTextEntry style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TouchableOpacity style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:10}} ><Text style={{color:'white',textAlign:'center'}} >Continue</Text></TouchableOpacity>
       </View>
     
      </View>
    )
}

export default ForgotPass