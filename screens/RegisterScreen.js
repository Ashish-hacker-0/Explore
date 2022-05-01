import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCode, setEmail } from '../Slices';
const height = Dimensions.get('screen').height;
const querystring = require('querystring');
import emailjs from 'emailjs-com';

const RegisterScreen = ({navigation}) => {

  const [number,setNumber] = useState(false);
  const insets = useSafeAreaInsets();
  const [input,setInput] = useState('');
  const hide = useRef(new Animated.Value(0)).current;
  const [err,setErr] = useState('');
  const dispatch = useDispatch();

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
    <View style={{paddingTop:insets.top,height:height}} >
      <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide}} >
        <Text style={{color:'white',textAlign:'center'}} >
          {err}
        </Text>
      </Animated.View>
       <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}} >
         <Icon
           name='account-circle'
           size={120}
         />
         <View style={{borderBottomColor:'gray',flexDirection:'row',alignSelf:'stretch',marginVertical:15}} >
           <TouchableOpacity onPress={()=>{}} style={{flex:1}} ><Text style={{color:number?'black':'gray',borderBottomWidth:number?2:1,borderBottomColor:number?'black':'gray',textAlign:'center',padding:number?10:10.5,fontWeight:'700'}} >PHONE</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=>setNumber(false)} style={{flex:1}}><Text style={{color:!number?'black':'gray',borderBottomWidth:!number?2:1,borderBottomColor:!number?'black':'gray',textAlign:'center',padding:!number?10:10.5,fontWeight:'700'}}>EMAIL</Text></TouchableOpacity>
         </View>
         {!number&&<TextInput placeholder='Email address' value={input} onChangeText={setInput}  style={{backgroundColor:'#efefef',alignSelf:'stretch',padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray',marginVertical:10}} />}
         {number&&<View style={{backgroundColor:'#efefef',alignSelf:'stretch',padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray',flexDirection:'row',alignItems:'center',marginVertical:10}}  ><Text style={{borderRightColor:'lightgray',borderRightWidth:1,paddingRight:2,marginRight:4,color:'gray',fontWeight:'700'}} >IN +91</Text>
         <TextInput placeholder='Phone Number' />
         </View>}
         <TouchableOpacity onPress={()=>{
           if(input==''){
              setErr('Please enter a email');
              login();
              return;
           }
           if(!input.includes('@')){
             setErr('Please enter a valid email');
             login();
             return;
           }
           fetch(`https://instagram-api-2.herokuapp.com/user/isUser`,{
             method:'Post',
             headers: {
                "Content-Type":"application/x-www-form-urlencoded",
              },
             body:querystring.stringify({
               email:input
             })
           })
           .then(res=>res.json())
           .then(data=>{
            if(data.success){
              setErr('An account with this email already exist.');
              login();
            }else{
              const code = Math.floor(100000 + Math.random() * 900000);
              console.log(code);
              const templateParams = {
                otp:code,
                email:input
              };
              emailjs.send('','',templateParams,'')
              .then(res=>{
                dispatch(setCode(code))
                dispatch(setEmail(input));
                navigation.navigate('Confirm');
              })    
              .catch(e=>{
                console.log(e);
                  setErr('Something went wrong!');
                  login();
              })
        
              
            }

           })
           .catch(err=>{
             setErr('Something went Wrong. Please try again after some time');
             login();
           })

         }} style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10}} ><Text style={{color:'white',textAlign:'center'}} >Next</Text></TouchableOpacity>
       </View>
       <View  style={{padding:15,borderTopColor:'lightgray',borderTopWidth:1,marginBottom:23}} >
          <TouchableOpacity onPress={()=>navigation.navigate('Login')} ><Text style={{textAlign:'center'}}>Already have an accout? Log in.</Text></TouchableOpacity>
       </View>
    </View>
  )
}

export default RegisterScreen;