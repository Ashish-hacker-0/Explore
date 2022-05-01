import { View, Text, TextInput, TouchableOpacity, Dimensions, Animated, AsyncStorage } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, getUser, login, setIsLoggedIn } from '../Slices';
const height = Dimensions.get('screen').height;
const  querystring  = require('querystring');

const Username = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const user = useSelector(getDetails);
    const [username,setUsername] = useState('');

    const [err,setErr] = useState('');
    const hide = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
  
    const loginn = () => {
      Animated.timing(hide,{
        toValue:1,
        duration:0
      }).start();
   
      Animated.timing(hide,{
        toValue:0,
        duration:5000
      }).start();
    }

    const register = () => {
      console.log(user);
        if(username!=''){
          fetch(`https://instagram-api-2.herokuapp.com/user/usernameAvai`,{
            method:'Post',
            headers: {
               "Content-Type":"application/x-www-form-urlencoded",
             },
            body:querystring.stringify({
              username:username
            })
          })
          .then(res=>res.json())
          .then(data=>{
           if(data.success){
             setErr('This username is not available. Please try a different one.');
             loginn();
           }else{
              fetch(`https://instagram-api-2.herokuapp.com/user/register`,{
                method:'Post',
                headers: {
                  "Content-Type":"application/x-www-form-urlencoded",
                },
                body:querystring.stringify({
                  name:user.name,
                  username:username,
                  email:user.email,
                  password:user.password,
                  dob:user.dob
                })
              })
              .then(res=>res.json())
              .then(data=>{
                if(data.auth){
                  setErr('Something Went wrong. Please try again.');
                  loginn();
                }else{
                  console.log(data);
                    AsyncStorage.setItem('token',data.token);
                    dispatch(setIsLoggedIn(true));
                    dispatch(login(username));
                    navigation.navigate('Tab');
                }
              })
              .catch(err=>{
                setErr('Something Went wrong. Please try again.');
                loginn();
              })
           }
          })
        }else{
          setErr('Please choose a username');
          loginn();
        }
    }

    return (
      <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
       <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide}} >
        <Text style={{color:'white',textAlign:'center'}} >
          {err}
        </Text>
      </Animated.View>
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',padding:10,fontWeight:'700'}} >CHOOSE USERNAME</Text>
        <Text style={{textAlign:'center',paddingHorizontal:20}} >Pick username for your account. You can always change it later.</Text>
        <TextInput placeholder='username' style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:20,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} value={username} onChangeText={setUsername} />
        <TouchableOpacity onPress={()=>register()} style={{alignSelf:'stretch',backgroundColor:'#728FCE',padding:15,borderRadius:10,marginHorizontal:20}} ><Text style={{color:'white',textAlign:'center'}} >Next</Text></TouchableOpacity>
       </View>
       
      </View>
    )
}

export default Username