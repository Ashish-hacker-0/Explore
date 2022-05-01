import { View, Text ,TextInput, TouchableWithoutFeedback, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Icon } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { login } from '../Slices';
const width = Dimensions.get('screen').width;
const height= Dimensions.get('screen').height;
const querystring = require('querystring');
const SearchScren = ({navigation}) => {

  const insets = useSafeAreaInsets();

  const [data,setData] = useState([]);

  const dispatch = useDispatch();

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={()=>{
         dispatch(login(item.username));
         navigation.navigate('UserProfile');
      }} >
      <View style={{flexDirection:'row',alignItems:'center'}} >
        {item.profile&&<Image
          source={{
            uri:item.profile
          }}
          style={{
            height:50,
            width:50,
            borderRadius:50,
            margin:10
          }}
        />}
        {!item.profile&&<Icon
          name='account-circle'
          size={50}
          style={{margin:10}}
        />}
        <View>
          <Text style={{fontWeight:'700'}} >{item.username}</Text>
          <Text style={{color:'gray'}}>{item.name}</Text>
        </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={{paddingTop:insets.top,backgroundColor:'white',height:height}} >
      <View style={{flexDirection:'row',alignItems:'center',margin:10,backgroundColor:'#efefef',padding:5,borderRadius:10}} ><Icon name="search" size={20} color={'gray'} style={{margin:5}} /><TextInput placeholder='seach "username"' onChangeText={(e)=>{
        fetch(`https://instagram-api-2.herokuapp.com/user/searchuser`,{
          method:'post',
          headers: {
            "Content-Type":"application/x-www-form-urlencoded",
          },
          body:querystring.stringify({
            query:e
          })
        })
        .then(res=>res.json())
        .then(result=>{
          console.log('search',result);
          setData(result.result);
        })
      }}  style={{flex:1}} /></View>
      <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',alignItems:'flex-start'}} >
        <Text style={{padding:10,borderBottomWidth:1,textAlign:'left',fontWeight:'700'}} >Accounts</Text>
      </View>
      <FlatList
         data={data}
         renderItem={renderItem}
         style={{flex:1}}
      />
      {data.length==0&&<View style={{flex:1}} >
        <Text style={{textAlign:'center',fontWeight:'700'}} >Search User by name or username</Text>
      </View>}
    </View>
    )
}

export default SearchScren