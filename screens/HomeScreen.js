import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, PanResponder, Animated, TouchableWithoutFeedback, BackHandler, Alert, AsyncStorage, ScrollView, RefreshControl} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { Icon } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';

import Post from '../components/Post';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { getUser } from '../Slices';
import Loading from '../components/Loading';

const HomeScreen = ({navigation}) => {

   const [image, setImage] = useState(null);

   const user = useSelector(getUser);
   console.log('user',user);
   const [posts,setPost] = useState([]);
   const [loading,setLoading] = useState(false);
   const [refreshing, setRefreshing] = React.useState(false);
   const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPost();
    
  }, []);

   useEffect(()=>{
       setLoading(true);
       getPost();
   },[]);

   const getPost = () => {
    AsyncStorage.getItem('token')
    .then(res=>{
        if(res){
            fetch(`https://instagram-api-2.herokuapp.com/post/getFriendPost`,{
                headers:{
                    'Authorization':`Bearer ${res}`
                }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.success){
                 console.log(data);
                 setPost(data.data);
               }
               setLoading(false);
               setRefreshing(false);
             })

            .catch(err=>{
                setLoading(false);
            })
        }else{
            navigation.navigate('Login');
        }
    })
   }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.2,
      videoMaxDuration:30
    });

    console.log(result);

    if (!result.cancelled) {
      navigation.navigate('newpost',{
          result
      })
    }
  };

    const insets = useSafeAreaInsets();
    let [fontsLoaded] = useFonts({
       'Kaushan Script':require('../assets/KaushanScript-Regular.ttf'),
    });

    const [story,setStory] = useState(null);



    if (!fontsLoaded) {
        return <AppLoading/>;
    }
    const data = [
        {
            isMe:true
        },
        {
            username:'ashish1',
            image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        {
            username:'ashish2',
            image:'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg'
        },
        {
            username:'ashish3',
            image:'https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg'
        },
        {
            username:'ashish4',
            image:'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            username:'ashish5',
            image:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            username:'ashish6',
            image:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            username:'ashish7',
            image:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            username:'ashish8',
            image:'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
    ]
 
    const renderItem = ({item}) => {
        if(item.isMe){
            return(
                <View style={{marginHorizontal:5,height:140}} >
                    <View>
                        <Image
                            source={{
                                uri:'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                            }}
                            style={{height:70,width:70,borderRadius:50}}
                        />
                        <TouchableOpacity  style={{position:'absolute',backgroundColor:'red',bottom:0,right:0,borderRadius:10,height:20,width:20,alignItems:'center',justifyContent:'center'}}  >
                        <Icon
                            name='add'
                            color={'white'}
                            size={18}
                            
                        />
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign:'center'}} >My Story</Text>
                </View>
            )
        }
        return(
            <TouchableOpacity onPress={()=>{navigation.navigate('Story')}} style={{marginHorizontal:5}} >
                <LinearGradient colors={['red','yellow']} style={{height:70,width:70,borderRadius:40,alignItems:'center',justifyContent:'center'}} >
                    <Image
                    source={{
                        uri:item.image
                    }}
                    style={{height:65,width:65,borderRadius:50,borderWidth:3,borderColor:'white'}}
                    />
                </LinearGradient>
                <Text style={{textAlign:'center'}} >{item.username}</Text>
            </TouchableOpacity>
        )
    }

    const renderPost = ({item}) => {
        return(
            <Post
                item={item}
                navigation
            />
        )
    }
    const pickVideo = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
            videoMaxDuration:30,
            
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            navigation.navigate('newpost',{
                result
            })
          }
    }



    return (
        <ScrollView 
         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{paddingTop:insets.top,backgroundColor:'white',height:height}} >
        
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,alignItems:'center'}} >
            <Text style={{fontFamily:'Kaushan Script',fontSize:22}} >Explore</Text>
            <View  style={{flexDirection:'row',alignItems:'center'}} >
               <Icon
                   name="control-point-duplicate"
                   onPress={()=>pickImage()}
               />
               <Icon
                   name='videocam'
                   onPress={()=>pickVideo()}
                   style={{
                       marginHorizontal:15
                   }}
               />
               <Icon
                   name='sms'
                   
               />
            </View>
        </View>
        <FlatList
            data={data}
            renderItem={renderItem}
            horizontal
            keyExtractor={(item,index)=>index}
        />
        {loading&&<Loading/>}
        {posts.length==0&&!loading&&<View>
            <Text style={{textAlign:'center',fontWeight:'700'}} >No posts to Show</Text>
            <Text style={{textAlign:'center',color:'gray'}} >Follow someone to see their future posts.</Text>
        </View>}
        <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item,index)=>index}
            contentContainerStyle={{paddingBottom:40}}
        />
        </ScrollView>
    )
}

export default HomeScreen