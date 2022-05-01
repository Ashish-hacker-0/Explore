import { View, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Loading = ({size,color}) => {

    const rotate = useRef(new Animated.Value(0)).current;

    console.log(size);

    useEffect(()=>{
         runAnimation();
    },[])

    const runAnimation = ()=> {
        rotate.setValue(0);
        Animated.timing(rotate, {
          toValue: 1,
          duration: 1500,
          useNativeDriver:true,
          easing: Easing.linear


        }).start(() => runAnimation());
    }

    const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })
  return (
    <View style={{alignItems:'center'}} >
      <Animated.View style={{height:size?size:40,width:size?size:40,borderRadius:size?size/2:20,borderWidth:1,borderTopWidth:0,borderLeftWidth:0,borderColor:color?color:'black',transform:[{
          rotateZ:spin
      }]}} >
          
      </Animated.View>
    </View>
  )
}

export default Loading;