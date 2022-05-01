import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {Video} from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsername } from '../Slices';
const querystring = require('querystring');
import Loading from '../components/Loading';
const UProfile = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const [active,setActive] = useState(true);
  const [follow,setFollow] = useState(false);
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const username = useSelector(getUser);
  const [followl,setFollowl] = useState(false);
  console.log('username',username);
  const current = useSelector(getUsername);
  console.log('current',current);

  useEffect(()=>{

    setLoading(true);
    getPost();
  },[username]);

  const getPost = () => {
  
      fetch(`https://instagram-api-2.herokuapp.com/user/getProfile`,{
        method:'post',
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        },
        body:querystring.stringify({
          username:username
        })
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.success){
          setUser({...data.user,posts:data.posts});           
          setFollow(data.user.followers.find(i=>i.username==current));
          console.log(user);
        }
          setLoading(false)
      });
  }
  const renderPost = ({item}) => {
     return(
      <TouchableOpacity onPress={()=>navigation.navigate('Post',{
        posts:user.posts
      })} style={{flex:1,padding:1}} >
         <Image
            source={{
              uri:item.post
            }}
            style={{
              width:'100%',
              height:width/3
            }}
         />
       </TouchableOpacity>
     )
}
const renderReel = ({item}) => {
  return(
    <View style={{flex:1,padding:1}} >
         <Video
            source={{
              uri:item.post
            }}
            style={{
              width:'100%',
              height:width/2
            }}
         />
       </View>
  )
}

const followPost = () => {
  AsyncStorage.getItem('token')
  .then(res=>{
    console.log(res);
    fetch(`https://instagram-api-2.herokuapp.com/user/follow`,{
      method:'Post',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:querystring.stringify({   
         auth_token:res,
         name:user.name,
         username:user.username,
         image:user.profile,
         id:user._id
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        setFollow(true);
        setFollowl(false);
      }
    });
  })
}
const unfollow = () => {
  AsyncStorage.getItem('token')
  .then(res=>{
    console.log(res);
    fetch(`https://instagram-api-2.herokuapp.com/user/unfollow`,{
      method:'Post',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:querystring.stringify({   
         auth_token:res,
         name:user.name,
         username:user.username,
         image:user.profile,
         id:user._id
      })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        setFollow(false);
        setFollowl(false);
      }
    });
  })
}

  return (
    <View style={{paddingTop:insets.top,backgroundColor:'white',height:height}} >
    {user&&!loading&&<ScrollView>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
      <Text style={{fontSize:22,fontWeight:'700',padding:10}} >{user.username}</Text>
      </View>
      <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
        
      <View>{user.profile&&<Image
      source={{
        uri:user.profile
      }}
      style={{height:100,width:100,borderRadius:100}}
      />}{!user.profile&&<Icon name='account-circle' size={100} />}</View>
      <View style={{flex:1}} >
        <Text style={{textAlign:'center',fontWeight:'700',fontSize:20}} >{user.posts.length}</Text>
        <Text style={{textAlign:'center'}} >posts</Text>
      </View>
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',fontWeight:'700',fontSize:20}} >{user.followers.length}</Text>
      <Text style={{textAlign:'center'}} >Followers</Text>

      </View>
      <View style={{flex:1}} >
      <Text style={{textAlign:'center',fontWeight:'700',fontSize:20}} >{user.following.length}</Text>
      <Text style={{textAlign:'center'}} >Following</Text>
      </View>
      </View>
      <View style={{padding:10}} >
        <Text style={{fontWeight:'700'}} >{user.name}</Text>
        <Text>{user.bio}</Text>
      </View>
     <View style={{flexDirection:'row',padding:8}} >
      <TouchableOpacity style={{margin:2,borderColor:follow?'lightgray':'#728FCE',borderWidth:1,padding:5,borderRadius:5,flex:1,backgroundColor:(follow||followl)?'white':'#728FCE'}} onPress={()=>{
        setFollowl(true);
        if(!follow){
          followPost();
        }else{
          unfollow();
        }
      }} ><Text style={{fontWeight:'700',textAlign:'center',fontSize:15,color:follow?'black':'white'}} >{followl?<Loading
         size={20}
         color={'black'}
      />:follow?`Following`:`Follow`}</Text></TouchableOpacity>
      <TouchableOpacity style={{margin:2,borderColor:'lightgray',borderWidth:1,padding:5,borderRadius:5,flex:1}} onPress={()=>navigation.navigate('edit')} ><Text style={{fontWeight:'700',textAlign:'center',fontSize:15}} >Message</Text></TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',borderBottomColor:'lightgray',borderBottomWidth:1}} >
        <TouchableOpacity onPress={()=>setActive(true)} style={{flex:1,padding:10,borderBottomWidth:active?2:0}} ><Icon name='grid-on' /></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActive(false)} style={{flex:1,padding:10,borderBottomWidth:!active?2:0}} ><Icon name='subscriptions' /></TouchableOpacity>
      </View>
      {active&&<FlatList
          data={user.posts.filter(i=>i.type=='Image')}
          keyExtractor={(item,index)=>index}
          renderItem={renderPost}
          numColumns={3}
      />}
      {!active&&<FlatList
        data={user.posts.filter(i=>i.type=='Reel')}
        keyExtractor={(item,index)=>index}
        renderItem={renderReel}
        numColumns={3}
      />}
      </ScrollView>}
      {loading&&<Loading/>}
    </View>
  )
}

export default UProfile