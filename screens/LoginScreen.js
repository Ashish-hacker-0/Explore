import { View, Text, TextInput, TouchableOpacity, Dimensions, Animated, AsyncStorage } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const height = Dimensions.get('screen').height;
import { useFonts, Kaushan_Script } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setUsername } from '../Slices';
const querystring = require('querystring');
const LoginScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [id,setId] = useState('');
  const [pass,setPass] = useState('');
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    'Kaushan Script':require('../assets/KaushanScript-Regular.ttf'),
 });
 const [err,setErr] = useState('');
 const ref = useRef();

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

 const loginn = () => {
   setLoading(true);
    if(id==''){
      setErr('Please enter your username');
      login();
      return;
    }
    if(pass==''){
      setErr('Please enter your password');
      login();
      return;
    }
    fetch(`https://instagram-api-2.herokuapp.com/user/login`,{
      method:'Post',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:querystring.stringify({
        email:id,
        password:pass
      })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      if(data.auth){
        await AsyncStorage.setItem('token',data.token);
        dispatch(setUsername(data.username));
        dispatch(setIsLoggedIn(true));
        navigation.navigate('Tab');
        setLoading(false);
      }else{
        setErr(data.msg);
        login();
        setLoading(false);
      }
    })
 }

 const [secure,setSecure] = useState(true);

  if (!fontsLoaded) {
    return <AppLoading/>;
}
  return (
    <View style={{paddingTop:insets.top,height:height+insets.top,backgroundColor:'white'}} >
    <Animated.View style={{backgroundColor:'red',padding:10,opacity:hide}} >
      <Text style={{color:'white',textAlign:'center'}} >
        {err}
      </Text>
    </Animated.View>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <Text style={{fontFamily:'Kaushan Script',fontSize:50}} >Explore</Text>
        <TextInput value={id} onChangeText={setId} placeholder='Phone number, email or username' style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray'}} />
        <View  style={{backgroundColor:'#efefef',alignSelf:'stretch',margin:10,padding:10,borderRadius:5,borderWidth:1,borderColor:'lightgray',flexDirection:'row'}}  >
        <TextInput placeholder='Password' value={pass} onChangeText={setPass} secureTextEntry={secure} style={{flex:1}} />
        <Icon
          name={secure?'visibility-off':'visibility'}
          color={secure?'gray':'#728FCE'}
          onPress={()=>setSecure(!secure)}
        />
        </View>
        {!loading&&<TouchableOpacity ref={ref} disabled={id==''||pass==''}  style={{backgroundColor:(id==''||pass=='')?'#88a4e0':'#728FCE',alignSelf:'stretch',padding:15,margin:10,borderRadius:5}} onPress={()=>loginn()} ><Text style={{color:'white',textAlign:'center'}} >Log In</Text></TouchableOpacity>}
        {loading&&<TouchableOpacity ref={ref} disabled={id==''||pass==''}  style={{backgroundColor:(id==''||pass=='')?'#88a4e0':'#728FCE',alignSelf:'stretch',padding:15,margin:10,borderRadius:5}} onPress={()=>loginn()} ><Loading
          size={15}
          color={'white'}
        /></TouchableOpacity>}
        <TouchableOpacity><Text style={{color:'gray'}} onPress={()=>navigation.navigate('ForgotUser')} >Forgot your login details? Get Help</Text></TouchableOpacity>
      </View>
      
      <View style={{padding:15,borderTopColor:'lightgray',borderTopWidth:1,marginBottom:23}}>
        <TouchableOpacity><Text style={{textAlign:'center'}} onPress={()=>navigation.navigate('Register')} >Don't have an account? Sign up.</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;