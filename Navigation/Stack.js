import { View, Text, AsyncStorage } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from '../Navigation/Tab';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Profile from '../screens/Profile';
import SearchResult from '../screens/SearchResult';
import Setting from '../screens/Setting';
import Edit from '../screens/Edit';
import Confirmation from '../screens/Confirmation';
import Details from '../screens/Details';
import Birthday from '../screens/Birthday';
import Username from '../screens/Username';
import NewPost from '../screens/NewPost';
import UProfile from '../screens/UserProfile';
import Post from '../screens/Post';
import Story from '../screens/Story';
import { store } from '../store';
import { Provider, useDispatch, useSelector } from 'react-redux';

import ForgotUsername from '../screens/ForgotUsername';
import ForgotCode from '../screens/ForgotCode';
import ForgotPass from '../screens/ForgotPass';
import { getIsLogged, setIsLoggedIn, setUsername } from '../Slices';
import Comment from '../screens/Comment';

const Stack = () => {
    const Stack = createNativeStackNavigator();
    const [login,setLogin] = useState(false);
    const isLogin  =  useSelector(getIsLogged);
    const dispatch = useDispatch();
    useEffect(()=>{
       AsyncStorage.getItem('token')
       .then(res=>{
           if(res){
               dispatch(setIsLoggedIn(true));
                fetch(`https://instagram-api-2.herokuapp.com/user/getProfile`,{
                    headers:{
                    'authorization':`Bearer ${res}`
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                   console.log(data);
                    dispatch(setUsername(data.details.username));
                })
           }
       })
    },[])
    useEffect(()=>{
        setLogin(isLogin);
    },[isLogin])

    return (
        <Stack.Navigator
            screenOptions={{
            headerShown:false,
            
            }}
        >
            {!login&&<Stack.Screen name="Login" component={LoginScreen} />}
            <Stack.Screen name="Tab" component={Tab} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="ForgotCode" component={ForgotCode} />
            <Stack.Screen name="ForgotUser" component={ForgotUsername} />
            <Stack.Screen name="Story" component={Story} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="UserProfile" component={UProfile} />
            <Stack.Screen name="newpost" component={NewPost} />
            <Stack.Screen name="Username" component={Username} />
            <Stack.Screen name="Birthday" component={Birthday} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Confirm" component={Confirmation} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Result" component={SearchResult} />
            <Stack.Screen name="setting" component={Setting} />
            <Stack.Screen name="edit" component={Edit} />
            <Stack.Screen name="Comment" component={Comment} />


        </Stack.Navigator>
    )
}

export default Stack