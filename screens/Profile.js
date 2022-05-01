import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, AsyncStorage, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import {Video} from 'expo-av';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged, setIsLoggedIn } from '../Slices';
import { isLoaded } from 'expo-font';
const Profile = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const [active,setActive] = useState(true);
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const login = useSelector(getIsLogged);

  useEffect(()=>{
    setLoading(true);
    getPost();
  },[login]);

  const getPost = () => {
    AsyncStorage.getItem('token')
    .then(res=>{
      fetch(`https://instagram-api-2.herokuapp.com/user/getProfile`,{
        headers:{
          'authorization':`Bearer ${res}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.success)
          setUser(data.details);           
          setRefreshing(false);
          setLoading(false)
      })
    })
    .catch(err=>{
      console.log(err);
      setLoading(false);
      setRefreshing(false);
    })
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
  console.log(item);
  return(
    <TouchableOpacity style={{flex:1,padding:1}} >
      <Video
        source={{
          uri:item.post
        }}
        style={{
          width:'100%',
          height:width/1.4
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}
const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPost();
    
  }, []);

  return (
    <ScrollView           
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    style={{paddingTop:insets.top,backgroundColor:'white',height:height}} >
    {!loading&&user!=null&&<View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
      <Text style={{fontSize:22,fontWeight:'700',padding:10}} >{user.username}</Text>
      <TouchableOpacity onPress={async()=>{
        await dispatch(setIsLoggedIn(false));
         await AsyncStorage.removeItem('token');
         navigation.navigate('Login');
      }} ><Text style={{color:'gray',padding:10}} >logout</Text></TouchableOpacity>
      </View>
      <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
        
      <View >{user.profile&&<Image
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
      <TouchableOpacity style={{margin:10,borderColor:'lightgray',borderWidth:1,padding:5,borderRadius:5}} onPress={()=>navigation.navigate('edit')} ><Text style={{fontWeight:'700',textAlign:'center',fontSize:15}} >Edit Profile</Text></TouchableOpacity>
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
    </View>}
    {loading&&<Loading/>}
    </ScrollView>
  )
}

export default Profile