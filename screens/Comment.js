import { View, Text, FlatList, Image, Dimensions, TextInput, TouchableWithoutFeedback,KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const querystring = require('querystring');
const Comment = ({route}) => {
    const [comments,setComments] = useState(route.params.comments);
    const [loading,setLoading] = useState(false);
    const [input,setInput] = useState('');

    const insets = useSafeAreaInsets();
    const renderItem = ({item}) => {
       return(
           <View style={{flexDirection:'row',alignItems:'center',width:width}} >
                {item.image!=''&&item.image&&<Image
                    source={{
                        uri:item.image
                    }}
                    style={{
                        height:50,
                        width:50,
                        borderRadius:25,
                        margin:10
                    }}
                />}
                {(item.image==''||!item.image)&&<Icon
                    name='account-circle'
                    size={50}
                    style={{
                        margin:10
                    }}
                />}
                <Text style={{flex:1,fontSize:13}}>
                   <Text style={{fontWeight:'700'}} >{item.username} </Text>
                   {item.comment}
                </Text>
           </View>
       )
    }

    const commentI = () => {
        setLoading(true);
        AsyncStorage.getItem('token')
        .then(res=>{
            if(res){
                fetch(`https://instagram-api-2.herokuapp.com/post/comment`,{
                    method:'Post',
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded",
                    },
                    body:querystring.stringify({
                        auth_token:res,
                        id:route.params.id,
                        comment:input
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.success){
                       console.log(data);
                       setComments([...comments,data.comment]);
                    }
                    setLoading(false);
                })

                .catch(err=>{
                    console.log(err);
                })
            }
        });
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{paddingTop:insets.top,height:height,backgroundColor:'white'}} >
        <Text style={{padding:10,fontWeight:'700'}} >Comments</Text>
         {loading&&<Loading size={20} color={'black'} />}
        <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item,index)=>index}
        />
        <View style={{paddingVertical:40,flexDirection:'row',alignItems:'center',paddingHorizontal:15,opacity:loading?0.3:1}} >
            <TextInput placeholder='Add a comment' value={input} onChangeText={setInput} style={{flex:1}} />
            <TouchableWithoutFeedback disabled={loading} onPress={()=>commentI()} >
                <Text style={{color:'#728FCE'}} >Post</Text>
            </TouchableWithoutFeedback>
        </View>
        </KeyboardAvoidingView>
    )
}

export default Comment;