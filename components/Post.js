import { View, Text, Image, TouchableWithoutFeedback, Animated, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@rneui/base';
const height = Dimensions.get('screen').height;
import { Video } from 'expo-av';
const width = Dimensions.get('screen').width;
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import {useSelector} from 'react-redux';
import { getUsername } from '../Slices';
const querystring = require('querystring');
const Post = ({item,navigation}) => {
    const size = useRef(new Animated.Value(0)).current;
    const [mute,setMute] = useState(true);
    const username = useSelector(getUsername);
    const [liked,setLiked] = useState(false);

    useEffect(()=>{
        console.log(item.likes,username);
       setLiked(item.likes.find(i=>i.username==username));
    },[])

    const like = () => {
        Animated.timing(size,{
            toValue:1,
            duration:0
        }).start();
        Animated.timing(size,{
            toValue:0,
            duration:6000
        }).start();
    if(liked){
        AsyncStorage.getItem('token')
        .then(res=>{
            if(res){
                fetch(`https://instagram-api-2.herokuapp.com/post/unlike`,{
                    method:'Post',
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded",
                    },
                    body:querystring.stringify({
                        auth_token:res,
                        id:item._id
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.success){
                     console.log(data);
                     setLiked(false);
                   }
                 })
    
                .catch(err=>{
                    console.log(err);
                })
            }
            });
    }else{
    AsyncStorage.getItem('token')
    .then(res=>{
        if(res){
            fetch(`https://instagram-api-2.herokuapp.com/post/like`,{
                method:'Post',
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded",
                },
                body:querystring.stringify({
                    auth_token:res,
                    id:item._id
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.success){
                 console.log(data);
                 setLiked(true);
               }
             })

            .catch(err=>{
                console.log(err);
            })
        }
        });
    }

    }
  return (
    <View style={{height:height/1.3,width:width}} >
                <View style={{flexDirection:'row',alignItems:'center',borderBottomColor:'lightgray',padding:3}} >
                    {item.image!=''&&item.image&&<Image
                        source={{
                            uri:item.image
                        }}
                        style={{
                            height:30,
                            width:30,
                            borderRadius:15,
                            margin:6
                        }}
                     />}
                     {(item.image==''||!item.image)&&<Icon
                         name='account-circle'
                         size={30}
                     />}

                    <Text style={{fontWeight:'700'}} >{item.username}</Text>
                </View>
                <View style={{flex:1}}  >
                    <TouchableWithoutFeedback onLongPress={()=>like()} onPress={()=>setMute(!mute)} style={{flex:1}} >
                        <VisibilitySensor onChange={(isVisible)=>{console.log('isVisible',isVisible,item);setMute(!isVisible)}} style={{flex:1}}>
                            {item.type=='Image'&&<Image
                                source={{
                                    uri:item.post
                                }}
                                style={{flex:1}}
                            />}
                            {item.type=='Reel'&&<Video
                                source={{
                                    uri:item.post
                                }}
                                style={{flex:1}}
                                resizeMode={'cover'}
                                isMuted={false}
                                shouldPlay={!mute}
                                isLooping={true}
                            />}
                            <Animated.View style={{position:'absolute',flex:1,alignItems:'center',width:'100%',height:'100%',justifyContent:'center',opacity:size}}>
                                <Icon
                                    name='favorite'
                                    color={'white'}
                                    size={50}

                                />
                            </Animated.View>
                        </VisibilitySensor>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:'row',alignItems:'center',padding:10}} >
                        <Icon onPress={()=>like()} name={liked?'favorite':'heart'} type={liked?"":"font-awesome-5"} color={liked?'red':''} />
                        <Icon name='mode-comment' style={{marginHorizontal:25}}  />
                        <Icon name='send' style={{transform:[{rotate:"-45deg"}]}} />
                    </View>
                    <View style={{padding:10}} >  
                    <Text style={{fontWeight:'700'}} >{item.likes.length} likes</Text>
                    <View style={{flexDirection:'row'}} ><Text style={{fontWeight:'700'}} >{item.username}</Text><Text> {item.desc}</Text></View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Comment',{
                        comments:item.comments,
                        id:item._id
                    })} ><Text style={{color:'gray'}} >View all {item.comments.length} comments</Text></TouchableOpacity>
                    <Text style={{fontSize:10,color:'gray'}} >{(new Date().getFullYear()-new Date(parseInt(item.timestap)).getFullYear()==0)?(new Date().getMonth()-new Date(parseInt(item.timestap)).getMonth()==0)?(new Date().getDay()-new Date(parseInt(item.timestap)).getDay()==0)?(new Date().getHours()-new Date(parseInt(item.timestap)).getHours()==0)?(new Date().getMinutes()-new Date(parseInt(item.timestap)).getMinutes()==0)?`${new Date().getSeconds()-new Date(parseInt(item.timestap)).getSeconds()} seconds ago`:`${new Date().getMinutes()-new Date(parseInt(item.timestap)).getMinutes()} minutes ago`:`${new Date().getHours()-new Date(parseInt(item.timestap)).getHours()} hours ago`:`${new Date().getDay()-new Date(parseInt(item.timestap)).getDay()} days ago`:`${new Date().getMonth()-new Date(parseInt(item.timestap)).getMonth()} months ago`:`${new Date().getFullYear()-new Date(parseInt(item.timestap)).getFullYear()} years ago`}</Text>
                    </View>
                </View>
                
            </View>
  )
}

export default Post