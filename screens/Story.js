import { View, Text, PanResponder, Image, Dimensions, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Story = ({navigation}) => {

    
    const insets = useSafeAreaInsets();
    const [opacity,setOpacity] = useState(1);
    const [y,setY] = useState(0);

    const widths = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.timing(widths,{
            toValue:width-20,
            duration:15000
        }).start();

        setTimeout(()=>{
           navigation.goBack();
        },15000);
    },[])

    const panResponder = React.useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    
          onPanResponderGrant: (evt, gestureState) => {
            
            
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
              setY(gestureState.dy);
              
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
            if(gestureState.dy<200){
                setY(0);
                setOpacity(1);
            }else{
                navigation.goBack();
            }


            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
          },
          onPanResponderTerminate: (evt, gestureState) => {

            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {

            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        })
      ).current;

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{paddingTop:insets.top,height:height,width:width,backgroundColor:'black',position:'absolute',zIndex:1001,opacity:opacity,marginTop:y}} >

    
    <View style={{position:'absolute',top:insets.top+3,zIndex:100,width:width,padding:10}}  >
        <View style={{width:width-20}} >
           <Animated.View style={{borderWidth:1,borderColor:'white',width:widths,position:'absolute',zIndex:100}} >

           </Animated.View>
           <View style={{borderWidth:1,color:'lightgray',width:'100%'}} >

           </View>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:5}} >
        <Image
            source={{
                uri:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }}
            style={{height:40,width:40,borderRadius:20}}
           
        />
        <Text style={{color:'white',fontWeight:'700',padding:10,fontSize:12}} >Name</Text>
        </View>
    </View>
    <View style={{flex:1,paddingVertical:0}}   {...panResponder.panHandlers}   >
        <Image
            source={{
                uri:'https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg'
            }}
            style={{flex:1}}
        />
    </View>
    <View style={{width:width,flexDirection:'row',padding:15,alignItems:'center'}} >
        <TextInput
            placeholder='Send Message'
            placeholderTextColor={'white'}
            style={{flex:1,color:'white',borderWidth:1,borderColor:'white',margin:5,padding:5,borderRadius:20,paddingHorizontal:15}}
        />
        <Icon
            name="paper-plane"
            type='font-awesome'
            color={'white'}
        />
    </View>
</KeyboardAvoidingView>
  )
}

export default Story