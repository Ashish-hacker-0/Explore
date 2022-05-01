import { View } from 'react-native'
import React from 'react'
import {  } from 'expo-linear-gradient';
import Svg, {
  LinearGradient,
  Text,
  Defs,
  Stop,
  TSpan
} from 'react-native-svg';
const NotificationScreen = () => {
  return (
    <Svg viewBox="0 0 300 300" height="300"
             width="300">
          <Defs>
            <LinearGradient  id="rainbow" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
              
            </LinearGradient>
          </Defs>
            
            <TSpan fill="url(#rainbow)" fonSize="72" x="0" dy="72">text</TSpan>
            <TSpan fonSize="72" x="0" dy="72">all up in here</TSpan>
        </Svg>
  )
}

export default NotificationScreen;