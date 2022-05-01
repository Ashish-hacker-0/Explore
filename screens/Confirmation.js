import { View, Text, TextInput, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux';
import { getDetails } from '../Slices';
const height = Dimensions.get('screen').height;
const Confirmation = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const email = useSelector(getDetails);
  console.log(email);
  const [code,setCode] = useState('');
  const [err,setErr] = useState('');
  const hide = useRef(new Animated.Value(0)).current;

  const login = () => {
    Animated.timing(hide,{
      toValue:1,
      duration:0
    }).start();
 
    Animated.timing(hide,{
      toValue:0,
      duration:5000
    }).start();
  }
  return (
    <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
     <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide,position:'absolute',top:0}} >
        <Text style={{color:'white',textAlign:'center'}} >
          {err}
        </Text>
      </Animated.View>
    <View style={{flex:1}} >
    <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >ENTER CONFIRMATION CODE</Text>
      <Text style={{textAlign:'center',paddingHorizontal:20}} >Enter the confirmation code we have sent to {email.email}</Text>
      <TextInput placeholder='Confirmation Code' value={code} onChangeText={setCode} keyboardType="decimal-pad" style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:20,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
      <TouchableOpacity onPress={()=>{
        if(code==email.code){
          navigation.navigate('Details')
        }else{
          setErr('Incorrect Code. Please try again.');
          login();
        }
        
        }} style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:20}} ><Text style={{color:'white',textAlign:'center'}} >Next</Text></TouchableOpacity>
     </View>
     <View  style={{padding:15,borderTopColor:'lightgray',borderTopWidth:1,marginBottom:23}} >
          <TouchableOpacity><Text style={{textAlign:'center'}}>Already have an accout? Log in.</Text></TouchableOpacity>
       </View>
    </View>
  )
}

export default Confirmation;