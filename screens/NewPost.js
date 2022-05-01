import { View, Text, Image, Dimensions,TextInput, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
import * as FileSystem from 'expo-file-system';
import Loading from '../components/Loading';
const querystring = require('querystring');
const NewPost = ({route,navigation}) => {

    console.log(route.params);

    const insets = useSafeAreaInsets();
    const [desc,setDesc] = useState('');
    const [loading,setLoading] = useState(false);

    const post = async () => {
      setLoading(true);
      AsyncStorage.getItem('token')
      .then(async (res)=>{
        if(res){
          if(route.params.result.type=='video'){
            let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dlpbuhp5r/upload';
            const fsRead = await FileSystem.readAsStringAsync(route.params.result.uri, {
              encoding: "base64"
            });
            
            const base64Img = `data:video/mp4;base64,${fsRead}`;
            
            let data = {
              "file": base64Img,
              "upload_preset": "v7fjjndp",
            }
            fetch(CLOUDINARY_URL, {
              body: JSON.stringify(data),
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
            }).then(async r => {
              let data = await r.json()
        
        //Here I'm using another hook to set State for the photo that we get back //from Cloudinary
        
             console.log('data',data);
             console.log('route.params.result',route.params.result)
            
             fetch(`https://instagram-api-2.herokuapp.com/post/newreel`,{
               method:'POST',
               headers:{
                 "Content-Type": "application/x-www-form-urlencoded",
               },
               body:querystring.stringify({
                 'auth_token':res,
                 'desc':desc,
                 'path':data.secure_url
               })
             })
             .then(res=>res.json())
             .then(data=>{
                console.log(data);
               if(data.success){
                 navigation.navigate('Tab');
               }
             });
            }).catch(err => {
              setLoading(false);
              console.log(err)})
           
          }else{
            const formData = new FormData();
            formData.append('auth_token',res);
            formData.append('desc',desc);
            formData.append('image', {
              name:'post.jpg',
              uri:route.params.result.uri,
              type:'image/jpg'
            });
            fetch(`https://instagram-api-2.herokuapp.com/post/newpost`,{
              method:'POST',
              headers:{
                "Content-Type": "multipart/form-data",
              },
              body:formData
            })
            .then(res=>res.json())
            .then(data=>{
              if(data.success){
                navigation.navigate('Tab');
              }
            })
            .catch(err=>{
              setLoading(false);
            })
    
          }
        }
      })
      .catch(err=>{
        setLoading(false);
      })
      
    }

  return (
    <View style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:20}} >
      <Text style={{fontWeight:'700',fontSize:20}} >New Post</Text>
      <Icon
          name="done"
          color={'#728FCE'}
          disabled={loading}
          onPress={()=>post()}
      />
      </View>
      {loading&&<Loading size={30} color={'black'} />}
      <View style={{flexDirection:'row',width:width,padding:10,opacity:loading?0.3:1}} >
      <Image
          source={{
              uri:route.params.result.uri
          }}
          style={{
              height:100,
              width:100
          }}
      />
      <TextInput placeholder='Write a caption...' editable={!loading} value={desc} onChangeText={setDesc} style={{margin:10,flex:1}} numberOfLines={4} />
      </View>
    </View>
  )
}

export default NewPost;