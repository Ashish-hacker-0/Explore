import { View, Text, ScrollView, Dimensions, TouchableWithoutFeedback,Animated, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
import { Video, AVPlaybackStatus } from 'expo-av';
import { Icon } from '@rneui/base';

const ReelsScreen = ({navigation,route}) => {

  const playerRef = useRef();

  const [heart,setHeart] = useState(0);
  const size = useRef(new Animated.Value(0)).current;
  const reel = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('Leaving Home Screen');
      setMute(true); 

      // new code add to pause video from ref
      playerRef.current.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  const [current,setCurrent] = useState(0);
  const [mute,setMute] = useState(false);
  const scroll = useRef();
  const [data,setData] = useState([]);

  useEffect(()=>{
      if(route.params?.reels){
        setData(route.params.reels);
      }else{
        fetch(`https://instagram-api-2.herokuapp.com/post/getreel`)
        .then(res=>res.json())
        .then(data=>{
          console.log('data',data);
          setData(data);
        })
      }

  },[])

  return (
    <ScrollView 
    ref={scroll}
    
     scrollToOverflowEnabled={false}
     onScrollAnimationEnd={(e)=>{
       console.log(e);
     }}
     onScrollEndDrag={({nativeEvent})=>{
      console.log(nativeEvent.contentOffset.y);
      if(nativeEvent.contentOffset.y<height*current){
        scroll.current.scrollTo({
          y:(height-50)*(current-1),
          animated:true
        })
        setCurrent(current-1);
        return;
      }
      if(nativeEvent.contentOffset.y%height>height/2){
        console.log('yes');
        scroll.current.scrollTo({
          y:(height-50)*(current+1),
          animated:true
        })
        setCurrent(current+1);

      }else{
        console.log('no');
        scroll.current.scrollTo({
          y:(height-50)*current,
          animated:true
        })
      }
    }}>
     {data.map((i,index)=>{
      return(
        <TouchableWithoutFeedback 
        onLongPress={()=>{
          Animated.timing(reel,{
            toValue:1,
            duration:0
        }).start();
        Animated.timing(reel,{
            toValue:0,
            duration:3000
        }).start();
        }}
        onPress={()=>{
          setMute(!mute);
         Animated.timing(size,{
            toValue:1,
            duration:0
        }).start();
        Animated.timing(size,{
            toValue:0,
            duration:3000
        }).start();
        }}  >
         <View>
          
          <Video
          ref={playerRef}
            source={{
              uri:i.post
            }}
            style={{
              height:height-70,
              width:width,
              alignSelf:'stretch'
            }}
            resizeMode="cover"
            shouldPlay={current==index}
            isLooping
            isMuted={mute}
          />
          <View style={{position:'absolute',bottom:10,flexDirection:'row',alignItems:'flex-end',padding:15}} >
             <View style={{flex:1}} >
               <View style={{flexDirection:'row',alignItems:'center'}} >
                 <Image
                    source={{
                      uri:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    }}
                    style={{height:30,width:30,borderRadius:35}}
                 />
                 <Text style={{color:'white',fontWeight:'700',margin:5}} >{i.username}</Text>
               </View>
               <Text style={{color:'white',marginTop:10}}>{i.desc}</Text>
             </View>
             <View style={{alignItems:'center'}} >
               <Icon
                 name="favorite"
                 color={'white'}
                 size={30}
                 solid={false}
               />
               <Text style={{color:'white',fontWeight:'700',fontSize:12,marginVertical:10}}>{i.likes.length}</Text>
               <Icon
                 name="comment"
                 type='font-awesome'
                 size={30}
                 color={'white'}

               />
               <Text style={{color:'white',fontWeight:'700',fontSize:12,marginVertical:10}}>{i.comments.length}</Text>
               <Icon
                 name="paper-plane"
                 type='font-awesome'
                 size={30}
                 color={'white'}

               />
             </View>
          </View>
          <Animated.View style={{position:'absolute',flex:1,alignItems:'center',width:'100%',height:'100%',justifyContent:'center',opacity:size}}>
              <Icon
                  name={mute?'volume-off':'volume-up'}
                  color={'white'}
                  size={50}
                  style={{backgroundColor:'rgba(0,0,0,0.4)',padding:10,borderRadius:50}}

              />
          </Animated.View>
          <Animated.View style={{position:'absolute',flex:1,alignItems:'center',width:'100%',height:'100%',justifyContent:'center',opacity:reel}}>
              <Icon
                  name='favorite'
                  color={'white'}
                  size={80}

              />
          </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )
    })}
    
      
    </ScrollView>
  )
}

export default ReelsScreen