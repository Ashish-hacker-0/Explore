import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import SearchScren from '../screens/SearchScren';
import ReelsScreen from '../screens/ReelsScreen';
import Profile from '../screens/Profile';
import NotificationScreen from '../screens/NotificationScreen';
import { BlurView } from 'expo-blur';
import { Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = () => {

    const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      screenOptions={
        {
          headerShown:false,
          tabBarStyle:{
             backgroundColor:'white'
          }
        }
      }
     
       
    >
        <BottomTab.Screen name='Home' component={HomeScreen} options={
          {tabBarIcon:({focused})=>{
            return(focused?<LinearGradient colors={['red','yellow']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}} >
                <Icon
                  name="home"
                  color={'white'}

                />
              </LinearGradient>:
                <Icon
                name="home"
                color={'black'}

                />)
          },
          tabBarShowLabel:false
          }

        } />
        <BottomTab.Screen name='Search' component={SearchScren}  options={
          {tabBarIcon:({focused})=>{
            return(focused?<LinearGradient colors={['red','yellow']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}} >
                <Icon
                  name="search"
                  color={'white'}

                />
              </LinearGradient>:
                <Icon
                name="search"
                color={'black'}

                />)
             
          },
          tabBarShowLabel:false
          }

        }  />
        <BottomTab.Screen name='Reels' component={ReelsScreen}  options={
          {tabBarIcon:({focused})=>{
            return(focused?<LinearGradient colors={['red','yellow']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}} >
                <Icon
                  name="subscriptions"
                  color={'white'}

                />
              </LinearGradient>:
                <Icon
                name="subscriptions"
                color={'black'}

                />)
          
          },
          tabBarShowLabel:false
          }

        } />
        {/* <BottomTab.Screen name='Notification' component={NotificationScreen} options={
          {tabBarIcon:({focused})=>{
            return(focused?<LinearGradient colors={['red','yellow']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}} >
                <Icon
                  name="notifications"
                  color={'white'}

                />
              </LinearGradient>:
                <Icon
                name="notifications"
                color={'black'}

                />)
           
          },
          tabBarShowLabel:false
          }

        }  /> */}
        <BottomTab.Screen name='Profile' component={Profile} options={
          {tabBarIcon:({focused})=>{
            return(focused?<LinearGradient colors={['red','yellow']} style={{height:30,width:30,borderRadius:15,justifyContent:'center',alignItems:'center'}} >
                <Icon
                  name="person"
                  color={'white'}

                />
              </LinearGradient>:
                <Icon
                name="person"
                color={'black'}

                />)
           
          },
          tabBarShowLabel:false
          }

        }  />
    </BottomTab.Navigator>
  )
}

export default Tab