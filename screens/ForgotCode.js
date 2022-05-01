import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const height = Dimensions.get('screen').height;

const ForgotCode = ({navigation}) => {
    const insets = useSafeAreaInsets();

    return (
      <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >ENTER CONFIRMATION CODE</Text>
        <Text style={{textAlign:'center',paddingHorizontal:20}} >Enter the confirmation code we have sent to +91 9308787662</Text>
        <TextInput placeholder='Confirmation Code' style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:20,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:20}} ><Text style={{color:'white',textAlign:'center'}} >Next</Text></TouchableOpacity>
       </View>
     
      </View>
    )
}

export default ForgotCode