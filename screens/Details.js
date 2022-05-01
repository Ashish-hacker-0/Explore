import { View, Text, TextInput, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux';
import { setName, setPassword } from '../Slices';
const height = Dimensions.get('screen').height;
const Details = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const [name,setNamee] = useState('');
    const [password,setPasswordd] = useState('');
    const dispatch = useDispatch();
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
      <View style={{paddingTop:insets.top*4,height:height,backgroundColor:'white'}} >
      <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide}} >
        <Text style={{color:'white',textAlign:'center'}} >
          {err}
        </Text>
      </Animated.View>
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >NAME AND PASSWORD</Text>
        <TextInput placeholder='Name' value={name} onChangeText={setNamee} style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TextInput placeholder='Password' value={password} onChangeText={setPasswordd} secureTextEntry style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <TouchableOpacity onPress={()=>{
          if(name==''){
            setErr('Please Enter you name.');
            login();
            return;
          }
          if(password.length<8){
            setErr('Password should have atleast 8 characters.')
            login();
            return;
          }

            dispatch(setName(name));
            dispatch(setPassword(password));
            navigation.navigate('Birthday')
        }}  style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:10}} ><Text style={{color:'white',textAlign:'center'}} >Continue</Text></TouchableOpacity>
       </View>
     
      </View>
    )
}

export default Details